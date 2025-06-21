"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, Loader2, Search, ExternalLink, Globe, Hash, Sparkles } from "lucide-react";
import { scrapeBingSearch } from "@/app/actions/scrapeBing";
import { ApiCard } from "@/components/ui/api-card";

interface BingSearchResult {
  title: string;
  url: string;
  description: string;
  displayUrl: string;
}

interface BingSearchData {
  query: string;
  totalResults: string | null;
  results: BingSearchResult[];
  relatedSearches: string[];
  featuredSnippet: {
    title: string;
    content: string;
    url: string;
  } | null;
}

export function BingScraper() {
  const [query, setQuery] = useState("");
  const [numResults, setNumResults] = useState(10);
  const [data, setData] = useState<BingSearchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a search query.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const searchData = await scrapeBingSearch(query, numResults);
      setData(searchData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const apiDocumentation = {
    endpoint: "/api/scrape-bing",
    method: "GET" as const,
    title: "Bing Search Results API",
    description: "Extract search results, featured snippets, and related searches from Microsoft Bing search engine.",
    parameters: [
      {
        name: "query",
        type: "string",
        required: true,
        description: "Search query term",
        example: "machine learning algorithms"
      },
      {
        name: "numResults",
        type: "number",
        required: false,
        description: "Number of results to return (1-20, default: 10)",
        example: "15"
      }
    ],
    example: {
      request: "/api/scrape-bing?query=machine learning&numResults=10",
      response: {
        query: "machine learning",
        totalResults: "2,345",
        results: [
          {
            title: "Machine Learning Explained - Complete Guide",
            url: "https://example.com/ml-guide",
            description: "Learn everything about machine learning algorithms...",
            displayUrl: "example.com"
          }
        ],
        relatedSearches: ["deep learning", "AI algorithms"],
        featuredSnippet: {
          title: "What is Machine Learning?",
          content: "Machine learning is a subset of artificial intelligence...",
          url: "https://example.com/what-is-ml"
        }
      }
    },
    rateLimit: "20 requests/minute",
    category: "scrape" as const
  };

  return (
    <div className="space-y-8">
      <Card className="w-full shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Bing Search Results Scraper</CardTitle>
          <CardDescription>
            Extract search results from Microsoft Bing with featured snippets and related searches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3 space-y-2">
                <Label htmlFor="search-query">Search Query</Label>
                <Input
                  id="search-query"
                  type="text"
                  placeholder="Enter your search query..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="num-results">Results Count</Label>
                <Input
                  id="num-results"
                  type="number"
                  min="1"
                  max="20"
                  value={numResults}
                  onChange={(e) => setNumResults(Number(e.target.value))}
                />
              </div>
            </div>
            
            <Button onClick={handleSearch} disabled={loading || !query} className="w-full sm:w-auto">
              {loading ? (
                  <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Searching...</span>
                  </div>
              ) : (
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  <span>Search Bing</span>
                </div>
              )}
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
            <div className="mt-6 space-y-6">
              {/* Search Stats */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Search Results for &quot;{data.query}&quot;
                    </CardTitle>
                    <Badge variant="outline">
                      {data.totalResults} total results
                    </Badge>
                  </div>
                  <CardDescription>
                    Found {data.results.length} results from Bing Search
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Featured Snippet */}
              {data.featuredSnippet && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Featured Snippet
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{data.featuredSnippet.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {data.featuredSnippet.content}
                    </p>
                    {data.featuredSnippet.url && (
                      <a
                        href={data.featuredSnippet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                      >
                        <Globe className="h-3 w-3 mr-1" />
                        View source
                      </a>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Search Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Search Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96 w-full">
                    <div className="space-y-4 pr-4">
                      {data.results.map((result, index) => (
                        <div key={index} className="border-b border-muted pb-4 last:border-b-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <a
                                href={result.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                              >
                                <h3 className="font-medium text-primary hover:underline leading-tight mb-1">
                                  {result.title}
                                </h3>
                              </a>
                              <p className="text-xs text-green-600 mb-2">{result.displayUrl}</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {result.description}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                            >
                              <a
                                href={result.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Related Searches */}
              {data.relatedSearches.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      <Hash className="h-5 w-5" />
                      Related Searches
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {data.relatedSearches.map((search, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer hover:bg-secondary/80"
                          onClick={() => {
                            setQuery(search);
                          }}
                        >
                          {search}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {data.results.length === 0 && (
                <Alert>
                  <Search className="h-4 w-4" />
                  <AlertTitle>No Results Found</AlertTitle>
                  <AlertDescription>
                    No search results were found for &quot;{data.query}&quot;. Try a different search query or check your spelling.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <ApiCard {...apiDocumentation} />
    </div>
  );
}