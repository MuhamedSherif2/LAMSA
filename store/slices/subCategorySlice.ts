import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import type { ApiResponse, ApiResponseWithCount, } from "@/types/api.types";
import type { SubCategory, CreateSubCategoryPayload, UpdateSubCategoryPayload, } from "@/types/subcategory.types";

export const SubCategorySlice = createApi({
  reducerPath: "SubCategory",
  baseQuery,
  tagTypes: ["SubCategories"],

  endpoints: (builder) => ({
    // Get all subcategories
    getAllSubCategories: builder.query<ApiResponseWithCount<SubCategory[]>, void>({
      query: () => "sub-categories",
      providesTags: ["SubCategories"]
    }),

    // Get subcategory by ID
    getSubCategoryById: builder.query<ApiResponse<SubCategory>, string>({
      query: (id) => `sub-categories/${id}`,
      providesTags: ["SubCategories"]
    }),

    // Get subcategories by category ID
    getSubCategoriesByCategory: builder.query<ApiResponseWithCount<SubCategory[]>, string>({
      query: (categoryId) =>`sub-categories/category/${categoryId}`,
      providesTags: ["SubCategories"]
    }),

    // Create subcategory
    createSubCategory: builder.mutation<ApiResponse<SubCategory>, CreateSubCategoryPayload>({
      query: (data) => ({
        url: "sub-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SubCategories"]
    }),

    // Update subcategory
    updateSubCategory: builder.mutation<ApiResponse<SubCategory>, { id: string; data: UpdateSubCategoryPayload }>({
      query: ({ id, data }) => ({
        url: `sub-categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SubCategories"]
    }),

    // Delete subcategory
    deleteSubCategory: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `sub-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategories"]
    }),
  }),
});

export const {
  useGetAllSubCategoriesQuery,
  useGetSubCategoryByIdQuery,
  useGetSubCategoriesByCategoryQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = SubCategorySlice;