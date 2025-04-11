"use client";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        
        <p className="text-gray-700 text-lg mb-4">
          Your privacy is critically important to us at Columbus Tours. This Privacy Policy describes the practices
          that govern the collection, use, disclosure, and storage of your personal information. By accessing or using
          our website, you agree to the terms outlined in this policy.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We may collect information that you voluntarily provide to us when you register for our services, book a tour,
          subscribe to our newsletter, or otherwise interact with our website. Such information may include your name,
          email address, phone number, and payment details. Additionally, we may automatically collect non-personal
          information such as browser type, IP address, and usage data through cookies and similar tracking technologies.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>To process and manage your tour bookings and account information.</li>
          <li>To send you updates, newsletters, and promotional offers if you have opted in.</li>
          <li>To improve our website and customer experience using aggregated data and analytics.</li>
          <li>To comply with legal and regulatory requirements as needed.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Sharing and Disclosure</h2>
        <p className="text-gray-700 mb-4">
          We do not sell or rent your personal information to third parties. We may share your data with trusted partners
          and service providers (for example, payment processors or email marketing services) who are contractually
          obligated to safeguard your data and use it only for specific purposes. We may also disclose your information
          if required by law or in response to valid legal requests.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
        <p className="text-gray-700 mb-4">
          We implement various security measures to protect your personal information from unauthorized access,
          disclosure, alteration, or destruction. However, please be aware that no security system is completely
          foolproof. In the event of a data breach, we will promptly notify you and take all necessary steps as required
          by law.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h2>
        <p className="text-gray-700 mb-4">
          Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data, or to
          restrict or object to its processing. To exercise any of these rights, please contact us at{" "}
          <a href="mailto:info@columbustours.com" className="text-blue-600 hover:underline">
            info@columbustours.com
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies and Tracking Technologies</h2>
        <p className="text-gray-700 mb-4">
          Our website uses cookies and similar technologies to improve your experience and to collect non-personal
          information. You can adjust your browser settings to refuse cookies, though this may affect your access to some
          parts of our website.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to modify this Privacy Policy at any time. Any changes will be posted on this page, and
          the revised policy will be effective immediately upon posting. Your continued use of our website following
          any modifications will constitute your acceptance of the changes.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions or concerns regarding this Privacy Policy or our privacy practices, please contact us
          at:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            Email:{" "}
            <a href="mailto:info@columbustours.com" className="text-blue-600 hover:underline">
              info@columbustours.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href="tel:+18956273122" className="text-blue-600 hover:underline">
              +1 (895) 627-3122
            </a>
          </li>
          <li>
            Website:{" "}
            <a
              href="https://zyberweave.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              zyberweave.com
            </a>
          </li>
        </ul>

        <p className="text-gray-500 text-center text-sm mt-8">
          &copy; {new Date().getFullYear()} Columbus Tours. All rights reserved.
        </p>
      </section>
    </main>
  );
}
