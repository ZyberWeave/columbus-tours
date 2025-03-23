'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";

interface AutoSliderProps {
  images: string[];
  interval?: number;
  className?: string;
}

const AutoSlider: React.FC<AutoSliderProps> = ({ 
  images, 
  interval = 3000,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
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
          alt=""
          fill
          className={`absolute inset-0 transition-opacity duration-500 opacity-0 object-cover ${className}`}
          loading="lazy"
        />
      )}
      <Image 
        src={images[currentIndex]} 
        alt=""
        fill
        className={`absolute inset-0 transition-opacity duration-500 opacity-100 object-cover ${className}`}
        loading="lazy"
      />
    </div>
  );
};

export default AutoSlider;