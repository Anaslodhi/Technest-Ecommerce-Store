// Shared TypeScript interfaces for the TechNest e-commerce store

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  image: string;
  description: string;
  shortDescription: string;
  specs: Record<string, string>;
  features: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  badge?: string;
}

export type ProductCategory =
  | "laptops"
  | "phones"
  | "audio"
  | "wearables"
  | "accessories"
  | "tablets"
  | "gaming";

export interface CartItem {
  product: Product;
  quantity: number;
}
