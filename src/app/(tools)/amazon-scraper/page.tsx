import { AmazonScraper } from "@/components/tools/amazon-scraper";
import { ApiCard } from "@/components/ui/api-card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amazon Product Scraper - Extract Price, Title & Images | Free Tool",
  description: "Extract Amazon product details instantly - price, title, images, ratings, and more. Free Amazon scraper tool with API. No registration required. Get structured product data in seconds.",
  keywords: [
    "amazon scraper",
    "amazon product scraper",
    "amazon price tracker",
    "extract amazon data",
    "amazon product information",
    "amazon scraping tool",
    "product price extractor",
    "amazon api alternative",
    "ecommerce scraper",
    "price monitoring tool",
    "amazon product details",
    "free amazon scraper"
  ],
  openGraph: {
    title: "Amazon Product Scraper - Extract Price & Product Data | Toolplane",
    description: "Instantly extract Amazon product prices, titles, images, and ratings. Free tool with API access. Perfect for price monitoring and product research.",
    type: "website",
    url: "https://toolplane.xyz/amazon-scraper",
    images: [
      {
        url: "/og-amazon-scraper.png",
        width: 1200,
        height: 630,
        alt: "Amazon Product Scraper Tool",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon Product Scraper - Extract Product Data Instantly",
    description: "Free Amazon scraper tool. Extract prices, titles, images, and ratings in seconds. API included.",
    images: ["/twitter-amazon-scraper.png"],
  },
  alternates: {
    canonical: "https://toolplane.xyz/amazon-scraper",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "application-name": "Amazon Product Scraper",
    "apple-mobile-web-app-title": "Amazon Scraper",
  },
};

export default function AmazonScraperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Amazon Product Scraper",
    "description": "Extract Amazon product details including title, price, images, and ratings. Free tool with API access for developers and businesses.",
    "url": "https://toolplane.xyz/amazon-scraper",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Extract product titles",
      "Get current prices",
      "Download product images",
      "Fetch ratings and reviews",
      "API access included",
      "Real-time data extraction"
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
        <AmazonScraper />
        
        <ApiCard
          title="Amazon Product Scraper API"
          description="Extract product details including title, price, and image from any Amazon product URL."
          method="GET"
          endpoint="/api/scrape-amazon"
          rateLimit="20 requests/minute"
          category="scrape"
          parameters={[
            {
              name: "url",
              type: "string",
              required: true,
              description: "Amazon product URL to scrape",
              example: "https://www.amazon.com/dp/B08P2H5L72"
            }
          ]}
          example={{
            request: "/api/scrape-amazon?url=https://www.amazon.com/dp/B08P2H5L72",
            response: {
              title: "Echo Dot (4th Gen) | Smart speaker with Alexa | Charcoal",
              price: "$49.99",
              image: "https://m.media-amazon.com/images/I/61PgonGAR9L._AC_SL1000_.jpg"
            }
          }}
        />
      </div>
    </main>
  );
} 