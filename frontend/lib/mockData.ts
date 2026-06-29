import { Destination, Attraction, Hotel, Restaurant } from "../types";

export const destinations: Destination[] = [
  {
    id: "goa",
    name: "Goa",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description: "Famous for its pristine beaches, vibrant nightlife, 17th-century Portuguese churches, and rich spice plantations.",
    rating: 4.8,
    reviewCount: 1250,
    state: "Goa",
    location: "Western Coast, India",
    distance: "650 km",
    budget: 15000,
    weather: "28°C, Sunny",
    hotelCount: 340,
    touristPlacesCount: 45,
    coordinates: [15.2993, 74.124]
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    image: "https://images.unsplash.com/photo-1608958416715-db14aa52f679?auto=format&fit=crop&w=1200&q=80",
    description: "The historic 'City of Pearls' blending royal Nizami heritage with a modern, high-tech metropolis and world-famous Biryani.",
    rating: 4.6,
    reviewCount: 980,
    state: "Telangana",
    location: "Southern India",
    distance: "0 km (Current Location)",
    budget: 8000,
    weather: "31°C, Partly Cloudy",
    hotelCount: 220,
    touristPlacesCount: 30,
    coordinates: [17.385, 78.4867]
  },
  {
    id: "delhi",
    name: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    description: "India's capital city, showcasing the historic grandeur of Old Delhi alongside the neat grids of British-era New Delhi.",
    rating: 4.5,
    reviewCount: 1850,
    state: "Delhi NCR",
    location: "Northern India",
    distance: "1580 km",
    budget: 12000,
    weather: "33°C, Hazy Sunny",
    hotelCount: 510,
    touristPlacesCount: 75,
    coordinates: [28.6139, 77.209]
  },
  {
    id: "jaipur",
    name: "Jaipur",
    image: "https://images.unsplash.com/photo-1477584305590-3a63f60078d0?auto=format&fit=crop&w=1200&q=80",
    description: "Known as the 'Pink City', Jaipur features majestic palaces, grand hilltop forts, and colorful traditional bazaars.",
    rating: 4.7,
    reviewCount: 1420,
    state: "Rajasthan",
    location: "Western India",
    distance: "1420 km",
    budget: 11000,
    weather: "34°C, Sunny",
    hotelCount: 280,
    touristPlacesCount: 40,
    coordinates: [26.9124, 75.7873]
  },
  {
    id: "kashmir",
    name: "Kashmir",
    image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=1200&q=80",
    description: "Srinagar and Kashmir valley represent the 'Heaven on Earth' with snow-capped mountains, wooden houseboats, and Dal Lake.",
    rating: 4.9,
    reviewCount: 2100,
    state: "Jammu & Kashmir",
    location: "Far North India",
    distance: "2150 km",
    budget: 25000,
    weather: "18°C, Pleasant Breezes",
    hotelCount: 180,
    touristPlacesCount: 35,
    coordinates: [34.0837, 74.7973]
  },
  {
    id: "kerala",
    name: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    description: "Known as 'God's Own Country', Kerala is loved for its peaceful backwaters, spice-filled hills of Munnar, and tropical palms.",
    rating: 4.8,
    reviewCount: 1650,
    state: "Kerala",
    location: "South-West Coast, India",
    distance: "820 km",
    budget: 18000,
    weather: "29°C, Tropical Rain Shower",
    hotelCount: 310,
    touristPlacesCount: 50,
    coordinates: [10.8505, 76.2711]
  }
];

