import { google } from "googleapis";

export default async function notifications() {
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
      range: "Notifications!A:F",
    });

    return { response: response.data.values, success: true };
  } catch (error: Error | any) {
    console.error("Error sending notification to Google Sheet:", error);
    return { success: false, error: error.message };
  }
}
