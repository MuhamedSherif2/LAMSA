"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Star, ShoppingBag } from "lucide-react";
import { useGetAllProductsQuery } from "@/store/slices/productSlice";
import Loading from "@/components/ui/loading";
import SectionHeader from "../_ui/SectionHeader";

function GetFeactureProducts() {
    const { data, isLoading, isError, error } = useGetAllProductsQuery();
    const featuredProducts = data?.data?.filter(
        (product) => product.isFeatured && product.isActive && !product.isDeleted
    );


    if (isLoading) {
        return (
            <section className="px-4 py-20 sm:px-8 lg:px-16">
                <Loading />
            </section>
        );
    }

    if (isError) {
        return (
            <section className="px-4 py-20 text-center">
                <p className="text-muted-foreground">
                    Something went wrong while loading our products.
                </p>
            </section>
        );
    }

    if (!featuredProducts?.length) {
        return null;
    }

    return (
        <section className="relative overflow-hidden min-h-screen bg-background px-4 py-16 sm:px-8 sm:py-20 lg:px-16">
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <SectionHeader />

                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                    {featuredProducts.map((product) => {
                        const image = product.images?.[0]?.secure_url;

                        const hasDiscount =
                            product.discountPrice > 0 &&
                            product.discountPrice < product.price;

                        const finalPrice = hasDiscount
                            ? product.discountPrice
                            : product.price;

                        const discountPercentage = hasDiscount
                            ? Math.round(
                                ((product.price - product.discountPrice) /
                                    product.price) *
                                100
                            )
                            : 0;

                        return (
                            <article
                                key={product._id}
                                className="group min-w-0"
                            >
                                {/* Product Image */}
                                <Link
                                    href={`/products/${product.slug}`}
                                    className="relative block overflow-hidden rounded-xl bg-muted sm:rounded-2xl"
                                >
                                    <div className="relative aspect-3/4">
                                        {image ? (
                                            <Image
                                                src={image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                                No image available
                                            </div>
                                        )}

                                        {/* Featured Badge */}
                                        <span className="absolute left-2 top-2 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm sm:left-3 sm:top-3 sm:text-xs">
                                            Featured
                                        </span>

                                        {/* Discount Badge */}
                                        {hasDiscount && (
                                            <span className="absolute right-2 top-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground sm:right-3 sm:top-3 sm:text-xs">
                                                -{discountPercentage}%
                                            </span>
                                        )}

                                        {/* Quick Action */}
                                        <div className="absolute bottom-3 left-3 right-3 hidden translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
                                            <span className="flex w-full items-center justify-center gap-2 rounded-lg bg-background/95 py-3 text-sm font-semibold text-foreground backdrop-blur-sm">
                                                <ShoppingBag size={16} />
                                                View Product
                                            </span>
                                        </div>
                                    </div>
                                </Link>

                                {/* Product Information */}
                                <div className="pt-3 sm:pt-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="line-clamp-2 text-sm font-semibold leading-5 text-foreground transition-colors hover:text-primary sm:text-base"
                                        >
                                            {product.name}
                                        </Link>
                                    </div>

                                    {/* Rating */}
                                    {product.numReviews > 0 && (
                                        <div className="mt-2 flex items-center gap-1.5">
                                            <Star
                                                size={14}
                                                className="fill-amber-400 text-amber-400"
                                            />
                                            <span className="text-xs font-medium text-foreground">
                                                {product.averageRating.toFixed(1)}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                ({product.numReviews})
                                            </span>
                                        </div>
                                    )}

                                    {/* Price */}
                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <span className="text-sm font-bold text-foreground sm:text-base">
                                            {finalPrice.toLocaleString("en-EG")}{" "}
                                            EGP
                                        </span>

                                        {hasDiscount && (
                                            <span className="text-xs text-muted-foreground line-through sm:text-sm">
                                                {product.price.toLocaleString(
                                                    "en-EG"
                                                )}{" "}
                                                EGP
                                            </span>
                                        )}
                                    </div>

                                    {/* Availability */}
                                    {product.stock > 0 ? (
                                        <p className="mt-2 text-[11px] font-medium text-emerald-600 sm:text-xs">
                                            In stock
                                        </p>
                                    ) : (
                                        <p className="mt-2 text-[11px] font-medium text-destructive sm:text-xs">
                                            Out of stock
                                        </p>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 flex justify-center sm:mt-16">
                    <Link
                        href="/products"
                        className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
                    >
                        Explore All Products
                        <ArrowRight
                            size={18}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default GetFeactureProducts;