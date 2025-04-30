import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.columbustours.in"),
  title: {
    default: "Columbus Tours | Discover Your Perfect Vacation",
    template: "%s | Columbus Tours",
  },
  description:
    "Columbus Tours – your gateway to curated international & domestic journeys. Explore Dubai, Thailand, Bali, and more from our base in Karad, Satara, Maharashtra, India.",
  authors: [
    { name: "Vaishnavi Kulkarni", url: "https://zyberweave.com" },
    { name: "Columbus Tours" },
  ],
  keywords: [
    "travel tours",
    "international tours",
    "domestic tours",
    "vacation packages",
    "Dubai tours",
    "Thailand travel",
    "Bali vacation",
    "luxury tours",
    "honeymoon packages",
    "Karad travel",
    "Satara Maharashtra",
    "India tours"
  ],
  openGraph: {
    title: "Columbus Tours | Discover Your Perfect Vacation",
    description:
      "Book your next trip with Columbus Tours. Handpicked itineraries from Karad, Satara to Dubai, Bali & beyond.",
    url: "https://www.columbustours.in",
    siteName: "Columbus Tours",
    images: [
      {
        url: "https://www.columbustours.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Columbus Tours – Premium Travel Experiences",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ColumbusTours",         // your Twitter handle
    creator: "@VaishnaviKulkarni",  // your personal handle
    title: "Columbus Tours | Curated Journeys from Maharashtra to the World",
    description:
      "Experience the world with Columbus Tours. From Karad & Satara to Dubai, explore curated travel packages you’ll never forget.",
    images: ["https://www.columbustours.in/og-image.jpg"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#D32F2F" },
    { media: "(prefers-color-scheme: dark)", color: "#B71C1C" },
  ],
  viewport: "width=device-width, initial-scale=1.0",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#D32F2F" },
    ],
  },
  verification: {
    google: "your-google-verification-code",
    
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "mr-IN": "/mr",  // if you ever add Marathi locale
    },
  },
  other: {
    // geo tags for Karad / Satara SEO
    "geo.region": "IN-MH",
    "geo.placename": "Karad, Satara, Maharashtra",
    "geo.position": "17.2881;74.1776",
    "ICBM": "17.2881, 74.1776",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <Header />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