export const mockAttractions: Record<string, Attraction[]> = {
  goa: [
    {
      id: "goa-attr-1",
      name: "Baga Beach",
      location: "North Goa",
      rating: 4.6,
      cost: 500,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
      description: "A famous beach known for water sports, beach shacks, and night parties."
    },
    {
      id: "goa-attr-2",
      name: "Basilica of Bom Jesus",
      location: "Old Goa",
      rating: 4.7,
      cost: 100,
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80",
      description: "UNESCO World Heritage Site holding the mortal remains of St. Francis Xavier."
    },
    {
      id: "goa-attr-3",
      name: "Dudhsagar Falls",
      location: "Sanguem District",
      rating: 4.8,
      cost: 1200,
      image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80",
      description: "A majestic four-tiered waterfall cascading down the Mandovi river."
    }
  ],
  hyderabad: [
    {
      id: "hyd-attr-1",
      name: "Charminar",
      location: "Old City",
      rating: 4.7,
      cost: 80,
      image: "https://images.unsplash.com/photo-1608958416715-db14aa52f679?auto=format&fit=crop&w=600&q=80",
      description: "The iconic 16th-century mosque with four grand minarets and active street bazaars."
    },
    {
      id: "hyd-attr-2",
      name: "Golconda Fort",
      location: "Karwan",
      rating: 4.6,
      cost: 150,
      image: "https://images.unsplash.com/photo-1581333100576-b73bfc7972eb?auto=format&fit=crop&w=600&q=80",
      description: "Historic fortress complex renowned for its acoustic effects and royal diamonds history."
    },
    {
      id: "hyd-attr-3",
      name: "Ramoji Film City",
      location: "Abdullapurmet",
      rating: 4.5,
      cost: 1300,
      image: "https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&w=600&q=80",
      description: "The world's largest integrated film studio complex and theme park."
    }
  ],
  delhi: [
    {
      id: "delhi-attr-1",
      name: "India Gate",
      location: "Central Delhi",
      rating: 4.7,
      cost: 0,
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80",
      description: "A majestic war memorial dedicated to the soldiers of the Indian Army."
    },
    {
      id: "delhi-attr-2",
      name: "Qutub Minar",
      location: "South Delhi",
      rating: 4.6,
      cost: 120,
      image: "https://images.unsplash.com/photo-1610123598147-f63255192665?auto=format&fit=crop&w=600&q=80",
      description: "A 73-meter tall brick minaret built in 1193, surrounded by historic ruins."
    },
    {
      id: "delhi-attr-3",
      name: "Lotus Temple",
      location: "Kalkaji",
      rating: 4.5,
      cost: 0,
      image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=600&q=80",
      description: "A Bahai House of Worship famous for its flowerlike shape and quiet meditation hall."
    }
  ],
  jaipur: [
    {
      id: "jaipur-attr-1",
      name: "Hawa Mahal",
      location: "Downtown Jaipur",
      rating: 4.8,
      cost: 200,
      image: "https://images.unsplash.com/photo-1477584305590-3a63f60078d0?auto=format&fit=crop&w=600&q=80",
      description: "The 'Palace of Winds' featuring a stunning honeycomb facade with 953 small windows."
    },
    {
      id: "jaipur-attr-2",
      name: "Amer Fort",
      location: "Amer",
      rating: 4.7,
      cost: 500,
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
      description: "A grand fort situated high on a hill, famous for its artistic Hindu elements and Sheesh Mahal."
    },
    {
      id: "jaipur-attr-3",
      name: "City Palace",
      location: "Old City",
      rating: 4.6,
      cost: 700,
      image: "https://images.unsplash.com/photo-1603258591632-4d2d48bf5b07?auto=format&fit=crop&w=600&q=80",
      description: "The royal seat of the Maharaja of Jaipur, displaying collections of textiles, arms, and art."
    }
  ],
  kashmir: [
    {
      id: "kash-attr-1",
      name: "Dal Lake Shikara",
      location: "Srinagar",
      rating: 4.9,
      cost: 800,
      image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=600&q=80",
      description: "Take a wooden boat ride past floating flower markets and charming wooden houseboats."
    },
    {
      id: "kash-attr-2",
      name: "Gulmarg Gondola",
      location: "Gulmarg",
      rating: 4.8,
      cost: 950,
      image: "https://images.unsplash.com/photo-1618386230353-3631c1ca65be?auto=format&fit=crop&w=600&q=80",
      description: "One of the highest cable cars in Asia, offering breathtaking snowy mountain panoramas."
    },
    {
      id: "kash-attr-3",
      name: "Pahalgam Valley",
      location: "Anantnag District",
      rating: 4.8,
      cost: 400,
      image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=600&q=80",
      description: "Scenic valley along the Lidder River, perfect for horse riding and alpine trekking."
    }
  ],
  kerala: [
    {
      id: "ker-attr-1",
      name: "Alleppey Houseboats",
      location: "Alappuzha",
      rating: 4.9,
      cost: 6000,
      image: "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&w=600&q=80",
      description: "Cruise down palm-fringed canals in standard or luxury thatched-roof houseboats."
    },
    {
      id: "ker-attr-2",
      name: "Munnar Tea Gardens",
      location: "Munnar",
      rating: 4.7,
      cost: 150,
      image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80",
      description: "Vast carpets of green tea plantations tucked in the Western Ghats mountain range."
    },
    {
      id: "ker-attr-3",
      name: "Athirappilly Waterfalls",
      location: "Thrissur District",
      rating: 4.8,
      cost: 100,
      image: "https://images.unsplash.com/photo-1616644078864-16a7509f6e52?auto=format&fit=crop&w=600&q=80",
      description: "Commonly referred to as the 'Niagara of India', a wide 80-foot waterfall cascade."
    }
  ]
};

