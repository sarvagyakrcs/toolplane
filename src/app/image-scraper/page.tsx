import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ImageScraper } from "@/components/tools/image-scraper";

export default function ImageScraperPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
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