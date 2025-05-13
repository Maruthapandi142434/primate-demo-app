import { NextRequest } from 'next/server';
import prisma from '@/lib/db';

interface OrderStatusEvent {
  status: string | null;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Await the resolution of dynamic params
  const { id } = await context.params;

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: OrderStatusEvent) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Send initial status
      const order = await prisma.order.findUnique({
        where: { id: Number(id) },
      });

      if (!order) {
        controller.close();
        return;
      }

      sendEvent({ status: order.status });

      // Poll for updates
      const interval = setInterval(async () => {
        const updatedOrder = await prisma.order.findUnique({
          where: { id: Number(id) },
        });
        
        if (updatedOrder) {
          sendEvent({ status: updatedOrder.status });
        }
      }, 5000);

      // Clean up on client disconnect
      request.signal.onabort = () => {
        clearInterval(interval);
        controller.close();
      };
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}