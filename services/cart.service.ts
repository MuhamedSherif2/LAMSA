// src/services/cart.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type {
  Cart,
  EmptyCart,
  AddToCartPayload,
  UpdateCartItemPayload,
  RemoveFromCartParams,
} from '../types/cart.types';

export const cartService = {
  getCart: async (): Promise<ApiResponseWithCount<Cart | EmptyCart>> => {
    const res = await api.get<ApiResponseWithCount<Cart | EmptyCart>>('cart');
    return res.data;
  },

  addToCart: async (data: AddToCartPayload): Promise<ApiResponse<Cart>> => {
    const res = await api.post<ApiResponse<Cart>>('cart', data);
    return res.data;
  },

  updateCartItem: async (data: UpdateCartItemPayload): Promise<ApiResponse<Cart>> => {
    const res = await api.put<ApiResponse<Cart>>('cart', data);
    return res.data;
  },

  removeFromCart: async ({
    productId,
    size,
    color,
  }: RemoveFromCartParams): Promise<ApiResponse<Cart>> => {
    const res = await api.delete<ApiResponse<Cart>>(`cart/item/${productId}`, {
      params: { size, color },
    });
    return res.data;
  },

  clearCart: async (): Promise<ApiResponse<EmptyCart>> => {
    const res = await api.delete<ApiResponse<EmptyCart>>('cart');
    return res.data;
  },
};