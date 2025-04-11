"use client";
import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { allTours, type Tour } from "@/data/toursData";
import DualSlider from "@/components/DualSlider";

type SortOption = "default" | "duration-asc" | "duration-desc" | "alphabetical-asc" | "alphabetical-desc";

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
  return (
    <Suspense fallback={<Loading />}>
      <ToursPageContent />
    </Suspense>
  );
}

// Add Loading component definition
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-lg">Loading tours...</div>
    </div>
  );
}

function ToursPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  // Local state declarations
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [durationRange, setDurationRange] = useState<[number, number]>([1, 15]);
  const [maxDuration, setMaxDuration] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("default");

  // Debounce helper to delay search updates
  // Update the debounce helper function
  const debounce = useCallback(
    <T extends unknown[]>(func: (...args: T) => void, wait: number): ((...args: T) => void) => {
      let timeout: number | undefined;
      return (...args: T) => {
        if (timeout) clearTimeout(timeout);
        timeout = window.setTimeout(() => func(...args), wait);
      };
    },
    []
  );

  // Debounced search handler: updates URL query parameters and local search query
  const handleSearch = useMemo(
    () =>
      debounce((query: string) => {
        router.push(`/tours?search=${encodeURIComponent(query)}&category=${selectedCategory.toLowerCase()}`);
        setSearchQuery(query);
      }, 300),
    [debounce, router, selectedCategory]
  );

  // On mount: determine maximum tour duration from all tours
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

  // Update local state if URL query parameters change
  useEffect(() => {
    const cat = searchParams.get("category") || "All";
    const q = searchParams.get("search") || "";
    setSelectedCategory(cat);
    setSearchQuery(q);
  }, [searchParams]);

  // Filter tours based on category, search query (by title only), and duration range
  const filteredTours = useMemo(() => {
    const results = allTours.filter((tour) => {
      if (selectedCategory !== "All" && tour.category.toLowerCase() !== selectedCategory.toLowerCase()) {
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
      results.sort((a, b) => b.title.localeCompare(a.title));
    }
    return results;
  }, [selectedCategory, searchQuery, durationRange, sortOption]);

  // Update URL and local state when a category is selected
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    router.push(`/tours?category=${category.toLowerCase()}&search=${encodeURIComponent(searchQuery)}`);
  };

  // Reset filters and clear query parameters
  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setDurationRange([1, maxDuration]);
    setSortOption("default");
    router.push("/tours");
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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1976D2] to-[#D32F2F] text-white py-16 mb-8">
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

        <div className="flex flex-col md:flex-row gap-6">
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
                onChange={(e) => handleSearch(e.target.value)}
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
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
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
        <span className="absolute top-3 right-3 bg-[#1976D2] text-white text-xs px-2 py-1 rounded-full">
          {tour.category}
        </span>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{tour.title}</h3>
        <div className="flex items-center text-sm text-[#333333]">
          <span className="mr-1">📅</span>
          <span>
            {tour.duration} night{tour.duration !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
      <div className="p-4 pt-2 border-t border-gray-100">
        <Link href={`/tours/${tour.slug}`} className="block w-full" aria-label={`View details for ${tour.title}`}>
          <button className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white py-2 px-4 rounded transition-colors flex items-center justify-center">
            View Details <span className="ml-1">→</span>
          </button>
        </Link>
        <div className="mt-2 flex gap-2">
          <a
            href={`https://wa.me/919422401225?text=Hi, I'm interested in the ${tour.title} tour`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#43A047] hover:bg-[#388E3C] text-white py-2 px-4 rounded transition-colors flex items-center justify-center"
          >
            WhatsApp <span className="ml-1">💬</span>
          </a>
          <a
            href="tel:+919422401225"
            className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white py-2 px-4 rounded transition-colors flex items-center justify-center"
          >
            Call <span className="ml-1">📞</span>
          </a>
        </div>
      </div>
    </div>
  );
}
