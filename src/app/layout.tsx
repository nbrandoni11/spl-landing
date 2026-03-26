import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import Script from "next/script";
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
  title: "Sintered Stone & Porcelain Slabs | SPL",
  description: "Factory-direct sintered stone and porcelain slabs from Argentina. Reliable supply for distributors and importers.",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ED9H0Q5BSB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ED9H0Q5BSB');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
