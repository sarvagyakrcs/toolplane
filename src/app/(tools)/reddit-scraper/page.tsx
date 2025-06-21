import { RedditScraper } from "@/components/tools/reddit-scraper";
import { ApiCard } from "@/components/ui/api-card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reddit Post Scraper - Extract Posts, Comments & Metadata | Free Tool",
  description: "Extract Reddit post data including upvotes, comments, titles, and metadata. Free Reddit scraper tool with API access. Perfect for social media analysis and research.",
  keywords: [
    "reddit scraper",
    "reddit post scraper",
    "reddit data extraction",
    "reddit comments scraper",
    "social media scraper",
    "reddit api alternative",
    "reddit post analyzer",
    "reddit data tool",
    "extract reddit data",
    "reddit research tool",
    "reddit upvotes tracker",
    "free reddit scraper"
  ],
  openGraph: {
    title: "Reddit Post Scraper - Extract Posts & Comments | Toolplane",
    description: "Extract Reddit post data including upvotes, comments, and metadata. Free tool with API access for social media research and analysis.",
    type: "website",
    url: "https://toolplane.xyz/reddit-scraper",
    images: [
      {
        url: "/og-reddit-scraper.png",
        width: 1200,
        height: 630,
        alt: "Reddit Post Scraper Tool",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reddit Post Scraper - Extract Reddit Data Instantly",
    description: "Free Reddit scraper. Extract posts, comments, upvotes, and metadata. Perfect for social media analysis.",
    images: ["/twitter-reddit-scraper.png"],
  },
  alternates: {
    canonical: "https://toolplane.xyz/reddit-scraper",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RedditScraperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reddit Post Scraper",
    "description": "Extract Reddit post data including upvotes, comments, titles, and metadata. Free tool with API access for social media research and analysis.",
    "url": "https://toolplane.xyz/reddit-scraper",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Extract post titles and content",
      "Get upvote and downvote counts",
      "Fetch comment data",
      "Extract user information",
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
        <RedditScraper />
        
        <ApiCard
          title="Reddit Post Scraper API"
          description="Extract post data from Reddit URLs including title, upvotes, comments, and author information."
          method="GET"
          endpoint="/api/scrape-reddit"
          rateLimit="20 requests/minute"
          category="scrape"
          parameters={[
            {
              name: "url",
              type: "string",
              required: true,
              description: "Reddit post URL to scrape",
              example: "https://www.reddit.com/r/programming/comments/xyz"
            }
          ]}
          example={{
            request: "/api/scrape-reddit?url=https://www.reddit.com/r/programming/comments/xyz",
            response: {
              title: "Why I Love Programming",
              upvotes: "1.2k",
              comments: "156",
              author: "coder123",
              subreddit: "programming"
            }
          }}
        />
      </div>
    </main>
  );
} 