// app/(main)/checkout/page.js
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useCart } from '@/providers/CartProvider';
import { createOrder } from '@/actions/order';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function CheckoutContent() {
  const { items, total, itemCount } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const handlePayment = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const order = await createOrder({
        userId: user.id,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl || null
        })),
        total
      });
      
      router.push(`/account/orders/${order.id}?payment_success=true`);
    } catch (err) {
      console.error('Payment error:', err);
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isClient || authLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="mb-6">You need to login to proceed with checkout.</p>
            <div className="flex flex-col space-y-3">
              <Link
                href={`/login?redirect=/checkout`}
                className="bg-primary text-white py-2 px-4 rounded-md text-center hover:bg-primary-dark transition-colors"
              >
                Login
              </Link>
              <Link
                href={`/register?redirect=/checkout`}
                className="border border-primary text-primary py-2 px-4 rounded-md text-center hover:bg-gray-50 transition-colors"
              >
                Create Account
              </Link>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700 mt-2"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Review Your Order ({itemCount} items)</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={item.imageUrl || '/images/placeholder-product.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6 h-fit sticky top-4">
          <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
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
            
            {user ? (
              <>
                <Button 
                  onClick={handlePayment}
                  className="w-full mt-6 py-6 text-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </Button>
                <p className="text-sm text-gray-500">
                  Logged in as {user.email}
                </p>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => setShowLoginModal(true)}
                  className="w-full mt-6 py-6 text-lg bg-primary hover:bg-primary-dark"
                >
                  Login to Checkout
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="text-primary hover:underline"
                  >
                    Login
                  </button>
                </p>
              </>
            )}
            
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            
            <p className="text-xs text-gray-500 mt-4">
              By completing your purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}