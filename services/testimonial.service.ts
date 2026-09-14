// src/services/testimonial.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type {
  Testimonial,
  CreateTestimonialPayload,
  UpdateTestimonialStatusPayload,
} from '../types/testimonial.types';

export const testimonialService = {
  /* ---------- Public ---------- */
  getAllTestimonials: async (): Promise<ApiResponseWithCount<Testimonial[]>> => {
    const res = await api.get<ApiResponseWithCount<Testimonial[]>>('testimonials');
    return res.data;
  },

  /* ---------- User (logged in) ---------- */
  createTestimonial: async (
    data: CreateTestimonialPayload,
  ): Promise<ApiResponse<Testimonial>> => {
    const res = await api.post<ApiResponse<Testimonial>>('testimonials', data);
    return res.data;
  },

  /* ---------- Admin ---------- */
  getAdminTestimonials: async (): Promise<ApiResponseWithCount<Testimonial[]>> => {
    const res = await api.get<ApiResponseWithCount<Testimonial[]>>(
      'testimonials/admin/all',
    );
    return res.data;
  },

  updateTestimonialStatus: async (
    id: string,
    data: UpdateTestimonialStatusPayload,
  ): Promise<ApiResponse<Testimonial>> => {
    const res = await api.put<ApiResponse<Testimonial>>(
      `testimonials/${id}/status`,
      data,
    );
    return res.data;
  },

  deleteTestimonial: async (id: string): Promise<ApiResponse> => {
    const res = await api.delete<ApiResponse>(`testimonials/${id}`);
    return res.data;
  },
};