import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Notifications from "@/components/Notifications";

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

        <Notifications />

        <Footer />
      </body>
    </html>
  );
}
