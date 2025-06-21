import { NextRequest } from "next/server";
import { ApiPipe } from "@/lib/api-pipe";
import { generateQRCode } from "@/app/actions/generateQR";

export async function GET(request: NextRequest) {
  const pipe = new ApiPipe(request, '/api/generate-qr');
  
  return pipe.process(async () => {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');
    const size = searchParams.get('size');
    const darkColor = searchParams.get('darkColor');
    const lightColor = searchParams.get('lightColor');
    
    if (!text) {
      throw new Error('Text parameter is required');
    }
    
    const options = {
      ...(size && { size: parseInt(size) }),
      ...(darkColor && { darkColor }),
      ...(lightColor && { lightColor }),
    };
    
    const qrCode = await generateQRCode(text, options);
    return { qrCode, text, options };
  });
} 