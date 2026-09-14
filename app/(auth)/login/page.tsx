import Link from "next/link";
import LogInForm from "@/features/auth/login/LogInForm";

export const metadata = {
  title: "Sign In | Lamsa Store",
  description: "Sign in to your Lamsa Store account",
};

function LoginPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue to Lamsa Store
            </p>
          </div>

          {/* Form */}
          <LogInForm />

          {/* Footer link */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-accent hover:underline"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;