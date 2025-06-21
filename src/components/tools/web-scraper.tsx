"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Separator } from "../ui/separator";
import { scrapeWebsite } from "@/app/actions/scrape";

interface ScrapedData {
  tag: string;
  text: string | null;
  attributes: { [key: string]: string };
}

export function WebScraper() {
  const [url, setUrl] = useState("");
  const [selector, setSelector] = useState("a");
  const [data, setData] = useState<ScrapedData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async () => {
    if (!url) {
      setError("Please enter a URL to scrape.");
      return;
    }
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const scrapedData = await scrapeWebsite(url, selector);
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
        <CardTitle className="text-xl font-medium">Web Page Scraper</CardTitle>
        <CardDescription>
          Enter a URL and a CSS selector to extract data from a web page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="selector">CSS Selector</Label>
              <Input
                id="selector"
                placeholder="e.g., 'h2', '.content', '#main'"
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
              />
            </div>
          </div>
          <Button onClick={handleScrape} disabled={loading || !url} className="w-full sm:w-auto">
            {loading ? "Scraping..." : "Scrape"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {data.length > 0 && (
          <div className="mt-6">
             <Separator className="my-4" />
            <h3 className="text-lg font-medium">Scraped Data</h3>
            <p className="text-sm text-muted-foreground mb-4">Found {data.length} elements matching &apos;{selector}&apos;.</p>
            <Accordion type="single" collapsible className="w-full">
              {data.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>
                    <span className="font-mono text-sm truncate pr-4">{`<${item.tag}> ${item.text || ""}`}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Text:</strong> {item.text || "N/A"}</p>
                      <p><strong>Attributes:</strong></p>
                      <pre className="p-2 bg-muted rounded-md text-xs overflow-x-auto">
                        {JSON.stringify(item.attributes, null, 2)}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 