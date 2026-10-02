// src/types/subcategory.types.ts
import {Category} from './category.types'

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: Category | string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubCategoryPayload {
  name: string;
  category: string;
}

export interface UpdateSubCategoryPayload {
  name: string;
  category: string;
}