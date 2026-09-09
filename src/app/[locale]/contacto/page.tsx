"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContact } from "@/hooks/useContact";
import { useTranslations } from "next-intl";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const { sendContactForm, isLoading } = useContact();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
    servicioDeseado: "",
    presupuesto: "",
    asunto: t("form.subjectDefault"),
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await sendContactForm({
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono || undefined,
      mensaje: formData.mensaje,
      servicioDeseado: formData.servicioDeseado || undefined,
      presupuesto: formData.presupuesto || undefined,
      asunto: formData.asunto,
    });

    if (result.success) {
      setSubmitted(true);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
        servicioDeseado: "",
        presupuesto: "",
        asunto: t("form.subjectDefault"),
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-fuchsia-600" />
              <span className="text-sm font-medium text-fuchsia-700">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
              {t("hero.title")}{" "}
              <span className="text-fuchsia-600">
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-slate-600 md:text-xl">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-[400px_1fr]">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Intro Card */}
              <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-8 shadow-sm">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                  {t("info.badge")}
                </p>
                <h2 className="mb-3 text-2xl font-bold text-slate-900">
                  {t("info.title")}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  {t("info.description")}
                </p>
              </div>

              {/* Address */}
              <div className="rounded-3xl border border-sky-100 bg-sky-50/50 p-6 shadow-sm transition-all hover:border-sky-200">
                <div className="flex items-start gap-4">
                  <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-md shadow-sky-500/20">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-slate-900">
                      {t("cards.address.title")}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {t("cards.address.description")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-3xl border border-fuchsia-100 bg-fuchsia-50/50 p-6 shadow-sm transition-all hover:border-fuchsia-200">
                <div className="flex items-center gap-4">
                  <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/20">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-slate-900">
                      {t("cards.email.title")}
                    </h3>
                    <a
                      href="mailto:hola@destinoprivado.com"
                      className="text-sm text-slate-600 transition-colors hover:text-fuchsia-600"
                    >
                      hola@destinoprivado.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-3xl border border-amber-100 bg-amber-50/50 p-6 shadow-sm transition-all hover:border-amber-200">
                <div className="flex items-center gap-4">
                  <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-900 shadow-md shadow-amber-400/20">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-slate-900">
                      {t("cards.phone.title")}
                    </h3>
                    <a
                      href="tel:5552059560"
                      className="text-sm text-slate-600 transition-colors hover:text-amber-600"
                    >
                      55 5205 9560
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-10">
              <div className="mb-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-600">
                  {t("form.badge")}
                </p>
                <h2 className="mb-3 text-3xl font-extrabold text-slate-900">
                  {t("form.title")}
                </h2>
                <p className="text-slate-600">
                  {t("form.description")}
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-10 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 size={36} />
                    </div>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-slate-900">
                    {t("success.title")}
                  </h3>
                  <p className="mb-6 text-slate-600">
                    {t("success.description")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800"
                  >
                    {t("success.button")}
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Fila 1: Nombre y Email */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="nombre"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        {t("form.fields.name.label")}
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        required
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nombre: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:outline-none"
                        placeholder={t("form.fields.name.placeholder")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        {t("form.fields.email.label")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:outline-none"
                        placeholder={t("form.fields.email.placeholder")}
                      />
                    </div>
                  </div>

                  {/* Fila 2: Teléfono solo */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="telefono"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        {t("form.fields.phone.label")}
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        value={formData.telefono}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            telefono: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:outline-none"
                        placeholder={t("form.fields.phone.placeholder")}
                      />
                    </div>
                  </div>

                  {/* Fila 3: Mensaje */}
                  <div>
                    <label
                      htmlFor="mensaje"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      {t("form.fields.message.label")}
                    </label>
                    <textarea
                      id="mensaje"
                      required
                      rows={5}
                      value={formData.mensaje}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mensaje: e.target.value,
                        })
                      }
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:outline-none"
                      placeholder={t("form.fields.message.placeholder")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-fuchsia-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-fuchsia-600/20 transition-all hover:bg-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? (
                      t("form.loading")
                    ) : (
                      <>
                        <Send
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                        {t("form.submit")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}