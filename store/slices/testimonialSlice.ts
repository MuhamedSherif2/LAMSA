import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import type {ApiResponse,ApiResponseWithCount,} from "@/types/api.types";
import type {Testimonial,CreateTestimonialPayload,UpdateTestimonialStatusPayload,} from "@/types/testimonial.types";

export const TestimonialsSlice = createApi({
  reducerPath: "Testimonials",
  baseQuery,
  tagTypes: ["Testimonials"],

  endpoints: (builder) => ({
    // ---------- Public ----------

    // Get all public testimonials
    getAllTestimonials: builder.query<ApiResponseWithCount<Testimonial[]>, void>({
      query: () => "testimonials",
      providesTags: ["Testimonials"]
    }),

    // Create testimonial
    createTestimonial: builder.mutation<ApiResponse<Testimonial>, CreateTestimonialPayload>({
      query: (data) => ({
        url: "testimonials",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Testimonials"]
    }),
    
    // ---------- Admin ----------
    
    // Get all testimonials for admin
    getAdminTestimonials: builder.query<ApiResponseWithCount<Testimonial[]>, void>({
      query: () => "testimonials/admin/all",
      providesTags: ["Testimonials"]
    }),
    
    // Update testimonial visibility
    updateTestimonialStatus: builder.mutation<ApiResponse<Testimonial>, { id: string; data: UpdateTestimonialStatusPayload }>({
      query: ({ id, data }) => ({
        url: `testimonials/${id}/status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Testimonials"]
    }),

    // Delete testimonial
    deleteTestimonial: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `testimonials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonials"]
    }),
  }),
});

export const {
  useGetAllTestimonialsQuery,
  useCreateTestimonialMutation,
  useGetAdminTestimonialsQuery,
  useUpdateTestimonialStatusMutation,
  useDeleteTestimonialMutation,
} = TestimonialsSlice;