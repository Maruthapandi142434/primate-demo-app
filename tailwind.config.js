// tailwind.config.ts
import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config: Config = {
  darkMode: ["class"], // Standard for shadcn/ui if you plan to use dark mode
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/**/*.{js,ts,jsx,tsx,mdx}', // This is redundant if covered by the above
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // If you still have a pages directory
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: { // It's good to define these for consistency if you use .container
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px', // Often useful for larger designs
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans], // Correctly uses --font-inter
        bebas: ['var(--font-bebas)', 'sans-serif'], // Correctly uses --font-bebas
        montserrat_nav: ['var(--font-montserrat-nav)', 'sans-serif'], // Correctly uses --font-montserrat-nav
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))', // For body background
        foreground: 'hsl(var(--foreground))', // For body text
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: { // Common for shadcn/ui
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    // require('@tailwindcss/typography'), // Only if you need it
  ],
};

export default config;