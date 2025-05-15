// src/app/layout.tsx
import { CartProvider } from '@/providers/CartProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Inter, Bebas_Neue, Montserrat } from 'next/font/google'; // Added Montserrat for completeness
import './globals.css';
import type { Metadata } from 'next';

// Inter (default sans-serif font)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Provides CSS var for `font-sans`
  display: 'swap',
});

// Bebas Neue (for logo and specific display elements)
const bebas_neue_layout = Bebas_Neue({ // Renamed instance to avoid conflict if Header also imports
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas', // Standardized to --font-bebas
});

// Montserrat (Optional: if you want a global --font-montserrat for Tailwind utility)
// For the current Header.tsx, this isn't strictly needed as it uses montserrat.className.
const montserrat_layout = Montserrat({
  weight: ['400', '600', '700'], // Include weights you might use globally
  subsets: ['latin'],
  variable: '--font-montserrat', // Optional: for `font-montserrat` in Tailwind
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PRIMATE Store', // Example title
  description: 'High-quality apparel.', // Example description
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${bebas_neue_layout.variable} ${montserrat_layout.variable}`} // Apply all font variables globally
    >
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        {/* Applied Inter directly as default body font. Added example bg/text colors from shadcn/ui theme */}
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow"> {/* Removed font-bebas and bebasNeue.variable from here */}
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}