import { NextRequest } from "next/server";
import { ApiPipe } from "@/lib/api-pipe";
import { scrapeYouTubeVideo } from "@/app/actions/scrapeYouTube";

export async function GET(request: NextRequest) {
  const pipe = new ApiPipe(request, '/api/scrape-youtube');
  
  return pipe.process(async () => {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      throw new Error('URL parameter is required');
    }
    
    const result = await scrapeYouTubeVideo(url);
    return result;
  });
} 