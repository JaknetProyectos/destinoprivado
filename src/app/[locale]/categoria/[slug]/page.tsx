"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useCategory } from "@/hooks/useCategory";
import { useTours } from "@/hooks/useTours";

import { useLocale, useTranslations } from "next-intl";

import {
  MapPin,
  Clock,
  Sparkles,
  Compass,
  SlidersHorizontal,
  ChevronRight,
  Sun,
  Camera,
  Heart,
  Calendar,
} from "lucide-react";

import { Link } from "@/i18n/routing";
import { getOptimizedUrl } from "@/lib/images";

type SortBy =
  | "default"
  | "price-asc"
  | "price-desc"
  | "newest-desc"
  | "newest-asc"
  | "name";

const categoryImages: Record<string, string> = {
  yucatan:
    "https://images.unsplash.com/photo-1659775226523-b31d25ddb5fa?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  oaxaca:
    "https://images.unsplash.com/photo-1562869929-bda0650edb1f?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  cdmx:
    "https://images.unsplash.com/photo-1682916114863-ba2f7b7d39c9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "puerto-vallarta":
    "https://images.unsplash.com/photo-1645556655631-9764270324fa?q=80&w=663&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  guanajuato:
    "https://images.unsplash.com/photo-1585975985662-449adf2e7f8f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

};

