// src/types/banner.types.ts

export interface Banner {
    _id: string;
    title: string;
    image: string;
    link: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface BannerFormData {
    title: string;
    link: string;
    image?: File;
}