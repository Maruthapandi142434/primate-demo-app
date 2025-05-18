'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/providers/CartProvider';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string | null;
}

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className=" relative rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl || '/placeholder-product.jpg'}
            alt={product.name}
            className="object-cover"
            width={300}
            height={300}
          />
        </div>
      </div>
      
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl">${product.price.toFixed(2)}</p>
        
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Description</h2>
          <p>{product.description}</p>
        </div>

        <Button
          onClick={() => addToCart(product)}
          className="w-full"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}