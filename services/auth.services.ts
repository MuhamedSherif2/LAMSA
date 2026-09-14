// src/services/auth.service.ts
import api from './api';
import type { ApiResponse } from '../types/api.types';
import type {
  Register,
  Login,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
  LoginResponse,
} from '../types/auth.types';

export const authService = {
  register: async (data: Register): Promise<ApiResponse> => {
    const res = await api.post<ApiResponse>('auth/register', data);
    return res.data;
  },

  login: async (data: Login): Promise<ApiResponse<LoginResponse>> => {
    const res = await api.post<ApiResponse<LoginResponse>>('auth/login', data);
    return res.data;
  },

  verifyEmail: async (data: VerifyEmail): Promise<ApiResponse> => {
    const res = await api.post<ApiResponse>('auth/verify-email', data);
    return res.data;
  },

  forgotPassword: async (data: ForgotPassword): Promise<ApiResponse> => {
    const res = await api.post<ApiResponse>('auth/forgotPassword', data);
    return res.data;
  },

  resetPassword: async (
    token: string,
    data: ResetPassword,
  ): Promise<ApiResponse> => {
    const res = await api.post<ApiResponse>(
      `auth/resetPassword/${token}`,
      data,
    );
    return res.data;
  },
};