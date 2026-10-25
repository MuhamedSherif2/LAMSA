import "@/style/globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { CookiesNextProvider } from "cookies-next";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { Noto_Sans, Stack_Sans_Text } from "next/font/google";

import UserNavbar from "@/components/commonComponents/user/UserNavbar";
import { Metadata } from "next";

// export async function generateMetadata(): Promise<Metadata> {
//   const locale = await getLocale();
//   const faviconExists = existsSync(
//     join(process.cwd(), "public", "favicon.ico"),
//   );
//   const appleTouchIconExists = existsSync(
//     join(process.cwd(), "public", "apple-touch-icon.png"),
//   );

//   const icons: Metadata["icons"] = {};

//   if (faviconExists) {
//     icons.icon = [{ url: "/favicon.ico", type: "image/x-icon" }];
//     icons.shortcut = [{ url: "/favicon.ico" }];
//   }

//   if (appleTouchIconExists) {
//     icons.apple = [{ url: "/apple-touch-icon.png", sizes: "180x180" }];
//   }

//   return {
//     metadataBase: new URL(siteUrl),
//     title: "Khamato - Building & Finishing Materials Marketplace Egypt",
//     description:
//       "Khamato is Egypt's leading online marketplace for building and finishing materials. Shop 10,000+ products including cement, steel, electrical supplies, sanitary ware, paints, tiles, and decoration supplies. Fast delivery across all governorates. Secure payments. Best prices for contractors, architects, and homeowners.",
//     authors: [
//       { name: "Ahmed Doban", url: "https://ahmeddoban.vercel.app/" },
//       { name: "O-Projects", url: "https://o-projects.org/" },
//     ],
//     creator: "O-Projects Development Team",
//     publisher: "O-Projects",
//     robots: {
//       index: true,
//       follow: true,
//     },
//     appleWebApp: {
//       capable: true,
//       title: "Khamato",
//       statusBarStyle: "black-translucent",
//     },
//     alternates: {
//       canonical: getCanonicalUrl(locale, "/"),
//       languages: getLocaleAlternates("/"),
//     },
//     keywords: [
//       // Primary keywords
//       "building materials Egypt",
//       "construction supplies",
//       "finishing materials",
//       "hardware store Egypt",
//       "cement suppliers",
//       "electrical supplies Cairo",
//       "sanitary ware",
//       "paints and coatings",
//       "construction marketplace",

//       // Product-specific keywords
//       "building materials online",
//       "construction supplies online",
//       "cement price Egypt",
//       "steel rebar suppliers",
//       "paint stores Egypt",
//       "tiles and marble",
//       "plumbing supplies",
//       "electrical wires",
//       "bathroom fixtures",
//       "kitchen materials",

//       // Brand-related
//       "Khamato",
//       "building materials website",
//       "construction e-commerce",
//       "contractor supplies",
//       "home improvement Egypt",

//       // Location-based
//       "construction materials Cairo",
//       "building supplies Alexandria",
//       "finishing materials Giza",
//       "hardware stores Egypt",
//       "building materials suppliers",

//       // Audience-specific
//       "contractor building materials",
//       "architect supplies",
//       "homeowner renovation",
//       "construction wholesale",
//       "building materials for contractors",

//       // SEO long-tail
//       "buy cement online Egypt",
//       "order building materials online",
//       "best construction material prices",
//       "building and finishing marketplace",
//       "construction material delivery",
//     ],
//     icons,
//   };
// }



const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  fallback: ["Arial", "sans-serif"],
});

const stackSans = Stack_Sans_Text({
  subsets: ["latin"],
  variable: "--font-stack-sans",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Lamsa",
  description: "Lamsa online store",
};


export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<any>;
}) {
  const children = props.children;
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${notoSans.variable} ${stackSans.variable}`}
    >
      <body>
        <CookiesNextProvider>
          <NextIntlClientProvider messages={messages}>
            <ReduxProvider>
              <UserNavbar />

              <Toaster position="top-right" />
              {children}
            </ReduxProvider>
          </NextIntlClientProvider>
        </CookiesNextProvider>
      </body>
    </html>
  );
}