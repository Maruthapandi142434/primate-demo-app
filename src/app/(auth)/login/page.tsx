// app/(auth)/login/page.tsx
import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 text-white"> {/* Default text white */}
      {/* Image Side - Left */}
      <div className="relative hidden lg:block animate-slide-in-left h-full">
        <Image
          src="https://images.unsplash.com/photo-1550345332-09e3ac987658?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fitness motivation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent"></div> {/* Darker gradient */}
        <div className="absolute bottom-0 left-0 p-8 xl:p-12">

          <h1 className="text-4xl xl:text-5xl font-bebas mb-4 leading-tight filter drop-shadow-lg animate-fade-in-up animation-delay-300">
            UNLOCK YOUR <span className="text-red-600">POTENTIAL</span>.
          </h1>
          <p className="text-lg xl:text-xl text-gray-300 filter drop-shadow animate-fade-in-up animation-delay-500">
            Track progress, crush goals. Your journey starts now.
          </p>
        </div>
      </div>

      {/* Form Side - Right (Black Theme) */}
      <div
        className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16
                   bg-black  // <--- CHANGED HERE
                   lg:animate-slide-in-right h-full w-full relative overflow-hidden"
      >
        <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="text-3xl font-bold text-primary hover:text-primary-dark filter drop-shadow-md">
                PRIMATE
            </Link>
        </div>

        <div className="w-full max-w-md xl:max-w-lg z-10">
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-400 text-lg">Loading Form...</p>
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>

        {/* Animated decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-primary/10 rounded-full filter blur-2xl animate-pulse animation-delay-1000 opacity-50 lg:opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-secondary/10 rounded-full filter blur-2xl animate-pulse animation-delay-1500 opacity-40 lg:opacity-60"></div>
        <div className="absolute top-1/4 right-10 w-16 h-16 bg-accent/5 rounded-lg transform rotate-45 filter blur-xl animate-spin-slow opacity-30 lg:opacity-50"></div>
      </div>
    </div>
  );
}