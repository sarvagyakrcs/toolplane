import { NextRequest, NextResponse } from "next/server";
import { scrapeBingSearch } from "@/app/actions/scrapeBing";
import { ApiPipe } from "@/lib/api-pipe";

export async function GET(request: NextRequest) {
  const apiPipe = new ApiPipe(request, '/api/scrape-bing');

  return apiPipe.process(async () => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const numResults = parseInt(url.searchParams.get('numResults') || '10');

    if (!query || query.trim().length === 0) {
      throw new Error("Missing required parameter: query");
    }

    if (numResults < 1 || numResults > 20) {
      throw new Error("numResults must be between 1 and 20");
    }

    return await scrapeBingSearch(query, numResults);
  });
} 