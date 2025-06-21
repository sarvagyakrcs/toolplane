"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Loader2, Copy, Check, Code } from "lucide-react";
import { encodeBase64, decodeBase64 } from "@/app/actions/base64";

export function Base64Converter() {
  const [encodeText, setEncodeText] = useState("");
  const [decodeText, setDecodeText] = useState("");
  const [encodeResult, setEncodeResult] = useState("");
  const [decodeResult, setDecodeResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleEncode = async () => {
    if (!encodeText) {
      setError("Please enter text to encode.");
      return;
    }
    setLoading(true);
    setError(null);
    setEncodeResult("");

    try {
      const result = await encodeBase64(encodeText);
      setEncodeResult(result.result);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDecode = async () => {
    if (!decodeText) {
      setError("Please enter Base64 text to decode.");
      return;
    }
    setLoading(true);
    setError(null);
    setDecodeResult("");

    try {
      const result = await decodeBase64(decodeText);
      setDecodeResult(result.result);
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

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Base64 Encoder/Decoder</CardTitle>
        <CardDescription>
          Encode text to Base64 or decode Base64 back to text.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="encode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>
          
          <TabsContent value="encode" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="encode-input">Text to Encode</Label>
              <Textarea
                id="encode-input"
                placeholder="Enter text to encode to Base64"
                value={encodeText}
                onChange={(e) => setEncodeText(e.target.value)}
                rows={4}
              />
            </div>
            <Button onClick={handleEncode} disabled={loading || !encodeText} className="w-full sm:w-auto">
              {loading ? (
                  <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Encoding...</span>
                  </div>
              ) : (
                  <div className="flex items-center">
                      <Code className="mr-2 h-4 w-4" />
                      <span>Encode to Base64</span>
                  </div>
              )}
            </Button>
            
            {encodeResult && (
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label>Base64 Result</Label>
                    <Button 
                      onClick={() => handleCopy(encodeResult, 'encode')} 
                      variant="ghost" 
                      size="sm"
                    >
                      {copied === 'encode' ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied === 'encode' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  <Textarea
                    value={encodeResult}
                    readOnly
                    rows={4}
                    className="font-mono text-sm"
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="decode" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="decode-input">Base64 to Decode</Label>
              <Textarea
                id="decode-input"
                placeholder="Enter Base64 text to decode"
                value={decodeText}
                onChange={(e) => setDecodeText(e.target.value)}
                rows={4}
              />
            </div>
            <Button onClick={handleDecode} disabled={loading || !decodeText} className="w-full sm:w-auto">
              {loading ? (
                  <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Decoding...</span>
                  </div>
              ) : (
                  <div className="flex items-center">
                      <Code className="mr-2 h-4 w-4" />
                      <span>Decode from Base64</span>
                  </div>
              )}
            </Button>
            
            {decodeResult && (
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label>Decoded Text</Label>
                    <Button 
                      onClick={() => handleCopy(decodeResult, 'decode')} 
                      variant="ghost" 
                      size="sm"
                    >
                      {copied === 'decode' ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied === 'decode' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  <Textarea
                    value={decodeResult}
                    readOnly
                    rows={4}
                    className="font-mono text-sm"
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
} 