// src/components/layout/Footer.tsx
"use client"; // <--- IMPORTANT: Make this a client component

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// To use actual icons, uncomment the next line and install react-icons:
// import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaTiktok } from 'react-icons/fa';
// import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from 'react-icons/fa';

export default function Footer() {
  const brandName = "PRIMATE";
  const accentColorName = "orange";
  const accentColorShade = "500";
  const accentColorClass = `${accentColorName}-${accentColorShade}`;
  // For CSS hovers on links (underline effect)
  const hoverAccentColorStaticClass = `text-${accentColorClass}`;
  const afterBgAccentColorStaticClass = `after:bg-${accentColorClass}`;

  const bgAccentColorClass = `bg-${accentColorClass}`;
  const hoverBgAccentColorClass = `hover:bg-${accentColorName}-${parseInt(accentColorShade) + 100}`;
  const ringAccentColorClass = `focus:ring-${accentColorClass}`;

  // Refs for GSAP animations
  const footerRef = useRef<HTMLElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for columns
      // gsap.from([column1Ref.current, column2Ref.current, column3Ref.current], {
      //   opacity: 0,
      //   y: 50,
      //   duration: 0.8,
      //   stagger: 0.2,
      //   ease: 'power3.out',
      //   delay: 0.2, // Small delay after page load
      // });

      // Entrance animation for list items (example for shop links)
      // You can add similar for support links, social icons, etc.
      gsap.from(".footer-shop-link-item", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.5, // After columns appear
      });

      // Entrance animation for bottom bar
      gsap.from(bottomBarRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.8, // After columns
      });

    }, footerRef); // Scope animations to the footer element

    return () => ctx.revert(); // Cleanup GSAP animations on component unmount
  }, []);


  const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/your_username",
    label: "PRIMATE on Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/your_username",
    label: "PRIMATE on Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/your_username",
    label: "PRIMATE on Twitter",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
      </svg>
    ),
  },
];

  const paymentMethods = [
    { name: "Visa", icon: <span className="text-neutral-500 text-3xl">P</span> },
    { name: "Mastercard", icon: <span className="text-neutral-500 text-3xl">R</span> },
    { name: "PayPal", icon: <span className="text-neutral-500 text-3xl">I</span> },
    { name: "Amex", icon: <span className="text-neutral-500 text-3xl">M</span> },
    { name: "Visa", icon: <span className="text-neutral-500 text-3xl">A</span> },
    { name: "Mastercard", icon: <span className="text-neutral-500 text-3xl">T</span> },
    { name: "PayPal", icon: <span className="text-neutral-500 text-3xl">E</span> },
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
  ];

  const handleSocialIconHover = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, enter: boolean) => {
    gsap.to(e.currentTarget, {
      scale: enter ? 1.25 : 1,
      y: enter ? -3 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <footer ref={footerRef} className="bg-black text-white py-16 mt-20 font-bold overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">

          {/* Column 1: Brand Philosophy & Social */}
          {/* <div ref={column1Ref} className="footer-column md:border-r md:border-neutral-700 md:pr-12">
            <h3 className={`text-4xl mb-6 text-${accentColorClass} uppercase`}>{brandName}</h3>
            <p className="text-neutral-400 mb-8 text-sm leading-relaxed uppercase font-medium text-justify">
              PRIMATE IS MORE THAN JUST A BRAND; IT'S A PHILOSOPHY ROOTED IN THE BELIEF OF BECOMING THE BEST VERSION OF YOURSELF. OUR MISSION IS TO EMPOWER INDIVIDUALS TO EMBRACE THEIR INNER STRENGTH AND POTENTIAL, GUIDING THEM ON A JOURNEY OF SELF-IMPROVEMENT AND PERSONAL GROWTH. PRIMATE INSPIRES INDIVIDUALS TO UNLEASH THEIR FULL ABILITY, BOTH PHYSICALLY AND MENTALLY, TO CONQUER ANY CHALLENGE OR OBSTACLE. EMBRACE THE PATH TO SELF-DISCOVERY AND UNLOCK THE POWER FROM WITHIN.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((social) => (
                <Link
                  key={social.name} // Assuming social.name is unique here
                  href={social.href}
                  aria-label={social.label}
                  className={`text-neutral-300 transition-colors duration-300 hover:text-${accentColorClass}`}
                  onMouseEnter={(e) => handleSocialIconHover(e, true)}
                  onMouseLeave={(e) => handleSocialIconHover(e, false)}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div> */}

          {/* Column 2: Contains TWO sub-columns for Shop & Support */}
          <div ref={column2Ref} className="footer-column md:border-r md:border-neutral-700 md:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
              <div>
                <h4 className="text-2xl mb-6 text-white uppercase">Shop</h4>
                <ul className="space-y-4">
                  {shopLinks.map((link, index) => (
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

          {/* Column 3: Newsletter & Contact Info */}
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

            <h5 className="text-xl mb-4 text-white uppercase">Get In Touch</h5>
            <address className="text-neutral-400 not-italic text-sm space-y-2.5 font-medium">
              <p>123 PRIMATE DRIVE<br />JUNGLE CITY, JC 98765</p>
              <p>
                EMAIL: <a href={`mailto:support@${brandName.toLowerCase()}.com`} className={`hover:text-${accentColorClass} transition-colors`}>SUPPORT@{brandName.toUpperCase()}.COM</a>
              </p>
              <p>
                PHONE: <a href="tel:+15551234567" className={`hover:text-${accentColorClass} transition-colors`}>(555) 123-4567</a>
              </p>
            </address>
          </div>
                
                  
        </div>

        {/* Bottom Bar: Copyright & Payment */}
        <div ref={bottomBarRef} className="border-t border-neutral-700 mt-16 pt-10 text-center">
          <div className="flex justify-center items-center space-x-5 mb-1">
            {paymentMethods.map((method, index) => (
              <div 
                key={`${method.name}-${index}`} // <-- CORRECTED KEY
                title={method.name} 
                className="transform transition-transform duration-300 hover:scale-110"
              >
                {method.icon}
              </div>
            ))}
          </div>
          <p className='mb-3  text-center text-neutral-400 text-xs tracking-wider font-medium mt-3'>INDIAN ORIGIN</p>
          <p className="text-neutral-500 text-xs tracking-wider font-medium">
            © {new Date().getFullYear()} {brandName}. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}