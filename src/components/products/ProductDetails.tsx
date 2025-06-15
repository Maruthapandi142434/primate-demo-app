'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/providers/CartProvider';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Tab, Listbox, Transition, Dialog } from '@headlessui/react';
import { gsap } from 'gsap';
import { Heart, Check } from 'lucide-react';
import { Fragment } from 'react';


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
  const [selectedImage, setSelectedImage] = useState<string | null>(product.imageUrl || null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isAddToCartDisabled = !selectedSize || !selectedColor;
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false); // State for the modal
  const [quantity, setQuantity] = useState(1);

  const dummyImages = [
    "https://res.cloudinary.com/dqobnxxos/image/upload/v1749917840/photo-1727291332582-2a3ae6214dbe_hzwk9z.jpg",
    "https://res.cloudinary.com/dqobnxxos/image/upload/v1749916919/photo-1691916164439-eb672243bdc7_kgbpef.jpg",
    "https://res.cloudinary.com/dqobnxxos/image/upload/v1749918098/photo-1635105864405-3e75f624d8aa_hsjtc6.jpg",
    "https://res.cloudinary.com/dqobnxxos/image/upload/v1749917840/photo-1727291332582-2a3ae6214dbe_hzwk9z.jpg",
  ];

  const dummySizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  const dummyColors = ["red", "blue", "green", "black", "white", "gray"];

  const sizeChartData = [
    { size: "XS", chest: "34-36", waist: "28-30", hip: "34-36" },
    { size: "S", chest: "36-38", waist: "30-32", hip: "36-38" },
    { size: "M", chest: "38-40", waist: "32-34", hip: "38-40" },
    { size: "L", chest: "40-42", waist: "34-36", hip: "40-42" },
    { size: "XL", chest: "42-44", waist: "36-38", hip: "42-44" },
    { size: "2XL", chest: "44-46", waist: "38-40", hip: "44-46" },
    { size: "3XL", chest: "46-48", waist: "40-42", hip: "46-48" },
  ];

  const onAddToCart = () => {
    if (isAddToCartDisabled) {
      return;
    }
    addToCart({...product});
  };

  useEffect(() => {
    if (isSizeChartOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isSizeChartOpen]);

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
                className={`flex-1 min-h-0 rounded overflow-hidden border cursor-pointer ${selectedImage === img ? 'ring-2 ring-rose-500' : ''
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
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
              <button
                onClick={() => setIsSizeChartOpen(true)}
                className="text-rose-500 text-sm cursor-pointer hover:underline"
              >
                Size Chart
              </button>
            </div>

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
                    selectedColor === color ? 'ring-2 ring-black' : 'bg-white'
                  )}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  aria-label={`Color: ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="mt-2 flex items-center space-x-3">
              <button
                className="rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                className="rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Wishlist and Add to Bag */}
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              className="flex-1 flex items-center gap-2 border border-gray-400 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={cn("h-5 w-5", isWishlisted ? "fill-red-500 text-red-500" : "")} />
              Add to Wishlist
            </Button>
            <Button
              className="flex-1 bg-rose-600 text-white hover:bg-rose-700"
              disabled={isAddToCartDisabled}
              onClick={onAddToCart}
            >
              Add to Bag
            </Button>
          </div>

          <div className="space-y-6">
            <p className="text-base text-gray-900">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Additional Information Tabs */}
      <div className="container mx-auto px-4 py-4 lg:px-20 mt-12">
        <Tab.Group>
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

      {/* Sticky Add to Bag Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t py-4 px-4 sm:hidden">
        <Button
          onClick={onAddToCart}
          className="w-full bg-rose-600 text-white hover:bg-rose-700"
          disabled={isAddToCartDisabled}
        >
          Add to Bag
        </Button>
      </div>

      {/* Size Chart Modal (using Headless UI) */}
      <Transition.Root show={isSizeChartOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-hidden z-50" onClose={setIsSizeChartOpen}>
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 left-0 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                          Size Chart
                        </h2>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            onClick={() => setIsSizeChartOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            {/* Heroicon name: outline/x */}
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-gray-200">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Measurements
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Find your perfect fit!
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      {/* Size Chart Table */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chest (in)</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist (in)</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hip (in)</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {sizeChartData.map((item) => (
                              <tr key={item.size}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.size}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.chest}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.waist}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.hip}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
  
  };