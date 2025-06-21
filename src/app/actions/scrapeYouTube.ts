"use server";

import * as cheerio from "cheerio";

interface YouTubeVideoData {
  title: string | null;
  channel: string | null;
  views: string | null;
  likes: string | null;
  duration: string | null;
  uploadDate: string | null;
  description: string | null;
  thumbnail: string | null;
  subscribers: string | null;
}

interface JsonLdData {
  '@type'?: string;
  interactionStatistic?: Array<{
    '@type'?: string;
    interactionType?: string;
    userInteractionCount?: number;
  }>;
  duration?: string;
  uploadDate?: string;
}

export async function scrapeYouTubeVideo(url: string): Promise<YouTubeVideoData> {
  if (!url || !url.includes("youtube.com") && !url.includes("youtu.be")) {
    throw new Error("A valid YouTube video URL is required.");
  }

  try {
    // Normalize YouTube URL
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('/embed/')) {
      videoId = url.split('/embed/')[1].split('?')[0];
    }
    
    const normalizedUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cookie': 'CONSENT=YES+cb.20210328-17-p0.en-GB+FX+667;',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the page. Status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract from meta tags and JSON-LD
    const title = $('meta[property="og:title"]').attr('content') || 
                  $('meta[name="twitter:title"]').attr('content') || 
                  $('title').text().replace(' - YouTube', '') || 
                  "Title not found";

    const description = $('meta[property="og:description"]').attr('content') || 
                       $('meta[name="description"]').attr('content') || 
                       "Description not available";

    const thumbnail = $('meta[property="og:image"]').attr('content') || 
                     $('meta[name="twitter:image"]').attr('content') || 
                     null;

    const channel = $('meta[property="og:site_name"]').attr('content') || 
                   $('link[itemprop="name"]').attr('content') || 
                   "Channel not found";

    // Try to extract structured data
    let views = "N/A";
    let likes = "N/A";
    let duration = "N/A";
    let uploadDate = "N/A";

    // Look for JSON-LD structured data
    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const jsonData: JsonLdData = JSON.parse($(element).html() || '{}');
        if (jsonData['@type'] === 'VideoObject') {
          if (jsonData.interactionStatistic) {
            const stats = jsonData.interactionStatistic;
            const viewStat = stats.find((stat) => stat['@type'] === 'InteractionCounter' && stat.interactionType?.includes('WatchAction'));
            if (viewStat) {
              views = viewStat.userInteractionCount?.toString() || views;
            }
          }
          
          if (jsonData.duration) {
            duration = jsonData.duration.replace('PT', '').replace('M', ':').replace('S', '') || duration;
          }
          
          if (jsonData.uploadDate) {
            uploadDate = new Date(jsonData.uploadDate).toLocaleDateString() || uploadDate;
          }
        }
      } catch {
        // Continue if JSON parsing fails
      }
    });

    // Try to extract from page content using regex patterns
    const pageContent = html;
    
    // Extract view count from various patterns
    const viewPatterns = [
      /"viewCount":"(\d+)"/,
      /"views":{"runs":\[{"text":"([^"]+)"/,
      /(\d+(?:,\d+)*)\s*views?/i
    ];
    
    for (const pattern of viewPatterns) {
      const match = pageContent.match(pattern);
      if (match && match[1]) {
        views = match[1].replace(/,/g, '');
        break;
      }
    }

    // Extract like count
    const likePatterns = [
      /"likeCount":"(\d+)"/,
      /"likes":{"runs":\[{"text":"([^"]+)"/,
      /(\d+(?:,\d+)*)\s*likes?/i
    ];
    
    for (const pattern of likePatterns) {
      const match = pageContent.match(pattern);
      if (match && match[1]) {
        likes = match[1].replace(/,/g, '');
        break;
      }
    }

    // Extract duration if not found in JSON-LD
    if (duration === "N/A") {
      const durationMatch = pageContent.match(/"lengthSeconds":"(\d+)"/);
      if (durationMatch) {
        const seconds = parseInt(durationMatch[1]);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        duration = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      }
    }

    // Format large numbers
    const formatNumber = (num: string) => {
      if (num === "N/A" || !num) return "N/A";
      const numValue = parseInt(num.replace(/,/g, ''));
      if (numValue >= 1000000) {
        return (numValue / 1000000).toFixed(1) + "M";
      } else if (numValue >= 1000) {
        return (numValue / 1000).toFixed(1) + "K";
      }
      return numValue.toLocaleString();
    };

    return {
      title: title.trim(),
      channel: channel.replace("YouTube", "").trim() || "Unknown",
      views: formatNumber(views),
      likes: formatNumber(likes),
      duration,
      uploadDate,
      description: description.length > 200 ? description.substring(0, 200) + "..." : description,
      thumbnail,
      subscribers: "N/A", // Subscriber count is not easily accessible
    };

  } catch (error: unknown) {
    console.error("YouTube scraping error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage || "An unknown error occurred during YouTube scraping.");
  }
} 