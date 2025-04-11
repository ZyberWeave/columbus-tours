"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "../../components/Spinner";
import ContactInfoCard from "../../components/ContactInfoCard";
import SocialMediaIcons from "../../components/SocialMediaIcons";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  phone: yup.string().when("preferredContact", (value, schema) => {
    const contactMethod = Array.isArray(value) ? value[0] : value;
    return contactMethod === "phone"
      ? schema
          .required("Phone number is required for phone contact")
          .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      : schema;
  }),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
  preferredContact: yup.string().required("Preferred contact method is required"),
});

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  preferredContact: string;
}

const tabContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const faqs = [
  {
    question: "What types of tours do you offer?",
    answer: "We offer a variety of tours including cultural, adventure, and leisure tours both domestically and internationally. From heritage walks to wildlife safaris, we curate experiences that showcase the best of each destination."
  },
  {
    question: "How can I book a tour?",
    answer: "You can book a tour through our website or by contacting us directly via phone or email. Our travel consultants are available to help you choose the perfect itinerary and handle all booking details."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Our cancellation policy varies depending on the tour package. Generally, cancellations made 30+ days before departure receive a full refund, 15-29 days receive 50% refund, and less than 14 days are non-refundable. Please refer to specific tour details for exact terms."
  },
  {
    question: "Do you offer group discounts?",
    answer: "Yes, we offer attractive discounts for group bookings. Groups of 5-9 receive 5% off, 10-15 get 10% off, and larger groups can negotiate custom packages. Family packages and corporate retreats are our specialties."
  },
  {
    question: "Are your tours suitable for children?",
    answer: "Many of our tours are family-friendly with activities tailored for different age groups. We offer special 'Kids Go Free' promotions during school holidays and can recommend the most suitable tours based on your children's ages and interests."
  },
  {
    question: "What should I pack for my tour?",
    answer: "We provide a detailed packing list with each tour confirmation, tailored to your destination and activities. Generally, we recommend comfortable walking shoes, weather-appropriate clothing, essential medications, and any special equipment needed for adventure activities."
  },
  {
    question: "Do you provide visa assistance?",
    answer: "Yes, we offer comprehensive visa assistance services including documentation support, application guidance, and updates on visa requirements for all our international tour destinations."
  },
  {
    question: "What safety measures do you have in place?",
    answer: "Your safety is our top priority. All our tours comply with local safety regulations, our guides are first-aid certified, vehicles are regularly inspected, and we maintain 24/7 emergency support during tours."
  }
];

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      preferredContact: "email",
    },
    mode: "onChange"
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [activeTab, setActiveTab] = useState<"form" | "faq" | "locations">("form");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const preferredContact = watch("preferredContact");

  const onSubmit = async (data: FormData) => {
    setServerError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would use:
      /*
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await response.text() || "Failed to submit form");
      }
      */

      reset();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError(error instanceof Error ? error.message : "Something went wrong. Please try again later.");
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>Contact Us | Columbus Tours</title>
        <meta name="description" content="Get in touch with Columbus Tours for travel inquiries, bookings, and customer support. We're here to help plan your perfect vacation." />
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
            <h1 className="text-5xl font-bold mb-6 text-[#D32F2F]">
              Connect With Us
            </h1>
            <p className="text-xl text-[#333333] max-w-3xl mx-auto">
              We're here to help you plan your perfect journey...
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
                      : "text-[#333333] hover:text-[#1976D2] hover:bg-blue-50"
                  }`}
                >
                  {tab === "form" ? "Contact Form" : tab === "faq" ? "FAQs" : "Our Locations"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {/* Contact Form Tab */}
              {activeTab === "form" && (
                <motion.div
                  key="form"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid lg:grid-cols-3 gap-10"
                >
                  <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 sm:p-10">
                    {isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl shadow-sm"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-lg font-medium text-green-800">Message Sent Successfully!</h3>
                            <div className="mt-2 text-green-700">
                              <p>Thank you for contacting us. Our travel expert will get back to you within 24 hours.</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {serverError && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-lg font-medium text-red-800">Error Submitting Form</h3>
                            <div className="mt-2 text-red-700">
                              <p>{serverError}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Name Field */}
                        <div>
                          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="name"
                              type="text"
                              className={`block w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                                errors.name ? "border-red-300" : "border-gray-300"
                              }`}
                              placeholder="John Doe"
                              {...register("name")}
                            />
                            {errors.name && (
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          {errors.name && (
                            <p className="mt-2 text-base text-red-600 font-medium">{errors.name.message}</p>
                          )}
                        </div>

                        {/* Email Field */}
                        <div>
                          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="email"
                              type="email"
                              className={`block w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                                errors.email ? "border-red-300" : "border-gray-300"
                              }`}
                              placeholder="your@email.com"
                              {...register("email")}
                            />
                            {errors.email && (
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          {errors.email && (
                            <p className="mt-2 text-base text-red-600 font-medium">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
                          Phone Number {preferredContact === "phone" && <span className="text-red-500">*</span>}
                        </label>
                        <div className="relative">
                          <input
                            id="phone"
                            type="tel"
                            className={`block w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                              errors.phone ? "border-red-300" : "border-gray-300"
                            }`}
                            placeholder="9876543210"
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        {errors.phone && (
                          <p className="mt-2 text-base text-red-600 font-medium">{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Subject Field */}
                      <div>
                        <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="subject"
                            type="text"
                            className={`block w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                              errors.subject ? "border-red-300" : "border-gray-300"
                            }`}
                            placeholder="Tour Inquiry"
                            {...register("subject")}
                          />
                          {errors.subject && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        {errors.subject && (
                          <p className="mt-2 text-base text-red-600 font-medium">{errors.subject.message}</p>
                        )}
                      </div>

                      {/* Message Field */}
                      <div>
                        <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <textarea
                            id="message"
                            rows={5}
                            className={`block w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                              errors.message ? "border-red-300" : "border-gray-300"
                            }`}
                            placeholder="Tell us about your travel plans..."
                            {...register("message")}
                          />
                          {errors.message && (
                            <div className="absolute top-3 right-3">
                              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        {errors.message && (
                          <p className="mt-2 text-base text-red-600 font-medium">{errors.message.message}</p>
                        )}
                      </div>

                      {/* Preferred Contact Method */}
                      <div>
                        <p className="block text-lg font-medium text-gray-700 mb-3">Preferred Contact Method</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="radio"
                              value="email"
                              className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                              {...register("preferredContact")}
                            />
                            <span className="ml-3 text-lg text-gray-700">
                              <span className="font-medium">Email</span>
                              <span className="block text-sm text-gray-500">We'll respond via email</span>
                            </span>
                          </label>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="radio"
                              value="phone"
                              className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                              {...register("preferredContact")}
                            />
                            <span className="ml-3 text-lg text-gray-700">
                              <span className="font-medium">Phone</span>
                              <span className="block text-sm text-gray-500">We'll call you</span>
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting || !isValid}
                          className={`w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                            isSubmitting ? "opacity-80" : ""
                          }`}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                              <Spinner />
                              <span>Sending...</span>
                            </div>
                          ) : (
                            "Send Message"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Contact Information Sidebar */}
                  <div className="space-y-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <ContactInfoCard />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
                        <SocialMediaIcons />
                        <div className="mt-6">
                          <h4 className="text-lg font-medium text-gray-700 mb-3">Customer Support Hours</h4>
                          <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                          <p className="text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-xl p-8 text-white"
                    >
                      <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                      <p className="mb-6">Call our 24/7 emergency travel support line for assistance during your trip.</p>
                      <a 
                        href="tel:+919422401225" 
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition"
                      >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        +91 94224 01225
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
                            className={`h-6 w-6 text-blue-600 transform transition-transform ${
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
                            height: expandedFaq === index ? "auto" : 0
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

                  <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      Can't find what you're looking for? Our travel experts are ready to help with any questions you may have.
                    </p>
                    <button
                      onClick={() => setActiveTab("form")}
                      className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
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
                            <svg className="h-6 w-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Headquarters
                          </h3>
                          <div className="bg-gray-50 rounded-xl p-6">
                            <address className="not-italic space-y-4">
                              <div>
                                <p className="text-lg font-medium text-gray-900 mb-1">Address</p>
                                <p className="text-gray-600">
                                  1, Laxmi Heights, 63, Mangalwar Peth,<br />
                                  Opp. Jyotiba Temple,<br />
                                  Karad - 415 110 (MS) INDIA
                                </p>
                              </div>
                              <div>
                                <p className="text-lg font-medium text-gray-900 mb-1">Phone</p>
                                <p className="text-gray-600">+91 94224 01225</p>
                              </div>
                              <div>
                                <p className="text-lg font-medium text-gray-900 mb-1">Email</p>
                                <p className="text-gray-600">info@columbustours.com</p>
                              </div>
                              <div>
                                <p className="text-lg font-medium text-gray-900 mb-1">Hours</p>
                                <p className="text-gray-600">
                                  Monday - Saturday: 9:00 AM - 7:00 PM<br />
                                  Sunday: 10:00 AM - 5:00 PM
                                </p>
                              </div>
                            </address>
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4">Getting Here</h4>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>5 minutes walk from Karad Railway Station</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>10 minutes from Karad Bus Stand</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>Ample parking available</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
                              <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>Best to visit during office hours for immediate assistance</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>Appointment recommended for detailed tour discussions</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>Free WiFi available for visitors</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>Complimentary refreshments for visitors</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4">Regional Offices</h4>
                          <div className="space-y-6">
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Mumbai Office</h5>
                              <p className="text-gray-600">12, Nariman Point, Mumbai - 400021</p>
                              <p className="text-gray-600">Phone: +91 22 12345678</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Pune Office</h5>
                              <p className="text-gray-600">34, Bund Garden Road, Pune - 411001</p>
                              <p className="text-gray-600">Phone: +91 20 87654321</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Goa Office</h5>
                              <p className="text-gray-600">56, Calangute Beach Road, Goa - 403516</p>
                              <p className="text-gray-600">Phone: +91 832 9876543</p>
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
    </>
  );
}