export default function CategoryToursPage() {
  const t = useTranslations("categoryPage");

  const params = useParams();
  const locale = useLocale();

  const slug = params.slug as string;

  const { category, loading: categoryLoading } = useCategory(slug);

  const {
    tours,
    loading: toursLoading,
    error,
  } = useTours();

  const [sortBy, setSortBy] = useState<SortBy>("default");

  /* =========================
     CATEGORY JOIN MAP
  ========================= */

  const categoryAliases: Record<string, string[]> = {
    cdmx: ["cdmx", "experiencias-gastronomicas"],
  };

  const activeSlugs = categoryAliases[slug] || [slug];

  /* =========================
     FILTERED TOURS
  ========================= */

  const filteredTours = useMemo(() => {
    const filtered = tours.filter((tour) => {
      const normalizedDestination = tour.destination
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");

      return activeSlugs.includes(normalizedDestination);
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.price - b.price;
      }

      if (sortBy === "price-desc") {
        return b.price - a.price;
      }

      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "newest-desc") {
        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
      }

      if (sortBy === "newest-asc") {
        return (
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
        );
      }

      return 0;
    });
  }, [tours, activeSlugs, sortBy]);

  const loading = categoryLoading || toursLoading;

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />

        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-[#035020]/20 border-t-[#c50413]" />

            <p className="text-lg font-medium text-gray-600">
              {t("loading")}
            </p>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  if (error || !category) {
    return (
      <main className="min-h-screen bg-white">
        <Header />

        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="max-w-xl rounded-[32px] border border-[#035020]/20 bg-white p-10 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#c50413] text-white shadow-xl">
              <Sparkles size={34} />
            </div>

            <h1 className="mb-4 text-4xl font-black text-gray-900">
              {t("notFound.title")}
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              {t("notFound.description")}
            </p>

            <Link
              href="/tours"
              className="inline-flex items-center justify-center rounded-2xl bg-[#035020] px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:bg-[#023816] hover:scale-[1.02]"
            >
              {t("notFound.button")}
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={
              categoryImages[slug] ||
              "https://images.unsplash.com/photo-1493794179168-82ca7cb00437?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={category.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />

          {/* Sutil acento tricolor en la base del hero */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 flex">
            <div className="w-1/3 bg-[#035020]" />
            <div className="w-1/3 bg-white" />
            <div className="w-1/3 bg-[#c50413]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              <MapPin size={14} className="text-[#c50413]" />
              <span>México · {category.title}</span>
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
              {locale === "es" ? category.title : category.title_english}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/40 px-6 py-3.5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#035020] text-white">
                  <Compass size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/60">
                    {t("hero.available")}
                  </p>
                  <p className="text-2xl font-black text-white">
                    {filteredTours.length} {t("toolbar.experiences")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/40 px-6 py-3.5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c50413] text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/60">
                    {t("hero.destination")}
                  </p>
                  <p className="text-lg font-bold text-white">
                    México
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION - FONDO BLANCO CON RETÍCULA SUTIL DE ÍCONOS ANIMADOS */}
      <section className="relative bg-white py-12 md:py-16">

        {/* RETÍCULA ESTRUCTURADA DE ÍCONOS DE FONDO (SIN SUPERPOSICIÓN) */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-12 p-8 opacity-20">
          <div className="flex items-center justify-center animate-pulse [animation-duration:3s] text-[#035020]">
            <Compass size={36} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:4s] text-[#c50413]">
            <Sparkles size={32} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:5s] text-[#035020]">
            <Sun size={36} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:3s] text-[#c50413]">
            <MapPin size={36} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:4s] text-[#c50413]">
            <Camera size={34} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:5s] text-[#035020]">
            <Heart size={30} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:3s] text-[#035020]">
            <Calendar size={32} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:4s] text-[#c50413]">
            <Compass size={36} />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4">

          {/* TOOLBAR */}
          <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-200/50 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#035020]/10 text-[#035020]">
                <SlidersHorizontal size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#c50413]">
                  {t("toolbar.results")}
                </p>
                <h2 className="text-2xl font-black text-gray-900">
                  {filteredTours.length}{" "}
                  {t("toolbar.experiences")}
                </h2>
              </div>
            </div>

            {/* ORDENAMIENTO */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-800 shadow-sm outline-none transition-all focus:border-[#035020] focus:ring-2 focus:ring-[#035020]/20"
            >
              <option value="default">{t("sort.default")}</option>
              <option value="price-asc">{t("sort.priceAsc")}</option>
              <option value="price-desc">{t("sort.priceDesc")}</option>
              <option value="newest-desc">{t("sort.newest")}</option>
              <option value="newest-asc">{t("sort.oldest")}</option>
              <option value="name">{t("sort.name")}</option>
            </select>
          </div>

          {/* GRID RESPONSIVE DE TOURS */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-2xl"
              >
                {/* IMAGEN CON LONGITUD / ALTURA FIJA DE 240px */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={
                      tour.image_url ||
                      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop"
                    }
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

              

                  {/* Badge de Duración */}
                  {tour.duration && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 backdrop-blur-md shadow-sm">
                      <Clock size={14} className="text-[#c50413]" />
                      <span>{tour.duration}</span>
                    </div>
                  )}
                </div>

                {/* CONTENIDO DE CARD */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-black leading-snug text-gray-900 group-hover:text-[#035020] transition-colors">
                      {locale === "es" ? tour.title : tour.title_english}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {locale === "es"
                        ? tour.description
                        : tour.description_english}
                    </p>
                  </div>

                  {/* PIE DE CARD: PRECIO Y BOTÓN */}
                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {t("price.from")}
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#035020]">
                          ${Number(tour.price).toLocaleString()}
                        </span>
                        
                        <span className="text-xs text-gray-500 font-medium">{t("price.tax")}</span>
                      </div>
                    </div>

                    <Link
                      href={`/tours/${tour.slug}`}
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#c50413] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#c50413]/20 transition-all duration-300 hover:bg-[#a0030f] hover:scale-105"
                    >
                      <span>{t("buttons.view")}</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ESTADO VACÍO */}
          {!filteredTours.length && (
            <div className="py-20 text-center">
              <div className="mx-auto max-w-lg rounded-3xl border border-gray-100 bg-white p-10 shadow-xl">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#035020]/10 text-[#035020]">
                  <Sparkles size={36} />
                </div>

                <h2 className="text-3xl font-black text-gray-900">
                  {t("empty.title")}
                </h2>

                <p className="mt-3 text-base text-gray-600">
                  {t("empty.description")}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}