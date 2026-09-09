"use client";

import { Link } from "@/i18n/routing";
import { getOptimizedUrl } from "@/lib/images";
import { ArrowRight, BadgeCheck, CreditCard, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CustomTour() {
  const t = useTranslations("CustomTour");

  return (
    <section className="bg-emerald-900 px-4 py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* CONTENT */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-emerald-800/80 px-4 py-1.5 text-sm font-semibold text-emerald-200">
              <BadgeCheck className="h-4 w-4 text-emerald-400" />
              {t("badge")}
            </div>

            <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {t("title.line1")}{" "}
              <span className="text-emerald-300">
                {t("title.highlight")}
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-emerald-100">
              <p>{t("description.paragraph1")}</p>
              <p>{t("description.paragraph2")}</p>
              <p>{t("description.paragraph3")}</p>
              <p>{t("description.paragraph4")}</p>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={"/contacto"}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-emerald-950 shadow-md transition-all hover:bg-emerald-100"
              >
                {t("buttons.quote")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={"/cotiza"}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-700 bg-emerald-800 px-6 py-3.5 font-bold text-white transition-all hover:bg-emerald-700"
              >
                <CreditCard className="h-5 w-5" />
                {t("buttons.pay")}
              </Link>
            </div>
          </div>

          {/* GALLERY IMAGE CARD */}
          <div className="rounded-2xl bg-white p-4 shadow-xl md:p-6">
            <div className="relative overflow-hidden rounded-xl border border-slate-100">
              <img
                src={getOptimizedUrl("https://images.unsplash.com/photo-1633983064242-4e8f41502420?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt={t("imageAlt")}
                className="h-[350px] w-full object-cover md:h-[450px]"
              />

              {/* FLOATING CARD */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-slate-100 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {t("floatingCard.label")}
                    </p>
                    <h3 className="text-base font-bold text-slate-900">
                      {t("floatingCard.title")}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}