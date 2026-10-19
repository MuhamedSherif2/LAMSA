"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MapPin, PackageCheck, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";

import { useGetCartQuery } from "@/store/slices/cartSlice";
import { useCreateOrderMutation } from "@/store/slices/orderSlice";

import ApplyCoupon from "@/features/guest/coupon/ApplyCoupon";

import type { ApplyCouponResult } from "@/types/coupon.types";
import type {
    ShippingAddress,
    PaymentMethod,
} from "@/types/order.types";

const initialAddress: ShippingAddress = {
    fullName: "",
    phoneNumber: "",
    country: "Egypt",
    governorate: "",
    city: "",
    area: "",
    street: "",
    building: "",
    apartment: "",
    postalCode: "",
    notes: "",
};

function PlaceOrder() {
    const router = useRouter();

    const {
        data: cartResponse,
        isLoading: isCartLoading,
    } = useGetCartQuery();

    const [createOrder, { isLoading: isCreating }] =
        useCreateOrderMutation();

    const [shippingAddress, setShippingAddress] =
        useState<ShippingAddress>(initialAddress);

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("CashOnDelivery");

    const [appliedCoupon, setAppliedCoupon] =
        useState<ApplyCouponResult | null>(null);

    const cart = cartResponse?.data;
    const items = cart?.items ?? [];

    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const finalTotal =
        appliedCoupon?.totalAfterDiscount ?? totalPrice;

    const formatPrice = (price: number) =>
        `${price.toLocaleString("en-EG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })} EGP`;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setShippingAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!items.length) {
            toast.error("Your cart is empty");
            return;
        }

        try {
            const response = await createOrder({
                shippingAddress,
                paymentMethod,

                // Send the coupon code only when a coupon is applied.
                ...(appliedCoupon && {
                    couponCode: appliedCoupon.coupon.code,
                }),
            }).unwrap();

            toast.success("Order placed successfully");

            const orderId = response.data?._id;

            if (orderId) {
                router.push("/orders");
            } else {
                router.push("/");
            }
        } catch (error: unknown) {
            const message = (
                error as { data?: { message?: string } }
            )?.data?.message;

            toast.error(message || "Failed to place your order");
        }
    };

    if (isCartLoading) {
        return <Loading />;
    }

    if (!items.length) {
        return (
            <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-background px-4 text-center">
                <PackageCheck className="size-12 text-accent" />

                <h1 className="text-2xl font-bold text-foreground">
                    Your cart is empty
                </h1>

                <p className="text-muted-foreground">
                    Add some products before proceeding to checkout.
                </p>

                <Button onClick={() => router.push("/products")}>
                    Continue Shopping
                </Button>
            </section>
        );
    }

    const inputClass =
        "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

    const fields: {
        name: keyof ShippingAddress;
        label: string;
        required?: boolean;
        type?: string;
    }[] = [
        { name: "fullName", label: "Full Name", required: true },
        {
            name: "phoneNumber",
            label: "Phone Number",
            required: true,
            type: "tel",
        },
        { name: "country", label: "Country", required: true },
        {
            name: "governorate",
            label: "Governorate",
            required: true,
        },
        { name: "city", label: "City", required: true },
        { name: "area", label: "Area" },
        { name: "street", label: "Street Address", required: true },
        { name: "building", label: "Building" },
        { name: "apartment", label: "Apartment" },
        { name: "postalCode", label: "Postal Code" },
    ];

    return (
        <section className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:py-14">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                        Almost yours
                    </p>

                    <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                        Checkout
                    </h1>

                    <p className="mt-3 text-sm text-muted-foreground">
                        Enter your shipping details and review your order.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_360px]"
                >
                    {/* Shipping Address */}
                    <div className="space-y-8">
                        <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
                            <div className="mb-6 flex items-center gap-3">
                                <MapPin className="size-5 text-accent" />

                                <h2 className="text-lg font-semibold text-foreground">
                                    Shipping Address
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {fields.map((field) => (
                                    <div key={field.name}>
                                        <label
                                            htmlFor={field.name}
                                            className="mb-2 block text-sm font-medium text-foreground"
                                        >
                                            {field.label}

                                            {field.required && (
                                                <span className="ml-1 text-destructive">
                                                    *
                                                </span>
                                            )}
                                        </label>

                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type || "text"}
                                            value={shippingAddress[field.name] ?? ""}
                                            onChange={handleChange}
                                            required={field.required}
                                            autoComplete="shipping"
                                            className={inputClass}
                                        />
                                    </div>
                                ))}

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="notes"
                                        className="mb-2 block text-sm font-medium text-foreground"
                                    >
                                        Delivery Notes (Optional)
                                    </label>

                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={3}
                                        value={shippingAddress.notes ?? ""}
                                        onChange={handleChange}
                                        placeholder="Any additional delivery instructions..."
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
                            <div className="mb-6 flex items-center gap-3">
                                <CreditCard className="size-5 text-accent" />

                                <h2 className="text-lg font-semibold text-foreground">
                                    Payment Method
                                </h2>
                            </div>

                            <div className="space-y-3">
                                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition hover:border-accent">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="CashOnDelivery"
                                        checked={
                                            paymentMethod === "CashOnDelivery"
                                        }
                                        onChange={() =>
                                            setPaymentMethod("CashOnDelivery")
                                        }
                                        className="accent-accent"
                                    />

                                    <div>
                                        <p className="font-medium text-foreground">
                                            Cash on Delivery
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Pay when your order arrives.
                                        </p>
                                    </div>
                                </label>

                                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition hover:border-accent">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="CreditCard"
                                        checked={paymentMethod === "CreditCard"}
                                        onChange={() =>
                                            setPaymentMethod("CreditCard")
                                        }
                                        className="accent-accent"
                                    />

                                    <div>
                                        <p className="font-medium text-foreground">
                                            Credit Card
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Card payment requires a payment gateway integration.
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:sticky lg:top-24">
                        <h2 className="mb-6 text-lg font-semibold text-foreground">
                            Order Summary
                        </h2>

                        <div className="space-y-4">
                            {items.map((item, index) => {
                                const product =
                                    typeof item.product === "object"
                                        ? item.product
                                        : null;

                                return (
                                    <div
                                        key={`${product?._id ?? "product"}-${index}`}
                                        className="flex items-start justify-between gap-4"
                                    >
                                        <div className="min-w-0">
                                            <p className="wrap-break-word text-sm font-medium text-foreground">
                                                {product?.name ?? "Product"}
                                            </p>

                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="shrink-0 text-sm font-semibold text-foreground">
                                            {formatPrice(
                                                item.price * item.quantity
                                            )}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="my-6 border-t border-border" />

                        {/* Subtotal */}
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-sm text-muted-foreground">
                                Subtotal
                            </span>

                            <span className="font-semibold text-foreground">
                                {formatPrice(totalPrice)}
                            </span>
                        </div>

                        {/* Apply Coupon */}
                        <div className="mt-5">
                            <ApplyCoupon
                                subtotal={totalPrice}
                                onApply={setAppliedCoupon}
                            />
                        </div>

                        {/* Discount */}
                        {appliedCoupon && (
                            <div className="mt-4 flex items-center justify-between gap-3">
                                <span className="text-sm text-muted-foreground">
                                    Coupon Discount
                                </span>

                                <span className="font-medium text-green-600">
                                    -{formatPrice(appliedCoupon.discountAmount)}
                                </span>
                            </div>
                        )}

                        {/* Subtotal after discount */}
                        <div className="mt-4 flex items-center justify-between gap-3">
                            <span className="text-sm text-muted-foreground">
                                {appliedCoupon
                                    ? "Subtotal after discount"
                                    : "Subtotal"}
                            </span>

                            <span className="font-semibold text-foreground">
                                {formatPrice(finalTotal)}
                            </span>
                        </div>

                        {/* Shipping */}
                        <div className="mt-3 flex items-center justify-between gap-3">
                            <span className="text-sm text-muted-foreground">
                                Shipping
                            </span>

                            <span className="text-sm font-medium text-foreground">
                                Calculated by store
                            </span>
                        </div>

                        <div className="my-5 border-t border-border" />

                        <p className="mb-5 text-xs leading-5 text-muted-foreground">
                            Shipping fees and the final order total will be
                            confirmed by the store. The coupon will be
                            validated again when placing your order.
                        </p>

                        <Button
                            type="submit"
                            disabled={isCreating || !items.length}
                            className="h-12 w-full rounded-xl bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
                        >
                            {isCreating ? "Placing Order..." : "Place Order"}
                        </Button>

                        <p className="mt-4 text-center text-xs text-muted-foreground">
                            Your order details will be submitted securely.
                        </p>
                    </aside>
                </form>
            </div>
        </section>
    );
}

export default PlaceOrder;