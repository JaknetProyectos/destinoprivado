"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCategories } from "@/hooks/useCategories";
import { ArrowRight, Compass, MapPin, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { getOptimizedUrl } from "@/lib/images";

const categoryImages: Record<string, string> = {
  yucatan:
    getOptimizedUrl("https://images.unsplash.com/photo-1659775226523-b31d25ddb5fa?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
  oaxaca:
    getOptimizedUrl("https://images.unsplash.com/photo-1562869929-bda0650edb1f?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
  cdmx:
    getOptimizedUrl("https://images.unsplash.com/photo-1682916114863-ba2f7b7d39c9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
  "puerto-vallarta":
    getOptimizedUrl("https://images.unsplash.com/photo-1645556655631-9764270324fa?q=80&w=663&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
  guanajuato:
    getOptimizedUrl("https://images.unsplash.com/photo-1585975985662-449adf2e7f8f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
};

const excludedSlugs = ["featured", "popular", "all", "recommended"];

export default function Destinations() {
  const t = useTranslations("Destinations");
  const { categories, loading } = useCategories();

  const filteredCategories = useMemo(() => {
    const allowedSlugs = Object.keys(categoryImages);

    return categories
      .filter(
        (category) =>
          allowedSlugs.includes(category.slug) &&
          !excludedSlugs.includes(category.slug)
      )
      .sort(
        (a, b) => allowedSlugs.indexOf(a.slug) - allowedSlugs.indexOf(b.slug)
      );
  }, [categories]);

  if (loading) {
    return (
      <section className="bg-amber-400 px-4 py-16 text-black md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-white text-black shadow-md">
            <Compass size={28} />
          </div>

          <h2 className="mb-3 text-3xl font-black md:text-4xl">
            {t("loading.title")}
          </h2>

          <p className="text-black/80">{t("loading.description")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-amber-400 px-4 py-16 text-black md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/30 px-4 py-1.5 text-sm font-semibold text-black">
            <Sparkles size={16} />
            {t("badge")}
          </div>

          <h2 className="mb-5 text-4xl font-black tracking-tight md:text-5xl">
            {t("title.line1")}{" "}
            <span className="text-fuchsia-700">{t("title.highlight")}</span>
          </h2>

          <p className="text-lg font-medium leading-relaxed text-black/80">
            {t("description")}
          </p>
        </div>

        {/* Destinations */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="group"
            >
              {/* Card con estilo de marco de foto de galería */}
              <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Visualización tipo fotografía */}
                <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 p-1">
                  <img
                    src={
                      categoryImages[category.slug] ||
                      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&auto=format&fit=crop"
                    }
                    alt={category.title}
                    className="h-full w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Contenido */}
                <div className="text-center">
                  <div className="mb-2 inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    <MapPin size={12} />
                    {t("card.label")}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {category.title}
                  </h3>

                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-fuchsia-600 transition-all duration-300 group-hover:gap-2.5">
                    {t("card.explore")}
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}