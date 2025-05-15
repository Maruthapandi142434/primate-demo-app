// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, User, LogOut, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '@/providers/CartProvider';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Bebas_Neue, Montserrat } from 'next/font/google';

// Bebas Neue for Logo (used via CSS variable --font-bebas)
const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas', // This is key for `font-bebas` class in Tailwind
  display: 'swap',
});

// Montserrat for Navigation Links (Top, Bottom, Special Offers)
const montserrat = Montserrat({
  weight: ['600'], // For font-semibold equivalent for nav links
  subsets: ['latin'],
  display: 'swap',
  // No variable needed here if we use `montserrat.className` directly
});

interface Category {
  id: string;
  name: string;
}

export default function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesBottom, setCategoriesBottom] = useState<Category[]>([]);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTopDropdownOpen, setIsTopDropdownOpen] = useState(false);
  const [isBottomDropdownOpen, setIsBottomDropdownOpen] = useState(false);

  const wishlistCount = 2;

  const topDropdownRef = useRef<HTMLDivElement>(null);
  const bottomDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchTopCategories() {
      const mockTopCategories: Category[] = [
        { id: 'tshirt', name: 'T-shirt' },
        { id: 'tank-tops', name: 'Tank Tops' },
        { id: 'biggy-tshirt', name: 'Biggy T-shirt' },
      ];
      setCategories(mockTopCategories);
    }
    fetchTopCategories();
  }, []);

  useEffect(() => {
    async function fetchBottomCategories() {
      const mockBottomCategories: Category[] = [
        { id: 'shorts', name: 'Shorts' },
        { id: 'tracks', name: 'Tracks' },
      ];
      setCategoriesBottom(mockBottomCategories);
    }
    fetchBottomCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (topDropdownRef.current && !topDropdownRef.current.contains(event.target as Node)) {
        setIsTopDropdownOpen(false);
      }
      if (bottomDropdownRef.current && !bottomDropdownRef.current.contains(event.target as Node)) {
        setIsBottomDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllDesktopDropdowns = () => {
    setIsTopDropdownOpen(false);
    setIsBottomDropdownOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeAllDesktopDropdowns();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    const newMobileMenuState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newMobileMenuState);
    if (newMobileMenuState) {
      closeAllDesktopDropdowns();
    }
  };

  const headerBgClass = isScrolled ? 'bg-white shadow-md' : 'bg-black';
  const logoTextColorClass = isScrolled ? 'text-gray-800' : 'text-white';
  const logoHoverTextColorClass = isScrolled ? 'hover:text-primary' : 'hover:text-gray-300';
  const iconBaseColorClass = isScrolled ? 'text-gray-700' : 'text-white';
  const iconHoverClasses = isScrolled
    ? 'hover:bg-gray-100 hover:text-primary'
    : 'hover:bg-white/20 hover:text-gray-300';
  const navLinkBaseStyle = `px-3 py-2 rounded-md transition-all duration-200 ease-in-out inline-block font-medium`;

  const getNavLinkClasses = (scrolled: boolean) => {
    if (scrolled) {
      return `text-gray-700 hover:text-primary hover:bg-gray-100`;
    } else {
      return `text-white hover:bg-white hover:text-black`;
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-50 transition-colors duration-300 ease-in-out ${headerBgClass}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className={`text-6xl font-bold font-bebas transition-colors duration-300 ease-in-out  ${logoTextColorClass} ${logoHoverTextColorClass} italic`}
            onClick={closeAllDesktopDropdowns}
          >
            PRIMATE
          </Link>

          <nav className={`hidden md:flex items-center md:gap-1 lg:gap-2 `}>
            <div className="relative" ref={topDropdownRef}>
              <button
                onClick={() => {
                  setIsTopDropdownOpen(!isTopDropdownOpen);
                  setIsBottomDropdownOpen(false);
                  setIsProfileOpen(false);
                }}
                className={`flex items-center gap-1 ${navLinkBaseStyle} ${getNavLinkClasses(isScrolled)} ${montserrat.className}`}
              >
                Top
                <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isTopDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isTopDropdownOpen && (
                <div className="absolute left-0 mt-1 bg-white shadow-lg rounded-md py-2 w-48 z-[60] border">
                  {categories.length > 0 ? categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary text-sm"
                      onClick={() => setIsTopDropdownOpen(false)}
                    >
                      {category.name}
                    </Link>
                  )) : <span className="block px-4 py-2 text-sm text-gray-500">No categories</span>}
                </div>
              )}
            </div>

            <div className="relative" ref={bottomDropdownRef}>
              <button
                onClick={() => {
                  setIsBottomDropdownOpen(!isBottomDropdownOpen);
                  setIsTopDropdownOpen(false);
                  setIsProfileOpen(false);
                }}
                className={`flex items-center gap-1 ${navLinkBaseStyle} ${getNavLinkClasses(isScrolled)} ${montserrat.className}`}
              >
                Bottom
                <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isBottomDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isBottomDropdownOpen && (
                <div className="absolute left-0 mt-1 bg-white shadow-lg rounded-md py-2 w-48 z-[60] border">
                  {categoriesBottom.length > 0 ? categoriesBottom.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary text-sm"
                      onClick={() => setIsBottomDropdownOpen(false)}
                    >
                      {category.name}
                    </Link>
                  )) : <span className="block px-4 py-2 text-sm text-gray-500">No categories</span>}
                </div>
              )}
            </div>

            <Link
              href="/products?filter=special-offers"
              className={`${navLinkBaseStyle} ${montserrat.className} ${
                isScrolled ? 'text-red-600 hover:text-red-700 hover:bg-gray-100' : 'text-red-500 hover:text-red-600 hover:bg-white'
              }`}
              onClick={closeAllDesktopDropdowns}
            >
              Special Offers
            </Link>
          </nav>

          <div className={`flex items-center gap-3 md:gap-4`}>
            <div className="relative hidden md:block group">
              <input
                type="text"
                placeholder="What are you looking for"
                className={`
                  absolute right-12 top-1/2 transform -translate-y-1/2 scale-95 
                  w-56 px-4 py-2 rounded-full border border-gray-300 shadow-lg 
                  focus:outline-none bg-white text-gray-900
                  opacity-0 group-hover:opacity-100 group-hover:scale-100 
                  transition-all duration-300 ease-in-out placeholder:text-sm  
                `}
                onFocus={closeAllDesktopDropdowns}
              />
              <button
                className={`p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`}
                aria-label="Search"
                onClick={closeAllDesktopDropdowns}
              >
                <Search className="h-5 w-5 " />
              </button>
            </div>

            <div className="hidden md:block" ref={profileDropdownRef}>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => {
                        setIsProfileOpen(!isProfileOpen);
                        setIsTopDropdownOpen(false);
                        setIsBottomDropdownOpen(false);
                    }}
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
                  <Link href="/login" onClick={closeAllDesktopDropdowns}>
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
                  <Link href="/register" onClick={closeAllDesktopDropdowns}>
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
              onClick={closeAllDesktopDropdowns}
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

            <Link 
              href="/cart" 
              className={`relative p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`} 
              aria-label="Shopping cart"
              onClick={closeAllDesktopDropdowns}
            >
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

        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40 border-t pb-4 ${montserrat.className}`}>
            <nav className="flex flex-col gap-2 px-4 pt-4 text-gray-800">
              <div className="mb-2">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                />
              </div>
             
              <Link href="/products?filter=special-offers" className={`block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary text-red-600 ${montserrat.className}`} onClick={toggleMobileMenu}>Special Offers</Link>
              
              <span className={`px-4 py-2 text-gray-500 text-sm font-semibold ${montserrat.className}`}>TOP</span>
              {categories.length > 0 ? categories.map((category) => (
                <Link
                  key={`mobile-top-${category.id}`}
                  href={`/category/${category.id}`}
                  className={`block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary pl-8 ${montserrat.className}`}
                  onClick={toggleMobileMenu}
                >
                  {category.name}
                </Link>
              )) : <span className={`block py-2 px-4 text-lg text-gray-400 pl-8 ${montserrat.className}`}>No top categories</span>}
              
              <span className={`px-4 py-2 text-gray-500 text-sm font-semibold ${montserrat.className}`}>BOTTOM</span>
              {categoriesBottom.length > 0 ? categoriesBottom.map((category) => (
                <Link
                  key={`mobile-bottom-${category.id}`}
                  href={`/category/${category.id}`}
                  className={`block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary pl-8 ${montserrat.className}`}
                  onClick={toggleMobileMenu}
                >
                  {category.name}
                </Link>
              )) : <span className={`block py-2 px-4 text-lg text-gray-400 pl-8 ${montserrat.className}`}>No bottom categories</span>}

              <Link href="/products" className={`block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary ${montserrat.className}`} onClick={toggleMobileMenu}>Shop All</Link>
              <Link href="/blog" className={`block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary ${montserrat.className}`} onClick={toggleMobileMenu}>Blog</Link>
              <Link href="/about" className={`block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary ${montserrat.className}`} onClick={toggleMobileMenu}>Our Story</Link>
              <hr className="my-2" />
              {user ? (
                <>
                  <Link href="/account/dashboard" className={`block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary ${montserrat.className}`} onClick={toggleMobileMenu}>My Account</Link>
                  <button
                    onClick={handleLogout}
                    className={`block py-2 px-4 text-lg text-red-600 hover:bg-gray-100 text-left w-full ${montserrat.className}`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className={`block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary ${montserrat.className}`} onClick={toggleMobileMenu}>Login</Link>
                  <Link href="/register" className={`block py-2 px-4 text-lg hover:bg-gray-100 hover:text-primary ${montserrat.className}`} onClick={toggleMobileMenu}>Register</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}