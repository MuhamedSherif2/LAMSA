// src/services/subcategory.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type {
  SubCategory,
  CreateSubCategoryPayload,
  UpdateSubCategoryPayload,
} from '../types/subcategory.types';

export const subCategoryService = {
  getAllSubCategories: async (): Promise<ApiResponseWithCount<SubCategory[]>> => {
    const res = await api.get<ApiResponseWithCount<SubCategory[]>>('subcategories');
    return res.data;
  },

  getSubCategoryById: async (id: string): Promise<ApiResponse<SubCategory>> => {
    const res = await api.get<ApiResponse<SubCategory>>(`subcategories/${id}`);
    return res.data;
  },

  getSubCategoriesByCategory: async (
    categoryId: string,
  ): Promise<ApiResponseWithCount<SubCategory[]>> => {
    const res = await api.get<ApiResponseWithCount<SubCategory[]>>(
      `subcategories/category/${categoryId}`,
    );
    return res.data;
  },

  createSubCategory: async (
    data: CreateSubCategoryPayload,
  ): Promise<ApiResponse<SubCategory>> => {
    const res = await api.post<ApiResponse<SubCategory>>('subcategories', data);
    return res.data;
  },

  updateSubCategory: async (
    id: string,
    data: UpdateSubCategoryPayload,
  ): Promise<ApiResponse<SubCategory>> => {
    const res = await api.put<ApiResponse<SubCategory>>(`subcategories/${id}`, data);
    return res.data;
  },

  deleteSubCategory: async (id: string): Promise<ApiResponse> => {
    const res = await api.delete<ApiResponse>(`subcategories/${id}`);
    return res.data;
  },
};