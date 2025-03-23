"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import FeaturedTrips from "@/components/FeaturedTrips";

type AutoSliderProps = {
  images: string[];
  interval?: number;
  className?: string;
};

const IMAGES: { [key: string]: string[] } = {
  international: [
    "/images/international1.jpg",
    "/images/international2.jpg",
    "/images/international3.jpg",
  ],
  domestic: [
    "/images/domestic1.jpg",
    "/images/domestic2.jpg",
    "/images/domestic3.jpg",
  ],
  family: [
    "/images/family1.jpg",
    "/images/family2.jpg",
    "/images/family3.jpg",
  ],
};

const FEATURED_TRIPS = [
  {
    title: "Exotic Bali",
    image: "/images/featured1.jpg",
    description: "Experience the tropical charm and vibrant culture of Bali.",
  },
  {
    title: "Safari Adventure",
    image: "/images/featured2.jpg",
    description: "Get up close with wildlife on an unforgettable safari journey.",
  },
  {
    title: "European Escapade",
    image: "/images/featured3.jpg",
    description: "Discover historic cities and breathtaking landscapes across Europe.",
  },
  {
    title: "Mountain Retreat",
    image: "/images/featured4.jpg",
    description: "Relax and rejuvenate amidst stunning mountain vistas.",
  },
];

const AutoSlider: React.FC<AutoSliderProps> = ({
  images,
  interval = 3000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % images.length;
        setPrevIndex(prev);
        // Clear previous index after the transition duration (500ms)
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

export default function HomePage() {
  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-0" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
          <Image
            src="/logo.png"
            alt="Columbus Tours Logo"
            width={300}
            height={100}
            className="w-full max-w-xs mb-4"
            priority
          />
          <p className="text-xl mb-8 font-light text-shadow-md max-w-2xl">
            Discover amazing experiences with us.
          </p>
          <button
            className="px-6 py-3 text-base font-semibold text-white bg-transparent border-2 border-white 
                      rounded hover:bg-white/20 hover:scale-105 transition-all duration-300 focus:outline-none 
                      focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Explore Tours"
          >
            Explore Tours
          </button>
        </div>
      </section>

      {/* Our Trips Heading Section */}
      <section className="w-full bg-gray-100 py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl mb-2 font-bold">Our Trips</h2>
          <p className="text-xl text-gray-700">
            Choose from our variety of exciting tour packages.
          </p>
        </div>
      </section>

      {/* Our Trips Section */}
<section className="w-full bg-white py-16">
  <div className="container mx-auto px-4">
    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Our Trips</h2>
      <p className="text-xl text-gray-700">
        Choose from our variety of exciting tour packages.
      </p>
    </div>
    {/* Tour Categories Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(IMAGES).map(([category, images]) => (
        <div key={category} className="relative h-80 md:h-96 overflow-hidden rounded shadow-lg">
          <AutoSlider
            images={images}
            interval={4000} // You can adjust or stagger as needed
            className="object-cover"
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-4">
            <h3 className="text-2xl font-semibold capitalize text-white mb-2">
              {category}
            </h3>
            <p className="text-white text-center text-sm">
              {category === "international" &&
                "Explore tours across continents and immerse yourself in new cultures."}
              {category === "domestic" &&
                "Discover the beauty of local destinations and hidden gems within the country."}
              {category === "family" &&
                "Enjoy quality time with family-friendly tour packages designed for all ages."}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Featured Trips Section */}
      <FeaturedTrips trips={FEATURED_TRIPS} />
    </main>
  );
}
