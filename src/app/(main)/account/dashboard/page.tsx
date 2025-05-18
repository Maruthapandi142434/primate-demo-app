export const dynamic = 'force-dynamic';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import EditAddressForm from '@/components/account/EditAddressForm';

interface Order {
  id: number;
  totalAmount: number;
  orderDate: Date;
  OrderItems: {
    product: {
      id: number;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}

// Define a type for the minimal user data needed by EditAddressForm
type AddressUser = {
  id: number;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  addressLine2?: string | null;
  createdAt: Date;
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  // Cast the user to the AddressUser type
  const addressUser = user as unknown as AddressUser;

  const recentOrders: Order[] = await prisma.order.findMany({
    where: { userId: user.id },
    take: 3,
    orderBy: { orderDate: 'desc' },
    include: {
      OrderItems: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true
            }
          }
        }
      }
    }
  });

  return (
    <div className="container mx-auto py-8 px-4">
      {/* ... other components ... */}
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Address Information</h3>
          <EditAddressForm user={addressUser} />
        </div>
        {addressUser.address ? (
          <div className="space-y-1">
            <p>{addressUser.address}</p>
            {addressUser.addressLine2 && <p>{addressUser.addressLine2}</p>}
            <p>
              {addressUser.city}, {addressUser.state} {addressUser.postalCode}
            </p>
            <p>{addressUser.country}</p>
            {addressUser.phoneNumber && <p>Phone: {addressUser.phoneNumber}</p>}
          </div>
        ) : (
          <p className="text-gray-500">No address information saved</p>
        )}
      </div>
    </div>
  );
}