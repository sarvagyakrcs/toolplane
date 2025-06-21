import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, formatDate } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
} from 'lucide-react';
import { offside } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'The Toolplane Journal - Developer Tools, Web Scraping & API Guides',
  description: 'Authoritative guides on web scraping techniques, API integration, and developer productivity. Expert insights from industry practitioners.',
  keywords: [
    'web scraping tutorials',
    'API development guides',
    'developer tools blog',
    'automation tutorials',
    'data extraction guides',
    'web scraping tips',
    'Amazon scraper tutorial',
    'Reddit API guide',
    'developer productivity',
    'programming tutorials',
    'toolplane journal'
  ],
  openGraph: {
    title: 'The Toolplane Journal - Developer Tools & Web Scraping Guides',
    description: 'Authoritative guides on web scraping techniques, API integration, and developer productivity.',
    type: 'website',
    url: 'https://toolplane.xyz/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Toolplane Journal - Developer Tools & Web Scraping Guides',
    description: 'Authoritative guides on web scraping techniques, API integration, and developer productivity.',
  },
  alternates: {
    canonical: 'https://toolplane.xyz/blog',
    types: {
      'application/rss+xml': 'https://toolplane.xyz/feed.xml',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'The Toolplane Journal',
  description: 'Authoritative guides on web scraping, API development, and developer tools',
  url: 'https://toolplane.xyz/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Toolplane',
    url: 'https://toolplane.xyz',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://toolplane.xyz/blog',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const featuredPost = posts[0];
  const editorsPicks = posts.slice(1, 4);
  const recentPosts = posts.slice(4);

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
                <div className="flex mt-2 items-center justify-between">
                    <Link href="/" className={cn(offside.className, "text-sm font-bold")}>{"Toolplane".toUpperCase()}</Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/blog" className="text-sm hover:text-primary transition-colors">Blog</Link>
                        <Link href="https://github.com/sarvagyakrcs" target="_blank" className="text-sm hover:text-primary transition-colors">GitHub</Link>
                    </div>
                </div>
            </div>
          {/* Main Header */}
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
              
              <Link href="/" className="inline-block">
                <h1 className="font-serif text-6xl md:text-7xl font-bold tracking-tight hover:text-gray-600 transition-colors">
                  The Toolplane Journal
                </h1>
              </Link>
              
              <div className="text-sm font-medium tracking-wide text-gray-600 mt-2">
                Developer Tools, Web Scraping & API Guides
              </div>
            </div>

            {/* Navigation */}
            <nav className="py-3 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-8 text-sm font-medium">
                <Link href="/blog" className="text-black font-semibold border-b-2 border-black pb-2">
                  LATEST
                </Link>
                <Link href="/blog/category/tutorials" className="text-gray-600 hover:text-black transition-colors">
                  TUTORIALS
                </Link>
                <Link href="/blog/category/guides" className="text-gray-600 hover:text-black transition-colors">
                  GUIDES
                </Link>
                <Link href="/blog/category/insights" className="text-gray-600 hover:text-black transition-colors">
                  INSIGHTS
                </Link>
                <Link href="/blog/category/tools" className="text-gray-600 hover:text-black transition-colors">
                  REVIEWS
                </Link>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="mx-auto h-16 w-16 text-gray-300 mb-6" />
              <h2 className="text-4xl font-serif font-bold mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed font-serif">
                Our editorial team is crafting comprehensive guides and insights. 
                Subscribe to our newsletter to be notified when we publish.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Story Section */}
              {featuredPost && (
                <section className="py-8 border-b border-gray-200">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Story */}
                    <div className="lg:col-span-2">
                      <div className="space-y-6">
                        <div className="text-xs font-bold tracking-wider text-red-600 uppercase">
                          FEATURED STORY
                        </div>
                        
                        <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                          <Link 
                            href={`/blog/${featuredPost.slug}`}
                            className="hover:text-gray-600 transition-colors"
                          >
                            {featuredPost.title}
                          </Link>
                        </h2>
                        
                        <p className="text-lg leading-relaxed font-serif text-gray-800">
                          {featuredPost.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-600 font-medium">
                          <span>By {featuredPost.author?.toUpperCase()}</span>
                          <span>•</span>
                          <time dateTime={featuredPost.date} className="uppercase">
                            {formatDate(featuredPost.date)}
                          </time>
                        </div>

                        {featuredPost.heroImage && (
                          <div className="relative aspect-[16/10] rounded-sm overflow-hidden">
                            <Image
                              src={featuredPost.heroImage}
                              alt={featuredPost.title}
                              fill
                              className="object-cover"
                              priority
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 border-l border-gray-200 pl-8">
                      <div className="space-y-8">
                        {/* Recent Articles */}
                        <div>
                          <h3 className="text-xs font-bold tracking-wider uppercase mb-4 border-b border-black pb-2">
                            Recent Articles
                          </h3>
                          <div className="space-y-4">
                            {editorsPicks.slice(0, 4).map((post) => (
                              <article key={post.slug} className="group">
                                <Link href={`/blog/${post.slug}`}>
                                  <h4 className="font-serif text-sm font-bold leading-tight group-hover:text-gray-600 transition-colors mb-1">
                                    {post.title}
                                  </h4>
                                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                    {post.description}
                                  </p>
                                </Link>
                              </article>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Editors Picks Grid */}
              {editorsPicks.length > 0 && (
                <section className="py-8 border-b border-gray-200">
                  <h3 className="text-xs font-bold tracking-wider uppercase mb-6 border-b border-black pb-2 max-w-fit">
                    Editor&apos;s Picks
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {editorsPicks.map((post) => (
                      <article key={post.slug} className="group space-y-3">
                        <Link href={`/blog/${post.slug}`}>
                          {post.heroImage && (
                            <div className="relative aspect-[4/3] overflow-hidden mb-3">
                              <Image
                                src={post.heroImage}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:opacity-75 transition-opacity"
                              />
                            </div>
                          )}
                          
                          <div className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                            {post.category || 'Analysis'}
                          </div>
                          
                          <h4 className="font-serif text-xl font-bold leading-tight group-hover:text-gray-600 transition-colors">
                            {post.title}
                          </h4>
                          
                          <p className="text-sm text-gray-700 leading-relaxed font-serif line-clamp-3">
                            {post.description}
                          </p>
                          
                          <div className="text-xs text-gray-600 font-medium">
                            By {post.author?.toUpperCase()} • {formatDate(post.date).toUpperCase()}
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Recent Articles List */}
              {recentPosts.length > 0 && (
                <section className="py-8">
                  <h3 className="text-xs font-bold tracking-wider uppercase mb-6 border-b border-black pb-2 max-w-fit">
                    Latest Articles
                  </h3>
                  
                  <div className="space-y-6">
                    {recentPosts.map((post) => (
                      <article key={post.slug} className="group border-b border-gray-100 pb-6 last:border-b-0">
                        <Link href={`/blog/${post.slug}`}>
                          <div className="grid md:grid-cols-5 gap-6">
                            <div className="md:col-span-3 space-y-3">
                              <div className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                                {post.category || 'Technology'}
                              </div>
                              
                              <h4 className="font-serif text-2xl font-bold leading-tight group-hover:text-gray-600 transition-colors">
                                {post.title}
                              </h4>
                              
                              <p className="text-gray-700 leading-relaxed font-serif line-clamp-2">
                                {post.description}
                              </p>
                              
                              <div className="flex items-center space-x-4 text-xs text-gray-600 font-medium">
                                <span>By {post.author?.toUpperCase()}</span>
                                <span>•</span>
                                <time dateTime={post.date} className="uppercase">
                                  {formatDate(post.date)}
                                </time>
                                <span>•</span>
                                <span>{post.readingTime}</span>
                              </div>
                            </div>
                            
                            {post.heroImage && (
                              <div className="md:col-span-2">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                  <Image
                                    src={post.heroImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:opacity-75 transition-opacity"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </main>

        {/* Newsletter Section */}
        <section className="border-t-2 border-black bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <h3 className="font-serif text-3xl font-bold mb-4">
              Subscribe to The Journal
            </h3>
            <p className="text-gray-700 text-lg font-serif leading-relaxed mb-8">
              Get our latest insights on web scraping, API development, 
              and developer tools delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Email address"
                className="border-2 border-black text-center font-medium"
              />
              <Button className="bg-black text-white hover:bg-gray-800 font-bold px-8">
                SUBSCRIBE
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-4 font-medium">
              No spam. Cancel anytime.
            </p>
          </div>
        </section>

        {/* Clean Footer */}
        <footer className="border-t-2 border-black bg-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8 text-sm">
              <div>
                <h4 className="font-bold text-xs tracking-wider uppercase mb-4">ARTICLES</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link href="/blog" className="hover:text-black transition-colors">Latest</Link></li>
                  <li><Link href="/blog/category/tutorials" className="hover:text-black transition-colors">Tutorials</Link></li>
                  <li><Link href="/blog/category/guides" className="hover:text-black transition-colors">Guides</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-xs tracking-wider uppercase mb-4">TOOLS</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link href="/" className="hover:text-black transition-colors">All Tools</Link></li>
                  <li><Link href="/scraper" className="hover:text-black transition-colors">Web Scraper</Link></li>
                  <li><Link href="/api" className="hover:text-black transition-colors">API Docs</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-xs tracking-wider uppercase mb-4">SUBSCRIBE</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link href="#" className="hover:text-black transition-colors">Newsletter</Link></li>
                  <li><Link href="/feed.xml" className="hover:text-black transition-colors">RSS Feed</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-xs tracking-wider uppercase mb-4">COMPANY</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link href="#" className="hover:text-black transition-colors">About</Link></li>
                  <li><Link href="#" className="hover:text-black transition-colors">Contact</Link></li>
                  <li><Link href="#" className="hover:text-black transition-colors">Support</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                <p>© 2024 The Toolplane Journal Company. All rights reserved.</p>
                <div className="flex items-center space-x-6 mt-4 md:mt-0">
                  <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
                  <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}