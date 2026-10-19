import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import type { ApiResponse, ApiResponseWithCount, } from "@/types/api.types";
import type { Coupon, CreateCouponPayload, UpdateCouponPayload, ApplyCouponPayload, ApplyCouponResult, } from "@/types/coupon.types";

export const CouponSlice = createApi({
  reducerPath: "Coupon",
  baseQuery,
  tagTypes: ["Coupons"],

  endpoints: (builder) => ({
    // Apply coupon
    applyCoupon: builder.mutation<ApiResponse<ApplyCouponResult>, ApplyCouponPayload>({
      query: (data) => ({
        url: "coupons/apply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupons"]
    }),
    
    // ---------- Admin ----------
    
    // Get all coupons
    getAllCoupons: builder.query<ApiResponseWithCount<Coupon[]>, void>({
      query: () => "coupons",
      providesTags: ["Coupons"]
    }),
    
    // Get coupon by ID
    getCouponById: builder.query<ApiResponse<Coupon>, string>({
      query: (id) => `coupons/${id}`,
      providesTags: ["Coupons"]
    }),
    
    // Create coupon
    createCoupon: builder.mutation<ApiResponse<Coupon>, CreateCouponPayload>({
      query: (data) => ({
        url: "coupons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupons"]
    }),
    
    // Update coupon
    updateCoupon: builder.mutation<ApiResponse<Coupon>, { id: string; data: UpdateCouponPayload }>({
      query: ({ id, data }) => ({
        url: `coupons/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Coupons"]
    }),
    
    // Delete coupon
    deleteCoupon: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"]
    }),
  }),
});

export const {
  useApplyCouponMutation,
  useGetAllCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = CouponSlice;