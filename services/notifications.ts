import { google } from "googleapis";

export type NotificationItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  publishedAt: string;
  isNew: boolean;
  isPinned: boolean;
};

function normalizeHeader(header: string) {
  return header.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildNotification(row: string[], headers: string[]): NotificationItem | null {
  if (!row || !row.some((cell) => cell && String(cell).trim())) {
    return null;
  }

  const normalizedHeaders = headers.map((header) => normalizeHeader(header));
  const values = normalizedHeaders.reduce<Record<string, string>>((acc, header, index) => {
    acc[header] = row[index] ?? "";
    return acc;
  }, {});

  const title = String(values.title || values.subject || values.notice || values.name || "").trim();
  if (!title) {
    return null;
  }

  const summary = String(values.shortDescription || "").trim();
  const content = String(values.description || "").trim();
  const category = String(values.category || "General").trim() || "General";
  const publishedAt = String(values.date || "").trim();
  const slug = String(values.slug || values.id || toSlug(title)).trim() || toSlug(title);
  const isNew = /new|urgent|important|announcement/i.test(
    String(values.isnew || values.status || values.priority || "").toLowerCase(),
  );
  const isPinned = /pinned|featured|important|urgent/i.test(
    String(values.ispinned || values.priority || values.status || "").toLowerCase(),
  );

  return {
    id: slug,
    slug,
    title,
    summary: summary || content,
    content: content || summary,
    category,
    publishedAt,
    isNew: isNew || values.isnew === "1" || values.isnew === "true",
    isPinned,
  };
}

export async function getNotifications() {
  try {
    // Check if required environment variables are set
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.warn("Google Sheets configuration is incomplete. Skipping notifications fetch.");
      return { success: true, notifications: [], message: "Notifications not configured" };
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Notifications!A:G",
    });

    const values = response.data.values ?? [];

    const [headers, ...rows] = values;
    const notifications = rows
      .map((row) => buildNotification(row, headers ?? []))
      .filter((notification): notification is NotificationItem => Boolean(notification))
      .sort((first, second) => {
        const firstTime = Date.parse(first.publishedAt || "0");
        const secondTime = Date.parse(second.publishedAt || "0");
        return secondTime - firstTime;
      });

    return {
      notifications: notifications.length ? notifications : [],
      success: true,
    };
  } catch (error: Error | any) {
    console.error("Error fetching notifications from Google Sheet:", error);
    return { notifications: [], success: false, error: error.message };
  }
}

export async function getNotificationBySlug(slug: string) {
  const { notifications } = await getNotifications();
  return notifications.find((notification) => notification.slug === slug) ?? null;
}

export default getNotifications;
