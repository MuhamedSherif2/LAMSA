
"use client";

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
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllOrdersQuery();

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  // Assumes the API response is { data: Order[] }.
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="space-y-3 rounded-lg border p-6 text-center">
        <p className="text-red-500">
          Failed to load orders.
        </p>
        <button
          onClick={() => refetch()}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        No orders found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <p className="text-sm text-muted-foreground">
          Manage customer orders and update their statuses.
        </p>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Date</TableHead>
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
                  <TableCell className="font-mono text-xs">
                    {order._id.slice(-8)}
                  </TableCell>

                  <TableCell>
                    <div className="min-w-36 space-y-1">
                      <p className="font-medium">
                        {customer?.name ?? "Unknown customer"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {customer?.email ?? "No email"}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="min-w-48 space-y-3">
                      {order.items.map((item, index) => {
                        const product =
                          typeof item.product === "string"
                            ? null
                            : item.product;

                        return (
                          <div
                            key={`${order._id}-${index}`}
                            className="space-y-1"
                          >
                            <p className="font-medium">
                              {product?.name ?? "Deleted product"}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                              {" | "}
                              Price: {item.price.toLocaleString("en-EG")} EGP
                            </p>

                            {(item.size || item.color) && (
                              <p className="text-xs text-muted-foreground">
                                {item.size && `Size: ${item.size}`}
                                {item.size && item.color && " | "}
                                {item.color && `Color: ${item.color}`}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <p>{order.paymentMethod}</p>
                      <span
                        className={
                          order.isPaid
                            ? "text-xs text-green-600"
                            : "text-xs text-orange-500"
                        }
                      >
                        {order.isPaid ? "Paid" : "Not paid"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="whitespace-nowrap font-semibold">
                    {order.finalPrice.toLocaleString("en-EG")} EGP
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
                      className="min-w-32 rounded-md border bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Update status for order ${order._id}`}
                    >
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm">
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-muted-foreground">
        Total orders: {orders.length}
      </p>
    </div>
  );
}

export default GetAdminOrders;
