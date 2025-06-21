"use server";

import * as cheerio from "cheerio";

interface AlibabaProductData {
  title: string | null;
  priceRange: string | null;
  minOrderQuantity: string | null;
  supplier: string | null;
  supplierLocation: string | null;
  rating: string | null;
  responseRate: string | null;
  images: string[];
  description: string | null;
  features: string[];
}

export async function scrapeAlibabaProduct(url: string): Promise<AlibabaProductData> {
  if (!url || !url.includes("alibaba.com")) {
    throw new Error("A valid Alibaba product URL is required.");
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the page. Status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract title
    const title = $('meta[property="og:title"]').attr('content') || 
                  $('h1').first().text().trim() || 
                  $('title').text().replace(' - Alibaba.com', '') || 
                  "Product title not found";

    // Extract description
    const description = $('meta[property="og:description"]').attr('content') || 
                       $('meta[name="description"]').attr('content') || 
                       "Description not available";

    // Extract images
    const images: string[] = [];
    
    // Try different image selectors
    $('meta[property="og:image"]').each((_, el) => {
      const imageUrl = $(el).attr('content');
      if (imageUrl) images.push(imageUrl);
    });
    
    // Extract from page content using regex patterns
    const pageContent = html;
    
    // Extract price range
    let priceRange = "N/A";
    const pricePatterns = [
      /US\s*\$[\d,.]+-[\d,.]+/g,
      /\$[\d,.]+-[\d,.]+/g,
      /"price":\s*"([^"]+)"/,
      /"priceRange":\s*"([^"]+)"/
    ];
    
    for (const pattern of pricePatterns) {
      const matches = pageContent.match(pattern);
      if (matches && matches[0]) {
        priceRange = matches[0];
        break;
      }
    }

    // Extract minimum order quantity
    let minOrderQuantity = "N/A";
    const moqPatterns = [
      /minimum\s+order[:\s]+(\d+[^,.<]*)/i,
      /min\.?\s*order[:\s]+(\d+[^,.<]*)/i,
      /"minOrderQuantity":\s*"?([^",]+)"?/i,
      /MOQ[:\s]+(\d+[^,.<]*)/i
    ];
    
    for (const pattern of moqPatterns) {
      const match = pageContent.match(pattern);
      if (match && match[1]) {
        minOrderQuantity = match[1].trim();
        break;
      }
    }

    // Extract supplier information
    let supplier = "N/A";
    let supplierLocation = "N/A";
    let rating = "N/A";
    let responseRate = "N/A";

    // Try to find supplier info from various patterns
    const supplierPatterns = [
      /"companyName":\s*"([^"]+)"/,
      /"supplierName":\s*"([^"]+)"/,
      /company[^:]*:\s*"([^"]+)"/i
    ];
    
    for (const pattern of supplierPatterns) {
      const match = pageContent.match(pattern);
      if (match && match[1]) {
        supplier = match[1];
        break;
      }
    }

    // Extract supplier location
    const locationPatterns = [
      /"country":\s*"([^"]+)"/,
      /"location":\s*"([^"]+)"/,
      /"supplierLocation":\s*"([^"]+)"/
    ];
    
    for (const pattern of locationPatterns) {
      const match = pageContent.match(pattern);
      if (match && match[1]) {
        supplierLocation = match[1];
        break;
      }
    }

    // Extract features/specifications
    const features: string[] = [];
    
    // Look for key features in common patterns
    const featurePatterns = [
      /feature[s]?[:\s]+([^<>\n]+)/gi,
      /specification[s]?[:\s]+([^<>\n]+)/gi,
      /"features":\s*\[([^\]]+)\]/i
    ];
    
    for (const pattern of featurePatterns) {
      const matches = pageContent.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const cleanFeature = match.replace(/feature[s]?[:\s]+/gi, '').trim();
          if (cleanFeature.length > 0 && cleanFeature.length < 100) {
            features.push(cleanFeature);
          }
        });
      }
    }

    // Extract rating if available
    const ratingMatch = pageContent.match(/(\d+\.?\d*)\s*\/\s*5\s*stars?/i) || 
                       pageContent.match(/"rating":\s*"?(\d+\.?\d*)"?/);
    if (ratingMatch) {
      rating = ratingMatch[1] + "/5";
    }

    // Extract response rate
    const responseMatch = pageContent.match(/response\s+rate[:\s]+(\d+%)/i) ||
                         pageContent.match(/"responseRate":\s*"?(\d+%)"?/);
    if (responseMatch) {
      responseRate = responseMatch[1];
    }

    return {
      title: title.trim(),
      priceRange: priceRange === "N/A" ? "Price not available" : priceRange,
      minOrderQuantity,
      supplier,
      supplierLocation,
      rating,
      responseRate,
      images: images.slice(0, 5), // Limit to 5 images
      description: description.length > 300 ? description.substring(0, 300) + "..." : description,
      features: features.slice(0, 5), // Limit to 5 features
    };

  } catch (error: unknown) {
    console.error("Alibaba scraping error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage || "An unknown error occurred during Alibaba scraping.");
  }
} 