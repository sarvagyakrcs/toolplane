import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { YouTubeScraper } from "@/components/tools/youtube-scraper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free YouTube Scraper + API | Video Analytics & Channel Data Extractor | Content Research",
  description: "Free YouTube scraper with API access. Extract video views, likes, duration, channel data, and analytics. Perfect for content creators, marketers, and researchers. No YouTube API quota limits. Bulk video analysis available.",
  keywords: [
    "free youtube scraper",
    "youtube scraper API free",
    "youtube video analytics",
    "youtube data extractor",
    "youtube content research",
    "youtube channel analyzer",
    "video performance tracker",
    "youtube competitor analysis",
    "youtube trend analysis",
    "video marketing analytics",
    "youtube influencer research",
    "content creator tools",
    "youtube SEO analysis",
    "video engagement metrics",
    "youtube statistics tool",
    "social media analytics youtube",
    "youtube content strategy",
    "video viral analysis",
    "youtube algorithm insights",
    "youtube monetization tracker",
    "video thumbnail analyzer",
    "youtube description extractor",
    "channel growth tracker",
    "youtube api alternative free",
    "bulk youtube scraper",
    "youtube research automation"
  ],
  openGraph: {
    title: "YouTube Video Scraper - Extract Video Stats & Data | Toolplane",
    description: "Extract YouTube video statistics including views, likes, duration, and channel info. Free tool with API access for video content analysis.",
    type: "website",
    url: "https://toolplane.xyz/youtube-scraper",

  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Video Scraper - Extract Video Statistics",
    description: "Free YouTube scraper. Extract video views, likes, duration, and channel data. Perfect for content analysis.",

  },
  alternates: {
    canonical: "https://toolplane.xyz/youtube-scraper",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function YouTubeScraperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YouTube Video Scraper",
    "description": "Extract comprehensive video metadata including views, likes, duration, and channel information from YouTube videos.",
    "url": "https://toolplane.xyz/youtube-scraper",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Extract video views and likes",
      "Get video duration and upload date",
      "Fetch channel information",
      "Extract video descriptions",
      "API access included",
      "Real-time data extraction"
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
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Toolkit
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">YouTube Video Stats</h1>
          <p className="text-muted-foreground">
            Extract comprehensive video metadata including views, likes, duration, and channel information.
          </p>
        </div>

        <YouTubeScraper />
      </div>
    </main>
  );
} 