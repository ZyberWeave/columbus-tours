"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import {
  FiSearch,
  FiStar,
  FiShield,
  FiHeadphones,
  FiArrowRight,
  FiMapPin,
  FiHeart,
  FiCheckCircle,
} from "react-icons/fi";
import { FaHotel, FaPlane } from "react-icons/fa";

// Simplified service data with clearer benefits
const services = [
  {
    id: 1,
    title: "Tailored Itineraries",
    description: "We design trips that match your unique travel style and interests perfectly.",
    benefits: [
      "Personalized daily schedules",
      "Activities based on your preferences", 
      "Flexible pacing options",
    ],
    icon: <FiMapPin className="text-red-600" size={24} />,
    category: "planning",
  },
  {
    id: 2,
    title: "Luxury Stays",
    description: "Access our curated collection of the world&apos;s finest accommodations.",
    benefits: [
      "5-star hotels & private villas",
      "Exclusive member rates",
      "VIP amenities included",
    ],
    icon: <FaHotel className="text-red-600" size={24} />,
    category: "accommodation",
  },
  {
    id: 3,
    title: "Unique Experiences",
    description: "Go beyond tourism with authentic local encounters you&apos;ll remember forever.",
    benefits: [
      "Private cultural immersions",
      "Meet local artisans & experts",
      "Off-the-beaten-path adventures",
    ],
    icon: <FiHeart className="text-red-600" size={24} />,
    category: "experiences",
  },
  {
    id: 4,
    title: "Seamless Transport",
    description: "From private jets to luxury trains, we handle all your mobility needs.",
    benefits: [
      "Airport transfers included",
      "Private drivers available",
      "Flight booking service",
    ],
    icon: <FaPlane className="text-red-600" size={24} />,
    category: "transport",
  },
  {
    id: 5,
    title: "24/7 Support",
    description: "Our team is always available to assist you during your travels.",
    benefits: [
      "Dedicated concierge",
      "Emergency assistance",
      "Real-time itinerary updates",
    ],
    icon: <FiHeadphones className="text-red-600" size={24} />,
    category: "support",
  },
  {
    id: 6,
    title: "Travel Protection",
    description: "Comprehensive coverage for unexpected situations during your trip.",
    benefits: [
      "Cancellation protection",
      "Medical coverage",
      "Lost luggage assistance",
    ],
    icon: <FiShield className="text-red-600" size={24} />,
    category: "protection",
  },
];

// Testimonials with real client photos
const testimonials = [
  {
    id: 1,
    name: "Sarah & James",
    location: "Sydney, Australia",
    text: "Our honeymoon was absolutely perfect thanks to Columbus Tours. Every detail was taken care of, from private beach dinners to surprise upgrades at our resort.",
    rating: 5,
    image: "/couple-honeymoon.jpg",
  },
  {
    id: 2,
    name: "The Chen Family",
    location: "Toronto, Canada",
    text: "Traveling with three kids can be stressful, but Columbus made it effortless. Their kid-friendly guides and activities kept everyone happy throughout our European tour.",
    rating: 5,
    image: "/family-travel.jpg",
  },
  {
    id: 3,
    name: "Michael R.",
    location: "London, UK",
    text: "As a frequent business traveler, I appreciate the efficiency and attention to detail. My corporate trips are now completely hassle-free.",
    rating: 4,
    image: "/business-traveler.jpg",
  },
];

// Aligned booking steps with JSX
const bookingSteps = [
  {
    step: 1,
    title: "Pick Your Dream Destination",
    description:
      "Browse our website, find the place that excites you most, and reach out to us directly—your adventure starts with a click!",
    icon: <FiMapPin className="text-red-600" size={24} />,
  },
  {
    step: 2,
    title: "Get Personalized Options",
    description:
      "Receive custom trip ideas and expert consultations tailored just for you. We make planning easy and exciting!",
    icon: <FiCheckCircle className="text-red-600" size={24} />,
  },
  {
    step: 3,
    title: "Refine & Book",
    description:
      "Fine-tune your itinerary with our team, then lock in your booking. Your perfect trip is just a few tweaks away!",
    icon: <FiStar className="text-red-600" size={24} />,
  },
  {
    step: 4,
    title: "Travel & Enjoy!",
    description:
      "Set off on your adventure and let the fun begin—our team is here for you every step of the way!",
    icon: <FiHeadphones className="text-red-600" size={24} />,
  },
];

// Define a type for service
type Service = {
  id: number
  title: string
  description: string
  benefits: string[]
  icon: React.ReactNode
  category: string
};

