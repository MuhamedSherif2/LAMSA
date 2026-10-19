import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface IProps{
    onClick: () => void;
}

function IsErrorCart({ onClick }: IProps) {
    return (
        <section className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
            <ShoppingCart className="size-12 text-muted-foreground" />

            <h2 className="text-xl font-semibold">
                Unable to load your cart
            </h2>

            <p className="text-sm text-muted-foreground">
                Something went wrong. Please try again.
            </p>

            <Button onClick={onClick} variant="outline">
                Try Again
            </Button>
        </section>
    )
}

export default IsErrorCart