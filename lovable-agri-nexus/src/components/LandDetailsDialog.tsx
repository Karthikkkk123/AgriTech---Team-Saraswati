import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LandListing } from "../data/landListings";

interface LandDetailsDialogProps {
  land: LandListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LandDetailsDialog({
  land,
  isOpen,
  onClose,
}: LandDetailsDialogProps) {
  if (!land) return null;

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${land.coordinates.lat},${land.coordinates.lng}`;
    window.open(url, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{land.title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <img
              src={land.images[0]}
              alt={land.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-gray-600">{land.location}</p>
            </div>
            <div>
              <h3 className="font-semibold">Area</h3>
              <p className="text-gray-600">{land.area}</p>
            </div>
            <div>
              <h3 className="font-semibold">Price</h3>
              <p className="text-green-600 font-medium">{land.price}</p>
            </div>
            <div>
              <h3 className="font-semibold">Soil Type</h3>
              <p className="text-gray-600">{land.soilType}</p>
            </div>
            <div>
              <h3 className="font-semibold">Water Source</h3>
              <p className="text-gray-600">{land.waterSource}</p>
            </div>
            <Button onClick={openInGoogleMaps} className="w-full mt-4">
              View on Google Maps
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-600">{land.description}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Features</h3>
          <div className="flex flex-wrap gap-2">
            {land.features.map((feature, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
