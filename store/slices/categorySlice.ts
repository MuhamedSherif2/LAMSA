import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

import type { ApiResponse, ApiResponseWithCount, } from "@/types/api.types";
import type { Category, CategoryFormData, } from "@/types/category.types";

export const CategorySlice = createApi({
  reducerPath: "Category",
  baseQuery,
  tagTypes: ["Categories"],

  endpoints: (builder) => ({
    // Get all categories
    getAllCategories: builder.query<ApiResponseWithCount<Category[]>, void>({
      query: () => "categories",
      providesTags: ["Categories"]
    }),
    
    // Get category by slug
    getCategoryBySlug: builder.query<ApiResponse<Category>,string>({
      query: (slug) => `categories/${slug}`,
      providesTags: ["Categories"]
    }),
    
    // Create category
    createCategory: builder.mutation<ApiResponse<Category>,CategoryFormData>({
      query: (data) => {
        const form = new FormData();
        
        form.append("name", data.name);
        
        if (data.image?.[0]) {
          form.append("image", data.image[0]);
        }
        
        return {
          url: "categories",
          method: "POST",
          body: form,
        };
      },
      invalidatesTags: ["Categories"]
    }),
    
    // Update category
    updateCategory: builder.mutation<ApiResponse<Category>,{ id: string; data: CategoryFormData }>({
      query: ({ id, data }) => {
        const form = new FormData();
        
        form.append("name", data.name);
        
        if (data.image?.[0]) {
          form.append("image", data.image[0]);
        }
        
        return {
          url: `categories/${id}`,
          method: "PUT",
          body: form,
        };
      },
      invalidatesTags: ["Categories"]
    }),
    
    // Delete category
    deleteCategory: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"]
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryBySlugQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = CategorySlice;