'use client';
import { useEffect, useState } from 'react';
import { subCategoryService } from '@/services/subcategory.service';
import type { SubCategory } from '@/types/subcategory.types';

export function useSubCategory() {
  const [data, setData] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    subCategoryService.getAllSubCategories().then((res) => {
      if (res.success && res.data) setData(res.data);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}