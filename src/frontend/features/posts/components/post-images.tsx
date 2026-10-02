"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/frontend/components/ui/carousel";

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
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={`${image}-${index}`}>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={`${title} image ${index + 1}`}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
              />

              <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                {index + 1} / {images.length}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
