
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  useCreateCouponMutation,
  useUpdateCouponMutation,
} from "@/store/slices/couponSlice";

import type { Coupon } from "@/types/coupon.types";
import { toast } from "sonner";

interface CouponFormProps {
  coupon: Coupon | null;
  onSuccess: () => void;
}

function CouponForm({ coupon, onSuccess }: CouponFormProps) {
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [createCoupon, { isLoading: isCreating }] =
    useCreateCouponMutation();

  const [updateCoupon, { isLoading: isUpdating }] =
    useUpdateCouponMutation();

  const isEditing = Boolean(coupon);
  const isSubmitting = isCreating || isUpdating;

  // Fill the form when editing, or reset it when adding.
  useEffect(() => {
    if (coupon) {
      setCode(coupon.code);
      setDiscountPercentage(
        String(coupon.discountPercentage)
      );
      setExpireDate(
        new Date(coupon.expireDate).toISOString().slice(0, 10)
      );
      setIsActive(coupon.isActive);
    } else {
      setCode("");
      setDiscountPercentage("");
      setExpireDate("");
      setIsActive(true);
    }
  }, [coupon]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const percentage = Number(discountPercentage);

    if (!code.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    if (!Number.isFinite(percentage) || percentage < 1 || percentage > 100) {
      toast.error("Discount must be between 1 and 100");
      return;
    }

    if (!expireDate || Number.isNaN(Date.parse(expireDate))) {
      toast.error("Please select a valid expiration date");
      return;
    }

    try {
      if (coupon) {
        await updateCoupon({
          id: coupon._id,
          data: {
            code: code.trim(),
            discountPercentage: percentage,
            expireDate,
            isActive,
          },
        }).unwrap();

        toast.success("Coupon updated successfully");
      } else {
        await createCoupon({
          code: code.trim(),
          discountPercentage: percentage,
          expireDate,
        }).unwrap();

        toast.success("Coupon created successfully");
      }

      onSuccess();
    } catch {
      toast.error(
        coupon
          ? "Failed to update coupon"
          : "Failed to create coupon"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="coupon-code">Coupon Code</Label>
        <Input
          id="coupon-code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="e.g. SUMMER20"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="discount">Discount Percentage (%)</Label>
        <Input
          id="discount"
          type="number"
          min={1}
          max={100}
          value={discountPercentage}
          onChange={(event) =>
            setDiscountPercentage(event.target.value)
          }
          placeholder="20"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expire-date">Expiration Date</Label>
        <Input
          id="expire-date"
          type="date"
          value={expireDate}
          onChange={(event) => setExpireDate(event.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      {isEditing && (
        <div className="flex items-center gap-3">
          <input
            id="coupon-active"
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
            disabled={isSubmitting}
            className="size-4 accent-primary"
          />

          <Label htmlFor="coupon-active">
            Active Coupon
          </Label>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : isEditing
              ? "Update Coupon"
              : "Create Coupon"}
        </Button>
      </div>
    </form>
  );
}

export default CouponForm;
