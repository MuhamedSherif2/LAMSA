// src/services/store.service.ts
import api from './api';
import type { ApiResponse } from '../types/api.types';
import type {
  Store,
  CreateStorePayload,
  UpdateStorePayload,
} from '../types/store.types';

export const storeService = {
  getStoreSettings: async (): Promise<ApiResponse<Store>> => {
    const res = await api.get<ApiResponse<Store>>('store');
    return res.data;
  },

  addStoreSettings: async (data: CreateStorePayload): Promise<ApiResponse<Store>> => {
    const res = await api.post<ApiResponse<Store>>('store', data);
    return res.data;
  },

  updateStoreSettings: async (data: UpdateStorePayload): Promise<ApiResponse<Store>> => {
    const res = await api.put<ApiResponse<Store>>('store', data);
    return res.data;
  },
};