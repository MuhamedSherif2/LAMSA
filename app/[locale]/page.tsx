'use client';

import GetBanner from "@/features/guest/banner/_components/GetBanner";
import SendMessage from "@/features/guest/contact/_components/SendMessage";
import GetFeactureProducts from "@/features/guest/feature-products/_components/GetFeactureProducts";
import { Marquee } from "@/features/guest/home/_components/Marquee";
import GetTestimonialsFroAppPage from "@/features/guest/testimoniols/_components/GetTestForPage";

export default function Home() {

  // const t = useTranslations('HomePage'); => name in json file
  // return <h1>{t('title')}</h1>; 
  return (
    <main>
      <GetBanner />
      <Marquee />
      <GetFeactureProducts />
      <GetTestimonialsFroAppPage />
      <SendMessage /> 
    </main>
  );
}
