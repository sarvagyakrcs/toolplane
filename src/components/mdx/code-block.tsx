import { ReactNode } from 'react';

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  title?: string;
}

export function CodeBlock({ children, language, title }: CodeBlockProps) {
  return (
    <figure className="my-8 not-prose">
      {title && (
        <figcaption className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300 tracking-wide font-sans border-b border-gray-200 pb-2">
          {title}
        </figcaption>
      )}
      <div className="relative group">
        <pre className="bg-gray-950 text-gray-100 p-6 overflow-x-auto border border-gray-800 font-mono text-sm leading-6 rounded-none shadow-sm">
          <code className={language ? `language-${language}` : ''}>
            {children}
          </code>
        </pre>
        {language && (
          <div className="absolute top-4 right-4 text-xs text-gray-400 font-mono uppercase tracking-wider bg-gray-800/50 px-2 py-1 rounded-sm">
            {language}
          </div>
        )}
      </div>
    </figure>
  );
}