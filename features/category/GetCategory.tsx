"use client";

import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { categoryService } from "@/services/category.service";
import type { Category } from "@/types/category.types";

import CategoryForm from "./CategoryForm";

interface IProps {}

function GetCategory({}: IProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] =useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    const getCategories = async () => {
        try {
            const response = await categoryService.getAllCategories();
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await categoryService.deleteCategory(id);

            setCategories((prev) =>
                prev.filter((category) => category._id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = (category: Category) => {
        setSelectedCategory(category);
    };

    const handleFormSuccess = () => {
        setSelectedCategory(null);
        getCategories();
    };

    if (loading) {
        return <p>Loading categories...</p>;
    }

    return (
        <section className="space-y-6">

            {/* Form */}
            <CategoryForm
                category={selectedCategory ?? undefined}
                onSuccess={handleFormSuccess}
            />

            {/* Table */}
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

                                <TableCell>
                                    {category._id}
                                </TableCell>

                                <TableCell>
                                    {category.name}
                                </TableCell>

                                <TableCell>
                                    <img
                                        src={category.image.secure_url}
                                        alt={category.name}
                                        className="h-12 w-12 rounded-md object-cover"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            handleUpdate(category)
                                        }
                                    >
                                        Edit
                                    </Button>
                                </TableCell>

                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() =>
                                            handleDelete(category._id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>

                </Table>
            </div>

        </section>
    );
}

export default GetCategory;