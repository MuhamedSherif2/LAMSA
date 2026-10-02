// src/services/product.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type { Product, ProductFormData } from '../types/product.types';

export const productService = {
  getAllProducts: async (): Promise<ApiResponseWithCount<Product[]>> => {
    const res = await api.get<ApiResponseWithCount<Product[]>>('products');
    return res.data;
  },

  getProductBySlug: async (slug: string): Promise<ApiResponse<Product>> => {
    const res = await api.get<ApiResponse<Product>>(`products/slug/${slug}`);
    return res.data;
  },

  getProductById: async (id: string): Promise<ApiResponse<Product>> => {
    const res = await api.get<ApiResponse<Product>>(`products/${id}`);
    return res.data;
  },

  createProduct: async (data: ProductFormData): Promise<ApiResponse<Product>> => {
    const form = new FormData();

    form.append('name', data.name);
    form.append('description', data.description);
    form.append('price', String(data.price));
    form.append('stock', String(data.stock));
    if (data.discountPrice !== undefined) {
      form.append('discountPrice', String(data.discountPrice));
    }
    form.append('category', data.category);
    form.append('subCategory', data.subCategory);
    if (data.isFeatured !== undefined) {
      form.append('isFeatured', String(data.isFeatured));
    }
    data.images?.forEach((file) => form.append('images', file));

    const res = await api.post<ApiResponse<Product>>('products', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  updateProduct: async (
    id: string,
    data: Partial<ProductFormData>,
  ): Promise<ApiResponse<Product>> => {
    const form = new FormData();

    if (data.name !== undefined) form.append('name', data.name);
    if (data.description !== undefined) form.append('description', data.description);
    if (data.price !== undefined) form.append('price', String(data.price));
    if (data.discountPrice !== undefined) form.append('discountPrice', String(data.discountPrice));
    if (data.category !== undefined) form.append('category', data.category);
    if (data.subCategory !== undefined) form.append('subCategory', data.subCategory);
    if (data.isFeatured !== undefined) form.append('isFeatured', String(data.isFeatured));
    if (data.isActive !== undefined) form.append('isActive', String(data.isActive));
    data.images?.forEach((file) => form.append('images', file));

    const res = await api.put<ApiResponse<Product>>(`products/${id}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  deleteProduct: async (id: string): Promise<ApiResponse> => {
    const res = await api.delete<ApiResponse>(`products/${id}`);
    return res.data;
  },
};