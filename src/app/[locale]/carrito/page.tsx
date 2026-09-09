"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";

import { toast } from "sonner";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

import { processEtominPayment } from "@/lib/payment";
import { formatPrice } from "@/lib/price";

import {
  ArrowLeft,
  Banknote,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  User,
  Mail,
  Phone,
  Building2,
  Compass,
  Globe,
  Sun,
  Star,
  Camera,
  ShieldCheck,
  ReceiptText,
  BadgePercent,
  ArrowRight,
} from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

const COUPONS = [
  { code: "TURISM10", discount: 10 },
  { code: "MEXICO15", discount: 15 },
  { code: "AVENTURA20", discount: 20 },
] as const;



type CheckoutForm = {
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  telefono: string;
  calle: string;
  numero: string;
  colonia: string;
  state: string;
  cp: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expMonth: string;
  expYear: string;
  cvv: string;
};

const EMPTY_FORM: CheckoutForm = {
  firstName: "",
  lastName: "",
  city: "",
  email: "",
  telefono: "",
  calle: "",
  numero: "",
  colonia: "",
  state: "",
  cp: "",
  country: "México",
  cardNumber: "",
  cardName: "",
  expMonth: "",
  expYear: "",
  cvv: "",
};

function buildOrderId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `GB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  }
  return `GB-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

