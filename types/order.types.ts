// src/types/order.types.ts

export type PaymentMethod = 'CashOnDelivery' | 'CreditCard';

export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  country: string;         // "Egypt"
  governorate: string;     // المحافظة
  city: string;
  area?: string;
  street: string;
  building?: string;
  apartment?: string;
  postalCode?: string;
  notes?: string;
}

export interface OrderProduct {
  _id: string;
  name: string;
  slug: string;
  images: unknown[];       // ⚠️ محتاج Product schema
  price: number;
  discountPrice?: number;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
}

export interface OrderItem {
  product: OrderProduct | string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  couponCode?: string;
}

export interface Order {
  _id: string;
  user: OrderUser | string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  isPaid: boolean;
  paidAt?: string;
  totalPrice: number;
  discountAmount: number;
  finalPrice: number;
  orderStatus: OrderStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  shippingAddress: ShippingAddress;
  paymentMethod?: PaymentMethod;
  couponCode?: string;
}

export interface UpdateOrderStatusPayload {
  orderStatus: OrderStatus;
}