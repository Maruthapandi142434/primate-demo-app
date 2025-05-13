'use server';

import prisma from '@/lib/db';

export async function createOrder({
  userId,
  items,
  total,
}: {
  userId: number;
  items: Array<{
    id: number;
    price: number;
    quantity: number;
    name: string;
    imageUrl?: string | null;
  }>;
  total: number;
}) {
  // Create order in database
  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount: total,
      status: 'pending',
      paymentStatus: 'pending',
      OrderItems: {
        create: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
      },
      Payments: {
        create: {
          paymentMethod: 'cash_on_delivery',
          amount: total,
          currency: 'INR',
          status: 'pending',
          transactionId: `cash_${Date.now()}`, // Add required transactionId
        } as const, // Add 'as const' to ensure type inference
      },
    },
  });

  return order;
}