import "../globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PanStudio",
    template: "%s | PanStudio",
  },
  description: "PanStudio — สร้างเว็บสมัยใหม่ เน้นประสบการณ์และประสิทธิภาพ",
  alternates: {
    canonical: "/th",
    languages: {
      en: "/",
      th: "/th",
    },
  },
};

export default function RootLayoutTH({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

