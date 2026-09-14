// src/services/user.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type {
  User,
  UpdatedUser,
  UpdateProfilePayload,
  UpdatePasswordPayload,
} from '../types/user.types';

export const userService = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    const res = await api.get<ApiResponse<User>>('users/profile');
    return res.data;
  },

  updateProfile: async (
    data: UpdateProfilePayload,
  ): Promise<ApiResponse<UpdatedUser>> => {
    const res = await api.put<ApiResponse<UpdatedUser>>('users/profile', data);
    return res.data;
  },

  updatePassword: async (
    data: UpdatePasswordPayload,
  ): Promise<ApiResponse<null>> => {
    const res = await api.put<ApiResponse<null>>('users/password', data);
    return res.data;
  },

  getAllUsers: async (): Promise<ApiResponseWithCount<User[]>> => {
    const res = await api.get<ApiResponseWithCount<User[]>>('users');
    return res.data;
  },

  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const res = await api.get<ApiResponse<User>>(`users/${id}`);
    return res.data;
  },

  deleteUser: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.delete<ApiResponse<null>>(`users/${id}`);
    return res.data;
  },
};