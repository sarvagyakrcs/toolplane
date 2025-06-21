import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Twitter Scraper + API | Extract Tweets, Profiles & Analytics | X Data Extractor",
  description: "Free Twitter/X scraper with API access. Extract tweets, user profiles, followers, engagement metrics, and trending data. Perfect for social media research, sentiment analysis, and competitor monitoring. No Twitter API limits.",
  keywords: [
    "free twitter scraper",
    "twitter scraper API free",
    "X scraper tool",
    "tweet extractor",
    "twitter data mining",
    "social media scraper",
    "twitter analytics tool",
    "tweet sentiment analysis",
    "twitter trend analysis",
    "twitter profile scraper",
    "twitter follower scraper",
    "twitter engagement metrics",
    "social listening twitter",
    "twitter competitor analysis",
    "twitter influencer research",
    "twitter brand monitoring",
    "twitter market research",
    "twitter content analysis",
    "twitter hashtag scraper",
    "twitter thread scraper",
    "twitter automation tool",
    "twitter intelligence tool",
    "twitter data extraction",
    "twitter api alternative free",
    "bulk twitter scraper",
    "twitter research tool"
  ],
  openGraph: {
    title: "Free Twitter Scraper + API | Extract Tweets & Analytics | X Data Extractor | Toolplane",
    description: "Free Twitter/X scraper with API access. Extract tweets, profiles, followers, and analytics. Perfect for social media research and sentiment analysis. No Twitter API limits.",
    type: "website",
    url: "https://toolplane.xyz/twitter-scraper",
    images: [
      {
        url: "/og-twitter-scraper.png",
        width: 1200,
        height: 630,
        alt: "Free Twitter Scraper with API Access",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Twitter Scraper + API | Extract Tweets & Analytics | X Data Extractor",
    description: "Free Twitter/X scraper with API access. Extract tweets, profiles, followers, and engagement metrics. Perfect for social media research.",
    images: ["/twitter-twitter-scraper.png"],
  },
  alternates: {
    canonical: "https://toolplane.xyz/twitter-scraper",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "application-name": "Twitter Scraper",
    "apple-mobile-web-app-title": "Twitter Scraper",
  },
};

export default function TwitterScraperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Twitter Scraper with API",
    "description": "Extract Twitter/X data including tweets, user profiles, followers, and engagement metrics. Free tool with API access for social media research and analysis. No Twitter API quota limits.",
    "url": "https://toolplane.xyz/twitter-scraper",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free Twitter scraping tool with unlimited API access"
    },
    "featureList": [
      "Free API access",
      "Extract tweets and threads",
      "User profile data extraction",
      "Follower analytics",
      "Engagement metrics",
      "Hashtag analysis",
      "Trend monitoring",
      "Sentiment analysis",
      "Bulk data extraction",
      "Real-time scraping"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Toolplane"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Social Media Managers, Researchers, Data Analysts, Marketers"
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Twitter / X Scraper</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Extract comprehensive Twitter/X data including tweets, user profiles, followers, and engagement metrics. 
            Free tool with API access for social media research and analysis.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">🚧 Coming Soon</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our Twitter/X scraper is currently under development. We're building a powerful tool to extract tweets, 
            profiles, and analytics data with full API access.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            <div className="text-center">
              <div className="text-2xl mb-2">🐦</div>
              <h3 className="font-semibold">Tweet Extraction</h3>
              <p className="text-sm text-muted-foreground">Extract tweets, threads, and replies</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-muted-foreground">Engagement metrics and insights</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-semibold">Free API</h3>
              <p className="text-sm text-muted-foreground">No limits, completely free access</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Want to be notified when it's ready? Follow us on Twitter{" "}
            <a href="https://twitter.com/toolplane" target="_blank" rel="noopener noreferrer" 
               className="text-primary hover:underline">@toolplane</a>
          </p>
        </div>
      </div>
    </main>
  );
} 