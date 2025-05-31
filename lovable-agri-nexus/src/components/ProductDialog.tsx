import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, ShoppingCart } from "lucide-react";

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onAddToCart: () => void;
}

export const ProductDialog = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
}: ProductDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-primary">
                  ₹{product.price}/kg
                </p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="ml-1">{product.rating}</span>
                </div>
              </div>

              <p className="text-muted-foreground">
                Sold by{" "}
                <span className="text-foreground">{product.farmer}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                From {product.location}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Product Details</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Category: {product.category}</li>
                <li>
                  • Farming Method: {product.farmingMethod || "Traditional"}
                </li>
                <li>• Certification: {product.certification || "Standard"}</li>
                {product.harvestDate && (
                  <li>• Harvest Date: {product.harvestDate}</li>
                )}
              </ul>
            </div>

            <Button
              onClick={() => {
                onAddToCart();
                onClose();
              }}
              disabled={!product.inStock}
              className="w-full gradient-primary text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
