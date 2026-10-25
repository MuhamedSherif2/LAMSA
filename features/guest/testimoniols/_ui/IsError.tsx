import { MessageSquareQuote } from "lucide-react";

function IsError(){
    return(
        <section className="mx-auto max-w-7xl px-2">
        <div
          role="alert"
          className="rounded-2xl border border-destructive/20 bg-card px-6 py-10 text-center"
        >
          <MessageSquareQuote className="mx-auto mb-4 size-9 text-destructive" />

          <h2 className="text-lg font-semibold text-foreground">
            Unable to Load Testimonials
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while loading feedback. Please try again later.
          </p>
        </div>
      </section>
    )
}
export default IsError;