// src/types/store.types.ts

export interface Store {
    _id: string;
    name: string;
    logo: string;              // URL مباشر
    phoneNumber: string;
    email: string;
    address: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    shippingPolicy: string;
    returnPolicy: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateStorePayload {
    name: string;
    logo: string;
    phoneNumber: string;
    email: string;
    address: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    shippingPolicy: string;
    returnPolicy: string;
  }
  
  export type UpdateStorePayload = Partial<CreateStorePayload>;