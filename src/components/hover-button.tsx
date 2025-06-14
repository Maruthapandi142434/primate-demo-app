"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export function HoverBorderGradientDemo() {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const iconRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const icon = iconRef.current;
    if (!btn || !icon) return;

    const enter = () => {
      gsap.to(btn, {
        backgroundColor: "#000000", // Black BG on Hover
        color: "#FFFFFF",          // White Text on Hover (for contrast)
        scale: 1.08,
       boxShadow: "0 0 12px #00a19c, 0 0 25px #80142b", // Pink Glow
        border: "2px solid #00a19c", // Pink Border
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(icon, {
        rotateZ: 15,
        scale: 1.2,
        stroke: "#00a19c", // Pink Stroke for Icon on Hover
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const leave = () => {
      gsap.to(btn, {
        backgroundColor: "#000000", // Black Default BG
        color: "#FFFFFF",        // White Default Text
        scale: 1,
        boxShadow: "0 0 0px transparent",
        border: "2px solid #FFFFFF", // White Border
        duration: 0.4,
        ease: "power3.inOut",
      });
      gsap.to(icon, {
        rotateZ: 0,
        scale: 1,
        stroke: "#FFFFFF", // White Stroke Default
        duration: 0.4,
        ease: "power3.inOut",
      });
    };

    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);

    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="m-10 flex justify-center text-center">
      <button
        ref={btnRef}
        className="flex items-center space-x-2 rounded-full px-6 py-3 font-semibold cursor-pointer select-none"
        style={{
          backgroundColor: "#000000", // Black Default BG
          color: "#FFFFFF",          // White Default Text
          boxShadow: "none",
          border: "2px solid #FFFFFF", // White Default Border
        }}
      >
        <ClothingIcon ref={iconRef} />
        <span>Unleasher</span>
      </button>
    </div>
  );
}

const ClothingIcon = React.forwardRef<SVGSVGElement, {}>((props, ref) => (
  <svg
    ref={ref}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#FFFFFF"       // default stroke color white
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-colors duration-300"
    {...props}
  >
    <path d="M6 2L3 7V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V7L18 2H6Z" fill="#FFFFFF" fillOpacity={0.15} />
    <path d="M9 10L12 13L15 10" />
  </svg>
));
ClothingIcon.displayName = "ClothingIcon";