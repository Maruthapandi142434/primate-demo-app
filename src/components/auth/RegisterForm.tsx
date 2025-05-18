'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Updated FormField Helper Component
interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id, name, label, type = 'text', value, onChange, required, minLength, placeholder, className, autoComplete
}) => (
  <div className={className}> {/* Removed relative group as floating label is gone */}
    <label
      htmlFor={id}
      className="block text-xs font-medium text-gray-300 mb-1.5" // Label above
    >
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-black border border-gray-700 
                 rounded-lg text-white placeholder-gray-500 text-sm
                 focus:ring-2 focus:ring-primary focus:border-primary 
                 transition-all duration-300 ease-in-out"
      required={required}
      minLength={minLength}
      placeholder={placeholder || `Enter ${label.toLowerCase().replace(' *', '')}`}
      autoComplete={autoComplete || name}
    />
  </div>
);


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '',
    phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      router.push(searchParams.get('redirect') || '/login?registration_success=true');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full animate-fade-in-up animation-delay-700">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bebas tracking-wider text-white mb-2 filter drop-shadow-md">
          CREATE YOUR ACCOUNT
        </h2>
        <p className="text-gray-400 text-sm">
          Join our fitness community and start your journey.
        </p>
      </div>

      {error && (
        <div
          className="bg-destructive/20 border border-destructive/50 text-destructive-foreground p-3 mb-6 rounded-md text-xs"
          role="alert"
        >
          <p className="font-semibold">Registration Error!</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField id="firstName" name="firstName" label="First Name *" value={formData.firstName} onChange={handleChange} required autoComplete="given-name" />
          <FormField id="lastName" name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} autoComplete="family-name" />
        </div>

        <FormField id="email" name="email" label="Email *" type="email" value={formData.email} onChange={handleChange} required autoComplete="email" />
        <FormField id="password" name="password" label="Password *" type="password" value={formData.password} onChange={handleChange} required minLength={6} placeholder="Minimum 6 characters" autoComplete="new-password" />

        <div className="pt-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-300 mb-4 border-b border-gray-700 pb-2">
            Address Information <span className="text-xs text-gray-500">(Optional for Shipping)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField id="phoneNumber" name="phoneNumber" label="Phone Number" type="tel" value={formData.phoneNumber} onChange={handleChange} autoComplete="tel" />
            <FormField id="address" name="address" label="Street Address" value={formData.address} onChange={handleChange} autoComplete="street-address" />
            <FormField id="city" name="city" label="City" value={formData.city} onChange={handleChange} autoComplete="address-level2" />
            <FormField id="state" name="state" label="State/Province" value={formData.state} onChange={handleChange} autoComplete="address-level1" />
            <FormField id="country" name="country" label="Country" value={formData.country} onChange={handleChange} autoComplete="country-name" />
            <FormField id="postalCode" name="postalCode" label="Postal Code" value={formData.postalCode} onChange={handleChange} autoComplete="postal-code" />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-6 bg-primary text-primary-foreground py-3.5 px-4 rounded-lg font-semibold 
                     hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
                     focus:ring-offset-gray-900 transition-all duration-200 ease-in-out group transform hover:scale-105 active:scale-100
                     disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            'REGISTER NOW'
          )}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-400">Already a member? </span>
        <Link
          href={`/login${searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : ''}`}
          className="font-semibold text-white hover:text-white transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}