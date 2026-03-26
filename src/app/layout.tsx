import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Premium Natural Stone Supplier | SPL",
  description: "Factory Direct Supply for Importers, Distributors & Developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${lato.variable} ${playfair.variable} antialiased bg-stone-50 text-stone-900 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
