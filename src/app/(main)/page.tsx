// app/page.tsx (or your HomePage file)
// import ProductCard from '@/components/products/ProductCard'; // No longer directly used here for this section
import prisma from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HoverBorderGradientDemo } from '@/components/hover-button';
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

// ProductForPage and CategoryForPage types should be defined or imported here
// For brevity, assuming they are defined as in your original code.

// Make sure these types are accessible/defined
export interface CategoryForPage { // Export if AnimatedNewArrivals needs it from here
  id: number;
  name: string;
}

export interface ProductForPage { // Export if AnimatedNewArrivals needs it from here
  id: number;
  name: string;
  price: number;
  description?: string | null;
  imageUrl?: string | null;
  category?: CategoryForPage;
}

// Import the new client component
import AnimatedNewArrivals from '@/components/home/AnimatedNewArrivals'; // Adjust path as needed
import { TypewriterEffect } from '@/components/ui/text-hover';
import { Product } from '@/types/product';

// Helper for Unsplash placeholders
const getGymImageUrl = (productName: string, index: number): string => {
  const keywords = productName.toLowerCase().split(' ').join(',');
  let query = "gym,fitness";
  if (keywords.includes('protein') || keywords.includes('powder')) query = "protein,supplement";
  else if (keywords.includes('dumbbell') || keywords.includes('weight')) query = "dumbbell,weights";
  else if (keywords.includes('leggings') || keywords.includes('tank') || keywords.includes('apparel')) query = "gym,apparel";
  else if (keywords.includes('band') || keywords.includes('resistance')) query = "resistance,band";
  else if (keywords.includes('bottle') || keywords.includes('shaker')) query = "shaker,bottle";
  return `https://source.unsplash.com/400x400/?${query},${keywords}&sig=${index}`;
};

async function getNewArrivalProducts(): Promise<ProductForPage[]> { // Renamed for clarity
  const productsFromDb = await prisma.product.findMany({
    where: {
      isFeatured: true, // Or some other criteria for "new arrivals"
      // You might want a specific "isNewArrival" flag or sort by creation date
    },
    orderBy: {
      createdAt: 'desc', // Example: newest products first
    },
    include: {
      category: true,
    },
    take: 4, // Fetch only 4 products
  });

  return productsFromDb.map((product: Product , index :any) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    imageUrl: product.imageUrl || getGymImageUrl(product.name, index),
    category: product.category ? {
      id: product.category.id,
      name: product.category.name
    } : undefined,
  }));
}

export default async function HomePage() {
  const newArrivalProducts = await getNewArrivalProducts(); // Use the updated function

  const heroVideoUrl = "https://res.cloudinary.com/dzldch2cm/video/upload/v1746877370/Fitness_Cinematic_video___Gym_commercial___Cinematic_fitness_film___Fitness_commercial_2K_HD_gbs5gu.webm";
  const heroFallbackImageUrl = "/images/gym-hero-bg.jpg";



  return (
    <>
      {/* Hero Section - Gym Themed with Video Background (Your existing code) */}
      <section
        className="bg-gray-800 text-white py-40 md:py-64 relative overflow-hidden"
        style={{ backgroundImage: `url(${heroFallbackImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          poster={heroFallbackImageUrl}
        >
          <source src={heroVideoUrl} type="video/webm" />
          <source src={heroVideoUrl.replace('.webm', '.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-40 z-[1]"></div>
        <div className="container mx-auto px-4 text-center relative z-[2] ">
<h1 className="text-5xl font-bold mb-3 text-center transition-transform duration-300 hover:scale-105">
  Surpass Your Limit
</h1>


          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-sm">
            Engineered For Modern Athletes
          </p>
         

          <HoverBorderGradientDemo />
        </div>
  <div className="absolute bottom-2 left-6 z-[2]">
  <Link href="/products?collection=divine-power" className="group">
    <div
      className="text-white font-semibold px-5 py-3 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out
                 bg-slate-100 bg-opacity-40 backdrop-blur-md
                 hover:bg-gradient-to-r hover:from-purple-700 hover:via-pink-600 hover:to-red-600
                 hover:shadow-2xl"
    >
      <p className="text-xs uppercase tracking-wider opacity-90 group-hover:opacity-100">
        Now Live
      </p>
      <h3 className="text-xl md:text-2xl font-bold drop-shadow-md">
        Divine Power
      </h3>
      <p className="text-sm mt-1 opacity-80 group-hover:opacity-100 group-hover:underline">
        Shop Now →
      </p>
    </div>
  </Link>
</div>


      </section>

      {/* === New Arrivals Section using Client Component === */}
      <AnimatedNewArrivals products={newArrivalProducts} />



      {/* Call to Action / Brand Story Section (Your existing code) */}
      <section className="container mx-auto py-12 md:py-16 px-4 text-center">
        <h2 className="text-3xl sm:text-2xl md:text-4xl font-extrabold mb-6 leading-tight drop-shadow-md">
          Join the Fitness Revolution Today
        </h2>
        <h3 className="${bebas.variable} font-bebas text-center text-4xl mb-6 text-gray-900 italic tracking-wider    uppercase font-extrabold ">PRIMATE</h3>
        <p className="text-l  text-gray-700 mb-8 text-center  w-3/4 mx-auto font-extrabold">
          Primate is more than just a sportswear brand; it’s a symbol of pride, dedication, and loyalty to a community that embodies strength, resilience, and the relentless pursuit of greatness. Our high-performance gear is crafted for those who live and breathe the primate spirit—pushing boundaries, breaking barriers, and standing united in the face of challenges. Choosing primate means embracing a way of life, committing to excellence, and representing a brand built on passion and determination. We celebrate those who wear primate with pride, honoring the commitment to Surpass Your Limits and inspire others to do the same.
          - <strong className='font-extrabold'>“Engineered for modern athletes”</strong>
        </p>
        <Link href="/products">
          <Button variant="default" size="lg">
            Get Involve
          </Button>
        </Link>
      </section>
    </>
  );
}