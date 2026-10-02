// src/types/category.types.ts

export interface ImageAsset {
  public_id: string;
  secure_url: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: ImageAsset;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormData {
  name: string;
  image?: FileList;
}