export interface ProductImage {
  public_id: string;
  secure_url: string;
}

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
  discountPrice: number;
  stock: number;
  images: ProductImage[];
  category: PopulatedRef | string;
  subCategory: PopulatedRef | string;
  averageRating: number;
  numReviews: number;
  isFeatured: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: string;             
  subCategory: string;         
  isFeatured?: boolean;
  isActive?: boolean;         
  images?: File[];
}