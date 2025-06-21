"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Loader2, ArrowUp, MessageCircle, User } from "lucide-react";
import { scrapeRedditPost } from "@/app/actions/scrapeReddit";

interface RedditPostData {
  title: string | null;
  upvotes: string | null;
  comments: string | null;
  author: string | null;
  subreddit: string | null;
}

export function RedditScraper() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<RedditPostData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async () => {
    if (!url) {
      setError("Please enter a Reddit post URL.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const scrapedData = await scrapeRedditPost(url);
      setData(scrapedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Reddit Post Scraper</CardTitle>
        <CardDescription>
          Extract data from any Reddit post including upvotes, comments, and author.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reddit-url">Reddit Post URL</Label>
            <Input
              id="reddit-url"
              type="url"
              placeholder="https://www.reddit.com/r/programming/comments/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
            />
          </div>
          <Button onClick={handleScrape} disabled={loading || !url} className="w-full sm:w-auto">
            {loading ? (
                <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Scraping...</span>
                </div>
            ) : "Scrape Post"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {data && !loading && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">r/{data.subreddit}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ArrowUp className="h-4 w-4" />
                    <span>{data.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{data.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{data.author}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold leading-tight">{data.title}</h3>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
} 