"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Loader2, Copy, Check, Hash } from "lucide-react";
import { generateHashes } from "@/app/actions/generateHash";

interface HashResult {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

export function HashGenerator() {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<HashResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text) {
      setError("Please enter text to generate hashes.");
      return;
    }
    setLoading(true);
    setError(null);
    setHashes(null);

    try {
      const result = await generateHashes(text);
      setHashes(result);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(type);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const hashTypes = [
    { key: 'md5', label: 'MD5', description: '32 characters' },
    { key: 'sha1', label: 'SHA1', description: '40 characters' },
    { key: 'sha256', label: 'SHA256', description: '64 characters' },
    { key: 'sha512', label: 'SHA512', description: '128 characters' },
  ];

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Hash Generator</CardTitle>
        <CardDescription>
          Generate MD5, SHA1, SHA256, and SHA512 hashes from any text.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hash-text">Text to Hash</Label>
            <Input
              id="hash-text"
              placeholder="Enter text to generate hashes"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          <Button onClick={handleGenerate} disabled={loading || !text} className="w-full sm:w-auto">
            {loading ? (
                <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                </div>
            ) : (
                <div className="flex items-center">
                    <Hash className="mr-2 h-4 w-4" />
                    <span>Generate Hashes</span>
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
        
        {hashes && !loading && (
          <div className="mt-6 space-y-4">
            {hashTypes.map(({ key, label, description }) => (
              <Card key={key}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Label className="font-medium">{label}</Label>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <Button 
                      onClick={() => handleCopy(hashes[key as keyof HashResult], key)} 
                      variant="ghost" 
                      size="sm"
                    >
                      {copiedHash === key ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copiedHash === key ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-md font-mono text-xs break-all">
                    {hashes[key as keyof HashResult]}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 