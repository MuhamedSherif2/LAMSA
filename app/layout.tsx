import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "@/style/globals.css";

export const metadata: Metadata = {
  title: "Lamsa Store",
  description: "Premium clothing store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: {
              background: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid var(--border)",
            },
            success: {
              iconTheme: {
                primary: "var(--accent)",
                secondary: "var(--card)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--destructive)",
                secondary: "var(--card)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}