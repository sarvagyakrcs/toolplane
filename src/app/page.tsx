import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, 
  Code, 
  FileText, 
  Globe, 
  ShoppingCart, 
  MessageSquare,
  QrCode,
  Settings,
  Zap,
  Youtube,
  Building2,
  Images
} from "lucide-react";

const tools = [
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
  
  // Converters
  {
    title: "Markdown Converter",
    description: "Convert any webpage into clean, readable Markdown.",
    href: "/converter",
    icon: <FileText className="h-8 w-8 text-primary" />,
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
  const categories = [...new Set(tools.map(tool => tool.category))];

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            GhostBox Toolkit
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive suite of {tools.length} powerful, developer-focused tools designed for the modern web. 
            Elegant, fast, and ready to work.
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            🚀 <strong>{tools.length}</strong> tools available • More coming soon
          </div>
        </header>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools
                .filter(tool => tool.category === category)
                .map((tool) => (
                  <Link href={tool.href} key={tool.href} className="group">
                    <Card className="h-full transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-base font-medium">{tool.title}</CardTitle>
                        {tool.icon}
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </CardContent>
                      <div className="flex justify-end p-4">
                          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        ))}


        <footer className="text-center mt-20 text-sm text-muted-foreground">
          <p>Built with care by <a href="https://github.com/thesarvagyakumar" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">@thesarvagyakumar</a> • Open source on GitHub</p>
        </footer>
      </div>
    </main>
  );
}
