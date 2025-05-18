// src/app/layout.tsx
import { CartProvider } from '@/providers/CartProvider';
import { Inter, Bebas_Neue, Montserrat } from 'next/font/google'; // Import Bebas_Neue and Montserrat
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/providers/AuthProvider';
// import { Toaster } from "@/components/ui/toaster"; // Optional: If you use shadcn/ui Toaster

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Good practice for font loading
});

const bebas_neue = Bebas_Neue({ // Renamed to avoid conflict with 'bebas' in Header if not careful
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas', // This MUST match the variable name in tailwind.config & Header
  display: 'swap',
});

const montserrat_nav = Montserrat({
  weight: ['500'], // For font-medium equivalent
  subsets: ['latin'],
  variable: '--font-montserrat-nav', // This MUST match the variable name in tailwind.config & Header
  display: 'swap',
});

// Optional: Add metadata for SEO
export const metadata = {
  title: 'PRIMATE - Your Brand Name',
  description: 'High-quality fitness gear and apparel.',
  // Add more metadata here: openGraph, icons, etc.
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
      // Apply all font variables to the html tag
      className={`${inter.variable} ${bebas_neue.variable} ${montserrat_nav.variable}`}
    >
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}