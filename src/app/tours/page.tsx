"use client";
import React, { Suspense, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { allTours, type Tour } from "@/data/toursData";
import DualSlider from "@/components/DualSlider";
import { FiSearch } from 'react-icons/fi';
import { FaStar, FaCalendarAlt, FaHeart } from 'react-icons/fa';
import {
  FaGlobe,
  FaPlane,
  FaHome,
  FaPrayingHands,
  FaShip
} from 'react-icons/fa';

type SortOption = "default" | "duration-asc" | "duration-desc" | "alphabetical-asc" | "alphabetical-desc";

const CATEGORIES = [
  { name: 'All', icon: <FaGlobe className="text-xl text-blue-600" /> },
  { name: 'International', icon: <FaPlane className="text-xl text-blue-600" /> },
  { name: 'Domestic', icon: <FaHome className="text-xl text-blue-600" /> },
  { name: 'Religious', icon: <FaPrayingHands className="text-xl text-blue-600" /> },
  { name: 'Honeymoon', icon: <FaHeart className="text-xl text-pink-600" /> },
  { name: 'Cruise', icon: <FaShip className="text-xl text-blue-600" /> },
];

// Slideshow images
// Replace SLIDES with your actual tour group images and captions
const SLIDES = [
  {
    src: "/images/tourgroups/dubai.jpg",
    title: "Dubai Adventures",
    subtitle: "Experience the luxury and culture of Dubai.",
  },
  {
    src: "/images/tourgroups/pattaya.jpg",
    title: "Pattaya Escapades",
    subtitle: "Enjoy the vibrant nightlife and beaches of Pattaya.",
  },
  {
    src: "/images/tourgroups/srilanka.jpg",
    title: "Sri Lanka Tours",
    subtitle: "Discover the rich history and landscapes of Sri Lanka.",
  },
  {
    src: "/images/tourgroups/china.jpg",
    title: "China Expeditions",
    subtitle: "Explore the ancient wonders of China.",
  },
  {
    src: "/images/tourgroups/thailand.jpg",
    title: "Thailand Getaways",
    subtitle: "Immerse in the culture and beauty of Thailand.",
  },
  {
    src: "/images/tourgroups/bhutan.jpg",
    title: "Bhutan Journeys",
    subtitle: "Experience the serene beauty of Bhutan.",
  },
  {
    src: "/images/tourgroups/baku.jpg",
    title: "Baku Adventures",
    subtitle: "Discover the modern and historical blend of Baku.",
  },
];

export default function ToursPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ToursPageContent />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-lg">Loading tours...</div>
    </div>
  );
}

