"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaStar,
  FaUtensils,
  FaHotel,
  FaBus,
  FaPlane,
  FaWhatsapp,
} from "react-icons/fa";
// Removed the unused IoIosArrowForward import.
import Slideshow from "./Slideshow";
import { allTours, Tour } from "@/data/toursData"; // Import allTours here for related tours

// Helper function to get slideshow images; change as needed.
function getImagesForTour(tour: Tour): string[] {
  return tour.images && tour.images.length > 0 ? tour.images : ["/images/placeholder.jpg"];
}

interface TourDetailClientProps {
  tour: Tour;
}

const TourDetailClient: React.FC<TourDetailClientProps> = ({ tour }) => {
  const slideshowImages = getImagesForTour(tour);

  // Quick tour details for display
  const tourDetails = [
    {
      label: "Duration",
      value: tour.duration
        ? `${tour.duration} night${tour.duration !== 1 ? "s" : ""}`
        : "Contact for details",
      icon: FaClock,
    },
    {
      label: "Destination",
      value: tour.title,
      icon: FaMapMarkerAlt,
    },
    {
      label: "Starting From",
      value: "Contact for pricing",
      icon: FaCalendarAlt,
    },
  ];

  // Prepare WhatsApp link using the tour's WhatsApp message
  const whatsappLink = `https://wa.me/9422401225?text=${encodeURIComponent(
    tour.whatsappMessage
  )}`;

  // Reusable Section component for use in various parts of the page
  const TourSection: React.FC<{
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

  // ListItem component with an optional icon, used for highlighting features
  const ListItem: React.FC<{
    children: React.ReactNode;
    icon?: React.ElementType;
    positive?: boolean;
  }> = ({ children, icon: Icon, positive = true }) => (
    <li className="flex items-start gap-3 mb-3 text-gray-700 leading-relaxed">
      {Icon && (
        <span className={`mt-0.5 flex-shrink-0 ${positive ? "text-green-500" : "text-red-500"}`}>
          <Icon size={16} aria-hidden="true" />
        </span>
      )}
      <span className="flex-1">{children}</span>
    </li>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      {/* Header / Title */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-blue-900">{tour.title}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience an exclusive journey designed to create unforgettable memories.
        </p>
      </header>

      {/* Slideshow Section */}
      <section className="mb-8 rounded-xl overflow-hidden shadow-lg relative">
        <Slideshow images={slideshowImages} />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="max-w-4xl mx-auto flex items-center text-white/90 mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <span>{tour.title}</span>
          </div>
        </div>
      </section>

      {/* Tour Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {tourDetails.map((detail, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
            <detail.icon className="text-blue-600 mx-auto mb-2" aria-hidden="true" />
            <h3 className="font-medium text-gray-500">{detail.label}</h3>
            <p className="text-lg font-semibold">{detail.value}</p>
          </div>
        ))}
      </div>

      {/* Overview Section */}
      <TourSection title="Overview" icon={FaInfoCircle}>
        <div className="prose max-w-none text-gray-700">
          <p>
            Columbus Tours proudly presents <strong>{tour.title}</strong>. This exclusive package is carefully curated to offer you a taste of luxury, culture, and adventure. Enjoy a premium travel experience with handpicked highlights, expert guidance, and seamless logistics.
          </p>
        </div>
      </TourSection>

      {/* Highlights Section */}
      <TourSection title="Highlights" icon={FaStar}>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Exclusive guided visits to iconic landmarks",
            "Immersive cultural experiences",
            "Seamless travel arrangements",
            "Luxurious accommodations",
            "Curated dining experiences",
            "Expert local guides",
          ]
            .slice(0, 8)
            .map((highlight, index) => (
              <ListItem key={index} icon={FaCheck}>
                {highlight}
              </ListItem>
            ))}
        </ul>
      </TourSection>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <TourSection title="What's Included">
          <ul className="space-y-3">
            {[
              { icon: FaPlane, text: "Round-trip economy class airfare" },
              { icon: FaHotel, text: "Comfortable accommodation" },
              { icon: FaBus, text: "Local transportation & transfers" },
              { icon: FaMapMarkerAlt, text: "Curated sightseeing & entry fees" },
              { icon: FaUtensils, text: "Meals as specified in itinerary" },
              { icon: FaStar, text: "Travel insurance & tour management" },
            ].map((item, index) => (
              <ListItem key={index} icon={item.icon}>
                {item.text}
              </ListItem>
            ))}
          </ul>
        </TourSection>

        <TourSection title="What's Not Included">
          <ul className="space-y-3">
            {[
              "Personal expenses such as additional meals, beverages, and gratuities",
              "Optional activities not mentioned in the inclusions",
              "Extra transportation if required beyond the standard itinerary",
            ].map((text, index) => (
              <ListItem key={index} icon={FaTimes} positive={false}>
                {text}
              </ListItem>
            ))}
          </ul>
        </TourSection>
      </div>

      {/* Important Information */}
      <TourSection title="Important Information">
        <div className="flex items-start bg-blue-50 p-4 rounded-md">
          <FaInfoCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" aria-hidden="true" />
          <p className="text-gray-700 leading-relaxed">
            To protect our proprietary travel planning, detailed itineraries—including day‑by‑day schedules, meeting points, and precise timings—are reserved for confirmed bookings only. For the complete itinerary and personalized travel details, please contact our sales team after booking.
          </p>
        </div>
      </TourSection>

      {/* Call-To-Action */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white text-center mb-10">
        <h2 className="text-2xl font-semibold mb-4">Ready to Experience This Tour?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Contact our travel experts today to book your spot or get more information about this exclusive tour.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
          >
            <FaWhatsapp size={20} aria-hidden="true" />
            WhatsApp Us
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-md hover:bg-gray-100 transition-colors"
          >
            Enquire Now
          </Link>
        </div>
      </section>

      {/* Related Tours Section */}
      {allTours.length > 1 && (
        <TourSection title="You Might Also Like" className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {allTours
              .filter((t) => t.slug !== tour.slug)
              .slice(0, 3)
              .map((relatedTour) => (
                <Link
                  key={relatedTour.slug}
                  href={`/tours/${relatedTour.slug}`}
                  className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300"
                  aria-label={`View details for ${relatedTour.title}`}
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedTour.images[0] || "/images/placeholder-thumbnail.jpg"}
                      alt={relatedTour.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                      {relatedTour.title}
                    </h3>
                    <p className="text-sm text-gray-500">Destination</p>
                  </div>
                </Link>
              ))}
          </div>
        </TourSection>
      )}
    </main>
  );
};

export default TourDetailClient;
