import { MarkdownConverter } from "@/components/tools/markdown-converter";
import { ApiCard } from "@/components/ui/api-card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown Converter - Convert Webpages to Markdown | Free Tool",
  description: "Convert any webpage to clean Markdown format instantly. Free markdown converter tool for developers, writers, and content creators. Perfect for documentation and note-taking.",
  keywords: [
    "markdown converter",
    "html to markdown",
    "webpage to markdown",
    "markdown generator",
    "convert to markdown",
    "markdown tool",
    "html markdown converter",
    "web to markdown",
    "markdown extractor",
    "free markdown converter",
    "markdown creation tool",
    "content to markdown"
  ],
  openGraph: {
    title: "Markdown Converter - Convert Webpages to Markdown | Toolplane",
    description: "Convert any webpage to clean Markdown format instantly. Free tool perfect for developers, writers, and content creators.",
    type: "website",
    url: "https://toolplane.xyz/converter",
    images: [
      {
        url: "/og-markdown-converter.png",
        width: 1200,
        height: 630,
        alt: "Markdown Converter Tool",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Converter - Convert Webpages to Markdown",
    description: "Free markdown converter. Convert any webpage to clean Markdown format. Perfect for documentation and content creation.",
    images: ["/twitter-markdown-converter.png"],
  },
  alternates: {
    canonical: "https://toolplane.xyz/converter",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConverterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Markdown Converter",
    "description": "Convert any webpage into clean Markdown format, perfect for documentation, note-taking, and content creation.",
    "url": "https://toolplane.xyz/converter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "HTML to Markdown conversion",
      "Clean formatting",
      "Preserve links and images",
      "Instant conversion",
      "Copy to clipboard",
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
        <MarkdownConverter />
        
        <ApiCard
          title="Markdown Converter API"
          description="Convert any webpage to clean, readable Markdown with customizable options for content extraction."
          method="POST"
          endpoint="/api/convert-markdown"
          rateLimit="50 requests/minute"
          category="convert"
          parameters={[
            {
              name: "url",
              type: "string",
              required: true,
              description: "Web page URL to convert to Markdown",
              example: "https://example.com/article"
            },
            {
              name: "includeTitle",
              type: "boolean",
              required: false,
              description: "Include page title in Markdown (default: true)",
              example: "true"
            },
            {
              name: "includeLinks",
              type: "boolean",
              required: false,
              description: "Preserve links in Markdown (default: true)",
              example: "true"
            },
            {
              name: "improveReadability",
              type: "boolean",
              required: false,
              description: "Extract main content only (default: true)",
              example: "true"
            }
          ]}
          example={{
            request: "POST /api/convert-markdown",
            requestBody: {
              url: "https://example.com/article",
              includeTitle: true,
              includeLinks: true,
              improveReadability: true
            },
            response: {
              markdown: "# Article Title\n\nContent goes here...",
              title: "Article Title"
            }
          }}
        />
      </div>
    </main>
  );
} 