import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Brave Search Scraper + API | Extract Search Results & Data | Privacy-Focused SEO Tool",
  description: "Free Brave Search scraper with API access. Extract search results, rankings, and SEO data from Brave's privacy-focused search engine. Perfect for SEO research, competitor analysis, and market intelligence. No rate limits.",
  keywords: [
    "free brave search scraper",
    "brave search API free",
    "brave search results extractor",
    "privacy search scraper",
    "brave SEO tool",
    "search engine scraper",
    "brave search analytics",
    "SEO research tool",
    "search ranking tracker",
    "brave search data mining",
    "privacy-focused search tool",
    "alternative search scraper",
    "brave search intelligence",
    "search result analyzer",
    "brave SERP scraper",
    "search engine optimization tool",
    "competitor search analysis",
    "keyword research brave",
    "search trend analysis",
    "brave search monitoring",
    "search visibility tool",
    "organic search scraper",
    "search performance tracker",
    "brave search insights",
    "privacy search analytics",
    "search engine research"
  ],
  openGraph: {
    title: "Free Brave Search Scraper + API | Extract Search Results & SEO Data | Toolplane",
    description: "Free Brave Search scraper with API access. Extract search results, rankings, and SEO data from Brave's privacy-focused search engine. Perfect for SEO research and competitor analysis.",
    type: "website",
    url: "https://toolplane.xyz/brave-scraper",
    images: [
      {
        url: "/og-brave-scraper.png",
        width: 1200,
        height: 630,
        alt: "Free Brave Search Scraper with API Access",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Brave Search Scraper + API | Extract Search Results & SEO Data",
    description: "Free Brave Search scraper with API access. Extract search results, rankings, and SEO data from privacy-focused search engine. Perfect for SEO research.",
    images: ["/twitter-brave-scraper.png"],
  },
  alternates: {
    canonical: "https://toolplane.xyz/brave-scraper",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "application-name": "Brave Search Scraper",
    "apple-mobile-web-app-title": "Brave Scraper",
  },
};

export default function BraveScraperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Brave Search Scraper with API",
    "description": "Extract search results, rankings, and SEO data from Brave Search. Free tool with API access for SEO research, competitor analysis, and market intelligence on privacy-focused search engine.",
    "url": "https://toolplane.xyz/brave-scraper",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free Brave Search scraping tool with unlimited API access"
    },
    "featureList": [
      "Free API access",
      "Search result extraction",
      "SERP analysis",
      "Ranking tracking",
      "SEO data mining",
      "Competitor analysis",
      "Keyword research",
      "Privacy-focused search",
      "Bulk data extraction",
      "Real-time scraping"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Toolplane"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "SEO Specialists, Digital Marketers, Researchers, Data Analysts"
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Brave Search Scraper</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Extract search results, rankings, and SEO data from Brave's privacy-focused search engine. 
            Free tool with API access for SEO research and competitor analysis.
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">🚧 Coming Soon</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our Brave Search scraper is currently under development. We're building a powerful tool to extract 
            search results and SEO data from Brave's privacy-focused search engine.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            <div className="text-center">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-semibold">Search Results</h3>
              <p className="text-sm text-muted-foreground">Extract SERP data and rankings</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="font-semibold">Privacy-Focused</h3>
              <p className="text-sm text-muted-foreground">Alternative to Google scraping</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold">SEO Analytics</h3>
              <p className="text-sm text-muted-foreground">Comprehensive search intelligence</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Interested in privacy-focused search analytics? Follow us on{" "}
            <a href="https://twitter.com/toolplane" target="_blank" rel="noopener noreferrer" 
               className="text-primary hover:underline">@toolplane</a>{" "}
            for updates
          </p>
        </div>
      </div>
    </main>
  );
} 