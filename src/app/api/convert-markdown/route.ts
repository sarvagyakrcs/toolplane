import { NextRequest } from "next/server";
import { ApiPipe } from "@/lib/api-pipe";
import { convertToMarkdown } from "@/app/actions/convert";

export async function POST(request: NextRequest) {
  const pipe = new ApiPipe(request, '/api/convert-markdown');
  
  return pipe.process(async () => {
    const body = await request.json();
    const { url, includeTitle, includeLinks, improveReadability } = body;
    
    if (!url) {
      throw new Error('URL is required in request body');
    }
    
    const options = {
      includeTitle: includeTitle ?? true,
      includeLinks: includeLinks ?? true,
      improveReadability: improveReadability ?? true,
    };
    
    const result = await convertToMarkdown(url, options);
    return result;
  });
} 