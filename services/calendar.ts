import { google } from "googleapis";

export type CalendarEvent = {
  month: string;
  day: number;
  title: string;
  type: string;
  color: string;
};

function normalizeHeader(header: string) {
  return header.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function normalizePrivateKey(privateKey: string | undefined) {
  if (!privateKey) {
    return undefined;
  }

  return privateKey
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\n/g, "\n");
}

function getSheetCredentials(env: NodeJS.ProcessEnv = process.env) {
  const sheetId = env.GOOGLE_SHEET_ID?.trim();
  const clientEmail = env.GOOGLE_CLIENT_EMAIL?.trim();
  const privateKey = normalizePrivateKey(env.GOOGLE_PRIVATE_KEY);

  if (sheetId && clientEmail && privateKey) {
    return {
      sheetId,
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    };
  }

  const serviceAccountJson = env.GOOGLE_SERVICE_ACCOUNT || env.GOOGLE_CREDENTIALS;
  if (serviceAccountJson) {
    try {
      const parsed = JSON.parse(serviceAccountJson);
      if (parsed.client_email && parsed.private_key) {
        return {
          sheetId: env.GOOGLE_SHEET_ID?.trim() || parsed.spreadsheet_id || parsed.sheet_id,
          credentials: {
            client_email: parsed.client_email,
            private_key: normalizePrivateKey(parsed.private_key),
          },
        };
      }
    } catch {
      // Ignore malformed JSON and fall back to the individual env var path.
    }
  }

  return null;
}

function normalizeMonth(value: string) {
  const normalized = value.toLowerCase().trim();
  const monthMap: Record<string, string> = {
    jan: "January",
    january: "January",
    feb: "February",
    february: "February",
    mar: "March",
    march: "March",
    apr: "April",
    april: "April",
    may: "May",
    jun: "June",
    june: "June",
    jul: "July",
    july: "July",
    aug: "August",
    august: "August",
    sep: "September",
    sept: "September",
    september: "September",
    oct: "October",
    october: "October",
    nov: "November",
    november: "November",
    dec: "December",
    december: "December",
  };

  return monthMap[normalized] ?? value;
}

function normalizeType(value: string) {
  const normalized = value.toLowerCase().trim();
  if (["academic", "exam", "class", "study"].includes(normalized)) {
    return "academic";
  }
  if (["holiday", "vacation", "off"].includes(normalized)) {
    return "holiday";
  }
  if (["event", "celebration", "festival"].includes(normalized)) {
    return "event";
  }
  if (["break", "closure"].includes(normalized)) {
    return "break";
  }
  if (["meeting", "ptm", "parentteachermeeting"].includes(normalized)) {
    return "meeting";
  }

  return normalized || "event";
}

function getEventColor(type: string) {
  switch (type) {
    case "academic":
      return "bg-blue-500";
    case "holiday":
      return "bg-red-500";
    case "event":
      return "bg-purple-500";
    case "break":
      return "bg-amber-500";
    case "meeting":
      return "bg-green-500";
    default:
      return "bg-slate-500";
  }
}

function buildCalendarEvent(row: string[], headers: string[]): CalendarEvent | null {
  if (!row || !row.some((cell) => cell && String(cell).trim())) {
    return null;
  }

  const normalizedHeaders = headers.map((header) => normalizeHeader(header));
  const values = normalizedHeaders.reduce<Record<string, string>>((acc, header, index) => {
    acc[header] = row[index] ?? "";
    return acc;
  }, {});

  const month = normalizeMonth(String(values.month || values.mth || values.mon || values.monthname || "").trim());
  const day = Number(String(values.day || values.date || values.d || values.dayofmonth || "").trim());
  const title = String(values.title || values.event || values.name || values.heading || "").trim();
  const type = normalizeType(String(values.type || values.category || values.kind || values.eventtype || "event").trim());

  if (!month || !title || Number.isNaN(day)) {
    return null;
  }

  return {
    month,
    day,
    title,
    type,
    color: getEventColor(type),
  };
}

export async function getCalendarEvents() {
  try {
    const credentials = getSheetCredentials();

    if (!credentials?.sheetId || !credentials.credentials.client_email || !credentials.credentials.private_key) {
      console.warn("Google Sheets configuration is incomplete. Skipping calendar fetch.");
      return { success: true, events: [], message: "Calendar not configured" };
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials.credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    let response;
    try {
      response = await sheets.spreadsheets.values.get({
        spreadsheetId: credentials.sheetId,
        range: "Calendar!A:Z",
      });
    } catch (error: Error | any) {
      if (!/Unable to parse range/i.test(error?.message ?? "")) {
        throw error;
      }

      const metadataResponse = await sheets.spreadsheets.get({
        spreadsheetId: credentials.sheetId,
      });

      const sheetTitles = (metadataResponse.data.sheets ?? [])
        .map((sheet: any) => sheet.properties?.title)
        .filter((title): title is string => Boolean(title));

      const selectedSheet = sheetTitles.find((title) => title.toLowerCase().includes("calendar")) ?? sheetTitles[0];

      if (!selectedSheet) {
        throw error;
      }

      const safeSheetTitle = selectedSheet.replace(/'/g, "''");
      response = await sheets.spreadsheets.values.get({
        spreadsheetId: credentials.sheetId,
        range: `'${safeSheetTitle}'!A:Z`,
      });
    }

    const values = response.data.values ?? [];

    if (!values.length) {
      return { success: true, events: [], message: "No calendar entries found" };
    }

    const [headers, ...rows] = values;
    const events = rows
      .map((row) => buildCalendarEvent(row, headers ?? []))
      .filter((event): event is CalendarEvent => Boolean(event))
      .sort((first, second) => {
        const firstMonth = first.month;
        const secondMonth = second.month;
        const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const firstIndex = monthOrder.indexOf(firstMonth);
        const secondIndex = monthOrder.indexOf(secondMonth);

        if (firstIndex !== secondIndex) {
          return (firstIndex === -1 ? 999 : firstIndex) - (secondIndex === -1 ? 999 : secondIndex);
        }

        return first.day - second.day;
      });

    return {
      events,
      success: true,
    };
  } catch (error: Error | any) {
    console.error("Error fetching calendar events from Google Sheet:", error);
    return { events: [], success: false, error: error.message };
  }
}

export default getCalendarEvents;
