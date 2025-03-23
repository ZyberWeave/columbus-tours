"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Social links with provided details
const socialLinks = [
  { href: "https://wa.me/9422401225", icon: <FaWhatsapp size={24} /> },
  { href: "https://www.instagram.com/tours.columbus?igsh=eXh4MjU3aWw0cjFr", icon: <FaInstagram size={24} /> },
  { href: "https://facebook.com", icon: <FaFacebookF size={24} /> },
];

// Main navigation links
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Tours", href: "/tours" },
];

// Sub-navigation links
const subNavLinks = [
  { name: "International", href: "/international" },
  { name: "World", href: "/world" },
  { name: "Domestic", href: "/domestic" },
  { name: "Family", href: "/family" },
];

// Styles object for consistent styling
const styles = {
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
    paddingTop: "3rem",
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

  // Header style: transparent & absolute on home; dark & relative elsewhere
  const headerStyle = {
    background: isHome ? "transparent" : "#1a1a1a",
    position: isHome ? "absolute" : "relative",
    width: "100%",
    zIndex: 1000,
    padding: "1rem 2rem",
  } as React.CSSProperties;

  return (
    <header style={headerStyle}>
      <nav style={styles.navContainer}>
        {/* Main Row */}
        <div style={styles.mainRow}>
          {/* Social Media Icons */}
          <div style={styles.socialIcons} className="social-icons">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
                {link.icon}
              </a>
            ))}
          </div>

          {/* Center: Logo */}
          <div style={styles.logoContainer}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Image src="/logo.png" alt="Columbus Tours Logo" width={150} height={50} style={{ maxWidth: "150px", height: "auto" }} />
            </Link>
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
              {isMobileMenuOpen ? <FaTimes size={24} color="#fff" /> : <FaBars size={24} color="#fff" />}
            </div>

            {/* Desktop Search */}
            <div style={{ marginRight: "1rem" }} className="desktop-search">
              <input type="text" placeholder="Search..." style={styles.searchInput} />
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
        </div>

        {/* Mobile Search Bar */}
        <div className="mobile-search-bar">
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              maxWidth: "300px",
            }}
          />
        </div>

        {/* Desktop Sub Navigation */}
        <div style={styles.subNav} className="desktop-sub-nav">
          {subNavLinks.map((link, index) => (
            <Link key={index} href={link.href} style={{ ...styles.link, fontSize: "0.9rem" }}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div style={styles.mobileMenuOverlay}>
            {/* Close Button */}
            <button 
              className="cancel-button" 
              onClick={toggleMobileMenu} 
              aria-label="Close Menu"
              style={{ 
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                zIndex: 1100
              }}
            >
              <FaTimes size={30} color="#fff" />
            </button>
            <ul style={styles.mobileMenuList}>
              {navLinks.map((link, index) => (
                <li key={index} style={styles.mobileMenuItem}>
                  <Link href={link.href} style={{ ...styles.link, fontSize: "1.5rem" }} onClick={toggleMobileMenu}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Mobile Social Media Icons */}
            <div className="mobile-social-icons" style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Sub Navigation */}
        {isMobileMenuOpen && (
          <div style={styles.mobileSubNav}>
            {subNavLinks.map((link, index) => (
              <Link key={index} href={link.href} style={{ ...styles.link, fontSize: "1rem" }} onClick={toggleMobileMenu}>
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style jsx>{`
        /* Hide desktop elements on small screens */
        @media (max-width: 1024px) {
          .desktop-nav,
          .desktop-sub-nav,
          .desktop-search {
            display: none !important;
          }
          /* Show mobile menu icon on small screens */
          .mobile-menu-icon {
            display: block !important;
          }
          /* Hide social icons from header row on mobile */
          .social-icons {
            display: none !important;
          }
          .mobile-search-bar {
            display: block;
            margin-top: 1rem;
            text-align: center;
          }
        }
        
        @media (min-width: 1025px) {
          /* On larger screens, show desktop elements */
          .desktop-nav,
          .desktop-sub-nav,
          .desktop-search {
            display: flex !important;
          }
          /* Hide mobile menu icon, mobile search bar on larger screens */
          .mobile-menu-icon,
          .mobile-search-bar {
            display: none !important;
          }
          .social-icons {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}