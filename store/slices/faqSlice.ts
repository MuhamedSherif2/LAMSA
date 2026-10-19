import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import type { ApiResponse, ApiResponseWithCount, } from "@/types/api.types";
import type { FAQ, CreateFAQPayload, UpdateFAQPayload, } from "@/types/faq.types";

export const FaqSlice = createApi({
  reducerPath: "FAQ",
  baseQuery,
  tagTypes: ["FAQs"],

  endpoints: (builder) => ({
    // Get all FAQs
    getAllFAQs: builder.query<ApiResponseWithCount<FAQ[]>, void>({
      query: () => "faqs",
      providesTags: ["FAQs"]

    }),

    // Create FAQ
    createFAQ: builder.mutation<ApiResponse<FAQ>, CreateFAQPayload>({
      query: (data) => ({
        url: "faqs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FAQs"]

    }),

    // Update FAQ
    updateFAQ: builder.mutation<ApiResponse<FAQ>, { id: string; data: UpdateFAQPayload }>({
      query: ({ id, data }) => ({
        url: `faqs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FAQs"]

    }),

    // Delete FAQ
    deleteFAQ: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQs"]

    }),
  }),
});

export const {
  useGetAllFAQsQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = FaqSlice;