"use server";

import * as cheerio from "cheerio";

interface ScrapedData {
  tag: string;
  text: string | null;
  attributes: { [key: string]: string };
}

export async function scrapeWebsite(
  url: string,
  selector: string
): Promise<ScrapedData[]> {
  if (!url) {
    throw new Error("URL is required.");
  }
  if (!selector) {
    throw new Error("Selector is required.");
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch the page. Status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);

    const data: ScrapedData[] = [];
    $(selector).each((_, element) => {
      if (element.type === 'tag') {
        const el = $(element);
        const attributes: { [key: string]: string } = {};
        
        if (element.attribs) {
          Object.keys(element.attribs).forEach(key => {
            attributes[key] = element.attribs[key];
          });
        }
  
        data.push({
          tag: element.tagName,
          text: el.text().trim() || null,
          attributes,
        });
      }
    });

    return data;
  } catch (error: unknown) {
    console.error("Scraping error:", error);
    // Re-throw the error to be caught by the client
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage || "An unknown error occurred during scraping.");
  }
} 