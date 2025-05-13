'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/providers/CartProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const {
    items,
    total,
    itemCount,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  return (
    <div className="container mx-auto py-8">
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
              <div key={item.id} className="border rounded-lg p-4 flex gap-4">
                <div className="w-24 h-24 relative">
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
                  <p>${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 border rounded"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="mt-4"
            >
              Clear Cart
            </Button>
          </div>
          
          <div className="border rounded-lg p-6 h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full mt-4">
                Proceed to Checkout
              </Button>
              <Link href="/products">
                <Button variant="outline" className="w-full mt-2">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}