import { NextRequest } from "next/server";
import { ApiPipe } from "@/lib/api-pipe";
import { cleanWebArticle } from "@/app/actions/cleanArticle";

export async function GET(request: NextRequest) {
  const pipe = new ApiPipe(request, '/api/clean-article');
  
  return pipe.process(async () => {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const format = searchParams.get('format') as 'html' | 'markdown' | 'both' || 'both';
    
    if (!url) {
      throw new Error('URL parameter is required');
    }
    
    if (!['html', 'markdown', 'both'].includes(format)) {
      throw new Error('Format must be one of: html, markdown, both');
    }
    
    const result = await cleanWebArticle(url, format);
    return result;
  });
} 