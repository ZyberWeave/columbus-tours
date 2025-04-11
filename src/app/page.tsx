"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

// ------------------------
// AutoSlider Component & Data
// ------------------------
type AutoSliderProps = {
  images: string[];
  interval?: number;
  className?: string;
};

const IMAGES: { [key: string]: string[] } = {
  international: [
    "/images/international1.jpg",
    "/images/international2.jpg",
    "/images/international3.jpg",
  ],
  domestic: [
    "/images/domestic1.jpg",
    "/images/domestic2.jpg",
    "/images/domestic3.jpg",
  ],
  religious: [
    "/images/religious1.jpg",
    "/images/religious2.jpg",
    "/images/religious3.jpg",
  ],
  honeymoon: [
    "/images/honeymoon1.jpg",
    "/images/honeymoon2.jpg",
    "/images/honeymoon3.jpg",
  ],
  cruise: [
    "/images/cruise1.jpg",
    "/images/cruise2.jpg",
    "/images/cruise3.jpg",
  ],
};

const AutoSlider: React.FC<AutoSliderProps> = ({
  images,
  interval = 4000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % images.length;
        setPrevIndex(prev);
        setTimeout(() => setPrevIndex(null), 500); // fade-out duration
        return nextIndex;
      });
    }, interval);
    return () => clearInterval(id);
  }, [images, interval, isHovered]);

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {prevIndex !== null && (
        <Image
          src={images[prevIndex]}
          alt={`Slide ${prevIndex + 1}`}
          fill
          className={`absolute inset-0 transition-opacity duration-500 opacity-0 object-cover ${className}`}
          loading="lazy"
        />
      )}
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        fill
        className={`absolute inset-0 transition-opacity duration-500 opacity-100 object-cover ${className}`}
        loading="lazy"
      />
    </div>
  );
};

// ------------------------
// Featured Trips Data (using tour data)
// ------------------------
const FEATURED_TRIPS = [
  {
    title: "Dubai",
    slug: "dubai-diwali-festival-tour",
    image: "/images/tours/international/dubai/thumbnail.jpg",
    duration: "5 Days / 4 Nights",
    price: "₹45,999",
  },
  {
    title: "Thailand",
    slug: "phuket-krabi-island-adventure-tour",
    image: "/images/tours/international/phuket-krabi/thumbnail.jpg",
    duration: "6 Days / 5 Nights",
    price: "₹39,999",
  },
  {
    title: "Bali",
    slug: "bali-indonesia-exotic-retreat-tour",
    image: "/images/tours/international/bali/thumbnail.jpg",
    duration: "7 Days / 6 Nights",
    price: "₹52,999",
  },
  {
    title: "Sri Lanka",
    slug: "sri-lanka-scenic-cultural-tour",
    image: "/images/tours/international/srilanka/thumbnail.jpg",
    duration: "5 Days / 4 Nights",
    price: "₹34,999",
  },
  {
    title: "Singapore & Malaysia",
    slug: "singapore-malaysia-urban-cultural-tour",
    image: "/images/tours/international/singapore-malaysia/thumbnail.jpg",
    duration: "8 Days / 7 Nights",
    price: "₹68,999",
  },
];

// ------------------------
// Testimonial Data
// ------------------------
const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Mumbai",
    text: "Our Dubai trip with Columbus Tours was absolutely flawless. Every detail was perfectly arranged, and the Diwali celebrations were magical!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Ahmedabad",
    text: "The Bali honeymoon package exceeded all our expectations. The private villa with ocean view was breathtaking!",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Singh",
    location: "Delhi",
    text: "Excellent service from start to finish. The Thailand island hopping tour was the perfect mix of adventure and relaxation.",
    rating: 4,
  },
];

