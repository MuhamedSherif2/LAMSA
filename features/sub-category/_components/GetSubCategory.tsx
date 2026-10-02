"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SubCategoryForm from "./subCategoryForm";
import SubCategoryTable from "./SubCategoryTable";
import { subCategoryService } from "@/services/subcategory.service";
import type { SubCategory } from "@/types/subcategory.types";

function GetSubCategory() {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selected, setSelected] = useState<SubCategory | null>(null);
  const [loading, setLoading] = useState(true);

  // يمنع الـ race conditions لو الـ component اتفك قبل ما الـ request تخلص
  const abortRef = useRef(false);

  const fetchData = useCallback(async (showLoader = false) => {
    if (showLoader) setLoading(true);

    try {
      const res = await subCategoryService.getAllSubCategories();
      if (!abortRef.current) {
        setSubCategories(res.data ?? []);
      }
    } catch (error) {
      if (!abortRef.current) {
        toast.error("Failed to load sub categories");
        console.error(error);
      }
    } finally {
      if (!abortRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    abortRef.current = false;
    fetchData(true);

    return () => {
      abortRef.current = true;
    };
  }, [fetchData]);

  /* ---------- Delete (Optimistic) ---------- */
  const handleDelete = useCallback(async (id: string) => {
    const previous = subCategories;

    // optimistic update
    setSubCategories((prev) => prev.filter((i) => i._id !== id));

    try {
      await subCategoryService.deleteSubCategory(id);
      toast.success("Deleted");
      if (selected?._id === id) setSelected(null);
    } catch (error) {
      // rollback
      setSubCategories(previous);
      toast.error("Delete failed");
      console.error(error);
    }
  }, [subCategories, selected]);

  /* ---------- Edit ---------- */
  const handleEdit = useCallback((item: SubCategory) => {
    setSelected(item);
    // scroll لفوق عند الفورم
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ---------- Success ---------- */
  const handleFormSuccess = useCallback(() => {
    setSelected(null);
    fetchData(); // refresh بدون loader (بيخلي الـ UI ما يتحركش)
    toast.success(selected ? "Updated" : "Added");
  }, [fetchData, selected]);

  const handleCancel = useCallback(() => setSelected(null), []);

  return (
    <section className="space-y-6">
      <SubCategoryForm
        subCategory={selected ?? undefined}
        onSuccess={handleFormSuccess}
        onCancel={handleCancel}
      />

      <SubCategoryTable
        data={subCategories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
}

export default GetSubCategory;