import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Search, ShoppingCart, Star } from "lucide-react";
import { ShoppingCart as CartComponent } from "@/components/ShoppingCart";
import { ProductDetailsDialog } from "@/components/ProductDetailsDialog";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const shopItems = [
    {
      id: 1,
      name: "Premium Organic Fertilizer",
      category: "Fertilizers",
      price: 2499,
      rating: 4.8,
      image: ["/images/supplies/organic-fertilizer.jpg.jpg"],
      description:
        "Premium grade organic fertilizer enriched with natural nutrients",
      specifications: {
        "NPK ratio": "5-5-5",
        "Package Size": "5kg",
        Type: "100% organic",
        "Shelf Life": "2 years",
      },
      features: [
        "Suitable for all crops",
        "Improves soil health",
        "Long-lasting effect",
      ],
      manufacturer: "GreenEarth Organics",
      inStock: true,
    },
    {
      id: 2,
      name: "Premium Vegetable Seeds Kit",
      category: "Seeds",
      price: 999,
      rating: 4.9,
      image: ["/images/supplies/Premium-Vegetable-Seed-Kit.jpg"],
      description: "High-quality vegetable seeds kit with 10 varieties",
      specifications: [
        "10 different vegetables",
        "Guaranteed germination",
        "Storage box included",
      ],
      features: [
        "Non-GMO seeds",
        "High yield varieties",
        "Season-specific selection",
      ],
      manufacturer: "Indian Seeds Co",
      inStock: true,
    },
    {
      id: 3,
      name: "Professional Pruning Shears",
      category: "Tools",
      price: 1499,
      rating: 4.7,
      image: ["/images/supplies/Professional-Pruning-Shears.jpg"],
      description: "Heavy-duty steel pruning shears with ergonomic grip",
      specifications: [
        "Stainless steel blade",
        "8-inch length",
        "Comfort grip",
      ],
      features: ["Sharp precision cutting", "Safety lock", "Ergonomic design"],
      manufacturer: "GardenPro Tools",
      inStock: true,
    },
    {
      id: 4,
      name: "Advanced Drip Irrigation Kit",
      category: "Irrigation",
      price: 2999,
      rating: 4.6,
      image: ["/images/supplies/drip-irrigation.jpg"],
      description: "Complete drip irrigation system for up to 100 plants",
      specifications: ["100 drippers", "50m main line", "Digital timer"],
      features: ["Water saving", "Automated control", "Easy installation"],
      manufacturer: "AquaTech Systems",
      inStock: true,
    },
    {
      id: 5,
      name: "Digital Soil Testing Kit",
      category: "Testing",
      price: 1899,
      rating: 4.5,
      image: ["/images/supplies/soil-test-kit.jpg"],
      description: "Professional soil testing kit with digital display",
      specifications: [
        "pH, N, P, K testing",
        "Digital display",
        "100 test strips",
      ],
      features: [
        "Instant results",
        "Battery operated",
        "Carrying case included",
      ],
      manufacturer: "AgriLab Tech",
      inStock: true,
    },
    {
      id: 6,
      name: "Organic Plant Protection Spray",
      category: "Pesticides",
      price: 749,
      rating: 4.4,
      image: ["/images/supplies/Organic-Plant-Protection-Spray.jpg"],
      description: "Natural, eco-friendly pest control solution",
      specifications: ["1 liter bottle", "Neem based", "Ready to use"],
      features: ["Chemical free", "Safe for edibles", "Long lasting effect"],
      manufacturer: "Organic Care",
      inStock: false,
    },
    {
      id: 7,
      name: "Premium Garden Tool Set",
      category: "Tools",
      price: 2499,
      rating: 4.7,
      image: ["/images/supplies/Premium-Garden-Tool-Set.jpg"],
      description: "Complete 8-piece garden tool set with carry bag",
      specifications: ["8 tools included", "Stainless steel", "Canvas bag"],
      features: ["Ergonomic handles", "Rust resistant", "Lifetime warranty"],
      manufacturer: "GardenPro Tools",
      inStock: true,
    },
    {
      id: 8,
      name: "Smart Weather Station",
      category: "Monitoring",
      price: 3999,
      rating: 4.8,
      image: ["/images/supplies/Smart-Weather-Station.jpg"],
      description: "Wi-Fi enabled weather monitoring station",
      specifications: ["Temperature", "Humidity", "Rainfall sensor"],
      features: ["Mobile app", "Data logging", "Weather alerts"],
      manufacturer: "WeatherTech",
      inStock: true,
    },
    {
      id: 9,
      name: "Solar Water Pump System",
      category: "Irrigation",
      price: 15999,
      rating: 4.9,
      image: ["/images/supplies/solar-pump.jpg"],
      description: "Complete solar-powered irrigation pump system",
      specifications: ["1HP motor", "2 solar panels", "Controller unit"],
      features: [
        "Zero electricity cost",
        "Low maintenance",
        "Automated operation",
      ],
      manufacturer: "SolarTech India",
      inStock: true,
    },
    {
      id: 10,
      name: "Vermicompost Starter Kit",
      category: "Fertilizers",
      price: 2999,
      rating: 4.6,
      image: ["/images/supplies/Vermicompost-Starter-Kit.jpg"],
      description: "Complete kit to start vermicomposting at home",
      specifications: ["3-tier system", "1kg earthworms", "Guide book"],
      features: [
        "Odorless process",
        "Continuous harvesting",
        "Space efficient",
      ],
      manufacturer: "Organic Solutions",
      inStock: true,
    },
  ];

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.product.id !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const filteredItems = shopItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !categoryFilter ||
      categoryFilter === "all" ||
      item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" asChild className="mr-4">
              <Link to="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                Farm Supply Shop
              </h1>
              <p className="text-muted-foreground">
                Quality tools, seeds, and supplies for modern farming
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsCartOpen(true)}
            className="relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
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
              <SelectItem value="Tools">Tools</SelectItem>
              <SelectItem value="Seeds">Seeds</SelectItem>
              <SelectItem value="Fertilizers">Fertilizers</SelectItem>
              <SelectItem value="Pesticides">Pesticides</SelectItem>
              <SelectItem value="Irrigation">Irrigation</SelectItem>
              <SelectItem value="Testing">Testing</SelectItem>
              <SelectItem value="Monitoring">Monitoring</SelectItem>
            </SelectContent>
          </Select>

          <Button className="gradient-primary text-white">Apply Filters</Button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover-lift overflow-hidden group">
              <div className="relative">
                {" "}
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  {item.inStock ? (
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

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {item.category}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm ml-1">{item.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-primary">
                    ₹{item.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setSelectedProduct(item);
                      setIsDetailDialogOpen(true);
                    }}
                  >
                    Details
                  </Button>
                  <Button
                    size="sm"
                    className="gradient-primary text-white flex-1"
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Details Dialog */}
        <ProductDetailsDialog
          product={selectedProduct}
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          onAddToCart={handleAddToCart}
        />

        {/* Shopping Cart */}
        <CartComponent
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </div>
    </div>
  );
};

export default Shop;
