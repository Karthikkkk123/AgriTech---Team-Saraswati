
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Camera, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DiseaseDetection = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };
  const analyzeImage = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);

    try {
      // Convert base64 to blob
      const base64Response = await fetch(uploadedImage);
      const blob = await base64Response.blob();

      // Create form data
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      // Send to backend
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAnalysisResult(result);

      toast({
        title: "Analysis Complete",
        description: `Disease detected: ${
          result.disease
        } (${result.confidence.toFixed(2)}% confidence)`,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const recentAnalyses = [
    {
      date: "2024-01-15",
      crop: "Tomato",
      disease: "Early Blight",
      severity: "Moderate",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      date: "2024-01-12",
      crop: "Corn",
      disease: "Healthy",
      severity: "None",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      date: "2024-01-10",
      crop: "Lettuce",
      disease: "Downy Mildew",
      severity: "Mild",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ];

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
            <h1 className="text-3xl font-bold text-primary">Plant Disease Detection</h1>
            <p className="text-muted-foreground">AI-powered plant disease identification and treatment recommendations</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Upload Plant Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded plant"
                        className="max-w-full h-64 object-cover mx-auto rounded-lg"
                      />
                      <div className="flex space-x-2">
                        <Button 
                          onClick={analyzeImage}
                          disabled={isAnalyzing}
                          className="flex-1 gradient-primary text-white"
                        >
                          {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setUploadedImage(null);
                            setAnalysisResult(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">Upload a photo of your plant</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Take a clear photo of leaves showing any symptoms or discoloration
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button asChild className="gradient-primary text-white">
                          <span>Choose File</span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>

                {isAnalyzing && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Analyzing image...</span>
                      <span className="text-sm text-muted-foreground">AI Processing</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Result */}
            {analysisResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                    Detection Result
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div>
                        <h3 className="font-bold text-lg">{analysisResult.disease}</h3>
                        <p className="text-sm text-muted-foreground">Severity: {analysisResult.severity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">{analysisResult.confidence}%</p>
                        <p className="text-xs text-muted-foreground">Confidence</p>
                      </div>
                    </div>

                    <p className="text-sm">{analysisResult.description}</p>

                    <div>
                      <h4 className="font-semibold mb-2">Immediate Treatment:</h4>
                      <ul className="space-y-1">
                        {analysisResult.treatment.map((item: string, index: number) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Prevention Tips:</h4>
                      <ul className="space-y-1">
                        {analysisResult.prevention.map((item: string, index: number) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent Analyses & Tips */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Analyses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAnalyses.map((analysis, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                      <img
                        src={analysis.image}
                        alt={analysis.crop}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{analysis.crop}</p>
                        <p className="text-xs text-muted-foreground">{analysis.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          analysis.disease === "Healthy" ? "text-green-600" : "text-orange-600"
                        }`}>
                          {analysis.disease}
                        </p>
                        <p className="text-xs text-muted-foreground">{analysis.severity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Photography Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <p>Take photos in good natural lighting, preferably during midday</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <p>Focus on leaves showing clear symptoms or discoloration</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <p>Avoid blurry images - hold camera steady</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <p>Include both affected and healthy parts for comparison</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <p>Clean the leaf surface gently before photographing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
