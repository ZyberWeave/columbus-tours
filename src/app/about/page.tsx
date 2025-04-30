'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


/* ———————————————————————————————————————
   Small helpers
——————————————————————————————————————— */
type Stat = [label: string, value: string];
const STATS: Stat[] = [
  ['Satisfied Travellers', '50000+'],
  ['Countries Covered', '25+'],
  ['Tours Offered', '60+'],
  ['Custom Itineraries', '100+'],
];



type TeamCard = {
  img: string;
  name: string;
  role: string;
};
const TEAM: TeamCard[] = [
  
  
  {
    img: '/images/team/swati.jpg',
    name: 'Mrs. Swati Mane',
    role: 'Senior Operations Manager',
  },
  {
    img: '/images/team/reshma.jpg',
    name: 'Ms. Reshma Mane',
    role: 'Assistant Manager, Accounts',
  },
  {
    img: '/images/team/yogesh.jpg',
    name: 'Mr. Yogesh More',
    role: 'Executive General Manager',
  },{
    img: '/images/team/abhimanyu.jpg',
    name: 'Abhimanyu Jadhav',
    role: 'International Tours Specialist',
    
  },
  {
    img: '/images/team/nilesh.jpg',
    name: 'Mr. Nilesh Shelkar',
    role: 'Senior Manager, Banking Services',
  },{
    img: '/images/team/rohan.jpg',
    name: 'Rohan Sarode',
    role: 'Head of IT Strategy & Integration (via ZyberWeave)',
    
  },
  {
    img: '/images/team/vaishnavi.jpg',
    name: 'Vaishnavi Kulkarni',
    role: 'Social Media & Content Strategist (via ZyberWeave)',
  },
];

export default function AboutPage() {
  // Add this state and image array at the top of your component
  const heroImages = [
    "/images/about/happy-faces/1.jpg",
    "/images/about/happy-faces/2.jpg",
    "/images/about/happy-faces/3.jpg",
    "/images/about/happy-faces/4.jpg",
    "/images/about/happy-faces/5.jpg",
    "/images/about/happy-faces/6.jpg",
    "/images/about/happy-faces/7.jpg",
    "/images/about/happy-faces/8.jpg",
    "/images/about/happy-faces/9.jpg",
  ];
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <main className="bg-white text-[#333] antialiased scroll-smooth">
      {/* ───────── HERO ───────── */}
      <header className="relative bg-[#D32F2F] text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-60 h-60 rounded-full bg-white/20"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-white/20"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between">
          {/* copy */}
          <motion.div 
            className="max-w-xl lg:max-w-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Crafting{' '}
              <span className="underline decoration-white/40">unforgettable</span> journeys
              since&nbsp;2004
            </h1>

            <p className="mb-10 text-lg opacity-90 sm:text-xl">
              At Columbus Tours we don&apos;t just plan trips — we create memories that
              out-shine the postcards.
            </p>

            <nav className="flex flex-col gap-4 sm:flex-row" aria-label="Primary CTAs">
              <Link
                href="/tours"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-[#D32F2F] transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-lg"
              >
                Explore Tours
              </Link>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 font-semibold transition-all hover:scale-105 hover:bg-white/10 hover:shadow-lg"
              >
                Contact Us
              </a>
            </nav>
          </motion.div>

          {/* hero image */}
          <motion.figure 
            className="relative mt-12 aspect-square w-full max-w-md lg:ml-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src={heroImages[currentHeroImage]}
              alt="Happy travellers around a globe"
              priority
              fill
              sizes="(max-width:1024px) 80vw, 400px"
              className="object-cover rounded-3xl shadow-2xl ring-8 ring-white/10"
            />
          </motion.figure>
        </div>

        {/* decorative bottom edge */}
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 50"
          className="absolute bottom-0 left-0 w-full text-white"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 1440,50 0,50" fill="currentColor" />
        </svg>
      </header>

      {/* ───────── OUR STORY ───────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* founder image */}
          <motion.figure 
            className="relative h-96 overflow-hidden rounded-xl shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/founder.jpg"
              alt="Mr Dhananjay Jadhav, Founder of Columbus Tours"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-contain"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">Mr Dhananjay Jadhav</h3>
              <p className="text-blue-300">Partner&nbsp;&amp;&nbsp;Travel Expert</p>
            </figcaption>
          </motion.figure>

          {/* text */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold">
              Our <span className="text-[#D32F2F]">Story</span>
            </h2>
            <p className="mb-6 text-lg">
              Founded in <strong>2004</strong> by <strong>Mr Dhananjay Jadhav</strong>,
              Columbus Tours began as a passion project to make international travel
              accessible to everyone in Karad and beyond.
            </p>
            <p className="mb-6 text-lg">
              With over eight years of expertise, we&apos;ve helped thousands of travellers
              discover new destinations — from spiritual journeys to adventurous getaways.
            </p>

            <motion.dl 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {STATS.map(([label, value]) => (
                <motion.div 
                  key={label}
                  className="rounded-lg bg-[#F7F7F7] p-4"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring" }}
                >
                  <dt className="font-bold text-[#D32F2F]">{value}</dt>
                  <dd>{label}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </motion.article>
        </div>
      </section>

      

      {/* ───────── MICRO-PROOF RIBBON ───────── */}
      <motion.section 
        className="bg-[#F7F7F7] py-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        
      </motion.section>

      {/* ───────── TEAM ───────── */}
      <section className="mx-auto max-w-8xl px-6 py-20">
        <motion.h2 
          className="mb-16 text-center text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Meet Our Experts
        </motion.h2>
        <motion.div 
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-7"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {TEAM.map(({ img, name, role }) => (
            <motion.article
              key={name}
              className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <figure className="relative h-64">
                <Image 
                  src={img} 
                  alt={name} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </figure>
              <div className="p-6">
                <h3 className="text-xl font-bold">{name}</h3>
                <p className="mb-4 text-[#1976D2]">
                  {role.includes('ZyberWeave') ? (
                    <>
                      {role.replace(
                        /\(via ZyberWeave\)/,
                        `(via `
                      )}
                      <a
                        href="https://zyberweave.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#D32F2F]"
                      >
                        ZyberWeave
                      </a>
                      {')'}
                    </>
                  ) : (
                    role
                  )}
                </p>
                
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      

       {/* CONTACT US SECTION>*/}
<section className="w-full bg-gradient-to-br from-[#0A122A] to-[#1B2738] py-24 px-4 relative overflow-hidden mt-20 mb-20">
  {/* • ultra-subtle “spotlight” accents */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-20 left-10 w-44 h-44 rounded-full bg-white/10" />
    <div className="absolute bottom-10 right-24 w-64 h-64 rounded-full bg-white/10" />
  </div>

  <div className="max-w-4xl mx-auto text-center relative z-10">
    {/* ---------- Heading ---------- */}
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

    {/* ---------- Cards ---------- */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
      viewport={{ once: true }}
    >
      {/* WhatsApp */}
      <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
        <a
          href="https://wa.me/919422401225"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-white/5 hover:bg-white/[.08] border border-white/10 rounded-xl p-8 h-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group">
            <div className="w-14 h-14 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-5 group-hover:bg-[#25D366]/30 transition-colors duration-300">
              {/* icon */}
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

      {/* Call */}
      <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
        <a href="tel:+919422401225">
          <div className="bg-white/5 hover:bg-white/[.08] border border-white/10 rounded-xl p-8 h-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-white/20 transition-colors duration-300">
              {/* icon */}
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

    {/* ---------- (Optional additional info / address) ---------- */}
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
  );
}