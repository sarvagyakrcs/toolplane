import { QRGenerator } from "@/components/tools/qr-generator";
import { ApiCard } from "@/components/ui/api-card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator + API | Create Custom QR Codes Instantly | No Watermark",
  description: "Free QR code generator with API access. Create custom QR codes for URLs, text, and data. No watermark, unlimited downloads, customizable colors and sizes. Perfect for marketing, business cards, menus, and events.",
  keywords: [
    "free qr code generator",
    "qr code generator API free",
    "custom qr code maker",
    "no watermark qr code",
    "unlimited qr codes",
    "qr code generator online",
    "bulk qr code generator",
    "business qr code generator",
    "restaurant menu qr code",
    "event qr code generator",
    "marketing qr codes",
    "contactless menu qr",
    "wifi qr code generator",
    "vcard qr code generator",
    "social media qr codes",
    "instagram qr code",
    "whatsapp qr code",
    "url shortener qr code",
    "high resolution qr codes",
    "svg qr code generator",
    "png qr code generator",
    "qr code batch generator",
    "api qr code generation",
    "dynamic qr codes",
    "tracking qr codes",
    "branded qr codes"
  ],
  openGraph: {
    title: "QR Code Generator - Create Custom QR Codes | Toolplane",
    description: "Generate high-quality QR codes for any URL or text. Customize colors and size. Free tool with instant download and API access.",
    type: "website",
    url: "https://toolplane.xyz/qr-generator",

  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator - Create Custom QR Codes Instantly",
    description: "Free QR code generator. Create custom QR codes for URLs, text, and data. Instant download with customization options.",

  },
  alternates: {
    canonical: "https://toolplane.xyz/qr-generator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QRGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QR Code Generator",
    "description": "Generate customizable QR codes for any text or URL with options for size and colors. Free tool with API access.",
    "url": "https://toolplane.xyz/qr-generator",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Custom QR code generation",
      "Color customization",
      "Size adjustment",
      "Instant download",
      "High resolution output",
      "API access included"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Toolplane"
    }
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
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