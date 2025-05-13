export const dynamic = 'force-dynamic';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';

// 1. Define the Order interface
interface Order {
  id: number;
  orderDate: Date;
  status: string;
  totalAmount: number;
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  // 2. Fetch orders with explicit typing
  const recentOrders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { orderDate: 'desc' },
    take: 5,
    select: {
      id: true,
      orderDate: true,
      status: true,
      totalAmount: true
    }
  }) as Order[]; // Explicit cast to Order[]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user.firstName || 'Customer'}</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <ul className="space-y-2">
            {/* 3. Explicitly type the map callback parameter */}
            {recentOrders.map((order: Order) => (
              <li key={order.id}>
                <Link
                  href={`/account/orders/${order.id}`}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <span className="font-medium">Order #{order.id}</span>
                    <span className="text-gray-500 text-sm block">
                      {order.orderDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
                    <span className={`block text-sm capitalize ${
                      order.status === 'delivered' ? 'text-green-600' : 
                      order.status === 'cancelled' ? 'text-red-600' : 
                      'text-blue-600'
                    }`}>
                      {order.status.toLowerCase()}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border rounded-lg p-6 text-center">
            <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
            <Link 
              href="/products" 
              className="mt-4 inline-block text-primary hover:underline"
            >
              Browse Products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}