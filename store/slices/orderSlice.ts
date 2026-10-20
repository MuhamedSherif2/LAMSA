import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

import type {
  ApiResponse,
  ApiResponseWithCount,
} from "@/types/api.types";

import type {
  Order,
  CreateOrderPayload,
  UpdateOrderStatusPayload,
} from "@/types/order.types";

export const OrderSlice = createApi({
  reducerPath: "Order",
  baseQuery,

  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    // Create order
    createOrder: builder.mutation<ApiResponse<Order>, CreateOrderPayload>({
      query: (data) => ({
        url: "orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    
    // Get current user's orders
    getMyOrders: builder.query<ApiResponse<Order[]>, void>({
      query: () => "orders/my-orders",
      providesTags: ["Orders"],
    }),
    
    // Get order by ID
    getOrderById: builder.query<ApiResponse<Order>, string>({
      query: (id) => `orders/${id}`,
      providesTags: ["Orders"],
    }),

    // Cancel order
    cancelOrder: builder.mutation<ApiResponse<Order>, string>({
      query: (id) => ({
        url: `orders/${id}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),

    // ---------- Admin ----------

    // Get all orders
    getAllOrders: builder.query<ApiResponseWithCount<Order[]>, void>({
      query: () => "orders",
      providesTags: ["Orders"]
    }),

    // Update order status
    updateOrderStatus: builder.mutation<ApiResponse<Order>, { id: string; data: UpdateOrderStatusPayload }>({
      query: ({ id, data }) => ({
        url: `orders/${id}/status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders"]
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = OrderSlice;