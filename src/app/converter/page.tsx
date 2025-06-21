import { MarkdownConverter } from "@/components/tools/markdown-converter";
import { ApiCard } from "@/components/ui/api-card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ConverterPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
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