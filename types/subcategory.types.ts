// src/types/subcategory.types.ts

import type { PopulatedRef } from './product.types';

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: PopulatedRef | string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubCategoryPayload {
  name: string;
  category: string;   // ObjectId
}

/** update محتاج name + category مع بعض (حسب الباك) */
export interface UpdateSubCategoryPayload {
  name: string;
  category: string;
}