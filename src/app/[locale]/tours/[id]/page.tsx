"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Markdown from "@/components/Markdown";

import { useTour } from "@/hooks/useTour";
import { useTours } from "@/hooks/useTours";

import { useCart } from "@/context/CartContext";

import { useLocale, useTranslations } from "next-intl";

import {
  MapPin,
  Clock,
  Users,
  Plus,
  Minus,
  Calendar,
  ShoppingCart,
  ArrowLeft,
  Sparkles,
  Info,
} from "lucide-react";
import { formatPrice } from "@/lib/price";

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();

  const locale = useLocale();

  const t = useTranslations("tourDetail");

  const slug = params.id as string;

  const { tour, loading, error } = useTour(slug);

  const { tours } = useTours();

  const [adults, setAdults] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");

  const { addToCart } = useCart();

  const relatedTours = useMemo(() => {
    if (!tour) return [];

    if (tour.destination === "CDMX" || tour.destination === "experiencias-gastronomicas") {
      return tours.filter(item =>
        item.id !== tour.id &&
        item.destination === tour.destination &&
        (item.destination === "CDMX" || item.destination === "experiencias-gastronomicas")
      ).slice(0, 3);
    }

    return tours
      .filter(
        (item) =>
          item.id !== tour.id &&
          item.destination === tour.destination
      )
      .slice(0, 3);
  }, [tours, tour]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFFDF9]">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-amber-100 rounded-2xl w-1/3 mx-auto" />
            <div className="h-4 bg-amber-100/60 rounded-full w-1/2 mx-auto" />
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  if (error || !tour) {
    return (
      <main className="min-h-screen bg-[#FFFDF9]">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("notFoundTitle")}
          </h1>

          <p className="text-gray-600 mb-8">
            {t("notFoundDescription")}
          </p>

          <button
            onClick={() => router.push("/tours")}
            className="inline-flex items-center gap-2 bg-[#E01E5A] text-white font-bold px-6 py-3 rounded-full hover:bg-[#c4164b] transition-all shadow-md"
          >
            <ArrowLeft size={18} />
            {t("backToTours")}
          </button>
        </div>

        <Footer />
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(tour, adults, selectedDate);
    router.push("/carrito");
  };

  const totalPrice = Number(tour.price) * adults;

  const tourTitle =
    locale === "en"
      ? tour.title_english || tour.title
      : tour.title;

  const tourDescription =
    locale === "en"
      ? tour.description_english || tour.description
      : tour.description;

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-gray-900 overflow-hidden">
      <Header />

      {/* Hero */}
      <section className="relative h-[520px] md:h-[620px] overflow-hidden">
        <img
          src={tour.image_url || ""}
          alt={tourTitle}
          className="w-full h-full object-cover scale-105"
        />

        {/* Degradado cálido inferior para integrar con el fondo claro */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-gray-900/40 to-gray-900/60" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 w-full relative z-10">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full mb-6 transition-all text-sm font-medium border border-white/20"
            >
              <ArrowLeft size={16} />
              {t("backToTours")}
            </Link>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="bg-[#E01E5A] text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold shadow-md">
                  <MapPin size={15} />
                  <span>{tour.destination}</span>
                </div>

                {tour.duration && (
                  <div className="bg-[#FFB300] text-gray-900 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold shadow-md">
                    <Clock size={15} />
                    <span>{tour.duration}</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                {tourTitle}
              </h1>

              <p className="text-white/90 text-base md:text-lg mt-4 max-w-2xl leading-relaxed drop-shadow">
                {t("heroDescription")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">
            
            {/* Left Content Column */}
            <div className="space-y-8">
              {/* Card de Descripción */}
              <div className="rounded-[32px] border border-amber-100 bg-white p-8 md:p-10 shadow-xl shadow-amber-900/5">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-[#E01E5A]/10 text-[#E01E5A] flex items-center justify-center shrink-0">
                    <Sparkles size={24} />
                  </div>

                  <div>
                    <p className="text-[#E01E5A] text-xs font-bold uppercase tracking-widest">
                      {t("information")}
                    </p>

                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                      {t("descriptionTitle")}
                    </h2>
                  </div>
                </div>

                <Markdown
                  className="text-gray-700 leading-relaxed text-lg space-y-4 prose-p:mb-4"
                  content={tourDescription}
                />
              </div>

              {/* Card de Información Importante / Disclaimer */}
              <div className="rounded-[32px] border border-amber-200/60 bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB300] text-gray-900 flex items-center justify-center shrink-0 font-bold shadow-sm">
                    <Info size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {t("disclaimer")}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Booking Card */}
            <aside className="lg:sticky lg:top-8">
              <div className="rounded-[36px] border-2 border-amber-100 bg-white p-8 shadow-2xl shadow-amber-900/10 relative overflow-hidden">
                
                {/* Banda decorativa superior Rosa Mexicano */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#E01E5A] via-[#FFB300] to-[#E01E5A]" />

                {/* Precio */}
                <div className="text-center mb-8 pt-2">
                  <p className="text-gray-400 uppercase tracking-[0.2em] text-xs font-semibold mb-2">
                    {t("from")}
                  </p>

                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-black text-[#E01E5A]">$</span>
                    <span className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
                      {formatPrice(tour.price)}
                    </span>
                  </div>

                  <p className="text-gray-500 font-medium text-xs mt-2">
                    MXN ({t("taxIncluded")}) • {t("perPerson")}
                  </p>
                </div>

                {/* Date Picker */}
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    {t("tourDate")}
                  </label>

                  <div className="relative">
                    <Calendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E01E5A]"
                      size={18}
                    />

                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-amber-50/30 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#E01E5A] focus:bg-white transition-all text-sm"
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                    />
                  </div>
                </div>

                {/* Selector de Adultos */}
                <div className="mb-8">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    {t("numberOfAdults")}
                  </label>

                  <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-amber-50/30 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white text-gray-700 flex items-center justify-center shadow-sm">
                        <Users size={18} />
                      </div>

                      <span className="text-gray-800 font-semibold text-sm">
                        {t("adults")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-700 flex items-center justify-center hover:bg-[#E01E5A] hover:text-white hover:border-[#E01E5A] transition-all shadow-sm active:scale-95"
                      >
                        <Minus size={15} />
                      </button>

                      <span className="w-8 text-center font-extrabold text-lg text-gray-900">
                        {adults}
                      </span>

                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-700 flex items-center justify-center hover:bg-[#FFB300] hover:text-gray-900 hover:border-[#FFB300] transition-all shadow-sm active:scale-95"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Caja de Total */}
                <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-50 to-rose-50 border border-amber-200/80 p-5 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        {t("total")}
                      </p>

                      <p className="text-3xl font-black text-gray-900">
                        ${totalPrice.toLocaleString()}.00 <span className="text-sm font-bold text-gray-500">MXN</span>
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-[#E01E5A] text-white flex items-center justify-center shadow-md">
                      <ShoppingCart size={22} />
                    </div>
                  </div>
                </div>

                {/* Botón Principal (Rosa Mexicano) */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#E01E5A] hover:bg-[#c4164b] text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-[#E01E5A]/25 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {t("addToCart")}
                </button>

                <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                  {t("reserveNow")}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Tours Section */}
      {!!relatedTours.length && (
        <section className="relative py-20 border-t border-amber-100/80 bg-amber-50/40">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="mb-12 text-center md:text-left">
              <span className="text-[#E01E5A] text-xs font-extrabold uppercase tracking-widest bg-rose-100/60 px-3 py-1 rounded-full">
                {t("relatedSubtitle")}
              </span>

              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">
                {t("relatedTitle")}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedTours.map((relatedTour) => {
                const relatedTitle =
                  locale === "en"
                    ? relatedTour.title_english || relatedTour.title
                    : relatedTour.title;

                const relatedDescription =
                  locale === "en"
                    ? relatedTour.description_english || relatedTour.description
                    : relatedTour.description;

                return (
                  <div
                    key={relatedTour.id}
                    className="group overflow-hidden rounded-[28px] border border-amber-100 bg-white hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative overflow-hidden h-60">
                        <img
                          src={relatedTour.image_url || ""}
                          alt={relatedTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 shadow-md">
                          <span className="text-sm font-black text-[#E01E5A]">
                            ${Number(relatedTour.price).toLocaleString()} MXN
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <div className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                            <MapPin size={14} className="text-[#E01E5A]" />
                            <span>{relatedTour.destination}</span>
                          </div>

                          {relatedTour.duration && (
                            <div className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                              <Clock size={14} className="text-[#FFB300]" />
                              <span>{relatedTour.duration}</span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#E01E5A] transition-colors">
                          {relatedTitle}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-6">
                          {relatedDescription}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Link
                        href={`/tours/${relatedTour.slug}`}
                        className="inline-flex items-center justify-center w-full bg-amber-50 group-hover:bg-[#FFB300] text-gray-900 py-3 rounded-xl font-bold text-sm transition-all text-center"
                      >
                        {t("viewDetails")}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}