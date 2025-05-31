export interface LandListing {
  id: string;
  title: string;
  location: string;
  area: string;
  price: string;
  soilType: string;
  waterSource: string;
  description: string;
  features: string[];
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const landListings: LandListing[] = [
  {
    id: "1",
    title: "Fertile Agricultural Land in Punjab",
    location: "Ludhiana-Ferozepur Road, Punjab",
    area: "5 Acres",
    price: "₹45,00,000 per acre",
    soilType: "Alluvial Soil",
    waterSource: "Tube Well + Canal",
    description:
      "Prime agricultural land with rich alluvial soil, ideal for wheat and rice cultivation. Well-connected to major markets.",
    features: ["Electricity Connection", "Road Access", "Irrigation System"],
    images: ["/images/land/punjab-farm.jpg"],
    coordinates: {
      lat: 30.901,
      lng: 75.8573,
    },
  },
  {
    id: "2",
    title: "Organic Farm Land in Kerala",
    location: "Wayanad, Kerala",
    area: "3 Acres",
    price: "₹35,00,000 per acre",
    soilType: "Red Laterite",
    waterSource: "Natural Stream",
    description:
      "Perfect for organic farming with natural water source. Suitable for spices and plantation crops.",
    features: ["Organic Certified", "Natural Water Source", "High Rainfall"],
    images: ["/images/land/kerala-spice.jpg"],
    coordinates: {
      lat: 11.6854,
      lng: 76.132,
    },
  },
  {
    id: "3",
    title: "Commercial Farmland in Maharashtra",
    location: "Nashik-Mumbai Highway, Maharashtra",
    area: "10 Acres",
    price: "₹55,00,000 per acre",
    soilType: "Black Cotton Soil",
    waterSource: "Dam Water + Well",
    description:
      "Strategic location near Mumbai-Nashik highway. Ideal for commercial farming and warehousing.",
    features: ["Highway Access", "Power Supply", "Storage Facility"],
    images: ["/images/land/maharashtra-farm.jpg"],
    coordinates: {
      lat: 19.9975,
      lng: 73.7898,
    },
  },
  {
    id: "4",
    title: "Fertile Land in Karnataka",
    location: "Mysore-Bangalore Highway, Karnataka",
    area: "7 Acres",
    price: "₹40,00,000 per acre",
    soilType: "Red Soil",
    waterSource: "Bore Well",
    description:
      "Well-developed farmland suitable for multiple crops. Close to Bangalore market.",
    features: ["Fenced", "Farm House", "Equipment Shed"],
    images: ["/images/land/karnataka-farm.jpg"],
    coordinates: {
      lat: 12.9716,
      lng: 77.5946,
    },
  },
  {
    id: "5",
    title: "Premium Farm Land in Gujarat",
    location: "Ahmedabad-Vadodara Expressway, Gujarat",
    area: "8 Acres",
    price: "₹50,00,000 per acre",
    soilType: "Medium Black Soil",
    waterSource: "Canal Irrigation",
    description:
      "Premium location with excellent connectivity. Suitable for cash crops.",
    features: ["24/7 Security", "Modern Irrigation", "Solar Power"],
    images: ["/images/land/gujarat-farm.jpg"],
    coordinates: {
      lat: 22.2587,
      lng: 71.1924,
    },
  },
  {
    id: "6",
    title: "Coastal Agricultural Land",
    location: "Ratnagiri, Maharashtra",
    area: "4 Acres",
    price: "₹30,00,000 per acre",
    soilType: "Coastal Alluvial",
    waterSource: "Perennial Stream",
    description:
      "Perfect for coconut plantation and coastal agriculture. Natural water source.",
    features: ["Coconut Trees", "Guest House", "Beach Proximity"],
    images: ["/images/land/coastal-farm.jpg"],
    coordinates: {
      lat: 16.9902,
      lng: 73.312,
    },
  },
  {
    id: "7",
    title: "Mountain View Farm",
    location: "Dehradun, Uttarakhand",
    area: "6 Acres",
    price: "₹42,00,000 per acre",
    soilType: "Mountain Soil",
    waterSource: "Spring Water",
    description:
      "Beautiful mountain farm with spring water. Ideal for fruit orchards.",
    features: ["Fruit Trees", "Mountain View", "Cool Climate"],
    images: ["/images/land/mountain-farm.jpg"],
    coordinates: {
      lat: 30.3165,
      lng: 78.0322,
    },
  },
  {
    id: "8",
    title: "Rice Farm Special",
    location: "West Godavari, Andhra Pradesh",
    area: "12 Acres",
    price: "₹38,00,000 per acre",
    soilType: "Delta Alluvial",
    waterSource: "River Canal",
    description:
      "Excellent for rice cultivation with established irrigation system.",
    features: ["Paddy Ready", "Storage Silos", "Market Access"],
    images: ["/images/land/rice-farm.jpg"],
    coordinates: {
      lat: 16.5583,
      lng: 81.7333,
    },
  },
  {
    id: "9",
    title: "Tea Estate Land",
    location: "Darjeeling, West Bengal",
    area: "15 Acres",
    price: "₹60,00,000 per acre",
    soilType: "Hill Soil",
    waterSource: "Natural Springs",
    description:
      "Premium tea estate land with perfect climate for tea cultivation.",
    features: ["Tea Plants", "Processing Unit", "Staff Quarters"],
    images: ["/images/land/tea-estate.jpg"],
    coordinates: {
      lat: 27.041,
      lng: 88.2663,
    },
  },
  {
    id: "10",
    title: "Mango Orchard",
    location: "Malihabad, Uttar Pradesh",
    area: "9 Acres",
    price: "₹36,00,000 per acre",
    soilType: "Loamy Soil",
    waterSource: "Tube Well",
    description:
      "Established mango orchard with premium varieties. Ready for commercial production.",
    features: ["Mango Trees", "Pack House", "Cold Storage"],
    images: ["/images/land/mango-farm.jpg"],
    coordinates: {
      lat: 26.9242,
      lng: 80.712,
    },
  },
];
