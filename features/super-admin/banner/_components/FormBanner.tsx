"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  useCreateBannerMutation,
  useUpdateBannerMutation,
} from "@/store/slices/bannerSlice";
import type { Banner } from "@/types/banner.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormBannerProps {
  initialData: Banner | null;
  onCancelEdit: () => void;
}

function FormBanner({ initialData, onCancelEdit }: FormBannerProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [createBanner, { isLoading: isCreating }] =
    useCreateBannerMutation();

  const [updateBanner, { isLoading: isUpdating }] =
    useUpdateBannerMutation();

  const isEditing = initialData !== null;
  const isLoading = isCreating || isUpdating;

  // Fill the existing form when a banner is selected for editing
  useEffect(() => {
    setTitle(initialData?.title ?? "");
    setLink(initialData?.link ?? "");
    setImage(null);
  }, [initialData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!title.trim() || !link.trim()) {
      alert("Please enter the title and link.");
      return;
    }

    try {
      if (initialData) {
        await updateBanner({
          id: initialData._id,
          data: {
            title: title.trim(),
            link: link.trim(),
            ...(image ? { image } : {}),
          },
        }).unwrap();

        alert("Banner updated successfully.");
      } else {
        if (!image) {
          alert("Please select a banner image.");
          return;
        }

        await createBanner({
          title: title.trim(),
          link: link.trim(),
          image,
        }).unwrap();

        alert("Banner created successfully.");
      }

      setTitle("");
      setLink("");
      setImage(null);
      form.reset();

      if (initialData) {
        onCancelEdit();
      }
    } catch (error) {
      console.error("Failed to save banner:", error);

      if (typeof error === "object" && error !== null && "data" in error) {
        console.error("Backend error:", error.data);
      }

      alert(isEditing ? "Failed to update banner." : "Failed to create banner.");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setLink("");
    setImage(null);
    onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-border bg-card p-5 text-card-foreground"
    >
      <h2 className="text-lg font-semibold">
        {isEditing ? "Edit Banner" : "Add New Banner"}
      </h2>

      <div className="space-y-2">
        <Label htmlFor="banner-title">Title</Label>
        <Input
          id="banner-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter banner title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="banner-link">Link</Label>
        <Input
          id="banner-link"
          type="text"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          placeholder="Enter destination URL"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="banner-image">
          Banner Image {isEditing && "(Optional)"}
        </Label>
        <Input
          id="banner-image"
          type="file"
          accept="image/*"
          onChange={(event) =>
            setImage(event.target.files?.[0] ?? null)
          }
          required={!isEditing}
        />
        {isEditing && (
          <p className="text-sm text-muted-foreground">
            Leave empty to keep the current image.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isLoading
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Banner"}
        </Button>

        {isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default FormBanner;