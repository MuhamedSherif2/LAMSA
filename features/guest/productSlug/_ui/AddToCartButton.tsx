
"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useAddToCartMutation } from "@/store/slices/cartSlice";
import type { Product } from "@/types/product.types";

interface IProps {
    data: Product;
    quantity: number;
    size: string;
    color: string;
}

function AddToCartButton({
    data,
    quantity,
    size,
    color,
}: IProps) {
    const [addToCart, { isLoading }] = useAddToCartMutation();

    const handleAddToCart = async () => {
        if (data.stock <= 0) {
            toast.error("This product is out of stock.");
            return;
        }

        if (quantity < 1 || quantity > data.stock) {
            toast.error("Please select a valid quantity.");
            return;
        }

        if (data.sizes?.length > 0 && !size) {
            toast.error("Please select a size.");
            return;
        }

        if (data.colors?.length > 0 && !color) {
            toast.error("Please select a color.");
            return;
        }

        try {
            const response = await addToCart({
                productId: data._id,
                quantity,
                ...(size && { size }),
                ...(color && { color }),
            }).unwrap();

            toast.success(
                response.message || "Product added to cart successfully!"
            );
        } catch {
            toast.error(
                "Failed to add product to cart. Please try again."
            );
        }
    };

    return (
        <Button
            type="button"
            disabled={data.stock <= 0 || isLoading}
            onClick={handleAddToCart}
            className="h-12 flex-1 rounded-xl text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
            {isLoading ? (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
            ) : (
                <ShoppingBag className="mr-2 size-4" />
            )}

            {isLoading ? "Adding..." : "Add to Cart"}
        </Button>
    );
}

export default AddToCartButton;
