
import AddTestimonialsUser from "@/features/guest/testimoniols/_components/AddTestimonialsUser";
import GetTestimonialsUser from "@/features/guest/testimoniols/_components/GetTestimonialsUser";

function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-border bg-secondary/40 px-4 py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 size-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent sm:text-sm">
            The LAMSA Community
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Stories That <span className="text-accent">Inspire</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Every experience matters. Discover what our community thinks
            about LAMSA and share your own experience with us.
          </p>
        </div>
      </section>

      {/* Testimonial Form */}
      <div className="px-4 py-12 sm:py-16">
        <AddTestimonialsUser />
      </div>

      {/* Testimonials List */}
      <div className="border-t border-border bg-secondary/20 px-4 py-14 sm:py-20">
        <GetTestimonialsUser />
      </div>
    </main>
  );
}

export default Page;