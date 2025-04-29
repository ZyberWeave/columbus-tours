// app/tours/[slug]/page.tsx
import { allTours } from "@/data/toursData";
import TourDetailPageClient from "@/components/TourDetailPageClient"; // our client component
import { getTourImages } from '@/utils/getImages';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = allTours.find((t) => t.slug === slug);

  if (!tour) {
    notFound();
  }

  // Populate the images array
  tour.images = getTourImages(tour.category, tour.folder);

  return <TourDetailPageClient tour={tour} />;
}

// Generate static params for all tours
export async function generateStaticParams() {
  return allTours.map((tour) => ({
    slug: tour.slug,
  }));
}
