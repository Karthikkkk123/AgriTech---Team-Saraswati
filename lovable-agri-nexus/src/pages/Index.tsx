
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { 
  ShoppingCart, 
  Home as HomeIcon, 
  Database,
  Calendar,
  Camera,
  Cloud,
  User,
  Circle
} from "lucide-react";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Empowering Sustainable Agriculture",
      subtitle: "Connect directly with farmers, access smart nutrition, and grow with confidence",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    },
    {
      title: "Smart Technology for Smart Farming",
      subtitle: "AI-powered disease detection, weather insights, and crop management",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    },
    {
      title: "Transparent Supply Chain",
      subtitle: "Blockchain-verified traceability from farm to table",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    }
  ];

  const services = [
    {
      title: "Direct Marketplace",
      description: "Buy fresh produce directly from farmers without middlemen",
      icon: ShoppingCart,
      href: "/marketplace",
      color: "bg-forest-500"
    },
    {
      title: "Land Leasing",
      description: "Find and lease agricultural land for your farming needs",
      icon: HomeIcon,
      href: "/land-leasing",
      color: "bg-earth-500"
    },
    {
      title: "AI Nutrition Planning",
      description: "Personalized nutrition advice based on your health goals",
      icon: User,
      href: "/nutrition-chatbot",
      color: "bg-sage-500"
    },
    {
      title: "Weather Advisory",
      description: "Localized weather insights and alerts for better farming",
      icon: Cloud,
      href: "/weather-advisory",
      color: "bg-blue-500"
    },
    {
      title: "Disease Detection",
      description: "AI-powered plant disease identification from images",
      icon: Camera,
      href: "/disease-detection",
      color: "bg-red-500"
    },
    {
      title: "Blockchain Traceability",
      description: "Transparent supply chain tracking and verification",
      icon: Database,
      href: "/blockchain-traceability",
      color: "bg-purple-500"
    }
  ];

  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Organic Farmer",
      content: "AgriTech transformed my business. I now sell directly to consumers and earn 40% more than before.",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "John Smith",
      role: "Consumer",
      content: "I love knowing exactly where my food comes from. The quality is amazing and prices are fair.",
      avatar: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Sarah Johnson",
      role: "Land Owner",
      content: "The land leasing platform made it easy to connect with responsible farmers for my property.",
      avatar: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl mb-8 animate-slide-in">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild 
                    size="lg" 
                    className="gradient-primary text-white hover:opacity-90 hover-lift"
                  >
                    <Link to="/auth">Get Started</Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-lift"
                  >
                    <Link to="/marketplace">Explore Marketplace</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions for modern agriculture and sustainable living
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="hover-lift border-2 border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <CardHeader>
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  <Link to={service.href}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Real stories from farmers, consumers, and landowners
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Agriculture?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers, consumers, and stakeholders building a sustainable future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 hover-lift"
            >
              <Link to="/auth">Join AgriTech</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 hover-lift"
            >
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold text-primary">AgriTech</span>
              </div>
              <p className="text-muted-foreground">
                Empowering sustainable agriculture through technology and transparency.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/marketplace" className="hover:text-primary">Marketplace</Link></li>
                <li><Link to="/land-leasing" className="hover:text-primary">Land Leasing</Link></li>
                <li><Link to="/nutrition-chatbot" className="hover:text-primary">Nutrition AI</Link></li>
                <li><Link to="/weather-advisory" className="hover:text-primary">Weather Advisory</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/disease-detection" className="hover:text-primary">Disease Detection</Link></li>
                <li><Link to="/blockchain-traceability" className="hover:text-primary">Blockchain Tracking</Link></li>
                <li><Link to="/crop-management" className="hover:text-primary">Crop Management</Link></li>
                <li><Link to="/shop" className="hover:text-primary">Farm Supplies</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AgriTech. All rights reserved. Built with sustainability in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
