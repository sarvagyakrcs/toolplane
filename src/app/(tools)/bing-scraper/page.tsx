import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BingScraper } from "@/components/tools/bing-scraper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bing Search Scraper - Extract Search Results & Snippets | Free Tool",
  description: "Extract Bing search results, featured snippets, and related searches. Free Bing scraper tool with API access. Perfect for SEO research and competitive analysis.",
  keywords: [
    "bing scraper",
    "bing search scraper",
    "bing results extractor",
    "search engine scraper",
    "bing data extraction",
    "seo research tool",
    "search results scraper",
    "bing api alternative",
    "search analysis tool",
    "competitive research tool",
    "free bing scraper",
    "search intelligence tool"
  ],
  openGraph: {
    title: "Bing Search Scraper - Extract Search Results | Toolplane",
    description: "Extract Bing search results, featured snippets, and related searches. Free tool with API access for SEO research and competitive analysis.",
    type: "website",
    url: "https://toolplane.xyz/bing-scraper",
    images: [
      {
        url: "/og-bing-scraper.png",
        width: 1200,
        height: 630,
        alt: "Bing Search Scraper Tool",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bing Search Scraper - Extract Search Results & Data",
    description: "Free Bing scraper. Extract search results, featured snippets, and related searches. Perfect for SEO research.",
    images: ["/twitter-bing-scraper.png"],
  },
  alternates: {
    canonical: "https://toolplane.xyz/bing-scraper",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BingScraperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bing Search Scraper",
    "description": "Extract search results, featured snippets, and related searches from Microsoft Bing search engine for SEO research and analysis.",
    "url": "https://toolplane.xyz/bing-scraper",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Extract search results",
      "Featured snippets extraction",
      "Related searches",
      "SERP analysis",
      "Real-time data",
      "API access included"
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
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Toolkit
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Bing Search Results Scraper</h1>
          <p className="text-muted-foreground">
            Extract search results, featured snippets, and related searches from Microsoft Bing search engine.
          </p>
        </div>

        <BingScraper />
      </div>
    </main>
  );
} 