"use client";

import { useState } from "react";
import { useApplyCouponMutation } from "@/store/slices/couponSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { ApplyCouponResult } from "@/types/coupon.types";
import { toast } from "sonner";

interface ApplyCouponProps {
  subtotal: number;
  onApply?: (result: ApplyCouponResult | null) => void;
}

function ApplyCoupon({ subtotal, onApply }: ApplyCouponProps) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<ApplyCouponResult | null>(null);

  const [applyCoupon, { isLoading }] = useApplyCouponMutation();

  const handleCodeChange = (value: string) => {
    setCode(value);
    setResult(null);

    // Clear any previously applied coupon in Checkout.
    onApply?.(null);
  };

  const handleApplyCoupon = async () => {
    const trimmedCode = code.trim();

    if (!trimmedCode) {
      setResult(null);
      onApply?.(null);
      toast.error("Please enter a coupon code");
      return;
    }

    if (subtotal <= 0) {
      toast.error("Your subtotal must be greater than zero");
      return;
    }

    try {
      const response = await applyCoupon({
        code: trimmedCode,
        subtotal,
      }).unwrap();

      const couponResult = response.data;

      if (!couponResult) {
        throw new Error("Invalid coupon response");
      }

      setResult(couponResult);
      onApply?.(couponResult);

      toast.success("Coupon applied successfully");
    } catch (error: unknown) {
      console.error("Apply coupon error:", error);

      setResult(null);
      onApply?.(null);

      const apiError = error as {
        data?: { message?: string };
      };

      toast.error(
        apiError.data?.message || "Invalid or expired coupon"
      );
    }
  };

  const handleRemoveCoupon = () => {
    setCode("");
    setResult(null);
    onApply?.(null);

    toast.success("Coupon removed");
  };

  const formatPrice = (price: number) =>
    `${price.toLocaleString("en-EG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} EGP`;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label htmlFor="coupon-code">Coupon Code</Label>

        <div className="flex gap-2">
          <Input
            id="coupon-code"
            value={code}
            onChange={(event) => handleCodeChange(event.target.value)}
            placeholder="Enter coupon code"
            disabled={isLoading}
          />

          <Button
            type="button"
            onClick={handleApplyCoupon}
            disabled={isLoading || !code.trim()}
          >
            {isLoading ? "Applying..." : "Apply"}
          </Button>
        </div>
      </div>

      {result && (
        <div className="space-y-3 rounded-lg border border-border p-4">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Coupon</span>

            <span className="font-medium">
              {result.coupon.code}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Discount</span>

            <span className="font-medium text-green-600">
              {result.coupon.discountPercentage}%
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">
              Discount Amount
            </span>

            <span className="font-medium text-green-600">
              -{formatPrice(result.discountAmount)}
            </span>
          </div>

          <div className="flex justify-between gap-4 border-t border-border pt-3">
            <span className="font-semibold">
              Total After Discount
            </span>

            <span className="font-bold">
              {formatPrice(result.totalAfterDiscount)}
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </Button>
        </div>
      )}
    </div>
  );
}

export default ApplyCoupon;