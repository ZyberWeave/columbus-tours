'use client';
import FeaturedTrips from '@/components/FeaturedTrips';
import React, { useState, useEffect } from 'react';
import Image from "next/image";


interface AutoSliderProps {
  images: string[];
  interval?: number;
  style?: React.CSSProperties;
}

// A simple crossfade slider component
const AutoSlider: React.FC<AutoSliderProps> = ({ images, interval = 3000, style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  const commonStyle: React.CSSProperties = {
    ...style,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease',
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % images.length;
        setPrevIndex(prev);
        setTimeout(() => setPrevIndex(null), 500);
        return nextIndex;
      });
    }, interval);
    return () => clearInterval(id);
  }, [images, interval]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {prevIndex !== null && (
        <Image src={images[prevIndex]} alt="" style={{ ...commonStyle, opacity: 0 }} loading="lazy" />
      )}
      <Image src={images[currentIndex]} alt="" style={{ ...commonStyle, opacity: 1 }} loading="lazy" />
    </div>
  );
};

export default function HomePage() {
  // Replace these with your actual image paths
  const internationalImages = [
    '/images/international1.jpg',
    '/images/international2.jpg',
    '/images/international3.jpg',
  ];
  const domesticImages = [
    '/images/domestic1.jpg',
    '/images/domestic2.jpg',
    '/images/domestic3.jpg',
  ];
  const familyImages = [
    '/images/family1.jpg',
    '/images/family2.jpg',
    '/images/family3.jpg',
  ];
  const featuredTripsData = [
    {
      title: 'Exotic Bali',
      image: '/images/featured1.jpg',
      description: 'Experience the tropical charm and vibrant culture of Bali.',
    },
    {
      title: 'Safari Adventure',
      image: '/images/featured2.jpg',
      description: 'Get up close with wildlife on an unforgettable safari journey.',
    },
    {
      title: 'European Escapade',
      image: '/images/featured3.jpg',
      description: 'Discover historic cities and breathtaking landscapes across Europe.',
    },
    {
      title: 'Mountain Retreat',
      image: '/images/featured4.jpg',
      description: 'Relax and rejuvenate amidst stunning mountain vistas.',
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Optional dark overlay over the video */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.2))',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#fff',
            textAlign: 'center',
            padding: '0 1rem',
          }}
        >
          <Image
            src="/logo.png"
            alt="Columbus Tours Logo"
            style={{
              maxWidth: '300px',
              width: '100%',
              height: 'auto',
              marginBottom: '1rem',
            }}
          />
          <p
            style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            Discover amazing experiences with us.
          </p>
          <button
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#fff',
              background: 'transparent',
              border: '2px solid #fff',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background 0.3s, transform 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            Explore Tours
          </button>
        </div>
      </section>

      {/* Heading Before Trips Section */}
      <section style={{ width: '100%', background: '#f5f5f5', padding: '4rem 0' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'Arial, sans-serif' }}>
            Our Trips
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#333', fontFamily: 'Arial, sans-serif' }}>
            Choose from our variety of exciting tour packages.
          </p>
        </div>
      </section>

      {/* Tour Types Section (with text overlay on images) */}
      <section
        style={{
          width: '100%',
          padding: '2rem 0',
          backgroundColor: '#fff',
          marginBottom: '4rem',
        }}
      >
        <div style={{ display: 'flex', width: '100%', margin: 0, padding: 0 }}>
          {/* International */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              boxSizing: 'border-box',
              borderRight: '1px solid #ddd',
              height: '400px',
            }}
          >
            <AutoSlider
              images={internationalImages}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Text overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '1rem',
              }}
            >
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Arial, sans-serif' }}>
                International
              </h3>
              <p style={{ color: '#fff', fontSize: '1rem', width: '80%', fontFamily: 'Arial, sans-serif' }}>
                Explore tours across continents and immerse yourself in new cultures.
              </p>
            </div>
          </div>

          {/* Domestic */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              boxSizing: 'border-box',
              borderRight: '1px solid #ddd',
              height: '400px',
            }}
          >
            <AutoSlider
              images={domesticImages}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Text overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '1rem',
              }}
            >
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Arial, sans-serif' }}>
                Domestic
              </h3>
              <p style={{ color: '#fff', fontSize: '1rem', width: '80%', fontFamily: 'Arial, sans-serif' }}>
                Discover the beauty of local destinations and hidden gems within the country.
              </p>
            </div>
          </div>

          {/* Family */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              boxSizing: 'border-box',
              height: '400px',
            }}
          >
            <AutoSlider
              images={familyImages}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Text overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '1rem',
              }}
            >
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Arial, sans-serif' }}>
                Family
              </h3>
              <p style={{ color: '#fff', fontSize: '1rem', width: '80%', fontFamily: 'Arial, sans-serif' }}>
                Enjoy quality time with family-friendly tour packages designed for all ages.
              </p>
            </div>
          </div>
        </div>
      </section>
      <FeaturedTrips trips={featuredTripsData} />
    </main>
  );
}
