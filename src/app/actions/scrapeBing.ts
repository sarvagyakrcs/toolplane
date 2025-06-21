"use server";

import * as cheerio from "cheerio";

interface BingSearchResult {
  title: string;
  url: string;
  description: string;
  displayUrl: string;
}

interface BingSearchData {
  query: string;
  totalResults: string | null;
  results: BingSearchResult[];
  relatedSearches: string[];
  featuredSnippet: {
    title: string;
    content: string;
    url: string;
  } | null;
}

export async function scrapeBingSearch(query: string, numResults: number = 10): Promise<BingSearchData> {
  if (!query || query.trim().length === 0) {
    throw new Error("A search query is required.");
  }

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const searchUrl = `https://www.bing.com/search?q=${encodedQuery}&count=${Math.min(numResults, 20)}`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.bing.com/',
        'DNT': '1',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch search results. Status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract search results from Bing's structure
    const results: BingSearchResult[] = [];
    
    // Bing uses specific selectors for search results
    $('.b_algo').each((index, element) => {
      if (results.length >= numResults) return;
      
      const $result = $(element);
      
      // Extract title
      const titleEl = $result.find('h2 a').first();
      const title = titleEl.text().trim();
      
      if (!title) return;

      // Extract URL
      let url = titleEl.attr('href') || '';

      // Extract description
      const description = $result.find('.b_caption p, .b_snippet').first().text().trim() || 
                         "No description available";

      // Extract display URL
      const displayUrl = $result.find('cite').first().text().trim() || 
                        (url ? new URL(url).hostname : '');

      if (title && url) {
        results.push({
          title,
          url,
          description: description.substring(0, 300),
          displayUrl
        });
      }
    });

    // Alternative selector patterns for Bing results
    if (results.length === 0) {
      $('.b_algo, .b_ans').each((index, element) => {
        if (results.length >= numResults) return;
        
        const $result = $(element);
        
        const title = $result.find('h2, h3, .b_entityTitle').first().text().trim();
        const linkEl = $result.find('a[href]').first();
        let url = linkEl.attr('href') || '';
        
        if (!title || !url) return;
        
        const description = $result.find('.b_caption, .b_snippet, p').first().text().trim() || 
                           "No description available";
        
        const displayUrl = url ? new URL(url).hostname : '';

        results.push({
          title,
          url,
          description: description.substring(0, 300),
          displayUrl
        });
      });
    }

    // Extract total results count
    let totalResults = "N/A";
    const statsText = $('.sb_count').text();
    const totalMatch = statsText.match(/([0-9,]+)\s*results?/i);
    if (totalMatch) {
      totalResults = totalMatch[1];
    }

    // Extract featured snippet if available
    let featuredSnippet: BingSearchData['featuredSnippet'] = null;
    const snippetEl = $('.b_ans, .b_entityTP, .b_rich').first();
    if (snippetEl.length) {
      const snippetTitle = snippetEl.find('h2, h3, .b_entityTitle').first().text().trim();
      const snippetContent = snippetEl.find('.b_snippet, .b_caption, p').first().text().trim();
      const snippetUrl = snippetEl.find('a[href]').first().attr('href') || '';
      
      if (snippetTitle && snippetContent) {
        featuredSnippet = {
          title: snippetTitle,
          content: snippetContent.substring(0, 500),
          url: snippetUrl
        };
      }
    }

    // Extract related searches
    const relatedSearches: string[] = [];
    $('.b_rs a, .b_related a').each((_, element) => {
      const searchText = $(element).text().trim();
      if (searchText && relatedSearches.length < 8) {
        relatedSearches.push(searchText);
      }
    });

    return {
      query: query.trim(),
      totalResults,
      results,
      relatedSearches,
      featuredSnippet
    };

  } catch (error: any) {
    console.error("Bing search scraping error:", error);
    
    if (error.message.includes('429')) {
      throw new Error("Too many requests to Bing Search. Please try again later.");
    }
    
    if (error.message.includes('403')) {
      throw new Error("Bing Search blocked this request. Try using a different search query or wait before retrying.");
    }
    
    throw new Error(error.message || "An unknown error occurred during Bing search scraping.");
  }
} 