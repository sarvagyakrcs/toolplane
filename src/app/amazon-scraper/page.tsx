import { AmazonScraper } from "@/components/tools/amazon-scraper";
import { ApiCard } from "@/components/ui/api-card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AmazonScraperPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
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