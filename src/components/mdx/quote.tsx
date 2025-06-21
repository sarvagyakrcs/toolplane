import { ReactNode } from 'react';

interface QuoteProps {
  children: ReactNode;
  author?: string;
  source?: string;
}

export function Quote({ children, author, source }: QuoteProps) {
  return (
    <figure className="my-12 not-prose">
      <blockquote className="text-2xl md:text-3xl font-serif italic leading-tight text-gray-900 text-center max-w-4xl mx-auto">
        <span className="text-6xl text-gray-300 leading-none">&ldquo;</span>
        <div className="px-8">
          {children}
        </div>
        <span className="text-6xl text-gray-300 leading-none">&rdquo;</span>
      </blockquote>
      {(author || source) && (
        <figcaption className="text-center mt-6 text-sm text-gray-600 font-sans">
          {author && <span className="font-medium">{author}</span>}
          {author && source && <span className="mx-2">•</span>}
          {source && <span className="italic">{source}</span>}
        </figcaption>
      )}
    </figure>
  );
} 