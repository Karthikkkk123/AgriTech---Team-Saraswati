import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FarmSupply } from "@/data/farmSupplies";

interface ProductDetailsDialogProps {
  product: FarmSupply | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: FarmSupply) => void;
}

export function ProductDetailsDialog({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailsDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Category</h3>
              <p className="text-gray-600">{product.category}</p>
            </div>
            <div>
              <h3 className="font-semibold">Price</h3>
              <p className="text-green-600 font-medium">
                ₹{product.price.toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Manufacturer</h3>
              <p className="text-gray-600">{product.manufacturer}</p>
            </div>
            <div>
              <h3 className="font-semibold">Rating</h3>
              <p className="text-gray-600">{product.rating} / 5</p>
            </div>
            <Button
              onClick={() => onAddToCart(product)}
              className="w-full"
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Specifications</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="border p-2 rounded">
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Features</h3>
          <div className="flex flex-wrap gap-2">
            {product.features.map((feature, index) => (
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
