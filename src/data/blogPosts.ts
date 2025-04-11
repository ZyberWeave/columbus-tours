// File: src/data/blogPosts.ts

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    image: string;
    category: string;
    readingTime: string;
    author: {
      name: string;
      role: string;
      avatar: string;
    };
    location: string;
    relatedPosts?: number[];
  }
  
  export const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Unveiling the Hidden Heritage of Karad: A Journey Through Time",
      slug: "unveiling-hidden-heritage-karad",
      excerpt:
        "Discover the rich history of Karad and the cultural essence of Satara with exclusive tours that offer a glimpse into mysteries reserved only for our clients.",
      content: `
        <p>Karad, nestled in the heart of Satara in Maharashtra, India, is a city of secrets and timeless heritage. At <strong>Columbus Tours</strong>, our exclusive journeys are carefully curated to reveal just enough history and cultural magic while keeping some experiences reserved only for our guided tours.</p>
        <p>Our expert-guided packages invite you to explore ancient temples, architectural marvels, and local legends that make Karad a hidden gem. Visit our office at 1, Laxmi Heights, 63 Mangalwar Peth, Opp. Jyotiba Temple, Karad - 415 110 (MS) INDIA for more details.</p>
      `,
      date: "2023-10-15",
      image: "/images/blog/karad-heritage.jpg",
      category: "Cultural",
      readingTime: "5 min read",
      author: {
        name: "Vaishnavi Kulkarni",
        role: "CMO | ZyberWeave",
        avatar: "/images/team/vaishnavi.jpg"
      },
      location: "Karad, Satara, Maharashtra, India",
      relatedPosts: [2, 3],
    },
    {
      id: 2,
      title: "The Spirit of Satara: Embracing Timeless Traditions",
      slug: "the-spirit-of-satara",
      excerpt:
        "Satara in Maharashtra resonates with deep spirituality and ancient customs. Discover exclusive glimpses that beckon you to experience its magic.",
      content: `
        <p>Satara is a land where age-old traditions and spiritual practices come alive. Our tours provide a curated preview into these rituals without revealing every detail, preserving the magic of discovery for our clients.</p>
        <p>Our office in Karad serves as your gateway into the mystique of Satara. Connect with us to begin your exclusive journey.</p>
      `,
      date: "2023-10-01",
      image: "/images/blog/satara-spirit.jpg",
      category: "Heritage",
      readingTime: "4 min read",
      author: {
        name: "Vaishnavi Kulkarni",
        role: "CMO | ZyberWeave",
        avatar: "/images/team/vaishnavi.jpg"
      },
      location: "Satara, Maharashtra, India",
      relatedPosts: [1, 3],
    },
    {
      id: 3,
      title: "Maharashtra Marvels: A Curated Tour Experience",
      slug: "maharashtra-marvels",
      excerpt:
        "Immerse yourself in the wonders of Maharashtra with our guided tours that reveal exclusive insights into its rich history and vibrant culture.",
      content: `
        <p>Maharashtra is a vibrant state where modernity blends seamlessly with tradition. Our tours offer an intriguing taste of its diverse landscapes—from hidden forts to bustling markets—while keeping the complete itineraries exclusive for our clients.</p>
        <p>Experience the marvels of Maharashtra without getting everything laid bare until you book with us.</p>
      `,
      date: "2023-09-25",
      image: "/images/blog/maharashtra-marvels.jpg",
      category: "Travel",
      readingTime: "6 min read",
      author: {
        name: "Vaishnavi Kulkarni",
        role: "CMO | ZyberWeave",
        avatar: "/images/team/vaishnavi.jpg"
      },
      location: "Maharashtra, India",
      relatedPosts: [1, 2],
    },
    {
      id: 4,
      title: "Sustainable Journeys: The Eco-Friendly Way to Explore India",
      slug: "sustainable-journeys-eco-friendly-travel",
      excerpt:
        "Learn how our eco-friendly tours not only preserve the natural beauty of India but also offer an exclusive experience that keeps many details a secret.",
      content: `
        <p>Sustainability is at the core of our travel philosophy. Our eco-friendly tours are designed to minimize environmental impact while delivering captivating experiences in India. We share only a preview of the unique itinerary, ensuring that the complete journey remains exclusive.</p>
        <p>Contact us to learn how you can travel responsibly and experience India in a way that few have.</p>
      `,
      date: "2023-09-10",
      image: "/images/blog/eco-friendly-travel.jpg",
      category: "Sustainability",
      readingTime: "5 min read",
      author: {
        name: "Vaishnavi Kulkarni",
        role: "CMO | ZyberWeave",
        avatar: "/images/team/vaishnavi.jpg"
      },
      location: "India",
      relatedPosts: [5],
    },
    {
      id: 5,
      title: "Travel Trends 2023: How Curated Tours Are Shaping the Future",
      slug: "travel-trends-2023-curated-tours",
      excerpt:
        "Discover how personalized curated tour experiences are revolutionizing travel in India, with our exclusive insights and preview itineraries.",
      content: `
        <p>The travel industry is rapidly evolving, and curated tours are emerging as the premier choice for discerning travelers. At Columbus Tours, we use our expertise to craft journeys that tease the full experience—leaving some details exclusive for our clients.</p>
        <p>Our strategic office in Karad enables us to deliver a blend of tradition, modernity, and exclusive travel secrets.</p>
      `,
      date: "2023-08-30",
      image: "/images/blog/travel-trends.jpg",
      category: "Trends",
      readingTime: "6 min read",
      author: {
        name: "Vaishnavi Kulkarni",
        role: "CMO | ZyberWeave",
        avatar: "/images/team/vaishnavi.jpg"
      },
      location: "India",
      relatedPosts: [4, 6],
    },
    {
      id: 6,
      title: "Luxury Redefined: Premium Tour Experiences in India",
      slug: "luxury-premium-tour-experiences",
      excerpt:
        "Step into a world where luxury meets exclusivity. Discover premium tours that keep some details under wraps for a uniquely tailored experience.",
      content: `
        <p>Luxury travel is not just about opulence—it’s about an experience that is crafted with precision and reserved exclusivity. Our premium tours offer a curated preview of luxurious destinations in India while saving the complete details for our exclusive clients.</p>
        <p>Contact our team to explore our bespoke luxury packages.</p>
      `,
      date: "2023-08-15",
      image: "/images/blog/luxury-travel.jpg",
      category: "Luxury",
      readingTime: "5 min read",
      author: {
        name: "Vaishnavi Kulkarni",
        role: "CMO | ZyberWeave",
        avatar: "/images/team/vaishnavi.jpg"
      },
      location: "India",
      relatedPosts: [5],
    },
    {
      id: 7,
      title: "Digital Transformation in Travel: A New Era of Exploration",
      slug: "digital-transformation-travel",
      excerpt:
        "Explore how digital innovation is revolutionizing curated tours in India, creating exclusive travel experiences that remain partly undisclosed.",
      content: `
        <p>Digital technology is reshaping the way we travel. Our tours leverage the latest innovations to offer interactive and personalized experiences while keeping full itinerary details exclusive. Discover the cutting-edge of travel planning with us.</p>
        <p>Our headquarters in Karad, Satara, is the hub of these innovations.</p>
      `,
      date: "2023-07-30",
      image: "/images/blog/digital-transformation.jpg",
      category: "Technology",
      readingTime: "6 min read",
      author: {
        name: "Vaishnavi Kulkarni",
        role: "CMO | ZyberWeave",
        avatar: "/images/team/vaishnavi.jpg"
      },
      location: "India",
      relatedPosts: [6],
    },
    {
      id: 8,
      title: "Culinary Journeys: Savoring the Flavors of Karad",
      slug: "culinary-journeys-karad",
      excerpt:
        "Taste the exquisite culinary traditions of Karad with our exclusive food tours—experience the flavors that define Satara, Maharashtra.",
      content: `
        <p>Karad is not only steeped in history but also in culinary excellence. Our food tours let you sample local spices, traditional recipes, and the unique flavors of Satara—while keeping the full gastronomic experience exclusive to our guided trips.</p>
        <p>Visit us at our office in Karad for more details.</p>
      `,
      date: "2023-07-15",
      image: "/images/blog/karad-culinary.jpg",
      category: "Food & Culture",
      readingTime: "5 min read",
      author: {
        name: "Vaishnavi Kulkarni",
        role: "CMO | ZyberWeave",
        avatar: "/images/team/vaishnavi.jpg"
      },
      location: "Karad, Satara, Maharashtra, India",
      relatedPosts: [1, 9],
    },
    {
      id: 9,
      title: "Cultural Odyssey: A Glimpse into India's Timeless Traditions",
      slug: "cultural-odyssey-india",
      excerpt:
        "Embark on an exclusive cultural odyssey through India—savor a preview of timeless traditions while reserving full details for our guided tours.",
      content: `
        <p>India’s cultural tapestry is as diverse as it is profound. Our cultural odyssey tours offer you a taste of ancient rituals, vibrant festivals, and historical landmarks while keeping certain details under wraps.</p>
        <p>Experience the wonder of Indian traditions with Columbus Tours, your exclusive guide to undiscovered cultural marvels.</p>
      `,
      date: "2023-07-05",
      image: "/images/blog/cultural-odyssey.jpg",
      category: "Culture",
      readingTime: "6 min read",
      author: {
        name: "Vaishnavi Kulkarni",
        role: "CMO | ZyberWeave",
        avatar: "/images/team/vaishnavi.jpg"
      },
      location: "India",
      relatedPosts: [8],
    },
    {
      id: 10,
      title: "Thrilling Escapades: Adventure Awaits in India",
      slug: "thrilling-escapades-india",
      excerpt:
        "For the adrenaline junkies, our adventure tours in India offer exclusive escapades that leave you with unforgettable stories.",
      content: `
        <p>From the rugged terrains of Rajasthan to the soaring peaks of the Himalayas, our adventure tours are designed to thrill while keeping the complete itinerary a mystery until you book with us.</p>
        <p>Join Columbus Tours for a glimpse into adventure that few dare to experience fully on their own.</p>
      `,
      date: "2023-06-25",
      image: "/images/blog/adventure-awaits.jpg",
      category: "Adventure",
      readingTime: "5 min read",
      author: {
        name: "Vaishnavi Kulkarni",
        role: "CMO | ZyberWeave",
        avatar: "/images/team/vaishnavi.jpg"
      },
      location: "India",
      relatedPosts: [9],
    },
  ];
  
  