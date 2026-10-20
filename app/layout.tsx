import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "@/style/globals.css";
import { Noto_Sans, Stack_Sans_Text } from "next/font/google";
import ReduxProvider from "@/providers/ReduxProvider";
import UserNavbar from "@/components/commonComponents/user/UserNavbar";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

const stackSans = Stack_Sans_Text({
  subsets: ["latin"],
  variable: "--font-stack-sans",
});

export const metadata: Metadata = {
  title: "Lamsa",
  description: "Lamsa online store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${notoSans.variable} ${stackSans.variable}`}
    >
      <body>
        <ReduxProvider>
          <UserNavbar />
          {children}
          <Toaster position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}