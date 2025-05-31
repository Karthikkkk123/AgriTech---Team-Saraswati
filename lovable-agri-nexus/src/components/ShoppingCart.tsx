import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FarmSupply } from "@/data/farmSupplies";
import { X, Plus, Minus, ShoppingCart as CartIcon } from "lucide-react";

interface CartItem {
  product: FarmSupply;
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export function ShoppingCart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: ShoppingCartProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <CartIcon className="mr-2" />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      ₹{item.product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="pt-4 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <Button className="w-full">Proceed to Checkout</Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
