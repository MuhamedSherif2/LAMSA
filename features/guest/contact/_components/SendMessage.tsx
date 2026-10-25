
"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateMessageMutation } from "@/store/slices/contactSlice";
import { useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import {
  ArrowRight,
  LoaderCircle,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  UserRound,
} from "lucide-react";

function SendMessage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [createMessage, { isLoading, isError }] =
    useCreateMessageMutation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageData = {
      name,
      email,
      phoneNumber,
      subject,
      message,
    };

    try {
      await createMessage(messageData).unwrap();

      toast.success("Message sent successfully!");

      setName("");
      setEmail("");
      setPhoneNumber("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const inputClassName =
    "h-12 rounded-xl border-border bg-background px-4 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8 lg:p-10">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <MessageSquareText className="size-6" />
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Get in touch
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-card-foreground sm:text-3xl">
              Send us a message
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Have a question or need help? Fill out the form below and
              we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="contact-name"
                className="text-sm font-medium text-card-foreground"
              >
                Full name <span className="text-accent">*</span>
              </Label>

              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  autoComplete="name"
                  className={`${inputClassName} pl-10`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="contact-email"
                className="text-sm font-medium text-card-foreground"
              >
                Email address <span className="text-accent">*</span>
              </Label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`${inputClassName} pl-10`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="contact-phoneNumber"
                className="text-sm font-medium text-card-foreground"
              >
                Phone number <span className="text-accent">*</span>
              </Label>

              <div className="relative">
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="contact-phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+20 100 000 0000"
                  autoComplete="tel"
                  className={`${inputClassName} pl-10`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="contact-subject"
                className="text-sm font-medium text-card-foreground"
              >
                Subject <span className="text-accent">*</span>
              </Label>

              <Input
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="How can we help?"
                className={inputClassName}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="contact-message"
              className="text-sm font-medium text-card-foreground"
            >
              Your message <span className="text-accent">*</span>
            </Label>

            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us a little more about how we can help you..."
              className="min-h-36 resize-y rounded-xl border-border bg-background px-4 py-3 text-sm shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
              required
            />

            <p className="text-right text-xs text-muted-foreground">
              {message.length} characters
            </p>
          </div>

          {isError && (
            <div
              role="alert"
              className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            >
              Something went wrong while sending your message. Please try
              again.
            </div>
          )}

          <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-muted-foreground">
              Your information will only be used to respond to your inquiry.
            </p>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full gap-2 rounded-xl bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-accent hover:text-accent-foreground sm:w-auto"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send Message
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendMessage;