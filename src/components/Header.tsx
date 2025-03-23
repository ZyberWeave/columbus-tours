"use client";
import Link from 'next/link';
import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';import Image from "next/image";


const Header = () => {
  return (
    <header
      style={{
        background: 'transparent',
        position: 'absolute',
        width: '100%',
        zIndex: 10,
        padding: '1rem 2rem',
      }}
    >
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Main Row */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* Left: Social Media Icons */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff' }}
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff' }}
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff' }}
            >
              <FaFacebookF size={24} />
            </a>
          </div>

          {/* Right Navigation and Search */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {/* Search Component */}
            <div style={{ marginRight: '1rem' }}>
              <input
                type="text"
                placeholder="Search..."
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: 'none',
                  color: '#fff',
                  background: 'rgba(255, 255, 255, 0.3)',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                }}
              />
            </div>
            {/* Navigation Links */}
            <ul
              style={{
                display: 'flex',
                listStyle: 'none',
                gap: '1.5rem',
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <Link
                  href="/"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                  }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                  }}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                  }}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                  }}
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Center: Logo, absolute positioned */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Image
                src="/logo.png"
                alt="Columbus Tours Logo"
                style={{ maxWidth: '150px', height: 'auto' }}
              />
            </Link>
          </div>
        </div>

        {/* Sub Navigation Options */}
        <div
          style={{
            marginTop: '0.5rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <Link
            href="/international"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
            }}
          >
            International
          </Link>
          <Link
            href="/world"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
            }}
          >
            World
          </Link>
          <Link
            href="/domestic"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
            }}
          >
            Domestic
          </Link>
          <Link
            href="/family"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
            }}
          >
            Family
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
