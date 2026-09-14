// src/types/cart.types.ts

export interface CartProduct {
    _id: string;
    name: string;
    slug: string;
    price: number;
    discountPrice?: number;
    images: unknown[];       // ⚠️ محتاج Product schema
    category: string;
    subCategory?: string;
    isActive?: boolean;
    isDeleted?: boolean;
  }
  
  export interface CartItem {
    product: CartProduct;
    quantity: number;
    price: number;
    subTotal: number;
    size?: string;
    color?: string;
  }
  
  export interface Cart {
    _id: string;
    user: string;
    items: CartItem[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface EmptyCart {
    items: [];
    totalPrice: 0;
  }
  
  export interface AddToCartPayload {
    productId: string;
    quantity?: number;
    size?: string;
    color?: string;
  }
  
  export interface UpdateCartItemPayload {
    productId: string;
    quantity: number;
    size?: string;
    color?: string;
  }
  
  export interface RemoveFromCartParams {
    productId: string;
    size?: string;
    color?: string;
  }