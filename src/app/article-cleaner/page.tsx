import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";
import { ArticleCleaner } from "@/components/tools/article-cleaner";

export default function ArticleCleanerPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
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