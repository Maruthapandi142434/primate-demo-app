"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { HoverBorderGradient } from "./ui/hover-border";
import { ShoppingBag } from "lucide-react"; // using a minimal icon from lucide-react

export function HoverBorderGradientDemo() {
  const btnRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Button entrance animation
    gsap.fromTo(
      btnRef.current,
      { opacity: 0, y: 40, scale: 0.85 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.3,
      }
    );

    // Floating text pulse
    gsap.to(textRef.current, {
      y: -3,
      repeat: -1,
      yoyo: true,
      duration: 1.4,
      ease: "sine.inOut",
    });

    // Icon subtle rotation on load
    gsap.fromTo(
      iconRef.current,
      { rotateY: 90, opacity: 0 },
      {
        rotateY: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
      }
    );
  }, []);

  return (
    <div className="m-10 flex justify-center text-center">
      <div ref={btnRef}>
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-3 px-6 py-3 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300"
        >
          <div ref={iconRef}>
            <ShoppingBag className="h-6 w-6 text-black dark:text-white" />
          </div>
          <span
            ref={textRef}
            className="font-semibold text-lg tracking-wide uppercase"
          >
            Unleashers
          </span>
        </HoverBorderGradient>
      </div>
    </div>
  );
}
