"use client";

import { useState } from "react";
import FormBanner from "./FormBanner";
import TableBanner from "./TableBanner";
import type { Banner } from "@/types/banner.types";

function GetBanner() {
  const [selectedBanner, setSelectedBanner] =
    useState<Banner | null>(null);

  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setSelectedBanner(null);
  };

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-foreground">
          Banner Management
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Create, view, update, and delete store banners.
        </p>
      </header>

      <FormBanner
        initialData={selectedBanner}
        onCancelEdit={handleCancelEdit}
      />

      <TableBanner onEdit={handleEdit} />
    </section>
  );
}

export default GetBanner;