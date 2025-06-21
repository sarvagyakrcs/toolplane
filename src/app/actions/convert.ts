"use server";

import TurndownService from "turndown";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

interface ConversionOptions {
  includeTitle?: boolean;
  includeLinks?: boolean;
  improveReadability?: boolean;
}

interface ConversionResult {
  markdown: string;
  title: string;
}

export async function convertToMarkdown(
  url: string,
  options: ConversionOptions = {}
): Promise<ConversionResult> {
  if (!url) {
    throw new Error("URL is required.");
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
    const doc = new JSDOM(html, { url });
    const document = doc.window.document;

    let article;
    if (options.improveReadability) {
      const reader = new Readability(document);
      article = reader.parse();
    }
    
    const contentToConvert = article?.content || document.body.innerHTML;
    const title = article?.title || document.title;

    const turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
    });

    if (!options.includeLinks) {
      turndownService.remove('a');
    }

    let markdown = turndownService.turndown(contentToConvert);

    if (options.includeTitle && title) {
      markdown = `# ${title}\n\n${markdown}`;
    }

    return { markdown, title: title || "Untitled" };

  } catch (error: any) {
    console.error("Conversion error:", error);
    throw new Error(error.message || "An unknown error occurred during conversion.");
  }
} 