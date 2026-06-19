import type { Metadata } from "next";
import { headers } from "next/headers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalyticsPageView } from "@/components/GoogleAnalyticsPageView";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/seo/urls";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Belléco Skin Beauté",
    template: "%s | Belléco",
  },
  description: "Skin Transformation Centre in Kuala Lumpur",
  icons: {
    icon: "/brand/favicon.png",
    shortcut: "/brand/favicon.png",
    apple: "/brand/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: getSiteUrl(),
    title: "Belléco Skin Beauté",
    description: "Skin Transformation Centre in Kuala Lumpur",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-belleco-locale");
  const htmlLang = requestedLocale && isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return (
    <html
      lang={htmlLang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased bg-page text-ink`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-page text-ink">
        {children}
        <GoogleAnalytics gaId="G-GNLBE6P3P5" />
        <GoogleAnalyticsPageView />
      </body>
    </html>
  );
}