// Update ServiceCard props
const ServiceCard = ({ service }: { service: Service }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-red-200 transition-all"
      whileHover={{ y: -5 }}
    >
      <div className="p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-red-50">{service.icon}</div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{service.description}</p>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 p-4 rounded-lg"
                >
                  <ul className="text-gray-700 space-y-2">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FiCheckCircle className="text-red-500 mt-0.5 flex-shrink-0" size={14} />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className={`mt-3 text-sm font-medium flex items-center gap-1 ${
                expanded ? "text-red-600" : "text-red-500 hover:text-red-700"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              {expanded ? "Show Less" : "Learn More"}
              <FiArrowRight size={14} className={expanded ? "transform rotate-90" : ""} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

type Testimonial = {
  id: number
  name: string
  location: string
  text: string
  rating: number
  image: string
};

// Update TestimonialCard props
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
          <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm">{testimonial.location}</p>
        </div>
      </div>
      <div className="flex text-amber-400 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FiStar key={i} className="fill-current" size={16} />
        ))}
      </div>
      <p className="text-gray-700 text-sm">&quot;{testimonial.text}&quot;</p>
    </motion.div>
  );
};

type Step = {
  step: number
  title: string
  description: string
  icon: React.ReactNode
};

export default function TravelServices() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || service.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <>
      <Head>
        <title>Travel Services | Columbus Tours</title>
        <meta
          name="description"
          content="Explore our luxury travel services with Columbus Tours, including tailored itineraries, luxury stays, unique experiences, seamless transport, 24/7 support, and travel protection."
        />
      </Head>

      <div className="min-h-screen bg-gray-50" ref={mainRef}>
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
            <div className="absolute inset-0 bg-black/40" />
            <Image
              src="/travel-hero.jpg"
              alt="Luxury travel experience"
              fill
              className="object-cover w-full h-full"
              priority
            />
          </motion.div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your Journey, <span className="text-red-300">Perfected</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                We handle every detail so you can focus on making memories. Where will your next adventure take you?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md shadow-md transition-colors">
                  Explore Our Services
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md shadow-md transition-colors">
                  View Popular Trips
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                How We <span className="text-red-600">Elevate</span> Your Travel
              </motion.h2>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Our comprehensive services ensure every aspect of your journey is exceptional
              </motion.p>
            </div>

            {/* Services Grid */}
            {filteredServices.length > 0 ? (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12 bg-gray-50 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FiSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <button
                  className="px-5 py-2 bg-red-600 text-white rounded-md font-medium"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("all");
                  }}
                >
                  Reset Search
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Simple <span className="text-red-600">Booking</span> Process
              </motion.h2>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                From dream to departure in just a few easy steps
              </motion.p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {bookingSteps.map((step: Step) => (
                <motion.div
                  key={step.step}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: step.step * 0.1 }}
                >
                  <div className="mb-4">
                    <div className="relative inline-block">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        {step.icon}
                      </div>
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        STEP {step.step}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 bg-red-50 rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to start planning?</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                Our travel specialists are standing by to help you create your perfect itinerary
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md shadow-md transition-colors">
                Get a Free Consultation
              </button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Traveler <span className="text-red-600">Stories</span>
              </motion.h2>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Don&apos;t just take our word for it - hear from our satisfied clients
              </motion.p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="w-full bg-gradient-to-br from-[#0A122A] to-[#1B2738] py-24 px-4 relative overflow-hidden mt-20 mb-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-44 h-44 rounded-full bg-white/10" />
            <div className="absolute bottom-10 right-24 w-64 h-64 rounded-full bg-white/10" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="inline-flex items-center justify-center mb-6 w-full">
                <div className="h-1 w-12 bg-[#F7E7CE]/40 mr-3" />
                <span className="text-[#F7E7CE]/90 font-semibold tracking-wider text-sm uppercase">
                  Contact Us
                </span>
                <div className="h-1 w-12 bg-[#F7E7CE]/40 ml-3" />
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-[#F7E7CE] mb-4">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-lg md:text-xl text-[#F7E7CE]/80 max-w-2xl mx-auto">
                Our travel concierges will craft an unforgettable journey for you.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="https://wa.me/919422401225" target="_blank" rel="noopener noreferrer">
                  <div className="bg-white/5 hover:bg-white/[.08] border border-white/10 rounded-xl p-8 h-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group">
                    <div className="w-14 h-14 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-5 group-hover:bg-[#25D366]/30 transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#25D366]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#F7E7CE] mb-3">Chat Now</h3>
                    <p className="text-[#F7E7CE]/80 mb-5 text-sm">Instant connection with our team</p>
                    <div className="px-6 py-2 bg-[#25D366] text-white font-medium rounded-full group-hover:bg-[#1DA851] transition-all duration-300 flex items-center justify-center">
                      WhatsApp
                    </div>
                  </div>
                </a>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="tel:+919422401225">
                  <div className="bg-white/5 hover:bg-white/[.08] border border-white/10 rounded-xl p-8 h-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group">
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-white/20 transition-colors duration-300">
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
                    <h3 className="text-xl font-bold text-[#F7E7CE] mb-3">Call Us</h3>
                    <p className="text-[#F7E7CE]/80 mb-5 text-sm">Speak directly with our experts</p>
                    <div className="px-6 py-2 bg-[#D4AF37] text-[#0A122A] font-semibold rounded-full group-hover:bg-[#c39a2f] transition-all duration-300">
                      +91 94224 01225
                    </div>
                  </div>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-16 pt-8 border-t border-[#F7E7CE]/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#F7E7CE]/90">
                {/* Add address / email etc. here if needed */}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}