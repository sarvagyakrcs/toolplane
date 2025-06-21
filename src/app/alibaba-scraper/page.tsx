import Link from "next/link";
import { ChevronLeft, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AlibabaScraperPage() {
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