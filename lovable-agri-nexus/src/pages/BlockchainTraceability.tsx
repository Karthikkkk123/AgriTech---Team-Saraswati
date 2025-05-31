
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Search, Shield, MapPin, Calendar, Truck, CheckCircle } from "lucide-react";

const BlockchainTraceability = () => {
  const [productCode, setProductCode] = useState("");
  const [traceResult, setTraceResult] = useState<any>(null);
  const mockTraceData = {
    productCode: "AGT-TOM-2025-001",
    productName: "Organic Desi Tomatoes",
    currentStatus: "Delivered",
    farmer: {
      name: "Krishna Organic Farm",
      location: "Nashik, Maharashtra",
      certification: "India Organic",
      farmerSince: "2018",
    },
    journey: [
      {
        stage: "Planting",
        date: "2025-01-15",
        location: "Krishna Organic Farm, Nashik, Maharashtra",
        details: "Seeds planted in organic soil",
        verifiedBy: "NPOP Organic Inspector",
        blockHash: "0x1a2b3c4d...",
      },
      {
        stage: "Growing",
        date: "2025-02-20",
        location: "Krishna Organic Farm, Nashik, Maharashtra",
        details: "Plants growing with organic fertilizers only",
        verifiedBy: "Farm Management System",
        blockHash: "0x2b3c4d5e...",
      },
      {
        stage: "Harvesting",
        date: "2025-03-25",
        location: "Krishna Organic Farm, Nashik, Maharashtra",
        details: "Hand-picked at optimal ripeness",
        verifiedBy: "Quality Control Team",
        blockHash: "0x3c4d5e6f...",
      },
      {
        stage: "Processing",
        date: "2025-03-26",
        location: "AgriPack Facility, Pune, Maharashtra",
        details: "Washed, sorted, and packaged",
        verifiedBy: "FSSAI Inspector",
        blockHash: "0x4d5e6f7g...",
      },
      {
        stage: "Distribution",
        date: "2025-03-27",
        location: "Regional Distribution Center, Mumbai",
        details: "Temperature-controlled transport",
        verifiedBy: "Logistics Partner",
        blockHash: "0x5e6f7g8h...",
      },
      {
        stage: "Retail",
        date: "2025-03-28",
        location: "Fresh Market, Thane, Maharashtra",
        details: "Available for consumer purchase",
        verifiedBy: "Retail Partner",
        blockHash: "0x6f7g8h9i...",
      },
    ],
    certifications: [
      {
        name: "India Organic",
        issuer: "NPOP (National Programme for Organic Production)",
        validUntil: "2025-12-31",
      },
      { name: "Non-GMO Certified", issuer: "APEDA", validUntil: "2025-08-15" },
      {
        name: "Good Agricultural Practices",
        issuer: "FSSAI",
        validUntil: "2025-10-20",
      },
    ],
    qualityTests: [
      {
        test: "Pesticide Residue",
        result: "None Detected",
        date: "2024-03-25",
      },
      {
        test: "Heavy Metals",
        result: "Within Safe Limits",
        date: "2024-03-25",
      },
      { test: "Microbial Analysis", result: "Passed", date: "2024-03-26" },
    ],
  };

  const handleTrace = () => {
    if (productCode) {
      // Simulate blockchain lookup
      setTimeout(() => {
        setTraceResult(mockTraceData);
      }, 1000);
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "Planting":
        return "🌱";
      case "Growing":
        return "🌿";
      case "Harvesting":
        return "🚜";
      case "Processing":
        return "🏭";
      case "Distribution":
        return "🚚";
      case "Retail":
        return "🏪";
      default:
        return "📦";
    }
  };

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
            <h1 className="text-3xl font-bold text-primary">
              Blockchain Traceability
            </h1>
            <p className="text-muted-foreground">
              Track product journey from farm to table
            </p>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Track Your Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Enter product code (e.g., AGT-TOM-2024-001)"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleTrace}
                className="gradient-primary text-white"
              >
                Trace Product
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Scan the QR code on your product or enter the product code
              manually
            </p>
          </CardContent>
        </Card>

        {/* Trace Results */}
        {traceResult && (
          <div className="space-y-6">
            {/* Product Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{traceResult.productName}</span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Product Code
                    </p>
                    <p className="font-semibold">{traceResult.productCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Status
                    </p>
                    <p className="font-semibold text-green-600">
                      {traceResult.currentStatus}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Farmer</p>
                    <p className="font-semibold">{traceResult.farmer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Origin</p>
                    <p className="font-semibold">
                      {traceResult.farmer.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Journey Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Product Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {traceResult.journey.map((step: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50"
                    >
                      <div className="text-2xl">{getStageIcon(step.stage)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{step.stage}</h4>
                          <Badge variant="outline" className="text-xs">
                            Block: {step.blockHash.substring(0, 10)}...
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {step.details}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {step.date}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {step.location}
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {step.verifiedBy}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications and Quality */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {traceResult.certifications.map(
                      (cert: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-sm">{cert.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {cert.issuer}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              Valid until
                            </p>
                            <p className="text-sm font-medium">
                              {cert.validUntil}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Quality Tests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {traceResult.qualityTests.map(
                      (test: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-sm">{test.test}</p>
                            <p className="text-xs text-muted-foreground">
                              {test.date}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            {test.result}
                          </Badge>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Farmer Information */}
            <Card>
              <CardHeader>
                <CardTitle>About the Farmer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">
                      {traceResult.farmer.name}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        {traceResult.farmer.location}
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-muted-foreground" />
                        {traceResult.farmer.certification}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                        Farming since {traceResult.farmer.farmerSince}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      This farmer is committed to sustainable, organic farming
                      practices and has been verified through our comprehensive
                      certification process.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sample Codes for Testing */}
        {!traceResult && (
          <Card>
            <CardHeader>
              <CardTitle>Try These Sample Product Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    code: "AGT-TOM-2025-001",
                    product: "Organic Desi Tomatoes",
                  },
                  { code: "AGT-COR-2025-002", product: "Organic Sweet Corn" },
                  { code: "AGT-MAN-2025-003", product: "Alphonso Mangoes" },
                ].map((sample) => (
                  <Button
                    key={sample.code}
                    variant="outline"
                    onClick={() => setProductCode(sample.code)}
                    className="text-left justify-start h-auto p-4"
                  >
                    <div>
                      <p className="font-semibold">{sample.code}</p>
                      <p className="text-sm text-muted-foreground">
                        {sample.product}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlockchainTraceability;
