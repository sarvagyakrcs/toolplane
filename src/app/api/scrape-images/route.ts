import { NextRequest } from "next/server";
import { ApiPipe } from "@/lib/api-pipe";
import { scrapeSiteImages } from "@/app/actions/scrapeImages";

export async function GET(request: NextRequest) {
  const pipe = new ApiPipe(request, '/api/scrape-images');
  
  return pipe.process(async () => {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 50;
    
    if (!url) {
      throw new Error('URL parameter is required');
    }
    
    if (limit < 1 || limit > 200) {
      throw new Error('Limit must be between 1 and 200');
    }
    
    const result = await scrapeSiteImages(url, limit);
    return result;
  });
} 