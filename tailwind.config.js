// tailwind.config.ts
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1400px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...(defaultTheme.fontFamily.sans || [])],
        bebas: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        montserrat_nav: ['var(--font-montserrat-nav)', 'Arial', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'special-offer': '#80142B',
        'special-offer-foreground': '#FFFFFF',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        full: '9999px',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInLeft: { '0%': { opacity: '0', transform: 'translateX(-30%)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(30%)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        'spin-slow': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        'ping-custom': { '75%, 100%': { transform: 'scale(1.5)', opacity: '0' } },
        'tag-shake': {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0) rotate(-1deg)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0) rotate(2deg)' },
          '30%, 50%, 70%': { transform: 'translate3d(-3px, 0, 0) rotate(-3deg)' },
          '40%, 60%': { transform: 'translate3d(3px, 0, 0) rotate(3deg)' }
        }
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'spin-slow': 'spin-slow 10s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping-custom 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'tag-shake': 'tag-shake 0.82s cubic-bezier(.36,.07,.19,.97) both infinite',
      },
      boxShadow: {
        'input-focus': '0 0 0 3px hsla(var(--primary), 0.3)',
        'card-hover': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    function ({ addUtilities, theme, e }) { // 'e' is Tailwind's escape function for class names
      const delays = {
        '0': '0ms', '100': '100ms', '200': '200ms', '300': '300ms',
        '500': '500ms', '700': '700ms', '1000': '1000ms',
        '1200': '1200ms', '1500': '1500ms',
      };
      const utilities = Object.entries(delays).map(([key, value]) => ({
        // Corrected line:
        [`.animation-delay-${e(key)}`]: { 'animation-delay': value },
      }));
      addUtilities(utilities, ['responsive', 'hover']); // Optionally add variants
    },
  ],
};

export default config;