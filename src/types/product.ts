// src/types/product.ts
export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string | null;  // Make optional
  imageUrl?: string | null;     // Make optional
  category?: {
    id: number;
    name: string;
  };
  Reviews?: {
    id: number;
    rating: number;
    comment?: string;
    user: {
      username: string;
    };
  }[];
};