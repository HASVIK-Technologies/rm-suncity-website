This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Gallery photos

The gallery reads rows from the `Gallery` tab in the configured Google spreadsheet. Add these columns in the first row:

| S. No. | Title (Optional) | Description (Optional) | URL (Image URL on Google Drive) |
| --- | --- | --- | --- |

Add one photo per row. Upload each image to Google Drive, set its sharing access to **Anyone with the link** (Viewer), and paste its Drive link in the URL column. The website converts standard Drive share links to image URLs; rows without a valid Google Drive image URL are skipped. Titles and descriptions appear on hover only when both are filled in. If the sheet has no usable image URLs (or cannot be read), the existing local gallery photos are displayed instead.

The spreadsheet must be accessible to the service account configured by the existing `GOOGLE_SHEET_ID` and Google service-account environment variables.

The homepage “Highlights of RM Suncity” section reads from the `Highlights` tab. Add `S. No.`, `Title`, `Description`, and `URL (Image URL on Google Drive)` as the headers; every row must include a title, description, and valid Drive image URL. If the tab is missing or has no usable rows, the original homepage highlights are shown.

The “Moments at RM Suncity School” video section reads from the `Videos` tab. Add `S. No.`, `Title`, `Description`, and `URL (youtube URL)` as the headers; every row must include a title, description, and valid YouTube video URL. If the tab is missing or has no usable rows, the existing videos are shown.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
