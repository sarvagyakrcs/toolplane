import { PasswordGenerator } from "@/components/tools/password-generator";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PasswordGeneratorPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
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