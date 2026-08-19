import { google } from "googleapis";

/**
 * Examination Schedule service.
 *
 * Reads the "Examination Shift" tab of the same Google Sheet already used
 * for Notifications / Calendar / Fees on this site (see services/calendar.ts
 * for the identical auth pattern). One row = one exam shift for one class on
 * one date. A class can also have a note-only row (e.g. "Preparation
 * Holiday") with no shift/time filled in.
 *
 * Expected columns (header names are matched loosely, case/spacing-insensitive):
 * Exam Name | Class | Date | Shift | Subject | From | To | Note
 */

export type ExamSlot = {
  shift: number;
  /** e.g. "Mathematics", "English" — the exam subject for this shift. */
  subject?: string;
  from: string; // HH:MM, 24-hour
  to: string; // HH:MM, 24-hour
};

export type ClassDayEntry = {
  date: string; // ISO yyyy-mm-dd
  /** One or more exam shifts this class has on this date. Empty when the day is note-only (e.g. a holiday). */
  slots: ExamSlot[];
  /** e.g. "Preparation Holiday", "No Exam" — shown instead of, or alongside, the shift times. */
  note?: string;
};

export type ClassSchedule = {
  class: string;
  /** Only the dates that actually apply to this class — classes are not required to share the same dates. */
  days: ClassDayEntry[];
};

export type Schedule = {
  year: number;
  examName: string;
  /** Sorted, de-duplicated union of every date that appears for any class — used as the table's column headers. */
  dates: string[];
  classes: ClassSchedule[];
};

export type ScheduleResult =
  | { success: true; schedule: Schedule; warning?: string }
  | {
      success: false;
      schedule: null;
      message: string;
      reason: "not-configured" | "load-error" | "empty" | "invalid";
    };

const CLASS_ORDER = [
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
];

