import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface SlideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SlideCart = ({ isOpen, onClose }: SlideCartProps) => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-background p-6 shadow-xl",
          "transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Your cart is empty</p>
            <p className="text-muted-foreground">
              Add some items to get started
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.farmer}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t mt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">Total</span>
                <span className="text-xl font-bold">
                  ₹{getTotalPrice().toFixed(2)}
                </span>
              </div>
              <Button className="w-full gradient-primary text-white">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
