export interface Tour {
  id: number;
  title: string;
  slug: string;
  duration: number;
  category: "International" | "Domestic" | "Religious" | "Honeymoon" | "Cruise";
  images: string[];
  folder: string;
  whatsappMessage: string;
  featured?: boolean;
  shortDescription?: string;
}

export const allTours: Tour[] = [
  // ===============================
  // INTERNATIONAL TOURS
  // ===============================
  {
    id: 1,
    title: "Dubai Diwali Festival Tour",
    slug: "dubai-diwali-festival-tour",
    duration: 5,
    category: "International",
    images: [],
    folder: "dubai",
    whatsappMessage:
      "Hello, I'm interested in the Dubai Diwali Festival Tour. Please send me more details.",
    featured: true,
    shortDescription: "Celebrate Diwali in style with Dubai's dazzling lights, vibrant markets, and iconic landmarks."
  },
  {
    id: 2,
    title: "Phuket Krabi Island Adventure Tour",
    slug: "phuket-krabi-island-adventure-tour",
    duration: 4,
    category: "International",
    images: [],
    folder: "phuket-krabi",
    whatsappMessage:
      "Hello, I'm interested in the Phuket Krabi Island Adventure Tour. Please send me more details.",
    shortDescription: "Explore Thailand's stunning beaches, crystal waters, and thrilling island adventures in Phuket and Krabi."
  },
  {
    id: 3,
    title: "Bangkok Pattaya City Escape Tour",
    slug: "bangkok-pattaya-city-escape-tour",
    duration: 4,
    category: "International",
    images: [],
    folder: "bangkok-pattaya",
    whatsappMessage:
      "Hello, I'm interested in the Bangkok Pattaya City Escape Tour. Please send me more details.",
    shortDescription: "Experience the vibrant nightlife, cultural temples, and beach vibes of Bangkok and Pattaya."
  },
  {
    id: 4,
    title: "Bali Indonesia Exotic Retreat Tour",
    slug: "bali-indonesia-exotic-retreat-tour",
    duration: 5,
    category: "International",
    images: [],
    folder: "bali",
    whatsappMessage:
      "Hello, I'm interested in the Bali Indonesia Exotic Retreat Tour. Please send me more details.",
    shortDescription: "Unwind in Bali’s lush jungles, pristine beaches, and spiritual temples for an exotic escape."
  },
  {
    id: 5,
    title: "Singapore Malaysia Urban Cultural Tour",
    slug: "singapore-malaysia-urban-cultural-tour",
    duration: 6,
    category: "International",
    images: [],
    folder: "singapore-malaysia",
    whatsappMessage:
      "Hello, I'm interested in the Singapore Malaysia Urban Cultural Tour. Please send me more details.",
    shortDescription: "Discover the modern marvels and rich cultural heritage of Singapore and Malaysia’s bustling cities."
  },
  {
    id: 6,
    title: "Almaty Kazakhstan Scenic Discovery Tour",
    slug: "almaty-kazakhstan-scenic-discovery-tour",
    duration: 4,
    category: "International",
    images: [],
    folder: "almaty",
    whatsappMessage:
      "Hello, I'm interested in the Almaty Kazakhstan Scenic Discovery Tour. Please send me more details.",
    shortDescription: "Marvel at Almaty’s breathtaking mountains, vibrant markets, and unique blend of cultures."
  },
  {
    id: 7,
    title: "Baku Azerbaijan Heritage & Modernity Tour",
    slug: "baku-azerbaijan-heritage-modernity-tour",
    duration: 4,
    category: "International",
    images: [],
    folder: "baku",
    whatsappMessage:
      "Hello, I'm interested in the Baku Azerbaijan Heritage & Modernity Tour. Please send me more details.",
    shortDescription: "Experience Baku’s fusion of ancient heritage and futuristic architecture in a vibrant cultural journey."
  },
  {
    id: 8,
    title: "Sri Lanka Scenic Cultural Tour",
    slug: "sri-lanka-scenic-cultural-tour",
    duration: 5,
    category: "International",
    images: [],
    folder: "srilanka",
    whatsappMessage:
      "Hello, I'm interested in the Sri Lanka Scenic Cultural Tour. Please send me more details.",
    shortDescription: "Journey through Sri Lanka’s lush landscapes, ancient temples, and vibrant cultural traditions."
  },
  {
    id: 9,
    title: "Vietnam Adventure & Heritage Tour",
    slug: "vietnam-adventure-heritage-tour",
    duration: 5,
    category: "International",
    images: [],
    folder: "vietnam",
    whatsappMessage:
      "Hello, I'm interested in the Vietnam Adventure & Heritage Tour. Please send me more details.",
    shortDescription: "Explore Vietnam’s historic sites, bustling cities, and scenic countryside on an unforgettable adventure."
  },
  {
    id: 10,
    title: "Cambodia Ancient Temples Tour",
    slug: "cambodia-ancient-temples-tour",
    duration: 4,
    category: "International",
    images: [],
    folder: "cambodia",
    whatsappMessage:
      "Hello, I'm interested in the Cambodia Ancient Temples Tour. Please send me more details.",
    shortDescription: "Step back in time with Cambodia’s majestic Angkor Wat and other ancient temple wonders."
  },
  {
    id: 11,
    title: "Philippines Island Paradise Tour",
    slug: "philippines-island-paradise-tour",
    duration: 5,
    category: "International",
    images: [],
    folder: "philippines",
    whatsappMessage:
      "Hello, I'm interested in the Philippines Island Paradise Tour. Please send me more details.",
    shortDescription: "Relax on the Philippines’ pristine beaches and explore its vibrant coral reefs and islands."
  },
  {
    id: 12,
    title: "Nepal Himalayan Culture Tour",
    slug: "nepal-himalayan-culture-tour",
    duration: 5,
    category: "International",
    images: [],
    folder: "nepal",
    whatsappMessage:
      "Hello, I'm interested in the Nepal Himalayan Culture Tour. Please send me more details.",
    shortDescription: "Immerse yourself in Nepal’s Himalayan beauty and rich cultural heritage, from temples to treks."
  },
  {
    id: 13,
    title: "Bhutan Mystical Kingdom Tour",
    slug: "bhutan-mystical-kingdom-tour",
    duration: 6,
    category: "International",
    images: [],
    folder: "bhutan",
    whatsappMessage:
      "Hello, I'm interested in the Bhutan Mystical Kingdom Tour. Please send me more details.",
    shortDescription: "Discover Bhutan’s serene monasteries, stunning landscapes, and unique Himalayan culture."
  },
  {
    id: 14,
    title: "Japan Modern Tradition Tour",
    slug: "japan-modern-tradition-tour",
    duration: 6,
    category: "International",
    images: [],
    folder: "japan",
    whatsappMessage:
      "Hello, I'm interested in the Japan Modern Tradition Tour. Please send me more details.",
    shortDescription: "Experience Japan’s blend of cutting-edge cities and timeless traditions, from Tokyo to Kyoto."
  },
  {
    id: 15,
    title: "Turkey Historical Cultural Tour",
    slug: "turkey-historical-cultural-tour",
    duration: 6,
    category: "International",
    images: [],
    folder: "turkey",
    whatsappMessage:
      "Hello, I'm interested in the Turkey Historical Cultural Tour. Please send me more details.",
    shortDescription: "Uncover Turkey’s rich history, from Istanbul’s bazaars to Cappadocia’s fairy-tale landscapes."
  },
  {
    id: 16,
    title: "Greece Mythical Islands Heritage Tour",
    slug: "greece-mythical-islands-heritage-tour",
    duration: 6,
    category: "International",
    images: [],
    folder: "greece",
    whatsappMessage:
      "Hello, I'm interested in the Greece Mythical Islands Heritage Tour. Please send me more details.",
    shortDescription: "Sail through Greece’s idyllic islands, exploring ancient ruins and sun-soaked beaches."
  },
  {
    id: 17,
    title: "Australia Ultimate Outback City Tour",
    slug: "australia-ultimate-outback-city-tour",
    duration: 11,
    category: "International",
    images: [],
    folder: "australia",
    whatsappMessage:
      "Hello, I'm interested in the Australia Ultimate Outback City Tour. Please send me more details.",
    shortDescription: "Adventure through Australia’s rugged Outback and vibrant cities like Sydney and Melbourne."
  },
  {
    id: 18,
    title: "New Zealand Adventure Scenic Tour",
    slug: "new-zealand-adventure-scenic-tour",
    duration: 6,
    category: "International",
    images: [],
    folder: "newzealand",
    whatsappMessage:
      "Hello, I'm interested in the New Zealand Adventure Scenic Tour. Please send me more details.",
    shortDescription: "Explore New Zealand’s dramatic landscapes, from fjords to mountains, on an epic adventure."
  },
  {
    id: 19,
    title: "Europe Grand Cultural Historical Tour",
    slug: "europe-grand-cultural-historical-tour",
    duration: 12,
    category: "International",
    images: [],
    folder: "europe",
    whatsappMessage:
      "Hello, I'm interested in the Europe Grand Cultural Historical Tour. Please send me more details.",
    shortDescription: "Journey across Europe’s iconic cities, marveling at historic landmarks and cultural treasures."
  },
  {
    id: 20,
    title: "Egypt Ancient Wonders Tour",
    slug: "egypt-ancient-wonders-tour",
    duration: 7,
    category: "International",
    images: [],
    folder: "egypt",
    whatsappMessage:
      "Hello, I'm interested in the Egypt Ancient Wonders Tour. Please send me more details.",
    shortDescription: "Discover Egypt’s pyramids, Nile River, and ancient temples on a journey through history."
  },
  {
    id: 21,
    title: "Mauritius Tropical Escape Tour",
    slug: "mauritius-tropical-escape-tour",
    duration: 5,
    category: "International",
    images: [],
    folder: "mauritius",
    whatsappMessage:
      "Hello, I'm interested in the Mauritius Tropical Escape Tour. Please send me more details.",
    shortDescription: "Relax on Mauritius’ turquoise beaches and explore its lush rainforests and coral reefs."
  },
  {
    id: 22,
    title: "Maldives Luxury Island Retreat",
    slug: "maldives-luxury-island-retreat",
    duration: 4,
    category: "International",
    images: [],
    folder: "maldives",
    whatsappMessage:
      "Hello, I'm interested in the Maldives Luxury Island Retreat. Please send me more details.",
    shortDescription: "Indulge in the Maldives’ overwater villas and pristine beaches for a luxurious escape."
  },
  {
    id: 23,
    title: "United States Grand Road Trip Tour",
    slug: "united-states-grand-road-trip-tour",
    duration: 12,
    category: "International",
    images: [],
    folder: "usa",
    whatsappMessage:
      "Hello, I'm interested in the United States Grand Road Trip Tour. Please send me more details.",
    shortDescription: "Embark on an epic U.S. road trip, from vibrant cities to stunning national parks."
  },

  // ===============================
  // DOMESTIC TOURS
  // ===============================
  {
    id: 101,
    title: "Rajasthan Royal Heritage Tour",
    slug: "rajasthan-royal-heritage-tour",
    duration: 6,
    category: "Domestic",
    images: [],
    folder: "rajasthan",
    whatsappMessage:
      "Hello, I'm interested in the Rajasthan Royal Heritage Tour. Please send me more details.",
    featured: true,
    shortDescription: "Step into Rajasthan’s royal past with its majestic forts, palaces, and vibrant culture."
  },
  {
    id: 102,
    title: "Himalayan Retreat: Dharamshala Dalhousie Tour",
    slug: "dharamshala-dalhousie-himalayan-retreat-tour",
    duration: 6,
    category: "Domestic",
    images: [],
    folder: "dharamshala-dalhousie",
    whatsappMessage:
      "Hello, I'm interested in the Himalayan Retreat: Dharamshala Dalhousie Tour. Please send me more details.",
    shortDescription: "Find peace in the Himalayan serenity of Dharamshala and Dalhousie’s colonial charm."
  },
  {
    id: 103,
    title: "Kullu Manali Adventure Tour",
    slug: "kullu-manali-adventure-tour",
    duration: 6,
    category: "Domestic",
    images: [],
    folder: "kullu-manali",
    whatsappMessage:
      "Hello, I'm interested in the Kullu Manali Adventure Tour. Please send me more details.",
    shortDescription: "Thrill in Kullu Manali’s snow-capped peaks, adventure sports, and scenic beauty."
  },
  {
    id: 104,
    title: "Jammu Kashmir Scenic Tour",
    slug: "jammu-kashmir-scenic-tour",
    duration: 5,
    category: "Domestic",
    images: [],
    folder: "jammu-kashmir",
    whatsappMessage:
      "Hello, I'm interested in the Jammu Kashmir Scenic Tour. Please send me more details.",
    shortDescription: "Discover the paradise of Jammu & Kashmir with its serene lakes and majestic mountains."
  },
  {
    id: 105,
    title: "Leh Ladakh High Altitude Adventure",
    slug: "leh-ladakh-high-altitude-adventure",
    duration: 7,
    category: "Domestic",
    images: [],
    folder: "leh-ladakh",
    whatsappMessage:
      "Hello, I'm interested in the Leh Ladakh High Altitude Adventure. Please send me more details.",
    shortDescription: "Conquer Leh Ladakh’s rugged terrains and monasteries on a high-altitude adventure."
  },
  {
    id: 106,
    title: "Chardham Pilgrimage Tour",
    slug: "chardham-pilgrimage-tour",
    duration: 10,
    category: "Domestic",
    images: [],
    folder: "chardham",
    whatsappMessage:
      "Hello, I'm interested in the Chardham Pilgrimage Tour. Please send me more details.",
    shortDescription: "Embark on a sacred Chardham Yatra to India’s holiest Himalayan pilgrimage sites."
  },
  {
    id: 107,
    title: "Dodham Pilgrimage Tour",
    slug: "dodham-pilgrimage-tour",
    duration: 4,
    category: "Domestic",
    images: [],
    folder: "dodham",
    whatsappMessage:
      "Hello, I'm interested in the Dodham Pilgrimage Tour. Please send me more details.",
    shortDescription: "Seek spiritual solace with the Dodham Yatra, visiting two sacred Himalayan shrines."
  },
  {
    id: 108,
    title: "Vaishnodevi Pilgrimage Tour",
    slug: "vaishnodevi-pilgrimage-tour",
    duration: 4,
    category: "Domestic",
    images: [],
    folder: "vaishnodevi",
    whatsappMessage:
      "Hello, I'm interested in the Vaishnodevi Pilgrimage Tour. Please send me more details.",
    shortDescription: "Experience divine blessings on a pilgrimage to the holy Vaishnodevi shrine."
  },
  {
    id: 109,
    title: "Kerala Backwaters Culture Tour",
    slug: "kerala-backwaters-culture-tour",
    duration: 5,
    category: "Domestic",
    images: [],
    folder: "kerala",
    whatsappMessage:
      "Hello, I'm interested in the Kerala Backwaters Culture Tour. Please send me more details.",
    shortDescription: "Cruise Kerala’s tranquil backwaters and immerse in its rich cultural traditions."
  },
  {
    id: 110,
    title: "North East India Scenic Tour",
    slug: "north-east-india-scenic-tour",
    duration: 6,
    category: "Domestic",
    images: [],
    folder: "northeast",
    whatsappMessage:
      "Hello, I'm interested in the North East India Scenic Tour. Please send me more details.",
    shortDescription: "Explore the untouched beauty and tribal cultures of North East India’s hills."
  },
  {
    id: 111,
    title: "Andaman Nicobar Island Escape",
    slug: "andaman-nicobar-island-escape",
    duration: 5,
    category: "Domestic",
    images: [],
    folder: "andaman",
    whatsappMessage:
      "Hello, I'm interested in the Andaman Nicobar Island Escape. Please send me more details.",
    shortDescription: "Dive into the Andaman’s turquoise waters and relax on its pristine beaches."
  },
  {
    id: 112,
    title: "Goa Beach Culture Getaway",
    slug: "goa-beach-culture-getaway",
    duration: 3,
    category: "Domestic",
    images: [],
    folder: "goa",
    whatsappMessage:
      "Hello, I'm interested in the Goa Beach Culture Getaway. Please send me more details.",
    shortDescription: "Soak up Goa’s vibrant beaches, nightlife, and Portuguese-inspired culture."
  },
  {
    id: 113,
    title: "Mysore Ooty Nature Heritage Tour",
    slug: "mysore-ooty-nature-heritage-tour",
    duration: 3,
    category: "Domestic",
    images: [],
    folder: "mysore-ooty",
    whatsappMessage:
      "Hello, I'm interested in the Mysore Ooty Nature Heritage Tour. Please send me more details.",
    shortDescription: "Discover Mysore’s palaces and Ooty’s misty hills on a nature and heritage journey."
  },
  {
    id: 114,
    title: "Tamil Nadu Heritage Spiritual Tour",
    slug: "tamil-nadu-heritage-spiritual-tour",
    duration: 4,
    category: "Domestic",
    images: [],
    folder: "tamilnadu",
    whatsappMessage:
      "Hello, I'm interested in the Tamil Nadu Heritage Spiritual Tour. Please send me more details.",
    shortDescription: "Explore Tamil Nadu’s ancient temples and rich cultural heritage on a spiritual journey."
  },
  {
    id: 115,
    title: "Ramoji Hyderabad Entertainment Tour",
    slug: "ramoji-hyderabad-entertainment-tour",
    duration: 2,
    category: "Domestic",
    images: [],
    folder: "ramoji",
    whatsappMessage:
      "Hello, I'm interested in the Ramoji Hyderabad Entertainment Tour. Please send me more details.",
    shortDescription: "Experience the magic of cinema at Ramoji Film City in vibrant Hyderabad."
  },
  {
    id: 116,
    title: "Tirupati Spiritual Pilgrimage Tour",
    slug: "tirupati-spiritual-pilgrimage-tour",
    duration: 2,
    category: "Domestic",
    images: [],
    folder: "tirupati",
    whatsappMessage:
      "Hello, I'm interested in the Tirupati Spiritual Pilgrimage Tour. Please send me more details.",
    shortDescription: "Seek blessings at Tirupati’s sacred Venkateswara Temple on a spiritual pilgrimage."
  },
  {
    id: 117,
    title: "Gujarat Vibrant Heritage Tour",
    slug: "gujarat-vibrant-heritage-tour",
    duration: 6,
    category: "Domestic",
    images: [],
    folder: "gujarat",
    whatsappMessage:
      "Hello, I'm interested in the Gujarat Vibrant Heritage Tour. Please send me more details.",
    shortDescription: "Immerse in Gujarat’s colorful festivals, historic sites, and vibrant cultural heritage."
  },
  {
    id: 118,
    title: "Rann of Kutch Desert Experience Tour",
    slug: "rann-of-kutch-desert-experience-tour",
    duration: 3,
    category: "Domestic",
    images: [],
    folder: "rann",
    whatsappMessage:
      "Hello, I'm interested in the Rann of Kutch Desert Experience Tour. Please send me more details.",
    shortDescription: "Witness the surreal white salt desert and vibrant culture of Rann of Kutch."
  },
  {
    id: 119,
    title: "Madhya Pradesh Historical Wildlife Tour",
    slug: "madhya-pradesh-historical-wildlife-tour",
    duration: 6,
    category: "Domestic",
    images: [],
    folder: "madhyapradesh",
    whatsappMessage:
      "Hello, I'm interested in the Madhya Pradesh Historical Wildlife Tour. Please send me more details.",
    shortDescription: "Explore Madhya Pradesh’s ancient forts and thrilling wildlife sanctuaries."
  },
  {
    id: 120,
    title: "Ayodhya Varanasi Spiritual Journey",
    slug: "ayodhya-varanasi-spiritual-journey",
    duration: 5,
    category: "Domestic",
    images: [],
    folder: "varanasi",
    whatsappMessage:
      "Hello, I'm interested in the Ayodhya Varanasi Spiritual Journey. Please send me more details.",
    shortDescription: "Embark on a sacred journey to Ayodhya and Varanasi, India’s spiritual heartlands."
  },
  {
    id: 121,
    title: "Odisha Cultural Heritage Tour",
    slug: "odisha-cultural-heritage-tour",
    duration: 5,
    category: "Domestic",
    images: [],
    folder: "odisha",
    whatsappMessage:
      "Hello, I'm interested in the Odisha Cultural Heritage Tour. Please send me more details.",
    shortDescription: "Discover Odisha’s ancient temples, tribal culture, and artistic heritage."
  },
  {
    id: 122,
    title: "Konkan Coastal Discovery Tour",
    slug: "konkan-coastal-discovery-tour",
    duration: 3,
    category: "Domestic",
    images: [],
    folder: "konkan",
    whatsappMessage:
      "Hello, I'm interested in the Konkan Coastal Discovery Tour. Please send me more details.",
    shortDescription: "Explore the Konkan coast’s serene beaches, forts, and lush greenery."
  },

  // ===============================
  // RELIGIOUS TOURS
  // ===============================
  {
    id: 201,
    title: "Chardham Yatra Pilgrimage Tour",
    slug: "chardham-yatra-pilgrimage-tour",
    duration: 10,
    category: "Religious",
    images: [],
    folder: "chardham",
    whatsappMessage:
      "Hello, I'm interested in the Chardham Yatra Pilgrimage Tour. Please send me more details.",
    featured: true,
    shortDescription: "Undertake the sacred Chardham Yatra to four holy Himalayan shrines for spiritual fulfillment."
  },
  {
    id: 202,
    title: "Dodham Yatra Religious Tour",
    slug: "dodham-yatra-religious-tour",
    duration: 4,
    category: "Religious",
    images: [],
    folder: "dodham",
    whatsappMessage:
      "Hello, I'm interested in the Dodham Yatra Religious Tour. Please send me more details.",
    shortDescription: "Visit two sacred Himalayan shrines on the spiritually enriching Dodham Yatra."
  },
  {
    id: 203,
    title: "Vaishnodevi Katra Religious Tour",
    slug: "vaishnodevi-katra-religious-tour",
    duration: 4,
    category: "Religious",
    images: [],
    folder: "vaishnodevi",
    whatsappMessage:
      "Hello, I'm interested in the Vaishnodevi Katra Religious Tour. Please send me more details.",
    shortDescription: "Seek divine blessings at the revered Vaishnodevi temple in Katra."
  },
  {
    id: 204,
    title: "Tirupati Religious Tour",
    slug: "tirupati-religious-tour",
    duration: 2,
    category: "Religious",
    images: [],
    folder: "tirupati",
    whatsappMessage:
      "Hello, I'm interested in the Tirupati Religious Tour. Please send me more details.",
    shortDescription: "Experience spiritual serenity at Tirupati’s sacred Venkateswara Temple."
  },
  {
    id: 205,
    title: "Ayodhya Varanasi Religious Tour",
    slug: "ayodhya-varanasi-religious-tour",
    duration: 5,
    category: "Religious",
    images: [],
    folder: "varanasi",
    whatsappMessage:
      "Hello, I'm interested in the Ayodhya Varanasi Religious Tour. Please send me more details.",
    shortDescription: "Connect with divinity in the sacred cities of Ayodhya and Varanasi."
  },

  // ===============================
  // HONEYMOON TOURS
  // ===============================
  {
    id: 301,
    title: "Mauritius Honeymoon Getaway",
    slug: "mauritius-honeymoon-getaway",
    duration: 5,
    category: "Honeymoon",
    images: [],
    folder: "mauritius",
    whatsappMessage:
      "Hello, I'm interested in the Mauritius Honeymoon Getaway. Please send me more details.",
    shortDescription: "Celebrate love on Mauritius’ romantic beaches and turquoise lagoons."
  },
  {
    id: 302,
    title: "Maldives Honeymoon Retreat",
    slug: "maldives-honeymoon-retreat",
    duration: 4,
    category: "Honeymoon",
    images: [],
    folder: "maldives",
    whatsappMessage:
      "Hello, I'm interested in the Maldives Honeymoon Retreat. Please send me more details.",
    featured: true,
    shortDescription: "Escape to the Maldives for a romantic retreat in luxurious overwater villas."
  },
  {
    id: 303,
    title: "Bali Indonesia Honeymoon Escape",
    slug: "bali-indonesia-honeymoon-escape",
    duration: 5,
    category: "Honeymoon",
    images: [],
    folder: "bali",
    whatsappMessage:
      "Hello, I'm interested in the Bali Indonesia Honeymoon Escape. Please send me more details.",
    shortDescription: "Fall in love amidst Bali’s lush jungles, beaches, and romantic sunsets."
  },
  {
    id: 304,
    title: "Phuket Krabi Honeymoon",
    slug: "phuket-krabi-honeymoon",
    duration: 4,
    category: "Honeymoon",
    images: [],
    folder: "phuket",
    whatsappMessage:
      "Hello, I'm interested in the Phuket Krabi Honeymoon. Please send me more details.",
    shortDescription: "Enjoy a romantic getaway on Phuket and Krabi’s stunning beaches and islands."
  },
  {
    id: 305,
    title: "Paris Honeymoon Romance",
    slug: "paris-honeymoon-romance",
    duration: 6,
    category: "Honeymoon",
    images: [],
    folder: "paris",
    whatsappMessage:
      "Hello, I'm interested in the Paris Honeymoon Romance. Please send me more details.",
    shortDescription: "Experience timeless romance in Paris, the city of love, with iconic landmarks."
  },
  {
    id: 306,
    title: "Switzerland Honeymoon Adventure",
    slug: "switzerland-honeymoon-adventure",
    duration: 6,
    category: "Honeymoon",
    images: [],
    folder: "switzerland",
    whatsappMessage:
      "Hello, I'm interested in the Switzerland Honeymoon Adventure. Please send me more details.",
    shortDescription: "Celebrate love amidst Switzerland’s Alps, lakes, and charming villages."
  },
  {
    id: 307,
    title: "Venice Italy Honeymoon",
    slug: "venice-italy-honeymoon",
    duration: 5,
    category: "Honeymoon",
    images: [],
    folder: "venice",
    whatsappMessage:
      "Hello, I'm interested in the Venice Italy Honeymoon. Please send me more details.",
    shortDescription: "Drift through Venice’s romantic canals and historic charm for an unforgettable honeymoon."
  },
  {
    id: 308,
    title: "Philippines Honeymoon",
    slug: "philippines-honeymoon",
    duration: 5,
    category: "Honeymoon",
    images: [],
    folder: "philippines",
    whatsappMessage:
      "Hello, I'm interested in the Philippines Honeymoon. Please send me more details.",
    shortDescription: "Create lasting memories on the Philippines’ idyllic beaches and tropical islands."
  },
  {
    id: 309,
    title: "Kashmir Honeymoon",
    slug: "kashmir-honeymoon",
    duration: 5,
    category: "Honeymoon",
    images: [],
    folder: "kashmir",
    whatsappMessage:
      "Hello, I'm interested in the Kashmir Honeymoon. Please send me more details.",
    shortDescription: "Romance in Kashmir’s serene valleys, lakes, and snow-capped mountains."
  },
  {
    id: 310,
    title: "Kerala Honeymoon",
    slug: "kerala-honeymoon",
    duration: 5,
    category: "Honeymoon",
    images: [],
    folder: "kerala",
    whatsappMessage:
      "Hello, I'm interested in the Kerala Honeymoon. Please send me more details.",
    shortDescription: "Cruise Kerala’s romantic backwaters and lush hills for a dreamy honeymoon."
  },
  {
    id: 311,
    title: "Goa Honeymoon",
    slug: "goa-honeymoon",
    duration: 3,
    category: "Honeymoon",
    images: [],
    folder: "goa",
    whatsappMessage:
      "Hello, I'm interested in the Goa Honeymoon. Please send me more details.",
    shortDescription: "Celebrate love on Goa’s vibrant beaches with a perfect blend of romance and fun."
  },
  {
    id: 312,
    title: "Himachal Honeymoon",
    slug: "himachal-honeymoon",
    duration: 6,
    category: "Honeymoon",
    images: [],
    folder: "himachal",
    whatsappMessage:
      "Hello, I'm interested in the Himachal Honeymoon. Please send me more details.",
    shortDescription: "Escape to Himachal’s romantic hills and cozy retreats for a magical honeymoon."
  },

  // ===============================
  // CRUISE TOURS
  // ===============================
  {
    id: 401,
    title: "Cordella Cruise Vacation",
    slug: "cordella-cruise-vacation",
    duration: 7,
    category: "Cruise",
    images: [],
    folder: "cordella",
    whatsappMessage:
      "Hello, I'm interested in the Cordella Cruise Vacation. Please send me more details.",
    shortDescription: "Sail in luxury on the Cordella Cruise, exploring exotic destinations in style."
  },
  {
    id: 402,
    title: "Bahamas Cruise Vacation",
    slug: "bahamas-cruise-vacation",
    duration: 7,
    category: "Cruise",
    images: [],
    folder: "bahamas",
    whatsappMessage:
      "Hello, I'm interested in the Bahamas Cruise Vacation. Please send me more details.",
    featured: true,
    shortDescription: "Cruise to the Bahamas’ crystal waters and vibrant islands for a dreamy vacation."
  },
];