import Link from "next/link";
import { ChevronLeft, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alibaba Product Scraper - Extract B2B Product Data | Coming Soon",
  description: "Extract Alibaba product information, pricing, and supplier details. B2B scraper tool for wholesale research and supplier analysis. Coming soon to Toolplane.",
  keywords: [
    "alibaba scraper",
    "alibaba product scraper",
    "b2b scraper",
    "wholesale scraper",
    "supplier scraper",
    "alibaba data extraction",
    "product research tool",
    "supplier analysis tool",
    "wholesale price tracker",
    "b2b data tool",
    "alibaba api alternative",
    "supplier verification tool"
  ],
  openGraph: {
    title: "Alibaba Product Scraper - B2B Data Extraction | Toolplane",
    description: "Extract Alibaba product information, pricing, and supplier details. Professional B2B scraper tool for wholesale research. Coming soon.",
    type: "website",
    url: "https://toolplane.xyz/alibaba-scraper",
    images: [
      {
        url: "/og-alibaba-scraper.png",
        width: 1200,
        height: 630,
        alt: "Alibaba Product Scraper Tool",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alibaba Product Scraper - B2B Data Extraction Tool",
    description: "Extract Alibaba product data for wholesale research and supplier analysis. Professional B2B scraper coming soon.",
    images: ["/twitter-alibaba-scraper.png"],
  },
  alternates: {
    canonical: "https://toolplane.xyz/alibaba-scraper",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AlibabaScraperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Alibaba Product Scraper",
    "description": "Extract product information, pricing, and supplier details from Alibaba for B2B research and wholesale analysis.",
    "url": "https://toolplane.xyz/alibaba-scraper",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Product title and description extraction",
      "Price ranges and MOQ details",
      "Supplier information and ratings",
      "Product images and specifications",
      "Response rates and verification status",
      "B2B data analysis"
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Alibaba Product Scraper</h1>
          <p className="text-muted-foreground">
            Extract product information, pricing, and supplier details from Alibaba.
          </p>
        </div>

        <Card className="w-full shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-xl font-medium">Coming Soon</CardTitle>
                <CardDescription>
                  This tool is currently under development and will be available soon.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The Alibaba Product Scraper will allow you to extract comprehensive product information including:
            </p>
            <ul className="mt-3 text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Product title and description</li>
              <li>• Price ranges and minimum order quantities</li>
              <li>• Supplier information and ratings</li>
              <li>• Product images and specifications</li>
              <li>• Response rates and verification status</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 