import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ImageScraper } from "@/components/tools/image-scraper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Scraper - Extract Images from Websites | Free Tool",
  description: "Extract all images from any website with metadata and smart filtering. Free image scraper tool with download capabilities. Perfect for designers and content creators.",
  keywords: [
    "image scraper",
    "website image extractor",
    "image downloader",
    "extract images from website",
    "bulk image downloader",
    "image harvester",
    "website image scraper",
    "image extraction tool",
    "photo scraper",
    "image collector",
    "free image scraper",
    "image finder tool"
  ],
  openGraph: {
    title: "Image Scraper - Extract Images from Websites | Toolplane",
    description: "Extract all images from any website with metadata and smart filtering. Free tool with download capabilities for designers and content creators.",
    type: "website",
    url: "https://toolplane.xyz/image-scraper",
    images: [
      {
        url: "/og-image-scraper.png",
        width: 1200,
        height: 630,
        alt: "Image Scraper Tool",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Scraper - Extract Images from Any Website",
    description: "Free image scraper. Extract all images from websites with metadata and download capabilities. Perfect for designers.",
    images: ["/twitter-image-scraper.png"],
  },
  alternates: {
    canonical: "https://toolplane.xyz/image-scraper",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImageScraperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Scraper",
    "description": "Extract all images from any website with metadata, smart filtering, and download capabilities for designers and content creators.",
    "url": "https://toolplane.xyz/image-scraper",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Extract all website images",
      "Image metadata extraction",
      "Smart filtering options",
      "Bulk download capability",
      "Image size detection",
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
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Toolkit
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Website Image Extractor</h1>
          <p className="text-muted-foreground">
            Extract all images from any website with metadata, smart filtering, and download capabilities.
          </p>
        </div>

        <ImageScraper />
      </div>
    </main>
  );
} 