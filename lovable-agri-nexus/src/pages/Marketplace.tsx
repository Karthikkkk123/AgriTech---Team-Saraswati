import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Search, ShoppingCart, Star, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import { SlideCart } from "@/components/SlideCart";
import { ProductDialog } from "@/components/ProductDialog";

const products = [
  {
    id: 1,
    name: "Organic Red Tomatoes",
    farmer: "Krishna Reddy's Farm",
    location: "Bangalore, Karnataka",
    price: 45,
    rating: 4.8,
    image: "/images/products/tomatoes.jpg",
    category: "Vegetables",
    inStock: true,
    description:
      "Fresh, organic tomatoes grown without pesticides. Perfect for salads and cooking.",
    farmingMethod: "Organic",
    certification: "NPOP Certified Organic",
    harvestDate: "2024-02-15",
  },
  {
    id: 2,
    name: "Fresh Sweet Corn",
    farmer: "Gurmeet Singh & Sons",
    location: "Ludhiana, Punjab",
    price: 25,
    rating: 4.9,
    image: "/images/products/corn.jpg",
    category: "Vegetables",
    inStock: true,
    description: "Sweet and tender corn, freshly harvested from our fields.",
    farmingMethod: "Traditional",
    certification: "GAP Certified",
  },
  {
    id: 3,
    name: "Premium Mangoes",
    farmer: "Desai Orchards",
    location: "Ratnagiri, Maharashtra",
    price: 150,
    rating: 4.7,
    image: "/images/products/mangoes.jpg",
    category: "Fruits",
    inStock: false,
    description: "Famous Alphonso mangoes from Ratnagiri region.",
    farmingMethod: "Traditional",
    certification: "GI Tagged",
  },
  {
    id: 4,
    name: "Organic Rice",
    farmer: "Venkatesh Farms",
    location: "West Godavari, AP",
    price: 75,
    rating: 4.6,
    image: "/images/products/rice.jpg",
    category: "Grains",
    inStock: true,
    description: "Premium quality organic rice, perfect for daily consumption.",
    farmingMethod: "Organic",
    certification: "NPOP Certified Organic",
  },
  {
    id: 5,
    name: "Fresh Green Peas",
    farmer: "Rajinder Singh's Fields",
    location: "Amritsar, Punjab",
    price: 80,
    rating: 4.7,
    image: "/images/products/green-peas.jpg",
    category: "Vegetables",
    inStock: true,
    description: "Sweet and tender green peas, perfect for curries and pulao.",
    farmingMethod: "Natural",
    certification: "GAP Certified",
    harvestDate: "2024-02-18",
  },
  {
    id: 6,
    name: "Premium Saffron",
    farmer: "Mehboob Ali & Family",
    location: "Pampore, Kashmir",
    price: 299,
    rating: 5.0,
    image: "/images/products/saffron.jpg",
    category: "Spices",
    inStock: true,
    description:
      "Highest grade Kashmiri saffron, hand-picked and carefully processed.",
    farmingMethod: "Traditional",
    certification: "GI Tagged",
    harvestDate: "2023-11-15",
  },
  {
    id: 7,
    name: "Organic Baby Potatoes",
    farmer: "Lakshmi Devi's Organics",
    location: "Ooty, Tamil Nadu",
    price: 60,
    rating: 4.6,
    image: "/images/products/baby-potatoes.jpg",
    category: "Vegetables",
    inStock: true,
    description: "Fresh, organic baby potatoes from the hills of Ooty.",
    farmingMethod: "Organic",
    certification: "NPOP Certified Organic",
    harvestDate: "2024-02-20",
  },
  {
    id: 8,
    name: "Pure Forest Honey",
    farmer: "Adivasi Cooperative",
    location: "Wayanad, Kerala",
    price: 450,
    rating: 4.9,
    image: "/images/products/forest-honey.jpg",
    category: "Natural Products",
    inStock: true,
    description:
      "Wild honey collected from forest flowers, unprocessed and pure.",
    farmingMethod: "Wild Harvested",
    certification: "Organic India",
    harvestDate: "2024-01-10",
  },
  {
    id: 9,
    name: "Fresh Coconuts",
    farmer: "Murali's Coconut Grove",
    location: "Pollachi, Tamil Nadu",
    price: 35,
    rating: 4.7,
    image: "/images/products/coconuts.jpg",
    category: "Fruits",
    inStock: true,
    description: "Tender coconuts perfect for drinking and cooking.",
    farmingMethod: "Traditional",
    certification: "GAP Certified",
    harvestDate: "2024-02-22",
  },
  {
    id: 10,
    name: "Black Cardamom",
    farmer: "Sharma Spice Gardens",
    location: "Sikkim",
    price: 180,
    rating: 4.8,
    image: "/images/products/cardamom.jpg",
    category: "Spices",
    inStock: true,
    description:
      "Large, aromatic black cardamom pods from the hills of Sikkim.",
    farmingMethod: "Natural",
    certification: "Organic Certified",
    harvestDate: "2024-01-05",
  },
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      farmer: product.farmer,
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
    setIsCartOpen(true);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !categoryFilter ||
      categoryFilter === "all" ||
      product.category === categoryFilter;
    const matchesLocation =
      !locationFilter ||
      locationFilter === "all" ||
      product.location.includes(locationFilter);

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-4">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">Marketplace</h1>
            <p className="text-muted-foreground">
              Fresh produce directly from local farmers
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Vegetables">Vegetables</SelectItem>
              <SelectItem value="Fruits">Fruits</SelectItem>
              <SelectItem value="Grains">Grains</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Karnataka">Karnataka</SelectItem>
              <SelectItem value="Punjab">Punjab</SelectItem>
              <SelectItem value="Maharashtra">Maharashtra</SelectItem>
              <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
            </SelectContent>
          </Select>

          <Button className="gradient-primary text-white">Apply Filters</Button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover-lift overflow-hidden group">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  {product.inStock ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">
                    {product.farmer}
                  </p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1">{product.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.location}
                  </div>
                  <span className="text-lg font-bold text-primary">
                    ₹{product.price}/kg
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedProduct(product)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="gradient-primary text-white flex-1"
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Slide-in */}
        <SlideCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Product Details Dialog */}
        <ProductDialog
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
          onAddToCart={() =>
            selectedProduct && handleAddToCart(selectedProduct)
          }
        />
      </div>
    </div>
  );
};

export default Marketplace;
