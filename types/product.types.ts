// src/types/product.types.ts

/** الـ ImageSchema المشترك */
export interface ProductImage {
    public_id: string;
    secure_url: string;
  }
  
  /** category / subCategory بعد populate */
  export interface PopulatedRef {
    _id: string;
    name: string;
    slug: string;
  }
  
  export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    discountPrice: number;        // 0 = مفيش خصم
    images: ProductImage[];
    category: PopulatedRef | string;
    subCategory: PopulatedRef | string;
    averageRating: number;        // 0..5
    numReviews: number;
    isFeatured: boolean;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  /** create + update بيستخدموا FormData */
  export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    category: string;             // ObjectId
    subCategory: string;          // ObjectId
    isFeatured?: boolean;
    isActive?: boolean;           // update only
    images?: File[];              // مطلوب في create، اختياري في update
  }