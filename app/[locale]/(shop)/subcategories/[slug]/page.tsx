
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import { useGetAllProductsQuery } from "@/store/slices/productSlice";
import { useGetAllSubCategoriesQuery } from "@/store/slices/subCategorySlice";

export default function SubCategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: productsResponse, isLoading: productsLoading } =
    useGetAllProductsQuery();

  const { data: subCategoriesResponse, isLoading: subLoading } =
    useGetAllSubCategoriesQuery();

  const subCategories = subCategoriesResponse?.data ?? [];
  const products = productsResponse?.data ?? [];

  const currentSubCategory = subCategories.find(
    (sub) => sub.slug === slug
  );

  const filteredProducts = products.filter((product) => {
    if (!currentSubCategory) return false;

    const subCategoryId =
      typeof product.subCategory === "string"
        ? product.subCategory
        : product.subCategory?._id;

    return subCategoryId === currentSubCategory._id;
  });

  if (productsLoading || subLoading) {
    return (
      <main className="container mx-auto px-6 py-16">
        <p>Loading products...</p>
      </main>
    );
  }

  if (!currentSubCategory) {
    return (
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold">
          Subcategory not found
        </h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">
          LAMSA COLLECTION
        </p>

        <h1 className="text-4xl font-bold">
          {currentSubCategory.name}
        </h1>

        <p className="mt-3 text-muted-foreground">
          {filteredProducts.length} Products
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No products found in this collection.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                {product.images?.[0]?.secure_url && (
                  <img
                    src={product.images[0].secure_url}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="p-4">
                <h2 className="font-semibold">
                  {product.name}
                </h2>

                <p className="mt-2 font-bold text-accent">
                  {product.price} EGP
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
