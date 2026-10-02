"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import UiInputCategory from "@/features/category/UiInputCategory";
import { categoryService } from "@/services/category.service";
import { subCategoryService } from "@/services/subcategory.service";
import type { Category } from "@/types/category.types";
import type {
  CreateSubCategoryPayload,
  SubCategory,
} from "@/types/subcategory.types";

interface IProps {
  subCategory?: SubCategory;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function SubCategoryForm({ subCategory, onSuccess, onCancel }: IProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateSubCategoryPayload>({
    defaultValues: { name: "", category: "" },
  });

  /* ---------- Fetch Categories ---------- */
  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAllCategories();
        if (!cancelled) setCategories(res.data ?? []);
      } catch (error) {
        console.error("❌ Failed to load categories:", error);
      } finally {
        if (!cancelled) setLoadingCategories(false);
      }
    };

    fetchCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------- Sync form with subCategory prop ---------- */
  useEffect(() => {
    if (subCategory) {
      const categoryId =
        typeof subCategory.category === "object" && subCategory.category
          ? subCategory.category._id
          : (subCategory.category as string) ?? "";

      reset({ name: subCategory.name, category: categoryId });
    } else {
      reset({ name: "", category: "" });
    }
  }, [subCategory, reset]);

  /* ---------- Submit ---------- */
  const onSubmit = async (data: CreateSubCategoryPayload) => {
    try {
      if (subCategory) {
        await subCategoryService.updateSubCategory(subCategory._id, data);
      } else {
        await subCategoryService.createSubCategory(data);
      }
      onSuccess?.();
      if (!subCategory) reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <UiInputCategory
        label="Sub Category Name"
        placeholder="Enter sub category name"
        type="text"
        error={errors.name}
        {...register("name", { required: "Sub category name is required" })}
      />

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <select
          id="category"
          disabled={loadingCategories}
          {...register("category", { required: "Category is required" })}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">
            {loadingCategories ? "Loading..." : "Select a category"}
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-xs text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting
            ? subCategory
              ? "Updating..."
              : "Adding..."
            : subCategory
              ? "Update Sub Category"
              : "Add Sub Category"}
        </Button>

        {subCategory && onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default SubCategoryForm;