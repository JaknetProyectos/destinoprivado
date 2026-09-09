"use client";

import { Link } from "@/i18n/routing";
import { getOptimizedUrl } from "@/lib/images";
import {
  Sparkles,
  ArrowRight,
  Compass,
  MapPin,
  Globe,
  Heart,
  Camera,
} from "lucide-react";

import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  return (
    <section className="relative overflow-hidden bg-[#c50413] px-6 py-20 text-white md:py-28">
      {/* ÍCONOS BLANCOS FLOTANTES EN EL FONDO DECORATIVO */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
        <Compass size={110} className="absolute left-8 top-12 -rotate-12 text-white" />
        <Globe size={130} className="absolute bottom-10 left-1/4 rotate-45 text-white" />
        <MapPin size={90} className="absolute right-12 top-1/3 -rotate-6 text-white" />
        <Heart size={80} className="absolute bottom-12 right-1/3 rotate-12 text-white" />
        <Camera size={95} className="absolute right-16 top-10 rotate-12 text-white" />
        <Sparkles size={75} className="absolute left-1/3 top-1/2 text-white" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* CONTENT */}
          <div>
            {/* BADGE */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-white" />
              {t("badge")}
            </div>

            {/* TITLE */}
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {t("title.first")}{" "}
              <span className="inline-block rounded-3xl bg-[#035020] px-4 py-1 my-1 text-white">
                {t("title.highlight")}
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-white/90">
              {t("description")}
            </p>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href="/tours"
                className="group inline-flex items-center gap-3 rounded-3xl bg-white px-8 py-4 font-bold text-[#c50413] shadow-xl transition-all hover:bg-gray-100 hover:shadow-2xl"
              >
                <span>{t("cta")}</span>
                <ArrowRight className="h-5 w-5 text-[#c50413] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative">
            {/* IMAGE CONTAINER */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#121212] shadow-2xl">
              <img
                src={getOptimizedUrl("https://images.unsplash.com/photo-1674290844001-006bd2a9c51c?q=80&w=718&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt={t("imageAlt")}
                className="h-[420px] w-full object-cover md:h-[560px]"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent" />

              {/* FLOATING CARD */}
              <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/20 bg-[#121212]/80 p-5 text-white shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#035020] text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/80">
                      {t("card.subtitle")}
                    </p>

                    <h3 className="text-lg font-bold text-white">
                      {t("card.title")}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END IMAGE */}
        </div>
      </div>
    </section>
  );
}