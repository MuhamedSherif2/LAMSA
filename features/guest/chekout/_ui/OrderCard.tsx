"use client"

import Image from "next/image";
import Loading from "@/components/ui/loading";
import { useGetMyOrdersQuery, useCancelOrderMutation } from "@/store/slices/orderSlice";
import { Package, MapPin, CreditCard, CalendarDays, ShoppingBag, XCircle, Truck, CheckCircle2, Clock3, X, } from "lucide-react";
import { toast } from "sonner";
import type { Order, OrderProduct } from "@/types/order.types";

interface IProps {
    order: Order;
    onCancel: (id: string) => void | Promise<void>;
    isCancelling: boolean;
}

const statusStyles: Record<string, string> = {
    Pending: "bg-amber-500/10 text-amber-600",
    Processing: "bg-blue-500/10 text-blue-600",
    Shipped: "bg-violet-500/10 text-violet-600",
    Delivered: "bg-emerald-500/10 text-emerald-600",
    Cancelled: "bg-red-500/10 text-red-600",
};

const statusIcons: Record<string, typeof Clock3> = {
    Pending: Clock3,
    Processing: Package,
    Shipped: Truck,
    Delivered: CheckCircle2,
    Cancelled: XCircle,
};

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 2,
    }).format(price);
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function getProductImage(product: OrderProduct | undefined) {
    const image = product?.images?.[0];

    if (typeof image === "string") return image;

    if (
        image &&
        typeof image === "object" &&
        "secure_url" in image &&
        typeof image.secure_url === "string"
    ) {
        return image.secure_url;
    }

    return null;
}

