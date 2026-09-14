// src/services/category.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type { Category, CategoryFormData } from '../types/category.types';

export const categoryService = {
  getAllCategories: async (): Promise<ApiResponseWithCount<Category[]>> => {
    const res = await api.get<ApiResponseWithCount<Category[]>>('categories');
    return res.data;
  },

  getCategoryBySlug: async (slug: string): Promise<ApiResponse<Category>> => {
    const res = await api.get<ApiResponse<Category>>(`categories/${slug}`);
    return res.data;
  },

  createCategory: async (data: CategoryFormData): Promise<ApiResponse<Category>> => {
    const form = new FormData();
    form.append('name', data.name);
    if (data.image) form.append('image', data.image);

    const res = await api.post<ApiResponse<Category>>('categories', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  updateCategory: async (
    id: string,
    data: CategoryFormData,
  ): Promise<ApiResponse<Category>> => {
    const form = new FormData();
    form.append('name', data.name);
    if (data.image) form.append('image', data.image);

    const res = await api.put<ApiResponse<Category>>(`categories/${id}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  deleteCategory: async (id: string): Promise<ApiResponse> => {
    const res = await api.delete<ApiResponse>(`categories/${id}`);
    return res.data;
  },
};