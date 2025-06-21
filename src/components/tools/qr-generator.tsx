"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Loader2, Download, QrCode } from "lucide-react";
import { generateQRCode } from "@/app/actions/generateQR";

export function QRGenerator() {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text) {
      setError("Please enter text or URL to generate QR code.");
      return;
    }
    setLoading(true);
    setError(null);
    setQrCode(null);

    try {
      const qrCodeData = await generateQRCode(text);
      setQrCode(qrCodeData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCode;
    link.click();
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium">QR Code Generator</CardTitle>
        <CardDescription>
          Generate QR codes for any text, URL, or data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qr-text">Text or URL</Label>
            <Input
              id="qr-text"
              placeholder="https://example.com or any text"
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
                    <QrCode className="mr-2 h-4 w-4" />
                    <span>Generate QR Code</span>
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
        
        {qrCode && !loading && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <img src={qrCode} alt="Generated QR Code" className="border rounded-lg" />
                <Button onClick={downloadQR} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
} 