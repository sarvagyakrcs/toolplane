import { MarkdownConverter } from "@/components/tools/markdown-converter";
import { ApiCard } from "@/components/ui/api-card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Markdown Converter + API | HTML to Markdown | Web Content to MD Format",
  description: "Free markdown converter with API access. Convert webpages, HTML, and articles to clean Markdown format instantly. Perfect for developers, technical writers, documentation, and content creators. Bulk conversion available.",
  keywords: [
    "free markdown converter",
    "markdown converter API free",
    "HTML to markdown converter",
    "webpage to markdown",
    "article to markdown",
    "content to markdown",
    "markdown generator online",
    "bulk markdown converter",
    "technical documentation tool",
    "markdown automation",
    "content migration tool",
    "markdown export tool",
    "cms to markdown",
    "notion to markdown",
    "confluence to markdown",
    "github markdown converter",
    "documentation converter",
    "markdown publishing tool",
    "blog to markdown",
    "website to markdown",
    "clean markdown extraction",
    "markdown formatting tool",
    "content management markdown",
    "markdown workflow tool",
    "developer documentation tool",
    "technical writing converter"
  ],
  openGraph: {
    title: "Markdown Converter - Convert Webpages to Markdown | Toolplane",
    description: "Convert any webpage to clean Markdown format instantly. Free tool perfect for developers, writers, and content creators.",
    type: "website",
    url: "https://toolplane.xyz/converter",

  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Converter - Convert Webpages to Markdown",
    description: "Free markdown converter. Convert any webpage to clean Markdown format. Perfect for documentation and content creation.",

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