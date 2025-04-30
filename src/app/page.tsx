"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { FaCompass, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaMedal, FaGlobeAmericas } from "react-icons/fa";
import {  FiVolume2, FiVolumeX, FiPlay } from "react-icons/fi";
import useEmblaCarousel from 'embla-carousel-react';

// ------------------------
// Data Definitions
// ------------------------
const TESTIMONIALS = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  name: `Traveler ${i + 1}`,
  location: ["Paris", "Tokyo", "New York", "Dubai", "Rome"][i % 5],
  videoUrl: `/testimonials/video-${i + 1}.mp4`,
  thumbnail: `/testimonials/thumb-${i + 1}.png`,
}));

const IMAGES = {
  international: ["/images/international1.jpg"],
  domestic: ["/images/domestic1.jpg"],
  religious: ["/images/religious1.jpg"],
  honeymoon: ["/images/honeymoon1.jpg"],
  cruise: ["/images/cruise1.jpg"],
};

const FEATURED_TRIPS = [
  {
    title: "Dubai",
    slug: "dubai-diwali-festival-tour",
    image: "/images/tours/international/dubai/thumbnail.jpg",
    duration: "5 Days / 4 Nights",
    price: "₹45,999",
    destination: "United Arab Emirates, Middle East",
    featured: true,
    description: "Experience the glamour of Dubai with its futuristic skyline, luxurious shopping, and desert adventures. Visit iconic landmarks like Burj Khalifa and enjoy special Diwali celebrations across the city.",
    highlights: [
      "Visit the iconic Burj Khalifa",
      "Desert safari with BBQ dinner",
      "Diwali special light shows",
      "Dubai Mall & Gold Souk shopping",
    ],
  },
  {
    title: "Thailand",
    slug: "phuket-krabi-island-adventure-tour",
    image: "/images/tours/international/phuket-krabi/thumbnail.jpg",
    duration: "6 Days / 5 Nights",
    price: "₹39,999",
    destination: "Southeast Asia",
    featured: true,
    description: "Discover the perfect blend of pristine beaches, crystal-clear waters, and vibrant island life in Phuket and Krabi. Explore limestone karsts, hidden lagoons, and authentic Thai culture.",
    highlights: [
      "Island hopping in Phi Phi Islands",
      "Snorkeling in crystal-clear waters",
      "Traditional Thai massage experience",
      "James Bond Island tour",
    ],
  },
  {
    title: "Bali",
    slug: "bali-indonesia-exotic-retreat-tour",
    image: "/images/tours/international/bali/thumbnail.jpg",
    duration: "7 Days / 6 Nights",
    price: "₹52,999",
    destination: "Indonesia, Southeast Asia",
    featured: false,
    description: "Immerse yourself in Bali's spiritual tranquility, with ancient temples, terraced rice fields, and stunning beaches. Experience the unique Balinese culture through traditional dance, art, and cuisine.",
    highlights: [
      "Sacred Monkey Forest Sanctuary",
      "Ubud Art Village exploration",
      "Sunset at Tanah Lot Temple",
      "Traditional Kecak fire dance show",
    ],
  },
  {
    title: "Sri Lanka",
    slug: "sri-lanka-scenic-cultural-tour",
    image: "/images/tours/international/srilanka/thumbnail.jpg",
    duration: "5 Days / 4 Nights",
    price: "₹34,999",
    destination: "South Asia",
    featured: false,
    description: "Journey through the Pearl of the Indian Ocean with its lush landscapes, ancient ruins, and wildlife sanctuaries. Explore colonial architecture and enjoy the warm hospitality of Sri Lankan people.",
    highlights: [
      "Sigiriya Rock Fortress climb",
      "Kandy Temple of the Sacred Tooth Relic",
      "Ceylon tea plantation tour",
      "Galle Dutch Fort exploration",
    ],
  },
  {
    title: "Singapore & Malaysia",
    slug: "singapore-malaysia-urban-cultural-tour",
    image: "/images/tours/international/singapore-malaysia/thumbnail.jpg",
    duration: "8 Days / 7 Nights",
    price: "₹68,999",
    destination: "Southeast Asia",
    featured: false,
    description: "Experience the perfect combination of Singapore's ultramodern cityscape and Malaysia's rich cultural heritage. From futuristic gardens to historical sites, this dual-destination tour offers diversity at every turn.",
    highlights: [
      "Gardens by the Bay light show",
      "Sentosa Island adventures",
      "Petronas Twin Towers visit",
      "Batu Caves exploration",
    ],
  },
];

