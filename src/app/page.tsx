"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Sparkles,
  Star,
  Clock,
  ExternalLink,
  Github,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { offside } from "@/lib/fonts";

interface Tool {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  category: string;
  tags?: string[];
  isNew?: boolean;
  hasFreeApi?: boolean;
}

const tools: Tool[] = [
  // Scrapers
  {
    title: "Web Scraper",
    description: "Extract data from any website with CSS selectors",
    href: "/scraper",
    icon: <Globe className="h-5 w-5" />,
    category: "Scrapers",
    tags: ["CSS", "Data"],
    hasFreeApi: true
  },
  {
    title: "Amazon Price Scraper",
    description: "Extract price, title, and image from Amazon products",
    href: "/amazon-scraper",
    icon: <ShoppingCart className="h-5 w-5" />,
    category: "Scrapers",
    tags: ["E-commerce", "Price"],
    hasFreeApi: true
  },
  {
    title: "Reddit Post Scraper",
    description: "Get upvotes, comments, and metadata from Reddit",
    href: "/reddit-scraper",
    icon: <MessageSquare className="h-5 w-5" />,
    category: "Scrapers",
    tags: ["Social", "Comments"],
    hasFreeApi: true
  },
  {
    title: "YouTube Video Stats",
    description: "Get video details, views, likes, and channel info",
    href: "/youtube-scraper",
    icon: <Youtube className="h-5 w-5" />,
    category: "Scrapers",
    tags: ["Video", "Analytics"],
    hasFreeApi: true
  },
  {
    title: "Alibaba Product Scraper",
    description: "Extract product info and supplier details",
    href: "/alibaba-scraper",
    icon: <Building2 className="h-5 w-5" />,
    category: "Scrapers",
    tags: ["B2B", "Wholesale"],
    isNew: true,
    hasFreeApi: true
  },
  {
    title: "Website Image Extractor",
    description: "Extract all images from websites with metadata",
    href: "/image-scraper",
    icon: <Images className="h-5 w-5" />,
    category: "Scrapers",
    tags: ["Images", "Media"],
    hasFreeApi: true
  },
  {
    title: "Bing Search Results",
    description: "Extract search results from Microsoft Bing",
    href: "/bing-scraper",
    icon: <Search className="h-5 w-5" />,
    category: "Scrapers",
    tags: ["Search", "SEO"],
    hasFreeApi: true
  },
  
  // Converters
  {
    title: "Markdown Converter",
    description: "Convert any webpage into clean Markdown",
    href: "/converter",
    icon: <FileText className="h-5 w-5" />,
    category: "Converters",
    tags: ["Markdown", "Content"],
    hasFreeApi: true
  },
  {
    title: "Web Article Cleaner",
    description: "Extract clean article content with reading time",
    href: "/article-cleaner",
    icon: <Sparkles className="h-5 w-5" />,
    category: "Converters",
    tags: ["Articles", "Clean"],
    hasFreeApi: true
  },

  // Generators
  {
    title: "QR Code Generator",
    description: "Generate QR codes for any text, URL, or data",
    href: "/qr-generator",
    icon: <QrCode className="h-5 w-5" />,
    category: "Generators",
    tags: ["QR", "Codes"],
    hasFreeApi: true
  },
  {
    title: "Password Generator",
    description: "Generate secure passwords with custom criteria",
    href: "/password-generator",
    icon: <Zap className="h-5 w-5" />,
    category: "Generators",
    tags: ["Security", "Passwords"],
    hasFreeApi: true
  },
];

const categories = ["All", "Scrapers", "Converters", "Generators"];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recentlyUsed, setRecentlyUsed] = useState<Tool[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load recently used tools from localStorage
  useEffect(() => {
    const recent = localStorage.getItem("recentlyUsedTools");
    if (recent) {
      const recentIds = JSON.parse(recent);
      const recentTools = tools.filter(tool => recentIds.includes(tool.href));
      setRecentlyUsed(recentTools.slice(0, 4));
    }
  }, []);

  // Filter tools based on search and category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToolClick = (tool: Tool) => {
    // Add to recently used
    const recent = JSON.parse(localStorage.getItem("recentlyUsedTools") || "[]");
    const updated = [tool.href, ...recent.filter((id: string) => id !== tool.href)].slice(0, 4);
    localStorage.setItem("recentlyUsedTools", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className={cn(offside.className, "font-bold text-xl tracking-tight")}>
            TOOLPLANE
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#tools" className="text-sm hover:text-primary transition-colors">Tools</Link>
            <Link href="#api" className="text-sm hover:text-primary transition-colors">API</Link>
            <Link href="https://github.com/thesarvagyakumar/ghostbox" target="_blank" className="text-sm hover:text-primary transition-colors">GitHub</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link href="#tools" className="block py-2 text-sm hover:text-primary transition-colors">Tools</Link>
              <Link href="#api" className="block py-2 text-sm hover:text-primary transition-colors">API</Link>
              <Link href="https://github.com/thesarvagyakumar/ghostbox" target="_blank" className="block py-2 text-sm hover:text-primary transition-colors">GitHub</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="grainy mb-10">
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Your Swiss Army Knife
            <br />
            <span className="text-primary">for the Web</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lightning-fast tools and powerful APIs built with precision. 
            Extract data, convert content, and generate utilities — all in one place.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>Trusted by developers</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-500" />
              <span>99.9% uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{tools.length}</span>
              <span>tools available</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="#tools">
                Browse Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="#api">
                View API Docs
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </div>

      {/* Recently Used Tools */}
      {recentlyUsed.length > 0 && (
        <section className="container mx-auto px-4 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Recently Used</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentlyUsed.map((tool) => (
              <Link 
                key={tool.href} 
                href={tool.href}
                onClick={() => handleToolClick(tool)}
                className="group"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-primary">{tool.icon}</div>
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                        {tool.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Tools Section */}
      <section id="tools" className="container mx-auto px-4 pb-16">
        {/* Search and Filter */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools... (try 'scraper', 'convert', 'generate')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 focus:border-primary"
            />
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
                {category !== "All" && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {tools.filter(t => t.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <Link 
              key={tool.href} 
              href={tool.href}
              onClick={() => handleToolClick(tool)}
              className="group"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-primary">{tool.icon}</div>
                    <div className="flex gap-1">
                      {tool.isNew && (
                        <Badge className="text-xs bg-green-100 text-green-800 hover:bg-green-100">
                          New
                        </Badge>
                      )}
                      {tool.hasFreeApi && (
                        <Badge variant="outline" className="text-xs">
                          Free API
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                  
                  {tool.tags && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tool.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Button 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    variant="outline"
                  >
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No tools found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or selecting a different category
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TOOLPLANE</h3>
              <p className="text-sm text-muted-foreground">
                Fast, reliable tools for developers
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#tools" className="hover:text-primary transition-colors">All Tools</Link></li>
                <li><Link href="#api" className="hover:text-primary transition-colors">API Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Rate Limits</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/thesarvagyakumar/ghostbox" target="_blank" className="hover:text-primary transition-colors flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  GitHub
                </a></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Discord</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Newsletter</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              Built by{" "}
              <a 
                href="https://github.com/thesarvagyakumar" 
                target="_blank" 
                className="underline hover:text-primary transition-colors"
              >
                @thesarvagyakumar
              </a>
              {" "}• Open source • Lightning fast
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
