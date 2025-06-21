"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Copy, Check } from "lucide-react";
import { Separator } from "../ui/separator";
import { convertToMarkdown } from "@/app/actions/convert";

interface ConversionOptions {
  includeTitle: boolean;
  includeLinks: boolean;
  improveReadability: boolean;
}

export function MarkdownConverter() {
  const [url, setUrl] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [options, setOptions] = useState<ConversionOptions>({
    includeTitle: true,
    includeLinks: true,
    improveReadability: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = async () => {
    if (!url) {
      setError("Please enter a URL to convert.");
      return;
    }
    setLoading(true);
    setError(null);
    setMarkdown("");

    try {
      const result = await convertToMarkdown(url, options);
      setMarkdown(result.markdown);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Web to Markdown Converter</CardTitle>
        <CardDescription>
          Convert any webpage into clean, readable Markdown.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url-converter">Website URL</Label>
            <Input
              id="url-converter"
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
            />
          </div>

          <div className="space-y-3 pt-2">
            <Label>Options</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="improveReadability" checked={options.improveReadability} onCheckedChange={(checked) => setOptions({...options, improveReadability: !!checked})} />
              <Label htmlFor="improveReadability" className="font-normal">Extract main content</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="includeTitle" checked={options.includeTitle} onCheckedChange={(checked) => setOptions({...options, includeTitle: !!checked})} />
              <Label htmlFor="includeTitle" className="font-normal">Include page title</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="includeLinks" checked={options.includeLinks} onCheckedChange={(checked) => setOptions({...options, includeLinks: !!checked})} />
              <Label htmlFor="includeLinks" className="font-normal">Preserve links</Label>
            </div>
          </div>

          <Button onClick={handleConvert} disabled={loading || !url} className="w-full sm:w-auto">
            {loading ? "Converting..." : "Convert to Markdown"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {markdown && (
          <div className="mt-6">
            <Separator className="my-4" />
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Result</h3>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy'}
                </Button>
            </div>
            <div className="relative">
              <textarea
                readOnly
                value={markdown}
                className="w-full h-96 p-4 font-mono text-sm bg-muted rounded-md border"
                placeholder="Markdown output..."
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 