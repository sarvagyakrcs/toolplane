"use server";

import * as cheerio from "cheerio";

interface ImageData {
  src: string;
  alt: string | null;
  title: string | null;
  width: string | null;
  height: string | null;
  size: string | null;
}

interface SiteImagesData {
  url: string;
  totalImages: number;
  images: ImageData[];
  pageTitle: string | null;
}

export async function scrapeSiteImages(url: string, limit: number = 50): Promise<SiteImagesData> {
  if (!url) {
    throw new Error("A valid website URL is required.");
  }

  // Ensure URL has protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the page. Status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract page title
    const pageTitle = $('title').text().trim() || $('meta[property="og:title"]').attr('content') || null;

    // Get base URL for resolving relative URLs
    const baseUrl = new URL(url);
    const baseDomain = `${baseUrl.protocol}//${baseUrl.host}`;
    
    const images: ImageData[] = [];
    const seenUrls = new Set<string>();

    // Helper function to resolve relative URLs
    const resolveUrl = (src: string): string => {
      try {
        if (src.startsWith('//')) {
          return baseUrl.protocol + src;
        } else if (src.startsWith('/')) {
          return baseDomain + src;
        } else if (src.startsWith('http://') || src.startsWith('https://')) {
          return src;
        } else {
          return new URL(src, url).href;
        }
      } catch {
        return src;
      }
    };

    // Extract images from img tags
    $('img').each((_, element) => {
      const $img = $(element);
      const src = $img.attr('src') || $img.attr('data-src') || $img.attr('data-lazy-src');
      
      if (!src || src.startsWith('data:')) return; // Skip data URLs and empty src
      
      const resolvedSrc = resolveUrl(src);
      
      // Skip if we've already seen this URL
      if (seenUrls.has(resolvedSrc)) return;
      seenUrls.add(resolvedSrc);
      
      const alt = $img.attr('alt') || null;
      const title = $img.attr('title') || null;
      const width = $img.attr('width') || null;
      const height = $img.attr('height') || null;
      
      // Try to determine file size from src (rough estimate)
      let size = null;
      const sizeMatch = src.match(/(\d+)x(\d+)/);
      if (sizeMatch) {
        size = `${sizeMatch[1]}x${sizeMatch[2]}`;
      } else if (width && height) {
        size = `${width}x${height}`;
      }

      images.push({
        src: resolvedSrc,
        alt,
        title,
        width,
        height,
        size,
      });
    });

    // Extract images from CSS background-image properties (inline styles)
    $('[style*="background-image"]').each((_, element) => {
      const style = $(element).attr('style') || '';
      const matches = style.match(/background-image:\s*url\(['"]?([^'"()]+)['"]?\)/gi);
      
      if (matches) {
        matches.forEach(match => {
          const urlMatch = match.match(/url\(['"]?([^'"()]+)['"]?\)/);
          if (urlMatch && urlMatch[1]) {
            const src = urlMatch[1];
            if (src.startsWith('data:')) return; // Skip data URLs
            
            const resolvedSrc = resolveUrl(src);
            
            if (!seenUrls.has(resolvedSrc)) {
              seenUrls.add(resolvedSrc);
              images.push({
                src: resolvedSrc,
                alt: 'Background image',
                title: null,
                width: null,
                height: null,
                size: null,
              });
            }
          }
        });
      }
    });

    // Extract images from picture/source elements
    $('picture source, source').each((_, element) => {
      const $source = $(element);
      const srcset = $source.attr('srcset');
      
      if (srcset) {
        const urls = srcset.split(',').map(s => s.trim().split(' ')[0]);
        urls.forEach(src => {
          if (!src || src.startsWith('data:')) return;
          
          const resolvedSrc = resolveUrl(src);
          
          if (!seenUrls.has(resolvedSrc)) {
            seenUrls.add(resolvedSrc);
            images.push({
              src: resolvedSrc,
              alt: 'Picture source',
              title: null,
              width: null,
              height: null,
              size: null,
            });
          }
        });
      }
    });

    // Extract Open Graph and Twitter Card images
    const metaImages = [
      $('meta[property="og:image"]').attr('content'),
      $('meta[property="og:image:url"]').attr('content'),
      $('meta[name="twitter:image"]').attr('content'),
      $('meta[name="twitter:image:src"]').attr('content'),
    ].filter(Boolean);

    metaImages.forEach(src => {
      if (src && !src.startsWith('data:')) {
        const resolvedSrc = resolveUrl(src);
        if (!seenUrls.has(resolvedSrc)) {
          seenUrls.add(resolvedSrc);
          images.push({
            src: resolvedSrc,
            alt: 'Meta/Social image',
            title: null,
            width: null,
            height: null,
            size: null,
          });
        }
      }
    });

    // Sort images by potential importance (larger images first, then by position)
    images.sort((a, b) => {
      const aSize = (parseInt(a.width || '0') * parseInt(a.height || '0')) || 0;
      const bSize = (parseInt(b.width || '0') * parseInt(b.height || '0')) || 0;
      return bSize - aSize;
    });

    // Filter out very small images (likely icons/decorations)
    const filteredImages = images.filter(img => {
      const width = parseInt(img.width || '0');
      const height = parseInt(img.height || '0');
      
      // Keep images if we don't know the size, or if they're reasonably sized
      return !img.width || !img.height || (width >= 50 && height >= 50);
    });

    return {
      url,
      totalImages: filteredImages.length,
      images: filteredImages.slice(0, limit),
      pageTitle,
    };

  } catch (error: any) {
    console.error("Image scraping error:", error);
    throw new Error(error.message || "An unknown error occurred during image scraping.");
  }
} 