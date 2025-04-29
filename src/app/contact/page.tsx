"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import ContactInfoCard from "../../components/ContactInfoCard";

const tabContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const faqs = [
  {
    question: "What types of tours do you offer?",
    answer: "We offer a variety of tours including cultural, adventure, and leisure tours both domestically and internationally. From heritage walks to wildlife safaris, we curate experiences that showcase the best of each destination.",
  },
  {
    question: "How can I book a tour?",
    answer: "Every tour on our website features a WhatsApp button for seamless booking. Simply click the button to connect with our travel consultants via WhatsApp and finalize your booking. Alternatively, you can book through our website or contact us directly via phone or email at columbustours@gmail.com.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Our cancellation policy varies depending on the tour package. Generally, cancellations made 30+ days before departure receive a full refund, 15-29 days receive 50% refund, and less than 14 days are non-refundable. Please refer to specific tour details for exact terms.",
  },
  {
    question: "Do you offer group discounts?",
    answer: "Yes, we offer attractive discounts for group bookings. Groups of 5-9 receive 5% off, 10-15 get 10% off, and larger groups can negotiate custom packages. Family packages and corporate retreats are our specialties.",
  },
  {
    question: "Are your tours suitable for children?",
    answer: "Many of our tours are family-friendly with activities tailored for different age groups. We offer special 'Kids Go Free' promotions during school holidays and can recommend the most suitable tours based on your children's ages and interests.",
  },
  {
    question: "What should I pack for my tour?",
    answer: "We provide a detailed packing list with each tour confirmation, tailored to your destination and activities. Generally, we recommend comfortable walking shoes, weather-appropriate clothing, essential medications, and any special equipment needed for adventure activities.",
  },
  {
    question: "Do you provide visa assistance?",
    answer: "Yes, we offer comprehensive visa assistance services including documentation support, application guidance, and updates on visa requirements for all our international tour destinations.",
  },
  {
    question: "What safety measures do you have in place?",
    answer: "Your safety is our top priority. All our tours comply with local safety regulations, our guides are first-aid certified, vehicles are regularly inspected, and we maintain 24/7 emergency support during tours.",
  },
];

