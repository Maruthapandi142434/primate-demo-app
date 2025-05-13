import { notFound, redirect } from 'next/navigation';
import prisma from '@/lib/db';
import ProductCard from '@/components/products/ProductCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types/product';

export default async function CategoryPage(props: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Explicitly await both params and searchParams
  const { categoryId } = await props.params;
  const searchParams = await props.searchParams;

  // Server action to handle form submission
  async function handleFilter(formData: FormData) {
    'use server';
    
    const minPrice = formData.get('minPrice');
    const maxPrice = formData.get('maxPrice');
    const sort = formData.get('sort');
    const categoryId = formData.get('categoryId');
    
    const params = new URLSearchParams();
    if (minPrice) params.set('minPrice', minPrice.toString());
    if (maxPrice) params.set('maxPrice', maxPrice.toString());
    if (sort && sort !== 'default') params.set('sort', sort.toString());
    
    redirect(`/categories/${categoryId}?${params.toString()}`);
  }

  // Create a function to safely extract search params
  const getSearchParam = (param: string | string[] | undefined): string | undefined => {
    if (!param) return undefined;
    return Array.isArray(param) ? param[0] : param;
  };

  // Parse categoryId from params
  const id = Number(categoryId);
  if (isNaN(id)) return notFound();

  // Get current filter values
  const currentFilters = {
    minPrice: getSearchParam(searchParams.minPrice),
    maxPrice: getSearchParam(searchParams.maxPrice),
    sort: getSearchParam(searchParams.sort),
  };

  // Fetch data
  const [category, products] = await Promise.all([
    prisma.category.findUnique({ where: { id } }),
    prisma.product.findMany({
      where: {
        categoryId: id,
        price: {
          gte: currentFilters.minPrice ? Number(currentFilters.minPrice) : undefined,
          lte: currentFilters.maxPrice ? Number(currentFilters.maxPrice) : undefined,
        },
      },
      orderBy: currentFilters.sort === 'price-asc'
        ? { price: 'asc' }
        : currentFilters.sort === 'price-desc'
        ? { price: 'desc' }
        : undefined,
      include: { 
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
    }),
  ]);

  if (!category) return notFound();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{category.name}</h1>
      
      {/* Filter Form */}
      <form action={handleFilter} className="mb-8 p-4 bg-gray-50 rounded-lg">
        {/* Hidden field for categoryId */}
        <input type="hidden" name="categoryId" value={id} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Range Filter */}
          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min price"
                name="minPrice"
                defaultValue={currentFilters.minPrice || ''}
                min="0"
              />
              <Input
                type="number"
                placeholder="Max price"
                name="maxPrice"
                defaultValue={currentFilters.maxPrice || ''}
                min="0"
              />
            </div>
          </div>

          {/* Sort Filter */}
          <div className="space-y-2">
            <Label htmlFor="sort">Sort By</Label>
            <Select name="sort" defaultValue={currentFilters.sort || 'default'}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <button 
          type="submit" 
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Apply Filters
        </button>
      </form>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product : Product) => (
  <ProductCard 
    key={product.id} 
    product={{
      ...product,
      description: product.description // Just pass the value as-is
    }} 
  />
))}
      </div>
    </div>
  );
}