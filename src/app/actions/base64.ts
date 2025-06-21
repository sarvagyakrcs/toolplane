"use server";

interface Base64Result {
  result: string;
  operation: 'encode' | 'decode';
}

export async function encodeBase64(text: string): Promise<Base64Result> {
  if (!text) {
    throw new Error("Text is required for Base64 encoding.");
  }

  try {
    const encoded = Buffer.from(text, 'utf8').toString('base64');
    return {
      result: encoded,
      operation: 'encode'
    };
  } catch (error: unknown) {
    console.error("Base64 encoding error:", error);
    throw new Error("Failed to encode text to Base64.");
  }
}

export async function decodeBase64(base64Text: string): Promise<Base64Result> {
  if (!base64Text) {
    throw new Error("Base64 text is required for decoding.");
  }

  try {
    const decoded = Buffer.from(base64Text, 'base64').toString('utf8');
    return {
      result: decoded,
      operation: 'decode'
    };
  } catch (error: unknown) {
    console.error("Base64 decoding error:", error);
    throw new Error("Invalid Base64 string or decoding failed.");
  }
} 