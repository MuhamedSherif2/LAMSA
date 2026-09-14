// src/services/contact.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type {
  ContactMessage,
  CreateContactPayload,
} from '../types/contact.types';

export const contactService = {
  createMessage: async (
    data: CreateContactPayload,
  ): Promise<ApiResponse<ContactMessage>> => {
    const res = await api.post<ApiResponse<ContactMessage>>('contact', data);
    return res.data;
  },

  getAllMessages: async (): Promise<ApiResponseWithCount<ContactMessage[]>> => {
    const res = await api.get<ApiResponseWithCount<ContactMessage[]>>('contact');
    return res.data;
  },

  getMessageById: async (id: string): Promise<ApiResponse<ContactMessage>> => {
    const res = await api.get<ApiResponse<ContactMessage>>(`contact/${id}`);
    return res.data;
  },

  markAsRead: async (id: string): Promise<ApiResponse<ContactMessage>> => {
    const res = await api.put<ApiResponse<ContactMessage>>(`contact/${id}/read`);
    return res.data;
  },

  deleteMessage: async (id: string): Promise<ApiResponse> => {
    const res = await api.delete<ApiResponse>(`contact/${id}`);
    return res.data;
  },
};