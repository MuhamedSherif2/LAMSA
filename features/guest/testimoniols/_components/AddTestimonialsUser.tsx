"use client";

import { useState, type FormEvent } from "react";

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
      alert("Please enter your name and feedback.");
      return;
    }

    try {
      await createTestimonial({
        name: name.trim(),
        message: message.trim(),
      }).unwrap();

      setName("");
      setMessage("");

      alert("Thank you! Your feedback has been submitted.");
    } catch (error) {
      console.error("Failed to submit feedback:", error);

      if (typeof error === "object" && error !== null && "data" in error) {
        console.error("Backend error:", error.data);
      }

      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <section className="mx-auto w-full max-w-xl space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Add Your Feedback</h2>
        <p className="text-sm text-muted-foreground">
          Share your experience with us.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="testimonial-name">Your Name</Label>
          <Input
            id="testimonial-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="testimonial-message">Your Feedback</Label>
          <textarea
            id="testimonial-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write your feedback..."
            rows={4}
            required
            className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isLoading ? "Submitting..." : "Submit Feedback"}
        </Button>
      </form>
    </section>
  );
}

export default AddTestimonialsUser;