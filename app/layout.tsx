import type { Metadata } from "next";
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
      </body>
    </html>
  );
}
