'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { toast } from 'sonner';
import { X, Upload, Loader2, ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { useCategories } from '@/hooks/useCategory';
import { useSubCategory } from '@/hooks/useSubCategory';
import { productService } from '@/services/product.service';
import type { Product, ProductFormData } from '@/types/product.types';

import InputProduct from '../_ui/InputProduct';
import SelectProduct from '../_ui/SelectProduct';
import { productSchema } from './ZodSchema';

type FormValues = z.infer<typeof productSchema>;

interface ProductsFormProps {
  initialData?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

function ProductsForm({
  initialData,
  isOpen,
  onClose,
  onSuccess,
}: ProductsFormProps) {
  const isEdit = Boolean(initialData);

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: categories = [] } = useCategories();
  const { data: subCategories = [] } = useSubCategory();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      discountPrice: 0,
      stock: 0,
      category: '',
      subCategory: '',
      isFeatured: false,
      isActive: true,
    },
  });

  /* ---------- Reset form when opened/changed ---------- */
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      reset({
        name: initialData.name ?? '',
        description: initialData.description ?? '',
        price: initialData.price ?? 0,
        discountPrice: initialData.discountPrice ?? 0,
        stock: initialData.stock ?? 0,
        category:
          typeof initialData.category === 'object'
            ? initialData.category._id
            : (initialData.category as string) ?? '',
        subCategory:
          typeof initialData.subCategory === 'object'
            ? initialData.subCategory._id
            : (initialData.subCategory as string) ?? '',
        isFeatured: initialData.isFeatured ?? false,
        isActive: initialData.isActive ?? true,
      });

      setPreviews(initialData.images?.map((img) => img.secure_url) ?? []);
    } else {
      reset({
        name: '',
        description: '',
        price: 0,
        discountPrice: 0,
        stock: 0,
        category: '',
        subCategory: '',
        isFeatured: false,
        isActive: true,
      });
      setPreviews([]);
    }

    setImages([]);
  }, [isOpen, initialData, reset]);

  const selectedCategory = watch('category');
  const selectedSubCategory = watch('subCategory');
  const isFeatured = watch('isFeatured');
  const isActive = watch('isActive');

  /* ---------- Images ---------- */
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    if (files.length > 5) {
      toast.error('Maximum 5 images');
      return;
    }

    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- Submit ---------- */
  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    const payload: ProductFormData = {
      name: values.name,
      description: values.description,
      price: values.price,
      discountPrice: values.discountPrice,
      stock: values.stock,
      category: values.category,
      subCategory: values.subCategory,
      isFeatured: values.isFeatured,
      isActive: values.isActive,
      images: images.length > 0 ? images : undefined,
    };

    try {
      const res = isEdit
        ? await productService.updateProduct(initialData!._id, payload)
        : await productService.createProduct(payload);

      if (!res.success) {
        toast.error(res.message ?? 'Something went wrong');
        return;
      }

      toast.success(
        isEdit ? 'Product updated successfully' : 'Product added successfully'
      );

      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message ?? 'Please try again later');
    } finally {
      setLoading(false);
    }
  };

  /* ---------- SubCategories filter ---------- */
  const filteredSubs = subCategories.filter((sub) => {
    const catId =
      typeof sub.category === 'object' ? sub.category._id : sub.category;
    return catId === selectedCategory;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card text-card-foreground shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-8">
          {/* Basic Info */}
          <div className="space-y-6">
            <InputProduct
              label="Product Name"
              name="name"
              registration={register('name')}
              error={errors.name}
            />

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Describe the product..."
                {...register('description')}
                className="resize-none"
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputProduct
                label="Price ($)"
                name="price"
                type="number"
                registration={register('price', { valueAsNumber: true })}
                error={errors.price}
              />
              <InputProduct
                label="Discount Price ($)"
                name="discountPrice"
                type="number"
                registration={register('discountPrice', { valueAsNumber: true })}
                error={errors.discountPrice}
              />
            </div>

            <InputProduct
              label="Stock Quantity"
              name="stock"
              type="number"
              registration={register('stock', { valueAsNumber: true })}
              error={errors.stock}
            />
          </div>

          <div className="h-px bg-border" />

          {/* Category */}
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-foreground">Category</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectProduct
                label="Category"
                name="category"
                value={selectedCategory}
                options={categories}
                onChange={(val) => {
                  setValue('category', val, { shouldValidate: true });
                  setValue('subCategory', '', { shouldValidate: true });
                }}
                error={errors.category}
              />
              <SelectProduct
                label="Sub Category"
                name="subCategory"
                value={selectedSubCategory}
                options={filteredSubs}
                onChange={(val) =>
                  setValue('subCategory', val, { shouldValidate: true })
                }
                error={errors.subCategory}
                disabled={!selectedCategory}
              />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Images</h3>

            <label
              htmlFor="images"
              className="flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-border bg-muted/40 cursor-pointer transition-colors hover:bg-muted/70 hover:border-accent group"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-background border border-border group-hover:border-accent transition-colors">
                  <Upload className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Click to upload
                </span>
                <span className="text-xs text-muted-foreground">
                  PNG, JPG up to 5MB each
                </span>
              </div>
              <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImages}
              />
            </label>

            {previews.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {previews.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl border border-border overflow-hidden group bg-muted"
                  >
                    <Image
                      src={src}
                      alt={`preview-${i}`}
                      fill
                      sizes="(max-width: 640px) 33vw, 20vw"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      aria-label="Remove image"
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 py-4 text-xs text-muted-foreground">
                <ImageIcon className="w-4 h-4" />
                No images selected yet
              </div>
            )}
          </div>

          <div className="h-px bg-border" />

          {/* Visibility */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Visibility</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
                <div className="space-y-0.5">
                  <Label htmlFor="isFeatured" className="cursor-pointer">
                    Featured
                  </Label>
                  <p className="text-xs text-muted-foreground">Show on homepage</p>
                </div>
                <Switch
                  id="isFeatured"
                  checked={isFeatured ?? false}
                  onCheckedChange={(val) => setValue('isFeatured', val)}
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active
                  </Label>
                  <p className="text-xs text-muted-foreground">Visible in store</p>
                </div>
                <Switch
                  id="isActive"
                  checked={isActive ?? true}
                  onCheckedChange={(val) => setValue('isActive', val)}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-border bg-card/95 backdrop-blur px-6 sm:px-8 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="sm:w-32"
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading} className="sm:w-40">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                'Save Changes'
              ) : (
                'Add Product'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductsForm;