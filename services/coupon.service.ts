// src/services/coupon.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type {
  Coupon,
  CreateCouponPayload,
  UpdateCouponPayload,
  ApplyCouponPayload,
  ApplyCouponResult,
} from '../types/coupon.types';

export const couponService = {
  /* ---------- User ---------- */
  applyCoupon: async (
    data: ApplyCouponPayload,
  ): Promise<ApiResponse<ApplyCouponResult>> => {
    const res = await api.post<ApiResponse<ApplyCouponResult>>('coupons/apply', data);
    return res.data;
  },

  /* ---------- Admin ---------- */
  getAllCoupons: async (): Promise<ApiResponseWithCount<Coupon[]>> => {
    const res = await api.get<ApiResponseWithCount<Coupon[]>>('coupons');
    return res.data;
  },

  getCouponById: async (id: string): Promise<ApiResponse<Coupon>> => {
    const res = await api.get<ApiResponse<Coupon>>(`coupons/${id}`);
    return res.data;
  },

  createCoupon: async (
    data: CreateCouponPayload,
  ): Promise<ApiResponse<Coupon>> => {
    const res = await api.post<ApiResponse<Coupon>>('coupons', data);
    return res.data;
  },

  updateCoupon: async (
    id: string,
    data: UpdateCouponPayload,
  ): Promise<ApiResponse<Coupon>> => {
    const res = await api.put<ApiResponse<Coupon>>(`coupons/${id}`, data);
    return res.data;
  },

  deleteCoupon: async (id: string): Promise<ApiResponse> => {
    const res = await api.delete<ApiResponse>(`coupons/${id}`);
    return res.data;
  },
};