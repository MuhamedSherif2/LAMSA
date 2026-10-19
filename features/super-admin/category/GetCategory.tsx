"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/store/slices/categorySlice";

import type { Category } from "@/types/category.types";

import CategoryForm from "./CategoryForm";

function GetCategory() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useGetAllCategoriesQuery();

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const categories = data?.data ?? [];

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      await deleteCategory(id).unwrap();
    } catch (error) {
      console.error("Delete category error:", error);
    }
  };

  const handleFormSuccess = () => {
    setSelectedCategory(null);
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    return <p>Failed to load categories. Please try again.</p>;
  }

  return (
    <section className="space-y-6">
      <CategoryForm
        category={selectedCategory ?? undefined}
        onSuccess={handleFormSuccess}
      />

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category._id}</TableCell>

                <TableCell>{category.name}</TableCell>

                <TableCell>
                  <img
                    src={category.image?.secure_url}
                    alt={category.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                </TableCell>

                <TableCell>
                  <Button
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                  >
                    Edit
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export default GetCategory;