import { google } from "googleapis";

export type FeeStructureItem = {
  className: string;
  fee: string;
};

export type FeeHighlightItem = {
  title: string;
  amount: string;
  time: string;
  description: string;
  type: string;
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

async function getSheetValues(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  sheetName: string,
) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
    });
    return response.data.values ?? [];
  } catch (error: Error | any) {
    if (!/Unable to parse range/i.test(error?.message ?? "")) {
      throw error;
    }

    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetTitles = (metadata.data.sheets ?? [])
      .map((sheet) => sheet.properties?.title)
      .filter((title): title is string => Boolean(title));

    const query = sheetName.toLowerCase();
    const matchingTitle = sheetTitles.find((title) => title.toLowerCase().includes(query));
    const selectedTitle = matchingTitle || sheetTitles[0];

    if (!selectedTitle) {
      throw error;
    }

    const safeTitle = selectedTitle.replace(/'/g, "''");
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${safeTitle}'!A:Z`,
    });

    return response.data.values ?? [];
  }
}

function buildStructureRows(rows: string[][], headers: string[]) {
  const normalizedHeaders = headers.map(normalizeHeader);

  return rows
    .map((row) => {
      const values = normalizedHeaders.reduce<Record<string, string>>((acc, header, index) => {
        acc[header] = row[index] ?? "";
        return acc;
      }, {});

      const className = String(values.class || values.classname || values.grade || "").trim();
      const fee = String(values.fee || values.amount || "").trim();

      if (!className || !fee) {
        return null;
      }

      return { className, fee };
    })
    .filter((item): item is FeeStructureItem => Boolean(item));
}

function buildHighlightRows(rows: string[][], headers: string[]) {
  const normalizedHeaders = headers.map(normalizeHeader);

  return rows
    .map((row) => {
      const values = normalizedHeaders.reduce<Record<string, string>>((acc, header, index) => {
        acc[header] = row[index] ?? "";
        return acc;
      }, {});

      const title = String(values.title || values.name || "").trim();
      const amount = String(values.amount || values.fee || "").trim();
      const time = String(values.time || values.period || values.duration || "").trim();
      const description = String(values.description || values.details || "").trim();
      const type = String(values.type || values.category || "").trim();

      if (!title || !amount) {
        return null;
      }

      return { title, amount, time, description, type };
    })
    .filter((item): item is FeeHighlightItem => Boolean(item));
}

export async function getFeeData() {
  try {
    const credentials = getSheetCredentials();
    if (!credentials?.sheetId || !credentials.credentials.client_email || !credentials.credentials.private_key) {
      console.warn("Google Sheets configuration is incomplete. Skipping fee fetch.");
      return { success: true, feeStructure: [], feeHighlights: [] };
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials.credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = credentials.sheetId;

    const structureValues = await getSheetValues(sheets, spreadsheetId, "Fee Structure");
    const highlightValues = await getSheetValues(sheets, spreadsheetId, "Fee Highlight");

    if (!structureValues.length || !highlightValues.length) {
      return {
        success: true,
        feeStructure: buildStructureRows(structureValues.slice(1), structureValues[0] ?? []),
        feeHighlights: buildHighlightRows(highlightValues.slice(1), highlightValues[0] ?? []),
      };
    }

    return {
      success: true,
      feeStructure: buildStructureRows(structureValues.slice(1), structureValues[0] ?? []),
      feeHighlights: buildHighlightRows(highlightValues.slice(1), highlightValues[0] ?? []),
    };
  } catch (error: Error | any) {
    console.error("Error fetching fee data from Google Sheet:", error);
    return { success: false, feeStructure: [], feeHighlights: [] };
  }
}

export default getFeeData;