// ------------------------
// HomePage Component
// ------------------------
export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Columbus Tours | Discover Your Perfect Vacation</title>
        <meta 
          name="description" 
          content="Experience unforgettable journeys with Columbus Tours. We offer international, domestic, religious, honeymoon, and cruise packages tailored to your dreams." 
        />
        <link rel="preload" href="/videos/hero-video.mp4" as="video" />
      </Head>

      <main className="flex flex-col w-full antialiased">
        {/* HERO SECTION */}
        <section className="relative h-screen w-full overflow-hidden">
          <AnimatePresence>
            {!isVideoLoaded && (
              <motion.div
                className="absolute inset-0 bg-gray-900 z-10 flex items-center justify-center"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/logo.png"
                  alt="Columbus Tours Logo"
                  width={300}
                  height={100}
                  className="w-full max-w-xs animate-pulse"
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Dark Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-0" />
          
          <motion.div 
            className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Columbus Tours Logo"
              width={300}
              height={100}
              className="w-full max-w-xs mb-8 drop-shadow-xl"
              priority
            />
            <motion.p 
              className="text-2xl md:text-3xl font-light mb-12 drop-shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Discover amazing experiences with us.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/tours">
                <button
                  className="px-8 py-4 text-lg font-bold text-white bg-[#D32F2F] border-4 border-[#D32F2F] rounded-full hover:bg-[#B71C1C] hover:border-[#B71C1C] hover:scale-105 transition-all duration-300"
                  aria-label="Explore Tours"
                >
                  Explore Tours
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* TOUR CATEGORIES SECTION */}
        <section className="w-full bg-[#F7F7F7] py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#333333] mb-4">
                Discover Your Next Adventure
              </h2>
              <p className="text-xl md:text-2xl text-[#333333] mb-8 max-w-2xl mx-auto">
                Explore a wide range of tour packages tailored just for you.
              </p>
              <Link href="/tours">
                <button className="px-8 md:px-10 py-3 md:py-4 bg-[#1976D2] text-white text-lg md:text-xl rounded-full hover:bg-[#1565C0] transition-all transform hover:scale-105 duration-300">
                  View All Tours
                </button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {Object.entries(IMAGES).map(([category, images]) => (
                <motion.div
                  key={category}
                  className="relative group h-72 md:h-80 lg:h-96 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -10 }}
                >
                  <AutoSlider
                    images={images}
                    interval={4000}
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end items-center p-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase">
                      {category}
                    </h3>
                    <p className="text-white text-center text-xs md:text-sm mb-4">
                      {category === "international" &&
                        "Explore tours across continents and immerse yourself in new cultures."}
                      {category === "domestic" &&
                        "Discover the beauty of local destinations and hidden gems."}
                      {category === "religious" &&
                        "Experience spiritually enriching journeys."}
                      {category === "honeymoon" &&
                        "Indulge in romantic escapes and unforgettable experiences."}
                      {category === "cruise" &&
                        "Sail away on luxurious cruises to exotic destinations."}
                    </p>
                    <Link href={`/tours?category=${category}`}>
                      <button className="px-4 md:px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition duration-300">
                        View {category.charAt(0).toUpperCase() + category.slice(1)} Tours
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FEATURED TOURS SECTION */}
        <section className="w-full bg-white py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#333333] mb-4">Featured Tours</h2>
              <p className="text-xl md:text-2xl text-[#333333] mb-8 max-w-2xl mx-auto">
                Handpicked tours for every adventurous traveler.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {FEATURED_TRIPS.map((tour) => (
                <motion.div
                  key={tour.slug}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-64">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {tour.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                        {tour.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{tour.duration}</p>
                      <button className="w-full mt-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="w-full bg-[#F7F7F7] py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#333333] mb-4">
                What Our Travelers Say
              </h2>
              <p className="text-xl md:text-2xl text-[#333333] max-w-2xl mx-auto">
                Hear from our happy customers about their experiences.
              </p>
            </motion.div>
            
            <div className="relative h-64 md:h-80 lg:h-96">
              <AnimatePresence mode="wait">
                {TESTIMONIALS.map((testimonial, index) => (
                  index === activeTestimonial && (
                    <motion.div
                      key={testimonial.id}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="max-w-3xl bg-white p-8 md:p-10 rounded-xl shadow-lg">
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-6 h-6 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-lg md:text-xl text-gray-700 mb-6">
                          "{testimonial.text}"
                        </p>
                        <div>
                          <p className="font-bold text-gray-800">{testimonial.name}</p>
                          <p className="text-gray-600">{testimonial.location}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'}`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section className="w-full bg-[#1976D2] py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Why Choose Columbus Tours?
              </h2>
              <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto">
                We deliver unforgettable experiences with premium service.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/icons/experience.svg"
                    alt="Expert Guidance"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Expert Guidance</h3>
                <p className="text-gray-600 mb-6">
                  Our seasoned team curates every tour with passion and expertise.
                </p>
                <Link href="/about">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/icons/adventure.svg"
                    alt="Unforgettable Adventure"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Unforgettable Adventure</h3>
                <p className="text-gray-600 mb-6">
                  Every tour promises memories that last a lifetime.
                </p>
                <Link href="/tours">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                    Explore Now
                  </button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/icons/support.svg"
                    alt="24/7 Support"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">24/7 Support</h3>
                <p className="text-gray-600 mb-6">
                  Our dedicated team is here to assist you every step of the way.
                </p>
                <Link href="/contact">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                    Contact Support
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* GET IN TOUCH SECTION */}
        <section className="w-full bg-gradient-to-r from-[#1976D2] to-[#D32F2F] py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Get In Touch</h2>
              <p className="text-xl md:text-2xl text-white mb-10 max-w-2xl mx-auto">
                Have questions or need more information? Our team is ready to help.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/contact">
                  <button className="px-8 md:px-10 py-3 md:py-4 bg-white text-[#1976D2] text-lg md:text-xl rounded-full hover:bg-gray-100 transition-all duration-300">
                    Contact Us
                  </button>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }}>
                <a
                  href="https://wa.me/919422401225"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 md:px-10 py-3 md:py-4 bg-[#43A047] text-white text-lg md:text-xl rounded-full hover:bg-[#388E3C] transition-all duration-300 inline-block"
                >
                  WhatsApp
                </a>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }}>
                <a
                  href="tel:+919422401225"
                  className="px-8 md:px-10 py-3 md:py-4 bg-white text-[#1976D2] text-lg md:text-xl rounded-full hover:bg-gray-100 transition-all duration-300 inline-block"
                >
                  Call Us
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}