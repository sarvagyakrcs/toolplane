import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { format, parseISO } from 'date-fns';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  ogImage?: string;
  heroImage?: string;
  category?: string;
  author?: string;
  content: string;
  readingTime: string;
  publishedAt: Date;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  ogImage?: string;
  heroImage?: string;
  category?: string;
  author?: string;
  readingTime: string;
  publishedAt: Date;
}

const BLOG_PATH = path.join(process.cwd(), 'content/blog');

export function getAllBlogPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_PATH);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      return getBlogPost(slug);
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const readingTimeStats = readingTime(content);
    const publishedAt = parseISO(data.date);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      tags: data.tags || [],
      ogImage: data.ogImage || '',
      heroImage: data.heroImage || '',
      category: data.category || '',
      author: data.author || 'Toolplane Team',
      content,
      readingTime: readingTimeStats.text,
      publishedAt,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getBlogPostMetadata(): BlogPostMetadata[] {
  const posts = getAllBlogPosts();
  return posts.map(({ content, ...metadata }) => metadata);
}

export function getAllTags(): string[] {
  const posts = getAllBlogPosts();
  const allTags = posts.flatMap((post) => post.tags);
  const uniqueTags = Array.from(new Set(allTags));
  return uniqueTags.sort();
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => 
    post.category?.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): { name: string; count: number; slug: string }[] {
  const posts = getAllBlogPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    if (post.category) {
      const current = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, current + 1);
    }
  });

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    }))
    .sort((a, b) => b.count - a.count);
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMMM dd, yyyy');
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const currentPost = allPosts.find((post) => post.slug === currentSlug);
  
  if (!currentPost) return [];

  // Find posts with similar tags
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const commonTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      return { ...post, relevanceScore: commonTags.length };
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);

  return relatedPosts;
}

export function generateBlogPostUrl(slug: string): string {
  return `https://toolplane.xyz/blog/${slug}`;
}

export function generateBlogUrl(): string {
  return 'https://toolplane.xyz/blog';
} 