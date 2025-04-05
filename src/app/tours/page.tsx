"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { allTours, type Tour } from "@/data/toursData";
import DualSlider from "@/components/DualSlider";

// Tour categories with icons for a better UX
const CATEGORIES = [
  { name: "All", icon: "🌍" },
  { name: "International", icon: "✈️" },
  { name: "Domestic", icon: "🏠" },
  { name: "Religious", icon: "🛐" },
  { name: "Honeymoon", icon: "💑" },
  { name: "Cruise", icon: "🛳️" },
];

export default function ToursPage() {
  // States for filtering, sorting, and loading
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [durationRange, setDurationRange] = useState<[number, number]>([1, 15]);
  const [maxDuration, setMaxDuration] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<"default" | "duration-asc" | "duration-desc">("default");

  // Debounce helper for search input
  const debounce = useCallback(
    <T extends (...args: any[]) => void>(func: T, wait: number): ((...args: Parameters<T>) => void) => {
      let timeout: NodeJS.Timeout;
      return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    },
    []
  );

  // Debounced search handler
  const handleSearch = useMemo(() => debounce((query: string) => setSearchQuery(query), 300), [debounce]);

  // On mount, determine the maximum tour duration
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

  // Filter tours based on category, search query, and duration range
  const filteredTours = useMemo(() => {
    let results = allTours.filter((tour) => {
      if (selectedCategory !== "All" && tour.category !== selectedCategory) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = tour.title.toLowerCase().includes(query);
        const matchesDescription = tour.description?.toLowerCase().includes(query) || false;
        const matchesLocation = tour.location?.toLowerCase().includes(query) || false;
        if (!matchesTitle && !matchesDescription && !matchesLocation) return false;
      }
      if (tour.duration < durationRange[0] || tour.duration > durationRange[1]) return false;
      return true;
    });

    if (sortOption === "duration-asc") {
      results.sort((a, b) => a.duration - b.duration);
    } else if (sortOption === "duration-desc") {
      results.sort((a, b) => b.duration - a.duration);
    }
    return results;
  }, [selectedCategory, searchQuery, durationRange, sortOption]);

  // Reset filters to default values
  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setDurationRange([1, maxDuration]);
    setSortOption("default");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading tours...</div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Perfect Journey</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Explore our handpicked collection of unforgettable tour experiences.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Mobile Filter Button & Sort Select */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          >
            <span>🔍</span>
            Filters
          </button>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8"
            >
              <option value="default">Sort by</option>
              <option value="duration-asc">Duration: Short to Long</option>
              <option value="duration-desc">Duration: Long to Short</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <span className="text-gray-500">▼</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside className={`${isFilterOpen ? "block" : "hidden"} md:block md:w-1/4 bg-white rounded-lg shadow-md p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="md:hidden text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium mb-2">
                Search Tours
              </label>
              <input
                id="search"
                type="text"
                defaultValue={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name, description or location..."
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
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.name ? "bg-blue-100 text-blue-700" : "hover:bg-gray-50"
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
              className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
            >
              Reset All Filters
            </button>
          </aside>

          {/* Main Content: Tour Listings */}
          <div className="flex-1">
            {/* Desktop Sort Controls */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredTours.length} {filteredTours.length === 1 ? "tour" : "tours"}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-white border border-gray-300 rounded-md px-4 py-2"
                >
                  <option value="default">Recommended</option>
                  <option value="duration-asc">Duration: Short to Long</option>
                  <option value="duration-desc">Duration: Long to Short</option>
                </select>
              </div>
            </div>

            {/* Tour Listings Grid */}
            {filteredTours.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">No tours found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to find more options.</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

// Tour Card component
function TourCard({ tour }: { tour: Tour }) {
  // Build the thumbnail path from the tour folder
  // Adjust the path if your images are stored under a category folder:
  // e.g., `/images/tours/{category in lowercase}/{folder}/thumbnail.jpg`
  const thumbnailPath = `/images/tours/${tour.category.toLowerCase()}/${tour.folder}/thumbnail.jpg`;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col group">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={thumbnailPath}
          alt={tour.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          {tour.category}
        </span>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{tour.title}</h3>
        {tour.location && (
          <p className="flex items-center text-sm text-gray-600 mb-2">
            <span className="mr-1">📍</span>
            <span>{tour.location}</span>
          </p>
        )}
        {tour.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{tour.description}</p>
        )}
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-1">📅</span>
          <span>{tour.duration} night{tour.duration !== 1 ? "s" : ""}</span>
        </div>
      </div>
      <div className="p-4 pt-2 border-t border-gray-100">
        <Link href={`/tours/${tour.slug}`} className="block w-full" aria-label={`View details for ${tour.title}`}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors flex items-center justify-center">
            View Details <span className="ml-1">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
