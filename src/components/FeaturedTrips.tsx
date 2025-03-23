'use client';
import React from 'react';
import Image from 'next/image';

interface FeaturedTrip {
  title: string;
  image: string;
  description: string;
}

interface FeaturedTripsProps {
  trips: FeaturedTrip[];
}

const FeaturedTrips: React.FC<FeaturedTripsProps> = ({ trips }) => {
  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Trips</h2>
          <p className="text-xl text-gray-700">
            Handpicked trips just for you.
          </p>
        </div>
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trips.map((trip, index) => (
            <div
              key={index}
              className="relative h-80 md:h-96 overflow-hidden rounded shadow-lg"
            >
              <Image
                src={trip.image}
                alt={trip.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-4">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {trip.title}
                </h3>
                <p className="text-white text-center text-sm">
                  {trip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrips;
