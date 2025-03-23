// components/ContactInfoCard.tsx
import React from "react";

const ContactInfoCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <svg
            className="h-5 w-5 text-blue-500 mt-0.5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-900">Email Us</p>
            <a href="mailto:info@example.com" className="text-sm text-blue-600 hover:underline">
              info@example.com
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <svg
            className="h-5 w-5 text-blue-500 mt-0.5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
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
          <div>
            <p className="text-sm font-medium text-gray-900">Call Us</p>
            <a href="tel:+1234567890" className="text-sm text-blue-600 hover:underline">
              +1 (234) 567-890
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <svg
            className="h-5 w-5 text-blue-500 mt-0.5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-900">Main Office</p>
            <p className="text-sm text-gray-600">
            91, Laxmi Heights, 63<br />
            Mangalwar Peth, Opp. Jyotiba Temple<br />
            Karad - 415 110 (MS) INDIA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;