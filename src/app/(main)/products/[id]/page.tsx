import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/products/ProductDetails';
import { Product } from '@/types/product';

// Create a compatible type for the ProductDetails component
type ProductDetailsCompatible = Omit<Product, 'description' | 'imageUrl'> & {
  description?: string;
  imageUrl?: string;
};

async function getProduct(id: number): Promise<Product> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      Reviews: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
    // Ensure all scalar fields including 'quantity' are selected
  });

  if (!product) notFound();
  // Ensure quantity is present in the returned object
  return {
    ...product,
   quantity: 0, // or handle default as needed
  } as Product;
}

export default async function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const productId = Number(id);
  
  if (isNaN(productId)) notFound();
  
  const product = await getProduct(productId);

  // Transform the product to match what ProductDetails expects
  const compatibleProduct: ProductDetailsCompatible = {
    ...product,
    description: product.description ?? undefined,
    imageUrl: product.imageUrl ?? undefined
  };

  return (
    <div className="container mx-auto py-8">
      <ProductDetails product={compatibleProduct} />
    </div>
  );
}