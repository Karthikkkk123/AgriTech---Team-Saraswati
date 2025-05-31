import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Menu, X, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { SlideCart } from "@/components/SlideCart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartPage from "@/pages/CartPage";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { items, getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Land Leasing", href: "/land-leasing" },
    { label: "Nutrition AI", href: "/nutrition-chatbot" },
    { label: "Weather", href: "/weather-advisory" },
    { label: "Disease Detection", href: "/disease-detection" },
    { label: "Shop", href: "/shop" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-primary">AgriTech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[540px]">
                <CartPage />
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/auth")}
              className="hidden sm:flex"
            >
              <User className="h-5 w-5" />
            </Button>

            <Button
              onClick={() => navigate("/dashboard")}
              className="hidden sm:flex gradient-primary text-white hover:opacity-90"
            >
              Dashboard
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate("/cart");
                    setIsMenuOpen(false);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>

                <Button variant="ghost" size="sm" onClick={toggleTheme}>
                  {theme === "light" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate("/auth");
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>

              <Button
                onClick={() => {
                  navigate("/dashboard");
                  setIsMenuOpen(false);
                }}
                className="gradient-primary text-white hover:opacity-90 w-full"
              >
                Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Cart Slide-in */}
      <SlideCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
