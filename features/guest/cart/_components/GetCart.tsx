
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowRight,
  LoaderCircle,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} from "@/store/slices/cartSlice";

import type { Cart, CartItem } from "@/types/cart.types";
import EmptyCart from "../_ui/EmptyCart"
import IsLoading from "@/components/ui/loading"
import IsErrorCart from "../_ui/IsErrorCart";

function GetCart() {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetCartQuery();

  const [updateCartItem, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();

  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();

  // Assumes the API response is { data: Cart }.
  const cart = response?.data as Cart | undefined;
  const items = cart?.items ?? [];
  const totalPrice = cart?.totalPrice ?? 0;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 2,
    }).format(price);

  const getItemKey = (item: CartItem) =>
    `${item.product._id}-${item.size ?? ""}-${item.color ?? ""}`;

  const handleUpdateQuantity = async (
    item: CartItem,
    quantity: number,
  ) => {
    if (quantity < 1) return;

    try {
      await updateCartItem({
        productId: item.product._id,
        quantity,
        ...(item.size && { size: item.size }),
        ...(item.color && { color: item.color }),
      }).unwrap();

      toast.success("Cart updated successfully.");
    } catch {
      toast.error("Failed to update the cart.");
    }
  };

  const handleRemoveItem = async (item: CartItem) => {
    try {
      await removeFromCart({
        productId: item.product._id,
        ...(item.size && { size: item.size }),
        ...(item.color && { color: item.color }),
      }).unwrap();

      toast.success("Product removed from cart.");
    } catch {
      toast.error("Failed to remove the product.");
    }
  };

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsErrorCart onClick={refetch} />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="container mx-auto px-4 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Your Shopping Bag
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Shopping Cart
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_360px]">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => {
            const product = item.product;

            const image = product.images?.[0] as
              | { secure_url?: string }
              | undefined;

            const imageUrl = image?.secure_url || "/images/placeholder.png";

            return (
              <article
                key={getItemKey(item)}
                className="flex gap-4 rounded-2xl border border-border bg-card p-3 sm:gap-6 sm:p-5"
              >
                {/* Product Image */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-40 sm:w-32"
                >
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/products/${product.slug}`}
                        className="line-clamp-2 font-semibold transition-colors hover:text-accent sm:text-lg"
                      >
                        {product.name}
                      </Link>

                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground sm:text-sm">
                        {item.size && (
                          <span className="rounded-md border border-border px-2 py-1">
                            Size: {item.size}
                          </span>
                        )}

                        {item.color && (
                          <span className="rounded-md border border-border px-2 py-1">
                            Color: {item.color}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${product.name} from cart`}
                      disabled={isRemoving}
                      onClick={() => handleRemoveItem(item)}
                      className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center rounded-lg border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        disabled={item.quantity <= 1 || isUpdating}
                        onClick={() =>
                          handleUpdateQuantity(item, item.quantity - 1)
                        }
                        className="p-2 transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus className="size-3.5" />
                      </button>

                      <span className="min-w-8 text-center text-sm font-medium tabular-nums">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label="Increase quantity"
                        disabled={isUpdating}
                        onClick={() =>
                          handleUpdateQuantity(item, item.quantity + 1)
                        }
                        className="p-2 transition-colors hover:text-accent disabled:opacity-40"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>

                    {/* Item Price */}
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.price)} each
                      </p>

                      <p className="mt-1 font-semibold tabular-nums">
                        {formatPrice(item.subTotal)}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          <div className="pt-2">
            <Button variant="ghost" className="rounded-xl">
              <Link href="/products" className="flex gap-3">
                <ArrowRight className="mr-2 size-4 rotate-180" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">
                Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>

              <span className="font-medium tabular-nums">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-sm">Calculated at checkout</span>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Total</span>

                <span className="text-xl font-bold tabular-nums">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                Shipping fees and any applicable discounts will be confirmed
                at checkout.
              </p>
            </div>
          </div>

          <Button className="mt-6 h-12 w-full rounded-xl font-semibold">
            <Link href="/checkout" className="flex gap-3">
              Proceed to Checkout
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShoppingBag className="size-4" />
            Secure shopping experience
          </div>
        </aside>
      </div>
    </section>
  );
}

export default GetCart;
