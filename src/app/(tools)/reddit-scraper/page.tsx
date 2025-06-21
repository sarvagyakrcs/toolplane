import { RedditScraper } from "@/components/tools/reddit-scraper";
import { ApiCard } from "@/components/ui/api-card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function RedditScraperPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
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