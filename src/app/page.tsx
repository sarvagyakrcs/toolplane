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
  X,
  Coffee,
  Heart,
  TrendingUp,
  Users,
  Timer,
  Shield,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { offside } from "@/lib/fonts";
import BuyMeACoffeeButton from "@/components/buy-me-a-coffee-button";

interface Tool {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  category: string;
  tags?: string[];
  isNew?: boolean;
  hasFreeApi?: boolean;
  isPopular?: boolean;
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
    hasFreeApi: true,
    isPopular: true
  },
  {
    title: "Amazon Price Scraper",
    description: "Extract price, title, and image from Amazon products",
    href: "/amazon-scraper",
    icon: <ShoppingCart className="h-5 w-5" />,
    category: "Scrapers",
    tags: ["E-commerce", "Price"],
    hasFreeApi: true,
    isPopular: true
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
  const [liveUsers, setLiveUsers] = useState(847);
  const [quickUrl, setQuickUrl] = useState("");

  // Simulate live user count
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const handleQuickScrape = () => {
    if (quickUrl.trim()) {
      // Add to recently used
      handleToolClick(tools[0]); // Web scraper tool
      // Redirect to scraper with URL parameter
      window.location.href = `/scraper?url=${encodeURIComponent(quickUrl.trim())}`;
    }
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
            <Link href="/blog" target="_blank" className="text-sm hover:text-primary transition-colors">Blog</Link>
            <Link href="https://github.com/sarvagyakrcs" target="_blank" className="text-sm hover:text-primary transition-colors">GitHub</Link>
            <BuyMeACoffeeButton />
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
              <Link href="/blog" target="_blank" className="block py-2 text-sm hover:text-primary transition-colors">Blog</Link>
              <Link href="https://github.com/sarvagyakrcs" target="_blank" className="block py-2 text-sm hover:text-primary transition-colors">GitHub</Link>
              <div className="pt-2">
                <BuyMeACoffeeButton variant="outline" size="sm" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50/50 via-slate-50/50 to-gray-50/50 dark:from-blue-950/20 dark:via-slate-950/20 dark:to-gray-950/20 border-b">
        <section className="container mx-auto px-4 py-16 md:py-20 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Live indicator */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium mb-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{liveUsers.toLocaleString()} developers using today</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
              I built this because I was tired of{" "}
              <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
                building scrapers
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              After countless nights debugging XPath selectors and fighting anti-bot measures, 
              I built the tools I wish existed. 
              <span className="font-semibold text-gray-900 dark:text-gray-100">Now you can extract data from any website without the headache.</span>
            </p>

            {/* Enhanced CTA */}
            <div className="max-w-md mx-auto mb-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-slate-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg">
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={quickUrl}
                      onChange={(e) => setQuickUrl(e.target.value)}
                      className="flex-1 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && quickUrl.trim()) {
                          handleQuickScrape();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleQuickScrape}
                      disabled={!quickUrl.trim()}
                      className="h-11 px-4 bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white border-0 shadow-sm"
                    >
                      <Globe className="h-4 w-4 mr-1.5" />
                      Scrape
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    No signup required • Results in seconds
                  </p>
                </div>
              </div>
            </div>

            {/* Simple secondary action */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <Button variant="ghost" className="text-gray-600 dark:text-gray-400 hover:text-blue-600" asChild>
                <Link href="#tools">
                  Browse all tools →
                </Link>
              </Button>
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>by developers</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built by a developer, for developers. Always free.
            </p>
          </div>
        </section>
      </div>

      {/* Smart Recommendations */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold mb-2">Popular right now</h2>
          <p className="text-sm text-muted-foreground">
            Tools our community uses most often
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Link href="/amazon-scraper" className="group">
            <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1 border-orange-100 dark:border-orange-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <ShoppingCart className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm group-hover:text-orange-600 transition-colors">
                      Amazon Scraper
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Get prices, titles, reviews
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
                    🔥 Hot
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-orange-600 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/reddit-scraper" className="group">
            <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1 border-red-100 dark:border-red-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <MessageSquare className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm group-hover:text-red-600 transition-colors">
                      Reddit Scraper
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Posts, comments, votes
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                    📈 Trending
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-red-600 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/youtube-scraper" className="group">
            <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1 border-red-100 dark:border-red-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <Youtube className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm group-hover:text-red-600 transition-colors">
                      YouTube Stats
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Views, likes, channel info
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                    ⭐ Popular
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-red-600 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

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
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Available Tools
            </h2>
            <p className="text-muted-foreground">
              Pick what you need, use it instantly.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-8">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2"
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
                  className="transition-all hover:scale-105"
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
                <Card className={cn(
                  "h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2",
                  tool.isPopular 
                    ? "border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-slate-50/50 dark:from-blue-950/20 dark:to-slate-950/20" 
                    : "hover:border-primary/50"
                )}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className={cn(
                        "p-2 rounded-lg",
                        tool.isPopular ? "bg-blue-100 dark:bg-blue-900/50" : "bg-muted"
                      )}>
                        <div className="text-primary">{tool.icon}</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {tool.isPopular && (
                          <Badge className="text-xs bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white border-0">
                            🔥 Popular
                          </Badge>
                        )}
                        {tool.isNew && (
                          <Badge className="text-xs bg-green-500 text-white hover:bg-green-500">
                            ✨ New
                          </Badge>
                        )}
                        {tool.hasFreeApi && (
                          <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
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
                      className={cn(
                        "w-full transition-all duration-300 group-hover:scale-105",
                        tool.isPopular
                          ? "bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white border-0"
                          : "group-hover:bg-primary group-hover:text-primary-foreground"
                      )}
                      variant={tool.isPopular ? "default" : "outline"}
                    >
                      {tool.isPopular ? "Start Extracting" : "Try Free"}
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



      {/* Support Section */}
      <section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-yellow-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 border-y">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6">
              <Coffee className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Love these tools? ☕
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              If TOOLPLANE has saved you time or helped with your projects, consider supporting the development 
              with a coffee. Your support helps keep these tools free and continuously improved!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <BuyMeACoffeeButton variant="premium" size="lg" />
              <div className="text-sm text-muted-foreground">
                💡 <strong>100% free tools</strong> • No ads • No tracking
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium mb-2">Keep Tools Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Help maintain blazing-fast performance and reliable uptime
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                  <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium mb-2">Add New Features</h3>
                <p className="text-sm text-muted-foreground">
                  Fund development of new tools and API endpoints
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                  <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium mb-2">Show Appreciation</h3>
                <p className="text-sm text-muted-foreground">
                  A simple way to say thanks for the free tools and APIs
                </p>
              </div>
            </div>
          </div>
        </div>
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
                <li><a href="https://github.com/sarvagyakrcs" target="_blank" className="hover:text-primary transition-colors flex items-center gap-1">
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
                href="https://thesarvagyakumar.site" 
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
