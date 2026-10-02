"use client";

import { useState } from "react";

import ProductsForm from "./ProductsForm";
import ProductTable from "./ProductTable";

import type { Product } from "@/types/product.types";

function GetProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Add
  const handleAdd = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  // Edit
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  // Close
  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  // After successful add/update
  const handleSuccess = () => {
    handleClose();
  };

  return (
    <section>
      <ProductsForm
        initialData={selectedProduct ?? undefined}
        isOpen={isFormOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />

      <ProductTable
        onAdd={handleAdd}
        onEdit={handleEdit}
      />
    </section>
  );
}

export default GetProducts;