// File: src/app/blog/page.tsx

import Link from "next/link";
import Image from "next/image";
import React from "react";

// Dummy blog posts data (replace with your data source as needed)
const blogPosts = [
  {
    id: 1,
    title: "Exploring the Hidden Gems of Bali",
    slug: "exploring-bali-hidden-gems",
    excerpt:
      "Discover the beauty and serenity of Bali off the beaten path. Learn how to explore Bali’s hidden gems and captivating landscapes.",
    date: "2023-07-20",
    image: "/images/blog/bali.jpg",
  },
  {
    id: 2,
    title: "A Journey Through the Majestic Himalayas",
    slug: "journey-through-himalayas",
    excerpt:
      "Experience the awe-inspiring beauty of the Himalayas. Find out what makes this mountain range a must-visit destination for every adventure seeker.",
    date: "2023-07-15",
    image: "/images/blog/himalayas.jpg",
  },
  {
    id: 3,
    title: "Sailing the Mediterranean: A Cruise Experience",
    slug: "sailing-mediterranean-cruise",
    excerpt:
      "Embark on a luxurious cruise through the Mediterranean. This guide provides insights on what to expect and how to make the most of your journey.",
    date: "2023-06-30",
    image: "/images/blog/mediterranean.jpg",
  },
  {
    id: 4,
    title: "The Ultimate Guide to Cultural Tours in Asia",
    slug: "cultural-tours-asia",
    excerpt:
      "From bustling cities to serene countryside, explore Asia’s rich cultural heritage with our ultimate guide to cultural tours.",
    date: "2023-06-15",
    image: "/images/blog/asia.jpg",
  },
  {
    id: 5,
    title: "Top 10 Must-Visit Destinations for 2024",
    slug: "top-10-destinations-2024",
    excerpt:
      "Planning your next vacation? Check out our list of the top 10 must-visit destinations for 2024 and get inspired for your next adventure.",
    date: "2023-06-01",
    image: "/images/blog/destinations.jpg",
  },
];

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
        <p className="text-xl text-gray-700">
          Latest travel insights, tips, and experiences.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="block"
            >
              <div className="relative h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">{post.date}</p>
                <p className="text-gray-700">{post.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
