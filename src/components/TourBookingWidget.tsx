import React from "react";
import { Tour } from "@/data/toursData";
import { FaCalendarDay, FaUserFriends } from "react-icons/fa";

interface TourBookingWidgetProps {
  tour: Tour;
  className?: string;
}

const TourBookingWidget: React.FC<TourBookingWidgetProps> = ({ tour, className }) => {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-md border border-gray-200 ${className}`}>
      <h3 className="text-xl font-bold mb-4">Book This Tour</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <span className="text-gray-500">Starting from</span>
          <span className="text-2xl font-bold text-blue-600">
            {tour.startingPrice ? `$${tour.startingPrice}` : "Contact for price"}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Travel Dates</label>
            <div className="relative">
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <FaCalendarDay className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
            <div className="relative">
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none">
                <option>1 traveler</option>
                <option>2 travelers</option>
                <option>3-5 travelers</option>
                <option>6+ travelers</option>
              </select>
              <FaUserFriends className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>

          <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Check Availability
          </button>

          <div className="text-center text-sm text-gray-500">
            or <a href="#" className="text-blue-600 hover:underline">request a custom tour</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourBookingWidget;