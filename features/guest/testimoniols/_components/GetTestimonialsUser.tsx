"use client";

import Loading from "@/components/ui/loading";
import { useGetAllTestimonialsQuery } from "@/store/slices/testimonialSlice";

function GetTestimonialsUser() {
  const { data, isError, error, isLoading } = useGetAllTestimonialsQuery();

  if (isLoading) return <Loading />;

  if (isError) {
    console.error("Failed to load testimonials:", error);

    return (
      <p className="rounded-lg border border-destructive p-4 text-destructive">
        Failed to load testimonials.
      </p>
    );
  }

  const testimonials = data?.data ?? [];

  if (testimonials.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          No Testimonials Yet
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Be the first to share your feedback!
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">
          What People Say
        </h2>
        <p className="mt-2 text-muted-foreground">
          Feedback and experiences shared by our users.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial._id}
            className="rounded-xl border border-border bg-card p-6 text-card-foreground transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-semibold text-accent-foreground">
                {testimonial.name.charAt(0).toUpperCase()}
              </div>

              <h3 className="font-semibold text-foreground">
                {testimonial.name}
              </h3>
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              {testimonial.message}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default GetTestimonialsUser;