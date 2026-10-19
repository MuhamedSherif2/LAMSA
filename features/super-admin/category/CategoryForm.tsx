"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import UiInputCategory from "./UiInputCategory";
import { Button } from "@/components/ui/button";

import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/slices/categorySlice";

import type { Category, CategoryFormData } from "@/types/category.types";

interface IProps {
  category?: Category;
  onSuccess?: () => void;
}

function CategoryForm({ category, onSuccess }: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: category?.name ?? "",
    },
  });

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    reset({
      name: category?.name ?? "",
    });
  }, [category, reset]);

  const onSubmit = async (formValues: CategoryFormData) => {
    try {
      if (category) {
        await updateCategory({
          id: category._id,
          data: formValues,
        }).unwrap();
      } else {
        await createCategory(formValues).unwrap();
        reset();
      }
  
      onSuccess?.();
    } catch (error) {
      console.error("Category form error:", error);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <UiInputCategory
        label="Category Name"
        placeholder="Enter category name"
        type="text"
        error={errors.name}
        {...register("name", {
          required: "Category name is required",
        })}
      />

      <UiInputCategory
        label="Category Image"
        type="file"
        error={errors.image}
        {...register("image")}
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading
          ? category
            ? "Updating..."
            : "Adding..."
          : category
            ? "Update Category"
            : "Add Category"}
      </Button>
    </form>
  );
}

export default CategoryForm;