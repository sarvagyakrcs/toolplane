"use server";

import * as cheerio from "cheerio";

interface RedditComment {
  author: string;
  body: string;
  score: string;
  depth: number;
  replies?: RedditComment[];
}

interface RedditPostData {
  title: string | null;
  upvotes: string | null;
  comments: string | null;
  author: string | null;
  subreddit: string | null;
  postContent?: string | null;
  commentsList?: RedditComment[];
}

interface RedditJsonData {
  data?: {
    children?: Array<{
      data?: {
        title?: string;
        ups?: number;
        num_comments?: number;
        author?: string;
        subreddit?: string;
        selftext?: string;
      };
    }>;
  };
}

interface RedditCommentsData {
  data?: {
    children?: Array<{
      data?: {
        kind?: string;
        body?: string;
        author?: string;
        score?: number;
        replies?: RedditCommentsData;
      };
    }>;
  };
}

export async function scrapeRedditPost(url: string, includeComments: boolean = false): Promise<RedditPostData> {
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
        const jsonData: [RedditJsonData, RedditCommentsData] = await jsonResponse.json();
        const post = jsonData[0]?.data?.children?.[0]?.data;
        
        if (post) {
          const result: RedditPostData = {
            title: post.title || "Title not found",
            upvotes: post.ups ? post.ups.toString() : "N/A",
            comments: post.num_comments ? post.num_comments.toString() : "N/A",
            author: post.author || "Unknown",
            subreddit: post.subreddit || "Unknown",
            postContent: post.selftext || null,
          };

          // If comments are requested, parse them from the JSON
          if (includeComments && jsonData[1]?.data?.children) {
            result.commentsList = parseCommentsFromJson(jsonData[1].data.children);
          }

          return result;
        }
      }
    } catch {
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
    const title = ogTitle || pageTitle.replace(/\s*:\s*r\/\w+/, '').replace(/\s*-\s*Reddit/, '').trim();
    
    // Extract subreddit from URL
    const subredditMatch = url.match(/\/r\/([^\/]+)/);
    const subreddit = subredditMatch ? subredditMatch[1] : "Unknown";
    
    // Extract author from URL pattern or meta
    const authorMatch = url.match(/\/comments\/[^\/]+\/[^\/]+\//) ? 
                       ($('meta[name="author"]').attr('content') || "Unknown") : "Unknown";
    
    const result: RedditPostData = {
      title: title || "Title not found",
      upvotes: "N/A", // HTML scraping for upvotes is unreliable due to dynamic loading
      comments: "N/A", // Same for comments
      author: authorMatch,
      subreddit,
    };

    // HTML comment scraping is limited due to Reddit's dynamic loading
    if (includeComments) {
      result.commentsList = []; // Empty array to indicate comments were requested but unavailable via HTML
    }

    return result;

  } catch (error: unknown) {
    console.error("Reddit scraping error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage || "An unknown error occurred during scraping.");
  }
}

function parseCommentsFromJson(comments: Array<{ data?: any }>, depth: number = 0): RedditComment[] {
  const parsedComments: RedditComment[] = [];

  for (const comment of comments) {
    const data = comment.data;
    
    // Skip deleted comments and more comments links
    if (!data || data.kind === 'more' || !data.body) {
      continue;
    }

    const parsedComment: RedditComment = {
      author: data.author || "[deleted]",
      body: data.body || "[deleted]",
      score: data.score ? data.score.toString() : "0",
      depth: depth,
    };

    // Parse replies if they exist
    if (data.replies && data.replies.data && data.replies.data.children) {
      parsedComment.replies = parseCommentsFromJson(data.replies.data.children, depth + 1);
    }

    parsedComments.push(parsedComment);
  }

  return parsedComments;
} 