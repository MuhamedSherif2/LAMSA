import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import type { ApiResponse, ApiResponseWithCount, } from "../../types/api.types";
import type { Wishlist, WishlistProduct, AddToWishlistPayload, } from "../../types/wishlist.types";

export const WishlistSlice = createApi({
  reducerPath: "Wishlist",
  baseQuery,

  tagTypes: ["Wishlist"],

  endpoints: (builder) => ({
    getWishlist: builder.query<ApiResponseWithCount<Wishlist>, void>({
      query: () => "wishlist",
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation<ApiResponse<Wishlist>, AddToWishlistPayload>({
      query: (data) => ({
        url: "wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation<ApiResponse<Wishlist>, string>({
      query: (productId) => ({
        url: `wishlist/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = WishlistSlice;