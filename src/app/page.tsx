"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";


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
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [prevIndex, setPrevIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % images.length;
        setPrevIndex(prev);
        setTimeout(() => setPrevIndex(null), 500); // fade-out duration
        return nextIndex;
      });
    }, interval);
    return () => clearInterval(id);
  }, [images, interval]);

  return (
    <div className="relative w-full h-full">
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
  },
  {
    title: "Thailand",
    slug: "phuket-krabi-island-adventure-tour",
    image: "/images/tours/international/phuket-krabi/thumbnail.jpg",
  },
  {
    title: "Bali",
    slug: "bali-indonesia-exotic-retreat-tour",
    image: "/images/tours/international/bali/thumbnail.jpg",
  },
  {
    title: "Sri Lanka",
    slug: "sri-lanka-scenic-cultural-tour",
    image: "/images/tours/international/srilanka/thumbnail.jpg",
  },
  {
    title: "Singapore & Malaysia",
    slug: "singapore-malaysia-urban-cultural-tour",
    image: "/images/tours/international/singapore-malaysia/thumbnail.jpg",
  },
];

// ------------------------
// HomePage Component
// ------------------------
export default function HomePage() {
  return (
    <main className="flex flex-col w-full antialiased">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-0" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
          <Image
            src="/logo.png"
            alt="Columbus Tours Logo"
            width={300}
            height={100}
            className="w-full max-w-xs mb-8 drop-shadow-xl animate-fade-in"
            priority
          />
          <p className="text-2xl md:text-3xl font-light mb-12 drop-shadow-lg animate-fade-in-up delay-100">
            Discover amazing experiences with us.
          </p>
          <Link href="/tours">
            <button
              className="px-8 py-4 text-lg font-bold text-white bg-transparent border-4 border-white rounded-full hover:bg-white/20 hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-200"
              aria-label="Explore Tours"
            >
              Explore Tours
            </button>
          </Link>
        </div>
      </section>

      {/* TOUR CATEGORIES SECTION */}
      <section className="w-full bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
              Discover Your Next Adventure
            </h2>
            <p className="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore a wide range of tour packages tailored just for you.
            </p>
            <Link href="/tours">
              <button className="px-10 py-4 bg-blue-600 text-white text-xl rounded-full hover:bg-blue-700 transition-colors transform hover:scale-105 duration-300">
                View All Tours
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {Object.entries(IMAGES).map(([category, images]) => (
              <div
                key={category}
                className="relative group h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <AutoSlider
                  images={images}
                  interval={4000}
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-center items-center px-4">
                  <h3 className="text-3xl font-bold text-white mb-2 uppercase">
                    {category}
                  </h3>
                  <p className="text-white text-center text-sm mb-4">
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
                    <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition duration-300">
                      View {category.charAt(0).toUpperCase() + category.slice(1)} Tours
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TOURS SECTION */}
      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Featured Tours</h2>
            <p className="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Handpicked tours for every adventurous traveler.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_TRIPS.map((tour) => (
              <Link
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {tour.title}
                  </h3>
                  <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="w-full bg-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
            Why Choose Columbus Tours?
          </h2>
          <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            We deliver unforgettable experiences with premium service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <Image
                src="/icons/experience.svg"
                alt="Expert Guidance"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="text-3xl font-bold mb-3">Expert Guidance</h3>
              <p className="text-xl text-gray-600">
                Our seasoned team curates every tour with passion and expertise.
              </p>
              <Link href="/about">
                <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                  Learn More
                </button>
              </Link>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <Image
                src="/icons/adventure.svg"
                alt="Unforgettable Adventure"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="text-3xl font-bold mb-3">Unforgettable Adventure</h3>
              <p className="text-xl text-gray-600">
                Every tour promises memories that last a lifetime.
              </p>
              <Link href="/tours">
                <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                  Explore Now
                </button>
              </Link>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <Image
                src="/icons/support.svg"
                alt="24/7 Support"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="text-3xl font-bold mb-3">24/7 Support</h3>
              <p className="text-xl text-gray-600">
                Our dedicated team is here to assist you every step of the way.
              </p>
              <Link href="/contact">
                <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GET IN TOUCH SECTION */}
      <section className="w-full bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold text-white mb-6">Get In Touch</h2>
          <p className="text-2xl text-white mb-10 max-w-2xl mx-auto">
            Have questions or need more information? Our team is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-10 py-4 bg-white text-blue-600 text-2xl rounded-full hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105">
                Contact Us
              </button>
            </Link>
            <a
              href="https://wa.me/919422401225"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-green-600 text-white text-2xl rounded-full hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
            >
              WhatsApp
            </a>
            <a
              href="tel:+919422401225"
              className="px-10 py-4 bg-white text-blue-600 text-2xl rounded-full hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
