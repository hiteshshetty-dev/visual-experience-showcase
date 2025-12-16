import type { Metadata } from "next";
import '@/src/studio/register-components';
export const metadata: Metadata = {
  title: "Visual Experience Showcase",
  description: "Visual Experience Showcase",
};

export default async function LocalisedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
    </>
  );
}
