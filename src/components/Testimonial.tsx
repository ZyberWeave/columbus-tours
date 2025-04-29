// components/TestimonialCarousel.tsx
"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { FiPlay, FiPause } from "react-icons/fi";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const TESTIMONIALS = [
  { id: 1, name: "John D.",  location: "New York", thumbnail: "/thumbs/test1.jpg", videoUrl: "/videos/test1.mp4" },
  { id: 2, name: "Sarah M.", location: "London",  thumbnail: "/thumbs/test2.jpg", videoUrl: "/videos/test2.mp4" },
  { id: 3, name: "Alex K.",  location: "Tokyo",   thumbnail: "/thumbs/test3.jpg", videoUrl: "/videos/test3.mp4" },
  { id: 4, name: "Maria R.", location: "Berlin",  thumbnail: "/thumbs/test4.jpg", videoUrl: "/videos/test4.mp4" },
];

export default function TestimonialCarousel() {
  const swiperRef = useRef<SwiperType>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const togglePlay = (id: number) => {
    const vid = document.getElementById(`vid-${id}`) as HTMLVideoElement | null;
    if (!vid) return;
    if (playingId === id) {
      vid.pause();
      setPlayingId(null);
    } else {
      vid.play();
      setPlayingId(id);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#D32F2F] via-[#B71C1C] to-[#E53935] py-16 px-4">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-12">
        Client Testimonials
      </h2>

      <Swiper
        onBeforeInit={(sw) => (swiperRef.current = sw)}
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 160, modifier: 1.2, slideShadows: false }}
        slidesPerView="auto"
        centeredSlides
        spaceBetween={40}
        navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="max-w-6xl mx-auto"
      >
        {TESTIMONIALS.map((t) => (
          <SwiperSlide key={t.id} className="w-72">
            <div className="slide-inner group relative bg-gradient-to-br from-[#D32F2F] via-[#D32F2F]/80 to-[#D32F2F]/50 rounded-3xl p-1 transition-transform duration-500">
              <div className="bg-gray-800 rounded-2xl overflow-hidden relative">
                <video
                  id={`vid-${t.id}`}
                  src={t.videoUrl}
                  poster={t.thumbnail}
                  muted
                  loop
                  playsInline
                  className="w-full h-44 object-cover"
                />
                <button
                  onClick={() => togglePlay(t.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {playingId === t.id ? (
                    <FiPause size={28} className="text-white" />
                  ) : (
                    <FiPlay size={28} className="text-white" />
                  )}
                </button>
                <div className="p-4 text-center text-white">
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="mt-1 text-sm text-gray-300">{t.location}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Frosted circular arrows */}
        <div className="swiper-button-prev swiper-button-prev-custom">‹</div>
        <div className="swiper-button-next swiper-button-next-custom">›</div>

        {/* Bullets */}
        <div className="swiper-pagination"></div>
      </Swiper>

      <style jsx>{`
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          background: rgba(211, 47, 47, 0.2);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 24px;
          z-index: 10;
          cursor: pointer;
          transition: background 0.3s;
        }
        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          background: rgba(211, 47, 47, 0.4);
        }
        .swiper-button-prev-custom { left: -22px; }
        .swiper-button-next-custom { right: -22px; }

        :global(.swiper-pagination-bullet) {
          background: rgba(211, 47, 47, 0.3);
          width: 10px;
          height: 10px;
          opacity: 1;
        }
        :global(.swiper-pagination-bullet-active) {
          background: #D32F2F;
          box-shadow: 0 0 4px #D32F2F;
        }
        :global(.swiper-slide-active .slide-inner) {
          transform: scale(1.1);
          box-shadow:
            0 0 20px rgba(211, 47, 47, 0.7),
            0 0 40px rgba(211, 47, 47, 0.5);
        }
      `}</style>
    </section>
  );
}
