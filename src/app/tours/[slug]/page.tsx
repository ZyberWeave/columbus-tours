// src/app/tours/[slug]/page.tsx
import { allTours } from "@/data/toursData";
import TourDetailClient from "@/components/TourDetailClient";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

// Generates static parameters for each tour (required for Next.js static generation)
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return allTours.map((tour) => ({ slug: tour.slug }));
}

export default async function TourDetailPage({ params }: PageProps) {
  // If Next.js requires, await params to be safe
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  const tour = allTours.find((t) => t.slug === slug);

  if (!tour) {
    return (
      <main className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-6">
            The tour you&apos;re looking for doesn&apos;t exist. Please check back later or browse our available tours.
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Explore Tours
          </Link>
        </div>
      </main>
    );
  }

  return <TourDetailClient tour={tour} />;
}
