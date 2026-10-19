"use client";

import { useState } from "react";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/store/slices/productSlice";
import ProductImageSlider from "../_ui/ProductImageSlider";
import Loading from "@/components/ui/loading";

function GetProducts() {
  const { data, isLoading, isError, error } =useGetAllProductsQuery();

  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null,);

  if (isLoading) return <Loading />;

  if (isError) {
    console.error("Failed to load products:", error);

    return (
      <section className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="rounded-lg border border-destructive p-4 text-destructive">
            Failed to load products. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const products = data?.data ?? [];

  return (
    <section className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-accent">
              Lamsa Collection
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Products
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Discover our latest collection.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            {products.length}{" "}
            {products.length === 1 ? "Product" : "Products"}
          </p>
        </div>

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="flex min-h-75 items-center justify-center rounded-2xl border border-border bg-card">
            <div className="text-center">
              <h2 className="text-lg font-medium text-foreground">
                No products found
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                There are no products available at the moment.
              </p>
            </div>
          </div>
        ) : (
          /* Products */
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const hasDiscount =
                product.discountPrice > 0 &&
                product.discountPrice < product.price;

              return (
                <Link
                  href={`/products/${product.slug}`}
                  key={product._id}
                  className="group block"
                >
                  <div
                    className="relative"
                    onMouseEnter={() =>
                      setHoveredProduct(product._id)
                    }
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <ProductImageSlider
                      images={product.images ?? []}
                      alt={product.name}
                      isHovered={hoveredProduct === product._id}
                    />

                    {/* Overlay */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />

                    {/* Discount */}
                    {hasDiscount && (
                      <div className="absolute left-3 top-3 z-20 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
                        Sale
                      </div>
                    )}

                    {/* View Product */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-xl bg-background/95 px-4 py-3 text-center text-sm font-medium text-foreground shadow-lg backdrop-blur">
                        View Product
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-4 space-y-2">
                    <h2 className="line-clamp-1 text-base font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                      {product.name}
                    </h2>

                    <div className="flex items-center gap-2">
                      {hasDiscount ? (
                        <>
                          <span className="text-sm font-semibold text-accent">
                            ${product.discountPrice.toFixed(2)}
                          </span>

                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold text-foreground">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default GetProducts;