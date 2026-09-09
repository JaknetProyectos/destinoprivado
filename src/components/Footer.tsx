import Link from "next/link";
import { useTranslations } from "next-intl";

import {
  Compass,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-black text-white border-t border-zinc-800">
      {/* TOP */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_0.8fr]">
          {/* BRAND */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800">
                <Compass className="h-6 w-6 text-emerald-500" />
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  Destino Privado
                </h2>

                <p className="text-sm text-zinc-400">
                  {t("brand.subtitle")}
                </p>
              </div>
            </div>

            <p className="max-w-md leading-relaxed text-zinc-400">
              {t("brand.description")}
            </p>

            {/* BADGES */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2.5 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-500" />

                <span className="text-sm font-medium text-zinc-300">
                  {t("badges.securePayments")}
                </span>
              </div>

              <div className="inline-flex items-center gap-2.5 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
                <Sparkles className="h-5 w-5 shrink-0 text-rose-500" />

                <span className="text-sm font-medium text-zinc-300">
                  {t("badges.personalizedAttention")}
                </span>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Image
                src="/cards.png"
                alt="cards"
                width={150}
                height={30}
              />
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
              {t("contact.title")}
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-bold text-white">
                    {t("contact.location")}
                  </h3>

                  <p className="text-sm leading-relaxed text-zinc-400">
                    {t("contact.address")}
                  </p>
                </div>
              </div>

              <a
                href="mailto:hola@destinoprivado.com"
                className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Mail className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <h3 className="mb-1 text-sm font-bold text-white">
                    {t("contact.email")}
                  </h3>

                  <p className="truncate text-sm text-zinc-400 transition-colors group-hover:text-white">
                    hola@destinoprivado.com
                  </p>
                </div>
              </a>

              <a
                href="tel:5552059560"
                className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-bold text-white">
                    {t("contact.phone")}
                  </h3>

                  <p className="text-sm text-zinc-400 transition-colors group-hover:text-white">
                    55 5205 9560
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400">
              {t("legal.title")}
            </div>

            <div className="space-y-3">
              <Link
                href="/legal/privacidad"
                className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                <span>
                  {t("legal.privacy")}
                </span>

                <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </Link>

              <Link
                href="/legal/terminos"
                className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                <span>
                  {t("legal.terms")}
                </span>

                <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </Link>

              <Link
                href="/legal/reembolsos"
                className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                <span>
                  {t("legal.refunds")}
                </span>

                <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-zinc-900 bg-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center md:flex-row">
          <p className="text-sm text-zinc-500">
            {t("copyright")}
          </p>

          <p className="text-sm text-zinc-600">
            {t("designed")}
          </p>
        </div>
      </div>
    </footer>
  );
}