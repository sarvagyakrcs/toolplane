"use server";

import { createHash } from "crypto";

interface HashResult {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

export async function generateHashes(text: string): Promise<HashResult> {
  if (!text) {
    throw new Error("Text is required to generate hashes.");
  }

  try {
    return {
      md5: createHash('md5').update(text).digest('hex'),
      sha1: createHash('sha1').update(text).digest('hex'),
      sha256: createHash('sha256').update(text).digest('hex'),
      sha512: createHash('sha512').update(text).digest('hex'),
    };
  } catch (error: any) {
    console.error("Hash generation error:", error);
    throw new Error("Failed to generate hashes.");
  }
} 