"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { productService } from "@/services/product.service";
import type { Product } from "@/types/product.types";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import THeaderPro from "../_ui/THeaderPro";

interface ProductTableProps {
  onAdd: () => void;
  onEdit: (product: Product) => void;
}

function ProductTable({
  onAdd,
  onEdit,
}: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      const res = await productService.getAllProducts();

      setProducts(res.data ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ==================== DELETE ====================

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(id);

      const res = await productService.deleteProduct(id);

      if (!res.success) {
        toast.error(res.message ?? "Failed to delete product");
        return;
      }

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <p className="p-4 text-sm text-muted-foreground">
        Loading...
      </p>
    );
  }

  return (
    <div className="mt-10 rounded-lg border">
      {/* Add Product */}

      <div className="flex justify-end p-4">
        <Button type="button" onClick={onAdd}>
          Add Product
        </Button>
      </div>

      <Table>
        <THeaderPro />

        <TableBody>
          {products.map((item) => (
            <TableRow key={item._id}>

              {/* Image */}
              <TableCell>
                {item.images?.[0]?.secure_url ? (
                  <div className="relative h-12 w-12 overflow-hidden rounded-md border border-border">
                    <Image
                      src={item.images[0].secure_url}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-md bg-muted" />
                )}
              </TableCell>

              {/* Name */}
              <TableCell className="max-w-50 truncate font-medium">
                {item.name}
              </TableCell>

              {/* Price */}
              <TableCell>
                ${item.price}
              </TableCell>

              {/* Discount */}
              <TableCell>
                {item.discountPrice > 0 ? (
                  <span className="font-medium text-accent">
                    ${item.discountPrice}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    —
                  </span>
                )}
              </TableCell>

              {/* Stock */}
              <TableCell>
                {item.stock > 0 ? (
                  item.stock
                ) : (
                  <span className="text-destructive">
                    Out
                  </span>
                )}
              </TableCell>

              {/* Featured */}
              <TableCell>
                {item.isFeatured ? (
                  <span className="text-accent">
                    Yes
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    No
                  </span>
                )}
              </TableCell>

              {/* Active */}
              <TableCell>
                {item.isActive ? (
                  <span className="text-green-600">
                    Active
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Inactive
                  </span>
                )}
              </TableCell>

              {/* Edit */}
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

              {/* Delete */}
              <TableCell>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  disabled={deleteLoading === item._id}
                  onClick={() => handleDelete(item._id)}
                >
                  {deleteLoading === item._id
                    ? "Deleting..."
                    : "Delete"}
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductTable;