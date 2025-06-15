'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/providers/CartProvider';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility function for conditional class names
import { Tab, Listbox } from '@headlessui/react'; // Import Listbox from Headless UI
import { gsap } from 'gsap';
// import { toast } from 'react-hot-toast';
import { Heart, Check } from 'lucide-react'; // Import Heart icon


interface Product {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  imageUrl?: string | null;
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(product.imageUrl || null); // Initial image
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isAddToCartDisabled = !selectedSize || !selectedColor;
  const [showColorOptions, setShowColorOptions] = useState(false);

  const onAddToCart = () => {
    if (isAddToCartDisabled) {
      // toast.error('Please select a size and color.', { duration: 2000 });
      return;
    }

    addToCart(product);

    // toast.success(`${product.name} added to cart!`, { duration: 2000 });
  };

  // Dummy Images, Sizes and Colors
  const dummyImages = [
    "https://res.cloudinary.com/dqobnxxos/image/upload/v1749917840/photo-1727291332582-2a3ae6214dbe_hzwk9z.jpg",
    "https://res.cloudinary.com/dqobnxxos/image/upload/v1749916919/photo-1691916164439-eb672243bdc7_kgbpef.jpg",
    "https://res.cloudinary.com/dqobnxxos/image/upload/v1749918098/photo-1635105864405-3e75f624d8aa_hsjtc6.jpg",
    "https://res.cloudinary.com/dqobnxxos/image/upload/v1749917840/photo-1727291332582-2a3ae6214dbe_hzwk9z.jpg",
    // "https://res.cloudinary.com/dqobnxxos/image/upload/v1749916919/photo-1691916164439-eb672243bdc7_kgbpef.jpg",
  ];

  const dummySizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  const dummyColors = ["red", "blue", "green", "black", "white", "gray"];

  return (
    <div className="bg-white">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-16 px-4 lg:px-20">
        {/* LEFT: Product Images */}
<div className="flex gap-4">
  {/* Thumbnail Gallery */}
  <div className="flex flex-col h-[600px] space-y-1 justify-between">
    {dummyImages.map((img, i) => (
      <div
        key={i}
        className={`flex-1 min-h-0 rounded overflow-hidden border cursor-pointer ${
          selectedImage === img ? 'ring-2 ring-rose-500' : ''
        }`}
        onClick={() => setSelectedImage(img)}
      >
        <Image
          src={img}
          alt={`Product Thumbnail ${i}`}
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
      </div>
    ))}
  </div>

  {/* Main Image */}
  <div className="flex-grow h-[600px]">
    <div className="w-full h-full rounded-lg overflow-hidden">
      <Image
        src={
          selectedImage ||
          product.imageUrl ||
          'https://source.unsplash.com/random/500x600'
        }
        alt={product.name}
        className="w-full h-full object-cover object-center"
        width={500}
        height={600}
        priority
      />
    </div>
  </div>
</div>



        {/* RIGHT: Product Info & Actions */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            {product.name}
          </h1>
          {/* Product Rating and Price */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-sm text-yellow-500">★</span>
              <span className="text-sm text-gray-700">4.0</span>
            </div>
            <span className="text-sm text-gray-500">Based on 121 ratings</span>
          </div>
          <p className="text-xl font-medium text-rose-600 mt-2">₹{product.price.toFixed(0)}</p>


          {/* Size Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {dummySizes.map((size) => (
                <button
                  key={size}
                  className={cn(
                    `rounded-full px-4 py-2 border text-sm transition hover:bg-gray-100`,
                    selectedSize === size ? 'bg-black text-white' : 'bg-white text-gray-900'
                  )}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection with Listbox */}
               <div>
            <h3 className="text-sm font-medium text-gray-900">Select Color</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {dummyColors.map((color) => (
                <button
                  key={color}
                  className={cn(
                    `rounded-full w-8 h-8 border-2 transition hover:ring-2 hover:ring-gray-400`,
                    selectedColor === color ? 'ring-2 ring-black' : 'bg-white',
                  )}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  aria-label={`Color: ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Add to Wishlist and Add to Bag */}
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="flex-1 flex items-center gap-2 border border-gray-400 text-gray-700 hover:bg-gray-100" onClick={() => setIsWishlisted(!isWishlisted)}>
              <Heart className={cn("h-5 w-5", isWishlisted ? "fill-red-500 text-red-500" : "")} />
              Add to Wishlist
            </Button>
            <Button className="flex-1 bg-rose-600 text-white hover:bg-rose-700" disabled={isAddToCartDisabled} onClick={onAddToCart}>
              Add to Bag
            </Button>
          </div>

          <div className="space-y-6">
            <p className="text-base text-gray-900">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Additional Information Tabs (like Nykaa/Souled Store) */}
     <div className="container mx-auto px-4 py-4 lg:px-20 mt-12">
  <Tab.Group>
    {/* Tab Header List */}
<Tab.List className="flex ">
  {['Specifications', 'Delivery Information', 'Reviews (0)'].map((tab) => (
    <Tab
      key={tab}
      className={({ selected }) =>
        cn(
          'flex-1 text-center py-3 text-base font-medium transition-all duration-200 ease-in-out focus:outline-none',
          selected
            ? 'border-b-2 border-rose-600 text-rose-600 bg-white'
            : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 '
        )
      }
    >
      {tab}
    </Tab>
  ))}
</Tab.List>




    {/* Tab Panels */}
    <Tab.Panels className="mt-6">
      <Tab.Panel>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
          <li><span className="font-medium">Material:</span> Cotton Blend</li>
          <li><span className="font-medium">Fit:</span> Relaxed</li>
          <li><span className="font-medium">Neck:</span> Crew Neck</li>
          <li><span className="font-medium">Sleeve Length:</span> Short Sleeves</li>
        </ul>
      </Tab.Panel>

      <Tab.Panel>
        <p className="text-gray-700 text-sm leading-relaxed">
          Delivery within <span className="font-medium">5–7 business days</span>.
          <br />
          <span className="font-medium text-green-600">Free shipping</span> on orders over $50.
        </p>
      </Tab.Panel>

      <Tab.Panel>
        <p className="text-gray-500 text-sm italic">No reviews yet.</p>
      </Tab.Panel>
    </Tab.Panels>
  </Tab.Group>
</div>


      {/* Sticky Add to Bag Bar (Mobile) - Placeholder*/}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t py-4 px-4 sm:hidden">
        <Button
          onClick={onAddToCart}
          className="w-full bg-rose-600 text-white hover:bg-rose-700"
          disabled={isAddToCartDisabled}
        >
          Add to Bag
        </Button>
      </div>
    </div>
  );
}