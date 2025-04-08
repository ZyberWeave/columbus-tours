"use client";
import React from "react";
import Image from "next/image";

type AutoSliderProps = {
  images: string[];
  interval?: number;
  className?: string;
};

const AutoSlider: React.FC<AutoSliderProps> = ({
  images,
  interval = 4000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [prevIndex, setPrevIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % images.length;
        setPrevIndex(prev);
        setTimeout(() => setPrevIndex(null), 500);
        return nextIndex;
      });
    }, interval);
    return () => clearInterval(id);
  }, [images, interval]);

  return (
    <div className="relative w-full h-full">
      {prevIndex !== null && (
        <Image
          src={images[prevIndex]}
          alt={`Slide ${prevIndex + 1}`}
          fill
          className={`absolute inset-0 transition-opacity duration-500 opacity-0 object-cover ${className}`}
          loading="lazy"
        />
      )}
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        fill
        className={`absolute inset-0 transition-opacity duration-500 opacity-100 object-cover ${className}`}
        loading="lazy"
      />
    </div>
  );
};

export default AutoSlider;