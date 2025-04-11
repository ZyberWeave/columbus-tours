// app/tours/[slug]/page.tsx
import { allTours, Tour } from "@/data/toursData";
import TourDetailPageClient from "@/components/TourDetailPageClient"; // our client component
import { getTourImages } from '@/utils/getImages';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = params;
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
