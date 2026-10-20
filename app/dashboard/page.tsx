"use client";

import { Users, Package, ShoppingCart, Banknote, AlertCircle, LoaderCircle, } from "lucide-react";
import { useGetAllUsersQuery, } from "@/store/slices/userSlice";
import { useGetAllProductsQuery, } from "@/store/slices/productSlice";
import { useGetAllOrdersQuery, } from "@/store/slices/orderSlice";
import type { LucideIcon } from "lucide-react";

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 2,
    }).format(amount);

interface DashboardStat {
    label: string;
    value: string;
    description: string;
    icon: LucideIcon;
}

function Page() {
    const { data: usersResponse, isLoading: isUsersLoading, isError: isUsersError, } = useGetAllUsersQuery();

    const { data: productsResponse, isLoading: isProductsLoading, isError: isProductsError, } = useGetAllProductsQuery();

    const { data: ordersResponse, isLoading: isOrdersLoading, isError: isOrdersError, } = useGetAllOrdersQuery();

    const users = usersResponse?.data ?? [];
    const products = productsResponse?.data ?? [];
    const orders = ordersResponse?.data ?? [];
    const isLoading = isUsersLoading || isProductsLoading || isOrdersLoading;
    const hasError = isUsersError || isProductsError || isOrdersError;


    const customersCount = users.filter((user) => user.role === "user").length;
    const productsCount = products.length;
    const ordersCount = orders.length;
    const totalSales = orders.reduce((total, order) => {
        const status = String(order.orderStatus ?? "").toLowerCase();

        if (status === "cancelled" || status === "canceled") {
            return total;
        }

        return total + (Number(order.totalPrice) || 0);
    }, 0);

    const stats: DashboardStat[] = [
        {
            label: "Total Sales",
            value: formatCurrency(totalSales),
            description: "Excluding cancelled orders",
            icon: Banknote,
        },
        {
            label: "Orders",
            value: ordersCount.toLocaleString("en-EG"),
            description: "Orders returned by the API",
            icon: ShoppingCart,
        },
        {
            label: "Products",
            value: productsCount.toLocaleString("en-EG"),
            description: "Products returned by the API",
            icon: Package,
        },
        {
            label: "Customers",
            value: customersCount.toLocaleString("en-EG"),
            description: "Registered customer accounts",
            icon: Users,
        },
    ];

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Welcome back to Lamsa Store admin panel.
                </p>
            </div>

            {hasError && (
                <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm"
                >
                    <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />

                    <div>
                        <p className="font-medium">
                            Unable to load all dashboard data
                        </p>

                        <p className="mt-1 text-muted-foreground">
                            One or more requests failed. Please check your connection
                            and try again.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-border bg-card p-5 transition-colors"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm text-muted-foreground">
                                    {stat.label}
                                </p>

                                <div className="rounded-lg bg-accent/10 p-2 text-accent">
                                    <Icon className="size-5" />
                                </div>
                            </div>

                            <div className="mt-4">
                                {isLoading ? (
                                    <LoaderCircle
                                        className="size-6 animate-spin text-accent"
                                        aria-label="Loading statistics"
                                    />
                                ) : hasError ? (
                                    <p className="text-xl font-semibold text-muted-foreground">
                                        —
                                    </p>
                                ) : (
                                    <p className="wrap-break-word text-2xl font-semibold tracking-tight">
                                        {stat.value}
                                    </p>
                                )}

                                <p className="mt-2 text-xs text-muted-foreground">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Page;