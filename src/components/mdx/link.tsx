import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export function CustomLink({ href, children }: LinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('https');
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900 underline decoration-blue-700/30 hover:decoration-blue-900/50 underline-offset-4 decoration-1 font-medium transition-all duration-200 inline-flex items-center gap-1"
      >
        {children}
        <ExternalLink className="h-3 w-3 opacity-60" />
      </a>
    );
  }

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-blue-700 hover:text-blue-900 underline decoration-blue-700/30 hover:decoration-blue-900/50 underline-offset-4 decoration-1 font-medium transition-all duration-200"
      >
        {children}
      </Link>
    );
  }

  return (
    <span className="text-blue-700 underline decoration-blue-700/30 underline-offset-4 decoration-1 font-medium">
      {children}
    </span>
  );
} 