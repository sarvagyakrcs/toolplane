import { RedditScraper } from "@/components/tools/reddit-scraper";
import { ApiCard } from "@/components/ui/api-card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Reddit Scraper + API | Extract Posts, Comments & Data | Social Media Analytics",
  description: "Free Reddit scraper with API access. Extract posts, comments, upvotes, subreddit data, and user analytics. Perfect for social media research, sentiment analysis, market research, and content strategy. No Reddit API limits.",
  keywords: [
    "free reddit scraper",
    "reddit scraper API free",
    "reddit data extraction tool",
    "reddit post analyzer",
    "reddit comments scraper",
    "social media analytics tool",
    "reddit sentiment analysis",
    "reddit market research",
    "subreddit scraper",
    "reddit trend analysis",
    "reddit content research",
    "reddit user analytics",
    "reddit upvote tracker",
    "reddit engagement metrics",
    "reddit data mining",
    "reddit intelligence tool",
    "social listening reddit",
    "reddit brand monitoring",
    "reddit competitor analysis",
    "reddit influencer research",
    "reddit viral content",
    "reddit api alternative free",
    "reddit bulk scraper",
    "reddit thread scraper",
    "reddit community insights",
    "reddit research automation"
  ],
  openGraph: {
    title: "Reddit Post Scraper - Extract Posts & Comments | Toolplane",
    description: "Extract Reddit post data including upvotes, comments, and metadata. Free tool with API access for social media research and analysis.",
    type: "website",
    url: "https://toolplane.xyz/reddit-scraper",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reddit Post Scraper - Extract Reddit Data Instantly",
    description: "Free Reddit scraper. Extract posts, comments, upvotes, and metadata. Perfect for social media analysis.",
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