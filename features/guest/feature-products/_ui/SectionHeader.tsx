import { ArrowRight } from "lucide-react";
import Link from "next/link";

function SectionHeader(){
    return(
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
        <div>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">
                Curated for you
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Featured{" "}
                <span className="font-serif italic font-normal text-primary">
                    Collection
                </span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                Discover our handpicked favorites, selected to
                bring style and elegance to your everyday look.
            </p>
        </div>

        <Link
            href="/products"
            className="group inline-flex w-fit items-center gap-2 border-b border-primary pb-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
            See All Products
            <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
            />
        </Link>
    </div>
    )
}
export default SectionHeader;