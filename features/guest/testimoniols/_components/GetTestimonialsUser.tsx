"use client";

import Link from "next/link";
import { MessageSquareQuote,Sparkles,ArrowRight,PenLine} from "lucide-react";
import { useGetAllTestimonialsQuery } from "@/store/slices/testimonialSlice";
import IsLoading from "../_ui/IsLoading";
import IsError from "../_ui/IsError";

function GetTestimonialsUser() {
  const { data, isError, error, isLoading } =
    useGetAllTestimonialsQuery();

  const testimonials = data?.data ?? [];

  if (isLoading) {
    return <IsLoading />
  }

  if (isError) {
    console.error("Failed to load testimonials:", error);
    return <IsError />
  }

  return (
    <>
      {/* Empty state */}
      {testimonials.length === 0 ? (
        <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center sm:py-16">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <MessageSquareQuote className="size-7" />
          </div>

          <h3 className="text-xl font-semibold">
            Be the First to Share
          </h3>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            Our community is just getting started. Share your experience
            and let your voice be heard.
          </p>

          <Link
            href="/testimonials"
            className="group mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-accent/40 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <PenLine className="size-4" />
            Be the First to Review
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial._id}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 sm:p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-accent/5 blur-2xl transition-colors group-hover:bg-accent/10"
              />

              <div className="relative flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-lg font-semibold text-accent">
                    {testimonial.name?.trim().charAt(0).toUpperCase() || "L"}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-card-foreground">
                      {testimonial.name}
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      LAMSA Community
                    </p>
                  </div>
                </div>

                <MessageSquareQuote className="size-6 shrink-0 text-accent/50 transition-colors group-hover:text-accent" />
              </div>

              <div className="my-5 h-px bg-border" />

              <blockquote className="relative flex-1">
                <p className="whitespace-pre-line wrap-break-word text-sm leading-7 text-muted-foreground">
                  {testimonial.message}
                </p>
              </blockquote>

              <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent" />
                Shared with LAMSA
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default GetTestimonialsUser;