import { generateRSSFeed } from '@/lib/rss';

export async function GET() {
  const feed = generateRSSFeed();

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
} 