
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import Loading from "@/components/ui/loading";
import { useGetAllBannersQuery } from "@/store/slices/bannerSlice";
import { useTranslations } from "next-intl";

function GetBanner() {
  const t = useTranslations('BannerPage');

  const { data, isLoading, isError } = useGetAllBannersQuery();
  const banners = data?.data ?? [];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= banners.length && banners.length > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [banners.length]);

  const previousBanner = () => {
    setActiveIndex((current) =>
      current === 0 ? banners.length - 1 : current - 1
    );
  };

  if (isLoading) {
    return (
      <section className="bg-background px-4 py-6 sm:px-6">
        <div className="mx-auto h-120 max-w-[1600px] animate-pulse rounded-3xl bg-muted sm:h-150" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 py-16 text-center sm:px-6">
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t load the collection. Please try again later.
        </p>
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section className="flex min-h-105 items-center justify-center bg-background px-6">
        <div className="text-center">
          <Sparkles className="mx-auto mb-4 size-8 text-accent" />
          <h1 className="text-3xl font-semibold tracking-tight">
            Discover LAMSA
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Timeless style. Everyday elegance.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Explore Collection
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background px-3 pb-5 pt-3 sm:px-6 sm:pb-8 sm:pt-5">
      <div className="relative mx-auto max-w-[1600px]">
        <div className="group relative isolate min-h-140 overflow-hidden rounded-[1.5rem] bg-neutral-900 sm:min-h-162.5 sm:rounded-[2rem] lg:min-h-[min(760px,calc(100svh-100px))]">
          {/* Banner Images */}
          {banners.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeIndex
                  ? "z-0 opacity-100"
                  : "z-[-1] opacity-0"
              }`}
              aria-hidden={index !== activeIndex}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center transition-transform duration-7000 ease-out"
              />
            </div>
          ))}

          {/* Image Overlay */}
          <div className="absolute inset-0 z-0 bg-linear-to-r from-black/80 via-black/45 to-black/5" />
          <div className="absolute inset-0 z-0 bg-linear-to-t from-black/40 via-transparent to-black/10" />

          {/* Content */}
          <div className="relative z-10 flex min-h-140 flex-col justify-between p-6 text-white sm:min-h-162.5 sm:p-10 lg:min-h-[min(760px,calc(100svh-100px))] lg:p-16 xl:p-20">
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] backdrop-blur-md sm:text-xs">
                <Sparkles className="size-3.5 text-[#C9A96E]" />
                The LAMSA Collection
              </div>

              <span className="text-xs font-medium tracking-[0.2em] text-white/80 sm:text-sm">
                {String(activeIndex + 1).padStart(2, "0")}{" "}
                <span className="mx-1 text-white/40">/</span>{" "}
                {String(banners.length).padStart(2, "0")}
              </span>
            </div>

            <div
              key={activeIndex}
              className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-[#D9BD8A] sm:text-sm">
                Style that speaks for you
              </p>

              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
                {banners[activeIndex]?.title}
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                {/* {t('description')} */}
              </p>

              <Link
                href={banners[activeIndex]?.link || "/products"}
                className="group/cta mt-8 inline-flex min-h-12 items-center gap-5 rounded-full bg-[#F5F1E8] px-6 py-3 text-sm font-semibold text-[#171717] transition duration-300 hover:bg-[#C9A96E] sm:mt-10 sm:px-8"
              >
                Explore Collection
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetBanner;