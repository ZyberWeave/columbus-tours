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
import { IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Slideshow from "@/components/Slideshow";
import { Tour, allTours } from "@/data/toursData";

interface TourDetailPageClientProps {
  tour: Tour;
}

const TourDetailPageClient: React.FC<TourDetailPageClientProps> = ({ tour }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  // Add WhatsApp message and link
  const whatsappMessage = `Hi, I'm interested in the ${tour.title} tour. Please provide more information.`;
  const whatsappLink = `https://wa.me/9422401225?text=${encodeURIComponent(whatsappMessage)}`;

  // Build the slideshow image paths based on your folder structure.
  // It assumes tour.images is an array of filenames like ["1.jpg", "2.jpg", ...].
  const slideshowImages =
    tour.images && tour.images.length > 0
      ? tour.images.map((filename) =>
          `/images/tours/${tour.category.toLowerCase()}/${tour.folder}/slideshow/${filename}`
        )
      : ["/images/placeholder-thumbnail.jpg"];

  // Quick tour details for the card section.
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

  // Reusable Section Component
  const TourSection: React.FC<{
    title: string;
    children: React.ReactNode;
    className?: string;
    icon?: React.ElementType;
  }> = ({ title, children, className = "", icon: Icon }) => (
    <section
      className={`mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-100 ${className}`}
    >
      <div className="flex items-center mb-4 pb-2 border-b border-gray-100">
        {Icon && (
          <Icon className="text-[#D32F2F] mr-3 text-xl" aria-hidden="true" />
        )}
        <h2 className="text-2xl font-bold text-[#333333]">{title}</h2>
      </div>
      {children}
    </section>
  );

  // ListItem component with icon for highlights or itinerary details.
  const ListItem: React.FC<{
    children: React.ReactNode;
    icon?: React.ElementType;
    positive?: boolean;
  }> = ({ children, icon: Icon, positive = true }) => (
    <li className="flex items-start gap-3 mb-3 text-[#333333] leading-relaxed">
      {Icon && (
        <span
          className={`mt-0.5 flex-shrink-0 ${
            positive ? "text-[#43A047]" : "text-[#D32F2F]"
          }`}
        >
          <Icon size={16} aria-hidden="true" />
        </span>
      )}
      <span className="flex-1">{children}</span>
    </li>
  );

  // Sample itinerary data. Replace this with your actual itinerary if available.
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

  return (
    <>
      <Head>
        <title>{tour.title} | Columbus Tours</title>
        <meta
          name="description"
          content={`Experience ${tour.title} with Columbus Tours. ${
            tour.description ||
            "Premium travel package with expert guides and luxury accommodations."
          }`}
        />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#F7F7F7] min-h-screen">
        {/* Header / Title Section */}
        <motion.header
          className="text-center mb-8 pt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#333333]">
            {tour.title}
          </h1>
          <p className="text-lg text-[#555555] max-w-3xl mx-auto">
            Experience an exclusive journey designed to create unforgettable memories.
          </p>
        </motion.header>

        {/* Slideshow Hero Section */}
        <motion.section
          className="mb-8 rounded-xl overflow-hidden shadow-lg relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Slideshow images={slideshowImages} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center text-white/90 mb-2">
                <FaMapMarkerAlt className="mr-2" />
                <span>{tour.title}</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tour Details Card */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {tourDetails.map((detail, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-300"
            >
              <detail.icon
                className="text-[#D32F2F] mx-auto mb-3 text-2xl"
                aria-hidden="true"
              />
              <h3 className="font-medium text-[#555555] mb-1">{detail.label}</h3>
              <p className="text-lg font-semibold text-[#333333]">
                {detail.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex overflow-x-auto mb-6 bg-white rounded-lg shadow-sm"
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
              className={`flex items-center px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[#D32F2F] text-[#D32F2F]"
                  : "border-transparent text-[#555555] hover:text-[#333333] hover:border-[#999999]"
              }`}
            >
              <tab.icon className="mr-2" />
              {tab.label}
            </button>
          ))}
        </motion.div>

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
                <div className="prose max-w-none text-[#333333]">
                  <p className="text-lg mb-4">
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
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="border border-[#E0E0E0] rounded-lg overflow-hidden"
                    >
                      <button
                        className="w-full flex justify-between items-center p-4 bg-[#F7F7F7] hover:bg-[#EEEEEE] transition-colors"
                        onClick={() =>
                          setExpandedDay(expandedDay === day.day ? null : day.day)
                        }
                      >
                        <div className="flex items-center">
                          <span className="bg-[#D32F2F] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                            {day.day}
                          </span>
                          <h3 className="text-lg font-medium text-[#333333]">
                            {day.title}
                          </h3>
                        </div>
                        {expandedDay === day.day ? (
                          <FaChevronUp className="text-[#555555]" />
                        ) : (
                          <FaChevronDown className="text-[#555555]" />
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
                              <p className="text-[#333333]">{day.description}</p>
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
          <div className="flex items-start bg-[#FFEBEE] p-4 rounded-md border border-[#EF9A9A]">
            <FaInfoCircle
              className="text-[#D32F2F] mt-1 mr-3 flex-shrink-0 text-xl"
              aria-hidden="true"
            />
            <div>
              <h3 className="font-medium text-[#D32F2F] mb-2">
                Proprietary Itinerary
              </h3>
              <p className="text-[#333333] leading-relaxed">
                To protect our proprietary travel planning, detailed
                itineraries—including day‑by‑day schedules, meeting points, and
                precise timings—are reserved for confirmed bookings only. This
                ensures our uniquely curated tours remain exclusive. For the
                complete itinerary and personalized travel details, please
                contact our sales team after booking.
              </p>
            </div>
          </div>
        </TourSection>

        {/* Contact / CTA Section */}
        <motion.section
          className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] rounded-xl shadow-xl p-8 text-white mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Book Your Next Adventure Now</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Ready to embark on a memorable journey? Our experts are here to assist with trip details, customization, and more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#43A047] text-white font-semibold rounded-lg hover:bg-[#2E7D32] transition-colors shadow-md hover:shadow-lg"
              >
                <FaWhatsapp size={20} aria-hidden="true" />
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#D32F2F] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
              >
                <FaEnvelope size={18} aria-hidden="true" />
                Send an Email
              </Link>
              <a
                href="tel:+919422401225"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#D32F2F] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
              >
                <FaPhoneAlt size={18} aria-hidden="true" />
                Call Now
              </a>
            </div>
          </div>
        </motion.section>

        {/* Related Tours Section */}
        <TourSection title="You Might Also Like" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              // Filter three tours excluding the current one
              const relatedTours = allTours.filter((t) => t.slug !== tour.slug).slice(0, 3);
              return relatedTours.map((relatedTour) => (
                <motion.div key={relatedTour.slug} whileHover={{ y: -5 }}>
                  <Link
                    href={`/tours/${relatedTour.slug}`}
                    className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E0E0E0] hover:border-[#D32F2F]"
                    aria-label={`View details for ${relatedTour.title}`}
                  >
                    <div className="relative h-48">
                      <Image
                        src={
                          relatedTour.images && relatedTour.images[0]
                            ? `/images/tours/${relatedTour.category.toLowerCase()}/${relatedTour.folder}/slideshow/${relatedTour.images[0]}`
                            : "/images/placeholder-thumbnail.jpg"
                        }
                        alt={relatedTour.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[#333333] group-hover:text-[#D32F2F] transition-colors mb-1">
                        {relatedTour.title}
                      </h3>
                      <p className="text-sm text-[#555555]">
                        {relatedTour.duration} days
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ));
            })()}
          </div>
        </TourSection>
      </main>
    </>
  );
};

export default TourDetailPageClient;
