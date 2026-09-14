// src/types/coupon.types.ts

export interface Coupon {
    _id: string;
    code: string;
    discountPercentage: number;   // 1..100
    expireDate: string;           // ISO date
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateCouponPayload {
    code: string;
    discountPercentage: number;
    expireDate: string;
  }
  
  export interface UpdateCouponPayload {
    code?: string;
    discountPercentage?: number;
    expireDate?: string;
    isActive?: boolean | string;
  }
  
  /** body الـ POST /coupons/apply */
  export interface ApplyCouponPayload {
    code: string;
    subtotal: number;
  }
  
  /** data الراجعة من applyCoupon */
  export interface ApplyCouponResult {
    coupon: {
      id: string;
      code: string;
      discountPercentage: number;
    };
    subtotal: number;
    discountAmount: number;
    totalAfterDiscount: number;
  }