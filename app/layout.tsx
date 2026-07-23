import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cacyroy — Shop",
  description: "Whatbytes Frontend Assignment — monochrome e-commerce UI built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
