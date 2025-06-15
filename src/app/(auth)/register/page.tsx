// app/(auth)/register/page.tsx
import RegisterForm from '@/components/auth/RegisterForm';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 text-white"> {/* Default text white */}
      {/* Image Side - Left */}
      <div className="relative hidden lg:block animate-slide-in-left h-full">
        <Image
          src="https://images.unsplash.com/photo-1550345332-09e3ac987658?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fitness registration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 xl:p-12">
          <Link href="/" className="block mb-6 opacity-90 hover:opacity-100 transition-opacity">
            <span className="text-5xl font-bold italic  font-bebas filter drop-shadow-md tracking-wider ">PRIMATE</span>
          </Link>
          <h1 className="text-4xl xl:text-5xl font-bebas mb-4 leading-tight filter drop-shadow-lg animate-fade-in-up animation-delay-300">
            JOIN THE <span className="text-red-600">COMMUNITY</span>
          </h1>
          <p className="text-lg xl:text-xl text-gray-300 filter  drop-shadow animate-fade-in-up animation-delay-500">
            Start your transformation today. Create your account.
          </p>
        </div>
      </div>

      {/* Form Side - Right (Black Theme) */}
      <div
        className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12
                   bg-black // <--- CHANGED HERE
                   lg:animate-slide-in-right h-full w-full relative overflow-hidden"
      >
        {/* RegisterForm container */}
        <div className="w-full max-w-xl xl:max-w-2xl z-10">
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-400 text-lg">Loading Registration Form...</p>
            </div>
          }>
            <RegisterForm />
          </Suspense>
        </div>

        {/* Animated decorative elements */}
        <div className="absolute top-5 right-5 w-28 h-28 md:w-40 md:h-40 bg-secondary/10 rounded-full filter blur-2xl animate-pulse animation-delay-1200 opacity-40 lg:opacity-60"></div>
        <div className="absolute bottom-5 left-5 w-20 h-20 md:w-32 md:h-32 bg-accent/10 rounded-full filter blur-xl animate-spin-slow opacity-30 lg:opacity-50"></div>
      </div>
    </div>
  );
}