// src/components/CartView.tsx
'use client';

import { useCart } from '@/providers/CartProvider';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function CartView() {
  const {
    items,
    total,
    itemCount,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({itemCount})</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 flex gap-4 items-center">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={item.imageUrl || '/images/placeholder-product.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                    sizes="100px"
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.id}`} className="hover:underline">
                    <h3 className="font-medium">{item.name}</h3>
                  </Link>
                  <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Link href="/products">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="border rounded-lg p-6 h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Link href="/checkout" className="block">
                <Button className="w-full mt-6 py-6 text-lg">
                  Proceed to Payment
                </Button>
              </Link>
              
              <p className="text-sm text-gray-500 mt-2">
                Secure payment processing
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}