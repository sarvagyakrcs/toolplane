"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Terminal, Loader2, Eye, ThumbsUp, Clock, User, Calendar } from "lucide-react";
import { scrapeYouTubeVideo } from "@/app/actions/scrapeYouTube";
import { ApiCard } from "@/components/ui/api-card";

interface YouTubeVideoData {
  title: string | null;
  channel: string | null;
  views: string | null;
  likes: string | null;
  duration: string | null;
  uploadDate: string | null;
  description: string | null;
  thumbnail: string | null;
  subscribers: string | null;
}

export function YouTubeScraper() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<YouTubeVideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async () => {
    if (!url) {
      setError("Please enter a YouTube video URL.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const scrapedData = await scrapeYouTubeVideo(url);
      setData(scrapedData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const apiDocumentation = {
    endpoint: "/api/scrape-youtube",
    method: "GET" as const,
    title: "YouTube Video Stats API",
    description: "Extract video metadata including title, views, likes, duration, channel info, and thumbnails from YouTube URLs.",
    parameters: [
      {
        name: "url",
        type: "string",
        required: true,
        description: "YouTube video URL (supports youtube.com, youtu.be, and embed formats)",
        example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
    ],
    example: {
      request: "/api/scrape-youtube?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      response: {
        title: "Rick Astley - Never Gonna Give You Up",
        channel: "Rick Astley",
        views: "1.2B",
        likes: "15M",
        duration: "3:33",
        uploadDate: "10/25/2009",
        description: "The official video for Rick Astley's classic hit...",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        subscribers: "N/A"
      }
    },
    rateLimit: "20 requests/minute",
    category: "scrape" as const
  };

  return (
    <div className="space-y-8">
      <Card className="w-full shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-medium">YouTube Video Stats</CardTitle>
          <CardDescription>
            Extract comprehensive video metadata including views, likes, duration, and channel information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube Video URL</Label>
              <Input
                id="youtube-url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
              />
            </div>
            
            <Button onClick={handleScrape} disabled={loading || !url} className="w-full sm:w-auto">
              {loading ? (
                  <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Fetching video stats...</span>
                  </div>
              ) : "Get Video Stats"}
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
                <div className="flex items-start gap-4">
                  {data.thumbnail && (
                    <img
                      src={data.thumbnail}
                      alt="Video thumbnail"
                      className="w-32 h-20 object-cover rounded-lg border flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold leading-tight mb-2">{data.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{data.channel}</span>
                      </div>
                      {data.duration && data.duration !== "N/A" && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{data.duration}</span>
                        </div>
                      )}
                      {data.uploadDate && data.uploadDate !== "N/A" && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{data.uploadDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {data.description && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {data.description}
                    </p>
                  </div>
                )}

                <Separator className="my-4" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-muted-foreground">Views</span>
                    </div>
                    <p className="text-lg font-semibold">{data.views}</p>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <ThumbsUp className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium text-muted-foreground">Likes</span>
                    </div>
                    <p className="text-lg font-semibold">{data.likes}</p>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-medium text-muted-foreground">Duration</span>
                    </div>
                    <p className="text-lg font-semibold">{data.duration}</p>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <User className="h-4 w-4 text-orange-600" />
                      <span className="text-xs font-medium text-muted-foreground">Channel</span>
                    </div>
                    <p className="text-sm font-semibold truncate">{data.channel}</p>
                  </div>
                </div>

                {(data.views === "N/A" || data.likes === "N/A") && (
                  <Alert className="mt-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Limited Data</AlertTitle>
                    <AlertDescription>
                      Some metrics may not be available due to YouTube's restrictions or the video's privacy settings.
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