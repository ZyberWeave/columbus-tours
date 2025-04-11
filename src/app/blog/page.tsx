"use client";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt, FaArrowRight, FaSearch } from "react-icons/fa";
import { useState } from "react";

// Example blog posts data with SEO-friendly content and keywords
const blogPosts = [
  {
    id: 1,
    title: "Unveiling the Hidden Heritage of Karad: A Journey Through Time",
    slug: "unveiling-hidden-heritage-karad",
    excerpt:
      "Explore the ancient secrets of Karad and Satara in Maharashtra, India. Our exclusive tours offer a glimpse of majestic heritage without revealing full itineraries. Call our office at 1, Laxmi Heights, 63 Mangalwar Peth, Opp. Jyotiba Temple, Karad - 415 110 (MS) INDIA for more details.",
    date: "October 15, 2023",
    image: "/images/blog/karad-heritage.jpg",
    category: "Cultural",
    readingTime: "5 min read"
  },
  {
    id: 2,
    title: "The Spirit of Satara: Embracing Timeless Traditions",
    slug: "the-spirit-of-satara",
    excerpt:
      "Immerse yourself in the spiritual traditions of Satara. Our curated previews capture exclusive insights into ancient customs and heritage sites, setting the stage for our guided tours.",
    date: "October 01, 2023",
    image: "/images/blog/satara-spirit.jpg",
    category: "Heritage",
    readingTime: "4 min read"
  },
  {
    id: 3,
    title: "Maharashtra Marvels: A Curated Preview of Exclusive Tours",
    slug: "maharashtra-marvels-preview",
    excerpt:
      "Discover the wonders of Maharashtra—from its ancient forts to vibrant local markets—in our carefully curated previews. Experience the mystery without the full itinerary revealed online.",
    date: "September 25, 2023",
    image: "/images/blog/maharashtra-marvels.jpg",
    category: "Travel",
    readingTime: "6 min read"
  },
  {
    id: 4,
    title: "Sustainable Journeys: Eco-Friendly Tours in India",
    slug: "sustainable-eco-friendly-tours",
    excerpt:
      "Learn how our eco-friendly tours protect India's natural beauty while offering a taste of exclusive experiences reserved only for our guided groups.",
    date: "September 10, 2023",
    image: "/images/blog/eco-friendly-travel.jpg",
    category: "Sustainability",
    readingTime: "5 min read"
  },
  {
    id: 5,
    title: "Digital Transformation in Travel: Exclusive Insights from Columbus Tours",
    slug: "digital-transformation-travel-insights",
    excerpt:
      "Explore how digital innovation is reshaping travel experiences in India. Our office in Karad is at the forefront of blending modern technology with traditional tour planning.",
    date: "August 30, 2023",
    image: "/images/blog/digital-transformation.jpg",
    category: "Technology",
    readingTime: "6 min read"
  },
  {
    id: 6,
    title: "Luxury Redefined: A Sneak Peek into Premium Tour Experiences",
    slug: "luxury-premium-tour-preview",
    excerpt:
      "Step into a world of luxury with our premium tour previews. We reveal just enough to spark your imagination while keeping key details exclusive for our booked clients.",
    date: "August 15, 2023",
    image: "/images/blog/luxury-travel.jpg",
    category: "Luxury",
    readingTime: "5 min read"
  },
  {
    id: 7,
    title: "Culinary Journeys: A Taste of Karad's Authentic Flavors",
    slug: "culinary-journeys-karad",
    excerpt:
      "Savor the unique culinary traditions of Karad and Satara, where local flavors meet a rich heritage. Our limited previews hint at the exclusive dining experiences on our guided tours.",
    date: "July 15, 2023",
    image: "/images/blog/karad-culinary.jpg",
    category: "Food & Culture",
    readingTime: "5 min read"
  },
  {
    id: 8,
    title: "Travel Trends 2024: Emerging Destinations in India",
    slug: "travel-trends-2024-emerging-destinations",
    excerpt:
      "Our travel experts reveal emerging destinations for 2024. Get exclusive previews of tours that blend modern adventures with the traditional charm of India.",
    date: "July 01, 2023",
    image: "/images/blog/destinations.jpg",
    category: "Trends",
    readingTime: "7 min read"
  }
];

const categories = [
  "All",
  "Cultural",
  "Heritage",
  "Travel",
  "Sustainability",
  "Technology",
  "Luxury",
  "Food & Culture",
  "Trends"
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter posts based on the search term and selected category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Travel Insights & Stories
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Discover expert travel tips, curated previews, and inspiring stories from our team.
            Learn about exclusive tours in Karad, Satara, Maharashtra, India, and beyond.
          </p>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full py-4 px-6 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.filter((post) => post.id <= 3).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-64">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaCalendarAlt className="mr-1" /> {post.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Read more <FaArrowRight className="ml-2" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Main Blog Grid */}
      <section className="container mx-auto px-4 py-8 pb-16">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center">
                        <FaCalendarAlt className="mr-1" /> {post.date}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">{post.readingTime}</span>
                      <div className="text-blue-600 flex items-center">
                        Read more <FaArrowRight className="ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">
            Get Exclusive Travel Tips Straight to Your Inbox
          </h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter for curated travel advice, tour previews, and exclusive deals from
            our office in Karad, Satara, Maharashtra, India.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