function OrderCard({ order, onCancel, isCancelling, }: IProps) {
    const StatusIcon = statusIcons[order.orderStatus] ?? Clock3;
    const isCancelled = order.orderStatus === "Cancelled";
    const canCancel = ["Pending", "Processing"].includes(order.orderStatus);

    return (
        <article className={`overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md ${isCancelled? "border-border/60 bg-muted/10": "border-border"}`}>
            {/* Header */}
            <div
                className={`flex flex-wrap items-center justify-between gap-4 border-b px-5 py-4 sm:px-6 ${isCancelled ? "border-border/60 bg-muted/30" : "border-border"
                    }`}
            >
                <div>
                    <p className="text-xs text-muted-foreground">Order placed</p>
                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
                        <CalendarDays className="size-4 text-accent" />
                        {formatDate(order.createdAt)}
                    </p>
                </div>

                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[order.orderStatus] ?? "bg-muted text-muted-foreground"
                        }`}
                >
                    <StatusIcon className="size-3.5" />
                    {order.orderStatus}
                </span>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
                {/* Products */}
                <section>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <ShoppingBag className="size-4 text-accent" />
                        Order items
                        <span className="text-xs font-normal text-muted-foreground">
                            ({order.items.length} {order.items.length === 1 ? "item" : "items"})
                        </span>
                    </h3>

                    <div className="space-y-3">
                        {order.items.map((item, index) => {
                            const product =
                                typeof item.product === "object" && item.product !== null
                                    ? item.product
                                    : undefined;

                            const imageUrl = getProductImage(product);

                            return (
                                <div
                                    key={`${product?._id ?? item.product}-${index}`}
                                    className={`flex items-center gap-4 rounded-xl p-3 sm:p-4 ${isCancelled ? "bg-muted/40 opacity-75" : "bg-muted/30"
                                        }`}
                                >
                                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-24">
                                        {imageUrl ? (
                                            <Image
                                                src={imageUrl}
                                                alt={product?.name ?? "Product"}
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <Package className="size-7 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="line-clamp-2 text-sm font-semibold text-foreground">
                                            {product?.name ?? "Product"}
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Qty: {item.quantity}
                                            {item.size ? ` · Size: ${item.size}` : ""}
                                            {item.color ? ` · Color: ${item.color}` : ""}
                                        </p>

                                        <p className="mt-2 text-sm font-semibold text-accent">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Shipping Address */}
                <section className="rounded-xl border border-border p-4">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <MapPin className="size-4 text-accent" />
                        Shipping address
                    </h3>

                    <div className="space-y-1.5 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">
                            {order.shippingAddress.fullName}
                        </p>
                        <p>{order.shippingAddress.phoneNumber}</p>

                        <p>
                            {[
                                order.shippingAddress.street,
                                order.shippingAddress.area,
                                order.shippingAddress.city,
                                order.shippingAddress.governorate,
                                order.shippingAddress.country,
                            ]
                                .filter(Boolean)
                                .join(", ")}
                        </p>

                        {(order.shippingAddress.building ||
                            order.shippingAddress.apartment) && (
                                <p>
                                    {order.shippingAddress.building
                                        ? `Building: ${order.shippingAddress.building}`
                                        : ""}
                                    {order.shippingAddress.building &&
                                        order.shippingAddress.apartment
                                        ? " · "
                                        : ""}
                                    {order.shippingAddress.apartment
                                        ? `Apartment: ${order.shippingAddress.apartment}`
                                        : ""}
                                </p>
                            )}

                        {order.shippingAddress.postalCode && (
                            <p>Postal code: {order.shippingAddress.postalCode}</p>
                        )}

                        {order.shippingAddress.notes && (
                            <p className="mt-2 rounded-lg bg-muted/50 p-3 text-xs">
                                <span className="font-medium text-foreground">
                                    Delivery notes:
                                </span>{" "}
                                {order.shippingAddress.notes}
                            </p>
                        )}
                    </div>
                </section>

                {/* Payment & Summary */}
                <section className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                            <CreditCard className="size-4 text-accent" />
                            Payment method
                        </h3>

                        <div className="rounded-xl bg-muted/30 p-4">
                            <p className="text-sm font-medium text-foreground">
                                {order.paymentMethod === "CashOnDelivery"
                                    ? "Cash on Delivery"
                                    : order.paymentMethod === "CreditCard"
                                        ? "Credit Card"
                                        : order.paymentMethod}
                            </p>

                            <p
                                className={`mt-2 text-xs font-medium ${order.isPaid ? "text-emerald-600" : "text-amber-600"
                                    }`}
                            >
                                {order.isPaid ? "Payment completed" : "Payment pending"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-foreground">
                            Order summary
                        </h3>

                        <div className="space-y-2 rounded-xl bg-muted/30 p-4 text-sm">
                            <div className="flex justify-between gap-3 text-muted-foreground">
                                <span>Subtotal</span>
                                <span>{formatPrice(order.totalPrice)}</span>
                            </div>

                            {order.discountAmount > 0 && (
                                <div className="flex justify-between gap-3 text-emerald-600">
                                    <span>Discount</span>
                                    <span>-{formatPrice(order.discountAmount)}</span>
                                </div>
                            )}

                            <div className="my-2 border-t border-border" />

                            <div className="flex items-center justify-between gap-3">
                                <span className="font-semibold text-foreground">Total</span>
                                <span className="text-lg font-bold text-accent">
                                    {formatPrice(order.finalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Actions */}
                {isCancelled ? (
                    <div className="flex items-center gap-3 rounded-xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                        <XCircle className="size-5 shrink-0 text-red-500" />
                        <div>
                            <p className="font-semibold text-foreground">Order cancelled</p>
                            <p className="mt-0.5 text-xs">
                                This order will remain in your order history.
                            </p>
                        </div>
                    </div>
                ) : (
                    canCancel && (
                        <div className="flex justify-end border-t border-border pt-4">
                            <button
                                type="button"
                                onClick={() => onCancel(order._id)}
                                disabled={isCancelling}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <X className="size-4" />
                                {isCancelling ? "Cancelling..." : "Cancel order"}
                            </button>
                        </div>
                    )
                )}
            </div>
        </article>
    );
}


export default OrderCard