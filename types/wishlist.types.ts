// src/types/wishlist.types.ts

import type { ProductImage, PopulatedRef } from './product.types';

/**
 * الـ product اللي راجع populated جوه wishlist.products
 * (نفس الـ select في الباك)
 */
export interface WishlistProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: ProductImage[];
  category: PopulatedRef | string;
  subCategory: PopulatedRef | string;
  averageRating: number;
}

/** الـ wishlist object كامل (بيجي في add / remove) */
export interface Wishlist {
  _id: string;
  user: string;
  products: WishlistProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToWishlistPayload {
  productId: string;
}