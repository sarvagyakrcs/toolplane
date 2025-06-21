import { QRGenerator } from "@/components/tools/qr-generator";
import { ApiCard } from "@/components/ui/api-card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function QRGeneratorPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Toolkit
          </Link>
        </div>
        <QRGenerator />
        
        <ApiCard
          title="QR Code Generator API"
          description="Generate customizable QR codes for any text or URL with options for size and colors."
          method="GET"
          endpoint="/api/generate-qr"
          rateLimit="50 requests/minute"
          category="generate"
          parameters={[
            {
              name: "text",
              type: "string",
              required: true,
              description: "Text or URL to encode in the QR code",
              example: "https://example.com"
            },
            {
              name: "size",
              type: "number",
              required: false,
              description: "QR code size in pixels (default: 300)",
              example: "200"
            },
            {
              name: "darkColor",
              type: "string",
              required: false,
              description: "Dark color in hex format (default: #000000)",
              example: "#1a1a1a"
            },
            {
              name: "lightColor",
              type: "string",
              required: false,
              description: "Light color in hex format (default: #FFFFFF)",
              example: "#f8f8f8"
            }
          ]}
          example={{
            request: "/api/generate-qr?text=https://example.com&size=200",
            response: {
              qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
              text: "https://example.com",
              options: { size: 200 }
            }
          }}
        />
      </div>
    </main>
  );
} 