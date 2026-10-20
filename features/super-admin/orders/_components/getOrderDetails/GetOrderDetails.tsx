
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetOrderByIdQuery, useUpdateOrderStatusMutation } from "@/store/slices/orderSlice";
import Loading from "@/components/ui/loading";
import type {
  Order,
  OrderItem,
  OrderStatus,
  ShippingAddress,
} from "@/types/order.types";
import { toast } from "sonner";

const orderStatuses: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
  }).format(price);
}

function formatDate(date?: string) {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Not available";

  return parsedDate.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getProduct(item: OrderItem) {
  return typeof item.product === "string" ? null : item.product;
}

function getImageUrl(product: NonNullable<ReturnType<typeof getProduct>>) {
  const firstImage = product.images?.[0];

  if (
    firstImage &&
    typeof firstImage === "object" &&
    "secure_url" in firstImage &&
    typeof firstImage.secure_url === "string"
  ) {
    return firstImage.secure_url;
  }

  return null;
}

function Detail({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="wrap-break-word font-medium text-foreground">
        {value === undefined || value === null || value === ""
          ? "—"
          : value}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-5 text-lg font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function AddressDetails({
  address,
}: {
  address: ShippingAddress;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Detail label="Full Name" value={address.fullName} />
      <Detail label="Phone Number" value={address.phoneNumber} />
      <Detail label="Country" value={address.country} />
      <Detail label="Governorate" value={address.governorate} />
      <Detail label="City" value={address.city} />
      <Detail label="Area" value={address.area} />
      <Detail label="Street" value={address.street} />
      <Detail label="Building" value={address.building} />
      <Detail label="Apartment" value={address.apartment} />
      <Detail label="Postal Code" value={address.postalCode} />

      <div className="sm:col-span-2 lg:col-span-3">
        <Detail label="Delivery Notes" value={address.notes} />
      </div>
    </div>
  );
}

export default function GetOrderDetails() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;

  const { data, isLoading, isError, error, refetch } =
    useGetOrderByIdQuery(orderId, {
      skip: !orderId,
    });

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const order: Order | undefined = data?.data;

  const handleStatusChange = async (orderStatus: OrderStatus) => {
    if (!order) return;

    try {
      await updateOrderStatus({
        id: order._id,
        data: { orderStatus },
      }).unwrap();

      toast.success("Order status updated successfully");
    } catch {
      toast.error("Failed to update order status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <main className="space-y-4 p-6">
        <Link
          href="/dashboard/orders"
          className="text-sm text-accent hover:underline"
        >
          ← Back to Orders
        </Link>

        <div className="rounded-xl border border-destructive/30 bg-card p-6">
          <h1 className="font-semibold text-foreground">
            Failed to load order details
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Check your connection or try again.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="space-y-4 p-6">
        <Link
          href="/dashboard/orders"
          className="text-sm text-accent hover:underline"
        >
          ← Back to Orders
        </Link>
        <p className="rounded-xl border border-border bg-card p-6 text-foreground">
          Order not found.
        </p>
      </main>
    );
  }

  const customer =
    typeof order.user === "string" ? null : order.user;

  return (
    <main className="space-y-6 p-4 text-foreground sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/orders"
            className="text-sm text-accent hover:underline"
          >
            ← Back to Orders
          </Link>

          <h1 className="mt-3 text-2xl font-bold">
            Order Details
          </h1>

          <p className="mt-1 break-all text-sm text-muted-foreground">
            Order ID: {order._id}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <span className="text-sm text-muted-foreground">
            Order Status
          </span>

          <select
            value={order.orderStatus}
            disabled={isUpdating}
            onChange={(event) =>
              handleStatusChange(event.target.value as OrderStatus)
            }
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 sm:w-48"
          >
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Customer */}
      <Section title="Customer Information">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Detail
            label="Customer Name"
            value={customer?.name ?? order.shippingAddress.fullName}
          />
          <Detail label="Email" value={customer?.email} />
          <Detail
            label="Phone Number"
            value={
              customer?.phoneNumber ??
              order.shippingAddress.phoneNumber
            }
          />
        </div>
      </Section>

      {/* Shipping Address */}
      <Section title="Shipping Address">
        <AddressDetails address={order.shippingAddress} />
      </Section>

      {/* Products */}
      <Section title={`Products (${order.items.length})`}>
        <div className="space-y-4">
          {order.items.map((item, index) => {
            const product = getProduct(item);
            const imageUrl = product ? getImageUrl(product) : null;

            return (
              <div
                key={product?._id ?? `${String(item.product)}-${index}`}
                className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product?.name ?? "Product"}
                    className="h-24 w-24 rounded-lg border border-border object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs text-muted-foreground">
                    No image
                  </div>
                )}

                <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Detail
                    label="Product"
                    value={product?.name ?? "Product unavailable"}
                  />
                  <Detail label="Quantity" value={item.quantity} />
                  <Detail
                    label="Unit Price"
                    value={formatPrice(item.price)}
                  />
                  <Detail
                    label="Subtotal"
                    value={formatPrice(item.price * item.quantity)}
                  />
                  <Detail label="Size" value={item.size} />
                  <Detail label="Color" value={item.color} />
                  <Detail
                    label="Coupon"
                    value={item.couponCode}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Invoice */}
      <Section title="Invoice Summary">
        <div className="ml-auto max-w-md space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">
              Products Total
            </span>
            <span className="font-medium">
              {formatPrice(order.totalPrice)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-medium text-destructive">
              -{formatPrice(order.discountAmount)}
            </span>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold">Final Price</span>
              <span className="text-xl font-bold text-accent">
                {formatPrice(order.finalPrice)}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Shipping fees are not displayed separately because the
          current Order type does not define a shipping-fee field.
        </p>
      </Section>

      {/* Payment */}
      <Section title="Payment Information">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Detail
            label="Payment Method"
            value={order.paymentMethod}
          />
          <Detail
            label="Payment Status"
            value={order.isPaid ? "Paid" : "Not paid"}
          />
          <Detail
            label="Paid At"
            value={order.paidAt ? formatDate(order.paidAt) : "—"}
          />
        </div>
      </Section>

      {/* Timeline */}
      <Section title="Order Timeline">
        <div className="grid gap-5 sm:grid-cols-2">
          <Detail
            label="Created At"
            value={formatDate(order.createdAt)}
          />
          <Detail
            label="Last Updated"
            value={formatDate(order.updatedAt)}
          />
        </div>
      </Section>
    </main>
  );
}
