import Link from "next/link";
import { ChevronLeft, Images } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImageScraperPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Toolkit
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Website Image Extractor</h1>
          <p className="text-muted-foreground">
            Extract all images from any website with metadata and smart filtering.
          </p>
        </div>

        <Card className="w-full shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Images className="h-8 w-8 text-primary" />
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
              The Website Image Extractor will allow you to extract all images from any website.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 