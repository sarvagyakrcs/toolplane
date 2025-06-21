"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, Loader2, Images, Download, Copy, Check, ExternalLink, Eye } from "lucide-react";
import { scrapeSiteImages } from "@/app/actions/scrapeImages";
import { ApiCard } from "@/components/ui/api-card";

interface ImageData {
  src: string;
  alt: string | null;
  title: string | null;
  width: string | null;
  height: string | null;
  size: string | null;
}

interface SiteImagesData {
  url: string;
  totalImages: number;
  images: ImageData[];
  pageTitle: string | null;
}

export function ImageScraper() {
  const [url, setUrl] = useState("");
  const [limit, setLimit] = useState(50);
  const [data, setData] = useState<SiteImagesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleScrape = async () => {
    if (!url) {
      setError("Please enter a website URL.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const scrapedData = await scrapeSiteImages(url, limit);
      setData(scrapedData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'image';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const apiDocumentation = {
    endpoint: "/api/scrape-images",
    method: "GET" as const,
    title: "Website Image Extractor API",
    description: "Extract all images from any website with metadata, smart filtering, and various image sources including CSS backgrounds and social meta images.",
    parameters: [
      {
        name: "url",
        type: "string",
        required: true,
        description: "Website URL to extract images from",
        example: "https://example.com"
      },
      {
        name: "limit",
        type: "number",
        required: false,
        description: "Maximum number of images to return (default: 50)",
        example: "100"
      }
    ],
    example: {
      request: "/api/scrape-images?url=https://example.com&limit=20",
      response: {
        url: "https://example.com",
        totalImages: 15,
        pageTitle: "Example Website",
        images: [
          {
            src: "https://example.com/hero-image.jpg",
            alt: "Hero banner image",
            title: "Main banner",
            width: "1920",
            height: "1080",
            size: "1920x1080"
          },
          {
            src: "https://example.com/product.png",
            alt: "Product showcase",
            title: null,
            width: "800",
            height: "600",
            size: "800x600"
          }
        ]
      }
    },
    rateLimit: "20 requests/minute",
    category: "scrape" as const
  };

  return (
    <div className="space-y-8">
      <Card className="w-full shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Website Image Extractor</CardTitle>
          <CardDescription>
            Extract all images from any website including IMG tags, CSS backgrounds, and social meta images with smart filtering.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="site-url">Website URL</Label>
                <Input
                  id="site-url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-limit">Image Limit</Label>
                <Input
                  id="image-limit"
                  type="number"
                  min="1"
                  max="200"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                />
              </div>
            </div>
            
            <Button onClick={handleScrape} disabled={loading || !url} className="w-full sm:w-auto">
              {loading ? (
                  <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Extracting images...</span>
                  </div>
              ) : "Extract Images"}
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
            <div className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Images className="h-5 w-5" />
                        {data.pageTitle || "Website Images"}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        Found {data.totalImages} images from {data.url}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {data.totalImages} images
                    </Badge>
                  </div>
                </CardHeader>
                
                {data.images.length > 0 && (
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground">
                        Showing {data.images.length} of {data.totalImages} images
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(JSON.stringify(data.images, null, 2), 'json')}
                        >
                          {copied === 'json' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          Export JSON
                        </Button>
                      </div>
                    </div>

                    <ScrollArea className="h-96 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-4">
                        {data.images.map((image, index) => (
                          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="aspect-square relative bg-muted">
                              <img
                                src={image.src}
                                alt={image.alt || `Image ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                                }}
                                loading="lazy"
                              />
                              <div className="absolute top-2 right-2 flex gap-1">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                                  onClick={() => window.open(image.src, '_blank')}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                                  onClick={() => downloadImage(image.src, `image-${index + 1}`)}
                                >
                                  <Download className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <CardContent className="p-3">
                              <div className="space-y-2">
                                {image.alt && (
                                  <p className="text-xs text-muted-foreground">
                                    <strong>Alt:</strong> {image.alt.length > 50 ? image.alt.substring(0, 50) + '...' : image.alt}
                                  </p>
                                )}
                                
                                {image.size && (
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {image.size}
                                    </Badge>
                                    {image.title && (
                                      <Badge variant="outline" className="text-xs">
                                        {image.title.substring(0, 10)}...
                                      </Badge>
                                    )}
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-xs"
                                    onClick={() => handleCopy(image.src, `url-${index}`)}
                                  >
                                    {copied === `url-${index}` ? (
                                      <Check className="h-3 w-3" />
                                    ) : (
                                      <Copy className="h-3 w-3" />
                                    )}
                                    Copy URL
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>

                    {data.totalImages > data.images.length && (
                      <Alert className="mt-4">
                        <Eye className="h-4 w-4" />
                        <AlertTitle>More Images Available</AlertTitle>
                        <AlertDescription>
                          This site has {data.totalImages} total images. Increase the limit or use the API to get more results.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                )}
                
                {data.images.length === 0 && (
                  <CardContent>
                    <Alert>
                      <Images className="h-4 w-4" />
                      <AlertTitle>No Images Found</AlertTitle>
                      <AlertDescription>
                        No suitable images were found on this website. The site might not have images or they may be loaded dynamically.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                )}
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <ApiCard {...apiDocumentation} />
    </div>
  );
} 