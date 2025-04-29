"use client";
import React from "react";
import Link from "next/link";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { useState } from "react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Top Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Columbus Tours</h3>
            <p className="text-gray-400 text-sm">
              We specialize in creating unforgettable travel experiences. Every journey is a story
              worth telling. Explore our curated tours and ignite your wanderlust.
            </p>
            <div className="flex space-x-3 mt-4">
              <a
                href="https://www.facebook.com/share/1L2LCZECTb/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/tours.columbus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
             
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Our Tours
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Travel Blog
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" size={20} />
                <a
                  href="https://maps.app.goo.gl/QwzV5paRzzCtWkU59"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  1, Laxmi Heights, 63, Mangalwar Peth, Karad, Maharashtra 415110
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" size={18} />
                <a
                  href="tel:8956273122"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  +91 89562 73122
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" size={18} />
                <a
                  href="mailto:columbustours@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  columbustours@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for the latest travel deals, tips, and inspirations.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              {message && (
                <p className={`text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                  {message}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-3 rounded-md sm:rounded-l-lg bg-gray-800 text-white w-full focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md sm:rounded-r-lg transition-colors duration-300 disabled:opacity-50"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Columbus Tours. All rights reserved.
          </p>
          <p className="text-sm text-center sm:text-right mt-2 sm:mt-0">
            Designed & Developed by{" "}
            <a
              href="https://zyberweave.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Zyberweave
            </a>
            {" | "} Contact: +91 89562 73122
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
