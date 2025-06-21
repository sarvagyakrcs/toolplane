import { PasswordGenerator } from "@/components/tools/password-generator";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator - Create Secure Strong Passwords | Free Tool",
  description: "Generate secure, strong passwords with custom criteria. Free password generator tool with uppercase, lowercase, numbers, and symbols. Enhance your security instantly.",
  keywords: [
    "password generator",
    "strong password generator",
    "secure password generator",
    "random password generator",
    "password creator",
    "password maker",
    "security password tool",
    "strong password creator",
    "password generator tool",
    "secure passwords",
    "random passwords",
    "free password generator"
  ],
  openGraph: {
    title: "Password Generator - Create Secure Strong Passwords | Toolplane",
    description: "Generate secure, strong passwords with custom criteria. Free tool with multiple options for enhanced security and protection.",
    type: "website",
    url: "https://toolplane.xyz/password-generator",
    images: [
      {
        url: "/og-password-generator.png",
        width: 1200,
        height: 630,
        alt: "Password Generator Tool",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator - Create Secure Strong Passwords",
    description: "Free password generator. Create secure, strong passwords with custom criteria. Enhance your security instantly.",
    images: ["/twitter-password-generator.png"],
  },
  alternates: {
    canonical: "https://toolplane.xyz/password-generator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PasswordGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Password Generator",
    "description": "Generate secure passwords with custom criteria including length, uppercase, lowercase, numbers, and special characters.",
    "url": "https://toolplane.xyz/password-generator",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Custom password length",
      "Uppercase letters option",
      "Lowercase letters option",
      "Numbers inclusion",
      "Special characters",
      "Instant generation"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Toolplane"
    }
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Toolkit
          </Link>
        </div>
        <PasswordGenerator />
      </div>
    </main>
  );
} 