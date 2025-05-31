export interface FarmSupply {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  manufacturer: string;
  inStock: boolean;
  rating: number;
  image: string;
  specifications: {
    [key: string]: string;
  };
  features: string[];
}

export const farmSupplies: FarmSupply[] = [
  {
    id: 1,
    name: "Premium Organic Fertilizer",
    category: "Fertilizers",
    price: 1200, // Price in INR
    description:
      "100% organic fertilizer ideal for all crops. Enriched with natural nutrients.",
    manufacturer: "Green Earth Solutions",
    inStock: true,
    rating: 4.8,
    image: "/images/supplies/fertilizer.jpg",
    specifications: {
      Weight: "25 kg",
      Type: "Organic",
      Composition: "NPK 5:5:5",
      "Shelf Life": "2 years",
    },
    features: [
      "100% Organic",
      "Suitable for all crops",
      "Improves soil health",
      "No chemical residue",
    ],
  },
  {
    id: 2,
    name: "Advanced Drip Irrigation Kit",
    category: "Irrigation",
    price: 15000,
    description:
      "Complete drip irrigation system for efficient water management.",
    manufacturer: "AquaTech Systems",
    inStock: true,
    rating: 4.9,
    image: "/images/supplies/irrigation.jpg",
    specifications: {
      Coverage: "1 acre",
      Material: "UV resistant PVC",
      "Pressure Range": "1-4 bar",
      Warranty: "5 years",
    },
    features: [
      "Water efficient",
      "Easy installation",
      "Durable material",
      "Complete kit",
    ],
  },
  {
    id: 3,
    name: "Solar Water Pump",
    category: "Equipment",
    price: 45000,
    description: "5HP solar-powered water pump for agricultural use.",
    manufacturer: "SolarTech India",
    inStock: true,
    rating: 4.7,
    image: "/images/supplies/pump.jpg",
    specifications: {
      Power: "5 HP",
      "Flow Rate": "120 LPM",
      "Head Range": "50-150 ft",
      "Solar Panel": "5 kW",
    },
    features: [
      "Zero electricity cost",
      "Low maintenance",
      "High efficiency",
      "Government subsidy eligible",
    ],
  },
  {
    id: 4,
    name: "Bio Pesticide Pack",
    category: "Pest Control",
    price: 850,
    description: "Natural pest control solution safe for organic farming.",
    manufacturer: "Organic Care Products",
    inStock: true,
    rating: 4.6,
    image: "/images/supplies/pesticide.jpg",
    specifications: {
      Volume: "5 L",
      Type: "Neem based",
      "Target Pests": "Multiple",
      Safety: "Food grade",
    },
    features: [
      "Organic certified",
      "No harmful residue",
      "Broad spectrum",
      "Safe for beneficial insects",
    ],
  },
  {
    id: 5,
    name: "Mini Tractor",
    category: "Machinery",
    price: 285000,
    description: "Compact tractor suitable for small to medium farms.",
    manufacturer: "FarmTech Machines",
    inStock: true,
    rating: 4.8,
    image: "/images/supplies/tractor.jpg",
    specifications: {
      Power: "22 HP",
      "Fuel Type": "Diesel",
      Transmission: "8 Forward + 2 Reverse",
      Warranty: "2 years",
    },
    features: [
      "Fuel efficient",
      "Easy maintenance",
      "Versatile attachments",
      "Compact size",
    ],
  },
  {
    id: 6,
    name: "Smart Soil Testing Kit",
    category: "Tools",
    price: 3500,
    description: "Digital soil testing kit for NPK and pH measurement.",
    manufacturer: "AgriLabs India",
    inStock: true,
    rating: 4.5,
    image: "/images/supplies/kit.jpg",
    specifications: {
      Tests: "NPK, pH, EC",
      "Results Time": "5 minutes",
      "Battery Life": "500 tests",
      Display: "Digital LCD",
    },
    features: [
      "Instant results",
      "High accuracy",
      "Portable design",
      "Rechargeable battery",
    ],
  },
  {
    id: 7,
    name: "Greenhouse Polysheet",
    category: "Infrastructure",
    price: 12500,
    description: "UV stabilized polysheet for greenhouse construction.",
    manufacturer: "PlastiTech Solutions",
    inStock: true,
    rating: 4.7,
    image: "/images/supplies/greenhouse.jpg",
    specifications: {
      Size: "30x10 meters",
      Thickness: "200 micron",
      "UV Protection": "Yes",
      Life: "5 years",
    },
    features: [
      "UV resistant",
      "Temperature control",
      "Light diffusion",
      "Weather resistant",
    ],
  },
  {
    id: 8,
    name: "Electric Sprayer",
    category: "Equipment",
    price: 4500,
    description:
      "Battery-operated backpack sprayer for efficient pesticide application.",
    manufacturer: "SprayTech India",
    inStock: true,
    rating: 4.6,
    image: "/images/supplies/sprayer1.jpg",
    specifications: {
      Capacity: "16 L",
      Battery: "12V Lithium",
      "Spray Range": "20-25 ft",
      Runtime: "8 hours",
    },
    features: [
      "Lightweight design",
      "Long battery life",
      "Multiple nozzles",
      "Easy maintenance",
    ],
  },
];