// ------------------------
// Helper Components
// ------------------------
type AutoSliderProps = {
  images: string[];
  interval?: number;
  className?: string;
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
        setTimeout(() => setPrevIndex(null), 500);
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
// Embla Autoplay Hook (Corrected)
// ------------------------
interface EmblaApi {
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  slideNodes: () => HTMLElement[];
}

const useEmblaAutoplay = (options = { speed: 1, reverse: false }) => {
  const autoplay = useRef<NodeJS.Timeout | null>(null);
  const emblaApiRef = useRef<EmblaApi | null>(null);

  const stopAutoplay = useCallback(() => {
    if (autoplay.current) {
      clearTimeout(autoplay.current);
      autoplay.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay(); // Prevent stacking intervals
    if (!emblaApiRef.current) return;
    const embla = emblaApiRef.current;

    const scroll = () => {
      if (options.reverse) {
        if (embla.canScrollPrev()) {
          embla.scrollPrev();
        } else {
          embla.scrollTo(embla.slideNodes().length - 1);
        }
      } else {
        if (embla.canScrollNext()) {
          embla.scrollNext();
        } else {
          embla.scrollTo(0);
        }
      }
      autoplay.current = setTimeout(scroll, 2000); // Adjust interval as needed
    };

    autoplay.current = setTimeout(scroll, 2000);
  }, [options.reverse, stopAutoplay]);

  useEffect(() => {
    return () => stopAutoplay();
  }, [stopAutoplay]);

  return {
    startAutoplay,
    stopAutoplay,
    emblaApiRef,
  };
};

// ------------------------
// Main HomePage Component
// ------------------------
export default function HomePage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Change align: 'start' to align: 'center'
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', slidesToScroll: 1 });
  const { startAutoplay, stopAutoplay, emblaApiRef } = useEmblaAutoplay({ speed: 0.5, reverse: true });
  const [isHovered, setIsHovered] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Initialize videoRefs and cleanup
  useEffect(() => {
    videoRefs.current = Array(TESTIMONIALS.length).fill(null);
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // Start autoplay on mount
  useEffect(() => {
    if (emblaApi) {
      emblaApiRef.current = emblaApi;
      startAutoplay();
    }
  }, [emblaApi, startAutoplay]);

  // Handle hover
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    stopAutoplay(); // Always stop autoplay on hover
  }, [stopAutoplay]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (playingIndex === null) startAutoplay();
  }, [playingIndex, startAutoplay]);

  // Resume autoplay after delay
  const resumeAutoplay = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (!isHovered && playingIndex === null) {
        startAutoplay();
      }
    }, 2000);
  }, [isHovered, playingIndex, startAutoplay]);

  // Handle play/pause and center video
 // 2) Update your handlePlayPause to set .src only when the user clicks:
 const handlePlayPause = useCallback(
  (index: number) => {
    // 1️⃣ Pause & reset all other videos
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause()
        video.currentTime = 0
        video.removeAttribute("src")
        video.load()       // ← force poster to re-appear
      }
    })

    const video = videoRefs.current[index]
    if (!video) return

    // 2️⃣ First click: lazy-load the src
    if (!video.src) {
      video.src = video.dataset.src || ""
    }

    if (video.paused) {
      video
        .play()
        .then(() => {
          setPlayingIndex(index)
          setExpandedIndex(index)
          stopAutoplay()
          if (emblaApi) emblaApi.scrollTo(index)
        })
        .catch(console.error)
    } else {
      // 3️⃣ On pause: rewind & unload to show poster
      video.pause()
      video.currentTime = 0
      video.removeAttribute("src")
      video.load()
      setPlayingIndex(null)
      setExpandedIndex(null)
      resumeAutoplay()
    }
  },
  [emblaApi, stopAutoplay, resumeAutoplay]
)


  
  // Update mute state for all videos
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.muted = isMuted;
    });
  }, [isMuted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target as HTMLVideoElement
          // If it’s scrolled *completely* out of view
          if (!entry.isIntersecting && !vid.paused) {
            vid.pause()
            vid.currentTime = 0
            vid.removeAttribute("src")
            vid.load()
            // clear your “playing” state
            setPlayingIndex(null)
            setExpandedIndex(null)
            resumeAutoplay()
          }
        })
      },
      { threshold: 0 }
    )
  
    videoRefs.current.forEach((v) => v && observer.observe(v))
    return () => {
      videoRefs.current.forEach((v) => v && observer.unobserve(v))
    }
  }, [resumeAutoplay])
  

  // Hero video loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Columbus Tours | Discover Your Perfect Vacation</title>
        <meta
          name="description"
          content="Experience unforgettable journeys with Columbus Tours. We offer international, domestic, religious, honeymoon, and cruise packages tailored to your dreams."
        />
        {/* <link rel="preload" href="/videos/hero-video.mp4" as="video" />
        {TESTIMONIALS.map((_, index) => (
          <link
            key={index}
            rel="preload"
            href={`/testimonials/video-${index + 1}.mp4`}
            as="video"
          />
        ))} */}
      </Head>

      <style jsx global>{`
  .embla {
    overflow: hidden; /* Ensure no overflow */
    padding: 20px;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 auto;
    width: 256px;
    height: 320px; /* Set a consistent height */
    margin-right: 16px;
    transition: transform 0.3s ease;
    position: relative; /* Ensure proper positioning */
  }
`}</style>



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

          
          
        </section>

        {/* TOUR CATEGORIES SECTION */}
    {/* TOUR CATEGORIES SECTION */}
