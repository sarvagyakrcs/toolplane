import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostsByCategory, getAllCategories, formatDate } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.category;
  const categoryName = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${categoryName} Articles | The Toolplane Journal`,
    description: `Read the latest ${categoryName.toLowerCase()} articles from The Toolplane Journal. Expert insights on developer tools, web scraping, and automation.`,
    openGraph: {
      title: `${categoryName} Articles | The Toolplane Journal`,
      description: `Read the latest ${categoryName.toLowerCase()} articles from The Toolplane Journal.`,
      type: 'website',
      url: `https://toolplane.xyz/blog/category/${categorySlug}`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category;
  const categoryName = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const posts = getPostsByCategory(categoryName);

  if (posts.length === 0) {
    notFound();
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Clean Header */}
      <header className="border-b-2 border-black">
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
            
            <Link href="/blog" className="inline-block">
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
              <Link href="/blog" className="text-gray-600 hover:text-black transition-colors">
                LATEST
              </Link>
              <Link href="/blog/category/tutorials" className={`transition-colors ${categoryName.toLowerCase() === 'tutorial' ? 'text-black font-semibold border-b-2 border-black pb-2' : 'text-gray-600 hover:text-black'}`}>
                TUTORIALS
              </Link>
              <Link href="/blog/category/guides" className={`transition-colors ${categoryName.toLowerCase() === 'guide' ? 'text-black font-semibold border-b-2 border-black pb-2' : 'text-gray-600 hover:text-black'}`}>
                GUIDES
              </Link>
              <Link href="/blog/category/insights" className={`transition-colors ${categoryName.toLowerCase() === 'insights' ? 'text-black font-semibold border-b-2 border-black pb-2' : 'text-gray-600 hover:text-black'}`}>
                INSIGHTS
              </Link>
              <Link href="/blog/category/tools" className={`transition-colors ${categoryName.toLowerCase() === 'tools' ? 'text-black font-semibold border-b-2 border-black pb-2' : 'text-gray-600 hover:text-black'}`}>
                REVIEWS
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <div className="py-6">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Articles
            </Link>
          </Button>
        </div>

        {/* Category Header */}
        <section className="py-8 border-b border-gray-200">
          <div className="text-center">
            <div className="text-xs font-bold tracking-wider text-red-600 uppercase mb-2">
              CATEGORY
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
              {categoryName}
            </h2>
            <p className="text-lg text-gray-600 font-serif max-w-2xl mx-auto">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
            </p>
          </div>
        </section>

        {/* Featured Article */}
        {featuredPost && (
          <section className="py-8 border-b border-gray-200">
            <div className="text-xs font-bold tracking-wider text-red-600 uppercase mb-6">
              FEATURED IN {categoryName.toUpperCase()}
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="font-serif text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                  <Link 
                    href={`/blog/${featuredPost.slug}`}
                    className="hover:text-gray-600 transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h3>
                
                <p className="text-lg leading-relaxed font-serif text-gray-800">
                  {featuredPost.description}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-600 font-medium">
                  <span>By {featuredPost.author?.toUpperCase()}</span>
                  <span>•</span>
                  <time dateTime={featuredPost.date} className="uppercase">
                    {formatDate(featuredPost.date)}
                  </time>
                  <span>•</span>
                  <span>{featuredPost.readingTime}</span>
                </div>
              </div>

              {featuredPost.heroImage && (
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
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
          </section>
        )}

        {/* Articles List */}
        {remainingPosts.length > 0 && (
          <section className="py-8">
            <h3 className="text-xs font-bold tracking-wider uppercase mb-6 border-b border-black pb-2 max-w-fit">
              More {categoryName} Articles
            </h3>
            
            <div className="space-y-6">
              {remainingPosts.map((post) => (
                <article key={post.slug} className="group border-b border-gray-100 pb-6 last:border-b-0">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="grid md:grid-cols-5 gap-6">
                      <div className="md:col-span-3 space-y-3">
                        <div className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                          {post.category}
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
            <input 
              type="email" 
              placeholder="Email address"
              className="border-2 border-black text-center font-medium px-4 py-2 flex-1"
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
  );
} 