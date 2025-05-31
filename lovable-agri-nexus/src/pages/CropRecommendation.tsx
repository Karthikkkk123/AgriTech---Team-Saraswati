import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    pH: "",
    Rainfall: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    crop: string;
    confidence: number;
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get crop recommendation");
      }

      setResult(data);
      toast({
        title: "Success!",
        description: data.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Crop Recommendation System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="Nitrogen" className="text-sm font-medium">
                      Nitrogen (N):
                    </label>
                    <Input
                      id="Nitrogen"
                      name="Nitrogen"
                      type="number"
                      step="0.01"
                      required
                      placeholder="Enter nitrogen content"
                      value={formData.Nitrogen}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="Phosphorus" className="text-sm font-medium">
                      Phosphorus (P):
                    </label>
                    <Input
                      id="Phosphorus"
                      name="Phosphorus"
                      type="number"
                      step="0.01"
                      required
                      placeholder="Enter phosphorus content"
                      value={formData.Phosphorus}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="Potassium" className="text-sm font-medium">
                      Potassium (K):
                    </label>
                    <Input
                      id="Potassium"
                      name="Potassium"
                      type="number"
                      step="0.01"
                      required
                      placeholder="Enter potassium content"
                      value={formData.Potassium}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="Temperature"
                      className="text-sm font-medium"
                    >
                      Temperature (°C):
                    </label>
                    <Input
                      id="Temperature"
                      name="Temperature"
                      type="number"
                      step="0.01"
                      required
                      placeholder="Enter temperature"
                      value={formData.Temperature}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="Humidity" className="text-sm font-medium">
                      Humidity (%):
                    </label>
                    <Input
                      id="Humidity"
                      name="Humidity"
                      type="number"
                      step="0.01"
                      required
                      placeholder="Enter humidity"
                      value={formData.Humidity}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="pH" className="text-sm font-medium">
                      pH:
                    </label>
                    <Input
                      id="pH"
                      name="pH"
                      type="number"
                      step="0.01"
                      required
                      placeholder="Enter pH value"
                      value={formData.pH}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="Rainfall" className="text-sm font-medium">
                      Rainfall (mm):
                    </label>
                    <Input
                      id="Rainfall"
                      name="Rainfall"
                      type="number"
                      step="0.01"
                      required
                      placeholder="Enter rainfall"
                      value={formData.Rainfall}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Recommendation...
                    </>
                  ) : (
                    "Get Recommendation"
                  )}
                </Button>
              </form>

              {result && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Recommendation Result:
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-2">
                    {result.crop}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Confidence: {result.confidence.toFixed(2)}%
                  </p>
                  <p className="mt-2">{result.message}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;