export const mockHotels: Record<string, Hotel[]> = {
  goa: [
    {
      id: "goa-hotel-1",
      name: "Taj Exotica Resort & Spa",
      location: "Benaulim, South Goa",
      rating: 4.9,
      price: 18000,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      description: "Mediterranean-style resort set in 56 acres of landscaped gardens overlooking the sea."
    },
    {
      id: "goa-hotel-2",
      name: "Cidade de Goa",
      location: "Dona Paula, Panaji",
      rating: 4.5,
      price: 8500,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
      description: "Vibrant beachside property reflecting classic Portuguese village architecture."
    }
  ],
  hyderabad: [
    {
      id: "hyd-hotel-1",
      name: "Taj Falaknuma Palace",
      location: "Engine Bowli, Falaknuma",
      rating: 4.9,
      price: 32000,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
      description: "A restored 19th-century royal palace offering guests a taste of Nizami luxury."
    },
    {
      id: "hyd-hotel-2",
      name: "The Westin Mindspace",
      location: "Hitec City, Madhapur",
      rating: 4.6,
      price: 9500,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
      description: "A premium business hotel offering wellness amenities in Hyderabad's tech hub."
    }
  ],
  delhi: [
    {
      id: "delhi-hotel-1",
      name: "The Leela Palace New Delhi",
      location: "Chanakyapuri, New Delhi",
      rating: 4.9,
      price: 22000,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      description: "An elegant mixture of Lutyens' architecture and royal Indian culture in the diplomatic enclave."
    },
    {
      id: "delhi-hotel-2",
      name: "Radisson Blu Plaza",
      location: "Mahipalpur, Near Airport",
      rating: 4.4,
      price: 7000,
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80",
      description: "Sophisticated airport hotel with excellent spa programs and award-winning dining."
    }
  ],
  jaipur: [
    {
      id: "jaipur-hotel-1",
      name: "Rambagh Palace",
      location: "Bhawani Singh Road, Jaipur",
      rating: 4.9,
      price: 28000,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
      description: "The former residence of the Maharaja of Jaipur, featuring architectural masterpieces."
    },
    {
      id: "jaipur-hotel-2",
      name: "ITC Rajputana",
      location: "Gopalbari, Jaipur",
      rating: 4.7,
      price: 8000,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      description: "Modern luxury hotel drawing inspiration from the red-brick forts of Rajasthan."
    }
  ],
  kashmir: [
    {
      id: "kash-hotel-1",
      name: "The Khyber Himalayan Resort & Spa",
      location: "Gulmarg, Kashmir",
      rating: 4.9,
      price: 24000,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
      description: "Clad in pine and slate, this resort offers unparalleled views of the Affarwat peaks."
    },
    {
      id: "kash-hotel-2",
      name: "Welcomheritage Gurkha Houseboats",
      location: "Nigeen Lake, Srinagar",
      rating: 4.6,
      price: 6500,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      description: "Carved cedarwood floating houseboats providing a cozy Kashmiri experience."
    }
  ],
  kerala: [
    {
      id: "ker-hotel-1",
      name: "Kumarakom Lake Resort",
      location: "Kottayam, Kerala",
      rating: 4.8,
      price: 19000,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      description: "Traditional heritage villas reconstructed on the banks of Lake Vembanad."
    },
    {
      id: "ker-hotel-2",
      name: "The Panoramic Getaway",
      location: "Chithirapuram, Munnar",
      rating: 4.7,
      price: 9000,
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80",
      description: "Modern luxury resort situated at the top of a hill offering majestic sunrise vistas."
    }
  ]
};

