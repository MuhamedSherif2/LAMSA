"use client";

import { Button } from "@/components/ui/button";
import { Heart, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useAddToWishlistMutation } from "@/store/slices/wishlistSlice";

interface IProps {
  data: {
    _id: string;
  };
}

function AddToWishlistButton({ data }: IProps) {
  const [addToWishlist, { isLoading }] = useAddToWishlistMutation();

  const handleAddToWishlist = async () => {
    try {
      const response = await addToWishlist({
        productId: data._id,
      }).unwrap();
      toast.success(
        response.message || "Product added to wishlist successfully!"
      );
    } catch (error) {
      console.error("Add to wishlist error:", error);
      toast.error("Failed to add product to wishlist. Please try again.");
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isLoading}
      onClick={handleAddToWishlist}
      aria-label="Add to wishlist"
      className="h-12 rounded-xl border-border px-5 transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent"
    >
      {isLoading ? (
        <LoaderCircle className="mr-2 size-4 animate-spin" />
      ) : (
        <Heart className="mr-2 size-4" />
      )}

      {isLoading ? "Adding..." : "Wishlist"}
    </Button>
  );
}

export default AddToWishlistButton;