// src/services/api.ts
import axios, { type AxiosError } from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';
import type { ApiResponse } from '@/types/api.types';

export const TOKEN_KEY = 'lamsa_token';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

/* ---------- Request interceptor ---------- */
api.interceptors.request.use((config) => {
  const token = getCookie(TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ---------- Response interceptor ---------- */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse>) => {
    if (error.response?.status === 401) {
      deleteCookie(TOKEN_KEY);
      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.startsWith('/login')
      ) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default api;