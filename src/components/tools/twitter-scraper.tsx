"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Terminal, Loader2, Heart, Repeat2, MessageCircle, User, Calendar, CheckCircle, Image } from "lucide-react";
import { scrapeTwitterPost } from "@/app/actions/scrapeTwitter";
import { ApiCard } from "@/components/ui/api-card";

interface TwitterPostData {
  text: string | null;
  author: string | null;
  username: string | null;
  likes: string | null;
  retweets: string | null;
  replies: string | null;
  date: string | null;
  verified: boolean;
  media?: string[];
}

export function TwitterScraper() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<TwitterPostData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async () => {
    if (!url) {
      setError("Please enter a Twitter/X post URL.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const scrapedData = await scrapeTwitterPost(url);
      setData(scrapedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const apiDocumentation = {
    endpoint: "/api/scrape-twitter",
    method: "GET" as const,
    title: "Twitter Post Scraper API",
    description: "Extract tweet data including text, author, engagement metrics, and media from Twitter/X URLs.",
    parameters: [
      {
        name: "url",
        type: "string",
        required: true,
        description: "Twitter/X post URL",
        example: "https://twitter.com/elonmusk/status/1234567890"
      }
    ],
    example: {
      request: "/api/scrape-twitter?url=https://twitter.com/elonmusk/status/1234567890",
      response: {
        text: "Just announced something incredible!",
        author: "Elon Musk",
        username: "elonmusk",
        likes: "N/A",
        retweets: "N/A", 
        replies: "N/A",
        date: "N/A",
        verified: false,
        media: ["https://pbs.twimg.com/media/example.jpg"]
      }
    },
    rateLimit: "20 requests/minute",
    category: "scrape" as const
  };

  return (
    <div className="space-y-8">
      <Card className="w-full shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Twitter/X Post Scraper</CardTitle>
          <CardDescription>
            Extract tweet data including text, author information, and media from Twitter/X posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="twitter-url">Twitter/X Post URL</Label>
              <Input
                id="twitter-url"
                type="url"
                placeholder="https://twitter.com/username/status/1234567890"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
              />
            </div>
            
            <Button onClick={handleScrape} disabled={loading || !url} className="w-full sm:w-auto">
              {loading ? (
                  <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Scraping tweet...</span>
                  </div>
              ) : "Scrape Tweet"}
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
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{data.author}</p>
                        <p className="text-sm text-muted-foreground">@{data.username}</p>
                      </div>
                      {data.verified && (
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                  </div>
                  {data.date && data.date !== "N/A" && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{data.date}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed mb-4">{data.text}</p>
                
                {data.media && data.media.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Image className="h-4 w-4" />
                      <span className="text-sm font-medium">Media ({data.media.length})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {data.media.slice(0, 4).map((mediaUrl, index) => (
                        <img
                          key={index}
                          src={mediaUrl}
                          alt={`Media ${index + 1}`}
                          className="rounded-lg border object-cover aspect-video"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <Separator className="my-4" />
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{data.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Repeat2 className="h-4 w-4" />
                    <span>{data.retweets}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{data.replies}</span>
                  </div>
                </div>

                {(data.likes === "N/A" || data.retweets === "N/A") && (
                  <Alert className="mt-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Limited Data</AlertTitle>
                    <AlertDescription>
                      Due to Twitter/X's restrictions, engagement metrics may not be available. 
                      This tool focuses on extracting the tweet content and author information.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <ApiCard {...apiDocumentation} />
    </div>
  );
} 