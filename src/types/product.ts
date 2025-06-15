export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  quantity?: number; // ✅ Made optional
  imageUrl?: string | null; // ✅ Already optional
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
