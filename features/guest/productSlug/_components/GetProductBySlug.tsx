
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ShoppingBag,
    Truck,
    RotateCcw,
    Star,
    Plus,
    Minus,
} from "lucide-react";

import { useGetProductBySlugQuery } from "@/store/slices/productSlice";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

import IsError from "../_ui/IsError";
import AddToCartButton from "../_ui/AddToCartButton";
import AddToWishlistButton from "../_ui/AddToWishlistButton";

function GetProductBySlug() {
    const params = useParams<{ slug: string }>();
    const slug = params.slug;

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const {
        data: response,
        isLoading,
        isError,
    } = useGetProductBySlugQuery(slug);

    if (isLoading) return <Loading />;

    if (isError || !response?.data) {
        return <IsError />;
    }

    const data = response.data;

    const sizes = data.sizes ?? [];
    const colors = data.colors ?? [];
    const images = data.images ?? [];

    const hasDiscount =
        data.discountPrice > 0 && data.discountPrice < data.price;

    const currentPrice = hasDiscount
        ? data.discountPrice
        : data.price;

    const stock = Math.max(0, data.stock ?? 0);

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="mb-8 flex flex-wrap items-center gap-2 text-sm"
                >
                    <Link
                        href="/"
                        className="text-muted-foreground transition-colors hover:text-accent"
                    >
                        Home
                    </Link>

                    <span className="text-border">/</span>

                    <Link
                        href="/products"
                        className="text-muted-foreground transition-colors hover:text-accent"
                    >
                        Products
                    </Link>

                    <span className="text-border">/</span>

                    <span className="max-w-52 truncate font-medium text-foreground">
                        {data.name}
                    </span>
                </nav>

                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {images.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {images.map((img, index) => (
                                    <div
                                        key={img.public_id || img.secure_url}
                                        className={`group relative overflow-hidden rounded-2xl bg-muted ${
                                            images.length === 1 ? "col-span-2" : ""
                                        }`}
                                    >
                                        <div className="relative aspect-4/5">
                                            <Image
                                                src={img.secure_url}
                                                alt={`${data.name} - ${index + 1}`}
                                                fill
                                                priority={index === 0}
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                        </div>

                                        {index === 0 && hasDiscount && (
                                            <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground shadow-sm sm:left-4 sm:top-4">
                                                SALE
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex aspect-4/5 items-center justify-center rounded-2xl border border-border bg-muted">
                                <div className="text-center">
                                    <ShoppingBag className="mx-auto size-10 text-muted-foreground" />
                                    <p className="mt-3 text-sm text-muted-foreground">
                                        No images available
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Trust Information */}
                        <div className="hidden grid-cols-2 gap-3 sm:grid">
                            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                                <Truck className="size-5 shrink-0 text-accent" />
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        Delivery
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Convenient shipping
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                                <RotateCcw className="size-5 shrink-0 text-accent" />
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        Easy Returns
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Shop with confidence
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="lg:sticky lg:top-24">
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
                            {/* Category */}
                            {typeof data.category === "object" &&
                                data.category && (
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                                        {data.category.name}
                                    </p>
                                )}

                            {/* Product Name */}
                            <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                                {data.name}
                            </h1>

                            {/* Rating */}
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-1 text-accent">
                                    <Star className="size-4 fill-current" />
                                    <span className="text-sm font-semibold">
                                        {data.averageRating?.toFixed(1) || "0.0"}
                                    </span>
                                </div>

                                <span className="text-sm text-muted-foreground">
                                    ({data.numReviews || 0} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <span className="text-3xl font-semibold tracking-tight text-foreground">
                                    ${currentPrice.toFixed(2)}
                                </span>

                                {hasDiscount && (
                                    <>
                                        <span className="text-lg text-muted-foreground line-through">
                                            ${data.price.toFixed(2)}
                                        </span>

                                        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                                            Sale
                                        </span>
                                    </>
                                )}
                            </div>

                            <div className="my-7 border-t border-border" />

                            {/* Description */}
                            <div>
                                <h2 className="text-sm font-semibold text-foreground">
                                    Product Description
                                </h2>

                                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                                    {data.description}
                                </p>
                            </div>

                            {/* Product Options */}
                            <div className="mt-7 space-y-6">
                                {/* Size */}
                                {sizes.length > 0 && (
                                    <div>
                                        <div className="mb-3 flex items-center justify-between">
                                            <label className="text-sm font-semibold text-foreground">
                                                Size
                                            </label>

                                            <span className="text-xs text-muted-foreground">
                                                Select your size
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedSize(size)
                                                    }
                                                    aria-pressed={
                                                        selectedSize === size
                                                    }
                                                    className={`min-w-12 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                                                        selectedSize === size
                                                            ? "border-accent bg-accent text-white"
                                                            : "border-border bg-background text-foreground hover:border-accent"
                                                    }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Color */}
                                {colors.length > 0 && (
                                    <div>
                                        <label
                                            htmlFor="product-color"
                                            className="mb-3 block text-sm font-semibold text-foreground"
                                        >
                                            Color
                                        </label>

                                        <select
                                            id="product-color"
                                            value={selectedColor}
                                            onChange={(event) =>
                                                setSelectedColor(
                                                    event.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                                        >
                                            <option value="">
                                                Choose a color
                                            </option>

                                            {colors.map((color) => (
                                                <option
                                                    key={color}
                                                    value={color}
                                                >
                                                    {color}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Quantity */}
                                <div>
                                    <label className="mb-3 block text-sm font-semibold text-foreground">
                                        Quantity
                                    </label>

                                    <div className="flex w-fit items-center overflow-hidden rounded-lg border border-border">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Decrease quantity"
                                            disabled={quantity <= 1}
                                            onClick={() =>
                                                setQuantity((current) =>
                                                    Math.max(1, current - 1)
                                                )
                                            }
                                            className="rounded-none"
                                        >
                                            <Minus className="size-4" />
                                        </Button>

                                        <span
                                            aria-live="polite"
                                            className="min-w-12 text-center text-sm font-semibold text-foreground"
                                        >
                                            {quantity}
                                        </span>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Increase quantity"
                                            disabled={quantity >= stock}
                                            onClick={() =>
                                                setQuantity((current) =>
                                                    Math.min(
                                                        stock,
                                                        current + 1
                                                    )
                                                )
                                            }
                                            className="rounded-none"
                                        >
                                            <Plus className="size-4" />
                                        </Button>
                                    </div>

                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Maximum {stock} items available
                                    </p>
                                </div>

                                {/* Subtotal */}
                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <span className="text-sm text-muted-foreground">
                                        Subtotal ({quantity}{" "}
                                        {quantity === 1 ? "item" : "items"})
                                    </span>

                                    <span className="text-lg font-semibold text-foreground">
                                        ${(currentPrice * quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-4">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`size-2.5 rounded-full ${
                                            stock > 0
                                                ? "bg-emerald-500"
                                                : "bg-destructive"
                                        }`}
                                    />

                                    <span className="text-sm font-medium text-foreground">
                                        {stock > 0
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </span>
                                </div>

                                <span className="text-sm text-muted-foreground">
                                    {stock > 0
                                        ? `${stock} available`
                                        : "Currently unavailable"}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <AddToCartButton
                                    data={data}
                                    quantity={quantity}
                                    size={selectedSize}
                                    color={selectedColor}
                                />

                                <AddToWishlistButton data={data} />
                            </div>

                            {/* Additional Details */}
                            <div className="mt-7 space-y-4 border-t border-border pt-6">
                                <div className="flex items-start justify-between gap-4 text-sm">
                                    <span className="text-muted-foreground">
                                        Product
                                    </span>

                                    <span className="text-right font-medium text-foreground">
                                        {data.name}
                                    </span>
                                </div>

                                {typeof data.category === "object" &&
                                    data.category && (
                                        <div className="flex items-start justify-between gap-4 text-sm">
                                            <span className="text-muted-foreground">
                                                Category
                                            </span>

                                            <span className="text-right font-medium text-foreground">
                                                {data.category.name}
                                            </span>
                                        </div>
                                    )}

                                {typeof data.subCategory === "object" &&
                                    data.subCategory && (
                                        <div className="flex items-start justify-between gap-4 text-sm">
                                            <span className="text-muted-foreground">
                                                Subcategory
                                            </span>

                                            <span className="text-right font-medium text-foreground">
                                                {data.subCategory.name}
                                            </span>
                                        </div>
                                    )}
                            </div>
                        </div>

                        <p className="mt-5 text-center text-xs leading-6 text-muted-foreground">
                            Thoughtfully selected for your LAMSA collection.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default GetProductBySlug;
