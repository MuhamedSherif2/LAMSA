import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(200),
  description: z.string().min(2, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  discountPrice: z.number().min(0).optional(),
  stock: z.number().int().min(0, 'Stock must be a valid integer'),
  category: z.string().min(1, 'Please select a category'),
  subCategory: z.string().min(1, 'Please select a subcategory'),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});