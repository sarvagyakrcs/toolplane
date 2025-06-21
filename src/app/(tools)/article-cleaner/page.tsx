import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";
import { ArticleCleaner } from "@/components/tools/article-cleaner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article Cleaner - Extract Clean Content from Webpages | Free Tool",
  description: "Extract clean, readable article content from any webpage. Remove ads, clutter, and distractions. Free article cleaner tool with reading time calculation and tag extraction.",
  keywords: [
    "article cleaner",
    "content extractor",
    "article extractor",
    "clean article content",
    "webpage content cleaner",
    "article reader tool",
    "content optimization tool",
    "reading mode tool",
    "clean web content",
    "article parser",
    "content curation tool",
    "free article cleaner"
  ],
  openGraph: {
    title: "Article Cleaner - Extract Clean Content from Webpages | Toolplane",
    description: "Transform messy webpages into clean, readable content. Remove ads and clutter. Free tool with reading time calculation and auto tag extraction.",
    type: "website",
    url: "https://toolplane.xyz/article-cleaner",
    images: [
      {
        url: "/og-article-cleaner.png",
        width: 1200,
        height: 630,
        alt: "Article Cleaner Tool",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Article Cleaner - Extract Clean Content from Any Webpage",
    description: "Free article cleaner. Transform messy webpages into clean, readable content. Perfect for content creators and researchers.",
    images: ["/twitter-article-cleaner.png"],
  },
  alternates: {
    canonical: "https://toolplane.xyz/article-cleaner",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ArticleCleanerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Article Cleaner",
    "description": "Extract clean, readable article content from any webpage with automatic reading time calculation and tag extraction.",
    "url": "https://toolplane.xyz/article-cleaner",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Clean article extraction",
      "Remove ads and clutter",
      "Reading time calculation",
      "Auto tag extraction",
      "Instant processing",
      "Content optimization"
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
            Back to Toolplane
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Web Article Cleaner</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            🚀 One-click article extraction — Transform messy webpages into clean, readable content in seconds. 
            Perfect for content creators and researchers.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            ⚡ Instant processing • 📊 Reading time calculation • 🏷️ Auto tag extraction
          </div>
        </div>

        <ArticleCleaner />
      </div>
    </main>
  );
} 