import React from "react";
import Image from "next/image";
import Link from "next/link";
import { allTours } from "@/data/toursData";
import { FaWhatsapp } from "react-icons/fa";

// Generate static parameters for each tour slug
export async function generateStaticParams() {
  return allTours.map((tour) => ({
    slug: tour.slug,
  }));
}

// Page receives the dynamic params from Next.js
export default function TourDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const tour = allTours.find((t) => t.slug === slug);

  if (!tour) {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-center">Tour Not Found</h1>
        <p className="text-center mt-4">
          The tour you are looking for does not exist. Please check back later or browse our available tours.
        </p>
        <div className="text-center mt-6">
          <Link href="/tours" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Back to Tours
          </Link>
        </div>
      </main>
    );
  }

  // Prepare WhatsApp contact link with a custom message
  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in the ${tour.title}. Please send me more details.`
  );
  const whatsappLink = `https://wa.me/9422401225?text=${whatsappMessage}`;

  return (
    <main className="max-w-4xl mx-auto p-8">
      {/* Header / Title */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
        <p className="text-lg text-gray-700">
          Experience an exclusive journey designed to create unforgettable memories.
        </p>
      </header>

      {/* Hero Image */}
      <section className="mb-8">
        <Image
          src={tour.image}
          alt={tour.title}
          width={800}
          height={400}
          className="rounded-lg object-cover"
        />
      </section>

      {/* Tour Overview */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tour Overview</h2>
        <p className="text-gray-700 leading-relaxed">
          Columbus Tours proudly presents the {tour.title}. This exclusive package has been carefully curated to offer you a taste of luxury, culture, and adventure while protecting the uniqueness of our proprietary planning. Enjoy a premium travel experience with handpicked highlights, expert guidance, and seamless logistics.
        </p>
      </section>

      {/* Tour Highlights */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Highlights</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>Exclusive guided visits to iconic landmarks and cultural sites</li>
          <li>Immersive experiences that capture the essence of the destination</li>
          <li>Seamless travel arrangements with premium service</li>
          <li>Luxurious accommodations and curated dining selections</li>
          <li>A tailored itinerary designed for a memorable journey</li>
        </ul>
      </section>

      {/* Inclusions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What’s Included</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>Round-trip economy class airfare (final details provided upon booking)</li>
          <li>Comfortable accommodation for the duration of the tour</li>
          <li>Local transportation and transfers</li>
          <li>Curated sightseeing and select entry fees</li>
          <li>Meals as specified in the tour package</li>
          <li>Travel insurance and dedicated tour management services</li>
        </ul>
      </section>

      {/* Exclusions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What’s Not Included</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>Personal expenses such as additional meals, beverages, and gratuities</li>
          <li>Optional activities and any service not explicitly mentioned in the inclusions</li>
          <li>Extra transportation if required beyond the standard itinerary</li>
        </ul>
      </section>

      {/* Important Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Important Information</h2>
        <p className="text-gray-700 leading-relaxed">
          To protect our proprietary travel planning, detailed itineraries—including day‑by‑day schedules, meeting points, and precise timings—are reserved for confirmed bookings only. This ensures that our uniquely curated tours remain exclusive. For the complete itinerary and personalized travel details, please contact our sales team after booking.
        </p>
      </section>

      {/* WhatsApp Contact Section */}
      <section className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Have Questions?</h2>
        <p className="text-gray-700 mb-4">
          For more information about this tour, please reach out via WhatsApp.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
        >
          <FaWhatsapp size={24} />
          Contact via WhatsApp
        </a>
      </section>

      {/* Final Call to Action */}
      <section className="text-center">
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Enquire Now
        </Link>
      </section>
    </main>
  );
}
