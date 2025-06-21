"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchTools, type Tool } from "@/components/ui/search-tools";
import { 
  ArrowRight, 
  FileText, 
  Globe, 
  ShoppingCart, 
  MessageSquare,
  QrCode,
  Zap,
  Youtube,
  Building2,
  Images,
  Search,
  Sparkles
} from "lucide-react";

const tools: Tool[] = [
  // Scrapers
  {
    title: "Web Scraper",
    description: "Extract data from any website with CSS selectors.",
    href: "/scraper",
    icon: <Globe className="h-8 w-8 text-primary" />,
    category: "Scrapers"
  },
  {
    title: "Amazon Price Scraper",
    description: "Extract price, title, and image from any Amazon product.",
    href: "/amazon-scraper",
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    category: "Scrapers"
  },
  {
    title: "Reddit Post Scraper",
    description: "Get upvotes, comments, and metadata from Reddit posts with optional comment extraction.",
    href: "/reddit-scraper",
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    category: "Scrapers"
  },
  {
    title: "YouTube Video Stats",
    description: "Get video details, views, likes, duration, and channel info.",
    href: "/youtube-scraper",
    icon: <Youtube className="h-8 w-8 text-primary" />,
    category: "Scrapers"
  },
  {
    title: "Alibaba Product Scraper",
    description: "Extract product info, pricing, and supplier details from Alibaba.",
    href: "/alibaba-scraper",
    icon: <Building2 className="h-8 w-8 text-primary" />,
    category: "Scrapers"
  },
  {
    title: "Website Image Extractor",
    description: "Extract all images from any website with metadata and filtering.",
    href: "/image-scraper",
    icon: <Images className="h-8 w-8 text-primary" />,
    category: "Scrapers"
  },

  {
    title: "Bing Search Results",
    description: "Extract search results and suggestions from Microsoft Bing search engine.",
    href: "/bing-scraper",
    icon: <Search className="h-8 w-8 text-primary" />,
    category: "Scrapers"
  },
  
  // Converters
  {
    title: "Markdown Converter",
    description: "Convert any webpage into clean, readable Markdown.",
    href: "/converter",
    icon: <FileText className="h-8 w-8 text-primary" />,
    category: "Converters"
  },
  {
    title: "Web Article Cleaner",
    description: "Extract clean article content and convert to HTML or Markdown with reading time.",
    href: "/article-cleaner",
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    category: "Converters"
  },

  // Generators
  {
    title: "QR Code Generator",
    description: "Generate QR codes for any text, URL, or data.",
    href: "/qr-generator",
    icon: <QrCode className="h-8 w-8 text-primary" />,
    category: "Generators"
  },
  {
    title: "Password Generator",
    description: "Generate secure passwords with custom criteria.",
    href: "/password-generator",
    icon: <Zap className="h-8 w-8 text-primary" />,
    category: "Generators"
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [...new Set(tools.map(tool => tool.category))];

  // Filter tools based on search query
  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered tools by category
  const filteredCategories = categories.filter(category =>
    filteredTools.some(tool => tool.category === category)
  );

  return (
    <main className="min-h-screen w-full text-foreground bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Toolplane
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Your Swiss Army Knife for the Web — Lightning-fast tools and powerful APIs built with precision and simplicity in mind.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="#tools" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Browse Tools
            </Link>
            <Link href="https://github.com/thesarvagyakumar/ghostbox" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors">
              Open Source
            </Link>
            <Link href="#api-docs" className="inline-flex items-center px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors">
              API Docs
            </Link>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            ⚡ <strong>{tools.length}</strong> blazing-fast tools • 🔓 Free tier • 📦 Developer APIs
          </div>
        </header>

        {/* Command Palette Search */}
        <div className="mb-12" id="tools">
          <SearchTools 
            tools={tools} 
            variant="command-palette" 
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-8 text-center">
            <p className="text-muted-foreground">
              Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} 
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Why Toolplane Section */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-semibold mb-8">Why Toolplane?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-medium mb-1">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Pages load in &lt;500ms</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔓</div>
              <h3 className="font-medium mb-1">Free & Open</h3>
              <p className="text-sm text-muted-foreground">Powerful free tier</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📦</div>
              <h3 className="font-medium mb-1">Developer APIs</h3>
              <p className="text-sm text-muted-foreground">Type-safe, ready to use</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="font-medium mb-1">Built to Scale</h3>
              <p className="text-sm text-muted-foreground">Grows with your needs</p>
            </div>
          </div>
        </div>

        {filteredCategories.map((category) => {
          const categoryConfig = {
            "Scrapers": { icon: "🔍", description: "Extract data from any website" },
            "Converters": { icon: "🔧", description: "Transform content between formats" },
            "Generators": { icon: "🧩", description: "Create secure content and codes" }
          };
          
          return (
          <div key={category} className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                {categoryConfig[category as keyof typeof categoryConfig]?.icon} {category}
              </h2>
              <p className="text-muted-foreground">
                {categoryConfig[category as keyof typeof categoryConfig]?.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools
                .filter(tool => tool.category === category)
                .map((tool) => (
                  <Link href={tool.href} key={tool.href} className="group">
                    <Card className="h-full transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
                      <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <div className="flex items-center gap-3">
                          {tool.icon}
                          <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-primary font-medium">Try now →</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        )})}

        {/* No Results Found */}
        {searchQuery && filteredTools.length === 0 && (
          <div className="text-center py-16">
            <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-4">
              No tools match &quot;{searchQuery}&quot;. Try a different search term.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-primary hover:underline"
            >
              Clear search and show all tools
            </button>
          </div>
        )}

        <footer className="mt-20 pt-12 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Toolplane</h3>
              <p className="text-sm text-muted-foreground">Your Swiss Army Knife for the Web</p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#tools" className="hover:text-primary">Browse All</Link></li>
                <li><Link href="/scraper" className="hover:text-primary">Web Scraper</Link></li>
                <li><Link href="/converter" className="hover:text-primary">Converters</Link></li>
                <li><Link href="/qr-generator" className="hover:text-primary">Generators</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Developers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#api-docs" className="hover:text-primary">API Docs</Link></li>
                <li><a href="https://github.com/thesarvagyakumar/ghostbox" target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a></li>
                <li><Link href="#" className="hover:text-primary">Rate Limits</Link></li>
                <li><Link href="#" className="hover:text-primary">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Discord</Link></li>
                <li><Link href="#" className="hover:text-primary">Newsletter</Link></li>
                <li><Link href="#" className="hover:text-primary">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-border text-sm text-muted-foreground">
            <p>Built with care by <a href="https://github.com/thesarvagyakumar" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">@thesarvagyakumar</a> • Open source • ⚡ Blazing fast</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
