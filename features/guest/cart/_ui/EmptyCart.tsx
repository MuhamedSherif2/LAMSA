import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

function EmptyCart() {
    return (
        <section className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-accent/10">
                <ShoppingBag className="size-9 text-accent" />
            </div>

            <h1 className="text-2xl font-semibold sm:text-3xl">
                Your cart is empty
            </h1>

            <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
                Looks like you haven&apos;t added anything to your cart yet.
                Discover something you love.
            </p>

            <Button className="mt-7 rounded-xl">
                <Link href="/products" className="flex gap-3">
                    Continue Shopping
                    <ArrowRight className="ml-2 size-4" />
                </Link>
            </Button>
        </section>
    )
}

export default EmptyCart;