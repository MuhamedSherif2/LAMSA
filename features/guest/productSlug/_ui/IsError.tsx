import { Button } from "@/components/ui/button";
import { ShoppingBag, } from "lucide-react";
import Link from "next/link";

function IsError(){
    return(
        <section className="flex min-h-[70vh] items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="size-7 text-muted-foreground" />
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
            Product not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Sorry, we couldn&apos;t find the product you&apos;re looking for.
          </p>

          <Button className="mt-6 w-full rounded-xl">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      </section>
    )
}
export default IsError;