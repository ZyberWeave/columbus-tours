export interface Tour {
    id: number;
    title: string;
    duration: number;  // number of nights
    category: "International" | "Domestic" | "Religious" | "Honeymoon" | "Cruise";
    image: string;
  }
  
  export const allTours: Tour[] = [
    // -------------------------------
    // INTERNATIONAL TOURS
    // -------------------------------
    { id: 1, title: "Dubai (6D 5N)", duration: 5, category: "International", image: "/images/dubai.jpg" },
    { id: 2, title: "Phuket, Krabi (5D 4N)", duration: 4, category: "International", image: "/images/phuket-krabi.jpg" },
    { id: 3, title: "Bangkok, Pattaya (5D 4N)", duration: 4, category: "International", image: "/images/bangkok-pattaya.jpg" },
    { id: 4, title: "Bali, Indonesia (6D 5N)", duration: 5, category: "International", image: "/images/bali.jpg" },
    { id: 5, title: "Singapore Malaysia (7D 6N)", duration: 6, category: "International", image: "/images/singapore-malaysia.jpg" },
    { id: 6, title: "Almaty, Kazakhstan (5D 4N)", duration: 4, category: "International", image: "/images/almaty.jpg" },
    { id: 7, title: "Baku, Azerbaijan (5D 4N)", duration: 4, category: "International", image: "/images/baku.jpg" },
    { id: 8, title: "Sri Lanka (6D 5N)", duration: 5, category: "International", image: "/images/srilanka.jpg" },
    { id: 9, title: "Vietnam (6D 5N)", duration: 5, category: "International", image: "/images/vietnam.jpg" },
    { id: 10, title: "Cambodia (5D 4N)", duration: 4, category: "International", image: "/images/cambodia.jpg" },
    { id: 11, title: "Philippines (6D 5N)", duration: 5, category: "International", image: "/images/philippines.jpg" },
    { id: 12, title: "Nepal (6D 5N)", duration: 5, category: "International", image: "/images/nepal.jpg" },
    { id: 13, title: "Bhutan (7D 6N)", duration: 6, category: "International", image: "/images/bhutan.jpg" },
    { id: 14, title: "Japan (7D 6N)", duration: 6, category: "International", image: "/images/japan.jpg" },
    { id: 15, title: "Turkey (7D 6N)", duration: 6, category: "International", image: "/images/turkey.jpg" },
    { id: 16, title: "Greece (7D 6N)", duration: 6, category: "International", image: "/images/greece.jpg" },
    { id: 17, title: "Australia (12D 11N)", duration: 11, category: "International", image: "/images/australia.jpg" },
    { id: 18, title: "New Zealand (7D 6N)", duration: 6, category: "International", image: "/images/newzealand.jpg" },
    { id: 19, title: "Europe (13D 12N)", duration: 12, category: "International", image: "/images/europe.jpg" },
    { id: 20, title: "Egypt (8D 7N)", duration: 7, category: "International", image: "/images/egypt.jpg" },
    { id: 21, title: "Mauritius (6D 5N)", duration: 5, category: "International", image: "/images/mauritius.jpg" },
    { id: 22, title: "Maldives (5D 4N)", duration: 4, category: "International", image: "/images/maldives.jpg" },
    { id: 23, title: "United States (13D 12N)", duration: 12, category: "International", image: "/images/usa.jpg" },
  
    // -------------------------------
    // DOMESTIC TOURS
    // -------------------------------
    { id: 101, title: "Rajasthan (7D 6N)", duration: 6, category: "Domestic", image: "/images/rajasthan.jpg" },
    { id: 102, title: "Dharamshala, Dalhousie (7D 6N)", duration: 6, category: "Domestic", image: "/images/dharamshala-dalhousie.jpg" },
    { id: 103, title: "Kullu Manali (7D 6N)", duration: 6, category: "Domestic", image: "/images/kullu-manali.jpg" },
    { id: 104, title: "Jammu and Kashmir (6D 5N)", duration: 5, category: "Domestic", image: "/images/jammu-kashmir.jpg" },
    { id: 105, title: "Leh, Ladakh (8D 7N)", duration: 7, category: "Domestic", image: "/images/leh-ladakh.jpg" },
    { id: 106, title: "Chardham Yatra (11D 10N)", duration: 10, category: "Domestic", image: "/images/chardham.jpg" },
    { id: 107, title: "Dodham Yatra (5D 4N)", duration: 4, category: "Domestic", image: "/images/dodham.jpg" },
    { id: 108, title: "Vaishnodevi, Katra (5D 4N)", duration: 4, category: "Domestic", image: "/images/vaishnodevi.jpg" },
    { id: 109, title: "Kerala (6D 5N)", duration: 5, category: "Domestic", image: "/images/kerala.jpg" },
    { id: 110, title: "North East India (7D 6N)", duration: 6, category: "Domestic", image: "/images/northeast.jpg" },
    { id: 111, title: "Andaman and Nicobar (6D 5N)", duration: 5, category: "Domestic", image: "/images/andaman.jpg" },
    { id: 112, title: "Goa (4D 3N)", duration: 3, category: "Domestic", image: "/images/goa.jpg" },
    { id: 113, title: "Mysore, Ooty (4D 3N)", duration: 3, category: "Domestic", image: "/images/mysore-ooty.jpg" },
    { id: 114, title: "Tamilnadu (5D 4N)", duration: 4, category: "Domestic", image: "/images/tamilnadu.jpg" },
    { id: 115, title: "Ramoji, Hyderabad (3D 2N)", duration: 2, category: "Domestic", image: "/images/ramoji.jpg" },
    { id: 116, title: "Tirupati (3D 2N)", duration: 2, category: "Domestic", image: "/images/tirupati.jpg" },
    { id: 117, title: "Gujarat (7D 6N)", duration: 6, category: "Domestic", image: "/images/gujarat.jpg" },
    { id: 118, title: "Rann of Kutch (4D 3N)", duration: 3, category: "Domestic", image: "/images/rann.jpg" },
    { id: 119, title: "Madhya Pradesh (7D 6N)", duration: 6, category: "Domestic", image: "/images/madhyapradesh.jpg" },
    { id: 120, title: "Ayodya, Varanasi, Prayagraj (6D 5N)", duration: 5, category: "Domestic", image: "/images/varanasi.jpg" },
    { id: 121, title: "Odisha (6D 5N)", duration: 5, category: "Domestic", image: "/images/odisha.jpg" },
    { id: 122, title: "Konkan Tour (4D 3N)", duration: 3, category: "Domestic", image: "/images/konkan.jpg" },
  
    // -------------------------------
    // RELIGIOUS TOURS
    // (some duplicates from Domestic but with category = Religious)
    // -------------------------------
    { id: 201, title: "Chardham Yatra (11D 10N)", duration: 10, category: "Religious", image: "/images/chardham.jpg" },
    { id: 202, title: "Dodham Yatra (5D 4N)", duration: 4, category: "Religious", image: "/images/dodham.jpg" },
    { id: 203, title: "Vaishnodevi, Katra (5D 4N)", duration: 4, category: "Religious", image: "/images/vaishnodevi.jpg" },
    { id: 204, title: "Tirupati (3D 2N)", duration: 2, category: "Religious", image: "/images/tirupati.jpg" },
    { id: 205, title: "Ayodya, Varanasi, Prayagraj (6D 5N)", duration: 5, category: "Religious", image: "/images/varanasi.jpg" },
  
    // -------------------------------
    // HONEYMOON
    // -------------------------------
    { id: 301, title: "Mauritius Honeymoon", duration: 5, category: "Honeymoon", image: "/images/mauritius-honeymoon.jpg" },
    { id: 302, title: "Maldives Honeymoon", duration: 4, category: "Honeymoon", image: "/images/maldives-honeymoon.jpg" },
    { id: 303, title: "Bali, Indonesia Honeymoon", duration: 5, category: "Honeymoon", image: "/images/bali-honeymoon.jpg" },
    { id: 304, title: "Phuket & Krabi Honeymoon", duration: 4, category: "Honeymoon", image: "/images/phuket-honeymoon.jpg" },
    { id: 305, title: "Paris Honeymoon", duration: 6, category: "Honeymoon", image: "/images/paris-honeymoon.jpg" },
    { id: 306, title: "Switzerland Honeymoon", duration: 6, category: "Honeymoon", image: "/images/switzerland-honeymoon.jpg" },
    { id: 307, title: "Venice, Italy Honeymoon", duration: 5, category: "Honeymoon", image: "/images/venice-honeymoon.jpg" },
    { id: 308, title: "Philippines Honeymoon", duration: 5, category: "Honeymoon", image: "/images/philippines-honeymoon.jpg" },
    { id: 309, title: "Kashmir Honeymoon", duration: 5, category: "Honeymoon", image: "/images/kashmir-honeymoon.jpg" },
    { id: 310, title: "Kerala Honeymoon", duration: 5, category: "Honeymoon", image: "/images/kerala-honeymoon.jpg" },
    { id: 311, title: "Goa Honeymoon", duration: 3, category: "Honeymoon", image: "/images/goa-honeymoon.jpg" },
    { id: 312, title: "Himachal Honeymoon", duration: 6, category: "Honeymoon", image: "/images/himachal-honeymoon.jpg" },
  
    // -------------------------------
    // CRUISE
    // -------------------------------
    { id: 401, title: "Cordella Cruise", duration: 7, category: "Cruise", image: "/images/cordella.jpg" },
    { id: 402, title: "Bahamas Cruise Vacation", duration: 7, category: "Cruise", image: "/images/bahamas.jpg" },
  ];
  