<section className="w-full bg-[#F7F7F7] py-20 px-4">
  <div className="w-full flex flex-col items-center">
    {/* Heading */}
    <div className="inline-flex items-center mb-4">
      <div className="h-1 w-8 bg-[#D32F2F] mr-3" />
      <span className="text-[#D32F2F] font-semibold uppercase tracking-wider text-sm">
        Tours Categories
      </span>
      <div className="h-1 w-8 bg-[#D32F2F] ml-3" />
    </div>

    {/* Subheading & CTA */}
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#333333] mb-4">
        Discover Your Next Adventure
      </h2>
      <p className="text-xl md:text-2xl text-[#333333] mb-8 max-w-2xl mx-auto">
        Explore a wide range of tour packages tailored just for you.
      </p>
      <Link href="/tours">
        <button className="px-8 md:px-10 py-3 md:py-4 bg-[#D32F2F] text-white text-lg md:text-xl rounded-full hover:bg-[#1565C0] transition transform hover:scale-105 duration-300">
          View All Tours
        </button>
      </Link>
    </motion.div>

    {/* Categories Grid */}
    <div className="grid justify-center gap-3 w-[93vw] mx-auto grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
      {(() => {
        const entries = Object.entries(IMAGES);
        const total = entries.length;
        return entries.map(([category, images], idx) => {
          // Right-to-left stagger: last-index first
          const delay = (total - 1 - idx) * 0.1;

          return (
            <motion.div
              key={category}
              className="relative group w-full aspect-square rounded-3xl overflow-hidden shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              {/* Image Slider */}
              <div className="relative w-full h-full overflow-hidden">
                <AutoSlider
                  images={images}
                  interval={4000}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 uppercase">
                  {category}
                </h3>
                <p className="text-center text-white text-sm md:text-base mb-4 px-2">
                  {{
                    international: "Explore tours across continents and immerse yourself in new cultures.",
                    domestic:       "Discover the beauty of local destinations and hidden gems.",
                    religious:      "Experience spiritually enriching journeys.",
                    honeymoon:      "Indulge in romantic escapes and unforgettable experiences.",
                    cruise:         "Sail away on luxurious cruises to exotic destinations.",
                  }[category]}
                </p>
                <Link href={`/tours?category=${category}`}>
                  <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition duration-300">
                    View {category.charAt(0).toUpperCase() + category.slice(1)} Tours
                  </button>
                </Link>
              </div>
            </motion.div>
          );
        });
      })()}
    </div>
  </div>
