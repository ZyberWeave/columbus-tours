"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";

// Sample gallery images with captions and categories
const galleryImages = [
  {
    id: 1,
    src: "/images/gallery1.jpg",
    alt: "Scenic mountain view",
    caption: "Majestic mountains under a clear blue sky",
    category: "nature",
  },
  {
    id: 2,
    src: "/images/gallery2.jpg",
    alt: "City skyline at dusk",
    caption: "City lights glowing as dusk settles",
    category: "urban",
  },
  {
    id: 3,
    src: "/images/gallery3.jpg",
    alt: "Tropical beach paradise",
    caption: "Relax on pristine white sands with turquoise waters",
    category: "beach",
  },
  {
    id: 4,
    src: "/images/gallery4.jpg",
    alt: "Historic architecture",
    caption: "Step back in time with historic landmarks",
    category: "culture",
  },
  {
    id: 5,
    src: "/images/gallery5.jpg",
    alt: "Local market hustle",
    caption: "Experience the vibrant energy of local markets",
    category: "culture",
  },
  {
    id: 6,
    src: "/images/gallery6.jpg",
    alt: "Cultural festival",
    caption: "Celebrate diverse cultures at lively festivals",
    category: "events",
  },
  {
    id: 7,
    src: "/images/gallery7.jpg",
    alt: "Desert landscape",
    caption: "Endless dunes under a radiant sun",
    category: "nature",
  },
  {
    id: 8,
    src: "/images/gallery8.jpg",
    alt: "Serene lakeside view",
    caption: "Tranquil moments by the lake at sunrise",
    category: "nature",
  },
  {
    id: 9,
    src: "/images/gallery9.jpg",
    alt: "Lush countryside",
    caption: "Rolling hills and endless green fields",
    category: "nature",
  },
  {
    id: 10,
    src: "/images/gallery10.jpg",
    alt: "Northern lights",
    caption: "Witness the magical aurora borealis",
    category: "nature",
  },
  {
    id: 11,
    src: "/images/gallery11.jpg",
    alt: "Safari adventure",
    caption: "Get up close with wildlife on safari",
    category: "adventure",
  },
  {
    id: 12,
    src: "/images/gallery12.jpg",
    alt: "Snowy peaks",
    caption: "Breathtaking views of alpine landscapes",
    category: "nature",
  },
];

const categories = [
  { id: "all", name: "All Photos" },
  { id: "nature", name: "Nature" },
  { id: "urban", name: "Urban" },
  { id: "beach", name: "Beach" },
  { id: "culture", name: "Culture" },
  { id: "events", name: "Events" },
  { id: "adventure", name: "Adventure" },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{
    id: number;
    src: string;
    alt: string;
    caption: string;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredImages, setFilteredImages] = useState(galleryImages);

  // Filter images based on active category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(
        galleryImages.filter((img) => img.category === activeCategory)
      );
    }
  }, [activeCategory]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "Escape") {
        closeImage();
      }

      if (e.key === "ArrowRight") {
        navigateImages(1);
      }

      if (e.key === "ArrowLeft") {
        navigateImages(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const openImage = (image: {
    id: number;
    src: string;
    alt: string;
    caption: string;
  }) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImages = (direction: number) => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const newIndex = (currentIndex + direction + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <>
      <Head>
        <title>Photo Gallery | Columbus Tours</title>
        <meta
          name="description"
          content="Explore our stunning travel photo gallery showcasing destinations from around the world."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <motion.header
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                Travel Gallery
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated collection of travel moments from around the world.
            </p>
          </motion.header>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          {filteredImages.length > 0 ? (
            <motion.section
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {filteredImages.map((img) => (
                <motion.div
                  key={img.id}
                  className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg"
                  onClick={() => openImage(img)}
                  whileHover={{ y: -5 }}
                  layout
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-lg font-medium">{img.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.section>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                No photos found in this category
              </h3>
              <p className="mt-2 text-gray-500">
                Try selecting a different category to view more images.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={closeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full max-w-6xl">
              {/* Navigation Arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImages(-1);
                }}
                aria-label="Previous image"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImages(1);
                }}
                aria-label="Next image"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Close Button */}
              <button
                className="absolute -top-12 right-0 text-white text-4xl font-light hover:text-gray-300 transition z-10"
                onClick={closeImage}
                aria-label="Close lightbox"
              >
                &times;
              </button>

              {/* Image Content */}
              <motion.div
                className="relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="rounded-lg object-contain max-h-[80vh] w-full"
                  priority
                />
                <motion.div
                  className="mt-4 text-center text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-xl">{selectedImage.caption}</p>
                  <p className="text-sm text-gray-300 mt-1">
                    {selectedImage.id} of {filteredImages.length}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}