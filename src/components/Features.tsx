"use client";

import { getOptimizedUrl } from "@/lib/images";
import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("Features");

  const features = [
    {
      title: t("features.guides.title"),
      description: t("features.guides.description"),
    },
    {
      title: t("features.unique.title"),
      description: t("features.unique.description"),
    },
    {
      title: t("features.prices.title"),
      description: t("features.prices.description"),
    },
  ];

  return (
    <section className="bg-sky-500 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-sky-200 bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-800">
              {t("badge")}
            </div>

            <h2 className="mb-8 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
              {t("title.line1")}
              <br />
              {t("title.line2")}
            </h2>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <h3 className="mb-2 text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Galería de Fotos */}
          <div className="relative flex flex-col items-center gap-8 md:items-end">
            {/* Foto Principal */}
            <div className="w-full max-w-md rotate-1 transform rounded-2xl bg-white p-4 shadow-xl transition-transform hover:rotate-0">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-100">
                <img
                  src={getOptimizedUrl("https://images.unsplash.com/photo-1553521565-c7e0ae586632?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                  alt={t("images.guidesAlt")}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Foto Secundaria */}
            <div className="-mt-12 w-3/4 max-w-xs -rotate-2 transform rounded-2xl bg-white p-3 shadow-xl transition-transform hover:rotate-0 md:-mt-16 md:mr-12">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-100">
                <img
                  src={getOptimizedUrl("https://images.unsplash.com/photo-1595450653862-394dfc73053d?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                  alt={t("images.boatAlt")}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}