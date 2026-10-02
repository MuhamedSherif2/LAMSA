"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductsForm from "./ProductsForm";
import ProductTable, { type ProductTableRef } from "./ProductTable";
import type { Product } from "@/types/product.types";

function GetProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const tableRef = useRef<ProductTableRef>(null);

  /* ---------- Handlers ---------- */
  const handleAdd = () => {
    setSelected(null);
    setIsOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelected(product);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelected(null);
  };

  const handleSuccess = () => {
    tableRef.current?.refresh();
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your store products
          </p>
        </div>

        <Button type="button" onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Table */}
      {/* <ProductTable  /> */}
      <ProductTable ref={tableRef} onEdit={handleEdit} />

      {/* Modal Form */}
      {/* <ProductsForm
        isOpen={isOpen}
        initialData={selected}
        onClose={handleClose}
        onSuccess={handleSuccess}
      /> */}

      <ProductsForm         isOpen={isOpen}
        initialData={selected}
        onClose={handleClose}
        onSuccess={handleSuccess} />
    </section>
  );
}

export default GetProducts;