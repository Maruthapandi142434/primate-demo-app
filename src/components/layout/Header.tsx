// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, User, LogOut, Search, Menu, X, Instagram, Facebook, Youtube } from 'lucide-react'; // Removed Phone, Mail
import { useCart } from '@/providers/CartProvider';
import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react'; // or your icon library
import { Bebas_Neue } from 'next/font/google';
const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});
interface Category {
  id: string;
  name: string;
}

export default function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
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


  useEffect(() => {
    async function fetchCategories() {
      try {
        const mockCategories: Category[] = [
          { id: 'lifting-straps', name: 'Lifting Straps' },
          { id: 'knee-sleeves', name: 'Knee Sleeves' },
          { id: 'belts', name: 'Belts' },
          { id: 'apparel', name: 'Apparel' },
        ];
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
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

  const navLinkBaseStyle = "px-3 py-2 rounded-md transition-all duration-200 ease-in-out inline-block font-medium";
  const getNavLinkClasses = (scrolled: boolean) => {
    if (scrolled) {
      return `${navLinkBaseStyle} text-gray-700 hover:text-primary hover:bg-gray-100`;
    } else {
      return `${navLinkBaseStyle} text-white hover:bg-white hover:text-black`;
    }
  };

  return (
    <>
      {/* Announcement Bar */}

      {/* Top Secondary Nav REMOVED */}

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-colors duration-300 ease-in-out ${headerBgClass}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className={`text-4xl font-bold font-bebas  transition-colors duration-300 ease-in-out italic ${logoTextColorClass} ${logoHoverTextColorClass}`}
          >
            PRIMATE
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center md:gap-1 lg:gap-2 `}>
            <div className="relative group">
              <button className={`flex items-center gap-1 ${getNavLinkClasses(isScrolled)}`}>
                Top
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48 z-[60] border mt-1">
                {categories.length > 0 ? categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary text-sm"
                  >
                    {category.name}
                  </Link>
                )) : <span className="block px-4 py-2 text-sm text-gray-500">No categories</span>}
              </div>
            </div>
            <div className="relative group">
              <button className={`flex items-center gap-1 ${getNavLinkClasses(isScrolled)}`}>
                Bottom
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48 z-[60] border mt-1">
                {categories.length > 0 ? categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary text-sm"
                  >
                    {category.name}
                  </Link>
                )) : <span className="block px-4 py-2 text-sm text-gray-500">No categories</span>}
              </div>
            </div>
            <div className="relative group">
              <button className={`flex items-center gap-1 ${getNavLinkClasses(isScrolled)}`}>
                Special Offers
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48 z-[60] border mt-1">
                {categories.length > 0 ? categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary text-sm"
                  >
                    {category.name}
                  </Link>
                )) : <span className="block px-4 py-2 text-sm text-gray-500">No categories</span>}
              </div>
            </div>

            {/* Support Link REMOVED */}
          </nav>

          {/* Right Icons & Actions */}
          <div className={`flex items-center gap-3 md:gap-4`}>
            <div className="relative hidden md:block group">
              {/* Search Input - animated to appear on the LEFT of the icon */}
              <input
                type="text"
                placeholder="What are you lookining for"
                className={`
      absolute right-12 top-1/2 transform -translate-y-1/2 scale-95 
      w-56 px-4 py-2 rounded-full border border-gray-300 shadow-lg 
      focus:outline-none bg-white text-gray-900
      opacity-0 group-hover:opacity-100 group-hover:scale-100 
      transition-all duration-300 ease-in-out placeholder:text-sm  
    `}
              />

              {/* Search Icon */}
              <button
                className={`p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`}
                aria-label="Search"
              >
                <Search className="h-5 w-5 " />
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
          <div className="absolute top-full left-0 right-0 bg-white shadow-md z-40 border-t md:border-none">
            <div className="container mx-auto px-4 py-4">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-800"
              />
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40 border-t pb-4">
            <nav className="flex flex-col gap-2 px-4 pt-4 text-gray-800">
              <div className="mb-2">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                />
              </div>
              <Link href="/products" className="block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary" onClick={toggleMobileMenu}>Shop All</Link>
              <span className="px-4 py-2 text-gray-500 text-sm font-semibold">Categories</span>
              {categories.length > 0 ? categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary pl-8"
                  onClick={toggleMobileMenu}
                >
                  {category.name}
                </Link>
              )) : <span className="block py-2 px-4 text-lg text-gray-400 pl-8">No categories</span>}
              <Link href="/blog" className="block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary" onClick={toggleMobileMenu}>Blog</Link>
              <Link href="/about" className="block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary" onClick={toggleMobileMenu}>Our Story</Link>
              {/* Support Link REMOVED from mobile menu */}
              <hr className="my-2" />
              {user ? (
                <>
                  <Link href="/account/dashboard" className="block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary" onClick={toggleMobileMenu}>My Account</Link>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-4 text-lg text-red-600 hover:bg-gray-100 text-left w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary" onClick={toggleMobileMenu}>Login</Link>
                  <Link href="/register" className="block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary" onClick={toggleMobileMenu}>Register</Link>
                </>
              )}
            </nav>

          </div>
        )}
      </header>
    </>
  );
}