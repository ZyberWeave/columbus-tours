// File: src/app/blog/[slug]/page.tsx

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import React from "react";

// Dummy data: Replace this with your actual data source or API call.
const blogPosts = [
  {
    id: 1,
    title: "Exploring the Hidden Gems of Bali",
    slug: "exploring-bali-hidden-gems",
    excerpt:
      "Discover the beauty and serenity of Bali off the beaten path. Learn how to explore Bali’s hidden gems and captivating landscapes.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rutrum dolor sit amet orci pretium, quis ullamcorper erat aliquam. Curabitur vehicula massa ut massa dictum, in dictum dolor congue. Suspendisse potenti. Donec commodo quam nec libero tristique, vitae viverra turpis cursus.",
    date: "2023-07-20",
    image: "/images/blog/bali.jpg",
  },
  {
    id: 2,
    title: "A Journey Through the Majestic Himalayas",
    slug: "journey-through-himalayas",
    excerpt:
      "Experience the awe-inspiring beauty of the Himalayas. Find out what makes this mountain range a must-visit destination for every adventure seeker.",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    date: "2023-07-15",
    image: "/images/blog/himalayas.jpg",
  },
  // Add more posts as needed...
];

// Tell Next.js which dynamic paths to pre-render at build time.
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);

  // Show 404 page if post not found.
  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 mb-4">
            {format(parseISO(post.date), "PPP")}
          </p>
        </header>

        <div className="relative h-80 w-full mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="prose lg:prose-xl">
          <p>{post.excerpt}</p>
          <p>{post.content}</p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog">
            <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Back to Blog
            </button>
          </Link>
        </div>
      </article>
    </main>
  );
}
