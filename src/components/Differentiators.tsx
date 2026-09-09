"use client";

import { getOptimizedUrl } from "@/lib/images";
import {
  ClipboardList,
  Phone,
  MapPin,
  Heart,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function Differentiators() {
  const t = useTranslations("Differentiators");

  const items = [
    {
      icon: ClipboardList,
      title: t("items.planning.title"),
      description: t("items.planning.description"),
      image: getOptimizedUrl("https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
      icon: Phone,
      title: t("items.support.title"),
      description: t("items.support.description"),
      image: getOptimizedUrl("https://images.unsplash.com/photo-1766066014237-00645c74e9c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
      icon: MapPin,
      title: t("items.variety.title"),
      description: t("items.variety.description"),
      image: getOptimizedUrl("https://images.unsplash.com/photo-1617293347459-329ec30ef4f8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
      icon: Heart,
      title: t("items.satisfaction.title"),
      description: t("items.satisfaction.description"),
      image: getOptimizedUrl("https://images.unsplash.com/photo-1758600587880-1d11b8a08b6c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
  ];

  return (
    <section className="bg-red-600 px-4 py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4" />
            {t("badge")}
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            {t("title.line1")}{" "}
            <span className="block text-red-200">
              {t("title.highlight")}
            </span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white p-5 text-slate-900 shadow-xl transition-transform duration-300 hover:-translate-y-1"
            >
              {/* GALLERY PHOTO */}
              <div className="relative mb-5 overflow-hidden rounded-xl border-4 border-slate-100 bg-slate-100 shadow-inner">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-md">
                  <item.icon size={20} />
                </div>
              </div>

              {/* CONTENT */}
              <div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}