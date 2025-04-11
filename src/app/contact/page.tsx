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
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <h1 className="text-5xl font-bold mb-4 text-center text-black">Get In Touch</h1>
      <p className="text-black text-xl text-center mb-10">
        We&apos;d love to hear from you. Send us a message or find other ways to connect.
      </p>

      {/* Tabs Navigation */}
      <div className="flex border-b-2 border-gray-300 mb-10 bg-white">
        {(["form", "faq", "locations"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-lg font-medium ${
              activeTab === tab 
                ? "border-b-2 border-blue-600 text-blue-600" 
                : "text-black hover:text-blue-600"
            }`}
          >
            {tab === "form" ? "Contact Form" : tab === "faq" ? "FAQs" : "Our Locations"}
          </button>
        ))}
      </div>

      {/* Contact Form Tab */}
      {activeTab === "form" && (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-10">
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Form fields styling updates */}
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-3 text-black">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-2 text-base text-red-600 font-medium">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-3 text-black">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-2 text-base text-red-600 font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-lg font-medium mb-3 text-black">
                  Phone Number {preferredContact === "phone" && <span className="text-red-500">*</span>}
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-2 text-base text-red-600 font-medium">{errors.phone.message}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-lg font-medium mb-3 text-black">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  className={`w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="mt-2 text-base text-red-600 font-medium">{errors.subject.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-lg font-medium mb-3 text-black">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-2 text-base text-red-600 font-medium">{errors.message.message}</p>
                )}
              </div>

              {/* Preferred Contact Method */}
              <div>
                <p className="block text-lg font-medium mb-3 text-black">Preferred Contact Method</p>
                <div className="flex space-x-8">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="email"
                      className="h-6 w-6 text-blue-600 border-gray-300 focus:ring-blue-500"
                      {...register("preferredContact")}
                    />
                    <span className="ml-3 text-lg text-black">Email</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="phone"
                      className="h-6 w-6 text-blue-600 border-gray-300 focus:ring-blue-500"
                      {...register("preferredContact")}
                    />
                    <span className="ml-3 text-lg text-black">Phone</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
                >
                  {isSubmitting ? <Spinner /> : "Submit Message"}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-8 text-black">
            <ContactInfoCard />
            <SocialMediaIcons />
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div className="bg-white rounded-xl shadow-lg p-10">
          <h2 className="text-4xl font-bold mb-10 text-black">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-black">What types of tours do you offer?</h3>
              <p className="text-lg text-black">
                We offer a variety of tours including cultural, adventure, and leisure tours both domestically and internationally.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-black">How can I book a tour?</h3>
              <p className="text-lg text-black">
                You can book a tour through our website or by contacting us directly via phone or email.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-black">What is your cancellation policy?</h3>
              <p className="text-lg text-black">
                Our cancellation policy varies depending on the tour package. Please refer to the specific tour details for more information.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-black">Do you offer group discounts?</h3>
              <p className="text-lg text-black">
                Yes, we offer discounts for group bookings. Please contact us for more details.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-black">Are your tours suitable for children?</h3>
              <p className="text-lg text-black">
                Many of our tours are family-friendly. Please check the tour details or contact us to ensure suitability for children.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-black">What should I pack for my tour?</h3>
              <p className="text-lg text-black">
                Packing recommendations vary by destination and season. We provide a packing list with each tour confirmation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Locations Tab */}
      {activeTab === "locations" && (
        <div className="bg-white rounded-xl shadow-lg p-10">
          <h2 className="text-4xl font-bold mb-10 text-black">Our Location</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-black">Office</h3>
                <address className="not-italic text-lg text-black space-y-2">
                  <div>
                    <span className="font-semibold">Address:</span><br />
                    1, Laxmi Heights, 63, Mangalwar Peth,<br />
                    Opp. Jyotiba Temple,<br />
                    Karad - 415 110 (MS) INDIA
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span><br />
                    +91 94224 01225
                  </div>
                  <div>
                    <span className="font-semibold">Hours:</span><br />
                    Monday: 10:00 AM - 6:30 PM<br />
                    Tuesday: 10:00 AM - 6:30 PM<br />
                    Wednesday: 10:00 AM - 6:30 PM<br />
                    Thursday: 10:00 AM - 6:30 PM<br />
                    Friday: 10:00 AM - 6:30 PM<br />
                    Saturday: 10:00 AM - 6:30 PM<br />
                    Sunday: Closed
                  </div>
                </address>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-black">Getting Here</h3>
                <ul className="space-y-2 text-black">
                  <li>• 5 minutes walk from Karad Railway Station</li>
                  <li>• 10 minutes from Karad Bus Stand</li>
                  <li>• Ample parking available</li>
                  <li>• Accessible by public transport</li>
                </ul>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-6">
              <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md">
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
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-black">Visiting Tips</h3>
                <ul className="space-y-2 text-black">
                  <li>• Best to visit during office hours</li>
                  <li>• Appointment recommended for detailed tour discussions</li>
                  <li>• Free WiFi available for visitors</li>
                  <li>• Complimentary parking available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
