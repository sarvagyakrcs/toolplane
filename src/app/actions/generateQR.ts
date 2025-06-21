"use server";

import QRCode from "qrcode";

interface QRCodeOptions {
  size?: number;
  darkColor?: string;
  lightColor?: string;
}

export async function generateQRCode(
  text: string,
  options: QRCodeOptions = {}
): Promise<string> {
  if (!text) {
    throw new Error("Text or URL is required to generate QR code.");
  }

  try {
    const qrOptions = {
      width: options.size || 300,
      color: {
        dark: options.darkColor || '#000000',
        light: options.lightColor || '#FFFFFF'
      }
    };

    const qrCodeDataURL = await QRCode.toDataURL(text, qrOptions);
    return qrCodeDataURL;

  } catch (error: unknown) {
    console.error("QR Code generation error:", error);
    throw new Error("Failed to generate QR code.");
  }
} 