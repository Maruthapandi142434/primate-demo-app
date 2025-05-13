'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


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
  imageUrl?: string | null;
  category?: CategoryForPage;
}

interface AnimatedNewArrivalsProps {
  products?: ProductForPage[];
}

const dummyProducts: ProductForPage[] = [
  {
    id: 1,
      name: 'Biggiee T-shirt',
    price: 29.99,
    imageUrl: 'https://res.cloudinary.com/dabyqx1mz/image/upload/v1746890935/samples/woman-on-a-football-field.jpg',
    description: 'Lightweight and breathable tee for peak performance.',
    category: { id: 1, name: 'Apparel' },
  },
  {
    id: 2,
    name: 'Biggiee T-shirt',
    price: 49.99,
    imageUrl: 'https://res.cloudinary.com/dabyqx1mz/image/upload/v1746890935/samples/woman-on-a-football-field.jpg',
    description: 'Fast-absorbing whey protein for muscle recovery.',
    category: { id: 2, name: 'Supplements' },
  },
  {
    id: 3,
    name: 'Biggiee T-shirt',
    price: 199.99,
    imageUrl: 'https://res.cloudinary.com/dabyqx1mz/image/upload/v1746890935/samples/woman-on-a-football-field.jpg',
    description: 'Versatile dumbbell set for a full-body workout.',
    category: { id: 3, name: 'Equipment' },
  },
  {
    id: 4,
    name: 'Biggiee T-shirt',
    price: 15.99,
    imageUrl: 'https://res.cloudinary.com/dabyqx1mz/image/upload/v1746890935/samples/woman-on-a-football-field.jpg',
    description: 'Durable resistance bands for strength and flexibility.',
    category: { id: 4, name: 'Accessories' },
  },
];

export default function AnimatedNewArrivals({ products: propProducts }: AnimatedNewArrivalsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const productGridRef = useRef<HTMLDivElement>(null);

  const productsToDisplay = propProducts && propProducts.length > 0 ? propProducts : dummyProducts;

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !productGridRef.current || productsToDisplay.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
    });

    const cards = Array.from(productGridRef.current.children);
    tl.from(
      cards,
      {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power3.out',
      },
      '-=0.3'
    );
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

  return (
    <section ref={sectionRef} className="container mx-auto py-12 md:py-5 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-10">
        <h2 ref={titleRef} className="text-2xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          New Arrivals
        </h2>
        <Link href="/products">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </Link>
      </div>
      <div
        ref={productGridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
      >
        {productsToDisplay.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isTrending={index < 2}
            className="opacity-0 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-neutral-50"
          />
        ))}
      </div>
    </section>
  );
}
