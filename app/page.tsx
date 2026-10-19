'use client';

import { Marquee } from "@/features/guest/home/_components/Marquee";
import AddTestimonialsUser from "@/features/guest/testimoniols/_components/AddTestimonialsUser";
import GetTestimonialsUser from "@/features/guest/testimoniols/_components/GetTestimonialsUser";
import Image from "next/image";

export default function Home() {
  return (
    <main>

      <Marquee />
      <AddTestimonialsUser />
      <GetTestimonialsUser />
    </main>
  );
}
