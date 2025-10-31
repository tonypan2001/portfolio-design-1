import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { criticalAssetPaths } from "@/constants/paths";
import ProgressLoader from "@/components/layouts/progress-loader";
import FirstVisitEffects from "@/components/layouts/first-visit-effects";
import SmoothScroll from "@/components/layouts/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PanStudio",
  description: "PanStudio — Modern, motion-smart web interfaces.",
  icons: {
    icon: "/icon.svg",
  },
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
        {/* Make mouse-wheel scrolling buttery-smooth on desktop */}
        <SmoothScroll />
        {/* Run first-visit fade-in effects (no-op after first load) */}
        <FirstVisitEffects />
        <ProgressLoader
          assets={criticalAssetPaths}
          includeFonts={true} // รอ webfont ด้วย
          minShowMs={900} // กันกระพริบ
          waitForEvents={["r3f-ready"]}
          barColorClass="bg-white"
          backdropClass="bg-primary"
          text="Loading assets…"
        />
        {children}
      </body>
    </html>
  );
}
