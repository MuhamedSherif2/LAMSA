
"use client";

import Image from "next/image";
import Loading from "@/components/ui/loading";
import { useGetMyOrdersQuery, useCancelOrderMutation } from "@/store/slices/orderSlice";
import { Package, MapPin, CreditCard, CalendarDays, ShoppingBag, XCircle, Truck, CheckCircle2, Clock3, X, } from "lucide-react";
import { toast } from "sonner";
import type { Order, OrderProduct } from "@/types/order.types";
import OrderCard from "../_ui/OrderCard";


function GetOrders() {
    const { data, isLoading, isError, error } = useGetMyOrdersQuery();
    const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

    const handleCancelOrder = async (id: string) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        try {
            await cancelOrder(id).unwrap();
            toast.success("Order cancelled successfully.");
        } catch (error) {
            console.error("Cancel order error:", error);
            toast.error("Failed to cancel the order. Please try again.");
        }
    };

    if (isLoading) return <Loading />;

    if (isError) {
        console.error("Failed to fetch orders:", error);

        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-12 text-center">
                <XCircle className="mx-auto size-10 text-red-500" />
                <h2 className="mt-4 text-lg font-semibold text-foreground">
                    Unable to load your orders
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Something went wrong. Please try again later.
                </p>
            </div>
        );
    }

    const orders = data?.data ?? [];

    if (orders.length === 0) {
        return (
            <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted">
                    <ShoppingBag className="size-7 text-accent" />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-foreground">
                    No orders yet
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                    You haven&apos;t placed any orders yet. Explore our collection and
                    find something you love.
                </p>

                <a
                    href="/products"
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    Start shopping
                </a>
            </div>
        );
    }

    return (
        <section className="container mx-auto space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        My Orders
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Track your orders and view your purchase details.
                    </p>
                </div>

                <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                    {orders.length} {orders.length === 1 ? "order" : "orders"}
                </span>
            </div>

            <div className="space-y-5">
                {orders.map((order: Order) => (
                    <OrderCard
                        key={order._id}
                        order={order}
                        onCancel={handleCancelOrder}
                        isCancelling={isCancelling}
                    />
                ))}
            </div>
        </section>
    );
}

export default GetOrders;