import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

import type { ApiResponse, ApiResponseWithCount, } from "@/types/api.types";
import type { Cart, EmptyCart, AddToCartPayload, UpdateCartItemPayload, RemoveFromCartParams, } from "@/types/cart.types";

export const CartSlice = createApi({
  reducerPath: "Cart",
  baseQuery,
  tagTypes: ["Cart"],

  endpoints: (builder) => ({
    // GET: Get cart
    getCart: builder.query<ApiResponseWithCount<Cart | EmptyCart>, void>({
      query: () => ({
        url: "cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // POST: Add item to cart
    addToCart: builder.mutation<ApiResponse<Cart>, AddToCartPayload>({
      query: (data) => ({
        url: "cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    // PUT: Update cart item
    updateCartItem: builder.mutation<ApiResponse<Cart>, UpdateCartItemPayload>({
      query: (data) => ({
        url: "cart",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    // DELETE: Remove item from cart
    removeFromCart: builder.mutation<ApiResponse<Cart>, RemoveFromCartParams>({
      query: ({ productId, size, color }) => ({
        url: `cart/item/${productId}`,
        method: "DELETE",
        params: { size, color },
      }),
      invalidatesTags: ["Cart"],
    }),

    // DELETE: Clear cart
    clearCart: builder.mutation<ApiResponse<EmptyCart>, void>({
      query: () => ({
        url: "cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = CartSlice;