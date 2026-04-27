"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { DEFAULT_LOCALE, detectCountry, formatPrice, getLocale, type Locale } from "@/lib/currency";

type Plan = {
  id: "basic" | "pro" | "premium";
  name: string;
  tag?: string;
  monthly: number;
  yearly: number;
  icon: typeof Sparkles;
  accent: string;
  neonColor: string;
  neonShadow: string;
  borderColor: string;
  features: string[];
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Básico",
    monthly: 19,
    yearly: 190,
    icon: Sparkles,
    accent: "from-cyan-400 to-cyan-600",
    neonColor: "rgba(0,245,255,0.5)",
    neonShadow: "hover:shadow-neon-cyan",
    borderColor: "hover:border-neon-cyan/40",
    features: [
      "10 generaciones completas / mes",
      "Landing + funnel + ads",
      "Exportar HTML / PDF",
      "Moneda local automática",
      "Soporte por email"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    tag: "Más popular",
    monthly: 49,
    yearly: 490,
    icon: Zap,
    accent: "from-violet-500 to-purple-700",
    neonColor: "rgba(168,85,247,0.6)",
    neonShadow: "hover:shadow-neon-violet",
    borderColor: "border-violet-500/40 hover:border-violet-400/60",
    popular: true,
    features: [
      "Generaciones ilimitadas",
      "Landing + funnel + ads + imágenes",
      "Video (guion + storyboard)",
      "Integración Shopify / WordPress",
      "Dominio personalizado",
      "Soporte prioritario"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 99,
    yearly: 990,
    icon: Crown,
    accent: "from-neon-yellow to-orange-500",
    neonColor: "rgba(251,191,36,0.5)",
    neonShadow: "hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]",
    borderColor: "hover:border-yellow-400/40",
    features: [
      "Todo lo de Pro +",
      "Pitch deck ilimitado",
      "API y acceso a agentes",
      "5 marcas / workspaces",
      "Soporte con slack privado",
      "Onboarding 1-a-1"
    ]
  }
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    detectCountry().then((c) => setLocale(getLocale(c)));
  }, []);

  return (
    <section id="pricing" className="relative py-28">
      {/* Background nebula */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-neon-mesh opacity-60" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Precios</span>
          <h2 className="heading-display mt-4">
            Planes simples.{" "}
            <span className="text-gradient">En tu moneda.</span>
          </h2>
          <p className="mt-4 text-lg text-white/55">
            Detectamos tu país y mostramos los precios en tu moneda local. El cobro se procesa en USD vía Stripe.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/10 bg-space-800/70 p-1 backdrop-blur">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                !annual
                  ? "bg-gradient-to-r from-cyan-400 to-navy-600 text-white shadow-neon-cyan"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                annual
                  ? "bg-gradient-to-r from-cyan-400 to-navy-600 text-white shadow-neon-cyan"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Anual
              <span className="absolute -right-2 -top-2 rounded-full bg-neon-cyan px-2 py-0.5 text-[9px] font-bold text-space-900">
                -20%
              </span>
            </button>
          </div>

          <p className="mt-3 text-xs text-white/35">
            Mostrando precios en <span className="font-semibold text-white/60">{locale.currency}</span>
            {locale.currency !== "USD" && " · convertidos desde USD"}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => {
            const price = annual ? p.yearly / 12 : p.monthly;
            const full = annual ? p.yearly : p.monthly;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`space-hover relative overflow-hidden rounded-3xl border bg-space-800/60 p-8 backdrop-blur-md transition-all duration-300 ${p.borderColor} ${p.neonShadow} ${
                  p.popular
                    ? "border-violet-500/40 scale-[1.03] shadow-neon-violet"
                    : "border-white/10"
                }`}
              >
                {/* Inner nebula glow */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl"
                  style={{ background: p.neonColor.replace("0.5", "0.12").replace("0.6", "0.12") }}
                />

                {p.tag && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-purple-700 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-neon-violet">
                    {p.tag}
                  </span>
                )}

                <div className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.accent} shadow-lg`}
                  style={{ boxShadow: `0 0 20px ${p.neonColor.replace("0.5","0.35").replace("0.6","0.35")}` }}>
                  <p.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="relative mt-5 font-display text-2xl font-bold text-white">
                  {p.name}
                </h3>

                <div className="relative mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold text-white">
                    {formatPrice(price, locale)}
                  </span>
                  <span className="text-white/50">/mes</span>
                </div>
                <p className="relative mt-1 text-xs text-white/40">
                  {annual
                    ? `Facturado anualmente · ${formatPrice(full, locale)} / año`
                    : `Facturado mensualmente`}
                </p>

                {/* 14-day trial badge */}
                <div className="relative mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-emerald-300">Empieza 14 días gratis</p>
                    <p className="text-[11px] leading-tight text-emerald-400/70">
                      Cancela antes y no se cobra nada.
                    </p>
                  </div>
                </div>

                <a
                  href={`/api/checkout?plan=${p.id}&interval=${annual ? "year" : "month"}`}
                  className={`relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full py-3 font-semibold transition-all ${
                    p.popular
                      ? "bg-gradient-to-r from-violet-500 to-purple-700 text-white hover:scale-[1.02] shadow-neon-violet"
                      : "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 hover:translate-x-full" />
                  Empezar ahora →
                </a>

                <ul className="relative mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            { emoji: "🔒", title: "Pago seguro", sub: "Stripe · SSL · 3-D Secure" },
            { emoji: "⏱️", title: "14 días gratis", sub: "Cancela antes y $0" },
            { emoji: "↻", title: "Cancelación en 1 clic", sub: "Desde tu dashboard" }
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-space-800/50 p-3 backdrop-blur">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-neon-cyan/20 bg-neon-cyan/10 text-lg">
                {b.emoji}
              </div>
              <div>
                <p className="text-xs font-bold text-white/90">{b.title}</p>
                <p className="text-[11px] text-white/45">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
