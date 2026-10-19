
"use client";

import {
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
} from "@/store/slices/couponSlice";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import type { Coupon } from "@/types/coupon.types";
import { toast } from "sonner";

interface GetAllCouponsProps {
  onEdit: (coupon: Coupon) => void;
}

function GetAllCoupons({ onEdit }: GetAllCouponsProps) {
  const { data, isLoading, isError, refetch } =
    useGetAllCouponsQuery();

  const [deleteCoupon, { isLoading: isDeleting }] =
    useDeleteCouponMutation();

  // Assumes ApiResponseWithCount returns the list in data.data.
  const coupons: Coupon[] = data?.data ?? [];

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this coupon?"
    );

    if (!confirmed) return;

    try {
      await deleteCoupon(id).unwrap();
      toast.success("Coupon deleted successfully");
    } catch {
      toast.error("Failed to delete coupon");
    }
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="space-y-3 py-6">
        <p className="text-sm text-destructive">
          Failed to load coupons.
        </p>

        <Button variant="outline" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">All Coupons</h2>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Expiration Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {coupons.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  No coupons found.
                </TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon) => (
                <TableRow key={coupon._id}>
                  <TableCell className="font-medium">
                    {coupon.code}
                  </TableCell>

                  <TableCell>
                    {coupon.discountPercentage}%
                  </TableCell>

                  <TableCell>
                    {new Date(
                      coupon.expireDate
                    ).toLocaleDateString("en-GB")}
                  </TableCell>

                  <TableCell>
                    <span
                      className={
                        coupon.isActive
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {coupon.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(coupon)}
                      >
                        Update
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={() => handleDelete(coupon._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-muted-foreground">
        Total coupons: {data?.count ?? coupons.length}
      </p>
    </div>
  );
}

export default GetAllCoupons;
