"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { useTours } from "@/hooks/useTours";

import {
  ArrowRight,
  Compass,
  MapPin,
} from "lucide-react";

export default function Experiences() {
  const t = useTranslations("Experiences");

  const { tours, loading } = useTours({
    limit: 3,
    sortBy: "created_at",
    order: "desc",
  });

  if (loading) {
    return (
      <section
        id="tours"
        className="bg-fuchsia-600 px-4 py-16 text-slate-900 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-amber-300 text-slate-900 shadow-md">
              <Compass size={28} />
            </div>

            <h2 className="mb-3 text-3xl font-black md:text-4xl">
              {t("loading.title")}
            </h2>

            <p className="max-w-xl font-medium text-slate-900/80">
              {t("loading.description")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="tours"
      className="bg-fuchsia-600 px-4 py-16 text-slate-900 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">
              {t("title.line1")}{" "}
              <span className="underline decoration-amber-300 decoration-wavy underline-offset-4">
                {t("title.highlight")}
              </span>
            </h2>
          </div>

          <Link
            href="/tours"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-300 px-6 py-3 font-bold text-slate-900 shadow-md transition-all duration-200 hover:bg-amber-400 hover:shadow-lg"
          >
            {t("viewAll")}
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3 xl:grid-cols-3">
          {tours.map((tour) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-amber-400/40 bg-amber-300 p-4 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image with photo gallery polaroid frame style */}
              <div className="relative h-72 w-full overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-inner">
                <img
                  src={tour.image_url || ""}
                  alt={tour.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating badge */}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <Compass size={12} />
                  {t("card.badge")}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between pt-5 pb-2 px-1">
                <div>
                  <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <MapPin size={14} className="text-fuchsia-700" />
                    {tour.destination || t("card.defaultDestination")}
                  </div>

                  <h3 className="mb-2 text-2xl font-black leading-snug text-slate-900">
                    {tour.title}
                  </h3>

                  <p className="line-clamp-2 text-sm leading-relaxed text-slate-800/90 font-medium">
                    {tour.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-extrabold text-slate-900 transition-all duration-300 group-hover:gap-3">
                  {t("card.explore")}
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}