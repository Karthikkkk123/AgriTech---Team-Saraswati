import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import LandLeasing from "./pages/LandLeasing";
import NutritionChatbot from "./pages/NutritionChatbot";
import WeatherAdvisory from "./pages/WeatherAdvisory";
import DiseaseDetection from "./pages/DiseaseDetection";
import BlockchainTraceability from "./pages/BlockchainTraceability";
import CropManagement from "./pages/CropManagement";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import FarmShop from "./pages/FarmShop";
import CropRecommendation from "./pages/CropRecommendation";

const queryClient = new QueryClient();

import ElevenLabsWidget from "./components/ElevenLabsWidget";
import TranslateWidget from "./components/TranslateWidget";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="agritech-theme">
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ElevenLabsWidget />
            <TranslateWidget />
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/marketplace"
                  element={
                    <ProtectedRoute>
                      <Marketplace />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/land-leasing"
                  element={
                    <ProtectedRoute>
                      <LandLeasing />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/nutrition-chatbot"
                  element={
                    <ProtectedRoute>
                      <NutritionChatbot />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/weather-advisory"
                  element={
                    <ProtectedRoute>
                      <WeatherAdvisory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/disease-detection"
                  element={
                    <ProtectedRoute>
                      <DiseaseDetection />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blockchain-traceability"
                  element={
                    <ProtectedRoute>
                      <BlockchainTraceability />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/crop-management"
                  element={
                    <ProtectedRoute>
                      <CropManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shop"
                  element={
                    <ProtectedRoute>
                      <Shop />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/crop-recommendation"
                  element={
                    <ProtectedRoute>
                      <CropRecommendation />
                    </ProtectedRoute>
                  }
                />
                <Route path="/farm-shop" element={<FarmShop />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
