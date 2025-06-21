import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export function Image({ src, alt, width, height, caption }: ImageProps) {
  return (
    <figure className="my-8 not-prose">
      <div className="relative overflow-hidden bg-gray-100 rounded-none border border-gray-200">
        <NextImage
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 400}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-600 font-serif italic text-center leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
} 