
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, AlertTriangle, Search } from "lucide-react";
import { fetchCurrentWeather, fetchWeatherForecast, generateWeatherAlerts, WeatherData, ForecastDay, WeatherAlert } from "@/services/weatherService";
import { toast } from "@/hooks/use-toast";

const WeatherAdvisory = () => {
  const [location, setLocation] = useState("Central Valley, CA");
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWeatherData = async (searchLocation: string) => {
    setLoading(true);
    try {
      const [weather, forecastData] = await Promise.all([
        fetchCurrentWeather(searchLocation),
        fetchWeatherForecast(searchLocation)
      ]);
      
      setCurrentWeather(weather);
      setForecast(forecastData);
      setAlerts(generateWeatherAlerts(weather));
      
      toast({
        title: "Weather Updated",
        description: `Weather data loaded for ${searchLocation}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please check the location.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData(location);
  }, []);

  const handleLocationUpdate = () => {
    if (location.trim()) {
      loadWeatherData(location);
    }
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('rain')) return CloudRain;
    if (condition.includes('cloud')) return Cloud;
    return Sun;
  };

  const farmingTips = currentWeather
    ? [
        {
          title: "Irrigation Timing",
          tip: `Based on humidity (${currentWeather.humidity}%), ${
            currentWeather.humidity > 70 ? "reduce" : "maintain"
          } watering schedule.`,
          icon: Droplets,
        },
        {
          title: "Pest Management",
          tip:
            currentWeather.temperature > 24 && currentWeather.humidity > 60
              ? "Warm, humid conditions favor pests. Monitor plants closely."
              : "Good conditions for pest control applications.",
          icon: Eye,
        },
        {
          title: "Harvest Timing",
          tip:
            currentWeather.precipitation > 50
              ? "Rain expected - harvest ripe fruits before precipitation."
              : "Good weather for harvesting activities.",
          icon: CloudRain,
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            asChild
            className="mr-4 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
          >
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Weather Advisory
            </h1>
            <p className="text-muted-foreground mt-2">
              Local weather insights for smart farming decisions
            </p>
          </div>
        </div>

        {/* Location Selector */}
        <div className="mb-8">
          <div className="flex space-x-4 max-w-md">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your farm location..."
              onKeyPress={(e) => e.key === "Enter" && handleLocationUpdate()}
              className="flex-1"
            />
            <Button
              onClick={handleLocationUpdate}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Search className="w-4 h-4 mr-2" />
              Update
            </Button>
          </div>
        </div>

        {/* Current Weather */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Cloud className="w-5 h-5 mr-2 text-blue-500" />
                Current Weather - {location}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentWeather && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    {" "}
                    <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                      {currentWeather.temperature}°C
                    </div>
                    <p className="text-xl text-muted-foreground capitalize">
                      {currentWeather.condition}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: Droplets,
                        label: "Humidity",
                        value: `${currentWeather.humidity}%`,
                        color: "text-blue-500",
                      },
                      {
                        icon: Wind,
                        label: "Wind Speed",
                        value: `${currentWeather.windSpeed} mph`,
                        color: "text-gray-500",
                      },
                      {
                        icon: Eye,
                        label: "Visibility",
                        value: `${currentWeather.visibility} mi`,
                        color: "text-green-500",
                      },
                      {
                        icon: Sun,
                        label: "UV Index",
                        value: currentWeather.uvIndex.toString(),
                        color: "text-orange-500",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                      >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {item.label}
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weather Alerts */}
          <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                Weather Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No weather alerts
                  </p>
                ) : (
                  alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 transition-all duration-300 hover:shadow-md ${
                        alert.type === "warning"
                          ? "bg-orange-50 border-orange-500 dark:bg-orange-900/20 dark:border-orange-400"
                          : "bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400"
                      }`}
                    >
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">
                        {alert.time}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 7-Day Forecast */}
        <Card className="mb-8 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              7-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {forecast.map((day, index) => {
                const IconComponent = getWeatherIcon(day.condition);
                return (
                  <div
                    key={index}
                    className="text-center p-4 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <p className="font-semibold text-sm mb-3 text-gray-900 dark:text-white">
                      {day.day}
                    </p>
                    <IconComponent className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                    <p className="text-xs text-muted-foreground mb-2 capitalize">
                      {day.condition}
                    </p>{" "}
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {day.high}°C
                      </span>
                      <span className="text-muted-foreground">
                        /{day.low}°C
                      </span>
                    </div>
                    <p className="text-xs text-blue-500 mt-2 font-medium">
                      {day.precipitation}%
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Farming Tips */}
        <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Weather-Based Farming Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {farmingTips.map((tip, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center mb-3">
                    <tip.icon className="w-5 h-5 text-green-600 mr-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {tip.title}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip.tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherAdvisory;
