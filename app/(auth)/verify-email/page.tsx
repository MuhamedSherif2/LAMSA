import { Suspense } from "react";
import VerifyEmailForm from "@/features/auth/verify-email/VerifyEmailForm";

export const metadata = {
  title: "Verify Email | Lamsa Store",
  description: "Verify your email to activate your account",
};

function VerifyEmailPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Verify Your Email
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter the 6-digit code we sent to your email
            </p>
          </div>

          <Suspense
            fallback={
              <div className="py-8 text-center text-sm text-muted-foreground">
                Loading...
              </div>
            }
          >
            <VerifyEmailForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default VerifyEmailPage;