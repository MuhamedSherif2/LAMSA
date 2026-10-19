"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { SubCategory } from "@/types/subcategory.types";

interface IProps {
    data: SubCategory[];
    loading?: boolean;
    onEdit: (item: SubCategory) => void;
    onDelete: (id: string) => void;
}

const getCategoryName = (category: SubCategory["category"]): string => {
    if (!category) return "—";
    if (typeof category === "string") return category;
    return category.name ?? "—";
};

function SubCategoryTable({ data, loading, onEdit, onDelete }: IProps) {
    if (loading) {
        return <p className="p-4 text-sm text-muted-foreground">Loading...</p>;
    }

    if (data.length === 0) {
        return (
            <p className="p-8 text-center text-sm text-muted-foreground">
                No sub categories yet.
            </p>
        );
    }

    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Edit</TableHead>
                        <TableHead>Delete</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-muted-foreground">
                                {item.slug}
                            </TableCell>
                            <TableCell>{getCategoryName(item.category)}</TableCell>
                            <TableCell>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onEdit(item)}
                                >
                                    Edit
                                </Button>
                            </TableCell>
                            
                            <TableCell>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => onDelete(item._id)}
                                >
                                    Delete
                                </Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default SubCategoryTable;