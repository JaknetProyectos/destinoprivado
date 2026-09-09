"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useCart } from "@/context/CartContext";

import { useTranslations } from "next-intl";

import {
  Minus,
  Plus,
  ShoppingCart,
  Receipt,
  CreditCard,
  Sparkles,
} from "lucide-react";

export default function CustomTourPage() {
  const t = useTranslations("customQuote");

  const router = useRouter();

  const { addToCart } = useCart();

  const [quoteId, setQuoteId] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState(1);

  const parsedAmount = Number(amount || 0);

  const total = parsedAmount * quantity;

  const handleAddToCart = () => {
    if (!quoteId.trim()) {
      alert(t("alerts.quoteRequired"));
      return;
    }

    if (!parsedAmount || parsedAmount <= 0) {
      alert(t("alerts.invalidAmount"));
      return;
    }

    addToCart(
      {
        id: `custom-${quoteId}`,
        slug: `custom-${quoteId}`,

        title: t("cart.title"),
        title_english: t("cart.titleEnglish"),

        description: `${t("cart.quoteLabel")}: ${quoteId}`,

        description_english: `Quote ID: ${quoteId}`,

        price: parsedAmount,

        image_url:
          "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop",

        destination: t("cart.destination"),

        duration: t("cart.duration"),
      },
      quantity
    );

    router.push("/carrito");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <section className="relative px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
            {/* LEFT */}
            <div className="relative min-h-[420px] overflow-hidden lg:min-h-[720px]">
              <img
                src="https://images.unsplash.com/photo-1706034136283-c9b6a68d1eb8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t("hero.imageAlt")}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-slate-900/40" />

              <div className="absolute left-8 top-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold text-slate-900 shadow-md">
                  <Sparkles size={14} />
                  <span>{t("hero.badge")}</span>
                </div>
              </div>

              <div className="relative z-10 flex h-full items-end p-8 md:p-10">
                <div className="max-w-lg rounded-2xl bg-slate-900/80 p-8 text-white backdrop-blur-md">
                  <h1 className="mb-4 text-3xl font-extrabold leading-tight text-amber-400 md:text-5xl">
                    {t("hero.title")}
                  </h1>

                  <p className="text-base leading-relaxed text-slate-200 md:text-lg">
                    {t("hero.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative flex flex-col justify-center p-6 md:p-10 lg:p-14">
              <div className="relative z-10">
                <div className="mb-8">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-600">
                    {t("content.badge")}
                  </p>

                  <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
                    {t("content.title")}
                  </h2>

                  <p className="text-slate-600 leading-relaxed">
                    {t("content.description")}
                  </p>
                </div>

                {/* Quote ID */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("form.quoteId")}
                  </label>

                  <div className="relative">
                    <Receipt
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500"
                      size={18}
                    />

                    <input
                      type="text"
                      value={quoteId}
                      onChange={(e) => setQuoteId(e.target.value)}
                      placeholder={t("form.quotePlaceholder")}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 transition-colors focus:border-fuchsia-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Amount */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("form.amount")}
                  </label>

                  <div className="relative">
                    <CreditCard
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-fuchsia-600"
                      size={18}
                    />

                    <span className="absolute left-11 top-1/2 -translate-y-1/2 font-semibold text-slate-500">
                      $
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-16 pr-4 text-slate-900 transition-colors focus:border-fuchsia-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("form.people")}
                  </label>

                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="font-medium text-slate-700 text-sm">
                      {t("form.quantity")}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(Math.max(1, quantity - 1))
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="w-8 text-center font-bold text-slate-900">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-700">
                        {t("total.label")}
                      </p>

                      <h3 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                        ${total.toLocaleString()}.00
                      </h3>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-slate-900 shadow-md">
                      <CreditCard size={22} />
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-fuchsia-600 py-4 text-base font-bold text-white shadow-lg shadow-fuchsia-600/20 transition-all hover:bg-fuchsia-700"
                >
                  <ShoppingCart size={20} />
                  {t("cta")}
                </button>

                <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
                  {t("footer")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}