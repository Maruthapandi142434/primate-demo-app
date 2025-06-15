// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, User, LogOut, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '@/providers/CartProvider';
import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Bebas_Neue, Montserrat } from 'next/font/google';

// Load fonts
const bebas = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-bebas',
    display: 'swap',
});

const montserrat_nav_font = Montserrat({
    weight: ['500'],
    subsets: ['latin'],
    variable: '--font-montserrat-nav',
    display: 'swap',
});

interface Category {
    id: string;
    name: string;
}

const topCategories: Category[] = [
    { id: 'tshirt', name: 'Tshirt' },
    { id: 'biggie-t', name: 'Biggie-t' },
    { id: 'tank-tops', name: 'Tank-tops' },
];

const bottomCategories: Category[] = [
    { id: 'tracks', name: 'Tracks' },
    { id: 'shorts', name: 'Shorts' },
];

const mobileMenuCategories: Category[] = [
    ...topCategories,
    ...bottomCategories,
];


export default function Header() {
    const { itemCount } = useCart();
    const { user, logout } = useAuth();
    const [allCategoriesForMobile, setAllCategoriesForMobile] = useState<Category[]>(mobileMenuCategories);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopSearchVisible, setIsDesktopSearchVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const wishlistCount = 2;
    const [isAuthReady, setIsAuthReady] = useState(false); // ADDED AUTH READY STATE

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call on mount to set initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Simulate authentication check (replace with your actual logic)
        const checkAuth = async () => {
            // Your auth logic here - maybe fetch user data or check localStorage
            // ...

            setIsAuthReady(true); // Set to true when auth is ready
        };
        checkAuth();
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
        }
    };

    const toggleDesktopSearch = () => {
        setIsDesktopSearchVisible(!isDesktopSearchVisible);
    };


    // Dynamic classes based on scroll state
    const headerBgClass = isScrolled ? 'bg-white shadow-lg' : 'bg-black';
    const logoTextColorClass = isScrolled ? 'text-gray-900' : 'text-white';
    const logoHoverTextColorClass = isScrolled ? 'hover:text-primary' : 'hover:text-gray-300';

    const iconBaseColorClass = isScrolled ? 'text-gray-700' : 'text-white';
    const iconHoverClasses = isScrolled
        ? 'hover:bg-gray-100 hover:text-primary'
        : 'hover:bg-white/15 hover:text-gray-200';

    const navLinkBaseStyle = "px-3 py-2 rounded-md transition-all duration-200 ease-in-out inline-block text-sm";

    const getNavLinkClasses = (scrolled: boolean) => {
        const fontClass = "font-montserrat_nav";
        if (scrolled) {
            return `${navLinkBaseStyle} ${fontClass} text-gray-700 hover:text-primary hover:bg-gray-100`;
        } else {
            return `${navLinkBaseStyle} ${fontClass} text-white hover:bg-white hover:text-black`;
        }
    };

    const getSpecialOffersLinkClasses = (scrolled: boolean) => {
        let baseStyles = `relative inline-block px-4 py-2 rounded-md text-sm font-montserrat_nav font-medium transition-all duration-300 ease-in-out transform group`;
        let colorStyles = '';

        if (scrolled) {
            colorStyles = 'bg-white text-special-offer shadow-md hover:shadow-lg hover:scale-105 border border-special-offer/30';
        } else {
            colorStyles = 'bg-special-offer text-special-offer-foreground shadow-lg hover:bg-opacity-90 hover:scale-105';
        }
        return `${baseStyles} ${colorStyles}`;
    };

    if (!isAuthReady) { // ADDED AUTH CHECK
        return (
            <header className={`sticky top-0 z-50 transition-colors duration-300 ease-in-out bg-gray-100`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-center items-center">
                    Loading... {/* Or a better loading indicator */}
                </div>
            </header>
        );
    }


    return (
        <>
            <header className={`sticky top-0 z-50 transition-colors duration-300 ease-in-out ${headerBgClass} ${bebas.variable} ${montserrat_nav_font.variable}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        href="/"
                        className={`text-6xl lg:text-5xl font-bebas font-bold transition-colors duration-300 ease-in-out italic tracking-wider ${logoTextColorClass} ${logoHoverTextColorClass}`}
                    >
                        PRIMATE
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className={`hidden md:flex items-center md:gap-1 lg:gap-2 font-montserrat_nav`}>
                        {/* "Top" Link */}
                        <div className="relative group">
                            <button className={`flex items-center gap-1 ${getNavLinkClasses(isScrolled)}`}>
                                Top
                                <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-1 w-44 z-[60] border mt-1 text-sm">
                                {topCategories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/category/top/${category.id}`}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* "Bottom" Link */}
                        <div className="relative group">
                            <button className={`flex items-center gap-1 ${getNavLinkClasses(isScrolled)}`}>
                                Bottom
                                <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-1 w-44 z-[60] border mt-1 text-sm">
                                {bottomCategories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/category/bottom/${category.id}`}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Special Offers Link */}
                        <Link
                            href="/special-offers"
                            className={`${getSpecialOffersLinkClasses(isScrolled)}`}
                        >
                            Special Offers
                            <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-special-offer opacity-75 group-hover:opacity-100"></span>
                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-special-offer group-hover:bg-opacity-80"></span>
                            </span>
                        </Link>
                    </nav>

                    {/* Icons and Auth Section */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Desktop Search Icon & Input */}
                        <div className="relative hidden md:block">
                            <button
                                onClick={toggleDesktopSearch}
                                className={`p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`}
                                aria-label="Search"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                            {isDesktopSearchVisible && (
                                <div className="absolute right-0 top-full mt-2 z-20">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-64 px-4 py-2 rounded-full border border-gray-300 shadow-lg
                                focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 text-sm"
                                        autoFocus
                                        onBlur={() => setTimeout(() => setIsDesktopSearchVisible(false), 100)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Desktop User/Auth */}
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
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[60] border text-sm">
                                            <Link
                                                href="/account/dashboard"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                My Account
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center"
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
                                            className={`text-xs px-3 py-1.5 ${isScrolled
                                                ? 'border-primary text-primary hover:bg-primary/10'
                                                : 'border-white text-white hover:bg-white hover:text-black'}`}
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button
                                            size="sm"
                                            className={`text-xs px-3 py-1.5 ${isScrolled
                                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                                : 'bg-white text-black hover:bg-gray-200'}`}
                                        >
                                            Register
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Wishlist */}
                        <Link
                            href="/wishlist"
                            className={`relative p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`}
                            aria-label="Wishlist"
                        >
                            <Heart className="h-5 w-5" />
                            {wishlistCount > 0 && (
                                <span
                                    className={`absolute -top-1 -right-1 text-[0.65rem] font-bold rounded-full h-4 w-4 flex items-center justify-center
                    ${isScrolled ? 'bg-primary text-primary-foreground' : 'bg-white text-primary'}`}
                                >
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className={`relative p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`} aria-label="Shopping cart">
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span
                                    className={`absolute -top-1 -right-1 text-[0.65rem] font-bold rounded-full h-4 w-4 flex items-center justify-center
                    ${isScrolled ? 'bg-primary text-primary-foreground' : 'bg-white text-primary'}`}
                                >
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleMobileMenu}
                            className={`md:hidden p-2 rounded-full ${iconBaseColorClass} ${iconHoverClasses}`}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40 border-t pb-4">
                        <nav className={`flex flex-col gap-1 px-4 pt-4 text-gray-800 font-montserrat_nav`}>
                            <div className="mb-3">
                                <input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full p-3 border border-gray-300 rounded-md text-gray-800 text-base focus:ring-primary focus:border-primary"
                                    autoFocus
                                />
                            </div>

                            <Link href="/products" className="block py-2.5 px-3 text-base hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>Shop All</Link>

                            <span className="px-3 py-2 text-gray-500 text-xs font-semibold uppercase tracking-wider">Categories</span>
                            {allCategoriesForMobile.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.id}`}
                                    className="block py-2.5 px-3 text-base hover:bg-gray-100 hover:text-primary rounded-md pl-6"
                                    onClick={toggleMobileMenu}
                                >
                                    {category.name}
                                </Link>
                            ))}

                            <Link
                                href="/special-offers"
                                className="block py-2.5 px-3 text-base font-medium text-special-offer hover:bg-gray-100 hover:text-opacity-80 rounded-md relative group"
                                onClick={toggleMobileMenu}
                            >
                                Special Offers
                                <span className="absolute top-1/2 -translate-y-1/2 right-4 flex h-2.5 w-2.5 opacity-80 group-hover:opacity-100">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-special-offer opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-special-offer"></span>
                                </span>
                            </Link>

                            <Link href="/blog" className="block py-2.5 px-3 text-base hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>Blog</Link>
                            <Link href="/about" className="block py-2.5 px-3 text-base hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>Our Story</Link>

                            <hr className="my-3 border-gray-200" />

                            {user ? (
                                <>
                                    <Link href="/account/dashboard" className="block py-2.5 px-3 text-base hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>My Account</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block py-2.5 px-3 text-base text-red-600 hover:bg-red-50 text-left w-full rounded-md"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="block py-2.5 px-3 text-base hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>Login</Link>
                                    <Link href="/register" className="block py-2.5 px-3 text-base hover:bg-gray-100 hover:text-primary rounded-md" onClick={toggleMobileMenu}>Register</Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}