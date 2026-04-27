"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Shield, Code } from "lucide-react";
import type { PreviewPayload } from "@/lib/preview-store";

type Props = { data: PreviewPayload["data"] };

const FALLBACK_FEATURES = [
  { title: "Rápido", body: "Setup en 5 minutos. Sin instalar nada." },
  { title: "Seguro", body: "Encripción AES-256 + SOC2 en proceso." },
  { title: "API-first", body: "REST + Webhooks + SDK en 4 lenguajes." }
];

export default function SaasTemplate({ data }: Props) {
  const brand = data.brand?.name ?? "Tu SaaS";
  const accent = data.brand?.accent ?? "#1cc5e7";
  const features = data.features?.length ? data.features : FALLBACK_FEATURES;

  return (
    <main className="bg-white text-navy-900" style={{ ["--accent" as any]: accent }}>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-xl font-bold">{brand}</span>
          <nav className="hidden gap-6 text-sm text-gray-600 md:flex">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#">Docs</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm font-medium text-gray-700">Sign in</a>
            <a
              href="#cta"
              className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow"
              style={{ background: accent }}
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(600px circle at 50% 0%, rgba(28,197,231,0.25), transparent 55%)"
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-700"
        >
          <Zap className="h-3 w-3" style={{ color: accent }} /> v2.0 disponible
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
        >
          {data.hero?.headline ?? "El SaaS que tu equipo necesita"}
        </motion.h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">
          {data.hero?.subheadline ?? "Ahorra horas cada semana automatizando lo que hoy haces manual."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#cta"
            className="flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg"
            style={{ background: accent }}
          >
            Probar gratis 14 días <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-navy-900"
          >
            Ver demo
          </a>
        </div>

        {/* App mock */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-navy-950 shadow-2xl"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
          </div>
          <div className="grid gap-3 p-6 md:grid-cols-[180px_1fr]">
            <div className="space-y-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-white/10" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-20 rounded-lg bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/5" />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">Todo lo que necesitas</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-white"
                  style={{ background: accent }}
                >
                  {i === 0 ? <Zap className="h-5 w-5" /> : i === 1 ? <Shield className="h-5 w-5" /> : <Code className="h-5 w-5" />}
                </div>
                <h3 className="font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-gray-600">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">Planes simples</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: "Free", price: "$0", bullets: ["Uso personal", "Hasta 3 proyectos", "Soporte comunidad"] },
              { name: "Pro", price: "$29", popular: true, bullets: ["Proyectos ilimitados", "Integraciones", "Soporte prioritario"] },
              { name: "Team", price: "$79", bullets: ["Todo Pro +", "Colaboración", "SSO + SOC2"] }
            ].map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl border bg-white p-6 ${p.popular ? "border-navy-900 shadow-xl" : "border-gray-200 shadow-sm"}`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-navy-900 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Más popular
                  </span>
                )}
                <p className="font-display text-xl font-bold">{p.name}</p>
                <p className="mt-2">
                  <span className="font-display text-4xl font-bold">{p.price}</span>
                  <span className="text-sm text-gray-500">/mes</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} /> {b}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-6 w-full rounded-full py-2.5 text-sm font-semibold ${p.popular ? "text-white" : "border border-navy-900 text-navy-900"}`}
                  style={p.popular ? { background: accent } : undefined}
                >
                  Elegir {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="px-6 py-20 text-center text-white" style={{ background: `linear-gradient(135deg, #0b1e3f 0%, ${accent} 100%)` }}>
        <h2 className="font-display text-3xl font-bold sm:text-5xl">{data.final_cta?.headline ?? "¿Listo para empezar?"}</h2>
        <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-navy-900 shadow-xl">
          {data.final_cta?.button ?? "Probar gratis"} <ArrowRight className="h-4 w-4" />
        </a>
      </section>

      <footer className="bg-navy-950 px-6 py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {brand} · Built with NovaAds
      </footer>
    </main>
  );
}