function ToursPageContent() {
  const router = useRouter(); // Ensure this is declared
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category")?.toLowerCase() || "all";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch); // Ensure this is declared
  const [durationRange, setDurationRange] = useState<[number, number]>([1, 15]);
  const [maxDuration, setMaxDuration] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  
  

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setSearchQuery(v);
    router.replace(`/tours?search=${encodeURIComponent(v)}&category=${selectedCategory}`, { scroll: false });
  };

  useEffect(() => {
    try {
      const maxTourDuration = Math.max(...allTours.map((tour) => tour.duration));
      setMaxDuration(maxTourDuration);
      setDurationRange([1, maxTourDuration]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error setting up tour filters:", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category")?.toLowerCase() || "all";
    const q = searchParams.get("search") || "";
    setSelectedCategory(cat);
    setSearchQuery(q);
  }, [searchParams]);

  const filteredTours = useMemo(() => {
    const results = allTours.filter((tour) => {
      if (selectedCategory !== "all" && tour.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = tour.title.toLowerCase().includes(query);
        if (!matchesTitle) return false;
      }
      if (tour.duration < durationRange[0] || tour.duration > durationRange[1]) {
        return false;
      }
      return true;
    });

    if (sortOption === "duration-asc") {
      results.sort((a, b) => a.duration - b.duration);
    } else if (sortOption === "duration-desc") {
      results.sort((a, b) => b.duration - a.duration);
    } else if (sortOption === "alphabetical-asc") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "alphabetical-desc") {
      results.sort((a, b) => b.title.localeCompare(b.title));
    }
    return results;
  }, [selectedCategory, searchQuery, durationRange, sortOption]);

  const handleCategoryChange = (category: string) => {
    const normalizedCategory = category.toLowerCase();
    setSelectedCategory(normalizedCategory);
    router.replace(`/tours?category=${normalizedCategory}&search=${encodeURIComponent(searchQuery)}`, { scroll: false });
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setDurationRange([1, maxDuration]);
    setSortOption("default");
    router.replace("/tours", { scroll: false });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading tours...</div>
      </div>
    );
  }

  return (
    <main className="bg-[#FFFFFF] min-h-screen pb-16">
      <style jsx global>{`
        /* Styles for rc-slider (assuming DualSlider uses rc-slider) */
        .rc-slider-rail {
          background-color: #e0e0e0 !important;
        }
        .rc-slider-track {
          background-color: #D32F2F !important;
        }
        .rc-slider-handle {
          border-color: #D32F2F !important;
          background-color: #FFFFFF !important;
        }
        .rc-slider-handle:hover,
        .rc-slider-handle:active,
        .rc-slider-handle:focus {
          border-color: #B71C1C !important;
        }
        .rc-slider-dot-active {
          border-color: #D32F2F !important;
        }
      `}</style>

      {/* Hero Section with Slideshow */}
      <section className="relative h-[60vh] overflow-hidden">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl max-w-2xl mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            </div>
          </div>
        ))}
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* ── Mobile: categories + instant search ── */}
      <div className="md:hidden bg-white px-4 pt-4 pb-2 space-y-2">
        {/* Categories bar (wrap on mobile instead of overflow) */}
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md ${
                selectedCategory === cat.name.toLowerCase()
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100'
              }`}
            >
              {cat.icon}
              <span className="text-sm">{cat.name}</span>
            </button>
          ))}
        </div>
        {/* Instant-search input */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              router.replace(
                `/tours?search=${encodeURIComponent(e.target.value)}&category=${selectedCategory}`,
                { scroll: false }
              );
            }}
            placeholder="Search tours…"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Mobile Filter Button & Sort Select */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          >
            <FiSearch className="text-xl" />
            Filters
          </button>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8"
            >
              <option value="default">Sort by</option>
              <option value="duration-asc">Duration: Short to Long</option>
              <option value="duration-desc">Duration: Long to Short</option>
              <option value="alphabetical-asc">Alphabetical: A to Z</option>
              <option value="alphabetical-desc">Alphabetical: Z to A</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <span className="text-gray-500">▼</span>
            </div>
          </div>
        </div>

        <div className=" mt-10 flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside className={`${isFilterOpen ? "block" : "hidden"} md:block md:w-1/4 bg-[#F7F7F7] rounded-lg shadow-md p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="md:hidden text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium mb-2">Search Tours</label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={handleSearchInput}
                placeholder="Search by name..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search tours"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory.toLowerCase() === category.name.toLowerCase()
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Range Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Duration (nights)</h3>
              <DualSlider min={1} max={maxDuration} value={durationRange} onChange={setDurationRange} />
            </div>

            {/* Reset Filters Button */}
            <button
              onClick={resetFilters}
              className="w-full py-2 text-sm text-[#1976D2] hover:text-[#1565C0] border border-[#1976D2]/20 rounded-md hover:bg-[#1976D2]/10 transition-colors"
            >
              Reset All Filters
            </button>
          </aside>

          {/* Main Content: Tour Listings */}
          
          <div className="flex-1">
            {/* Desktop Sort Controls */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-[#333333]">
                Showing {filteredTours.length} {filteredTours.length === 1 ? "tour" : "tours"}
                {selectedCategory !== "all" && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-black">Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-white border border-gray-300 rounded-md px-4 py-2"
                >
                  <option value="default">Recommended</option>
                  <option value="duration-asc">Duration: Short to Long</option>
                  <option value="duration-desc">Duration: Long to Short</option>
                  <option value="alphabetical-asc">Alphabetical: A to Z</option>
                  <option value="alphabetical-desc">Alphabetical: Z to A</option>
                </select>
              </div>
            </div>

            {/* Tour Listings Grid */}
            {filteredTours.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">No tours found</h3>
                <p className="text-[#333333] mb-6">Try adjusting your filters to find more options.</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#D32F2F] text-white rounded-md hover:bg-[#B71C1C] focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

interface TourCardProps {
  tour: Tour;
  priority?: boolean;
}
 
 function TourCard({ tour, priority = false }: TourCardProps) {
  
  
  return (
    <motion.div
      className="relative group h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      {/* Featured Badge */}
      {tour.featured && (
        <div className="absolute top-4 right-4 z-20 bg-[#D32F2F] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
          <FaStar className="mr-1" />
          Featured
        </div>
      )}

      <Link
        href={`/tours/${tour.slug}`}
        className="block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#D32F2F] transition-all duration-300 shadow-sm hover:shadow-xl h-full flex flex-col"
      >
        {/* Square Image Container */}
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={`/images/tours/${tour.category.toLowerCase()}/${tour.folder}/thumbnail.jpg`}
            alt={`Scenic view of ${tour.title}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
          
          
        </div>

        {/* Card Content */}
        <div className="p-5 flex-grow flex flex-col">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {tour.title}
          </h3>
          
          {/* Duration and Location */}
          <div className="flex flex-wrap gap-y-2 mb-3">
            <div className="flex items-center text-gray-700 w-full">
              <FaCalendarAlt className="mr-2 text-[#D32F2F]" />
              <span className="text-sm font-medium">
                {tour.duration} {tour.duration === 1 ? 'night' : 'nights'} / {tour.duration + 1} days
              </span>
            </div>
          
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {tour.shortDescription || 'Experience an unforgettable journey through breathtaking landscapes and immerse yourself in local culture with expert guides and carefully crafted itineraries.'}
          </p>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] flex flex-col p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 rounded-xl overflow-hidden">
          <div className="flex flex-col h-full">
            {/* Header Section */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                {tour.title} Experience
              </h3>
              <div className="h-1 w-16 bg-white rounded-full mb-3"></div>
              <div className="flex flex-wrap gap-y-2">
                <div className="flex items-center text-white/90 w-full">
                  <FaCalendarAlt className="mr-2" />
                  <span>{tour.duration} {tour.duration === 1 ? 'night' : 'nights'}</span>
                </div>
                
              </div>
            </div>
            
            {/* Content Section */}
            <div className="flex-grow overflow-y-auto mb-4">
              <h4 className="text-white font-semibold mb-2 text-lg">Description:</h4>
              <p className="text-white/80 text-sm mb-4">
                {tour.shortDescription || 'Experience an unforgettable journey through breathtaking landscapes and immerse yourself in local culture with expert guides and carefully crafted itineraries.'}
              </p>
            </div>
            
            {/* Footer CTA */}
            <button className="w-full px-6 py-3 bg-white hover:bg-gray-100 text-[#D32F2F] font-semibold rounded-lg transition-colors shadow-lg flex items-center justify-center mt-auto">
              Discover Journey
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  ); 
  
}