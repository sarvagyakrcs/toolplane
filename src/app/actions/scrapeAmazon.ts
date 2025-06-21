"use server";

import * as cheerio from "cheerio";

interface AmazonProductData {
  title: string | null;
  price: string | null;
  image: string | null;
}

export async function scrapeAmazonProduct(url: string): Promise<AmazonProductData> {
  if (!url || !new URL(url).hostname.includes("amazon")) {
    throw new Error("A valid Amazon product URL is required.");
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Connection': 'keep-alive',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the page. Status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Selectors for Amazon product pages
    const title = $('#productTitle').text().trim();
    const priceWhole = $('span.a-price-whole').first().text().replace(/[,.]/g, '');
    const priceFraction = $('span.a-price-fraction').first().text();
    const priceSymbol = $('span.a-price-symbol').first().text();
    const image = $('#landingImage').attr('src');
    
    const price = priceSymbol && priceWhole ? `${priceSymbol}${priceWhole}.${priceFraction || '00'}` : "Not available";

    if (!title) {
        throw new Error("Could not extract product title. The page layout might have changed or it might not be a standard product page.");
    }

    return {
      title: title || "Title not found",
      price,
      image: image || null,
    };

  } catch (error: any) {
    console.error("Amazon scraping error:", error);
    throw new Error(error.message || "An unknown error occurred during scraping.");
  }
} 