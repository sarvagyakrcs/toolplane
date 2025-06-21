import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://toolplane.xyz'),
  title: {
    default: "Toolplane - Your Swiss Army Knife for the Web | Lightning-Fast Developer Tools & APIs",
    template: "%s | Toolplane - Developer Tools & APIs"
  },
  description: "Transform your workflow with Toolplane's lightning-fast web tools and powerful APIs. Extract data, convert formats, generate content, and scrape websites with blazing speed. Free developer tools for web scraping, markdown conversion, QR generation, password creation, and more.",
  keywords: [
    "web scraping tools",
    "developer tools",
    "API tools",
    "markdown converter",
    "QR code generator", 
    "password generator",
    "data extraction",
    "web scraping API",
    "Amazon scraper",
    "Reddit scraper",
    "YouTube scraper",
    "Bing scraper",
    "image scraper",
    "article cleaner",
    "base64 converter",
    "hash generator",
    "developer utilities",
    "web development tools",
    "data parsing",
    "content extraction",
    "toolplane",
    "online tools",
    "free developer tools",
    "web automation",
    "data mining tools"
  ],
  authors: [{ name: "Toolplane Team" }],
  creator: "Toolplane",
  publisher: "Toolplane",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolplane.xyz",
    siteName: "Toolplane",
    title: "Toolplane - Your Swiss Army Knife for the Web | Lightning-Fast Developer Tools & APIs",
    description: "Transform your workflow with Toolplane's lightning-fast web tools and powerful APIs. Extract data, convert formats, generate content, and scrape websites with blazing speed.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Toolplane - Lightning-Fast Developer Tools & APIs",
        type: "image/png",
      },
      {
        url: "/og-image-square.png", 
        width: 1200,
        height: 1200,
        alt: "Toolplane - Developer Tools",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolplane - Your Swiss Army Knife for the Web | Lightning-Fast Developer Tools & APIs",
    description: "Transform your workflow with Toolplane's lightning-fast web tools and powerful APIs. Extract, convert, and generate with blazing speed.",
    images: ["/twitter-image.png"],
    creator: "@toolplane",
    site: "@toolplane",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://toolplane.xyz",
    languages: {
      'en-US': 'https://toolplane.xyz',
      'x-default': 'https://toolplane.xyz',
    },
  },
  category: "Technology",
  classification: "Developer Tools",
  referrer: "origin-when-cross-origin",
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["https://toolplane.xyz"],
    },
  },
  appleWebApp: {
    capable: true,
    title: "Toolplane",
    statusBarStyle: "default",
  },
  applicationName: "Toolplane",
  generator: "Next.js",
  abstract: "Lightning-fast developer tools and APIs for web scraping, data extraction, and content conversion.",
  archives: ["https://toolplane.xyz/sitemap.xml"],
  assets: ["https://toolplane.xyz"],
  bookmarks: ["https://toolplane.xyz"],
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#000000",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Toolplane",
  "alternateName": "Toolplane Developer Tools",
  "url": "https://toolplane.xyz",
  "description": "Lightning-fast developer tools and APIs for web scraping, data extraction, content conversion, and web automation. Free online tools for developers.",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Toolplane",
    "url": "https://toolplane.xyz",
    "logo": {
      "@type": "ImageObject",
      "url": "https://toolplane.xyz/logo.png"
    }
  },
  "featureList": [
    "Web Scraping Tools",
    "Amazon Product Scraper", 
    "Reddit Content Scraper",
    "YouTube Data Extractor",
    "Bing Search Scraper",
    "Image Scraper",
    "Article Content Cleaner",
    "Markdown Converter",
    "QR Code Generator",
    "Password Generator",
    "Base64 Converter",
    "Hash Generator",
    "Developer APIs"
  ],
  "sameAs": [
    "https://github.com/toolplane",
    "https://twitter.com/toolplane"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="canonical" href="https://toolplane.xyz" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="robots" href="/robots.txt" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="ICBM" content="39.7392, -104.9903" />
        <meta name="DC.title" content="Toolplane - Developer Tools & APIs" />
        <meta name="DC.creator" content="Toolplane Team" />
        <meta name="DC.subject" content="Developer Tools, Web Scraping, APIs" />
        <meta name="DC.description" content="Lightning-fast developer tools and APIs for web scraping and data extraction" />
        <meta name="DC.publisher" content="Toolplane" />
        <meta name="DC.contributor" content="Toolplane Team" />
        <meta name="DC.date" content="2024" />
        <meta name="DC.type" content="Service" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content="https://toolplane.xyz" />
        <meta name="DC.language" content="en-US" />
        <meta name="DC.coverage" content="Worldwide" />
        <meta name="DC.rights" content="© 2024 Toolplane" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="English" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="content-language" content="en-US" />
        <meta name="reply-to" content="contact@toolplane.xyz" />
        <meta name="owner" content="Toolplane" />
        <meta name="url" content="https://toolplane.xyz" />
        <meta name="identifier-URL" content="https://toolplane.xyz" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        <meta name="slurp" content="index, follow" />
        <meta name="duckduckbot" content="index, follow" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grainy`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
