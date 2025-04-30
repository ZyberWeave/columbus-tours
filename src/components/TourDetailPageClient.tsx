"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaWhatsapp,
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
  FaChevronDown,
  FaChevronUp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Slideshow from "@/components/Slideshow";
import { Tour, allTours } from "@/data/toursData";

// Define TourCardProps and TourCard component
interface TourCardProps {
  tour: Tour;
  priority?: boolean;
}

function TourCard({ tour, priority = false }: TourCardProps) {
  return (
    <motion.div
      className="relative group h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      {tour.featured && (
        <div className="absolute top-4 right-4 z-20 bg-[#D32F2F] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
          <FaStar className="mr-1" />
          Featured
        </div>
      )}
      <Link
        href={`/tours/${tour.slug}`}
        className="block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#D32F2F] transition-all duration-300 shadow-sm hover:shadow-xl h-full flex flex-col"
      >
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={
              tour.category && tour.folder
                ? `/images/tours/${tour.category.toLowerCase()}/${tour.folder}/thumbnail.jpg`
                : "/images/placeholder-thumbnail.jpg"
            }
            alt={`Scenic view of ${tour.title}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{tour.title}</h3>
          <div className="flex flex-wrap gap-y-2 mb-3">
            <div className="flex items-center text-gray-700 w-full">
              <FaCalendarAlt className="mr-2 text-[#D32F2F]" />
              <span className="text-sm font-medium">
                {tour.duration} {tour.duration === 1 ? "night" : "nights"} /{" "}
                {tour.duration + 1} days
              </span>
            </div>
            <div className="flex items-center text-gray-700 w-full">
              <FaMapMarkerAlt className="mr-2 text-[#D32F2F]" />
              <span className="text-sm font-medium">{tour.title}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {tour.shortDescription ||
              "Experience an unforgettable journey through breathtaking landscapes and immerse yourself in local culture with expert guides and carefully crafted itineraries."}
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] flex flex-col p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 rounded-xl overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                {tour.title} Experience
              </h3>
              <div className="h-1 w-16 bg-white rounded-full mb-3"></div>
              <div className="flex flex-wrap gap-y-2">
                <div className="flex items-center text-white/90 w-full">
                  <FaCalendarAlt className="mr-2" />
                  <span>
                    {tour.duration} {tour.duration === 1 ? "night" : "nights"}
                  </span>
                </div>
                <div className="flex items-center text-white/90 w-full">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{tour.title}</span>
                </div>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto mb-4">
              <h4 className="text-white font-semibold mb-2 text-lg">
                Description:
              </h4>
              <p className="text-white/80 text-sm mb-4">
                {tour.shortDescription ||
                  "Experience an unforgettable journey through breathtaking landscapes and immerse yourself in local culture with expert guides and carefully crafted itineraries."}
              </p>
            </div>
            <button className="w-full px-6 py-3 bg-white hover:bg-gray-100 text-[#D32F2F] font-semibold rounded-lg transition-colors shadow-lg flex items-center justify-center mt-auto">
              Discover Journey
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// TourDetailPageClient Component
interface TourDetailPageClientProps {
  tour: Tour;
}

const TourDetailPageClient: React.FC<TourDetailPageClientProps> = ({ tour }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const whatsappMessage = `Hi, I'm interested in the ${tour.title} tour. Please provide more information.`;
  const whatsappLink = `https://wa.me/919422401225?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const slideshowImages =
    tour.images && tour.images.length > 0
      ? tour.images.map(
          (filename) =>
            `/images/tours/${tour.category.toLowerCase()}/${tour.folder}/slideshow/${filename}`
        )
      : ["/images/placeholder-thumbnail.jpg"];

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

  const itinerary = [
    {
      day: 1,
      title: "Arrival & Welcome",
      description:
        "Arrive at your destination where our representative will greet you and transfer you to your hotel. Enjoy a welcome dinner featuring local cuisine.",
    },
    {
      day: 2,
      title: "City Exploration",
      description:
        "Begin your day with a guided city tour, visiting key landmarks and historical sites. Enjoy leisure time to explore the local markets or relax.",
    },
    {
      day: 3,
      title: "Cultural Immersion",
      description:
        "Experience authentic cultural activities including a traditional cooking class and visits to local artisan workshops.",
    },
  ];

  const TourSection: React.FC<{
    title: string;
    children: React.ReactNode;
    className?: string;
    icon?: React.ElementType;
  }> = ({ title, children, className = "", icon: Icon }) => (
    <section
      className={`mb-8 rounded-xl bg-white p-6 shadow-lg border border-gray-100 ${className}`}
    >
      <div className="flex items-center mb-4 pb-2 border-b border-gray-100">
        {Icon && (
          <Icon className="text-[#D32F2F] mr-3 text-2xl" aria-hidden="true" />
        )}
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );

  const ListItem: React.FC<{
    children: React.ReactNode;
    icon?: React.ElementType;
    positive?: boolean;
  }> = ({ children, icon: Icon, positive = true }) => (
    <li className="flex items-start gap-3 mb-3 text-gray-700 leading-relaxed">
      {Icon && (
        <span
          className={`mt-1 flex-shrink-0 ${
            positive ? "text-[#43A047]" : "text-[#D32F2F]"
          }`}
        >
          <Icon size={18} aria-hidden="true" />
        </span>
      )}
      <span className="flex-1">{children}</span>
    </li>
  );

  return (
    <main className="w-full bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full lg:w-[93vw] mx-auto">
        {/* Header Section */}
        <motion.header
          className="text-center mb-12 pt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {tour.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Experience an exclusive journey designed to create unforgettable
            memories.
          </p>
        </motion.header>

        {/* Slideshow Hero Section */}
        <motion.section
          className="mb-8 rounded-2xl overflow-hidden shadow-xl relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Slideshow images={slideshowImages} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
            <div className="flex items-center text-white text-sm sm:text-base">
              <FaMapMarkerAlt className="mr-2" />
              <span>{tour.title}</span>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
            Book Your Adventure
          </h2>
          <p className="text-base sm:text-lg mb-6 text-center max-w-2xl mx-auto">
            Ready to embark on a memorable journey? Our experts are here to assist
            with trip details and customization.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#43A047] text-white font-semibold rounded-lg hover:bg-[#2E7D32] transition-colors shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              WhatsApp Us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#D32F2F] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              <FaEnvelope size={16} aria-hidden="true" />
              Send an Email
            </a>
            <a
              href="tel:+919422401225"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#D32F2F] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              <FaPhoneAlt size={16} aria-hidden="true" />
              Call Now
            </a>
          </div>
        </motion.section>

        {/* Quick Tour Details Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {tourDetails.map((detail, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <detail.icon
                className="text-[#D32F2F] mx-auto mb-3 text-2xl"
                aria-hidden="true"
              />
              <h3 className="font-medium text-gray-600 mb-1 text-sm sm:text-base">
                {detail.label}
              </h3>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                {detail.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.nav
          className="flex flex-wrap gap-2 mb-12 bg-white rounded-lg shadow-md border border-gray-100 p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { id: "overview", label: "Overview", icon: FaInfoCircle },
            { id: "highlights", label: "Highlights", icon: FaStar },
            { id: "itinerary", label: "Itinerary", icon: FaCalendarAlt },
            { id: "inclusions", label: "Inclusions", icon: FaCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 flex-1 sm:flex-none text-center ${
                activeTab === tab.id
                  ? "bg-[#D32F2F] text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <tab.icon className="mr-2" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </motion.nav>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <TourSection title="Tour Overview" icon={FaInfoCircle}>
                <div className="prose max-w-none text-gray-700 text-sm sm:text-base">
                  <p className="mb-4">
                    Columbus Tours proudly presents the{" "}
                    <strong>{tour.title}</strong>. This exclusive package has been
                    carefully curated to offer you a taste of luxury, culture, and
                    adventure while protecting the uniqueness of our proprietary
                    planning.
                  </p>
                  <p>
                    Enjoy a premium travel experience with handpicked highlights,
                    expert guidance, and seamless logistics. Our carefully designed
                    itinerary ensures you experience the best of what {tour.title}{" "}
                    has to offer while enjoying the comfort and convenience of our
                    premium services.
                  </p>
                </div>
              </TourSection>
            )}

            {activeTab === "highlights" && (
              <TourSection title="Tour Highlights" icon={FaStar}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Exclusive guided visits to iconic landmarks",
                    "Immersive cultural experiences",
                    "Seamless travel arrangements",
                    "Luxurious accommodations",
                    "Curated dining experiences",
                    "Expert local guides",
                    "Small group sizes for personalized attention",
                    "Unique local interactions",
                  ].map((highlight, index) => (
                    <ListItem key={index} icon={FaCheck}>
                      {highlight}
                    </ListItem>
                  ))}
                </ul>
              </TourSection>
            )}

            {activeTab === "itinerary" && (
              <TourSection title="Tour Itinerary" icon={FaCalendarAlt}>
                <div className="space-y-4">
                  {itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                    >
                      <button
                        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                        onClick={() =>
                          setExpandedDay(expandedDay === day.day ? null : day.day)
                        }
                        aria-expanded={expandedDay === day.day}
                      >
                        <div className="flex items-center">
                          <span className="bg-[#D32F2F] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                            {day.day}
                          </span>
                          <h3 className="text-base sm:text-lg font-medium text-gray-900">
                            {day.title}
                          </h3>
                        </div>
                        {expandedDay === day.day ? (
                          <FaChevronUp className="text-gray-600" />
                        ) : (
                          <FaChevronDown className="text-gray-600" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedDay === day.day && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-white">
                              <p className="text-gray-700 text-sm sm:text-base">
                                {day.description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </TourSection>
            )}

            {activeTab === "inclusions" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <TourSection title="What's Included">
                  <ul className="space-y-3">
                    {[
                      { icon: FaPlane, text: "Round-trip economy class airfare" },
                      { icon: FaHotel, text: "Comfortable accommodation" },
                      { icon: FaBus, text: "Local transportation & transfers" },
                      {
                        icon: FaMapMarkerAlt,
                        text: "Curated sightseeing & entry fees",
                      },
                      { icon: FaUtensils, text: "Meals as specified in itinerary" },
                      {
                        icon: FaStar,
                        text: "Travel insurance & tour management",
                      },
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
                      "Visa fees and travel documentation",
                      "Any services not specifically mentioned in the inclusions",
                    ].map((text, index) => (
                      <ListItem key={index} icon={FaTimes} positive={false}>
                        {text}
                      </ListItem>
                    ))}
                  </ul>
                </TourSection>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Important Information Section */}
        <TourSection title="Important Information">
          <div className="flex items-start bg-red-50 p-4 rounded-md border border-red-200">
            <FaInfoCircle
              className="text-[#D32F2F] mt-1 mr-3 flex-shrink-0 text-xl"
              aria-hidden="true"
            />
            <div>
              <h3 className="font-medium text-[#D32F2F] mb-2">
                Proprietary Itinerary
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                To protect our proprietary travel planning, detailed
                itineraries—including day‑by‑day schedules, meeting points, and
                precise timings—are reserved for confirmed bookings only. This
                ensures our uniquely curated tours remain exclusive. For the
                complete itinerary and personalized travel details, please contact
                our sales team after booking.
              </p>
            </div>
          </div>
        </TourSection>

        {/* Book Now CTA Section */}
        <motion.section
          className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
            Book Your Adventure
          </h2>
          <p className="text-base sm:text-lg mb-6 text-center max-w-2xl mx-auto">
            Ready to embark on a memorable journey? Our experts are here to assist
            with trip details and customization.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#43A047] text-white font-semibold rounded-lg hover:bg-[#2E7D32] transition-colors shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              WhatsApp Us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#D32F2F] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              <FaEnvelope size={16} aria-hidden="true" />
              Send an Email
            </a>
            <a
              href="tel:+919422401225"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#D32F2F] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              <FaPhoneAlt size={16} aria-hidden="true" />
              Call Now
            </a>
          </div>
        </motion.section>

        {/* Related Tours Section */}
        <TourSection title="You Might Also Like" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const relatedTours = allTours
                .filter((t) => t.slug !== tour.slug)
                .slice(0, 3);
              return relatedTours.map((relatedTour, index) => (
                <TourCard
                  key={relatedTour.slug}
                  tour={relatedTour}
                  priority={index === 0}
                />
              ));
            })()}
          </div>
        </TourSection>

        {/* Contact Us Section */}
        {/* Contact Us Section */}
<section className="w-full bg-gradient-to-br from-[#0A122A] to-[#1B2738] py-16 px-4 sm:px-6 relative overflow-hidden mb-12 rounded-2xl">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10" />
    <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white/10" />
  </div>
  <div className="w-full lg:w-[93vw] mx-auto text-center relative z-10">
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="inline-flex items-center justify-center mb-6 w-full">
        <div className="h-1 w-12 bg-[#F7E7CE]/40 mr-3" />
        <span className="text-[#F7E7CE]/90 font-semibold tracking-wider text-sm uppercase">
          Contact Us
        </span>
        <div className="h-1 w-12 bg-[#F7E7CE]/40 ml-3" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F7E7CE] mb-4">
        Ready for Your Next Adventure?
      </h2>
      <p className="text-base sm:text-lg text-[#F7E7CE]/80 max-w-2xl mx-auto">
        Our travel concierges will craft an unforgettable journey for you.
      </p>
    </motion.div>
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
      viewport={{ once: true }}
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="h-full"
      >
        <a
          href="https://wa.me/919422401225"
          target="_blank"
          rel="noopener noreferrer"
          className="h-full"
        >
          <div className="bg-white/5 hover:bg-white/[.08] border border-white/10 rounded-xl p-6 sm:p-8 h-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-5 hover:bg-[#25D366]/30 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#25D366]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#F7E7CE] mb-3">
              Chat Now
            </h3>
            <p className="text-[#F7E7CE]/80 mb-5 text-sm sm:text-base">
              Instant connection with our team
            </p>
            <div className="px-6 py-2 bg-[#25D366] text-white font-medium rounded-full hover:bg-[#1DA851] transition-all duration-300">
              WhatsApp
            </div>
          </div>
        </a>
      </motion.div>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="h-full"
      >
        <a 
          href="tel:+919422401225" 
          className="h-full"
        >
          <div className="bg-white/5 hover:bg-white/[.08] border border-white/10 rounded-xl p-6 sm:p-8 h-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-5 hover:bg-white/20 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#F7E7CE]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#F7E7CE] mb-3">
              Call Us
            </h3>
            <p className="text-[#F7E7CE]/80 mb-5 text-sm sm:text-base">
              Speak directly with our experts
            </p>
            <div className="px-6 py-2 bg-[#D4AF37] text-[#0A122A] font-semibold rounded-full hover:bg-[#c39a2f] transition-all duration-300">
              +91 94224 01225
            </div>
          </div>
        </a>
      </motion.div>
    </motion.div>
  </div>
</section>
      </div>
    </main>
  );
};

export default TourDetailPageClient;