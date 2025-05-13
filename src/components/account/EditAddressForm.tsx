'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/modal';

interface AddressUser {
  id: number;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
}

interface AddressFormData {
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export default function EditAddressForm({ user }: { user: AddressUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const { register, handleSubmit } = useForm<AddressFormData>({
    defaultValues: {
      phoneNumber: user.phoneNumber || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      country: user.country || '',
      postalCode: user.postalCode || '',
    },
  });

  const onSubmit = async (data: AddressFormData) => {
    try {
      const response = await fetch('/api/account/update-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Update failed');
      
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(true)}
      >
        {user.address ? 'Edit' : 'Add'}
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3 className="text-lg font-medium mb-4">Update Address</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Rest of your form fields remain the same */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              {...register('phoneNumber')}
              type="tel"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              {...register('address')}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                {...register('city')}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                {...register('state')}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                {...register('country')}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <input
                {...register('postalCode')}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </Modal>
    </>
  );
}