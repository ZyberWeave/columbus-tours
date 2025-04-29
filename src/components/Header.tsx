"use client";
import Link from "next/link";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaBars,
  FaTimes,
  FaSearch,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { allTours, type Tour } from "@/data/toursData";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// Category links for desktop and mobile (using query parameters)
const categoryLinks = ["international", "domestic", "religious", "honeymoon", "cruise"].map(
  (type) => (
    <Link
      key={type}
      href={`/tours?category=${type}`}
      className="cursor-pointer px-3 py-2 font-medium text-sm text-gray-600 hover:text-blue-600"
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Link>
  )
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Tour[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const shouldTransparent = isHome;
  const searchRef = useRef<HTMLDivElement>(null);

  // Simple search handler – using only the tour title for matching
  useEffect(() => {
    if (isSearchOpen) {
      setSearchResults(allTours.slice(0, 5));
    }
  }, [isSearchOpen]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const query = value.toLowerCase().trim();
    
    const results = query === "" 
      ? allTours.slice(0, 5)
      : allTours
          .filter((tour) => tour.title.toLowerCase().includes(query))
          .slice(0, 5);
    
    setSearchResults(results);
  };

  // Debounce helper to prevent too many updates while typing
  const debounce = useCallback(
    <T extends unknown[], R>(func: (...args: T) => R, wait: number): ((...args: T) => void) => {
      let timeout: NodeJS.Timeout;
      return (...args: T) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    },
    []
  );

  // Debounced search update handler
  const updateSearch = useMemo(() => debounce((val: string) => handleSearch(val), 300), [debounce]);

  // Handle Enter key press in search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/tours?search=${encodeURIComponent(searchText)}`);
      setIsSearchOpen(false);
    }
  };

  // Close search dropdown when clicking outside the search box
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".search-result-item")
      ) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Change header background on scroll (for home and about pages)
  useEffect(() => {
    if (shouldTransparent) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [shouldTransparent]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`top-0 left-0 w-full z-50 transition-all duration-300 ${
        shouldTransparent
          ? isScrolled
            ? "fixed bg-black shadow-md"
            : "fixed bg-transparent shadow-none"
          : "sticky bg-white shadow-md"
      }`}
    >
      {/* Top Bar (Desktop) */}
      <div className="hidden lg:flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-2 border-b border-gray-200">
        {/* Social Icons */}
        <div className="flex items-center space-x-4 w-[250px]">
          <a
            href="https://www.instagram.com/tours.columbus"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full ${isHome ? "text-white hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://wa.me/9422401225"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full ${isHome ? "text-white hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <FaWhatsapp size={18} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full ${isHome ? "text-white hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <FaFacebook size={18} />
          </a>
        </div>

        {/* Search Input with Dropdown */}
        <div ref={searchRef} className="flex-1 relative flex justify-center" style={{ maxWidth: "400px", margin: "0 auto" }}>
          <input
            type="text"
            placeholder="Search destinations..."
            className={`w-full py-2 pl-10 pr-10 rounded-full border ${
              isHome
                ? "bg-white/10 border-white/20 text-white placeholder-white/70"
                : "bg-white border-gray-200 text-gray-800 placeholder-gray-400"
            } focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              setIsSearchOpen(true);
              handleSearch("");
            }}
            onKeyDown={handleKeyDown}
            value={searchText}
          />
          <FaSearch
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isHome ? "text-white/70" : "text-gray-400"}`}
            size={14}
          />
          <button
            onClick={() => {
              router.push(`/tours?search=${encodeURIComponent(searchText)}`);
              setIsSearchOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Execute Search"
          >
            <FaSearch size={14} />
          </button>
          {isSearchOpen && (
            <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50">
              {searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((tour) => {
                    const thumb = `/images/tours/${tour.category.toLowerCase()}/${tour.folder}/thumbnail.jpg`;
                    return (
                      <Link
                        key={tour.id}
                        href={`/tours/${tour.slug}`}
                        onClick={() => {
                          console.log(`[desktop] Navigating to tour: /tours/${tour.slug}`);
                          setIsSearchOpen(false);
                        }}
                      >
                        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer search-result-item">
                          <Image src={thumb} alt={tour.title} width={40} height={40} className="rounded" />
                          <span className="text-gray-900">{tour.title}</span>
                        </li>
                      </Link>
                    );
                  })}
                  <li
                    className="px-4 py-2 text-blue-600 hover:underline cursor-pointer text-center border-t"
                    onClick={() => {
                      setIsSearchOpen(false);
                      router.push(`/tours?search=${encodeURIComponent(searchText)}`);
                    }}
                  >
                    Show All
                  </li>
                </ul>
              ) : (
                <div className="px-4 py-2 text-gray-900">No tours found</div>
              )}
            </div>
          )}
        </div>

        {/* Contact Icons */}
        <div className="flex items-center justify-end space-x-4 w-[250px]">
          <a
            href="tel:+919604541294"
            className={`flex items-center space-x-2 p-2 rounded-full ${
              isHome ? "text-white hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaPhone size={18} />
            <span className="text-sm">+919604541294</span>
          </a>
          <a
            href="https://maps.app.goo.gl/QwzV5paRzzCtWkU59"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-2 p-2 rounded-full ${
              isHome ? "text-white hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaMapMarkerAlt size={18} />
            <span className="text-sm">Location</span>
          </a>
        </div>
      </div>

      {/* Desktop Main Navigation */}
      <div className="hidden lg:flex flex-col items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <nav className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 font-medium text-lg ${
                  isHome ? "text-white hover:text-gray-200" : "text-gray-800 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link href="/" className="flex-shrink-0 mx-auto">
            <Image src="/logo.png" alt="Columbus Tours Logo" width={180} height={60} />
          </Link>

          <nav className="flex items-center space-x-8">
            <Link
              href="/tours"
              className={`px-3 py-2 font-medium text-lg ${
                isHome ? "text-white hover:text-gray-200" : "text-gray-800 hover:text-blue-600"
              }`}
            >
              Tours
            </Link>
            <Link
              href="/services"
              className={`px-3 py-2 font-medium text-lg ${
                isHome ? "text-white hover:text-gray-200" : "text-gray-800 hover:text-blue-600"
              }`}
            >
              Services
            </Link>
            <Link
              href="/gallery"
              className={`px-3 py-2 font-medium text-lg ${
                isHome ? "text-white hover:text-gray-200" : "text-gray-800 hover:text-blue-600"
              }`}
            >
              Gallery
            </Link>
          </nav>
        </div>
        <div className="flex justify-center space-x-8 mt-2">
          {["international", "domestic", "religious", "honeymoon", "cruise"].map((type) => (
            <Link
              key={type}
              href={`/tours?category=${type}`}
              className={`px-3 py-2 font-medium text-sm ${
                isHome ? "text-white hover:text-gray-200" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Header */}
      <div className={`lg:hidden flex items-center justify-between px-4 py-3 ${isMobileMenuOpen ? "bg-white" : isHome ? "bg-transparent" : "bg-white"} shadow-md`}>
        <Link href="/" className="flex-shrink-0">
          <Image src="/logo.png" alt="Columbus Tours Logo" width={140} height={50} />
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={toggleSearch} className={`p-2 ${isHome && !isMobileMenuOpen ? "text-white hover:bg-white/10" : "text-black hover:bg-gray-100"} rounded-full`}>
            <FaSearch size={20} />
          </button>
          <button onClick={toggleMobileMenu} className={`p-2 ${isHome && !isMobileMenuOpen ? "text-white hover:bg-white/10" : "text-black hover:bg-gray-100"} rounded-full`}>
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] px-4 py-3 bg-white shadow-md z-50">
          <div className="relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              onChange={(e) => updateSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              value={searchText}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50">
                <ul>
                  {searchResults.map((tour) => {
                    const thumb = `/images/tours/${tour.category.toLowerCase()}/${tour.folder}/thumbnail.jpg`;
                    return (
                      <Link
                        key={tour.id}
                        href={`/tours/${tour.slug}`}
                        onClick={() => {
                          console.log(`[mobile] Navigating to tour: /tours/${tour.slug}`);
                          setIsSearchOpen(false);
                        }}
                      >
                        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer search-result-item">
                          <Image src={thumb} alt={tour.title} width={40} height={40} className="rounded" />
                          <span className="text-gray-900">{tour.title}</span>
                        </li>
                      </Link>
                    );
                  })}
                  <li
                    className="px-4 py-2 text-blue-600 hover:underline cursor-pointer text-center border-t"
                    onClick={() => {
                      setIsSearchOpen(false);
                      router.push(`/tours?search=${encodeURIComponent(searchText)}`);
                    }}
                  >
                    Show All
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleMobileMenu} />
          <div className="lg:hidden fixed inset-y-0 left-0 w-[300px] bg-white z-50 mobile-menu-container overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <Image src="/logo.png" alt="Columbus Tours" width={120} height={40} className="h-8 w-auto" />
              <button onClick={toggleMobileMenu} className="p-2 rounded-full hover:bg-gray-100">
                <FaTimes size={20} className="text-gray-800" />
              </button>
            </div>
            <nav className="flex flex-col p-4 border-b">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="px-3 py-2 font-medium text-black hover:text-black"
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-wrap p-4 border-b">
              {React.Children.map(categoryLinks, (link) => 
                React.cloneElement(link as React.ReactElement, {
                  onClick: toggleMobileMenu
                })
              )}
            </div>
            <div className="p-4">
              <div className="flex space-x-4 mb-4">
                <a href="https://www.instagram.com/tours.columbus" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-100">
                  <FaInstagram size={18} className="text-gray-600" />
                </a>
                <a href="https://wa.me/9422401225" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-100">
                  <FaWhatsapp size={18} className="text-gray-600" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-100">
                  <FaFacebook size={18} className="text-gray-600" />
                </a>
              </div>
              <div className="space-y-2">
                <a href="tel:+919604541294" className="flex items-center space-x-2 text-gray-600 hover:text-black">
                  <FaPhone size={16} />
                  <span>+91 96045 41294</span>
                </a>
                <a 
                  href="https://maps.app.goo.gl/QwzV5paRzzCtWkU59" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-black"
                >
                  <FaMapMarkerAlt size={16} />
                  <span>Location</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}