"use client";
import React from "react";

// Data array to store all service information
const services = [
  {
    id: 1,
    title: "Comprehensive Travel Planning",
    description: "At Columbus Tours, we believe that every great journey begins with thoughtful planning. Our comprehensive travel planning services are designed to transform your travel dreams into a reality tailored just for you. We start by getting to know your interests, budget, and the destinations you're passionate about. Whether you envision a relaxing beach vacation, an action-packed adventure, or a cultural immersion, our expert travel consultants work closely with you to craft an itinerary that captures your vision. Every detail—from sightseeing routes and restaurant reservations to local experiences and leisure activities—is meticulously arranged to ensure a seamless, enjoyable, and unforgettable trip."
  },
  {
    id: 2,
    title: "Customized Itineraries",
    description: "We understand that no two travelers are alike. That's why our customized itineraries are created with your personal interests in mind. After an in-depth consultation, our team designs a travel plan that highlights both must-see landmarks and hidden gems unique to each destination. Our itineraries provide the flexibility to explore at your own pace while ensuring that all logistics are taken care of—from transportation and accommodations to exclusive local experiences. Enjoy a travel experience that reflects your personality and meets your expectations, whether you are a solo explorer, a couple, or a family."
  },
  {
    id: 3,
    title: "Group Tours and Tailor-Made Packages",
    description: "For those who love to share travel experiences with others, Columbus Tours offers an extensive range of group tours and tailor-made packages. Our group tours bring together like-minded travelers for exciting journeys led by knowledgeable local guides. Enjoy the camaraderie of shared adventures while experiencing the best that each destination has to offer. We also design tailor-made packages for families, friends, or corporate groups that combine structured activities with ample free time, allowing you to create lasting memories together while enjoying a stress-free travel experience."
  },
  {
    id: 4,
    title: "Visa Assistance and Travel Documentation",
    description: "International travel can sometimes be overwhelming when it comes to visas and documentation. Our visa assistance services are here to simplify that process. Our experienced team stays updated with the latest travel regulations and visa requirements for destinations around the world. We help you prepare and submit all necessary paperwork accurately and on time, ensuring that you have the proper documentation to enjoy a hassle-free journey. With Columbus Tours handling your travel paperwork, you can focus on the excitement of your upcoming adventure."
  },
  {
    id: 5,
    title: "Hotel Reservations and Accommodation",
    description: "The perfect stay can make or break a trip, and Columbus Tours takes pride in securing accommodations that enhance your overall experience. We work with a diverse portfolio of hotels, resorts, and vacation rentals that cater to every taste and budget. From luxury resorts with world-class amenities to charming boutique hotels in historic districts, our accommodation services ensure that you have a comfortable, convenient, and memorable place to call home while traveling. Our personalized recommendations and streamlined booking process guarantee that your stay is as enjoyable as your journey."
  },
  {
    id: 6,
    title: "Flight Bookings and Transportation Logistics",
    description: "Efficient and reliable transportation is essential for a successful trip. Columbus Tours offers comprehensive flight booking and transportation logistics services to ensure that you travel smoothly between destinations. We partner with reputable airlines to secure competitive fares and flexible travel options that fit your schedule. In addition, our team arranges ground transportation—including airport transfers, car rentals, and local transit—to ensure that every leg of your journey is taken care of. With meticulous attention to detail, we manage all aspects of your travel logistics so you can focus on enjoying your adventure."
  },
  {
    id: 7,
    title: "Local Guides and Cultural Experiences",
    description: "One of the most rewarding aspects of travel is the opportunity to immerse yourself in a new culture. Our local guides are experts in their regions and provide insights that go beyond the usual tourist attractions. They help you discover the hidden stories, traditions, and flavors of each destination. From exploring ancient ruins and historic landmarks to participating in local festivals and culinary tours, our cultural experiences are designed to offer a deep, authentic connection to the places you visit. With our local guides, you can gain a richer understanding of the history and heritage of each destination."
  },
  {
    id: 8,
    title: "Travel Insurance and Risk Management",
    description: "Traveling always comes with a degree of unpredictability, which is why we offer robust travel insurance and risk management services. Our travel insurance policies are designed to cover unexpected events such as trip cancellations, medical emergencies, and lost luggage. We work with trusted insurance providers to offer coverage that protects your investment and ensures peace of mind throughout your journey. In addition, our risk management services include pre-trip advisories, up-to-date local safety information, and 24/7 emergency assistance. With Columbus Tours, you can travel confidently knowing that you are protected from unforeseen circumstances."
  },
  {
    id: 9,
    title: "Culinary Tours and Gastronomic Experiences",
    description: "Food is a gateway to understanding the soul of a destination, and our culinary tours are crafted to take you on a journey of flavors. Columbus Tours offers immersive gastronomic experiences that allow you to savor the local cuisine—from street food adventures and market tours to fine dining experiences at renowned restaurants. Our culinary experts introduce you to traditional recipes, unique ingredients, and the stories behind beloved dishes. These tours not only delight your taste buds but also provide a deeper appreciation for the cultural heritage and culinary traditions of each region."
  },
  {
    id: 10,
    title: "24/7 Customer Support and Assistance",
    description: "Exceptional customer service is at the heart of everything we do. Columbus Tours provides round-the-clock customer support to assist you before, during, and after your trip. Whether you need help with last-minute changes, emergency assistance, or simply have a question about your itinerary, our dedicated support team is available 24/7. We pride ourselves on our responsiveness and our commitment to ensuring that every aspect of your travel experience is smooth and stress-free. Our proactive approach means that help is always just a phone call or message away."
  },
  {
    id: 11,
    title: "Eco-Friendly and Sustainable Travel Options",
    description: "We recognize the importance of responsible tourism, which is why Columbus Tours is committed to promoting eco-friendly and sustainable travel practices. Our sustainable travel options focus on minimizing the environmental impact of your journey while providing enriching and authentic experiences. We work with local partners who prioritize conservation and ethical practices, ensuring that your travel choices contribute to the well-being of local communities and the preservation of natural resources. By choosing our sustainable travel packages, you help foster a greener future while enjoying an unforgettable adventure."
  },
  {
    id: 12,
    title: "Tailored Corporate and Group Travel Solutions",
    description: "In addition to leisure travel, Columbus Tours offers specialized solutions for corporate and group travel. We understand that business trips, incentive travel, and large group excursions require a unique approach. Our dedicated corporate travel team collaborates closely with your organization to plan itineraries that maximize efficiency and ensure a smooth experience for all participants. Whether you're organizing an international conference, a team-building retreat, or a family reunion, our comprehensive services cover every detail—from logistics and accommodations to group activities and dining arrangements. Our goal is to provide a seamless travel experience that meets the high standards of corporate and group clients."
  },
  {
    id: 13,
    title: "Personalized Concierge and Lifestyle Services",
    description: "Beyond standard travel arrangements, Columbus Tours offers personalized concierge and lifestyle services that elevate your overall experience. Our concierge team is available to assist with special requests, such as securing reservations at exclusive restaurants, arranging private tours, and organizing luxury experiences tailored to your unique interests. Whether you're celebrating a milestone event or simply wish to indulge in a premium travel experience, our personalized services ensure every detail is curated to perfection. With a focus on quality, responsiveness, and a high level of personal attention, we are dedicated to making your trip as memorable and enjoyable as possible."
  }
];

// Service article component to render each service
const ServiceArticle = ({ title, description }) => (
  <article className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
    <h2 className="text-2xl font-semibold mb-4 text-blue-800">{title}</h2>
    <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
  </article>
);

// Main component
export default function ServicesPage() {
  return (
    <main className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-center text-blue-900">
          Our Services
        </h1>
        <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
          Discover how Columbus Tours can make your next journey extraordinary with our comprehensive range of travel services.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        {services.map((service) => (
          <ServiceArticle 
            key={service.id}
            title={service.title}
            description={service.description}
          />
        ))}
      </section>

      <footer className="mt-16 p-6 bg-blue-900 text-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-lg mb-6">
          At Columbus Tours, our diverse range of services is designed to cover every
          aspect of your travel journey, ensuring that your experience is both
          extraordinary and stress-free. We invite you to explore our services further and discover how we can help
          turn your travel aspirations into reality.
        </p>
        <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors duration-300">
          Contact Us Today
        </button>
      </footer>
    </main>
  );
}