"use client"; // <--- IMPORTANT: Make this a client component

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';

// Define the current year as a static variable
const CURRENT_YEAR = 2024;

export default function Footer() {
    const brandName = "PRIMATE";
    const accentColorName = "orange";
    const accentColorShade = "500";

    // Corrected string template literal usage for class definitions
    const accentColorClass = `${accentColorName}-${accentColorShade}`;
    const hoverAccentColorStaticClass = `text-${accentColorClass}`;
    const afterBgAccentColorStaticClass = `after:bg-${accentColorClass}`;

    const bgAccentColorClass = `bg-${accentColorClass}`;
    const hoverBgAccentColorClass = `hover:bg-${accentColorName}-${parseInt(accentColorShade) + 100}`;
    const ringAccentColorClass = `focus:ring-${accentColorClass}`;

    // Refs for GSAP animations
    const footerRef = useRef<HTMLElement>(null);
    const column2Ref = useRef<HTMLDivElement>(null);
    const column3Ref = useRef<HTMLDivElement>(null);
    const bottomBarRef = useRef<HTMLDivElement>(null);

    // Refs for Social Icons
    const fbRef = useRef<HTMLDivElement | null>(null);
    const igRef = useRef<HTMLDivElement | null>(null);
    const twRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animation for columns
            gsap.from(".footer-shop-link-item", {
                opacity: 0,
                x: -20,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.5,
            });

            gsap.from(".footer-support-link-item", { // Added for consistency if desired
                opacity: 0,
                x: -20,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.6, // Slightly after shop links
            });

            gsap.from(bottomBarRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power3.out',
                delay: 0.8,
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);


    useEffect(() => {
        const animateHover = (ref: React.RefObject<HTMLDivElement | null>, color: string) => {
            const el = ref.current;
            if (!el) return;

            const enter = () => {
                gsap.to(el, {
                    backgroundColor: color,
                    scale: 1.08,
                    rotateZ: 1.5,
                    boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
                    duration: 0.4,
                    ease: "power3.out",
                });
            };

            const leave = () => {
                gsap.to(el, {
                    duration: 0.4,
                    ease: "power3.inOut",
                    backgroundColor: "#000", // Assuming default is black as per className
                    scale: 1,
                    rotateZ: 0,
                    boxShadow: "0 0 0px transparent",
                });
            };

            el.addEventListener("mouseenter", enter);
            el.addEventListener("mouseleave", leave);

            return () => {
                el.removeEventListener("mouseenter", enter);
                el.removeEventListener("mouseleave", leave);
            };
        };

        const fbCleanup = animateHover(fbRef, "#1877F2");
        const igCleanup = animateHover(igRef, "#C13584");
        const twCleanup = animateHover(twRef, "#1DA1F2");

        return () => {
            fbCleanup?.();
            igCleanup?.();
            twCleanup?.();
        };
    }, []);

    const paymentMethods = [
        { name: "Visa", icon: "Visa" },
        { name: "Mastercard", icon: "Mastercard" },
        { name: "PayPal", icon: "PayPal" },
        { name: "Amex", icon: "Amex" },
        { name: "Discover", icon: "Discover" },
        { name: "Diners Club", icon: "Diners" },
        { name: "JCB", icon: "JCB" },
    ];

    const shopLinks = [
        { href: "/", text: "HOME" },
        { href: "/products", text: "ALL PRODUCTS" },
        { href: "/collections/new-arrivals", text: "NEW DROPS" },
        { href: "/collections/best-sellers", text: "BEST SELLERS" },
        { href: "/collections/apparel", text: "APPAREL" },
        { href: "/collections/gear", text: "GEAR" },
        { href: "/sale", text: "SALE" },
    ];

    const supportLinks = [
        { href: "/about", text: `ABOUT ${brandName}` },
        { href: "/contact", text: "CONTACT US" },
        { href: "/faq", text: "FAQS" },
        { href: "/policies/shipping", text: "SHIPPING POLICY" },
        { href: "/policies/returns", text: "RETURNS & EXCHANGES" },
        { href: "/policies/privacy", text: "PRIVACY POLICY" },
        { href: "/policies/terms", text: "TERMS OF SERVICE" },
        { href: "/terms-conditions", text: "TERMS & CONDITIONS" },
    ];

    return (
        <footer ref={footerRef} className="bg-black text-white py-16 mt-20 font-bold overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">

                    <div ref={column2Ref} className="footer-column md:border-r md:border-neutral-700 md:px-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
                            <div>
                                <h4 className="text-2xl mb-6 text-white uppercase">Shop</h4>
                                <ul className="space-y-4">
                                    {shopLinks.map((link) => (
                                        <li key={link.href + link.text} className="footer-shop-link-item">
                                            <Link
                                                href={link.href}
                                                className={`footer-link relative text-neutral-400 transition-colors duration-300 text-sm 
                                                hover:${hoverAccentColorStaticClass} 
                                                after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[1.5px] 
                                                ${afterBgAccentColorStaticClass} after:transition-all after:duration-300 hover:after:w-full`}
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-2xl mb-6 text-white uppercase">Support</h4>
                                <ul className="space-y-4">
                                    {supportLinks.map((link) => (
                                        <li key={link.href + link.text} className="footer-support-link-item">
                                            <Link
                                                href={link.href}
                                                className={`footer-link relative text-neutral-400 transition-colors duration-300 text-sm 
                                                hover:${hoverAccentColorStaticClass} 
                                                after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[1.5px] 
                                                ${afterBgAccentColorStaticClass} after:transition-all after:duration-300 hover:after:w-full`}
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div ref={column3Ref} className="footer-column md:pl-12">
                        <h4 className="text-2xl mb-6 text-white uppercase">Join Our Tribe</h4>
                        <p className="text-neutral-400 text-sm mb-6 font-medium">
                            Be the first to know about new drops, exclusive deals, and {brandName} insights.
                        </p>
                        <form className="flex mb-10">
                            <label htmlFor="footer-email" className="sr-only">Email address</label>
                            <input
                                id="footer-email"
                                type="email"
                                placeholder="ENTER YOUR EMAIL ADDRESS"
                                className={`bg-neutral-800 text-white px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 ${ringAccentColorClass} w-full text-sm placeholder-neutral-500 border-2 border-neutral-700 focus:border-${accentColorClass} transition-all duration-300`}
                            />
                            <button
                                type="submit"
                                className={`${bgAccentColorClass} text-black px-6 py-3 rounded-r-md ${hoverBgAccentColorClass} hover:text-white transition-all duration-300 font-semibold text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${ringAccentColorClass}`}
                            >
                                SIGN UP
                            </button>
                        </form>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2">
                                <h5 className="text-xl mb-4 text-white uppercase">Get In Touch</h5>
                                <address className="text-neutral-400 not-italic text-sm space-y-2.5 font-medium mb-6">
                                    <p>123 PRIMATE DRIVE<br />JUNGLE CITY, JC 98765</p>
                                    <p>
                                        EMAIL: <a href={`mailto:support@${brandName.toLowerCase()}.com`} className={`hover:text-${accentColorClass} transition-colors`}>SUPPORT@{brandName.toUpperCase()}.COM</a>
                                    </p>
                                    <p>
                                        PHONE: <a href="tel:+15551234567" className={`hover:text-${accentColorClass} transition-colors`}>(555) 123-4567</a>
                                    </p>
                                </address>
                            </div>

                            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <div
                                    ref={fbRef}
                                    className="rounded-md overflow-hidden border border-neutral-700 bg-black h-28 flex flex-col items-center justify-center cursor-pointer group social-icon"
                                >
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white flex items-center justify-center w-full h-3/4"
                                        aria-label={`${brandName} on Facebook`}
                                    >
                    <FacebookIcon size={28} />
                                    </a>
                                    <div className="p-1 bg-white text-center text-black font-semibold text-sm w-full">
                                        Facebook
                                    </div>
                                </div>

                                <div
                                    ref={igRef}
                                    className="rounded-md overflow-hidden border border-neutral-700 bg-black h-28 flex flex-col items-center justify-center cursor-pointer group social-icon"
                                >
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white flex items-center justify-center w-full h-3/4"
                                        aria-label={`${brandName} on Instagram`}
                                    >
                    <InstagramIcon size={28} />
                                    </a>
                                    <div className="p-1 bg-white text-center text-black font-semibold text-sm w-full hover">
                                        Instagram
                                    </div>
                                </div>

                                <div
                                    ref={twRef}
                                    className="rounded-md overflow-hidden border border-neutral-700 bg-black h-28 flex flex-col items-center justify-center cursor-pointer group social-icon"
                                >
                                    <a
                                        href="https://x.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white flex items-center justify-center w-full h-3/4"
                                        aria-label={`${brandName} on X (formerly Twitter)`}
                                    >
                    <TwitterIcon size={28} />
                                    </a>
                                    <div className="p-1 bg-white text-center text-black font-semibold text-sm w-full">
                                        Twitter
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={bottomBarRef} className="border-t border-neutral-700 mt-16 pt-10 text-center">
                    <div className="flex justify-center items-center space-x-5 mb-1">
                        {paymentMethods.map((method, index) => (
                            <div
                                key={`${method.name}-${index}`}
                                title={method.name}
                                className="transform transition-transform duration-300 hover:scale-110"
                            >
                                {method.icon}
                            </div>
                        ))}
                    </div>
                    <p className='mb-3 text-center text-neutral-400 text-xs tracking-wider font-medium mt-3'>INDIAN ORIGIN</p>
                    <p className="text-neutral-500 text-xs tracking-wider font-medium">
                        © {CURRENT_YEAR} {brandName}. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
}   