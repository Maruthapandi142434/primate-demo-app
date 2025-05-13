// @/types/order.ts
export type OrderStatusType = 'pending' | 'processing' | 'completed' | 'cancelled' | string;

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string | null;
    description?: string | null;
  };
}

export interface Order {
  id: number;
  totalAmount: number;
  orderDate: string;
  status: OrderStatusType;
  paymentStatus: string;
  OrderItems: OrderItem[];
}