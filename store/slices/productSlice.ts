import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import type { ApiResponse, ApiResponseWithCount, } from "@/types/api.types";
import type { Product, ProductFormData } from "@/types/product.types";

export const ProductSlice = createApi({
  reducerPath: "Product",
  baseQuery,
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    // Get all products
    getAllProducts: builder.query<ApiResponseWithCount<Product[]>, void>({
      query: () => "products",
      providesTags: ["Products"]
    }),

    // Get product by slug
    getProductBySlug: builder.query<ApiResponse<Product>, string>({
      query: (slug) => `products/slug/${slug}`,
      providesTags: ["Products"]
    }),

    // Get product by ID
    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => `products/${id}`,
      providesTags: ["Products"]
    }),

    // Create product
    createProduct: builder.mutation<ApiResponse<Product>, ProductFormData>({
      query: (data) => {
        const form = new FormData();

        form.append("name", data.name);
        form.append("description", data.description);
        form.append("price", String(data.price));
        form.append("stock", String(data.stock));
        form.append("category", data.category);
        form.append("subCategory", data.subCategory);

        if (data.discountPrice !== undefined) {
          form.append("discountPrice", String(data.discountPrice));
        }

        if (data.isFeatured !== undefined) {
          form.append("isFeatured", String(data.isFeatured));
        }

        if (data.isActive !== undefined) {
          form.append("isActive", String(data.isActive));
        }

        data.images?.forEach((file) => {
          form.append("images", file);
        });

        return {
          url: "products",
          method: "POST",
          body: form,
        };
      },
      invalidatesTags: ["Products"]
    }),

    // Update product
    updateProduct: builder.mutation<ApiResponse<Product>, { id: string; data: Partial<ProductFormData> }>({
      query: ({ id, data }) => {
        const form = new FormData();

        if (data.name !== undefined) {
          form.append("name", data.name);
        }

        if (data.description !== undefined) {
          form.append("description", data.description);
        }

        if (data.price !== undefined) {
          form.append("price", String(data.price));
        }

        if (data.discountPrice !== undefined) {
          form.append("discountPrice", String(data.discountPrice));
        }

        if (data.stock !== undefined) {
          form.append("stock", String(data.stock));
        }

        if (data.category !== undefined) {
          form.append("category", data.category);
        }

        if (data.subCategory !== undefined) {
          form.append("subCategory", data.subCategory);
        }

        if (data.isFeatured !== undefined) {
          form.append("isFeatured", String(data.isFeatured));
        }

        if (data.isActive !== undefined) {
          form.append("isActive", String(data.isActive));
        }

        data.images?.forEach((file) => {
          form.append("images", file);
        });

        return {
          url: `products/${id}`,
          method: "PUT",
          body: form,
        };
      },
      invalidatesTags: ["Products"]
    }),

    // Delete product
    deleteProduct: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"]
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductBySlugQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductSlice;