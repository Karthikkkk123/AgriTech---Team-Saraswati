import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/marketplace">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border rounded-lg p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  {item.farmer && (
                    <p className="text-sm text-gray-600">
                      Seller: {item.farmer}
                    </p>
                  )}
                  <p className="text-lg font-semibold">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center text-xl font-semibold mb-6">
              <span>Total:</span>
              <span>₹{getTotalPrice().toLocaleString()}</span>
            </div>

            <div className="flex gap-4 justify-end">
              <Link to="/marketplace">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Button size="lg">Proceed to Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