export default function Contact() {
  const [activeTab, setActiveTab] = useState<"form" | "faq" | "locations">("form");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>Contact Us | Columbus Tours</title>
        <meta
          name="description"
          content="Get in touch with Columbus Tours for travel inquiries, bookings, and customer support. We're here to help plan your perfect vacation."
        />
      </Head>

      <div className="bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 text-[#D32F2F]">Connect With Us</h1>
            <p className="text-xl text-[#333333] max-w-3xl mx-auto">
              We&apos;re here to help you plan your perfect journey...
            </p>
          </motion.div>

          {/* Tabs Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl bg-[#F7F7F7] p-1 shadow-md border border-gray-200">
              {(["form", "faq", "locations"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-lg font-medium rounded-lg transition-all ${
                    activeTab === tab
                      ? "bg-[#D32F2F] text-white shadow-sm"
                      : "text-[#333333] hover:text-[#D32F2F] hover:bg-red-50"
                  }`}
                >
                  {tab === "form" ? "Contact Info" : tab === "faq" ? "FAQs" : "Our Locations"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {/* Contact Info Tab */}
              {activeTab === "form" && (
                <motion.div
                  key="form"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid lg:grid-cols-3 gap-8"
                >
                  {/* Main Contact Information */}
                  <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                          <svg className="h-6 w-6 text-[#D32F2F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Main Office
                        </h3>
                        <p className="text-gray-600">
                          1, Laxmi Heights, 63, Mangalwar Peth,
                          <br />
                          Opp. Jyotiba Temple,
                          <br />
                          Karad - 415 110 (MS) INDIA
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                          <svg className="h-6 w-6 text-[#D32F2F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Contact Details
                        </h3>
                        <p className="text-gray-600">
                          <span className="font-medium">Phone:</span> +91 94224 01225
                          <br />
                          <span className="font-medium">WhatsApp:</span> +91 94224 01225
                          <br />
                          <span className="font-medium">Email:</span> columbustours@gmail.com
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                          <svg className="h-6 w-6 text-[#D32F2F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Office Hours
                        </h3>
                        <p className="text-gray-600">
                          Monday - Saturday: 10:00 AM - 6:30 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                      <div className="bg-red-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Contact Us?</h3>
                        <p className="text-gray-600">
                          Our travel experts are ready to assist with tour inquiries, bookings, or any travel-related questions. Reach out via phone, WhatsApp, or email, and let’s start planning your next adventure!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-2xl shadow-xl p-8"
                    >
                      <ContactInfoCard />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white rounded-2xl shadow-xl p-8"
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
                      <div className="flex space-x-4 mb-6">
                        <a
                          href="https://facebook.com/columbustours"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          className="text-gray-600 hover:text-[#D32F2F] transition-colors duration-200"
                        >
                          <FaFacebook size={28} />
                        </a>
                        <a
                          href="https://instagram.com/columbustours"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="text-gray-600 hover:text-[#D32F2F] transition-colors duration-200"
                        >
                          <FaInstagram size={28} />
                        </a>
                        <a
                          href="https://youtube.com/@columbustours"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="YouTube"
                          className="text-gray-600 hover:text-[#D32F2F] transition-colors duration-200"
                        >
                          <FaYoutube size={28} />
                        </a>
                      </div>
                      <div className="mt-6">
                        <h4 className="text-lg font-medium text-gray-700 mb-3">Customer Support Hours</h4>
                        <p className="text-gray-600">Monday - Saturday: 10:00 AM - 6:30 PM</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-[#D32F2F] rounded-2xl shadow-xl p-8 text-white"
                    >
                      <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                      <p className="mb-6">Call or WhatsApp our 24/7 emergency travel support line for assistance during your trip.</p>
                      <a
                        href="tel:+919422401225"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-red-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition"
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        +91 94224 01225
                      </a>
                      <a
                        href="https://wa.me/+919422401225"
                        className="inline-flex items-center justify-center px-6 py-3 mt-4 bg-white text-red-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition"
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.099-.372-.273-.644-.421z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.48 2 2 6.48 2 12c0 1.994.703 3.827 1.874 5.275L2 22l4.725-1.874C8.173 21.297 10.006 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.994 0-3.827-.703-5.275-1.874l-.338-.135-3.377 1.34 1.34-3.377-.135-.338C3.703 15.827 3 13.994 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        WhatsApp Us
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* FAQ Tab */}
              {activeTab === "faq" && (
                <motion.div
                  key="faq"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-2xl shadow-xl p-8 sm:p-10"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Find answers to common questions about our tours, bookings, and travel policies.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                        >
                          <h3 className="text-xl font-semibold text-gray-900">{faq.question}</h3>
                          <svg
                            className={`h-6 w-6 text-[#D32F2F] transform transition-transform ${
                              expandedFaq === index ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: expandedFaq === index ? 1 : 0,
                            height: expandedFaq === index ? "auto" : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 text-gray-600">
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 bg-red-50 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      Can&apos;t find what you&apos;re looking for? Our travel experts are ready to help with any questions you may have.
                    </p>
                    <button
                      onClick={() => setActiveTab("form")}
                      className="inline-flex items-center justify-center px-8 py-3 bg-[#D32F2F] text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
                    >
                      Contact Us
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Locations Tab */}
              {activeTab === "locations" && (
                <motion.div
                  key="locations"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="p-8 sm:p-10">
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Office Locations</h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Visit us at our headquarters or connect with our regional offices across India.
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                      {/* Main Office */}
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <svg className="h-6 w-6 text-[#D32F2F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Headquarters
                          </h3>
                          <div className="bg-gray-50 rounded-xl p-6">
                            <address className="not-italic space-y-4">
                              <div>
                                <p className="text-lg font-medium text-gray-900 mb-1">Address</p>
                                <p className="text-gray-600">
                                  1, Laxmi Heights, 63, Mangalwar Peth,
                                  <br />
                                  Opp. Jyotiba Temple,
                                  <br />
                                  Karad - 415 110 (MS) INDIA
                                </p>
                              </div>
                              <div>
                                <p className="text-lg font-medium text-gray-900 mb-1">Phone</p>
                                <p className="text-gray-600">+91 94224 01225</p>
                              </div>
                              <div>
                                <p className="text-lg font-medium text-gray-900 mb-1">WhatsApp</p>
                                <p className="text-gray-600">+91 94224 01225</p>
                              </div>
                              <div>
                                <p className="text-lg font-medium text-gray-900 mb-1">Email</p>
                                <p className="text-gray-600">columbustours@gmail.com</p>
                              </div>
                              <div>
                                <p className="text-lg font-medium text-gray-900 mb-1">Hours</p>
                                <p className="text-gray-600">
                                  Monday - Saturday: 10:00 AM - 6:30 PM
                                  <br />
                                  Sunday: Closed
                                </p>
                              </div>
                            </address>
                          </div>
                        </div>

                        <div className="bg-red-50 rounded-xl p-6">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4">Getting Here</h4>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#D32F2F] mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>5 minutes walk from Karad Railway Station</span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#D32F2F] mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>10 minutes from Karad Bus Stand</span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#D32F2F] mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>Ample parking available</span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#D32F2F] mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>Accessible by public transport</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Map and Regional Offices */}
                      <div className="space-y-8">
                        <div className="h-96 w-full rounded-xl overflow-hidden shadow-lg">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.504425097256!2d74.18194227580952!3d17.291194605567846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc183aa3557bd5f%3A0xc2de5ed4ee22c2e3!2sColumbus%20Tours!5e0!3m2!1sen!2sin!4v1744154063335!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>

                        <div className="bg-yellow-50 rounded-xl p-6">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4">Visiting Tips</h4>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#D32F2F] mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>Best to visit during office hours for immediate assistance</span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#D32F2F] mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>Appointment recommended for detailed tour discussions</span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#D32F2F] mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>Free WiFi available for visitors</span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#D32F2F] mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>Complimentary refreshments for visitors</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4">Regional Offices</h4>
                          <div className="space-y-6">
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Satara Office</h5>
                              <p className="text-gray-600">Ajinkya Colony, Sadar Bazar, Satara, Pirwadi, Maharashtra 415001</p>
                              <p className="text-gray-600">Phone: +91 22 12345678</p>
                              <p className="text-gray-600">Email: columbustours@gmail.com</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CONTACT US SECTION */}
      <section className="w-full bg-gradient-to-br from-[#0A122A] to-[#1B2738] py-24 px-4 relative overflow-hidden  mb-20">
        {/* • ultra-subtle “spotlight” accents */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-44 h-44 rounded-full bg-white/10" />
          <div className="absolute bottom-10 right-24 w-64 h-64 rounded-full bg-white/10" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* ---------- Heading ---------- */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="inline-flex items-center justify-center mb-6 w-full">
              <div className="h-1 w-12 bg-[#F7E7CE]/40 mr-3" />
              <span className="text-[#F7E7CE]/90 font-semibold tracking-wider text-sm uppercase">
                Contact Us
              </span>
              <div className="h-1 w-12 bg-[#F7E7CE]/40 ml-3" />
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#F7E7CE] mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-lg md:text-xl text-[#F7E7CE]/80 max-w-2xl mx-auto">
              Our travel concierges will craft an unforgettable journey for you.
            </p>
          </motion.div>

          {/* ---------- Cards ---------- */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {/* WhatsApp */}
            <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <a
                href="https://wa.me/919422401225"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-white/5 hover:bg-white/[.08] border border-white/10 rounded-xl p-8 h-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group">
                  <div className="w-14 h-14 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-5 group-hover:bg-[#25D366]/30 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#25D366]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#F7E7CE] mb-3">Chat Now</h3>
                  <p className="text-[#F7E7CE]/80 mb-5 text-sm">
                    Instant connection with our team
                  </p>
                  <div className="px-6 py-2 bg-[#25D366] text-white font-medium rounded-full group-hover:bg-[#1DA851] transition-all duration-300 flex items-center justify-center">
                    WhatsApp
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Call */}
            <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <a href="tel:+919422401225">
                <div className="bg-white/5 hover:bg-white/[.08] border border-white/10 rounded-xl p-8 h-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-white/20 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#F7E7CE]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#F7E7CE] mb-3">Call Us</h3>
                  <p className="text-[#F7E7CE]/80 mb-5 text-sm">
                    Speak directly with our experts
                  </p>
                  <div className="px-6 py-2 bg-[#D4AF37] text-[#0A122A] font-semibold rounded-full group-hover:bg-[#c39a2f] transition-all duration-300">
                    +91 94224 01225
                  </div>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* ---------- (Optional additional info / address) ---------- */}
          <motion.div
            className="mt-16 pt-8 border-t border-[#F7E7CE]/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#F7E7CE]/90">
              {/* Add address / email etc. here if needed */}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}