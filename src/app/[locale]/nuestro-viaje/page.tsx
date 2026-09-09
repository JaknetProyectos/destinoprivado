"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { Mountain, Compass, Sparkles } from "lucide-react";
import { getOptimizedUrl } from "@/lib/images";

export default function NosotrosPage() {
  const t = useTranslations("OurTravel");

  const missionParagraphs = t.raw(
    "mission.paragraphs"
  ) as string[];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1564762332974-5bf63a654c9d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t("hero.imageAlt")}
                className="h-full w-full object-cover opacity-40"
              />
            </div>

            <div className="relative z-10 px-6 py-20 md:px-14 md:py-28 lg:px-20 lg:py-32">
              <div className="max-w-4xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-400 px-4 py-1.5 text-slate-900 shadow-sm">
                  <Sparkles size={16} />
                  <span className="text-sm font-bold tracking-wide">
                    {t("hero.badge")}
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
                  {t("hero.title")}
                </h1>

                <p className="max-w-3xl text-lg text-slate-200 md:text-2xl">
                  {t("hero.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
            {/* LEFT */}
            <div className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex shrink-0 h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/20">
                    <Mountain size={28} />
                  </div>

                  <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                    {t("mission.title")}
                  </h2>
                </div>

                <div className="space-y-4">
                  {missionParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="sticky top-10">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                  <img
                    src={getOptimizedUrl("https://images.unsplash.com/photo-1574493264149-87880133a2ba?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                    alt={t("sideCard.imageAlt")}
                    className="h-[550px] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-slate-900/60" />

                  <div className="absolute bottom-0 p-8 text-white md:p-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-1.5 text-white shadow-sm">
                      <Compass size={16} />
                      <span className="text-sm font-bold">
                        {t("sideCard.badge")}
                      </span>
                    </div>

                    <h3 className="mb-3 text-2xl font-bold leading-tight md:text-3xl">
                      {t("sideCard.title")}
                    </h3>

                    <p className="text-base leading-relaxed text-slate-200">
                      {t("sideCard.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}