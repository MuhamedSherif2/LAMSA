
"use client";

import { useState } from "react";
import AddCoupon from "@/features/super-admin/coupon/_component/AddCoupon";
import GetAllCoupons from "@/features/super-admin/coupon/_component/GetAllCoupons";
import type { Coupon } from "@/types/coupon.types";

function Page() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const handleAdd = () => {
    setSelectedCoupon(null);
    setIsFormOpen(true);
  };

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsFormOpen(true);
  };

  return (
    <section className="space-y-6 p-4 md:p-6">
      <AddCoupon
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        coupon={selectedCoupon}
        onAdd={handleAdd}
      />

      <GetAllCoupons onEdit={handleEdit} />
    </section>
  );
}

export default Page;
