// src/types/banner.types.ts

export interface Banner {
    _id: string;
    title: string;
    image: string;      // Cloudinary URL
    link: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

/** create + update بيستخدموا FormData */
export interface BannerFormData {
    title: string;
    link: string;
    image?: File;       // مطلوب في create، اختياري في update
}