"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  User,
  Calendar,
  Sparkles,
  MapPin,
  Compass,
  Palmtree,
  Globe,
  Camera,
  Sun,
} from "lucide-react";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [adults, setAdults] = useState(t("travelers.options.one"));
  const [date, setDate] = useState("");

  const destinationOptions = [
    {
      slug: "cdmx",
      label: t("destinationOptions.cdmx"),
    },
    {
      slug: "experiencias-gastronomicas",
      label: t("destinationOptions.gastronomy"),
    },
    {
      slug: "guanajuato",
      label: t("destinationOptions.guanajuato"),
    },
    {
      slug: "los-cabos",
      label: t("destinationOptions.losCabos"),
    },
    {
      slug: "oaxaca",
      label: t("destinationOptions.oaxaca"),
    },
    {
      slug: "yucatan",
      label: t("destinationOptions.yucatan"),
    },
    {
      slug: "cancun",
      label: t("destinationOptions.cancun"),
    },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!destination) return;

    router.push(`/categoria/${destination}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#035020] text-white py-16 lg:py-24">
      {/* ÍCONOS BLANCOS FLOTANTES EN EL FONDO DECORATIVO */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <Compass size={96} className="absolute top-10 left-8 text-white rotate-12" />
        <Palmtree size={110} className="absolute bottom-12 left-16 text-white -rotate-12" />
        <Globe size={120} className="absolute top-1/4 right-12 text-white rotate-45" />
        <MapPin size={80} className="absolute bottom-1/3 right-1/4 text-white -rotate-6" />
        <Sparkles size={70} className="absolute top-1/2 left-1/3 text-white" />
        <Camera size={85} className="absolute bottom-8 right-16 text-white rotate-12" />
        <Sun size={100} className="absolute top-8 right-1/3 text-white" />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {/* ELEMENTO SUPERIOR / BADGE */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white border border-white/20 mb-8">
          <Sparkles size={16} className="text-white" />
          {t("badge")}
        </div>

        {/* TÍTULO PRINCIPAL */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl leading-tight">
          {t("title.first")}{" "}
          <span className="text-[#c50413] bg-white px-3 py-1 rounded-3xl inline-block my-1">
            {t("title.highlight")}
          </span>{" "}
          {t("title.last")}
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 font-normal">
          {t("description")}
        </p>

        {/* FORMULARIO DE BÚSQUEDA */}
        <form
          onSubmit={handleSearch}
          className="mt-12 mx-auto max-w-5xl rounded-[40px] bg-[#121212] p-4 md:p-6 shadow-2xl border border-white/10"
        >
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-[1.2fr_0.9fr_0.9fr_auto]">
            {/* DESTINO */}
            <div className="flex items-center gap-3 rounded-3xl bg-[#1e1e1e] p-4 text-left border border-white/5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#035020] text-white">
                <MapPin size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {t("destination.label")}
                </p>

                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white outline-none cursor-pointer mt-1"
                >
                  <option value="" className="bg-[#1e1e1e] text-white">
                    {t("destination.placeholder")}
                  </option>

                  {destinationOptions.map((dest) => (
                    <option key={dest.slug} value={dest.slug} className="bg-[#1e1e1e] text-white">
                      {dest.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* PASAJEROS */}
            <div className="flex items-center gap-3 rounded-3xl bg-[#1e1e1e] p-4 text-left border border-white/5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c50413] text-white">
                <User size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {t("travelers.label")}
                </p>

                <select
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white outline-none cursor-pointer mt-1"
                >
                  <option className="bg-[#1e1e1e] text-white">{t("travelers.options.one")}</option>
                  <option className="bg-[#1e1e1e] text-white">{t("travelers.options.two")}</option>
                  <option className="bg-[#1e1e1e] text-white">{t("travelers.options.three")}</option>
                  <option className="bg-[#1e1e1e] text-white">{t("travelers.options.four")}</option>
                  <option className="bg-[#1e1e1e] text-white">{t("travelers.options.fivePlus")}</option>
                </select>
              </div>
            </div>

            {/* FECHA */}
            <div className="flex items-center gap-3 rounded-3xl bg-[#1e1e1e] p-4 text-left border border-white/5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#035020] text-white">
                <Calendar size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {t("date")}
                </p>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white outline-none cursor-pointer mt-1 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* BOTÓN DE BÚSQUEDA (BLANCO) */}
            <button
              type="submit"
              disabled={!destination}
              className="flex items-center justify-center gap-2 rounded-3xl bg-white px-8 py-4 font-bold text-[#035020] shadow-lg transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 min-h-[56px]"
            >
              <Search size={20} className="text-[#035020]" />
              <span>{t("search")}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}