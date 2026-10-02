"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import UiInputCategory from "./UiInputCategory";

import type { Category, CategoryFormData } from "@/types/category.types";
import { categoryService } from "@/services/category.service";
import { Button } from "@/components/ui/button";

interface IProps {
    category?: Category;
    onSuccess?: () => void;
}

function CategoryForm({ category, onSuccess }: IProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CategoryFormData>({
        defaultValues: {
            name: category?.name ?? "",
        },
    });

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
            });
        }
    }, [category, reset]);

    const onSubmit = async (data: CategoryFormData) => {
        try {
            if (category) {
                await categoryService.updateCategory(category._id, data);
            
                onSuccess?.();
            } else {
                await categoryService.createCategory(data);
            
                onSuccess?.();
                reset();
            }
        } catch (error) {
            console.error(error);
        }
    };

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

            <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 w-full"
            >
                {isSubmitting
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