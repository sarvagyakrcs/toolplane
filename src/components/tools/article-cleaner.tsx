"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, Loader2, Sparkles, Clock, BookOpen, Copy, Check, FileText } from "lucide-react";
import { cleanWebArticle } from "@/app/actions/cleanArticle";
import { ApiCard } from "@/components/ui/api-card";

interface CleanArticleData {
  title: string | null;
  author: string | null;
  publishedDate: string | null;
  description: string | null;
  content: string | null;
  markdown: string | null;
  readingTime: number;
  wordCount: number;
  tags: string[];
  url: string;
  domain: string;
  language: string | null;
  image: string | null;
}

export function ArticleCleaner() {
  const [url, setUrl] = useState("");
  const [outputFormat, setOutputFormat] = useState<'html' | 'markdown' | 'both'>('both');
  const [data, setData] = useState<CleanArticleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleClean = async () => {
    if (!url) {
      setError("Please enter an article URL.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const cleanedData = await cleanWebArticle(url, outputFormat);
      setData(cleanedData);
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

  const apiDocumentation = {
    endpoint: "/api/clean-article",
    method: "GET" as const,
    title: "Web Article Cleaner API",
    description: "Extract clean article content from any webpage and convert to HTML or Markdown with metadata, reading time, and automatic tag extraction.",
    parameters: [
      {
        name: "url",
        type: "string",
        required: true,
        description: "Article URL to clean and extract",
        example: "https://medium.com/@author/article-title"
      },
      {
        name: "format",
        type: "string",
        required: false,
        description: "Output format: 'html', 'markdown', or 'both' (default: 'both')",
        example: "markdown"
      }
    ],
    example: {
      request: "/api/clean-article?url=https://example.com/article&format=both",
      response: {
        title: "How to Build Better Web Applications",
        author: "Jane Developer",
        publishedDate: "2024-01-15",
        description: "A comprehensive guide to modern web development practices.",
        content: "<p>Clean HTML content...</p>",
        markdown: "# How to Build Better Web Applications\\n\\nClean markdown content...",
        readingTime: 8,
        wordCount: 1500,
        tags: ["web development", "javascript", "react"],
        url: "https://example.com/article",
        domain: "example.com",
        language: null,
        image: "https://example.com/featured-image.jpg"
      }
    },
    rateLimit: "20 requests/minute",
    category: "convert" as const
  };

  return (
    <div className="space-y-8">
      <Card className="w-full shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Web Article Cleaner</CardTitle>
          <CardDescription>
            Extract clean, readable article content from any webpage with automatic formatting, reading time calculation, and tag extraction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="article-url">Article URL</Label>
                <Input
                  id="article-url"
                  type="url"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleClean()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="output-format">Output Format</Label>
                <Select value={outputFormat} onValueChange={(value: 'html' | 'markdown' | 'both') => setOutputFormat(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">HTML + Markdown</SelectItem>
                    <SelectItem value="html">HTML Only</SelectItem>
                    <SelectItem value="markdown">Markdown Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={handleClean} disabled={loading || !url} className="w-full sm:w-auto">
              {loading ? (
                  <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Cleaning article...</span>
                  </div>
              ) : (
                <div className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Clean Article</span>
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
              {/* Article Metadata */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {data.image && (
                      <img
                        src={data.image}
                        alt="Article"
                        className="w-24 h-16 object-cover rounded-lg border flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold leading-tight mb-2">{data.title}</h3>
                      {data.description && (
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {data.description.length > 200 ? data.description.substring(0, 200) + '...' : data.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {data.author && (
                          <span>By {data.author}</span>
                        )}
                        {data.publishedDate && (
                          <span>{new Date(data.publishedDate).toLocaleDateString()}</span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {data.readingTime} min read
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {data.wordCount.toLocaleString()} words
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                {data.tags.length > 0 && (
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {data.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Article Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Cleaned Content
                  </CardTitle>
                  <CardDescription>
                    Clean, readable article content extracted from {data.domain}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={data.content && data.markdown ? "preview" : data.markdown ? "markdown" : "html"} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      {data.content && <TabsTrigger value="preview">Preview</TabsTrigger>}
                      {data.content && <TabsTrigger value="html">HTML</TabsTrigger>}
                      {data.markdown && <TabsTrigger value="markdown">Markdown</TabsTrigger>}
                    </TabsList>
                    
                    {data.content && (
                      <TabsContent value="preview" className="mt-4">
                        <div className="border rounded-lg p-4">
                          <ScrollArea className="h-96 w-full">
                            <div 
                              className="prose prose-sm max-w-none dark:prose-invert"
                              dangerouslySetInnerHTML={{ __html: data.content }}
                            />
                          </ScrollArea>
                        </div>
                      </TabsContent>
                    )}
                    
                    {data.content && (
                      <TabsContent value="html" className="mt-4">
                        <div className="relative">
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 z-10"
                            onClick={() => handleCopy(data.content || '', 'html')}
                          >
                            {copied === 'html' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            Copy HTML
                          </Button>
                          <ScrollArea className="h-96 w-full">
                            <pre className="p-4 bg-muted rounded-lg text-xs overflow-x-auto">
                              <code>{data.content}</code>
                            </pre>
                          </ScrollArea>
                        </div>
                      </TabsContent>
                    )}
                    
                    {data.markdown && (
                      <TabsContent value="markdown" className="mt-4">
                        <div className="relative">
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 z-10"
                            onClick={() => handleCopy(data.markdown || '', 'markdown')}
                          >
                            {copied === 'markdown' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            Copy Markdown
                          </Button>
                          <ScrollArea className="h-96 w-full">
                            <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                              <code>{data.markdown}</code>
                            </pre>
                          </ScrollArea>
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <ApiCard {...apiDocumentation} />
    </div>
  );
} 