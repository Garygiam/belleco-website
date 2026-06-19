import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalyticsPageView } from "@/components/GoogleAnalyticsPageView";
import { MetaPixelPageView } from "@/components/MetaPixelPageView";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { META_PIXEL_ID } from "@/lib/meta-pixel";
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
        <Script id="meta-pixel-base">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq("track", "PageView");
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <GoogleAnalytics gaId="G-GNLBE6P3P5" />
        <GoogleAnalyticsPageView />
        <MetaPixelPageView />
      </body>
    </html>
  );
}
