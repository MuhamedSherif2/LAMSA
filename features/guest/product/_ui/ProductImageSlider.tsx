"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductImageSliderProps {
  images: {
    public_id: string;
    secure_url: string;
  }[];
  alt: string;
  isHovered: boolean;
}

function ProductImageSlider({
  images,
  alt,
  isHovered,
}: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isHovered || images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= images.length - 1) {
          return 0;
        }

        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  useEffect(() => {
    if (!isHovered) {
      setCurrentIndex(0);
    }
  }, [isHovered]);

  if (!images.length) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-muted text-sm text-muted-foreground">
        No image
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
      <Image
        src={images[currentIndex].secure_url}
        alt={`${alt} - ${currentIndex + 1}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        className="object-cover"
      />

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((image, index) => (
            <span
              key={image.public_id}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-5 bg-white"
                  : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductImageSlider;