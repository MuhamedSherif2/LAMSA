
import GetMessage from "@/features/super-admin/contact/_components/GetMessage";

function Page() {
  return (
    <main className="min-h-full space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          LAMSA Administration
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Contact Messages
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Manage customer inquiries, review incoming messages, and
          keep track of unread conversations.
        </p>
      </header>

      <GetMessage />
    </main>
  );
}
export default Page