import { Property } from '../types';

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    address: "123 Main Street, Unit 4B",
    city: "New York",
    price: 3500,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1200,
    description: "Stunning modern loft in the heart of downtown. Floor-to-ceiling windows flood the space with natural light. Features exposed brick walls, hardwood floors throughout, and a gourmet kitchen with stainless steel appliances. Building amenities include a rooftop lounge, fitness center, and 24-hour concierge.",
    features: ["Rooftop Lounge", "Fitness Center", "24h Concierge", "Laundry In-Unit", "Parking Available", "Pet Friendly"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    ],
    agent: {
      name: "Sarah Johnson",
      phone: "(212) 555-0147",
      email: "sarah.j@premierhomes.com",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200"
    },
    isFeatured: true,
    available: true
  },
  {
    id: 2,
    title: "Luxury Waterfront Condo",
    address: "500 Harbor View Drive, Unit 12C",
    city: "Miami",
    price: 4500,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    description: "Breathtaking waterfront living with panoramic ocean views. This luxury condo features an open floor plan, designer finishes, and a private balcony overlooking the bay. The building offers valet parking, infinity pool, and direct beach access.",
    features: ["Ocean View", "Infinity Pool", "Beach Access", "Valet Parking", "Gym", "Storage Unit"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
    ],
    agent: {
      name: "Michael Chen",
      phone: "(305) 555-0289",
      email: "michael.c@beachliving.com",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
    },
    isFeatured: true,
    available: true
  },
  {
    id: 3,
    title: "Cozy Studio near University",
    address: "789 College Avenue, Unit 2A",
    city: "Boston",
    price: 1800,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 550,
    description: "Perfect studio apartment steps from campus. Recently renovated with modern finishes. Includes all utilities and high-speed internet. Walking distance to shops, restaurants, and public transit.",
    features: ["All Utilities Included", "High-Speed Internet", "Near Campus", "Laundry On-Site", "Bike Storage", "Study Lounge"],
    images: [
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800",
      "https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=800",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800"
    ],
    agent: {
      name: "Emily Rodriguez",
      phone: "(617) 555-0312",
      email: "emily.r@campusliving.com",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200"
    },
    isFeatured: false,
    available: true
  },
  {
    id: 4,
    title: "Spacious Family Home",
    address: "456 Oak Lane",
    city: "Chicago",
    price: 3200,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    description: "Beautiful single-family home in a quiet suburban neighborhood. Features a large backyard, two-car garage, updated kitchen with granite countertops, and a finished basement. Excellent schools nearby.",
    features: ["Large Backyard", "2-Car Garage", "Finished Basement", "Central AC", "Security System", "Near Schools"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    agent: {
      name: "David Thompson",
      phone: "(312) 555-0456",
      email: "david.t@familyhomes.com",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
    },
    isFeatured: true,
    available: true
  },
  {
    id: 5,
    title: "Artist's Loft in Arts District",
    address: "222 Gallery Row, Unit 8D",
    city: "Los Angeles",
    price: 2800,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 1400,
    description: "Unique artist's loft with soaring 16-foot ceilings and industrial charm. Original hardwood floors, exposed ductwork, and massive windows create an inspiring space. Located in the heart of the arts district with galleries, cafes, and boutiques at your doorstep.",
    features: ["High Ceilings", "Natural Light", "Freight Elevator", "Roof Deck Access", "Pet Friendly", "Artist Community"],
    images: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800"
    ],
    agent: {
      name: "Jessica Martinez",
      phone: "(213) 555-0678",
      email: "jessica.m@artlofts.com",
      photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200"
    },
    isFeatured: false,
    available: true
  },
  {
    id: 6,
    title: "Executive Penthouse Suite",
    address: "1000 Skyline Tower, PH2",
    city: "Seattle",
    price: 7500,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2800,
    description: "Unparalleled luxury in this stunning penthouse with 360-degree views of the city and mountains. Features include a chef's kitchen, private terrace, wine cellar, and smart home technology throughout. Full-service building with doorman, spa, and private dining.",
    features: ["360° Views", "Private Terrace", "Wine Cellar", "Smart Home", "Doorman", "Private Spa"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800"
    ],
    agent: {
      name: "Robert Kim",
      phone: "(206) 555-0890",
      email: "robert.k@skylineestates.com",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200"
    },
    isFeatured: true,
    available: true
  },
  {
    id: 7,
    title: "Charming Victorian Flat",
    address: "88 Heritage Street, Unit 3",
    city: "San Francisco",
    price: 3800,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1100,
    description: "Beautifully restored Victorian flat with original period details and modern updates. Features include bay windows, decorative fireplace, built-in bookshelves, and a shared garden. Located in a historic neighborhood with excellent walkability.",
    features: ["Period Details", "Bay Windows", "Garden Access", "Laundry In-Unit", "Storage", "Historic Building"],
    images: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
    ],
    agent: {
      name: "Amanda Lee",
      phone: "(415) 555-0123",
      email: "amanda.l@victorianliving.com",
      photo: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200"
    },
    isFeatured: false,
    available: true
  },
  {
    id: 8,
    title: "Modern Tech Hub Apartment",
    address: "555 Innovation Drive, Unit 15F",
    city: "Austin",
    price: 2400,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 850,
    description: "Cutting-edge apartment designed for the modern professional. Features include a dedicated workspace, ultra-fast fiber internet, and smart home integration. Building offers co-working space, podcast studios, and a rooftop with city views.",
    features: ["Co-Working Space", "Fiber Internet", "Smart Home", "Podcast Studios", "Rooftop Lounge", "Bike Storage"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800"
    ],
    agent: {
      name: "Chris Taylor",
      phone: "(512) 555-0345",
      email: "chris.t@techrentals.com",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
    },
    isFeatured: false,
    available: true
  }
];

export const cities = ["New York", "Miami", "Boston", "Chicago", "Los Angeles", "Seattle", "San Francisco", "Austin"];
