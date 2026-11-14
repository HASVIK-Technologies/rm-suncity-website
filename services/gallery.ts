import { google } from "googleapis";

export type GalleryImage = {
  id: string;
  serialNumber: string;
  title: string;
  description: string;
  src: string;
};

export type YouTubeVideo = {
  id: string;
  serialNumber: string;
  title: string;
  description: string;
  videoId: string;
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

function getDriveImageUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      return null;
    }

    if (url.hostname === "drive.google.com") {
      const fileId = url.pathname.match(/^\/file\/d\/([^/]+)/)?.[1] ?? url.searchParams.get("id");
      return fileId
        ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1600`
        : null;
    }

    return url.hostname === "lh3.googleusercontent.com" ? url.href : null;
  } catch {
    return null;
  }
}

function getYouTubeVideoId(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      return null;
    }

    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    let videoId: string | null = null;

    if (hostname === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v");
      } else {
        videoId = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ?? null;
      }
    }

    return videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : null;
  } catch {
    return null;
  }
}

function buildImageRows(rows: string[][], requireTitleAndDescription = false): GalleryImage[] {
  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map(normalizeHeader);

  return rows.slice(1).flatMap((row, index) => {
    const values = headers.reduce<Record<string, string>>((result, header, column) => {
      result[header] = String(row[column] ?? "").trim();
      return result;
    }, {});

    const serialNumber = values.sno || values.serialnumber || "";
    const title = values.title || values.titleoptional || "";
    const description = values.description || values.descriptionoptional || "";
    const src = getDriveImageUrl(
      values.url || values.imageurl || values.imageurlongoogledrive || values.driveurl || "",
    );

    if (!src || (requireTitleAndDescription && (!title || !description))) {
      return [];
    }

    return [{
      id: `${serialNumber || "gallery"}-${index + 1}`,
      serialNumber,
      title,
      description,
      src,
    }];
  });
}

async function getSheetImages(sheetName: string, requireTitleAndDescription = false) {
  const { success, rows } = await getSheetRows(sheetName);
  return {
    success,
    images: buildImageRows(rows, requireTitleAndDescription),
  };
}

function buildVideoRows(rows: string[][]): YouTubeVideo[] {
  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map(normalizeHeader);

  return rows.slice(1).flatMap((row, index) => {
    const values = headers.reduce<Record<string, string>>((result, header, column) => {
      result[header] = String(row[column] ?? "").trim();
      return result;
    }, {});

    const serialNumber = values.sno || values.serialnumber || "";
    const title = values.title || "";
    const description = values.description || "";
    const videoId = getYouTubeVideoId(
      values.url || values.urlyoutubeurl || values.youtubeurl || values.videourl || "",
    );

    if (!title || !description || !videoId) {
      return [];
    }

    return [{
      id: `${serialNumber || "video"}-${index + 1}`,
      serialNumber,
      title,
      description,
      videoId,
    }];
  });
}

async function getSheetVideos(sheetName: string) {
  const { success, rows } = await getSheetRows(sheetName);
  return {
    success,
    videos: buildVideoRows(rows),
  };
}

async function getSheetRows(sheetName: string) {
  try {
    const credentials = getSheetCredentials();
    if (!credentials?.sheetId || !credentials.credentials.client_email || !credentials.credentials.private_key) {
      console.warn(`Google Sheets configuration is incomplete. Skipping ${sheetName} fetch.`);
      return { success: true, rows: [] as string[][] };
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials.credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: credentials.sheetId,
      range: `'${sheetName}'!A:D`,
    });

    return { success: true, rows: (response.data.values ?? []) as string[][] };
  } catch (error) {
    if (error instanceof Error && /Unable to parse range/i.test(error.message)) {
      return { success: true, rows: [] as string[][] };
    }

    console.error(`Error fetching ${sheetName.toLowerCase()} data from Google Sheet:`, error);
    return { success: false, rows: [] as string[][] };
  }
}

export async function getGalleryData() {
  return getSheetImages("Gallery");
}

export async function getHighlightsData() {
  return getSheetImages("Highlights", true);
}

export async function getVideosData() {
  return getSheetVideos("Videos");
}
