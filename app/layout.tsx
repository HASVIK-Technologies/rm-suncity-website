import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "RM Suncity Public School",
  description: "Quality education and holistic development.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}

        <Footer />

        <FloatingActions />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2500,
            style: {
              borderRadius: "12px",
              background: "#111827",
              color: "#fff",
            },
            success: {
              style: {
                background: "#16a34a",
              },
            },
            error: {
              style: {
                background: "#dc2626",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
