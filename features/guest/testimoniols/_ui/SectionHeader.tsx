import { useGetAllTestimonialsQuery } from "@/store/slices/testimonialSlice";
import { ArrowRight, MessageSquareQuote, PenLine, Sparkles } from "lucide-react";
import Link from "next/link";

function SectionHeader() {
    const { data, isError, error, isLoading } =
        useGetAllTestimonialsQuery();

    const testimonials = data?.data ?? [];

    return (
        <>
            {/* Section heading */}
            <div className="mb-10 text-center sm:mb-14">
                <p className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                    <Sparkles className="size-3.5" />
                    Community voices
                </p>

                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    What People Say
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                    Real experiences from people who are part of our journey.
                </p>

                {testimonials.length > 0 && (
                    <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
                        <MessageSquareQuote className="size-4 text-accent" />
                        <span>
                            {testimonials.length}{" "}
                            {testimonials.length === 1 ? "testimonial" : "testimonials"}
                        </span>
                    </div>
                )}

                {/* Add testimonial button */}
                <div className="mt-7">
                    <Link
                        href="/testimonials"
                        className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                        <PenLine className="size-4" />
                        Share Your Experience
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SectionHeader;