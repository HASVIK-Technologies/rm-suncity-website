import { google } from "googleapis";

export default async function notifications() {
  try {
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
