import { PasswordGenerator } from "@/components/tools/password-generator";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Secure Password Generator + API | Strong Random Passwords | No Storage",
  description: "Free secure password generator with API access. Create strong, random passwords with custom criteria. No storage, completely private. Generate passwords with uppercase, lowercase, numbers, and symbols. Perfect for cybersecurity and account protection.",
  keywords: [
    "free password generator",
    "secure password generator",
    "strong password generator",
    "random password generator",
    "password generator API free",
    "bulk password generator",
    "cybersecurity password tool",
    "enterprise password generator",
    "password manager generator",
    "complex password generator",
    "uncrackable password generator",
    "cryptographically secure passwords",
    "password strength checker",
    "password security tool",
    "business password generator",
    "team password generator",
    "IT security password tool",
    "password policy generator",
    "compliance password generator",
    "NIST password generator",
    "enterprise security tool",
    "password automation tool",
    "secure credential generator",
    "password best practices",
    "password entropy generator",
    "password vulnerability protection"
  ],
  openGraph: {
    title: "Password Generator - Create Secure Strong Passwords | Toolplane",
    description: "Generate secure, strong passwords with custom criteria. Free tool with multiple options for enhanced security and protection.",
    type: "website",
    url: "https://toolplane.xyz/password-generator",

  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator - Create Secure Strong Passwords",
    description: "Free password generator. Create secure, strong passwords with custom criteria. Enhance your security instantly.",

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