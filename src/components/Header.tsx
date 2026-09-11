"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

import {
  Phone,
  Mail,
  ShoppingCart,
  Menu,
  X,
  Globe,
  Map,
  UtensilsCrossed,
  Mountain,
  MessageCircle,
} from "lucide-react";

import { useTranslations } from "next-intl";

import { useCart } from "@/context/CartContext";
import { useLocaleContext } from "@/context/LangContext";

export default function Header() {
  const t = useTranslations("header");

  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { locale, switchLanguage } = useLocaleContext();
  const { getItemCount } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;

  const navigation = [
    {
      href: "/tours",
      label: t("navigation.tours"),
      icon: Map,
    },
    {
      href: "/categoria/experiencias-gastronomicas",
      label: t("navigation.gastronomicExperiences"),
      icon: UtensilsCrossed,
    },
    {
      href: "/nuestro-viaje",
      label: t("navigation.ourJourney"),
      icon: Mountain,
    },
    {
      href: "/contacto",
      label: t("navigation.contact"),
      icon: MessageCircle,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-gradient-to-r from-[#f5f3ff] via-white to-[#f0fdf4] backdrop-blur-xl">
      {/* TOP BAR
      <div className="border-b border-[#e9e4ff]/60 bg-lime-300">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-5 px-4 py-2 text-xs text-[#5b5b73]">
          <a
            href="tel:5552059560"
            className="flex items-center gap-1.5 transition hover:text-[#6d28d9]"
          >
            <Phone size={13} />
            <span>55 5205 9560</span>
          </a>

          <a
            href="mailto:hola@destinoprivado.com"
            className="hidden items-center gap-1.5 transition hover:text-[#16a34a] md:flex"
          >
            <Mail size={13} />
            <span>hola@destinoprivado.com</span>
          </a>
        </div>
      </div> */}

      {/* MAIN NAVIGATION */}
      <nav className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-4">
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/logo.png"
              width={85}
              height={50}
              alt={t("logoAlt")}
            />

            <Image
              src="/title.png"
              width={200}
              height={50}
              alt={t("logoAlt")}
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-2 lg:flex">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium text-[#4b5563] transition-all duration-200 hover:bg-white hover:text-[#6d28d9] hover:shadow-md"
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            {/* LANGUAGE */}
            <button
              type="button"
              onClick={() => {
                const newLocale = locale === "es" ? "en" : "es";
                switchLanguage(newLocale);
              }}
              className="hidden h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-[#6d28d9] shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:scale-105 hover:shadow-lg sm:flex"
            >
              <Globe size={18} />
              {locale === "es" ? "ES" : "EN"}
            </button>

            {/* CART */}
            <Link
              href="/carrito"
              aria-label={t("cart")}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#6d28d9] shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <ShoppingCart size={20} />

              {mounted && itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#22c55e] px-1 text-[11px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={t("menu")}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#6d28d9] shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:scale-105 hover:shadow-lg lg:hidden"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="pb-5 lg:hidden">
            <div className="space-y-2 rounded-3xl border border-white/50 bg-white/80 p-3 shadow-xl backdrop-blur-xl">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[#374151] transition-all duration-200 hover:bg-[#f5f3ff] hover:text-[#6d28d9]"
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  const newLocale = locale === "es" ? "en" : "es";
                  switchLanguage(newLocale);
                }}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[#374151] transition-all duration-200 hover:bg-[#f5f3ff] hover:text-[#6d28d9]"
              >
                <Globe size={18} />
                {locale === "es"
                  ? t("language.english")
                  : t("language.spanish")}
              </button>

              <div className="mt-3 border-t border-gray-100 pt-3">
                <a
                  href="mailto:hola@destinoprivado.com"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[#374151] transition-all duration-200 hover:bg-[#f0fdf4] hover:text-[#16a34a]"
                >
                  <Mail size={18} />
                  hola@destinoprivado.com
                </a>

                <a
                  href="tel:5552059560"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[#374151] transition-all duration-200 hover:bg-[#f5f3ff] hover:text-[#6d28d9]"
                >
                  <Phone size={18} />
                  55 5205 9560
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}