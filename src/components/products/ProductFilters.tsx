// src/components/products/ProductFilters.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category {
  id: number;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
  showCategoryFilter?: boolean;
}

export default function ProductFilters({ 
  categories, 
  showCategoryFilter = true 
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {showCategoryFilter && (
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={searchParams.get('category') || 'all'}
            onValueChange={(value) => handleFilterChange('category', value)}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min price"
            value={searchParams.get('minPrice') || ''}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            min="0"
          />
          <Input
            type="number"
            placeholder="Max price"
            value={searchParams.get('maxPrice') || ''}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            min="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort">Sort By</Label>
        <Select
          value={searchParams.get('sort') || 'default'}
          onValueChange={(value) => handleFilterChange('sort', value)}
        >
          <SelectTrigger id="sort" className="w-full">
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
  );
}