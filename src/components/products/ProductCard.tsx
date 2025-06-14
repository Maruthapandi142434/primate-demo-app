'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/providers/CartProvider';
import { Product } from '@/types/product';
import { Heart } from 'lucide-react'; // Using Lucide icons

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    price: number;
    description?: string | null;
    imageUrl?: string | null;
    category?: {
      id: number;
      name: string;
    };
  };
  isTrending?: boolean;
  className?: string;
};


export default function ProductCard({ product  ,className = '' }: ProductCardProps) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false); // Wishlist toggle

  const getImagePath = (imageUrl: string | null | undefined) => {
    if (!imageUrl) return '/images/placeholder-product.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `/images/products${imageUrl}`;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      ...(product.description && { description: product.description }),
      ...(product.imageUrl && { imageUrl: product.imageUrl }),
      ...(product.category && { category: product.category }),
    });
  };

  return (
    <div className={` rounded-lg overflow-hidden   ${className} bg-white`}>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square">
          <Image
            src={getImagePath(product.imageUrl)}
            alt={product.name}
            className="object-cover w-full h-full"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg line-clamp-2 text-gray-900">
              {product.name}
            </h3>
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                setLiked(!liked);
              }}
              className="text-gray-400 hover:text-red-500 transition"
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`}
              />
            </button>
          </div>
          <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
          {product.category && (
            <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
              {product.category.name}
            </span>
          )}
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button 
          className="w-full bg-primary hover:bg-primary-dark transition-colors"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
