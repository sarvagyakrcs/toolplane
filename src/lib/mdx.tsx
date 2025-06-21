import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/mdx/callout';
import { CodeBlock } from '@/components/mdx/code-block';
import { Image } from '@/components/mdx/image';
import { CustomLink } from '@/components/mdx/link';
import { Quote } from '@/components/mdx/quote';
import { Divider } from '@/components/mdx/divider';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
          keepBackground: false,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ] as any,
  },
};

const mdxComponents: MDXComponents = {
  // Custom components
  Callout,
  CodeBlock,
  Image,
  Quote,
  Divider,
  
  // Override default HTML elements
  a: CustomLink,
  img: Image,
  
  // Typography improvements
  h1: ({ children }) => (
    <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 mt-12 mb-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight tracking-tight text-gray-900 mt-12 mb-6">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight tracking-tight text-gray-900 mt-10 mb-5">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-serif text-xl md:text-2xl font-bold leading-tight tracking-tight text-gray-900 mt-8 mb-4">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="font-serif text-lg leading-8 text-gray-800 mb-6">
      {children}
    </p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-6 py-2 my-8 italic font-serif text-lg leading-8 text-gray-700 bg-gray-50/50">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-6 mb-6 space-y-2 font-serif text-lg leading-7 text-gray-800">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 font-serif text-lg leading-7 text-gray-800">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="mb-1">
      {children}
    </li>
  ),
  code: ({ children }) => (
    <code className="bg-gray-100 px-2 py-1 rounded-sm text-sm font-mono text-gray-900 before:content-none after:content-none">
      {children}
    </code>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-gray-900">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic">
      {children}
    </em>
  ),
  hr: () => <Divider />,
};

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="max-w-none">
      <MDXRemote 
        source={source} 
        components={mdxComponents}
        options={mdxOptions}
      />
    </div>
  );
}

export { mdxComponents, mdxOptions }; 