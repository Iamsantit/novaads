"use client";

import { motion } from "framer-motion";
import { Sparkles, Check, ArrowRight, Star, Shield } from "lucide-react";
import type { PreviewPayload } from "@/lib/preview-store";

type Props = { data: PreviewPayload["data"] };

export default function LandingTemplate({ data }: Props) {
  const brand = data.brand?.name ?? "Tu Marca";
  const accent = data.brand?.accent ?? "#1cc5e7";

  return (
    <main className="bg-white" style={{ ["--accent" as any]: accent }}>
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-xl font-bold text-navy-900">{brand}</span>
          <nav className="hidden gap-6 text-sm text-gray-600 md:flex">
            <a href="#beneficios">Beneficios</a>
            <a href="#testimonios">Testimonios</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a
            href="#cta"
            className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow"
            style={{ background: "var(--accent)" }}
          >
            {data.hero?.cta ?? "Empezar"}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            background:
              "radial-gradient(600px circle at 20% 10%, rgba(28,197,231,0.25), transparent 60%)"
          }}
        />
        <div className="mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-700"
          >
            <Sparkles className="h-3 w-3" style={{ color: "var(--accent)" }} /> Nuevo lanzamiento
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-navy-900 sm:text-6xl"
          >
            {data.hero?.headline ?? "Tu propuesta de valor va aquí"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-gray-600"
          >
            {data.hero?.subheadline ?? "Una descripción clara y orientada al beneficio del cliente."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-center"
          >
            <a
              href="#cta"
              className="flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.03]"
              style={{ background: "var(--accent)" }}
            >
              {data.hero?.cta ?? "Comprar ahora"} <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 font-semibold text-navy-900">4.9</span> · +2.300 clientes
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" /> Garantía 30 días
            </div>
          </div>
        </div>
      </section>

      {/* Offer */}
      {data.offer && (
        <section className="border-y border-gray-100 bg-gray-50 px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              {data.offer.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{data.offer.body}</p>
          </div>
        </section>
      )}

      {/* Benefits */}
      {data.benefits && data.benefits.length > 0 && (
        <section id="beneficios" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              ¿Por qué elegirnos?
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-white"
                    style={{ background: "var(--accent)" }}
                  >
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy-900">{b.title}</h3>
                  <p className="mt-2 text-gray-600">{b.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social proof */}
      {data.social_proof && data.social_proof.length > 0 && (
        <section id="testimonios" className="bg-gray-50 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.social_proof.map((s, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-3 text-gray-700">“{s.quote}”</p>
                  <p className="mt-4 text-sm font-semibold text-navy-900">— {s.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {data.faq && data.faq.length > 0 && (
        <section id="faq" className="px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Preguntas frecuentes
            </h2>
            <div className="mt-10 space-y-3">
              {data.faq.map((f, i) => (
                <details key={i} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none font-display font-semibold text-navy-900">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-gray-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section
        id="cta"
        className="px-6 py-24 text-center text-white"
        style={{ background: `linear-gradient(135deg, #0b1e3f 0%, ${accent} 100%)` }}
      >
        <h2 className="font-display text-3xl font-bold sm:text-5xl">
          {data.final_cta?.headline ?? "Empieza hoy mismo"}
        </h2>
        <a
          href="#"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-navy-900 shadow-xl hover:scale-[1.03]"
        >
          {data.final_cta?.button ?? "Empezar ahora"} <ArrowRight className="h-4 w-4" />
        </a>
      </section>

      <footer className="bg-navy-950 px-6 py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {brand} · Generado con NovaAds
      </footer>
    </main>
  );
}
