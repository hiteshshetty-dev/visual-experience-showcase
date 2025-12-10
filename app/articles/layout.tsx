import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Red Panda Articles",
  description: "Red Panda Articles",
};

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
