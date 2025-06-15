'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState } from 'react'; // Import useState
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CategoryForPage {
  id: number;
  name: string;
}

interface ProductForPage {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  quantity?: number; // Optional, default to 1 if not specified
  imageUrl?: string | null;
  category?: CategoryForPage;
}

interface AnimatedNewArrivalsProps {
  products?: ProductForPage[];
}

export default function AnimatedNewArrivals({ products: propProducts }: AnimatedNewArrivalsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const productGridRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // State for current index
  const productsToDisplay = propProducts;
  console.log("Products to display:", productsToDisplay); // Debugging: Check the data here

  const itemsPerPage = 4; // Number of items visible per page/slide. Adjust as needed

  const totalPages = Math.ceil((productsToDisplay?.length ?? 0) / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalPages - 1)); // Prevent going past the last page
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Prevent going before the first page
  };

  const visibleProducts = (productsToDisplay ?? []).slice(
    currentIndex * itemsPerPage,
    (productsToDisplay?.length ?? 0)) // Correct calculation for visible products
    .slice(0, itemsPerPage);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    if (
      !sectionRef.current ||
      !titleRef.current ||
      !productGridRef.current ||
      productsToDisplay?.length === 0
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        markers: false, // Remove markers for production
      },
    });

    // Initial GSAP Setup:
    gsap.set(titleRef.current, { opacity: 0, y: 30 }); // Initially hide the title

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0, //Move back to original possition
      duration: 0.6,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, [productsToDisplay]);


  if (!productsToDisplay || productsToDisplay.length === 0) {
    return (
      <section className="container mx-auto py-12 md:py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 sm:mb-0">
          New Arrivals
        </h2>
        <p className="text-center text-gray-600 text-xl py-10">
          No new arrivals at the moment. Check back soon!
        </p>
      </section>
    );
  }
  console.log("Products to display:", productsToDisplay); // Debugging: Check the data here

  const showPrevButton = currentIndex > 0;
  const showNextButton = currentIndex < totalPages - 1;

  return (
    <section
      ref={sectionRef}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-14">
        <div className="text-center sm:text-left max-w-xl">
          <p className="text-rose-600 text-xs font-semibold tracking-widest uppercase">
            Just In
          </p>
          <h2
            ref={titleRef}
            className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900"
          >
            Fresh New Arrivals
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Discover the latest trends curated to upgrade your wardrobe. Limited stock, act fast.
          </p>
        </div>

        <div>
          <Link href="/products">
            <Button
              size="lg"
              className="rounded-full border border-rose-600  bg-rose-600 text-white transition-all duration-200 shadow-sm hover:shadow-md px-6 py-3 font-semibold"
            >
              Browse All Products
            </Button>
          </Link>
        </div>

      </div>

      {/* Product Carousel (Tailwind CSS only) */}
      <div ref={productGridRef} className="relative">
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide ">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className="snap-start shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow hover:shadow-md transition duration-300 ease-in-out">
                {/* Trending Badge */}
                {index < 2 && (
                  <span className="absolute top-3 left-3 z-10 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                    Trending
                  </span>
                )}

                <ProductCard
                  product={{
    ...product,
    quantity: product.quantity ?? 1 // ✅ Provide default if missing
  }}
                  className="transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className={cn(
            "absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-full shadow-md focus:outline-none transition-colors duration-200",
            !showPrevButton && "opacity-50 cursor-not-allowed hover:bg-gray-100"
          )}
          disabled={!showPrevButton}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 hover:text-black" />
        </button>

        <button
          onClick={nextSlide}
          className={cn(
            "absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-full shadow-md focus:outline-none transition-colors duration-200",
            !showNextButton && "opacity-50 cursor-not-allowed hover:bg-gray-100"
          )}
          disabled={!showNextButton}
        >
          <ChevronRight className="w-5 h-5 text-gray-700 hover:text-black" />
        </button>

      </div>
    </section>
  );
}