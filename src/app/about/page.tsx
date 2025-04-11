'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/about-hero.jpg)' }}>
        <div className="bg-black/60 absolute inset-0" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">About Columbus Tours</h1>
          <p className="text-xl md:text-2xl font-light">Your trusted travel companion for unforgettable journeys.</p>
        </div>
      </section>

      {/* Partner & Address */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 border-b pb-2 border-gray-300">Contact & Location</h2>
        <div className="space-y-4 text-lg">
          <p><span className="font-semibold">Partner:</span> Mr. Dhananjay Jadhav</p>
          <div className="flex flex-col space-y-2">
            <a href="tel:+919422401225" className="flex items-center text-blue-600 hover:text-blue-800">
              <span className="font-semibold mr-2">Phone:</span> +91 94224 01225
            </a>
            <a href="https://wa.me/919422401225" target="_blank" rel="noopener noreferrer" className="flex items-center text-green-600 hover:text-green-800">
              <span className="font-semibold mr-2">WhatsApp:</span> +91 94224 01225
            </a>
          </div>
          <address className="not-italic">
            <span className="font-semibold">Address:</span><br />
            1, Laxmi Heights, 63, Mangalwar Peth,<br />
            Opp. Jyotiba Temple,<br />
            Karad - 415 110 (MS) INDIA
          </address>
        </div>
        <div className="mt-8">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.504425097256!2d74.18194227580952!3d17.291194605567846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc183aa3557bd5f%3A0xc2de5ed4ee22c2e3!2sColumbus%20Tours!5e0!3m2!1sen!2sin!4v1744154063335!5m2!1sen!2sin"
            width="100%"
            height="300"
            className="rounded shadow"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Our Core Values</h2>
          <p className="text-lg mb-10">We live by the principles of:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <h4 className="text-xl font-semibold mb-2">Integrity</h4>
              <p>We keep our promises and stay transparent with clients and partners.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h4 className="text-xl font-semibold mb-2">Quality</h4>
              <p>We strive to offer the best tours with top-notch planning and experiences.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h4 className="text-xl font-semibold mb-2">Passion</h4>
              <p>We love what we do and bring that energy to every trip we design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline or History Placeholder */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 border-b pb-2 border-gray-300">Milestones</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-xl">2015 - Inception</h4>
            <p>Columbus Tours was founded with the goal of providing tailored and affordable international travel.</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-xl">2017 - Domestic Expansion</h4>
            <p>We launched several domestic tour packages and spiritual yatra plans across India.</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4">
            <h4 className="font-semibold text-xl">2020 - Digital Booking Platform</h4>
            <p>We went fully online with digital booking, remote consultations, and WhatsApp support.</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <h2 className="text-4xl font-bold mb-4">Let's Build Memories Together</h2>
        <p className="text-lg mb-6">Our team is ready to plan your next getaway. Start now.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/919422401225"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded hover:bg-green-700 transition"
          >
            Message on WhatsApp
          </a>
          <a
            href="tel:+919422401225"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded hover:bg-gray-100 transition"
          >
            Call Us Now
          </a>
          <Link
            href="/contact"
            className="inline-block bg-blue-700 text-white font-semibold px-8 py-3 rounded hover:bg-blue-800 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}