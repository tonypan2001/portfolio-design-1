import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { criticalAssetPaths } from "@/constants/paths";
import ProgressLoader from "@/components/layouts/progress-loader";
import FirstVisitEffects from "@/components/layouts/first-visit-effects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (typeof process !== "undefined" && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PanStudio",
    template: "%s | PanStudio",
  },
  description: "PanStudio — Modern, motion-smart web interfaces.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      th: "/th",
    },
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "PanStudio",
    description: "Modern, motion-smart web interfaces",
    siteName: "PanStudio",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "PanStudio logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PanStudio",
    description: "Modern, motion-smart web interfaces",
    images: [
      {
        url: "/icon.svg",
        alt: "PanStudio logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    themeColor: "#111827",
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
        <script
          type="application/ld+json"
          // Ensure Next doesn't attempt to hydrate this static script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PanStudio",
              url: siteUrl,
              inLanguage: "en",
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "PanStudio",
                url: siteUrl,
                logo: `${siteUrl}/icon.svg`,
              },
            }),
          }}
        />
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
