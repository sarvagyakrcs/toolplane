import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ArticleCleaner } from "@/components/tools/article-cleaner";

export default function ArticleCleanerPage() {
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Web Article Cleaner</h1>
          <p className="text-muted-foreground">
            Extract clean article content from any webpage and convert to HTML or Markdown with reading time and metadata.
          </p>
        </div>

        <ArticleCleaner />
      </div>
    </main>
  );
} 