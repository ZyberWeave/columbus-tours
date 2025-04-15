'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaPhone, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaShieldAlt, 
  FaGlobe, 
  FaStar // Add this import
} from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="bg-[#FFFFFF] text-[#333333]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-0" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
        >
          <source src="/videos/travel-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fadeIn">
            Crafting <span className="text-[#1976D2]">Unforgettable</span> Journeys Since 2004
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto">
            At Columbus Tours, we don't just plan trips - we create experiences that become lifelong memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="inline-block bg-[#D32F2F] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#B71C1C] transition transform hover:scale-105"
            >
              Explore Our Tours
            </Link>
            <a
              href="#contact"
              className="inline-block bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition transform hover:scale-105"
            >
              Connect With Us
            </a>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-xl overflow-hidden shadow-2xl h-96">
            <img 
              src="/images/founder.jpg" 
              alt="Mr. Dhananjay Jadhav, Founder of Columbus Tours" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white text-2xl font-bold">Mr. Dhananjay Jadhav</h3>
              <p className="text-[#1976D2]">Founder & Travel Expert</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Our <span className="text-[#D32F2F]">Story</span>
            </h2>
            <p className="text-lg mb-6">
              Founded in <strong>2004</strong> by <strong>Mr. Dhananjay Jadhav</strong>, Columbus Tours began as a passion project to make international travel accessible to everyone in Karad and beyond. What started as a small office has grown into a trusted name in travel planning.
            </p>
            <p className="text-lg mb-6">
              With over 8 years of experience, we've helped thousands of travelers discover new destinations, whether they're seeking spiritual journeys, family vacations, or adventurous getaways.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F7F7F7] p-4 rounded-lg">
                <h4 className="font-bold text-[#D32F2F]">5000+</h4>
                <p>Satisfied Travelers</p>
              </div>
              <div className="bg-[#F7F7F7] p-4 rounded-lg">
                <h4 className="font-bold text-[#D32F2F]">27+</h4>
                <p>Countries Covered</p>
              </div>
              <div className="bg-[#F7F7F7] p-4 rounded-lg">
                <h4 className="font-bold text-[#D32F2F]">50+</h4>
                <p>Religious Tours</p>
              </div>
              <div className="bg-[#F7F7F7] p-4 rounded-lg">
                <h4 className="font-bold text-[#D32F2F]">100+</h4>
                <p>Custom Itineraries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#F7F7F7] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Columbus Tours</h2>
            <p className="text-xl max-w-3xl mx-auto">
              We're not just another travel agency - here's what makes us different
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition hover:-translate-y-2">
              <div className="text-[#D32F2F] text-4xl mb-4">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust & Reliability</h3>
              <p>
                With 8+ years in business, we've built strong relationships with hotels, airlines, and local partners worldwide to ensure seamless experiences.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition hover:-translate-y-2">
              <div className="text-[#D32F2F] text-4xl mb-4">
                <FaGlobe />
              </div>
              <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
              <p>
                Our team has personally visited most destinations we offer, giving you insider tips and authentic experiences beyond tourist spots.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition hover:-translate-y-2">
              <div className="text-[#D32F2F] text-4xl mb-4">
                <FaHeart />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Service</h3>
              <p>
                From the first call to your return home, you'll work with the same dedicated travel expert who understands your preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Meet Our Travel Experts</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="h-64 bg-[#1976D2]/10 overflow-hidden">
              <img src="/images/team-1.jpg" alt="Travel Consultant" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">Priya Sharma</h3>
              <p className="text-[#1976D2] mb-4">International Tours Specialist</p>
              <p className="text-[#333333]">With 7 years experience planning European and Southeast Asian itineraries.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="h-64 bg-blue-100 overflow-hidden">
              <img src="/images/team-2.jpg" alt="Travel Consultant" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">Rajesh Patel</h3>
              <p className="text-blue-600 mb-4">Religious Tours Coordinator</p>
              <p className="text-gray-600">Expert in spiritual journeys to Char Dham, Kashi, and international pilgrimages.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="h-64 bg-blue-100 overflow-hidden">
              <img src="/images/team-3.jpg" alt="Travel Consultant" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">Anjali Deshpande</h3>
              <p className="text-blue-600 mb-4">Customer Experience Manager</p>
              <p className="text-gray-600">Ensures every detail of your trip meets our high standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Travelers Love Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <div className="flex mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="italic mb-6">
                "Our family trip to Switzerland was perfectly planned by Columbus Tours. Every hotel, every transfer was flawless. The kids still talk about it!"
              </p>
              <div className="flex items-center">
                <img src="/images/client-1.jpg" alt="Happy Client" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <h4 className="font-bold">Sunil Kulkarni</h4>
                  <p className="text-blue-200">Karad, Family Tour</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <div className="flex mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="italic mb-6">
                "As senior citizens, we were nervous about traveling abroad. Columbus Tours took care of everything - even special meals and wheelchair assistance."
              </p>
              <div className="flex items-center">
                <img src="/images/client-2.jpg" alt="Happy Client" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <h4 className="font-bold">Meera & Prakash Joshi</h4>
                  <p className="text-blue-200">Satara, Senior Couple Tour</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <div className="flex mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="italic mb-6">
                "The Char Dham yatra organized by them was spiritually uplifting. Their local guides made all the difference in understanding each sacred site."
              </p>
              <div className="flex items-center">
                <img src="/images/client-3.jpg" alt="Happy Client" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <h4 className="font-bold">Rohit Desai</h4>
                  <p className="text-blue-200">Pune, Spiritual Tour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg mb-8">
              Have questions about your dream vacation? Our travel experts are ready to help you plan every detail.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-blue-600 text-2xl mr-4 mt-1">
                  <FaPhone />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <a href="tel:+919422401225" className="text-lg hover:text-blue-600 transition">
                    +91 94224 01225
                  </a>
                  <p className="text-gray-600 text-sm">Mon-Sun, 8AM to 8PM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-green-600 text-2xl mr-4 mt-1">
                  <FaWhatsapp />
                </div>
                <div>
                  <h3 className="font-bold text-lg">WhatsApp</h3>
                  <a 
                    href="https://wa.me/919422401225" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg hover:text-green-600 transition"
                  >
                    Message Now
                  </a>
                  <p className="text-gray-600 text-sm">Instant response during business hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-red-600 text-2xl mr-4 mt-1">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Visit Us</h3>
                  <address className="not-italic">
                    1, Laxmi Heights, 63, Mangalwar Peth,<br />
                    Opp. Jyotiba Temple,<br />
                    Karad - 415 110 (MS) INDIA
                  </address>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 font-medium">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 font-medium">Your Travel Plans</label>
                <textarea 
                  id="message" 
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about your dream trip..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Get Free Consultation
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 rounded-xl overflow-hidden shadow-2xl">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.504425097256!2d74.18194227580952!3d17.291194605567846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc183aa3557bd5f%3A0xc2de5ed4ee22c2e3!2sColumbus%20Tours!5e0!3m2!1sen!2sin!4v1744154063335!5m2!1sen!2sin"
            width="100%"
            height="450"
            className="border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1976D2] to-[#D32F2F] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919422401225"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#43A047] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#388E3C] transition transform hover:scale-105"
            >
              <FaWhatsapp className="text-xl" /> Chat on WhatsApp
            </a>
            <a
              href="tel:+919422401225"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1976D2] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              <FaPhone /> Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}