</section>

        {/* FEATURED TOURS SECTION */}
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-24 px-4">
          <div className="max-w-8xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="inline-flex items-center mb-4">
                <div className="inline-flex items-center px-4 py-2 bg-[#D32F2F] text-white text-sm font-semibold rounded-full mb-4 shadow-md">
                  <FaStar className="mr-1" />
                  Premium Collection
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Featured{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D32F2F] to-[#D32F2F]/80">
                  Experiences
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Curated journeys that redefine adventure and spark lifelong memories.
              </p>
            </motion.div>

            <motion.div
              className="grid justify-center gap-3 w-[93vw] mx-auto grid-cols-[repeat(auto-fit,minmax(240px,1fr))]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {FEATURED_TRIPS.map((tour, index) => (
                <motion.div
                  key={tour.slug}
                  className="relative group h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
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
                        src={tour.image}
                        alt={`Scenic view of ${tour.title}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{tour.title}</h3>
                      <div className="flex flex-wrap gap-y-2 mb-3">
                        <div className="flex items-center text-gray-700 w-full">
                          <FaCalendarAlt className="mr-2 text-[#D32F2F]" />
                          <span className="text-sm font-medium">{tour.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-700 w-full">
                          <FaMapMarkerAlt className="mr-2 text-[#D32F2F]" />
                          <span className="text-sm font-medium">{tour.destination}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{tour.description}</p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] flex flex-col p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 rounded-xl overflow-hidden">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-white mb-2">{tour.title} Experience</h3>
                          <div className="h-1 w-16 bg-white rounded-full mb-3"></div>
                          <div className="flex flex-wrap gap-y-2">
                            <div className="flex items-center text-white/90 w-full">
                              <FaCalendarAlt className="mr-2" />
                              <span>{tour.duration}</span>
                            </div>
                            <div className="flex items-center text-white/90 w-full">
                              <FaMapMarkerAlt className="mr-2" />
                              <span>{tour.destination}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow overflow-y-auto mb-4">
                          <h4 className="text-white font-semibold mb-2 text-lg">Highlights:</h4>
                          <ul className="text-white/90 text-sm space-y-1 mb-4 list-disc pl-5">
                            {tour.highlights.map((highlight, i) => (
                              <li key={i}>{highlight}</li>
                            ))}
                          </ul>
                          <p className="text-white/80 text-sm">{tour.description}</p>
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
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                href="/tours"
                className="inline-flex items-center px-8 py-3.5 bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold rounded-full hover:shadow-lg transition-all group"
              >
                View All Tours
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
              </Link>
            </motion.div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION (Using Embla Carousel) */}
        {/* TESTIMONIALS SECTION (Using Embla Carousel) */}
<section id="testimonial" className="w-full bg-white py-20 px-4">
  <div className="max-w-[93vw] mx-auto flex flex-col items-center">
    <div className="inline-flex items-center mb-4">
      <div className="h-1 w-8 bg-[#D32F2F] mr-3"></div>
      <span className="text-[#D32F2F] font-semibold uppercase tracking-wider text-sm">
        Testimonials
      </span>
      <div className="h-1 w-8 bg-[#D32F2F] ml-3"></div>
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-8 text-center">
      What Our Travelers Say
    </h2>
    <div className="relative w-full">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsMuted((prev) => !prev)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          aria-label={isMuted ? "Unmute testimonial videos" : "Mute testimonial videos"}
        >
          {isMuted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
        </button>
      </div>
      <div
        className="embla"
        ref={emblaRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="embla__container">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`embla__slide relative${
                expandedIndex === index ? ' scale-110 z-20' : ''
              }`}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
            
<video
  ref={el => { videoRefs.current[index] = el; }}
  poster={testimonial.thumbnail}
  preload="none"
  muted={isMuted}
  playsInline
  loop
  data-src={testimonial.videoUrl}      // ← defer loading
  onClick={() => handlePlayPause(index)}
  className="w-full h-full object-cover"
/>


                
                {/* Play button overlay */}
                {playingIndex !== index && (
                  <button
                    onClick={() => handlePlayPause(index)}
                    className="absolute inset-0 flex items-center justify-center text-white text-5xl bg-black/20 hover:bg-black/50 transition-colors"
                    aria-label="Play testimonial video"
                  >
                    <FiPlay />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

        {/* WHY CHOOSE US SECTION */}
        <section className="w-full bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] py-24 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white/20"></div>
            <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-white/20"></div>
          </div>

          <div className="w-[90vw] max-w-[1600px] mx-auto text-center relative z-10">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="inline-flex items-center mb-6">
                <div className="h-1 w-12 bg-white mr-3"></div>
                <span className="text-white font-semibold uppercase tracking-wider text-sm">
                  The Columbus Advantage
                </span>
                <div className="h-1 w-12 bg-white ml-3"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Why <span className="text-white">Choose</span> Columbus
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                Discover what makes our travel experiences truly exceptional
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.15 }}
              viewport={{ once: true }}
            >
              {[
                {
                  Icon: FaCompass,
                  title: "Expert Local Guides",
                  desc: "Our passionate guides with 10+ years experience bring destinations to life with insider knowledge.",
                  stats: "20+ Professional Guides",
                  href: "/about/guides",
                  cta: "Meet Our Team",
                },
                {
                  Icon: FaMedal,
                  title: "Award-Winning Service",
                  desc: "Recognized for excellence in creating unforgettable travel experiences year after year.",
                  stats: "5-Star Rated Since 2004",
                  href: "/awards",
                  cta: "See Our Awards",
                },
                {
                  Icon: FaGlobeAmericas,
                  title: "Curated Experiences",
                  desc: "Handpicked activities and accommodations that reflect authentic local culture.",
                  stats: "60+ Unique Experiences",
                  href: "/experiences",
                  cta: "Explore Tours",
                },
              ].map(({ Icon, title, desc, stats }, index) => (
                <motion.div
                  key={title}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/10 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white transition-all duration-500 animate-ping-slow"></div>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 group-hover:bg-white/20">
                      <Icon className="text-2xl text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-white/80 mb-5">{desc}</p>
                  <p className="text-sm font-semibold text-white mb-6">{stats}</p>

                  {/* <Link
                    href={href}
                    className="inline-flex items-center px-6 py-3 bg-white text-[#D32F2F] font-medium rounded-full hover:bg-transparent hover:text-white hover:border-white border-2 border-transparent transition-all duration-300 group/button"
                  >
                    <span>{cta}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2 transform group-hover/button:translate-x-1 transition-transform"
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
                  </Link> */}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-row flex-nowrap justify-center items-center gap-6 w-full overflow-x-auto mt-20 pt-10 border-t border-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {[
                { number: "50K+", label: "Happy Travelers", labelColor: "text-[#FFFFFF]" },
                { number: "98%", label: "Satisfaction Rate", labelColor: "text-[#FFFFFF]" },
                { number: "24/7", label: "Dedicated Support", labelColor: "text-[#FFFFFF]" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center min-w-[100px]">
                  <span className="text-2xl font-bold text-[#FFFFFF]">{item.number}</span>
                  <span className="text-s font-bold text-[#FFFFFF]">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CONTACT US SECTION */}
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
              viewport={{ once: true, margin: '-100px' }}
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
  className="grid justify-center gap-3 w-full max-w-5xl mx-auto px-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
              <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                <a
                  href="https://wa.me/919422401225"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                    <p className="text-[#F7E7CE]/80 mb-5 text-sm">
                      Instant connection with our team
                    </p>
                    <div className="px-6 py-2 bg-[#25D366] text-white font-medium rounded-full group-hover:bg-[#1DA851] transition-all duration-300 flex items-center justify-center">
                      WhatsApp
                    </div>
                  </div>
                </a>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
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
                    <p className="text-[#F7E7CE]/80 mb-5 text-sm">
                      Speak directly with our experts
                    </p>
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
      </main>
    </>
  );
}
