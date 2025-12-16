import './globals.css';
import { RegisterComponentProvider } from '@/src/studio/RegisterComponentProvider';
import { cinzel } from './fonts';
import { LyticsJSTagInit } from "@/src/components/LyticsJSTagInit/LyticsJSTagInit";
import { LYTICS_JS_TAG_SNIPPET } from "@/src/constants/lytics.constants";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LivePreviewInitComponent from "@/src/components/LivePreviewInitComponent";
import { DesignTokensProvider } from '@/src/studio/DesignTokensProvider';
import { Poppins } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Visual Experience Showcase',
  description: 'Visual Experience Showcase',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${poppins.className}`}>
      <body>
        <DesignTokensProvider />
        <RegisterComponentProvider />
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
