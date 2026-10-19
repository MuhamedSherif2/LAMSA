
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

import {
    useGetWishlistQuery,
    useRemoveFromWishlistMutation,
} from "@/store/slices/wishlistSlice";

import type { WishlistProduct } from "@/types/wishlist.types";

function GetWishList() {
    const {
        data: response,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetWishlistQuery();

    const [removeFromWishlist, { isLoading: isRemoving }] =
        useRemoveFromWishlistMutation();

    // Assumes the API response is { data: Wishlist }.
    const products = (response?.data ?? []) as WishlistProduct[];

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-EG", {
            style: "currency",
            currency: "EGP",
            maximumFractionDigits: 2,
        }).format(price);

    const handleRemove = async (productId: string) => {
        try {
            await removeFromWishlist(productId).unwrap();
            toast.success("Product removed from your wishlist.");
        } catch {
            toast.error("Failed to remove product. Please try again.");
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <section className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
                <Heart className="size-12 text-muted-foreground" />

                <h2 className="text-xl font-semibold">
                    Unable to load your wishlist
                </h2>

                <p className="text-sm text-muted-foreground">
                    Something went wrong. Please try again.
                </p>

                <Button variant="outline" onClick={() => refetch()}>
                    Try Again
                </Button>
            </section>
        );
    }

    if (products.length === 0) {
        return (
            <section className="container mx-auto flex min-h-[55vh] flex-col items-center justify-center px-4 py-16 text-center">
                <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-accent/10">
                    <Heart className="size-9 text-accent" />
                </div>

                <h1 className="text-2xl font-semibold sm:text-3xl">
                    Your Wishlist Is Empty
                </h1>

                <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
                    Save your favorite products here and come back to them whenever
                    you like.
                </p>

                <Button className="mt-7 rounded-xl">
                    <Link href="/products">
                        Explore Products
                        <ShoppingBag className="ml-2 size-4" />
                    </Link>
                </Button>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-4 py-10 sm:py-14">
            {/* Header */}
            <div className="mb-8">
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                    Your Favorites
                </p>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    My Wishlist
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    {products.length}{" "}
                    {products.length === 1 ? "product" : "products"} saved
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => {
                    const imageUrl =
                        product.images?.[0]?.secure_url || "/images/placeholder.png";

                    const hasDiscount =
                        typeof product.discountPrice === "number" &&
                        product.discountPrice > 0 &&
                        product.discountPrice < product.price;

                    const currentPrice = hasDiscount
                        ? product.discountPrice!
                        : product.price;

                    const discountPercentage = hasDiscount
                        ? Math.round(
                            ((product.price - currentPrice) / product.price) * 100,
                        )
                        : 0;

                    return (
                        <article
                            key={product._id}
                            className="group overflow-hidden rounded-2xl border border-border bg-card"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-3/4 overflow-hidden bg-muted">
                                <Link
                                    href={`/products/${product.slug}`}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={imageUrl}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </Link>

                                {hasDiscount && (
                                    <span className="absolute left-2 top-2 rounded-md bg-accent px-2 py-1 text-xs font-semibold text-white sm:left-3 sm:top-3">
                                        -{discountPercentage}%
                                    </span>
                                )}

                                <button
                                    type="button"
                                    aria-label={`Remove ${product.name} from wishlist`}
                                    disabled={isRemoving}
                                    onClick={() => handleRemove(product._id)}
                                    className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-destructive hover:text-white disabled:opacity-50 sm:right-3 sm:top-3"
                                >
                                    {isRemoving ? (
                                        <LoaderCircle className="size-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="size-4" />
                                    )}
                                </button>
                            </div>

                            {/* Product Details */}
                            <div className="p-3 sm:p-4">
                                <Link href={`/products/${product.slug}`}>
                                    <h2 className="line-clamp-2 min-h-10 text-sm font-semibold transition-colors hover:text-accent sm:text-base">
                                        {product.name}
                                    </h2>
                                </Link>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-bold sm:text-base">
                                        {formatPrice(currentPrice)}
                                    </span>

                                    {hasDiscount && (
                                        <span className="text-xs text-muted-foreground line-through sm:text-sm">
                                            {formatPrice(product.price)}
                                        </span>
                                    )}
                                </div>

                                <Button
                                    variant="outline"
                                    className="mt-4 w-full rounded-xl text-xs sm:text-sm"
                                >
                                    <Link href={`/products/${product.slug}`}>
                                        View Product
                                    </Link>
                                </Button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default GetWishList;
