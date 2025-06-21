"use server";

import * as cheerio from "cheerio";

interface TwitterPostData {
  text: string | null;
  author: string | null;
  username: string | null;
  likes: string | null;
  retweets: string | null;
  replies: string | null;
  date: string | null;
  verified: boolean;
  media?: string[];
}

export async function scrapeTwitterPost(url: string): Promise<TwitterPostData> {
  if (!url || (!url.includes("twitter.com") && !url.includes("x.com"))) {
    throw new Error("A valid Twitter/X post URL is required.");
  }

  try {
    // Convert x.com URLs to twitter.com for consistency
    const normalizedUrl = url.replace("x.com", "twitter.com");
    
    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the page. Status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract from meta tags (most reliable)
    const ogTitle = $('meta[property="og:title"]').attr('content') || '';
    const ogDescription = $('meta[property="og:description"]').attr('content') || '';
    const twitterTitle = $('meta[name="twitter:title"]').attr('content') || '';
    const twitterDescription = $('meta[name="twitter:description"]').attr('content') || '';
    
    // Extract author and username from title or URL
    let author = '';
    let username = '';
    
    // Try to extract from og:title which usually contains "Author (@username)"
    const titleMatch = ogTitle.match(/^(.+?)\s*\(@?([^)]+)\)/);
    if (titleMatch) {
      author = titleMatch[1].trim();
      username = titleMatch[2].trim();
    } else {
      // Fallback to URL parsing
      const urlMatch = url.match(/twitter\.com\/([^\/]+)/);
      if (urlMatch) {
        username = urlMatch[1];
        author = username;
      }
    }

    // Extract tweet text
    let text = twitterDescription || ogDescription || '';
    
    // Clean up the text
    text = text.replace(/^"/, '').replace(/"$/, '').trim();

    // Extract media URLs
    const mediaUrls: string[] = [];
    $('meta[property="og:image"]').each((_, el) => {
      const imageUrl = $(el).attr('content');
      if (imageUrl && !imageUrl.includes('profile_images')) {
        mediaUrls.push(imageUrl);
      }
    });

    return {
      text: text || "Tweet text not available",
      author: author || "Unknown",
      username: username || "Unknown",
      likes: "N/A", // Twitter/X doesn't expose this in meta tags
      retweets: "N/A", // Same for retweets
      replies: "N/A", // Same for replies
      date: "N/A", // Date extraction is complex from HTML
      verified: false, // Cannot reliably determine from HTML
      media: mediaUrls.length > 0 ? mediaUrls : undefined,
    };

  } catch (error: any) {
    console.error("Twitter scraping error:", error);
    throw new Error(error.message || "An unknown error occurred during Twitter scraping.");
  }
} 