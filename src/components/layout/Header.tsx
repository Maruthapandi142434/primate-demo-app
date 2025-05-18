// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, User, LogOut, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/providers/CartProvider';
import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Bebas_Neue, Montserrat } from 'next/font/google';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const montserrat_nav = Montserrat({
  weight: ['500'], // Corresponds to font-medium
  subsets: ['latin'],
  variable: '--font-montserrat-nav',
  display: 'swap',
});

interface Category {
  id: string; // Usually a slug for the URL
  name: string;
}

// Define specific category lists for Top and Bottom
const topCategories: Category[] = [
  { id: 'tshirt', name: 'Tshirt' },
  { id: 'biggie-t', name: 'Biggie-t' },
  { id: 'tank-tops', name: 'Tank-tops' },
];

const bottomCategories: Category[] = [
  { id: 'tracks', name: 'Tracks' },
  { id: 'shorts', name: 'Shorts' },
];

// Categories for the mobile menu (can be a combined list or different)
const mobileMenuCategories: Category[] = [
  ...topCategories,
  ...bottomCategories,
  // You can add more general categories here if needed for mobile
  // { id: 'belts', name: 'Belts' },
  // { id: 'apparel', name: 'Apparel' },
];


export default function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  // State for categories is not strictly needed if they are static as above
  // but kept for potential future dynamic fetching for mobile or other sections.
  const [allCategoriesForMobile, setAllCategoriesForMobile] = useState<Category[]>(mobileMenuCategories);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const wishlistCount = 2; // Example count

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // This useEffect is now less critical if top/bottom categories are static
  // but can be used if you plan to fetch 'allCategoriesForMobile' or other dynamic categories.
  useEffect(() => {
    // Example: if you wanted to fetch mobile categories dynamically
    // async function fetchMobileCategories() {
    //   try {
    //     // const fetchedCategories = await api.fetchCategories();
    //     // setAllCategoriesForMobile(fetchedCategories);
    //   } catch (error) {
    //     console.error('Error fetching mobile categories:', error);
    //   }
    // }
    // fetchMobileCategories();
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsProfileOpen(false);
      setIsSearchOpen(false);
    }
  };

  const headerBgClass = isScrolled ? 'bg-white shadow-md' : 'bg-black';
  const logoTextColorClass = isScrolled ? 'text-gray-800' : 'text-white';
  const logoHoverTextColorClass = isScrolled ? 'hover:text-primary' : 'hover:text-gray-300';

  const iconBaseColorClass = isScrolled ? 'text-gray-700' : 'text-white';
  const iconHoverClasses = isScrolled
    ? 'hover:bg-gray-100 hover:text-primary'
    : 'hover:bg-white/20 hover:text-gray-300';

  const navLinkBaseStyle = "px-3 py-2 rounded-md transition-all duration-200 ease-in-out inline-block";

  const getNavLinkClasses = (scrolled: boolean) => {
    const fontClass = "font-montserrat_nav";
    if (scrolled) {
      return `${navLinkBaseStyle} ${fontClass} text-gray-700 hover:text-primary hover:bg-gray-100`;
    } else {
      return `${navLinkBaseStyle} ${fontClass} text-white hover:bg-white hover:text-black`;
    }
  };

  const getSpecialOffersLinkClasses = (scrolled: boolean) => {
    let baseColor = 'text-red-600';
    let hoverClasses = '';
    if (scrolled) {
      hoverClasses = 'hover:text-primary hover:bg-gray-100';
    } else {
      hoverClasses = 'hover:text-black hover:bg-white';
    }
    return `${navLinkBaseStyle} font-medium ${baseColor} ${hoverClasses}`;
  };

  return (
    <>
      <header className={`sticky top-0 z-50 transition-colors duration-300 ease-in-out ${headerBgClass}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className={`text-6xl font-bold font-bebas transition-colors duration-300 ease-in-out italic ${logoTextColorClass} ${logoHoverTextColorClass}`}
          >
            PRIMATE
          </Link>

          <nav className={`hidden md:flex items-center md:gap-1 lg:gap-2 `}>
            {/* "Top" Link - Uses Montserrat & new topCategories */}
            <div className="relative group">
              <button className={`flex items-center gap-1 ${getNavLinkClasses(isScrolled)}`}>
                Top
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48 z-[60] border mt-1">
                {topCategories.length > 0 ? topCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/top/${category.id}`} // Adjusted href for potential sub-category structure
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary text-sm"
                  >
                    {category.name}
                  </Link>
                )) : <span className="block px-4 py-2 text-sm text-gray-500">No categories</span>}
              </div>
            </div>
            {/* "Bottom" Link - Uses Montserrat & new bottomCategories */}
            <div className="relative group">
              <button className={`flex items-center gap-1 ${getNavLinkClasses(isScrolled)}`}>
                Bottom
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48 z-[60] border mt-1">
                {bottomCategories.length > 0 ? bottomCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/bottom/${category.id}`} // Adjusted href
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary text-sm"
                  >
                    {category.name}
                  </Link>
                )) : <span className="block px-4 py-2 text-sm text-gray-500">No categories</span>}
              </div>
            </div>
            <Link
              href="/special-offers" // UPDATE THIS URL
              className={getSpecialOffersLinkClasses(isScrolled)}
            >
              Special Offers
            </Link>
          </nav>

          <div className={`flex items-center gap-3 md:gap-4`}>
            <div className="relative hidden md:block group">
              <input
                type="text"
                placeholder="What are you looking for?"
                className={`
                  absolute right-12 top-1/2 transform -translate-y-1/2 scale-95
                  w-56 px-4 py-2 rounded-full border border-gray-300 shadow-lg
                  focus:outline-none bg-white text-gray-900
                  opacity-0 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300 ease-in-out placeholder:text-sm
                `}
              />
              <button
                className={`p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            <div className="hidden md:block">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`}
                    aria-label="User account"
                  >
                    <User className="h-5 w-5" />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[60] border">
                      <Link
                        href="/account/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className={isScrolled
                        ? 'border-primary text-primary hover:bg-primary/10'
                        : 'border-white text-white hover:bg-white hover:text-black'}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className={isScrolled
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-white text-black hover:bg-gray-200'}
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/wishlist"
              className={`relative p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`}
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center
                    ${isScrolled ? 'bg-primary text-primary-foreground' : 'bg-white text-primary'}`}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className={`relative p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`} aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center
                    ${isScrolled ? 'bg-primary text-primary-foreground' : 'bg-white text-primary'}`}
                >
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md z-40 border-t md:hidden">
            <div className="container mx-auto px-4 py-4">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-800"
                autoFocus
              />
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40 border-t pb-4">
            <nav className="flex flex-col gap-1 px-4 pt-4 text-gray-800">
              <div className="mb-3">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 text-base focus:ring-primary focus:border-primary"
                />
              </div>

              <Link href="/products" className="block py-3 px-4 text-lg hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>Shop All</Link>

              <span className="px-4 py-2 text-gray-500 text-sm font-semibold">Categories</span>
              {/* Using allCategoriesForMobile for the mobile menu */}
              {allCategoriesForMobile.length > 0 ? allCategoriesForMobile.map((category) => (
                <Link
                  key={category.id}
                  // Adjust href for mobile based on how you structure your category pages
                  href={`/category/${category.id}`}
                  className="block py-3 px-4 text-lg hover:bg-gray-100 hover:text-primary rounded-md pl-8"
                  onClick={toggleMobileMenu}
                >
                  {category.name}
                </Link>
              )) : <span className="block py-3 px-4 text-lg text-gray-400 pl-8">No categories</span>}

              <Link
                href="/special-offers" // UPDATE THIS URL
                className="block py-3 px-4 text-lg text-red-600 hover:bg-gray-100 hover:text-primary rounded-md"
                onClick={toggleMobileMenu}
              >
                Special Offers
              </Link>

              <Link href="/blog" className="block py-3 px-4 text-lg hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>Blog</Link>
              <Link href="/about" className="block py-3 px-4 text-lg hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>Our Story</Link>

              <hr className="my-3" />

              {user ? (
                <>
                  <Link href="/account/dashboard" className="block py-3 px-4 text-lg hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>My Account</Link>
                  <button
                    onClick={handleLogout}
                    className="block py-3 px-4 text-lg text-red-600 hover:bg-gray-100 text-left w-full rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block py-3 px-4 text-lg hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>Login</Link>
                  <Link href="/register" className="block py-3 px-4 text-lg hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>Register</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}