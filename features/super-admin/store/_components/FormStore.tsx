"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  useAddStoreSettingsMutation,
  useGetStoreSettingsQuery,
  useUpdateStoreSettingsMutation,
} from "@/store/slices/storeSlice";
import type {
  Store,
  CreateStorePayload,
} from "@/types/store.types";

interface FormStoreProps {
  initialData?: Store | null;
  onCancelEdit?: () => void;
  onSaved?: () => void;
}

const emptyForm: CreateStorePayload = {
  name: "",
  logo: "",
  phoneNumber: "",
  email: "",
  address: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  shippingPolicy: "",
  returnPolicy: "",
};

function FormStore({
  initialData,
  onCancelEdit,
  onSaved,
}: FormStoreProps) {
  const { data, refetch } = useGetStoreSettingsQuery();

  const [addStoreSettings, { isLoading: isAdding }] =
    useAddStoreSettingsMutation();

  const [updateStoreSettings, { isLoading: isUpdating }] =
    useUpdateStoreSettingsMutation();

  const store = initialData ?? data?.data ?? null;
  const isEditMode = Boolean(store);

  const [formData, setFormData] =
    useState<CreateStorePayload>(emptyForm);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (store) {
      setFormData({
        name: store.name,
        logo: store.logo,
        phoneNumber: store.phoneNumber,
        email: store.email,
        address: store.address,
        facebook: store.facebook,
        instagram: store.instagram,
        tiktok: store.tiktok,
        shippingPolicy: store.shippingPolicy,
        returnPolicy: store.returnPolicy,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [store]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (isEditMode) {
        await updateStoreSettings(formData).unwrap();
        setSuccessMessage("Store settings updated successfully.");
      } else {
        await addStoreSettings(formData).unwrap();
        setSuccessMessage("Store settings added successfully.");
      }

      await refetch();
      onSaved?.();
    } catch (error) {
      console.error("Failed to save store settings:", error);
      setErrorMessage("Failed to save store settings. Please try again.");
    }
  };

  const isSaving = isAdding || isUpdating;

  const fields: {
    name: keyof CreateStorePayload;
    label: string;
    type?: string;
  }[] = [
    { name: "name", label: "Store Name" },
    { name: "logo", label: "Logo URL", type: "url" },
    { name: "phoneNumber", label: "Phone Number", type: "tel" },
    { name: "email", label: "Email", type: "email" },
    { name: "address", label: "Address" },
    { name: "facebook", label: "Facebook URL", type: "url" },
    { name: "instagram", label: "Instagram URL", type: "url" },
    { name: "tiktok", label: "TikTok URL", type: "url" },
  ];

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground">
      <div>
        <h2 className="text-xl font-semibold">
          {isEditMode ? "Update Store Settings" : "Add Store Settings"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your store information and policies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type ?? "text"}
                value={formData[field.name]}
                onChange={handleChange}
                required={[
                  "name",
                  "logo",
                  "phoneNumber",
                  "email",
                  "address",
                ].includes(field.name)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        {formData.logo && (
          <div className="space-y-2">
            <Label>Logo Preview</Label>
            <img
              src={formData.logo}
              alt="Store logo preview"
              className="size-24 rounded-lg border border-border object-contain p-2"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="shippingPolicy">Shipping Policy</Label>
          <textarea
            id="shippingPolicy"
            name="shippingPolicy"
            value={formData.shippingPolicy}
            onChange={handleChange}
            rows={4}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            placeholder="Enter your shipping policy"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="returnPolicy">Return Policy</Label>
          <textarea
            id="returnPolicy"
            name="returnPolicy"
            value={formData.returnPolicy}
            onChange={handleChange}
            rows={4}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            placeholder="Enter your return policy"
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="text-sm text-emerald-600">{successMessage}</p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={isSaving}>
            {isSaving
              ? "Saving..."
              : isEditMode
                ? "Update Settings"
                : "Save Settings"}
          </Button>

          {onCancelEdit && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancelEdit}
              disabled={isSaving}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}

export default FormStore;