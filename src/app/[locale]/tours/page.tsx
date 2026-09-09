"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useTours } from "@/hooks/useTours";
import { useLocale, useTranslations } from "next-intl";
import {
  MapPin,
  Users,
  Plus,
  Minus,
  List,
  Grid3X3,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  Compass,
  Sun,
  Camera,
  Heart,
  Calendar,
} from "lucide-react";
import Link from "next/link";

type SortBy =
  | "default"
  | "price-asc"
  | "price-desc"
  | "newest-desc"
  | "newest-asc"
  | "name";

export default function ToursPage() {
  const t = useTranslations("toursPage");
  const locale = useLocale();
  const isEnglish = locale === "en";

  const [selectedDestination, setSelectedDestination] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [adults, setAdults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { addToCart } = useCart();
  const { tours, loading, error } = useTours({ page: 10 });

  const destinations = useMemo(() => {
    return Array.from(
      new Set(tours.map((tour) => tour.destination).filter(Boolean))
    );
  }, [tours]);

  const filteredAndSortedTours = useMemo(() => {
    const filtered = tours.filter(
      (tour) =>
        !selectedDestination ||
        tour.destination === selectedDestination
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;

      if (sortBy === "name") {
        const titleA = isEnglish
          ? a.title_english || a.title
          : a.title;
        const titleB = isEnglish
          ? b.title_english || b.title
          : b.title;

        return titleA.localeCompare(titleB);
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

    return sorted;
  }, [tours, selectedDestination, sortBy, isEnglish]);

  const itemsPerPage = 6;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedTours.length / itemsPerPage)
  );

  const paginatedTours = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return filteredAndSortedTours.slice(start, start + itemsPerPage);
  }, [filteredAndSortedTours, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDestination, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleAddToCart = (tourId: string) => {
    const tour = tours.find((t) => t.id === tourId);

    if (tour && adults > 0) {
      addToCart(tour, adults);
      setAdults(0);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* HERO SECTION CON FONDO VERDE E ÍCONOS FLOTANTES */}
      <section className="relative overflow-hidden bg-[#035020] text-white">
        {/* RETÍCULA ESTRUCTURADA DE ÍCONOS DE FONDO EN HERO */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-8 p-6 opacity-15">
          <div className="flex items-center justify-center animate-pulse [animation-duration:3s]">
            <Compass size={36} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:4s]">
            <Sparkles size={32} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:5s]">
            <Sun size={36} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:3s]">
            <MapPin size={36} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:4s]">
            <Camera size={34} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:5s]">
            <Heart size={30} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:3s]">
            <Calendar size={32} />
          </div>
          <div className="flex items-center justify-center animate-pulse [animation-duration:4s]">
            <Compass size={36} />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
              {t("hero.title")}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-white/90">
              {t("hero.description")}
            </p>
          </div>
        </div>

        {/* ACENTO TRICOLOR EN LA BASE DEL HERO */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 flex">
          <div className="w-1/3 bg-[#035020]" />
          <div className="w-1/3 bg-white" />
          <div className="w-1/3 bg-[#c50413]" />
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 shadow-md">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#035020]/10 text-[#035020]">
                  <SlidersHorizontal size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {t("sidebar.title")}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {t("sidebar.subtitle")}
                  </p>
                </div>
              </div>

              {/* DESTINO */}
              <div className="mb-6">
                <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                  <MapPin size={14} className="text-[#c50413]" />
                  {t("sidebar.destination")}
                </label>

                <select
                  value={selectedDestination}
                  onChange={(e) =>
                    setSelectedDestination(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-[#035020] focus:ring-2 focus:ring-[#035020]/20"
                >
                  <option value="">
                    {t("sidebar.allDestinations")}
                  </option>

                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              {/* ADULTOS */}
              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                  <Users size={14} className="text-[#c50413]" />
                  {t("sidebar.adults")}
                </div>

                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3.5 py-2">
                  <button
                    type="button"
                    onClick={() =>
                      setAdults(Math.max(0, adults - 1))
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c50413] text-[#c50413] transition-colors hover:bg-[#c50413] hover:text-white"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="text-xl font-black text-gray-900">
                    {adults}
                  </span>

                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c50413] text-[#c50413] transition-colors hover:bg-[#c50413] hover:text-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button className="w-full rounded-xl bg-[#035020] px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#023816]">
                {t("sidebar.viewAvailability")}
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div>
            {/* TOPBAR */}
            <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-md sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#c50413]">
                  {t("results.badge")}
                </p>

                <h2 className="text-2xl font-black text-gray-900">
                  {t("results.title", {
                    count: filteredAndSortedTours.length,
                  })}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* SELECTOR DE VISTA */}
                <div className="flex items-center rounded-xl bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg font-medium transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-[#035020] shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                    aria-label="Grid View"
                  >
                    <Grid3X3 size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg font-medium transition-all ${
                      viewMode === "list"
                        ? "bg-white text-[#035020] shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                    aria-label="List View"
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* ORDENAMIENTO */}
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as SortBy)
                  }
                  className="h-11 rounded-xl border border-gray-200 bg-white px-3.5 text-sm font-semibold text-gray-800 shadow-sm outline-none transition-all focus:border-[#035020] focus:ring-2 focus:ring-[#035020]/20"
                >
                  <option value="default">{t("sort.default")}</option>
                  <option value="price-asc">{t("sort.priceAsc")}</option>
                  <option value="price-desc">{t("sort.priceDesc")}</option>
                  <option value="newest-desc">{t("sort.newestDesc")}</option>
                  <option value="newest-asc">{t("sort.newestAsc")}</option>
                  <option value="name">{t("sort.name")}</option>
                </select>
              </div>
            </div>

            {/* ESTADO DE CARGA */}
            {loading && (
              <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-md">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#035020]/20 border-t-[#c50413]" />
                <p className="text-base font-medium text-gray-600">
                  {t("states.loading")}
                </p>
              </div>
            )}

            {/* LISTA / GRID DE TOURS */}
            {!loading && !error && (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid gap-6 sm:grid-cols-2"
                      : "space-y-6"
                  }
                >
                  {paginatedTours.map((tour) => {
                    const localizedTitle = isEnglish
                      ? tour.title_english || tour.title
                      : tour.title;

                    const localizedDescription = isEnglish
                      ? tour.description_english || tour.description
                      : tour.description;

                    return (
                      <div
                        key={tour.id}
                        className={`group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl ${
                          viewMode === "list"
                            ? "flex flex-col sm:flex-row"
                            : "flex flex-col"
                        }`}
                      >
                        {/* IMAGEN DE CARD - ALTURA FIJA DE 240px */}
                        <div
                          className={`relative overflow-hidden bg-gray-100 ${
                            viewMode === "list"
                              ? "h-60 sm:w-[280px] shrink-0"
                              : "h-60 w-full shrink-0"
                          }`}
                        >
                          <img
                            src={
                              tour.image_url ||
                              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop"
                            }
                            alt={localizedTitle}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />

                          {tour.destination && (
                            <div className="absolute top-4 left-4">
                              <span className="rounded-full bg-[#035020] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                                {tour.destination}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* DETALLES DE CARD */}
                        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                          <div>
                            <h3 className="text-xl font-black leading-snug text-gray-900 group-hover:text-[#035020] transition-colors">
                              {localizedTitle}
                            </h3>

                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                              {localizedDescription}
                            </p>
                          </div>

                          <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                {t("price.from")}
                              </p>

                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-[#035020]">
                                  ${Number(tour.price).toLocaleString()}
                                </span>
                                <span className="text-xs font-medium text-gray-500">
                                  MXN
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                disabled={adults <= 0}
                                onClick={() => handleAddToCart(tour.id)}
                                className="rounded-xl border border-[#c50413] px-3.5 py-2.5 text-xs font-bold text-[#c50413] transition-all hover:bg-[#c50413] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                {t("buttons.add")}
                              </button>

                              <Link
                                href={`/tours/${tour.slug}`}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-[#035020] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#023816] hover:scale-105"
                              >
                                <span>{t("buttons.details")}</span>
                                <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* PAGINACIÓN */}
                {filteredAndSortedTours.length > itemsPerPage && (
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }
                      disabled={currentPage === 1}
                      className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50"
                    >
                      {t("pagination.previous")}
                    </button>

                    <div className="rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm">
                      {t("pagination.pageOf", {
                        current: currentPage,
                        total: totalPages,
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((p) =>
                          Math.min(totalPages, p + 1)
                        )
                      }
                      disabled={currentPage === totalPages}
                      className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50"
                    >
                      {t("pagination.next")}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}