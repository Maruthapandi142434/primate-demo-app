import prisma from '@/lib/db';
import ProductFilters from '@/components/products/ProductFilters';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types/product';

export default async function ProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams
  const searchParams = await props.searchParams;

  // Create safe params object
  const safeParams = {
    category: typeof searchParams.category === 'string' 
      ? searchParams.category 
      : undefined,
    minPrice: typeof searchParams.minPrice === 'string' 
      ? Number(searchParams.minPrice) 
      : undefined,
    maxPrice: typeof searchParams.maxPrice === 'string' 
      ? Number(searchParams.maxPrice) 
      : undefined,
    sort: typeof searchParams.sort === 'string' 
      ? searchParams.sort 
      : undefined,
  };

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        categoryId: safeParams.category && safeParams.category !== 'all' 
          ? Number(safeParams.category) 
          : undefined,
        price: {
          gte: safeParams.minPrice,
          lte: safeParams.maxPrice,
        },
      },
      orderBy: {
        price: safeParams.sort === 'price-asc' 
          ? 'asc' 
          : safeParams.sort === 'price-desc' 
          ? 'desc' 
          : undefined,
      },
      include: { category: true },
    }) as Promise<Product[]>,
    prisma.category.findMany(),
  ]);

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductFilters categories={categories} />
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}