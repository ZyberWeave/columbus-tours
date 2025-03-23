'use client';
import React from 'react';

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
    <section
      style={{
        width: '100%',
        padding: '2rem 0',
        backgroundColor: '#f5f5f5',
        marginBottom: '4rem',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Featured Trips
        </h2>
        <p
          style={{
            fontSize: '1.25rem',
            color: '#333',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Handpicked trips just for you.
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
        {trips.map((trip, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              width: 'calc(25% - 1rem)',
              minWidth: '250px',
              height: '300px',
              overflow: 'hidden',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={trip.image}
              alt={trip.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  fontSize: '1.25rem',
                  marginBottom: '0.5rem',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {trip.title}
              </h3>
              <p style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'Arial, sans-serif' }}>
                {trip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedTrips;
