'use client';

import Nav from "@/components/commonComponents/user/Nav";
import { Marquee } from "@/features/guest/home/_components/Marquee";
import AddTestimonialsUser from "@/features/guest/testimoniols/_components/AddTestimonialsUser";
import GetTestimonialsUser from "@/features/guest/testimoniols/_components/GetTestimonialsUser";

export default function Home() {
  return (
    <main>
      <Marquee />
      <AddTestimonialsUser />
      <GetTestimonialsUser />
    </main>
  );
}
