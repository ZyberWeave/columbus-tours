"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "../../components/Spinner";
import ContactInfoCard from "../../components/ContactInfoCard";
import SocialMediaIcons from "../../components/SocialMediaIcons";

const schema = yup.object().shape({
    name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
    phone: yup.string().when("preferredContact", (value, schema) => {
      const contactMethod = Array.isArray(value) ? value[0] : value;
      return contactMethod === "phone"
        ? schema.required("Phone number is required for phone contact")
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

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      preferredContact: "email",
    },
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [activeTab, setActiveTab] = useState<"form" | "faq" | "locations">("form");

  const preferredContact = watch("preferredContact");

  const onSubmit = async (data: FormData) => {
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await response.text() || "Failed to submit form");
      }

      reset();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError(error instanceof Error ? error.message : "Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-center">Get In Touch</h1>
      <p className="text-gray-600 text-center mb-8">We&apos;d love to hear from you. Send us a message or find other ways to connect.</p>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        {(["form", "faq", "locations"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "form" ? "Contact Form" : tab === "faq" ? "FAQs" : "Our Locations"}
          </button>
        ))}
      </div>

      {/* Contact Form Tab */}
      {activeTab === "form" && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            {isSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-500 text-green-700 rounded-md">
                <p className="font-medium">Thank you!</p>
                <p>Your message has been sent. We&apos;ll be in touch soon.</p>
              </div>
            )}

            {serverError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-500 text-red-700 rounded-md">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number {preferredContact === "phone" && <span className="text-red-500">*</span>}
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              {/* Preferred Contact Method */}
              <div>
                <p className="block text-sm font-medium mb-2">Preferred Contact Method</p>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="email"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      {...register("preferredContact")}
                    />
                    <span className="ml-2 text-sm text-gray-700">Email</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="phone"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      {...register("preferredContact")}
                    />
                    <span className="ml-2 text-sm text-gray-700">Phone</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Spinner /> : "Submit Message"}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            <ContactInfoCard />
            <SocialMediaIcons />
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          {/* FAQ content */}
          {/* ... (same as before) ... */}
        </div>
      )}

      {/* Locations Tab */}
      {activeTab === "locations" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Our Locations</h2>
          {/* Locations content */}
          {/* ... (same as before) ... */}
        </div>
      )}
    </div>
  );
}
