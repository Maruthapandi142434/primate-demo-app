'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn, UserPlus } from 'lucide-react'; // Added LogIn and UserPlus

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }
      const redirectPath = searchParams.get('redirect') || data.redirect || '/account';
      router.push(redirectPath);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full animate-fade-in-up animation-delay-700">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bebas tracking-wider text-white mb-2 filter drop-shadow-md">
         LOGIN
        </h2>
        <p className="text-gray-400 text-sm">
          Access your personal fitness dashboard.
        </p>
      </div>

      {error && (
        <div
          className="bg-destructive/20 border border-destructive/50 text-destructive-foreground p-3 mb-6 rounded-md text-xs"
          role="alert"
        >
          <p className="font-semibold">Login Error!</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-300 mb-1.5"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-black border border-gray-700
                       rounded-lg text-white placeholder-gray-500 text-sm
                       focus:ring-2 focus:ring-primary focus:border-primary
                       transition-all duration-300 ease-in-out"
            required
            placeholder="you@example.com"
            disabled={isLoading}
            autoComplete="email"
          />
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-gray-300 mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-black border border-gray-700
                       rounded-lg text-white placeholder-gray-500 text-sm
                       focus:ring-2 focus:ring-primary focus:border-primary
                       transition-all duration-300 ease-in-out"
            required
            placeholder="••••••••"
            disabled={isLoading}
            autoComplete="current-password"
          />
        </div>

        <div className="flex items-center justify-end text-sm -mt-2">
          <Link
            href="/forgot-password"
            className="font-medium text-primary/80 hover:text-primary transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-3.5 px-4 rounded-lg font-semibold
                     hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                     focus:ring-offset-black // Adjusted for black background
                     transition-all duration-200 ease-in-out group transform hover:scale-105 active:scale-100
                     disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center" // Added flex for icon alignment
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> {/* Icon size consistent */}
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-5 w-5" /> {/* Icon size consistent */}
              <span>SIGN IN</span>
            </>
          )}
        </Button>
      </form>

      <div className="mt-10 text-center text-sm">
        <span className="text-gray-400">Not a member yet? </span>
        <Link
          href={`/register${searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : ''}`}
          className="font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center group" // Use primary for link, inline-flex for icon
        >
          <UserPlus className="mr-1.5 h-4 w-4  text-white transition-transform group-hover:scale-110" /> {/* Icon for Create Account */}
          <span className='text-white font-semibold'>Create Account</span>
        </Link>
      </div>
    </div>
  );
}