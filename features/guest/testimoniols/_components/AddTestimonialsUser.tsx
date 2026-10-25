
"use client";

import { useState, type FormEvent } from "react";
import { toast } from "react-hot-toast";
import {
  ArrowRight,
  LoaderCircle,
  MessageSquareQuote,
  Send,
  UserRound,
  Sparkles,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCreateTestimonialMutation } from "@/store/slices/testimonialSlice";

function AddTestimonialsUser() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [createTestimonial, { isLoading }] =
    useCreateTestimonialMutation();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !message.trim()) {
      toast.error("Please enter your name and feedback.");
      return;
    }

    try {
      await createTestimonial({
        name: name.trim(),
        message: message.trim(),
      }).unwrap();

      setName("");
      setMessage("");

      toast.success("Thank you! Your feedback has been submitted.");
    } catch (error) {
      console.error("Failed to submit feedback:", error);

      if (typeof error === "object" && error !== null && "data" in error) {
        console.error("Backend error:", error.data);
      }

      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  const inputStyles =
    "h-12 rounded-xl border-border bg-background px-4 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20";

  return (
    <section className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-8 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <MessageSquareQuote className="size-6" />
          </div>

          <div className="min-w-0">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <Sparkles className="size-3.5" />
              Your voice matters
            </p>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Share Your Experience
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Tell us about your experience. Your feedback helps us make
              LAMSA even better.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="testimonial-name" className="text-sm font-medium">
              Your name <span className="text-accent">*</span>
            </Label>

            <div className="relative">
              <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="testimonial-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
                maxLength={100}
                required
                className={`${inputStyles} pl-10`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label
                htmlFor="testimonial-message"
                className="text-sm font-medium"
              >
                Your feedback <span className="text-accent">*</span>
              </Label>

              <span className="text-xs tabular-nums text-muted-foreground">
                {message.length}/1000
              </span>
            </div>

            <textarea
              id="testimonial-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell us what you loved about your experience..."
              rows={5}
              maxLength={1000}
              required
              className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
            />

            <p className="text-xs leading-5 text-muted-foreground">
              Your opinion matters to us. Thank you for sharing it.
            </p>
          </div>

          <div className="border-t border-border pt-5">
            <Button
              type="submit"
              disabled={isLoading}
              className="group h-12 w-full gap-2 rounded-xl bg-primary font-medium text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed sm:w-auto sm:min-w-48"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Submit Feedback
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddTestimonialsUser;
