import { WebScraper } from "@/components/tools/web-scraper";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Scraper Tool - Extract Data from Any Website | Free CSS Selector Tool",
  description: "Professional web scraper tool to extract data from any website using CSS selectors. Free, fast, and reliable. No coding required. Get structured data instantly with our web scraping tool.",
  keywords: [
    "web scraper",
    "website scraper",
    "data extraction tool",
    "css selector scraper",
    "web scraping tool",
    "extract website data",
    "free web scraper",
    "html data extractor",
    "website data extraction",
    "web scraping service",
    "scrape any website",
    "data harvesting tool"
  ],
  openGraph: {
    title: "Web Scraper Tool - Extract Data from Any Website | Toolplane",
    description: "Extract data from any website using CSS selectors. Professional web scraping tool - free, fast, and reliable. No coding required.",
    type: "website",
    url: "https://toolplane.xyz/scraper",
    images: [
      {
        url: "/og-web-scraper.png",
        width: 1200,
        height: 630,
        alt: "Web Scraper Tool",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Scraper Tool - Extract Data from Any Website",
    description: "Professional web scraping tool with CSS selectors. Extract data from any website instantly. Free to use.",
    images: ["/twitter-web-scraper.png"],
  },
  alternates: {
    canonical: "https://toolplane.xyz/scraper",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ScraperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Web Scraper Tool",
    "description": "Extract data from any website using CSS selectors. Professional-grade web scraping tool for developers, researchers, and businesses.",
    "url": "https://toolplane.xyz/scraper",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "CSS selector support",
      "Real-time data extraction",
      "Structured data output",
      "HTML attribute extraction",
      "Error handling",
      "API access"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Toolplane"
    }
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Toolkit
          </Link>
        </div>
        <WebScraper />
      </div>
    </main>
  );
} 