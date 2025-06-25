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
    // Extract basic info from URL as fallback
    const urlParts = url.match(/\/r\/([^\/]+)\/comments\/([^\/]+)\/([^\/]*)/);
    const subredditFromUrl = urlParts ? urlParts[1] : "Unknown";
    const postIdFromUrl = urlParts ? urlParts[2] : null;
    
    // Try Reddit's JSON API first (most reliable)
    const jsonUrl = url.endsWith('/') ? url + '.json' : url + '.json';
    
    try {
      const jsonResponse = await fetch(jsonUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        next: { revalidate: 0 } // Disable caching for server actions
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
            subreddit: post.subreddit || subredditFromUrl,
            postContent: post.selftext || null,
          };

          // If comments are requested, parse them from the JSON
          if (includeComments && jsonData[1]?.data?.children) {
            result.commentsList = parseCommentsFromJson(jsonData[1].data.children);
          }

          return result;
        }
      } else if (jsonResponse.status === 403) {
        console.log("Reddit API returned 403, likely rate limited or blocked");
      }
    } catch (jsonError) {
      console.log("JSON API failed:", jsonError instanceof Error ? jsonError.message : 'Unknown error');
    }

    // If we have URL parts, create a basic response without fetching
    if (urlParts) {
      console.log("Using URL-based fallback for Reddit post");
      return {
        title: urlParts[3] ? urlParts[3].replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Reddit Post",
        upvotes: "N/A",
        comments: "N/A", 
        author: "Unknown",
        subreddit: subredditFromUrl,
        postContent: null,
        commentsList: includeComments ? [] : undefined,
      };
    }

    // Last resort: return error-friendly response
    throw new Error("Reddit post could not be accessed. This may be due to Reddit's anti-scraping measures, rate limiting, or the post being private/deleted.");

  } catch (error: unknown) {
    console.error("Reddit scraping error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Return a user-friendly error for specific cases
    if (errorMessage.includes('403')) {
      throw new Error("Reddit is currently blocking requests. Please try again later or use a different post.");
    }
    if (errorMessage.includes('404')) {
      throw new Error("Reddit post not found. Please check the URL and try again.");
    }
    if (errorMessage.includes('rate limit')) {
      throw new Error("Too many requests to Reddit. Please wait a moment before trying again.");
    }
    
    throw new Error("Unable to fetch Reddit post data. This may be due to Reddit's restrictions or the post being unavailable.");
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