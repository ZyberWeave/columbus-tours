"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

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
];

const subNavLinks = [
  { name: "International", href: "/international" },
  { name: "World", href: "/world" },
  { name: "Domestic", href: "/domestic" },
  { name: "Family", href: "/family" },
];

const styles = {
  header: {
    background: "transparent",
    position: "absolute" as "absolute",
    width: "100%",
    zIndex: 10,
    padding: "1rem 2rem",
  },
  navContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  },
  mainRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative" as "relative",
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
    display: "flex", // default for desktop
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 500,
  },
  logoContainer: {
    position: "absolute" as "absolute",
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
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  mobileMenuList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "center" as "center",
  },
  mobileMenuItem: {
    margin: "1.5rem 0",
  },
  mobileSubNav: {
    position: "fixed" as "fixed",
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

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header style={styles.header}>
      <nav style={styles.navContainer}>
        {/* Main Row */}
        <div style={styles.mainRow}>
          {/* Left: Social Media Icons */}
          <div style={styles.socialIcons}>
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
                {link.icon}
              </a>
            ))}
          </div>

          {/* Right Navigation and Search */}
          <div style={styles.rightNav}>
            {/* Mobile Menu Toggle (visible on mobile via CSS media queries) */}
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

          {/* Center: Logo */}
          <div style={styles.logoContainer}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Image src="/logo.png" alt="Columbus Tours Logo" width={150} height={50} style={{ maxWidth: "150px", height: "auto" }} />
            </Link>
          </div>
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
            <ul style={styles.mobileMenuList}>
              {navLinks.map((link, index) => (
                <li key={index} style={styles.mobileMenuItem}>
                  <Link href={link.href} style={{ ...styles.link, fontSize: "1.5rem" }} onClick={toggleMobileMenu}>
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
              <Link key={index} href={link.href} style={{ ...styles.link, fontSize: "1rem" }} onClick={toggleMobileMenu}>
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Responsive styles via styled-jsx */}
      <style jsx>{`
        /* By default, hide desktop elements on small screens */
        .desktop-nav,
        .desktop-sub-nav,
        .desktop-search {
          display: none !important;
        }
        /* Show mobile menu icon on small screens */
        .mobile-menu-icon {
          display: block !important;
        }
        @media (min-width: 769px) {
          /* On larger screens, show desktop elements */
          .desktop-nav,
          .desktop-sub-nav,
          .desktop-search {
            display: flex !important;
          }
          /* Hide mobile elements on larger screens */
          .mobile-menu-icon {
            display: none !important;
          }
          /* Ensure mobile overlays are hidden on desktop */
          .mobile-menu-overlay,
          .mobile-sub-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
