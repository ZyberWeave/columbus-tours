"use client";
import React, { useState } from "react";
import Image from "next/image";

// Sample gallery images with captions
const galleryImages = [
  {
    src: "/images/gallery1.jpg",
    alt: "Scenic mountain view",
    caption: "Majestic mountains under a clear blue sky",
  },
  {
    src: "/images/gallery2.jpg",
    alt: "City skyline at dusk",
    caption: "City lights glowing as dusk settles",
  },
  {
    src: "/images/gallery3.jpg",
    alt: "Tropical beach paradise",
    caption: "Relax on pristine white sands with turquoise waters",
  },
  {
    src: "/images/gallery4.jpg",
    alt: "Historic architecture",
    caption: "Step back in time with historic landmarks",
  },
  {
    src: "/images/gallery5.jpg",
    alt: "Local market hustle",
    caption: "Experience the vibrant energy of local markets",
  },
  {
    src: "/images/gallery6.jpg",
    alt: "Cultural festival",
    caption: "Celebrate diverse cultures at lively festivals",
  },
  {
    src: "/images/gallery7.jpg",
    alt: "Desert landscape",
    caption: "Endless dunes under a radiant sun",
  },
  {
    src: "/images/gallery8.jpg",
    alt: "Serene lakeside view",
    caption: "Tranquil moments by the lake at sunrise",
  },
  {
    src: "/images/gallery9.jpg",
    alt: "Lush countryside",
    caption: "Rolling hills and endless green fields",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  // Open the lightbox/modal for a selected image
  const openImage = (image: { src: string; alt: string; caption: string }) => {
    setSelectedImage(image);
  };

  // Close the modal by resetting the selected image
  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <main className="max-w-6xl mx-auto p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-xl text-gray-700">
          Explore our curated collection of travel moments from around the world.
        </p>
      </header>

      {/* Gallery Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className="relative cursor-pointer rounded-lg overflow-hidden shadow-md"
            onClick={() => openImage(img)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={300}
              className="object-cover transition-transform duration-200 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
              <p className="text-white text-sm">{img.caption}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="rounded-lg object-contain"
            />
            <p className="mt-4 text-center text-white text-lg">{selectedImage.caption}</p>
            <button
              className="absolute top-4 right-4 text-white text-4xl font-bold"
              onClick={closeImage}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
