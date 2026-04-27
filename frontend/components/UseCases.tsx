"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShoppingBag, GraduationCap, Briefcase, Utensils, Home, Dumbbell } from "lucide-react";

const useCases = [
  {
    id: "ecommerce",
    icon: ShoppingBag,
    label: "Ecommerce",
    headline: "Lanza tu tienda con copy que vende",
    desc: "Fichas de producto, descripciones, emails de recuperación de carrito y creativos para Meta Ads en un solo flujo.",
    bullets: ["Fichas de producto optimizadas SEO", "Emails de carrito abandonado", "Creativos para Meta Ads", "Integración directa con Shopify"]
  },
  {
    id: "coaching",
    icon: GraduationCap,
    label: "Coaches / Cursos",
    headline: "Vende tu conocimiento en piloto automático",
    desc: "Página de ventas + webinar automatizado + secuencia de emails + upsell. Tu infoproducto listo en horas.",
    bullets: ["Página de ventas largo formato", "Guion para webinar de 60 min", "Secuencia de 7 emails", "Upsell y orden bump"]
  },
  {
    id: "b2b",
    icon: Briefcase,
    label: "B2B / SaaS",
    headline: "Genera leads calificados sin equipo de marketing",
    desc: "Landing corporativa, lead magnet descargable, secuencia de nurturing y pitch deck para enterprise.",
    bullets: ["Landing con casos de uso B2B", "Whitepaper / ebook", "Nurturing LinkedIn Ads", "Pitch deck para enterprise"]
  },
  {
    id: "resto",
    icon: Utensils,
    label: "Restaurantes",
    headline: "Llena tu local con reservas todos los días",
    desc: "Menú digital, campaña hiperlocal, creatividades apetitosas y sistema de fidelización con cupones.",
    bullets: ["Menú digital QR", "Ads geolocalizados <5 km", "Creativos con food styling", "Sistema de cupones"]
  },
  {
    id: "realestate",
    icon: Home,
    label: "Bienes raíces",
    headline: "Vende propiedades más rápido que la competencia",
    desc: "Fichas de propiedad, campañas de captación de vendedores, tours virtuales narrados y calculadora de hipoteca.",
    bullets: ["Fichas con copy emocional", "Ads de captación de vendedores", "Guion de tour virtual", "Landing con calculadora"]
  },
  {
    id: "fitness",
    icon: Dumbbell,
    label: "Fitness / Wellness",
    headline: "Convierte seguidores en clientes recurrentes",
    desc: "Venta de membresías, retos virales de 30 días, reels de transformación y programa de referidos.",
    bullets: ["Página de membresía mensual", "Reto viral de 30 días", "Reels de transformación", "Programa de referidos"]
  }
];

export default function UseCases() {
  const [active, setActive] = useState(useCases[0].id);
  const current = useCases.find((u) => u.id === active)!;

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Para cualquier negocio</span>
          <h2 className="heading-display mt-4">
            Casos de uso que <span className="text-gradient">ya están facturando</span>
          </h2>
          <p className="mt-4 text-lg text-navy-700/80">
            NovaAds se adapta a tu industria. Elige la tuya y mira cómo se ve el resultado.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {useCases.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setActive(uc.id)}
              className={`group relative flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                active === uc.id
                  ? "border-cyan-400 bg-cyan-50 text-cyan-700 shadow-[0_8px_20px_-8px_rgba(28,197,231,0.5)]"
                  : "border-navy-900/10 bg-white text-navy-700 hover:border-cyan-300"
              }`}
            >
              <uc.icon className="h-4 w-4" />
              {uc.label}
              {active === uc.id && (
                <motion.span
                  layoutId="usecase-dot"
                  className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-cyan-400"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center"
          >
            <div>
              <h3 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
                {current.headline}
              </h3>
              <p className="mt-4 text-lg text-navy-700/80">{current.desc}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {current.bullets.map((b) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-2 text-navy-800"
                  >
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                      ✓
                    </span>
                    <span className="text-sm">{b}</span>
                  </motion.li>
                ))}
              </ul>
              <a href="/registro" className="btn-primary mt-8">
                Empezar con {current.label} →
              </a>
            </div>

            <div className="gradient-border p-2 shadow-card">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-800 p-8 text-white">
                <div className="absolute -right-10 -top-10 h-48 w-48 animate-float-slow rounded-full bg-cyan-400/30 blur-3xl" />
                <div className="relative">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
                    <current.icon className="h-7 w-7 text-cyan-300" />
                  </div>
                  <p className="mt-6 text-sm text-white/70">Generado para</p>
                  <p className="font-display text-2xl font-bold">{current.label}</p>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="h-24 rounded-lg bg-white/10 p-2 ring-1 ring-white/15"
                      >
                        <div className="h-1.5 w-2/3 rounded bg-white/30" />
                        <div className="mt-1.5 h-1.5 w-1/2 rounded bg-white/20" />
                        <div className="mt-1.5 h-1.5 w-3/4 rounded bg-white/25" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
