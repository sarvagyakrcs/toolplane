"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Loader2 } from "lucide-react";
import { scrapeAmazonProduct } from "@/app/actions/scrapeAmazon";

interface AmazonProductData {
  title: string | null;
  price: string | null;
  image: string | null;
}

export function AmazonScraper() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<AmazonProductData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async () => {
    if (!url) {
      setError("Please enter an Amazon product URL.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const scrapedData = await scrapeAmazonProduct(url);
      setData(scrapedData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Amazon Price Scraper</CardTitle>
        <CardDescription>
          Paste an Amazon product link to extract its price, title, and image.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amazon-url">Amazon Product URL</Label>
            <Input
              id="amazon-url"
              type="url"
              placeholder="https://www.amazon.com/dp/B08P2H5L72"
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
            ) : "Scrape Price"}
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
          <Card className="mt-6 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-1">
                {data.image ? (
                  <img src={data.image} alt={data.title || "Product image"} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">No Image</span>
                  </div>
                )}
              </div>
              <div className="md:col-span-2 p-6">
                <CardTitle className="text-lg font-semibold leading-snug">{data.title}</CardTitle>
                <p className="text-3xl font-bold text-primary mt-4">{data.price}</p>
              </div>
            </div>
          </Card>
        )}
      </CardContent>
    </Card>
  );
} 