/** The sheet tab this feature reads from. */
const SHEET_TAB = "Examination Shift";

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

  const serviceAccountJson =
    env.GOOGLE_SERVICE_ACCOUNT || env.GOOGLE_CREDENTIALS;
  if (serviceAccountJson) {
    try {
      const parsed = JSON.parse(serviceAccountJson);
      if (parsed.client_email && parsed.private_key) {
        return {
          sheetId:
            env.GOOGLE_SHEET_ID?.trim() ||
            parsed.spreadsheet_id ||
            parsed.sheet_id,
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

/** Best-effort normalizer: accepts "2026-09-14", "14/09/2026", "9/14/2026", "September 14 2026". */
function normalizeDate(raw: string): string | null {
  const value = String(raw).trim();
  if (!value) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const dmy = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (dmy) {
    const [, d, m, y] = dmy;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  return null;
}

/** Best-effort normalizer: accepts "09:00", "9:00", "9:00 AM", "09:00:00". */
function normalizeTime(raw: string): string | null {
  const value = String(raw).trim();
  if (!value) return null;

  const ampm = value.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM|am|pm)$/);
  if (ampm) {
    let hours = Number(ampm[1]);
    const minutes = ampm[2];
    const period = ampm[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${minutes}`;
  }

  const plain = value.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (plain) {
    return `${plain[1].padStart(2, "0")}:${plain[2]}`;
  }

  return null;
}

/** Accepts "Class 5", "class5", "5", "CLASS 5", "Nursery", "LKG", "L.K.G", "ukg" and normalizes them. */
function normalizeClassName(raw: string): string {
  const value = String(raw).trim();
  if (/^nursery$/i.test(value)) return "Nursery";

  const compact = value.toLowerCase().replace(/[^a-z]/g, "");
  if (compact === "lkg") return "LKG";
  if (compact === "ukg") return "UKG";

  const digits = value.match(/\d{1,2}/);
  if (digits) return `Class ${digits[0]}`;
  return value;
}

function classSortIndex(className: string) {
  const index = CLASS_ORDER.indexOf(className);
  return index === -1 ? CLASS_ORDER.length : index;
}

/**
 * Figures out which Exam Name is "the current one" when the sheet has more
 * than one in play (e.g. staff started adding "Quarterly Examination" rows
 * without clearing out the previous "Half-Yearly Examination" rows first).
 * Picks whichever name has the most rows; ties break alphabetically for a
 * deterministic result. Rows with a blank Exam Name are not counted here —
 * they're treated leniently later and kept regardless of which name wins.
 */
function pickActiveExamName(
  rows: string[][],
  headers: string[],
): { activeExamName: string | null; distinctCount: number } {
  const counts = new Map<string, number>();

  for (const row of rows) {
    if (!row || !row.some((cell) => String(cell ?? "").trim())) continue;
    const rowValues = headers.reduce<Record<string, string>>(
      (acc, header, index) => {
        acc[header] = row[index] != null ? String(row[index]) : "";
        return acc;
      },
      {},
    );
    const rawExamName = (rowValues.examname || rowValues.exam || "").trim();
    if (!rawExamName) continue;
    counts.set(rawExamName, (counts.get(rawExamName) ?? 0) + 1);
  }

  if (counts.size === 0) return { activeExamName: null, distinctCount: 0 };

  const sorted = Array.from(counts.entries()).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  );
  return { activeExamName: sorted[0][0], distinctCount: counts.size };
}

async function fetchScheduleValues(
  sheets: ReturnType<typeof google.sheets>,
  sheetId: string,
): Promise<string[][]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${SHEET_TAB}!A:Z`,
    });
    return (response.data.values as string[][]) ?? [];
  } catch (error: Error | any) {
    if (!/Unable to parse range/i.test(error?.message ?? "")) {
      throw error;
    }

    // The tab may have been renamed slightly (e.g. casing/spacing) — fall
    // back to whichever tab looks like the examination one, same approach
    // used for the Calendar tab in services/calendar.ts.
    const metadataResponse = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    const sheetTitles = (metadataResponse.data.sheets ?? [])
      .map((sheet: any) => sheet.properties?.title)
      .filter((title): title is string => Boolean(title));

    const selectedSheet =
      sheetTitles.find((title) => /exam/i.test(title)) ?? sheetTitles[0];

    if (!selectedSheet) {
      throw error;
    }

    const safeSheetTitle = selectedSheet.replace(/'/g, "''");
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `'${safeSheetTitle}'!A:Z`,
    });
    return (response.data.values as string[][]) ?? [];
  }
}

export async function getSchedule(): Promise<ScheduleResult> {
  try {
    const credentials = getSheetCredentials();

    if (
      !credentials?.sheetId ||
      !credentials.credentials.client_email ||
      !credentials.credentials.private_key
    ) {
      console.warn(
        "Google Sheets configuration is incomplete. Skipping examination schedule fetch.",
      );
      return {
        success: false,
        schedule: null,
        message: "Examination schedule is not configured yet.",
        reason: "not-configured",
      };
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials.credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    let values: string[][] = [];
    try {
      values = await fetchScheduleValues(sheets, credentials.sheetId);
    } catch (error: Error | any) {
      console.error(
        "Error fetching examination schedule from Google Sheet:",
        error,
      );
      return {
        success: false,
        schedule: null,
        message: "Could not load the examination schedule from Google Sheets.",
        reason: "load-error",
      };
    }

    if (!values.length) {
      return {
        success: false,
        schedule: null,
        message:
          "There is no examination scheduled right now. Please check back closer to the next exam term.",
        reason: "empty",
      };
    }

    const [headerRow, ...rows] = values;
    const headers = (headerRow ?? []).map((h: string) =>
      normalizeHeader(String(h)),
    );

    if (!rows.length) {
      return {
        success: false,
        schedule: null,
        message:
          "There is no examination scheduled right now. Please check back closer to the next exam term.",
        reason: "empty",
      };
    }

    // If staff have left rows from more than one exam term in the sheet at
    // once, only use the one with the most rows — treat the rest as
    // leftovers that haven't been cleared out yet, so the page always shows
    // one clean, consistent schedule.
    const { activeExamName, distinctCount } = pickActiveExamName(rows, headers);
    const warning =
      distinctCount > 1
        ? `The "${SHEET_TAB}" sheet has rows for more than one exam. Showing "${activeExamName}" (the one with the most rows) — please clear out rows from finished exams so this stays accurate.`
        : undefined;

    const classMap = new Map<string, Map<string, ClassDayEntry>>();
    const dateSet = new Set<string>();

    for (const row of rows) {
      if (!row || !row.some((cell: string) => String(cell ?? "").trim()))
        continue;

      const rowValues = headers.reduce<Record<string, string>>(
        (acc, header, index) => {
          acc[header] = row[index] != null ? String(row[index]) : "";
          return acc;
        },
        {},
      );

      const rawExamName = (rowValues.examname || rowValues.exam || "").trim();

      // Skip rows that explicitly belong to a different (presumably stale)
      // exam term. Rows with no Exam Name filled in are kept — we don't
      // want to punish a staff member for leaving that column blank.
      if (activeExamName && rawExamName && rawExamName !== activeExamName)
        continue;

      const rawClass = (rowValues.class || rowValues.classname || "").trim();
      const rawDate = (rowValues.date || "").trim();
      const rawShift = (
        rowValues.shift ||
        rowValues.shiftno ||
        rowValues.shiftnumber ||
        ""
      ).trim();
      const rawSubject = (
        rowValues.subject ||
        rowValues.subjectname ||
        ""
      ).trim();
      const rawFrom = (
        rowValues.from ||
        rowValues.starttime ||
        rowValues.start ||
        ""
      ).trim();
      const rawTo = (
        rowValues.to ||
        rowValues.endtime ||
        rowValues.end ||
        ""
      ).trim();
      const rawNote = (
        rowValues.note ||
        rowValues.notes ||
        rowValues.remark ||
        rowValues.remarks ||
        rowValues.status ||
        ""
      ).trim();

      const className = normalizeClassName(rawClass);
      const date = normalizeDate(rawDate);
      if (!className || !date) continue; // every row needs at least a class + a valid date

      dateSet.add(date);

      if (!classMap.has(className)) classMap.set(className, new Map());
      const dayMap = classMap.get(className)!;
      if (!dayMap.has(date)) dayMap.set(date, { date, slots: [] });
      const dayEntry = dayMap.get(date)!;

      const shiftNum = Number(rawShift);
      const from = normalizeTime(rawFrom);
      const to = normalizeTime(rawTo);

      if (!Number.isNaN(shiftNum) && shiftNum > 0 && from && to) {
        dayEntry.slots.push({
          shift: shiftNum,
          subject: rawSubject || undefined,
          from,
          to,
        });
        dayEntry.slots.sort((a, b) => a.shift - b.shift);
      }

      if (rawNote) {
        dayEntry.note = rawNote;
      }
    }

    const classes: ClassSchedule[] = Array.from(classMap.entries())
      .map(([className, dayMap]) => ({
        class: className,
        days: Array.from(dayMap.values()).sort((a, b) =>
          a.date.localeCompare(b.date),
        ),
      }))
      .sort(
        (a, b) =>
          classSortIndex(a.class) - classSortIndex(b.class) ||
          a.class.localeCompare(b.class),
      );

    const dates = Array.from(dateSet).sort();

    if (!classes.length || !dates.length) {
      return {
        success: false,
        schedule: null,
        message: `No valid examination rows were found in "${SHEET_TAB}". Check that the Class and Date columns are filled in.`,
        reason: "invalid",
      };
    }

    return {
      success: true,
      schedule: {
        year: new Date().getFullYear(), // overwritten by utils/year.ts by the caller
        examName: activeExamName || "Examination",
        dates,
        classes,
      },
      warning,
    };
  } catch (error: Error | any) {
    console.error(
      "Error fetching examination schedule from Google Sheet:",
      error,
    );
    return {
      success: false,
      schedule: null,
      message:
        error?.message ||
        "Something went wrong loading the examination schedule.",
      reason: "load-error",
    };
  }
}

export default getSchedule;
