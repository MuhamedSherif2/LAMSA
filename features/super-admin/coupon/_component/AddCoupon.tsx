
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CouponForm from "../_ui/CouponForm";
import type { Coupon } from "@/types/coupon.types";

interface AddCouponProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coupon: Coupon | null;
  onAdd: () => void;
}

function AddCoupon({
  open,
  onOpenChange,
  coupon,
  onAdd,
}: AddCouponProps) {
  return (
    <>
      <Button onClick={onAdd}>Add Coupon</Button>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {coupon ? "Update Coupon" : "Add New Coupon"}
            </DialogTitle>
          </DialogHeader>

          <CouponForm
            coupon={coupon}
            onSuccess={() => onOpenChange(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCoupon;
