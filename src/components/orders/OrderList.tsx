import Link from 'next/link';
import Image from 'next/image';
import OrderStatus from './OrderStatus';
import { Order } from '@/types/order';

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No orders found</h3>
        <p className="text-gray-500 mt-2">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold">Order #{order.id}</h3>
              <p className="text-sm text-gray-500">
                {new Date(order.orderDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <OrderStatus status={order.status} orderId={order.id} />
          </div>

          <div className="space-y-4">
            {order.OrderItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 relative rounded-md overflow-hidden">
                  <Image
                    src={item.product.imageUrl || '/images/placeholder-product.jpg'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="font-medium hover:underline line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.quantity} × ₹{item.unitPrice.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₹{(item.quantity * item.unitPrice).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Payment status</p>
              <p className="capitalize">{order.paymentStatus}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-bold text-lg">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}