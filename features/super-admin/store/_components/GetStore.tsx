"use client";

import { useState } from "react";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useGetStoreSettingsQuery } from "@/store/slices/storeSlice";
import type { Store } from "@/types/store.types";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import FormStore from "./FormStore";

function GetStore() {
  const { data, isLoading, isError, error, refetch } =
    useGetStoreSettingsQuery();

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <Loading />;

  const isNotFound =
    isError &&
    "status" in error &&
    error.status === 404;

  if (isError && !isNotFound) {
    console.error("Failed to load store settings:", error);

    return (
      <p className="rounded-lg border border-destructive p-4 text-destructive">
        Failed to load store settings.
      </p>
    );
  }

  const store: Store | undefined = isNotFound
    ? undefined
    : data?.data;

  if (!store) {
    return (
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 text-card-foreground">
        <div>
          <h2 className="text-xl font-semibold">
            Add Store Settings
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your store settings have not been configured yet.
          </p>
        </div>

        <FormStore
          onSaved={() => {
            refetch();
          }}
        />
      </section>
    );
  }

  if (isEditing) {
    return (
      <FormStore
        initialData={store}
        onCancelEdit={() => setIsEditing(false)}
        onSaved={() => {
          setIsEditing(false);
          refetch();
        }}
      />
    );
  }

  const details = [
    { label: "Phone Number", value: store.phoneNumber },
    { label: "Email", value: store.email },
    { label: "Address", value: store.address },
    { label: "Facebook", value: store.facebook },
    { label: "Instagram", value: store.instagram },
    { label: "TikTok", value: store.tiktok },
  ];

  return (
    <section className="space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Store Settings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your current store information.
          </p>
        </div>

        <Button onClick={() => setIsEditing(true)}>
          Edit Settings
        </Button>
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <img
          src={store.logo}
          alt={`${store.name} logo`}
          className="size-24 rounded-xl border border-border object-contain p-2"
        />

        <div>
          <h3 className="text-lg font-semibold">{store.name}</h3>
          <p className="text-sm text-muted-foreground">
            {store.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {details.map((item) => (
          <div
            key={item.label}
            className="min-w-0 space-y-1 rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted-foreground">
              {item.label}
            </p>

            {item.value ? (
              item.value.startsWith("http") ? (
                <a
                  href={item.value}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-sm text-accent underline"
                >
                  {item.value}
                </a>
              ) : (
                <p className="wrap-break-word text-sm">{item.value}</p>
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                Not provided
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-border p-4">
          <h3 className="mb-2 font-semibold">Shipping Policy</h3>
          <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
            {store.shippingPolicy || "No shipping policy provided."}
          </p>
        </div>

        <div className="rounded-lg border border-border p-4">
          <h3 className="mb-2 font-semibold">Return Policy</h3>
          <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
            {store.returnPolicy || "No return policy provided."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default GetStore;