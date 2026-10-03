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

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={`${image}-${index}`}>
            <div className="relative h-96 w-full overflow-hidden rounded-xl bg-muted">
              <Image
                src={image}
                alt={`${title} image ${index + 1}`}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-contain"
              />

              {images.length > 1 && (
                <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                  {index + 1} / {images.length}
                </div>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {images.length > 1 && (
        <>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </>
      )}
    </Carousel>
  );
}