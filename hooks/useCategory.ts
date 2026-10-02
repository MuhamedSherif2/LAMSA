'use client';
import { useEffect, useState } from 'react';
import { categoryService } from '@/services/category.service';
import type { Category } from '@/types/category.types';

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getAllCategories().then((res) => {
      if (res.success && res.data) setData(res.data);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}