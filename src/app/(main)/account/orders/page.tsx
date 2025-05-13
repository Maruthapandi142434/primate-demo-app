export const dynamic = 'force-dynamic';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import OrderList from '@/components/orders/OrderList';
import { Order } from '@/types/order';

interface PrismaOrderWithItems {
  id: number;
  totalAmount: number;
  orderDate: Date; // Prisma returns Date objects
  status: string;
  paymentStatus: string;
  OrderItems: {
    id: number;
    quantity: number;
    unitPrice: number;
    product: {
      id: number;
      name: string;
      price: number;
      imageUrl: string | null;
      description: string | null;
    };
  }[];
}

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  // Fetch orders from Prisma with proper typing
  const orders: PrismaOrderWithItems[] = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      OrderItems: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              imageUrl: true,
              description: true,
            },
          },
        },
      },
    },
    orderBy: { orderDate: 'desc' },
  });

  // Transform orders to match the expected Order type
  const transformedOrders: Order[] = orders.map(order => ({
    ...order,
    orderDate: order.orderDate.toISOString(),
    OrderItems: order.OrderItems.map(item => ({
      ...item,
      product: {
        ...item.product,
        imageUrl: item.product.imageUrl || '/images/placeholder-product.jpg'
      }
    }))
  }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <OrderList orders={transformedOrders} />
    </div>
  );
}