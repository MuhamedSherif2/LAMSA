
"use client";

import Link from "next/link";
import Loading from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/store/slices/orderSlice";
import type { Order, OrderStatus } from "@/types/order.types";
import { toast } from "sonner";

const orderStatuses: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function GetAdminOrders() {
  const { data, isLoading, isError, refetch } =
    useGetAllOrdersQuery();

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const orders: Order[] = data?.data ?? [];

  const handleStatusChange = async (
    orderId: string,
    orderStatus: OrderStatus,
  ) => {
    try {
      await updateOrderStatus({
        id: orderId,
        data: { orderStatus },
      }).unwrap();

      toast.success("Order status updated successfully");
    } catch {
      toast.error("Failed to update order status");
    }
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="space-y-3 rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-destructive">Failed to load orders.</p>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-lg bg-accent px-4 py-2 text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Orders Management
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage orders and view complete customer details.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Orders displayed
          </p>

          <p className="text-2xl font-bold text-foreground">
            {orders.length}
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/10"
        >
          Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-12 text-center">
          <p className="font-medium text-foreground">No orders found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            New customer orders will appear here.
          </p>
        </div>
      ) : (
        <div className="w-full min-w-0 overflow-x-auto rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order: Order) => {
                const customer =
                  typeof order.user === "string"
                    ? null
                    : order.user;

                return (
                  <TableRow key={order._id}>
                    <TableCell>
                      <span
                        className="font-mono text-xs text-muted-foreground"
                        title={order._id}
                      >
                        #{order._id.slice(-8)}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="min-w-32 space-y-1">
                        <p className="font-medium text-foreground">
                          {customer?.name ??
                            order.shippingAddress?.fullName ??
                            "Unknown customer"}
                        </p>

                        <p className="max-w-40 truncate text-xs text-muted-foreground">
                          {customer?.email ?? "No email"}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="whitespace-nowrap">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="whitespace-nowrap font-semibold text-foreground">
                        {order.finalPrice.toLocaleString("en-EG")} EGP
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <p className="whitespace-nowrap text-sm">
                          {order.paymentMethod === "CashOnDelivery"
                            ? "Cash on delivery"
                            : "Credit card"}
                        </p>

                        <span
                          className={
                            order.isPaid
                              ? "text-xs text-emerald-600"
                              : "text-xs text-orange-500"
                          }
                        >
                          {order.isPaid ? "Paid" : "Not paid"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <select
                        value={order.orderStatus}
                        disabled={isUpdating}
                        onChange={(event) =>
                          handleStatusChange(
                            order._id,
                            event.target.value as OrderStatus,
                          )
                        }
                        className="w-36 rounded-lg border border-border bg-background px-2 py-2 text-sm text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`Update status for order ${order._id}`}
                      >
                        {orderStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString(
                        "en-GB",
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <Link
                        href={`/dashboard/orders/${order._id}`}
                        className="inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Showing {orders.length} orders
      </p>
    </div>
  );
}

export default GetAdminOrders;
