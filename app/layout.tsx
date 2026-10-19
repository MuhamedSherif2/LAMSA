import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "@/style/globals.css";
import { Noto_Sans, Stack_Sans_Text } from "next/font/google";
import Nav from "@/components/commonComponents/user/Nav";
import ReduxProvider from "@/providers/ReduxProvider";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans",
  display: "swap",
});

const stackSans = Stack_Sans_Text({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-stack-sans",
  display: "swap",
});
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
    <html lang="en" suppressHydrationWarning className={`${notoSans.variable} ${stackSans.variable}`}>
      <body>
        <ReduxProvider>
          <Nav />
          {children}

          <Toaster position="top-center"
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
        </ReduxProvider>
      </body>
    </html>
  );
}