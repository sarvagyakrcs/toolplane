import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { TwitterScraper } from "@/components/tools/twitter-scraper";

export default function TwitterScraperPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Toolkit
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Twitter/X Post Scraper</h1>
          <p className="text-muted-foreground">
            Extract tweet data including text, author information, and media from Twitter/X posts.
          </p>
        </div>

        <TwitterScraper />
      </div>
    </main>
  );
} 