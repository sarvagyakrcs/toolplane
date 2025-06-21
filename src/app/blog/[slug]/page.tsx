import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPost, getAllBlogPosts, formatDate, getRelatedPosts, generateBlogPostUrl } from '@/lib/blog';
import { MDXContent } from '@/lib/mdx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Rss } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | The Toolplane Journal',
      description: 'The requested blog post could not be found.',
    };
  }

  const postUrl = generateBlogPostUrl(post.slug);
  const ogImage = post.ogImage || '/og-blog-default.png';

  return {
    title: `${post.title} | The Toolplane Journal`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author || 'Toolplane Team' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: postUrl,
      publishedTime: post.date,
      authors: [post.author || 'Toolplane Team'],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);
  const postUrl = generateBlogPostUrl(post.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author || 'Toolplane Team',
      url: 'https://toolplane.xyz',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Toolplane',
      url: 'https://toolplane.xyz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://toolplane.xyz/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    image: post.ogImage || 'https://toolplane.xyz/og-blog-default.png',
    keywords: post.tags.join(', '),
    articleSection: 'Technology',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="min-h-screen bg-white text-black">
        {/* Clean Header */}
        <header className="border-b-2 border-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-6">
              <div className="text-xs font-medium tracking-widest text-gray-600 mb-2">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              
              <Link href="/blog" className="inline-block">
                <h1 className="font-serif text-6xl md:text-7xl font-bold tracking-tight hover:text-gray-600 transition-colors">
                  The Toolplane Journal
                </h1>
              </Link>
              
              <div className="text-sm font-medium tracking-wide text-gray-600 mt-2">
                Developer Tools, Web Scraping & API Guides
              </div>
            </div>
          </div>
        </header>

        {/* Back to Blog Button */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Journal
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 pb-8 border-b border-gray-200">
          {/* Category */}
          {post.category && (
            <div className="text-xs font-bold tracking-wider text-red-600 uppercase mb-4">
              {post.category}
            </div>
          )}
          
          {/* Title */}
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            {post.title}
          </h1>
          
          {/* Subtitle/Description */}
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-serif mb-8 max-w-3xl">
            {post.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 font-sans">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">By {post.author || 'Toolplane Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date} className="font-medium">{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{post.readingTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-medium">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Hero Image */}
          {post.heroImage && (
            <div className="relative aspect-[16/9] overflow-hidden mb-8 border border-gray-200">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <MDXContent source={post.content} />
          </div>
        </article>

        {/* Article Footer */}
        <footer className="max-w-4xl mx-auto px-4 py-8 border-t border-gray-200">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Share Section */}
            <div className="bg-gray-50 p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-bold mb-2">Found this helpful?</h3>
                  <p className="text-sm text-gray-600 font-serif">
                    Share it with your network or subscribe for more developer content.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="font-medium">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button size="sm" className="bg-black text-white hover:bg-gray-800 font-medium" asChild>
                    <Link href="/feed.xml">
                      <Rss className="mr-2 h-4 w-4" />
                      Subscribe
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                      <article className="border border-gray-200 p-6 hover:border-gray-300 transition-colors">
                        <div className="flex items-center gap-2 mb-3 text-xs text-gray-600 font-medium">
                          <Calendar className="h-3 w-3" />
                          <time dateTime={relatedPost.date}>
                            {formatDate(relatedPost.date)}
                          </time>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{relatedPost.readingTime}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-gray-600 transition-colors mb-3 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-serif leading-relaxed line-clamp-3">
                          {relatedPost.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-4">
                          {relatedPost.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Blog */}
            <div className="text-center pt-8">
              <Button variant="outline" size="lg" asChild>
                <Link href="/blog">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse More Articles
                </Link>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 