'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimatedNewArrivals from '@/components/home/AnimatedNewArrivals';
import { Product } from '@/types/product';
import { HoverBorderGradientDemo } from '@/components/hover-button';

export default function HomePage({ products }: { products: Product[] }) {
  const titleRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' });
    tl.fromTo(subTextRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.6');
    tl.fromTo(buttonRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, '-=0.4');
  }, []);

  const heroVideoUrl =
    'https://res.cloudinary.com/dzldch2cm/video/upload/v1746877370/Fitness_Cinematic_video___Gym_commercial___Cinematic_fitness_film___Fitness_commercial_2K_HD_gbs5gu.webm';
  const fallbackImg = '/images/gym-hero-bg.jpg';

  return (
    <>
      <section className="relative h-[90vh] w-full overflow-hidden bg-black text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={fallbackImg}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={heroVideoUrl} type="video/webm" />
          <source src={heroVideoUrl.replace('.webm', '.mp4')} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-[4px] z-[1]" />

        <div className="relative z-[2] h-full flex flex-col justify-center items-center text-center px-4">
      
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl"
          >
            Surpass Your Limit
          </h1>
          <p
            ref={subTextRef}
            className="mt-4 text-lg sm:text-xl md:text-2xl max-w-2xl text-gray-300 drop-shadow-sm"
          >
            Engineered For Modern Athletes
          </p>
          <div ref={buttonRef} className="">
            <HoverBorderGradientDemo />
          </div>
        </div>

        <div className="absolute bottom-3 left-6 z-[2]">
          <Link href="/products?collection=divine-power" className="group">
            <div className="text-white font-semibold px-5 py-3 rounded-lg shadow-xl backdrop-blur-md bg-white/10 hover:bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 transition-all">
              <p className="text-xs uppercase tracking-wider opacity-90 group-hover:opacity-100">Now Live</p>
              <h3 className="text-xl md:text-2xl font-bold drop-shadow-md">Divine Power</h3>
              <p className="text-sm mt-1 opacity-80 group-hover:opacity-100 group-hover:underline">Shop Now →</p>
            </div>
          </Link>
        </div>
      </section>

      <AnimatedNewArrivals products={products} />

      <section className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-white">
          Join the Fitness Revolution Today
        </h2>
        <h3 className="text-4xl mb-6 text-black  uppercase font-extrabold tracking-widest">PRIMATE</h3>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto font-semibold leading-relaxed">
          Primate is more than just a sportswear brand — it’s a symbol of pride, dedication, and loyalty to a community
          that embodies strength, resilience, and the relentless pursuit of greatness. Our high-performance gear is
          crafted for those who live and breathe the primate spirit — pushing boundaries and standing united in the face
          of challenge. <br />
          <span className="block mt-4 font-bold text-gray-900 dark:text-white text-xl">
            “Engineered for modern athletes”
          </span>
        </p>
        <Link href="/products">
          <Button
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-gray-800 to-black text-white px-8 py-3 rounded-xl shadow-xl hover:scale-105 transition-transform"
          >
            Get Involved
          </Button>
        </Link>
      </section>
    </>
  );
}
