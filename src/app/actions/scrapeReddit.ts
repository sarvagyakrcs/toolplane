"use server";

import * as cheerio from "cheerio";

interface RedditPostData {
  title: string | null;
  upvotes: string | null;
  comments: string | null;
  author: string | null;
  subreddit: string | null;
}

export async function scrapeRedditPost(url: string): Promise<RedditPostData> {
  if (!url || !new URL(url).hostname.includes("reddit")) {
    throw new Error("A valid Reddit post URL is required.");
  }

  try {
    // Try Reddit's JSON API first (most reliable)
    const jsonUrl = url.endsWith('/') ? url + '.json' : url + '.json';
    
    try {
      const jsonResponse = await fetch(jsonUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; WebScraper/1.0)',
        }
      });
      
      if (jsonResponse.ok) {
        const jsonData = await jsonResponse.json();
        const post = jsonData[0]?.data?.children?.[0]?.data;
        
        if (post) {
          return {
            title: post.title || "Title not found",
            upvotes: post.ups ? post.ups.toString() : "N/A",
            comments: post.num_comments ? post.num_comments.toString() : "N/A",
            author: post.author || "Unknown",
            subreddit: post.subreddit || "Unknown",
          };
        }
      }
    } catch (jsonError) {
      console.log("JSON API failed, falling back to HTML scraping");
    }

    // Fallback to HTML scraping with meta tags
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the page. Status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract from meta tags (most reliable for HTML)
    const ogTitle = $('meta[property="og:title"]').attr('content') || '';
    const pageTitle = $('title').text() || '';
    
    // Clean up title
    let title = ogTitle || pageTitle.replace(/\s*:\s*r\/\w+/, '').replace(/\s*-\s*Reddit/, '').trim();
    
    // Extract subreddit from URL
    const subredditMatch = url.match(/\/r\/([^\/]+)/);
    const subreddit = subredditMatch ? subredditMatch[1] : "Unknown";
    
    // Extract author from URL pattern or meta
    const authorMatch = url.match(/\/comments\/[^\/]+\/[^\/]+\//) ? 
                       ($('meta[name="author"]').attr('content') || "Unknown") : "Unknown";
    
    return {
      title: title || "Title not found",
      upvotes: "N/A", // HTML scraping for upvotes is unreliable due to dynamic loading
      comments: "N/A", // Same for comments
      author: authorMatch,
      subreddit,
    };

  } catch (error: any) {
    console.error("Reddit scraping error:", error);
    throw new Error(error.message || "An unknown error occurred during scraping.");
  }
} 