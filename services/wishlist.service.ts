// src/services/wishlist.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type {
  Wishlist,
  WishlistProduct,
  AddToWishlistPayload,
} from '../types/wishlist.types';

export const wishlistService = {
  getWishlist: async (): Promise<ApiResponseWithCount<WishlistProduct[]>> => {
    const res = await api.get<ApiResponseWithCount<WishlistProduct[]>>('wishlist');
    return res.data;
  },

  addToWishlist: async (data: AddToWishlistPayload): Promise<ApiResponse<Wishlist>> => {
    const res = await api.post<ApiResponse<Wishlist>>('wishlist', data);
    return res.data;
  },

  removeFromWishlist: async (productId: string): Promise<ApiResponse<Wishlist>> => {
    const res = await api.delete<ApiResponse<Wishlist>>(`wishlist/${productId}`);
    return res.data;
  },
};