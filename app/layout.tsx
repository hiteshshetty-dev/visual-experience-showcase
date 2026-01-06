import { cinzel, poppins } from './fonts';
import { LyticsJSTagInit } from "@/src/components/LyticsJSTagInit/LyticsJSTagInit";
import { LYTICS_JS_TAG_SNIPPET } from "@/src/constants/lytics.constants";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LivePreviewInitComponent from "@/src/components/LivePreviewInitComponent";
import { DesignTokensProvider } from '@/src/studio/DesignTokensProvider';

import '@/src/studio/register-components';
export const metadata: Metadata = {
  title: 'Visual Experience Showcase',
  description: 'Visual Experience Showcase',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${poppins.variable}`}>
      <body>
        <DesignTokensProvider />
        {children}
        <Script
          id="lytics-js-tag"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: LYTICS_JS_TAG_SNIPPET,
          }}
        />
        <LyticsJSTagInit />
        <LivePreviewInitComponent />
      </body>
    </html>
  );
}
