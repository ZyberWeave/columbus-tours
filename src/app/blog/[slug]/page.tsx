import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import React from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt
} from "react-icons/fa";
import { blogPosts } from "@/data/blogPosts";

// Generate static parameters so that Next.js pre-renders all blog pages.
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Compute related posts: pick up to 3 posts different from this one.
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  // Define a reusable Section component for layout consistency.
  const Section: React.FC<{
    title: string;
    children: React.ReactNode;
    className?: string;
    icon?: React.ElementType;
  }> = ({ title, children, className = "", icon: Icon }) => (
    <section className={`mb-8 rounded-xl bg-white p-6 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center mb-4 pb-2 border-b border-gray-100">
        {Icon && <Icon className="text-blue-600 mr-3 text-xl" aria-hidden="true" />}
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </section>
  );

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header / Hero Section */}
      <header className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
              <FaArrowLeft className="mr-2" /> Back to Blog
            </Link>
            <div>
              <span className="inline-block bg-blue-700 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center text-blue-200 gap-4">
                <div className="flex items-center">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="text-white font-medium">{post.author.name}</p>
                    <p className="text-sm">{post.author.role}</p>
                  </div>
                </div>
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-2" /> {format(parseISO(post.date), "MMMM d, yyyy")}
                </span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <div className="mt-4 text-blue-200">
                <p className="text-sm">Office Location: 1, Laxmi Heights, 63 Mangalwar Peth, Opp. Jyotiba Temple, Karad - 415 110 (MS) INDIA</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="relative h-96 w-full mb-12 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Post Body */}
          <div
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* SEO-enriched CTA Section */}
          <Section title="Plan Your Next Adventure" icon={FaMapMarkerAlt}>
            <p>
              Our exclusive tour packages are available only through Columbus Tours. Explore carefully curated journeys that highlight the best of Karad, Satara, Maharashtra, and beyond. Contact us for personalized information and discover the magic that awaits in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                href={`/tours?search=${encodeURIComponent(post.title)}`}
                className="inline-block bg-white text-blue-800 font-bold px-6 py-3 rounded-lg text-center hover:bg-gray-100 transition-colors"
              >
                View Tour Packages
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-lg text-center hover:bg-white/10 transition-colors"
              >
                Enquire Now
              </Link>
            </div>
          </Section>
        </div>
      </article>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <Section title="More Travel Inspiration" className="mt-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
                aria-label={`View details for ${relatedPost.title}`}
              >
                <div className="relative h-48">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-2">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{relatedPost.excerpt}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Read more <FaArrowRight className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Newsletter CTA (Optional) */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Get More Travel Tips</h2>
          <p className="text-xl mb-6">
            Subscribe to our newsletter for exclusive destination guides and travel deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer with SEO links and office address */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">
            © {new Date().getFullYear()} Columbus Tours. All rights reserved.
          </p>
          <p className="text-sm">
            Office: 1, Laxmi Heights, 63 Mangalwar Peth, Opp. Jyotiba Temple, Karad - 415 110 (MS) INDIA
          </p>
          <p className="text-sm">
            Designed & Developed by{" "}
            <a href="https://zyberweave.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              ZyberWeave
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
