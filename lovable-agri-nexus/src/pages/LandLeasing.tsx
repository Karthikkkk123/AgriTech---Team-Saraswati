import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Search, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { landListings, type LandListing } from "../data/landListings";
import { LandDetailsDialog } from "../components/LandDetailsDialog";

const LandLeasing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [selectedLand, setSelectedLand] = useState<LandListing | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredListings = landListings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInquiry = (listing: LandListing) => {
    toast({
      title: "Inquiry Sent",
      description: `Your inquiry for ${listing.title} has been sent to the owner.`,
    });
  };

  const openLandDetails = (land: LandListing) => {
    setSelectedLand(land);
    setIsDialogOpen(true);
  };

  const openInGoogleMaps = (land: LandListing) => {
    const url = `https://www.google.com/maps?q=${land.coordinates.lat},${land.coordinates.lng}`;
    window.open(url, "_blank");
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
            <h1 className="text-3xl font-bold text-primary">Land Leasing</h1>
            <p className="text-muted-foreground">
              Find agricultural land for lease or list your property
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search locations or titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Land Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card
              key={listing.id}
              className="hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{listing.title}</CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {listing.location}
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium">Size:</span> {listing.area}
                  </div>
                  <div>
                    <span className="font-medium">Price:</span> {listing.price}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => openInGoogleMaps(listing)}
                  >
                    View Map
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => openLandDetails(listing)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <LandDetailsDialog
          land={selectedLand}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </div>
  );
};

export default LandLeasing;
