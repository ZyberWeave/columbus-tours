"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Social and nav links
const socialLinks = [
  { href: "https://wa.me", icon: <FaWhatsapp size={24} /> },
  { href: "https://instagram.com", icon: <FaInstagram size={24} /> },
  { href: "https://facebook.com", icon: <FaFacebookF size={24} /> },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Tours", href: "/tours" }, // Added Tours link
];

const subNavLinks = [
  { name: "International", href: "/international" },
  { name: "World", href: "/world" },
  { name: "Domestic", href: "/domestic" },
  { name: "Family", href: "/family" },
];

// Inline styles object
const styles: { [key: string]: React.CSSProperties } = {
  navContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  socialIcons: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  rightNav: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mobileMenuIcon: {
    cursor: "pointer",
    marginRight: "1rem",
  },
  searchInput: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "none",
    color: "#fff",
    background: "rgba(255, 255, 255, 0.3)",
    outline: "none",
    fontSize: "0.95rem",
    fontWeight: 500,
  },
  desktopNavList: {
    listStyle: "none",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
    display: "flex",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 500,
  },
  logoContainer: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  subNav: {
    marginTop: "0.5rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  mobileMenuOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  mobileMenuList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "center",
  },
  mobileMenuItem: {
    margin: "1.5rem 0",
  },
  mobileSubNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    padding: "1rem",
    zIndex: 1000,
  },
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Dynamically set header style: transparent & absolute on home, white background & relative elsewhere.
  const headerStyle: React.CSSProperties = {
    background: isHome ? "transparent" : "#1a1a1a",
    position: isHome ? "absolute" : "relative",
    width: "100%",
    zIndex: 1000,
    padding: "1rem 2rem",
  };

  return (
    <header style={headerStyle}>
      <nav style={styles.navContainer}>
        {/* Main Row */}
        <div style={styles.mainRow}>
          {/* Left: Social Media Icons */}
          <div style={styles.socialIcons} className="social-icons">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff" }}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Right Navigation and Search */}
          <div style={styles.rightNav}>
            {/* Mobile Menu Toggle */}
            <div
              style={styles.mobileMenuIcon}
              className="mobile-menu-icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes size={24} color="#fff" />
              ) : (
                <FaBars size={24} color="#fff" />
              )}
            </div>

            {/* Desktop Search */}
            <div style={{ marginRight: "1rem" }} className="desktop-search">
              <input
                type="text"
                placeholder="Search..."
                style={styles.searchInput}
              />
            </div>

            {/* Desktop Navigation Links */}
            <ul style={styles.desktopNavList} className="desktop-nav">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} style={styles.link}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center: Logo */}
          <div style={styles.logoContainer}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Image
                src="/logo.png"
                alt="Columbus Tours Logo"
                width={150}
                height={50}
                style={{ maxWidth: "150px", height: "auto" }}
              />
            </Link>
          </div>
        </div>

        {/* Desktop Sub Navigation */}
        <div style={styles.subNav} className="desktop-sub-nav">
          {subNavLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              style={{ ...styles.link, fontSize: "0.9rem" }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div style={styles.mobileMenuOverlay}>
            {/* Cancel Button */}
            <button className="cancel-button" onClick={toggleMobileMenu}>
              Cancel
            </button>
            <ul style={styles.mobileMenuList}>
              {navLinks.map((link, index) => (
                <li key={index} style={styles.mobileMenuItem}>
                  <Link
                    href={link.href}
                    style={{ ...styles.link, fontSize: "1.5rem" }}
                    onClick={toggleMobileMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mobile Sub Navigation */}
        {isMobileMenuOpen && (
          <div style={styles.mobileSubNav}>
            {subNavLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                style={{ ...styles.link, fontSize: "1rem" }}
                onClick={toggleMobileMenu}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Responsive styles via styled-jsx */}
      <style jsx>{`
        /* Hide desktop elements on small screens */
        .desktop-nav,
        .desktop-sub-nav,
        .desktop-search {
          display: none !important;
        }
        /* Show mobile menu icon on small screens */
        .mobile-menu-icon {
          display: block !important;
        }
        /* Style for the cancel button in mobile overlay */
        .cancel-button {
          background: none;
          border: 2px solid #fff;
          color: #fff;
          font-size: 1.2rem;
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        .cancel-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        @media (min-width: 769px) {
          /* On larger screens, show desktop elements */
          .desktop-nav,
          .desktop-sub-nav,
          .desktop-search {
            display: flex !important;
          }
          /* Hide mobile menu icon on larger screens */
          .mobile-menu-icon {
            display: none !important;
          }
          /* Hide mobile overlays on larger screens */
          .mobile-menu-overlay,
          .mobile-sub-nav {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          /* Adjust social icons on mobile to avoid collisions */
          .social-icons {
            gap: 0.5rem;
          }
          .social-icons a svg {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </header>
  );
}
