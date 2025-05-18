'use client';

import { useEffect, useState } from 'react';

interface OrderStatusProps {
  status: string;
  orderId: number;
}

export default function OrderStatus({ status: initialStatus, orderId }: OrderStatusProps) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    const eventSource = new EventSource(`/api/orders/${orderId}/status`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.status) {
          setStatus(data.status);
        }
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.onerror = () => {
      console.error('SSE connection error');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [orderId]);

  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800'
  };

  const statusClass = statusClasses[status.toLowerCase() as keyof typeof statusClasses] 
    || statusClasses.default;

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusClass}`}>
      {status.toLowerCase()}
    </span>
  );
}