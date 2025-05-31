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
  ArrowRight,
  TrendingUp,
  MapPin,
  Package,
  Sprout,
} from "lucide-react";

const Dashboard = () => {
  const quickActions = [
    {
      title: "Marketplace",
      description: "Browse fresh produce from local farmers",
      icon: ShoppingCart,
      href: "/marketplace",
      color: "bg-forest-500",
    },
    {
      title: "Land Leasing",
      description: "Find or list agricultural land",
      icon: HomeIcon,
      href: "/land-leasing",
      color: "bg-earth-500",
    },
    {
      title: "Nutrition AI",
      description: "Get personalized nutrition advice",
      icon: User,
      href: "/nutrition-chatbot",
      color: "bg-sage-500",
    },
    {
      title: "Weather Advisory",
      description: "Check weather forecasts and alerts",
      icon: Cloud,
      href: "/weather-advisory",
      color: "bg-blue-500",
    },
    {
      title: "Disease Detection",
      description: "Identify plant diseases with AI",
      icon: Camera,
      href: "/disease-detection",
      color: "bg-red-500",
    },
    {
      title: "Blockchain Tracking",
      description: "Trace product origins and quality",
      icon: Database,
      href: "/blockchain-traceability",
      color: "bg-purple-500",
    },
    {
      title: "Crop Management",
      description: "Manage your crop lifecycle and schedules",
      icon: Calendar,
      href: "/crop-management",
      color: "bg-green-500",
    },
    {
      title: "Farm Shop",
      description: "Browse tools, seeds, and fertilizers",
      icon: Package,
      href: "/shop",
      color: "bg-orange-500",
    },
    {
      title: "Crop Recommendation",
      description: "Get AI-powered crop suggestions based on soil and climate",
      icon: Sprout,
      href: "/crop-recommendation",
      color: "bg-lime-500",
    },
  ];

  const stats = [
    { label: "Active Farmers", value: "2,847", trend: "+12%" },
    { label: "Products Listed", value: "15,432", trend: "+8%" },
    { label: "Land Plots", value: "1,203", trend: "+15%" },
    { label: "Happy Customers", value: "8,956", trend: "+22%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your AgriTech control center. Manage all your
            agricultural needs from one place.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.trend}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <Card
                key={action.title}
                className="hover-lift group cursor-pointer border-2 border-border/50 hover:border-primary/50 transition-all duration-300"
                onClick={() => (window.location.href = action.href)}
              >
                <CardHeader className="pb-3">
                  <div
                    className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">
                    {action.description}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary/80">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Marketplace Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    item: "Organic Tomatoes",
                    farmer: "Green Valley Farm",
                    status: "Available",
                  },
                  {
                    item: "Fresh Corn",
                    farmer: "Sunny Acres",
                    status: "Low Stock",
                  },
                  {
                    item: "Seasonal Apples",
                    farmer: "Mountain View",
                    status: "Available",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{activity.item}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.farmer}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        activity.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/marketplace">View All Products</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weather Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    location: "Central Valley",
                    alert: "Rain expected tomorrow",
                    type: "info",
                  },
                  {
                    location: "Northern Region",
                    alert: "Frost warning tonight",
                    type: "warning",
                  },
                  {
                    location: "Coastal Area",
                    alert: "Perfect planting conditions",
                    type: "success",
                  },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"
                  >
                    <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{alert.location}</p>
                      <p className="text-sm text-muted-foreground">
                        {alert.alert}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/weather-advisory">View Weather Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
