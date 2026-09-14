// src/services/order.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type {
  Order,
  CreateOrderPayload,
  UpdateOrderStatusPayload,
} from '../types/order.types';

export const orderService = {
  createOrder: async (data: CreateOrderPayload): Promise<ApiResponse<Order>> => {
    const res = await api.post<ApiResponse<Order>>('orders', data);
    return res.data;
  },

  getMyOrders: async (): Promise<ApiResponseWithCount<Order[]>> => {
    const res = await api.get<ApiResponseWithCount<Order[]>>('orders/my-orders');
    return res.data;
  },

  getOrderById: async (id: string): Promise<ApiResponse<Order>> => {
    const res = await api.get<ApiResponse<Order>>(`orders/${id}`);
    return res.data;
  },

  cancelOrder: async (id: string): Promise<ApiResponse<Order>> => {
    const res = await api.put<ApiResponse<Order>>(`orders/${id}/cancel`);
    return res.data;
  },

  getAllOrders: async (): Promise<ApiResponseWithCount<Order[]>> => {
    const res = await api.get<ApiResponseWithCount<Order[]>>('orders');
    return res.data;
  },

  updateOrderStatus: async (
    id: string,
    data: UpdateOrderStatusPayload,
  ): Promise<ApiResponse<Order>> => {
    const res = await api.put<ApiResponse<Order>>(`orders/${id}/status`, data);
    return res.data;
  },
};