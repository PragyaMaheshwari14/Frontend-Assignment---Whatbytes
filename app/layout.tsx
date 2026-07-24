import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

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
      <body className="min-h-full flex flex-col">
        <CartProvider>
         <Suspense fallback={null}>
           <Header/>
         </Suspense>
        {children}
        <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}