export const mockRestaurants: Record<string, Restaurant[]> = {
  goa: [
    { id: "goa-res-1", name: "Gunpowder", cuisine: "South Indian / Coastal", rating: 4.7, priceRange: "$$", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" },
    { id: "goa-res-2", name: "Thalassa", cuisine: "Greek / Mediterranean", rating: 4.6, priceRange: "$$$", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
  ],
  hyderabad: [
    { id: "hyd-res-1", name: "Paradise Biryani", cuisine: "Nizami Mughlai", rating: 4.5, priceRange: "$$", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" },
    { id: "hyd-res-2", name: "Jewel of Nizams", cuisine: "Mughlai Royalty", rating: 4.8, priceRange: "$$$$", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80" }
  ],
  delhi: [
    { id: "del-res-1", name: "Karim's", cuisine: "Mughlai Heritage", rating: 4.6, priceRange: "$$", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" },
    { id: "del-res-2", name: "Bukhara", cuisine: "North-West Frontier", rating: 4.9, priceRange: "$$$$", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80" }
  ],
  jaipur: [
    { id: "jaip-res-1", name: "Laxmi Mishthan Bhandar", cuisine: "Rajasthani Thali", rating: 4.5, priceRange: "$$", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" },
    { id: "jaip-res-2", name: "1135 AD", cuisine: "Royal Rajputana", rating: 4.7, priceRange: "$$$", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
  ],
  kashmir: [
    { id: "kash-res-1", name: "Mughal Darbar", cuisine: "Kashmiri Wazwan", rating: 4.6, priceRange: "$$", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" },
    { id: "kash-res-2", name: "Ahdoos", cuisine: "Wazwan & Mughlai", rating: 4.8, priceRange: "$$$", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80" }
  ],
  kerala: [
    { id: "ker-res-1", name: "Sabyz Kerala", cuisine: "Traditional Malabar Sea Food", rating: 4.6, priceRange: "$$", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" },
    { id: "ker-res-2", name: "Villa Maya", cuisine: "Indo-Portuguese Fusion", rating: 4.8, priceRange: "$$$", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
  ]
};

export const whyChooseUs = [
  {
    title: "AI Trip Planning",
    description: "Our advanced algorithm curates perfect custom routes based on your budget, travel style, and live weather conditions.",
    icon: "Sparkles"
  },
  {
    title: "Interactive Maps",
    description: "Accurate Leaflet & OpenStreetMap visualizations so you never get lost during your adventures.",
    icon: "Map"
  },
  {
    title: "Affordable Hotels",
    description: "Exclusive partnerships with luxury resorts and budget-friendly stays offering up to 40% discount.",
    icon: "Hotel"
  },
  {
    title: "Smart Travel Guide",
    description: "Receive real-time notifications about local guidelines, historical facts, and regional safety alerts.",
    icon: "Compass"
  }
];

export const mockTestimonials = [
  {
    name: "Aarav Sharma",
    role: "Adventure Enthusiast",
    feedback: "FindTheWay totally transformed my trip to Kashmir. The AI route recommendation saved us 4 hours of travel time and pointed us to spots we didn't find in any guidebooks!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Deepika Nair",
    role: "Family Traveller",
    feedback: "Booking houseboats in Kerala was incredibly simple. The map showing nearby restaurants and clinics gave my family huge peace of mind.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  }
];
