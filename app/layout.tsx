import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { criticalAssetPaths } from "@/constants/paths";
import ProgressLoader from "@/components/layouts/progress-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Landing Page Design 1",
  description: "PanStudio Portfolio Landing Page Design 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProgressLoader
          assets={criticalAssetPaths}
          includeFonts={true} // รอ webfont ด้วย
          minShowMs={900} // กันกระพริบ
          barColorClass="bg-gradient-to-r from-indigo-400 to-fuchsia-400"
          backdropClass="bg-neutral-950"
          text="Loading assets…"
        />
        {children}
      </body>
    </html>
  );
}
