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


const Footer: React.FC = () => {
  

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">About Columbus Tours</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We specialize in creating unforgettable travel experiences. Every journey is a story
              worth telling. Explore our curated tours and ignite your wanderlust.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.facebook.com/share/1L2LCZECTb/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/tours.columbus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4 mx-auto">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-start"
                >
                  <span className="hover:underline">About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-start"
                >
                  <span className="hover:underline">Our Tours</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-start"
                >
                  <span className="hover:underline">Contact Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-start"
                >
                  <span className="hover:underline">Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" size={14} />
                <a
                  href="https://maps.app.goo.gl/QwzV5paRzzCtWkU59"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                >
                  1, Laxmi Heights, 63, Mangalwar Peth, Karad, Maharashtra 415110
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 flex-shrink-0" size={14} />
                <a
                  href="tel:8956273122"
                  className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                >
                  +91 89562 73122
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 flex-shrink-0" size={14} />
                <a
                  href="mailto:columbustours@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                >
                  columbustours@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Columbus Tours. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
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