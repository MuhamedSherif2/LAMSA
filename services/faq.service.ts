// src/services/faq.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type { FAQ, CreateFAQPayload, UpdateFAQPayload } from '../types/faq.types';

export const faqService = {
  getAllFAQs: async (): Promise<ApiResponseWithCount<FAQ[]>> => {
    const res = await api.get<ApiResponseWithCount<FAQ[]>>('faqs');
    return res.data;
  },

  createFAQ: async (data: CreateFAQPayload): Promise<ApiResponse<FAQ>> => {
    const res = await api.post<ApiResponse<FAQ>>('faqs', data);
    return res.data;
  },

  updateFAQ: async (
    id: string,
    data: UpdateFAQPayload,
  ): Promise<ApiResponse<FAQ>> => {
    const res = await api.put<ApiResponse<FAQ>>(`faqs/${id}`, data);
    return res.data;
  },

  deleteFAQ: async (id: string): Promise<ApiResponse> => {
    const res = await api.delete<ApiResponse>(`faqs/${id}`);
    return res.data;
  },
};