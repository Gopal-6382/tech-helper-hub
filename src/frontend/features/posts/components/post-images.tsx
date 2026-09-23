"use client";

import Image from "next/image";

type PostImagesProps = {
  images?: string[];
  title?: string;
};

export function PostImages({
  images = [],
  title = "Post image",
}: PostImagesProps) {
  if (!images.length) {
    return null;
  }

  if (images.length === 1) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-lg">
      {images.slice(0, 4).map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="relative aspect-square overflow-hidden"
        >
          <Image
            src={image}
            alt={`${title} image ${index + 1}`}
            fill
            loading={index === 0 ? "eager" : "lazy"}
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 350px"
          />

          {index === 3 && images.length > 4 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-lg font-semibold text-white">
              +{images.length - 4}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
