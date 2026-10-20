
"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface IsErrorMessageProps {
  error: unknown;
  onRetry: () => void;
  isRetrying?: boolean;
}

function getErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "Something went wrong while loading messages.";
  }

  if ("data" in error) {
    const data = error.data;

    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message;
    }
  }

  if ("error" in error && typeof error.error === "string") {
    return error.error;
  }

  if ("message" in error && typeof error.message === "string") {
    return error.message;
  }

  return "Something went wrong while loading messages.";
}

export default function IsErrorMessage({
  error,
  onRetry,
  isRetrying = false,
}: IsErrorMessageProps) {
  return (
    <section className="rounded-xl border border-destructive/30 bg-card p-6 sm:p-8">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="size-7 text-destructive" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight">
          Failed to load messages
        </h2>

        <p
          role="alert"
          className="mt-2 text-sm leading-6 text-muted-foreground"
        >
          {getErrorMessage(error)}
        </p>

        <Button
          type="button"
          variant="outline"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-5"
        >
          <RefreshCw
            className={`mr-2 size-4 ${
              isRetrying ? "animate-spin" : ""
            }`}
          />
          {isRetrying ? "Retrying..." : "Try again"}
        </Button>
      </div>
    </section>
  );
}
