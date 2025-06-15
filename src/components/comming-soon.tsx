// app/coming-soon/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react'; // Or your preferred social icons

export const metadata = {
  title: 'PRIMATE - Coming Soon!',
  description: 'Get Ready! The ultimate fitness experience is launching soon. Sign up for exclusive updates from PRIMATE.',
};

export default function ComingSoonPage() {
  const brandName = "PRIMATE";
  const accentColor = "orange-500"; 
  // Matches your footer accent
    const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col items-center justify-center p-6 font-inter relative overflow-hidden">
      {/* Optional: Subtle background pattern or very dim image */}
      {/* <div className="absolute inset-0 opacity-5 bg-your-pattern-or-image"></div> */}

      <main className="z-10 flex flex-col items-center text-center max-w-3xl">
        <h1 className={`font-bebas text-7xl md:text-9xl font-bold text-${accentColor} uppercase tracking-wider mb-4 animate-fadeInUp`}>
          {brandName}
        </h1>

        <h2 className="font-bebas text-4xl md:text-6xl text-white uppercase tracking-wide mb-3 animate-fadeInUp animation-delay-200">
          Coming Soon
        </h2>

        <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-xl animate-fadeInUp animation-delay-400">
          We're forging something incredible. Get ready to unleash your inner beast.
          Our new platform for peak fitness and unparalleled gear is on its way.
        </p>

     

        <div className="flex space-x-6 animate-fadeInUp animation-delay-800">
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label={`${brandName} on Instagram`}
            className={`text-neutral-400 hover:text-${accentColor} transition-colors duration-300`}>
            <Instagram size={28} />
          </Link>
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label={`${brandName} on Facebook`}
            className={`text-neutral-400 hover:text-${accentColor} transition-colors duration-300`}>
            <Facebook size={28} />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label={`${brandName} on Twitter/X`}
            className={`text-neutral-400 hover:text-${accentColor} transition-colors duration-300`}>
            <Twitter size={28} />
          </Link>
          {/* Add more social links as needed */}
        </div>
      </main>

      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10">
        <p className="text-neutral-500 text-xs tracking-wider">
          © {new Date().getFullYear()} {brandName}. All Rights Reserved.
        </p>
      </footer>

      {/* Basic CSS for animations (can be moved to globals.css) */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }

        /* Ensure opacity starts at 0 for elements that will fade in */
        .animate-fadeInUp {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}