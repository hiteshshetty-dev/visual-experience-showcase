import { LyticsJSTagInit } from "@/components/LyticsJSTagInit/LyticsJSTagInit";
import { LYTICS_JS_TAG_SNIPPET } from "@/constants/lytics.constants";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visual Experience Showcase",
  description: "Visual Experience Showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          id="lytics-js-tag"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: LYTICS_JS_TAG_SNIPPET,
          }}
        />
        <LyticsJSTagInit />
      </body>
    </html>
  );
}
