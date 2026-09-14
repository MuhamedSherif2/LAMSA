// src/services/banner.service.ts
import api from './api';
import type { ApiResponse, ApiResponseWithCount } from '../types/api.types';
import type { Banner, BannerFormData } from '../types/banner.types';

export const bannerService = {
    getAllBanners: async (): Promise<ApiResponseWithCount<Banner[]>> => {
        const res = await api.get<ApiResponseWithCount<Banner[]>>('banners');
        return res.data;
    },

    createBanner: async (data: BannerFormData): Promise<ApiResponse<Banner>> => {
        const form = new FormData();
        form.append('title', data.title);
        form.append('link', data.link);
        if (data.image) form.append('image', data.image);

        const res = await api.post<ApiResponse<Banner>>('banners', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    },

    updateBanner: async (
        id: string,
        data: Partial<BannerFormData>,
    ): Promise<ApiResponse<Banner>> => {
        const form = new FormData();
        if (data.title !== undefined) form.append('title', data.title);
        if (data.link !== undefined) form.append('link', data.link);
        if (data.image) form.append('image', data.image);

        const res = await api.put<ApiResponse<Banner>>(`banners/${id}`, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    },

    deleteBanner: async (id: string): Promise<ApiResponse> => {
        const res = await api.delete<ApiResponse>(`banners/${id}`);
        return res.data;
    },
};