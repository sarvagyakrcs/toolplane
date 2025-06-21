"use server";

import { extract } from '@extractus/article-extractor';
import TurndownService from 'turndown';

interface CleanArticleData {
  title: string | null;
  author: string | null;
  publishedDate: string | null;
  description: string | null;
  content: string | null;
  markdown: string | null;
  readingTime: number;
  wordCount: number;
  tags: string[];
  url: string;
  domain: string;
  language: string | null;
  image: string | null;
}

interface ExtractedArticle {
  title?: string | null;
  description?: string | null;
  content?: string | null;
  author?: string | null;
  published?: string | null;
  image?: string | null;
}

export async function cleanWebArticle(url: string, outputFormat: 'html' | 'markdown' | 'both' = 'both'): Promise<CleanArticleData> {
  if (!url) {
    throw new Error("A valid article URL is required.");
  }

  // Ensure URL has protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  try {
    // Extract article using @extractus/article-extractor with better error handling
    let article: ExtractedArticle | null = null;
    
    try {
      article = await extract(url);
    } catch (extractError: unknown) {
      console.warn("Article extractor failed, trying manual approach:", extractError);
      
      // Fallback: try manual fetch and basic parsing
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          }
        });
        
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("Access forbidden. The website is blocking automated requests.");
          }
          if (response.status === 404) {
            throw new Error("Article not found. Please check the URL.");
          }
          if (response.status === 429) {
            throw new Error("Too many requests. Please try again later.");
          }
          throw new Error(`HTTP ${response.status}: Unable to access the article.`);
        }
        
        const html = await response.text();
        const cheerio = await import('cheerio');
        const $ = cheerio.load(html);
        
        const title = $('meta[property="og:title"]').attr('content') || 
                     $('title').text() || 
                     $('h1').first().text() || 
                     "Title not found";
        
        const description = $('meta[property="og:description"]').attr('content') || 
                           $('meta[name="description"]').attr('content') || 
                           "Description not available";
        
        const content = $('article').html() || 
                       $('.article-content').html() || 
                       $('.post-content').html() || 
                       $('main').html() || 
                       "Content could not be extracted - this may be a paywall-protected article";
        
        article = {
          title,
          description,
          content,
          author: null,
          published: null,
          image: $('meta[property="og:image"]').attr('content') || null,
        };
        
      } catch (fallbackError: unknown) {
        const errorMessage = fallbackError instanceof Error ? fallbackError.message : 'Unknown error';
        throw new Error(`Unable to access article. ${errorMessage || 'The website may be blocking automated requests or require authentication.'}`);
      }
    }

    if (!article) {
      throw new Error("Failed to extract article content. The URL might not contain a readable article or may be behind a paywall.");
    }

    // Calculate reading time (average 200 words per minute)
    const wordCount = article.content ? article.content.split(/\s+/).length : 0;
    const readingTime = Math.ceil(wordCount / 200);

    // Extract domain
    const domain = new URL(url).hostname;

    // Convert to markdown if requested
    let markdown: string | null = null;
    if (outputFormat === 'markdown' || outputFormat === 'both') {
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
        emDelimiter: '*',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full'
      });

      // Add custom rules
      turndownService.addRule('strikethrough', {
        filter: ['del', 's'],
        replacement: function (content) {
          return '~~' + content + '~~';
        }
      });

      turndownService.addRule('highlight', {
        filter: ['mark'],
        replacement: function (content) {
          return '==' + content + '==';
        }
      });

      if (article.content) {
        markdown = turndownService.turndown(article.content);
        
        // Clean up markdown
        markdown = markdown
          .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
          .replace(/^\s+|\s+$/gm, '') // Trim whitespace from lines
          .trim();
      }
    }

    // Extract tags from content (simple keyword extraction)
    const tags: string[] = [];
    if (article.content) {
      // Simple tag extraction from common patterns
      const tagPatterns = [
        /(?:tags?|keywords?|topics?):\s*([^.\n]+)/gi,
        /(?:#)(\w+)/g // hashtags
      ];
      
      for (const pattern of tagPatterns) {
        const matches = article.content.match(pattern);
        if (matches) {
          matches.forEach((match: string) => {
            const cleanTag = match.replace(/^(?:tags?|keywords?|topics?):\s*/i, '')
                                 .replace('#', '')
                                 .trim();
            if (cleanTag.length > 2 && cleanTag.length < 30 && !tags.includes(cleanTag)) {
              tags.push(cleanTag);
            }
          });
        }
      }
    }

    // Limit tags to top 10
    const limitedTags = tags.slice(0, 10);

    return {
      title: article.title || "Title not found",
      author: article.author || null,
      publishedDate: article.published || null,
      description: article.description || null,
      content: outputFormat === 'markdown' ? null : (article.content || null),
      markdown: markdown,
      readingTime,
      wordCount,
      tags: limitedTags,
      url,
      domain,
      language: null, // Language detection not available in current version
      image: article.image || null,
    };

  } catch (error: unknown) {
    console.error("Article cleaning error:", error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('timeout')) {
      throw new Error("The article took too long to load. Please try again or check if the URL is accessible.");
    }
    
    if (errorMessage.includes('404') || errorMessage.includes('403')) {
      throw new Error("The article could not be accessed. Please check if the URL is correct and publicly accessible.");
    }
    
    throw new Error(errorMessage || "An unknown error occurred while cleaning the article.");
  }
} 