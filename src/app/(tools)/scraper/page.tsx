import { WebScraper } from "@/components/tools/web-scraper";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Web Scraper Tool + API | Extract Data from Any Website | No Coding Required",
  description: "Professional web scraper with free API access. Extract data from any website using CSS selectors. No coding required, unlimited use. Get structured data instantly from HTML pages with our free web scraping tool and REST API.",
  keywords: [
    "free web scraper",
    "web scraping API free",
    "extract data from website",
    "CSS selector scraper",
    "no code web scraper",
    "web scraping tool online",
    "free API web scraping",
    "HTML data extractor",
    "website data extraction tool",
    "scrape any website free",
    "web scraper with API",
    "data mining tool free",
    "content extraction API",
    "web scraping service free",
    "DOM parser tool",
    "HTML parser online",
    "free alternative to import.io",
    "free alternative to scrapy",
    "web scraping without coding",
    "REST API web scraper",
    "JSON data extraction",
    "automated data collection",
    "website content scraper",
    "free data harvesting tool",
    "bulk data extraction",
    "real-time web scraping"
  ],
  openGraph: {
    title: "Free Web Scraper Tool + API | Extract Data from Any Website | Toolplane",
    description: "Professional web scraper with free API access. Extract data from any website using CSS selectors. No coding required, unlimited use. Free alternative to expensive scraping services.",
    type: "website",
    url: "https://toolplane.xyz/scraper",
    images: [
      {
        url: "/og-web-scraper.png",
        width: 1200,
        height: 630,
        alt: "Free Web Scraper Tool with API Access",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Web Scraper Tool + API | Extract Data from Any Website",
    description: "Professional web scraping tool with free API access. Extract data from any website instantly using CSS selectors. No coding required.",
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
    "name": "Free Web Scraper Tool with API",
    "description": "Extract data from any website using CSS selectors. Professional-grade web scraping tool with free API access for developers, researchers, and businesses. No coding required.",
    "url": "https://toolplane.xyz/scraper",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free web scraping tool with unlimited API access"
    },
    "featureList": [
      "Free API access",
      "CSS selector support", 
      "No coding required",
      "Real-time data extraction",
      "Structured JSON output",
      "HTML attribute extraction",
      "Error handling",
      "Unlimited usage",
      "REST API endpoints",
      "Bulk data extraction"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Toolplane"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Researchers, Data Analysts, Businesses"
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