export default function CartPage() {
  const t = useTranslations("cart");
  const { items, removeFromCart, updateQuantity, clearCart, getTotal, getItemCount } =
    useCart();

  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [couponMessage, setCouponMessage] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    ...EMPTY_FORM,
    country: t("form.defaults.country"),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeItems = mounted ? items : [];
  const subtotal = useMemo(() => Number(getTotal()) || 0, [getTotal, items]);
  const itemCount = useMemo(() => Number(getItemCount()) || 0, [getItemCount, items]);
  const locale = useLocale()

  const coupon = useMemo(() => {
    const normalized = appliedCoupon.trim().toUpperCase();
    return COUPONS.find((item) => item.code === normalized) ?? null;
  }, [appliedCoupon]);

  const discountAmount = coupon ? (subtotal * coupon.discount) / 100 : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const fullAddress = [form.calle.trim(), form.numero.trim(), form.colonia.trim()]
    .filter(Boolean)
    .join(", ");

  const handleApplyCoupon = () => {
    const normalized = couponInput.trim().toUpperCase();
    if (!normalized) {
      setAppliedCoupon("");
      setCouponMessage(t("coupon.messages.empty"));
      toast.warning(
        t("alerts.couponEmptyTitle")
      )

      return;
    }

    const found = COUPONS.find((item) => item.code === normalized);
    if (!found) {
      setAppliedCoupon("");
      toast.error(t("alerts.couponInvalidTitle"))

      return;
    }

    setAppliedCoupon(found.code);
    setCouponMessage(t("coupon.messages.applied", { discount: found.discount }));
    setCheckoutError("");
    toast.success(t("alerts.couponAppliedMessage", { discount: found.discount }))

  };

  async function handlePayment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!safeItems.length) {
      toast.error(t("alerts.cartEmptyTitle") + " : " + t("alerts.cartEmptyMessage"))
      return;
    }

    if (!e.currentTarget.reportValidity()) return;

    const amount = Number(total.toFixed(2));
    if (amount <= 0) {
      toast.error(t("alerts.invalidTotalTitle") + " : " + t("alerts.invalidTotalMessage"))

      return;
    }

    setIsSubmitting(true);
    setCheckoutError("");


    try {
      const orderId = buildOrderId();

      const paymentResult = await processEtominPayment({
        amount,
        orderId,
        customer: {
          nombre: form.firstName.trim(),
          apellido: form.lastName.trim(),
          ciudad: form.city.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          direccion: fullAddress,
          estado: form.state.trim(),
          cp: form.cp.trim(),
          pais: form.country.trim(),
        },
        cardData: {
          number: form.cardNumber.trim(),
          name: form.cardName.trim(),
          month: form.expMonth.trim(),
          year: form.expYear.trim(),
          cvv: form.cvv.trim(),
        },
      });

      if (!paymentResult.success) {
        throw new Error(t("errors.paymentRejected"));
      }

      await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount,
          total: formatPrice(total),
          couponCode: coupon?.code ?? null,
          discountPercent: coupon?.discount ?? 0,
          paymentResult,
          items: safeItems,
          customer: {
            nombre: `${form.firstName.trim()} ${form.lastName.trim()}`,
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            telefono: form.telefono.trim(),
            city: form.city.trim(),
            calle: form.calle.trim(),
            numero: form.numero.trim(),
            colonia: form.colonia.trim(),
            direccion: fullAddress,
            state: form.state.trim(),
            cp: form.cp.trim(),
            country: form.country.trim(),
          },
        }),
      });

      clearCart();
      setCheckoutSuccess(true);
      toast.success(t("alerts.paymentSuccessTitle") + " : " + t("alerts.paymentSuccessMessage"))

    } catch (err) {
      const message = err instanceof Error ? err.message : t("errors.unexpected");
      setCheckoutError(message);
      toast.error(t("alerts.paymentErrorTitle") + " : " + message)

    } finally {
      setIsSubmitting(false);
    }
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#c50413] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white">
          <Compass size={48} className="animate-spin text-[#FFD700]" />
          <p className="font-semibold text-lg">{t("payment.processing")}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#c50413] text-white overflow-hidden">
      <Header />

      {/* ÍCONOS DORADOS FLOTANTES DE FONDO */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-15">
        <Compass size={110} className="absolute left-10 top-16 -rotate-12 text-[#FFD700]" />
        <Globe size={130} className="absolute top-1/3 right-12 rotate-45 text-[#FFD700]" />
        <Star size={90} className="absolute bottom-1/4 left-16 -rotate-6 text-[#FFD700]" />
        <Sun size={120} className="absolute bottom-12 right-1/3 text-[#FFD700]" />
        <Camera size={95} className="absolute top-20 right-1/4 rotate-12 text-[#FFD700]" />
        <Sparkles size={80} className="absolute left-1/3 top-1/2 text-[#FFD700] animate-pulse" />
      </div>

      {/* ENCABEZADO DE SECCIÓN */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md">
            <ShoppingBag size={18} className="text-[#FFD700]" />
            <span>{t("hero.badge")}</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl leading-tight">
            {t("hero.title")}{" "}

          </h1>

          <p className="max-w-2xl text-lg text-white/90">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck size={14} className="text-[#FFD700]" />
              {t("hero.badges.safePayment")}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
              <ReceiptText size={14} className="text-[#FFD700]" />
              {t("hero.badges.emailConfirmation")}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={14} className="text-[#FFD700]" />
              {t("hero.badges.personalizedAttention")}
            </span>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL DEL CARRITO */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
        {checkoutSuccess ? (
          <div className="mx-auto max-w-2xl rounded-[2.5rem] bg-white p-10 text-center text-gray-900 shadow-2xl border border-white/20">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#035020] text-white">
              <CheckCircle2 size={44} />
            </div>
            <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-xs font-extrabold text-[#035020] mb-4">
              {t("success.badge")}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {t("success.title")}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-lg">
              {t("success.description")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 rounded-3xl bg-[#035020] px-8 py-4 font-bold text-white transition-all hover:bg-[#023a17] hover:scale-[1.02]"
              >
                <ArrowLeft size={18} />
                {t("success.continueExploring")}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start">

            {/* COLUMNA IZQUIERDA: RESUMEN DE COMPRA Y FORMULARIOS POR PASOS */}
            <div className="space-y-8">

              {/* PASO 1: REVISIÓN DE TOURS */}
              <div className="overflow-hidden rounded-[2.5rem] bg-white text-gray-900 shadow-2xl border border-white/20">
                <div className="flex items-center justify-between bg-gray-50/80 border-b border-gray-100 px-8 py-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c50413] font-black text-white text-sm">
                      1
                    </span>
                    <h2 className="text-2xl font-extrabold">{t("cartHeader.title")}</h2>
                  </div>
                  <ShoppingBag size={22} className="text-[#c50413]" />
                </div>

                {safeItems.length === 0 ? (
                  <div className="p-12  text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-[#c50413]">
                      <ShoppingBag size={32} />
                    </div>
                    <h3 className="text-2xl font-bold">{t("empty.title")}</h3>
                    <p className="mt-2 text-gray-500 max-w-md mx-auto">{t("empty.description")}</p>
                    <Link
                      href="/tours"
                      className="mt-6 inline-flex items-center gap-2 rounded-3xl bg-[#035020] px-8 py-4 font-bold text-white transition-transform hover:scale-[1.02]"
                    >
                      <ArrowLeft size={18} />
                      {t("empty.cta")}
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 p-6 md:p-8 space-y-6">
                    {safeItems.map((item) => {
                      const quantity = item.adults;
                      const lineTotal = item.tour.price * quantity;

                      return (
                        <div key={item.tour.id} className="grid gap-6 pt-6 first:pt-0 md:grid-cols-[140px_1fr]">
                          <div className="overflow-hidden rounded-2xl bg-gray-100 h-32 md:h-full">
                            <img
                              src={item.tour.image_url || "/images/placeholder.jpg"}
                              alt={item.tour.title}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="text-xl font-extrabold leading-tight">
                                  {locale == "es" ? item.tour.title : item.tour.title_english}
                                </h3>
                                <p className="text-xs font-semibold text-[#035020] uppercase tracking-wider mt-1">
                                  {item.date && `${item.date}`}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.tour.id)}
                                className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-[#c50413] transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-1.5">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.tour.id, Math.max(1, quantity - 1))}
                                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#c50413] shadow-sm hover:bg-gray-100"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-8 text-center font-extrabold">{quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.tour.id, quantity + 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#c50413] shadow-sm hover:bg-gray-100"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>

                              <p className="text-2xl font-black text-[#035020]">{formatPrice(lineTotal)}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* PASO 2 Y 3: DATOS Y PAGO */}
              {safeItems.length > 0 && (
                <form id="checkout-form" onSubmit={handlePayment} className="space-y-8">

                  {/* PASO 2: INFORMACIÓN DE CONTACTO Y DIRECCIÓN */}
                  <div className="overflow-hidden rounded-[2.5rem] bg-white text-gray-900 shadow-2xl border border-white/20 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c50413] font-black text-white text-sm">
                        2
                      </span>
                      <div>
                        <h2 className="text-2xl font-extrabold">{t("checkout.title")}</h2>
                        <p className="text-sm text-gray-500">{t("checkout.description")}</p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("form.labels.firstName")}</label>
                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            required
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                            placeholder={t("form.placeholders.firstName")}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("form.labels.lastName")}</label>
                        <input
                          required
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 px-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                          placeholder={t("form.placeholders.lastName")}
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("form.labels.email")}</label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                            placeholder={t("form.placeholders.email")}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("form.labels.phone")}</label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            required
                            type="tel"
                            value={form.telefono}
                            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                            placeholder={t("form.placeholders.phone")}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("form.labels.street")}</label>
                        <div className="relative">
                          <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            required
                            value={form.calle}
                            onChange={(e) => setForm({ ...form, calle: e.target.value })}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                            placeholder={t("form.placeholders.street")}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("form.labels.number")}</label>
                        <input
                          required
                          value={form.numero}
                          onChange={(e) => setForm({ ...form, numero: e.target.value })}
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 px-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                          placeholder={t("form.placeholders.number")}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("form.labels.neighborhood")}</label>
                        <div className="relative">
                          <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            required
                            value={form.colonia}
                            onChange={(e) => setForm({ ...form, colonia: e.target.value })}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                            placeholder={t("form.placeholders.neighborhood")}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("form.labels.city")}</label>
                        <input
                          required
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 px-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                          placeholder={t("form.placeholders.city")}
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("form.labels.state")}</label>
                        <input
                          required
                          value={form.state}
                          onChange={(e) => setForm({ ...form, state: e.target.value })}
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 px-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                          placeholder={t("form.placeholders.state")}
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("form.labels.postalCode")}</label>
                        <input
                          required
                          maxLength={6}
                          value={form.cp}
                          onChange={(e) => setForm({ ...form, cp: e.target.value })}
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 px-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                          placeholder={t("form.placeholders.postalCode")}
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("form.labels.country")}</label>
                        <input
                          required
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 px-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                          placeholder={t("form.placeholders.country")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* PASO 3: DETALLES DE PAGO */}
                  <div className="overflow-hidden rounded-[2.5rem] bg-white text-gray-900 shadow-2xl border border-white/20 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c50413] font-black text-white text-sm">
                        3
                      </span>
                      <h2 className="text-2xl font-extrabold">{t("payment.title")}</h2>
                    </div>

                    {checkoutError && (
                      <div className="mb-6 rounded-2xl bg-red-50 p-4 border border-red-200 text-sm font-semibold text-[#c50413]">
                        {checkoutError}
                      </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("payment.labels.cardNumber")}</label>
                        <div className="relative">
                          <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            required
                            maxLength={16}
                            value={form.cardNumber}
                            onChange={(e) => setForm({ ...form, cardNumber: e.target.value.replace(/\D/g, "") })}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                            placeholder={t("payment.placeholders.cardNumber")}
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("payment.labels.cardName")}</label>
                        <input
                          required
                          value={form.cardName}
                          onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 px-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                          placeholder={t("payment.placeholders.cardName")}
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("payment.labels.month")}</label>
                        <input
                          required
                          maxLength={2}
                          value={form.expMonth}
                          onChange={(e) => setForm({ ...form, expMonth: e.target.value.replace(/\D/g, "") })}
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 px-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                          placeholder={t("payment.placeholders.month")}
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("payment.labels.year")}</label>
                        <input
                          required
                          maxLength={2}
                          value={form.expYear}
                          onChange={(e) => setForm({ ...form, expYear: e.target.value.replace(/\D/g, "") })}
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 px-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                          placeholder={t("payment.placeholders.year")}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">{t("payment.labels.cvv")}</label>
                        <div className="relative">
                          <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            required
                            type="password"
                            maxLength={4}
                            value={form.cvv}
                            onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "") })}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 font-semibold outline-none focus:border-[#c50413] focus:bg-white focus:ring-4 focus:ring-[#c50413]/10 transition-all"
                            placeholder={t("payment.placeholders.cvv")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* COLUMNA DERECHA: SIDEBAR DE RESUMEN Y PROCESO DE PAGO */}
            {safeItems.length > 0 && (
              <aside className="sticky top-8 space-y-6">
                <div className="overflow-hidden rounded-[2.5rem] bg-white text-gray-900 shadow-2xl border border-white/20 p-6 md:p-8">
                  <h2 className="text-2xl font-extrabold mb-6 border-b pb-4">{t("summary.title")}</h2>

                  <div className="space-y-4 text-base">
                    <div className="flex justify-between text-gray-600">
                      <span>{t("summary.subtotal")}</span>
                      <span className="font-bold">{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>{t("summary.coupon")}</span>
                      <span className="font-semibold text-xs bg-gray-100 px-2 py-1 rounded-lg">
                        {coupon ? coupon.code : t("summary.noCoupon")}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#035020] font-bold">
                        <span>{t("summary.discount")}</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-baseline pt-4 border-t text-gray-900">
                      <span className="text-lg font-bold">{t("summary.total")}</span>
                      <span className="text-3xl font-black text-[#035020]">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* FORMULARIO DE CUPÓN */}
                  <div className="mt-6 rounded-2xl bg-gray-50 p-4 border border-gray-100">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-[#035020] mb-2">
                      <BadgePercent size={16} />
                      {t("coupon.title")}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder={t("coupon.placeholder")}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold outline-none focus:border-[#035020]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="rounded-xl bg-[#035020] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#023a17] transition-all"
                      >
                        {t("coupon.apply")}
                      </button>
                    </div>
                    {couponMessage && (
                      <p className="mt-2 text-xs font-semibold text-[#c50413]">{couponMessage}</p>
                    )}
                  </div>

                  {/* BOTÓN DE PAGAR */}
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="mt-6 w-full inline-flex items-center justify-center gap-3 rounded-3xl bg-[#035020] py-4 text-lg font-extrabold text-white shadow-xl transition-all hover:bg-[#023a17] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      t("payment.processing")
                    ) : (
                      <>
                        <Banknote size={22} />
                        <span>{t("payment.submit")}</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  {/* SELLOS DE SEGURIDAD */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center gap-4 opacity-80">
                    <div className="flex justify-center items-center gap-6">
                      <Image src="/etomin.png" alt="Etomin" width={110} height={24} />
                      <Image src="/secure-payment.png" alt="Secure Payment" width={110} height={24} />
                    </div>
                    <p className="text-xs text-center text-gray-500 font-medium leading-relaxed">
                      {t("info.processedInFlow")} • {t("info.noRedirects")}
                    </p>
                  </div>
                </div>
              </aside>
            )}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}