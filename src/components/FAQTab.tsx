"use client";
import Spinner from "../../components/Spinner";

const faqItems = [
  {
    question: "What types of tours do you offer?",
    answer:
      "We offer a variety of tours including cultural, adventure, and leisure tours both domestically and internationally. Our tours cater to different interests and age groups.",
  },
  {
    question: "How can I book a tour?",
    answer:
      "You can book a tour through our website or by contacting us directly via phone or email. Our booking process is simple and secure.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Our cancellation policy varies depending on the tour package. Generally, cancellations made 30+ days before departure receive a full refund, 15-29 days receive 50% refund, and less than 15 days are non-refundable. Please refer to the specific tour details for exact policies.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes, we offer special discounts for group bookings of 10 or more people. Group rates can save you up to 20% on selected tours. Contact our group sales department for customized packages.",
  },
  {
    question: "Are your tours suitable for children?",
    answer:
      "Many of our tours are family-friendly with activities suitable for children. We offer special family packages and can advise on age-appropriate tours. Some adventure tours may have minimum age requirements.",
  },
  {
    question: "What should I pack for my tour?",
    answer:
      "We provide a detailed packing list with each tour confirmation. Essentials typically include comfortable walking shoes, weather-appropriate clothing, necessary medications, travel documents, and any specific gear mentioned in your tour details.",
  },
  {
    question: "Do you provide travel insurance?",
    answer:
      "While we strongly recommend travel insurance, we don't sell it directly. We can refer you to reputable travel insurance providers that offer comprehensive coverage for our tours.",
  },
  {
    question: "Can I customize a tour?",
    answer:
      "Absolutely! We specialize in creating customized tours tailored to your interests, schedule, and budget. Our travel consultants will work with you to design your perfect itinerary.",
  },
];

export default function FAQTab() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-black">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
          >
            <button
              onClick={() => toggleItem(index)}
              className="flex justify-between items-center w-full text-left group"
              aria-expanded={expandedItems.includes(index)}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-black group-hover:text-blue-600 transition-colors">
                {item.question}
              </h3>
              <span className="ml-4 text-blue-600 text-2xl">
                {expandedItems.includes(index) ? "−" : "+"}
              </span>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                expandedItems.includes(index) ? "max-h-96 mt-4" : "max-h-0"
              }`}
            >
              <p className="text-base md:text-lg text-gray-700">{item.answer}</p>
              {index === 0 && expandedItems.includes(index) && (
                <div className="mt-4">
                  <h4 className="font-medium text-black mb-2">
                    Our tour categories include:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm md:text-base">
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      Cultural & Heritage Tours
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      Adventure & Trekking
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      Wildlife Safaris
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      Beach & Relaxation
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      Culinary Experiences
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
                      Family-Friendly Vacations
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 bg-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3 text-black">
          Still have questions?
        </h3>
        <p className="mb-4 text-gray-700">
          Can't find what you're looking for? Our team is happy to help with any
          questions about our tours, bookings, or travel requirements.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Contact our support team →
        </button>
      </div>
    </div>
  );
}