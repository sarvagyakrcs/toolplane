import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toolplane - Your Swiss Army Knife for the Web",
  description: "Lightning-fast tools and powerful APIs built with precision and simplicity. Extract, convert, and generate with blazing speed.",
  keywords: "web scraping, data extraction, markdown converter, developer tools, APIs",
  openGraph: {
    title: "Toolplane - Your Swiss Army Knife for the Web",
    description: "Lightning-fast tools and powerful APIs built with precision and simplicity.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolplane - Your Swiss Army Knife for the Web",
    description: "Lightning-fast tools and powerful APIs built with precision and simplicity.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grainy`}
      >
        {children}
      </body>
    </html>
  );
}
