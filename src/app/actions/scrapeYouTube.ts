"use server";

import * as cheerio from "cheerio";

interface YouTubeVideoData {
  title: string | null;
  views: string | null;
  likes: string | null;
  channel: string | null;
  description: string | null;
  thumbnail: string | null;
}

export async function scrapeYouTubeVideo(url: string): Promise<YouTubeVideoData> {
  if (!url || (!url.includes("youtube.com") && !url.includes("youtu.be"))) {
    throw new Error("A valid YouTube video URL is required.");
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

    // Extract video ID for thumbnail
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

    // Extract title from meta tags
    const title = $('meta[property="og:title"]').attr('content') || 
                 $('title').text().replace(' - YouTube', '') ||
                 "Title not found";

    // Extract other metadata
    const views = $('meta[itemprop="interactionCount"]').attr('content') || "N/A";
    const channel = $('meta[itemprop="name"]').attr('content') || 
                   $('link[itemprop="name"]').attr('content') || "N/A";
    const description = $('meta[property="og:description"]').attr('content') || 
                       $('meta[name="description"]').attr('content') || "N/A";

    return {
      title,
      views: views !== "N/A" ? `${parseInt(views).toLocaleString()} views` : "N/A",
      likes: "N/A", // Likes are harder to extract due to YouTube's dynamic loading
      channel,
      description: description.length > 200 ? description.substring(0, 200) + "..." : description,
      thumbnail,
    };

  } catch (error: any) {
    console.error("YouTube scraping error:", error);
    throw new Error(error.message || "An unknown error occurred during scraping.");
  }
} 