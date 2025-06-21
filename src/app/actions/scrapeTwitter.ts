"use server";

import * as cheerio from "cheerio";

interface TwitterPostData {
  text: string | null;
  author: string | null;
  handle: string | null;
  retweets: string | null;
  likes: string | null;
  replies: string | null;
  date: string | null;
}

export async function scrapeTwitterPost(url: string): Promise<TwitterPostData> {
  if (!url || (!url.includes("twitter.com") && !url.includes("x.com"))) {
    throw new Error("A valid Twitter/X post URL is required.");
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the page. Status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract tweet data from meta tags (more reliable for Twitter)
    const text = $('meta[property="og:description"]').attr('content') || 
                $('meta[name="description"]').attr('content') || 
                "Tweet text not found";

    const title = $('meta[property="og:title"]').attr('content') || "";
    const author = title.split(' on X: ')[0] || title.split(' (@')[0] || "Unknown";
    const handle = title.match(/\(@([^)]+)\)/)?.[1] || "Unknown";

    // Extract engagement metrics (these are harder to get from meta tags)
    const engagementText = $('title').text();
    const retweets = engagementText.match(/(\d+)\s*retweets?/i)?.[1] || "N/A";
    const likes = engagementText.match(/(\d+)\s*likes?/i)?.[1] || "N/A";
    const replies = engagementText.match(/(\d+)\s*replies?/i)?.[1] || "N/A";

    return {
      text: text.length > 280 ? text.substring(0, 280) + "..." : text,
      author,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      retweets,
      likes,
      replies,
      date: "N/A", // Date extraction is complex with Twitter's current structure
    };

  } catch (error: any) {
    console.error("Twitter scraping error:", error);
    throw new Error(error.message || "An unknown error occurred during scraping.");
  }
} 