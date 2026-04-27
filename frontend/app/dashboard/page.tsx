"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Layout, GitBranch, Megaphone, ImageIcon, Film,
  Presentation, Sparkles, ArrowRight, Zap
} from "lucide-react";

const IAS = [
  {
    id: "landing",
    icon: Layout,
    label: "Páginas Web",
    desc: "Genera una landing completa con IA",
    badge: "MÁS USADA",
    accent: "from-cyan-400 to-cyan-600",
    neon: "rgba(0,245,255,0.6)",
    neonShadow: "hover:shadow-neon-cyan",
    href: "/dashboard/paginas"
  },
  {
    id: "funnel",
    icon: GitBranch,
    label: "Embudos de venta",
    desc: "5 páginas + secuencia de emails",
    accent: "from-violet-500 to-purple-700",
    neon: "rgba(168,85,247,0.6)",
    neonShadow: "hover:shadow-neon-violet",
    href: "/dashboard/paginas?tipo=funnel"
  },
  {
    id: "ads",
    icon: Megaphone,
    label: "Anuncios y Campañas",
    desc: "Copies, hooks y targeting Meta/Google",
    accent: "from-pink-500 to-rose-600",
    neon: "rgba(244,114,182,0.6)",
    neonShadow: "hover:shadow-neon-pink",
    href: "/dashboard/campanas"
  },
  {
    id: "images",
    icon: ImageIcon,
    label: "Imágenes",
    desc: "Creatividades para ads y redes",
    accent: "from-cyan-400 to-teal-600",
    neon: "rgba(0,245,255,0.5)",
    neonShadow: "hover:shadow-neon-cyan",
    href: "/dashboard/imagenes"
  },
  {
    id: "video",
    icon: Film,
    label: "Videos",
    desc: "Guion + storyboard listos para grabar",
    accent: "from-yellow-400 to-orange-500",
    neon: "rgba(251,191,36,0.6)",
    neonShadow: "hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]",
    href: "/dashboard/videos"
  },
  {
    id: "pitch",
    icon: Presentation,
    label: "Presentaciones",
    desc: "Pitch decks y sales decks",
    accent: "from-emerald-400 to-green-600",
    neon: "rgba(74,222,128,0.6)",
    neonShadow: "hover:shadow-neon-green",
    href: "/dashboard/presentaciones"
  },
  {
    id: "all",
    icon: Sparkles,
    label: "Todo-en-uno",
    desc: "Un prompt → los 6 activos de marketing",
    badge: "PREMIUM",
    accent: "from-cyan-400 to-violet-600",
    neon: "rgba(0,245,255,0.7)",
    neonShadow: "hover:shadow-neon-cyan",
    href: "/dashboard/ia?module=all",
    wide: true
  }
];

const RECENT = [
  { name: "Landing ropa deportiva mujer", module: "Páginas Web", date: "hace 2h", status: "Completado", color: "text-neon-cyan" },
  { name: "Funnel curso yoga", module: "Embudos", date: "ayer", status: "Completado", color: "text-neon-cyan" },
  { name: "Ads campaña verano 2026", module: "Anuncios", date: "hace 3 días", status: "Completado", color: "text-neon-cyan" }
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-neon-cyan/15 bg-space-800/60 p-8 text-white backdrop-blur-md"
        style={{ boxShadow: "0 0 0 1px rgba(0,245,255,0.08), 0 20px 60px -20px rgba(0,245,255,0.15)" }}
      >
        {/* Animated nebula blobs */}
        <motion.div
          aria-hidden
          animate={{ x: [0, 25, -15, 0], y: [0, -15, 10, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "rgba(0,245,255,0.12)" }}
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -20, 12, 0], y: [0, 12, -8, 0], scale: [1, 0.95, 1.08, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "rgba(168,85,247,0.10)" }}
        />

        {/* Top neon line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/25 bg-neon-cyan/10 px-3 py-1 text-xs font-semibold text-neon-cyan"
          >
            <Zap className="h-3 w-3" />
            Prueba Pro · 11 días restantes
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl"
          >
            ¿Qué vamos a lanzar hoy?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-1 max-w-lg text-sm text-white/55"
          >
            Cada IA es especialista en un formato. Combínalas o usa el modo todo-en-uno.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-5 grid max-w-sm gap-3 sm:grid-cols-3"
          >
            {[
              { v: "342", l: "Créditos usados", c: "text-neon-cyan" },
              { v: "12", l: "Proyectos", c: "text-violet-400" },
              { v: "+340%", l: "Conversión", c: "text-neon-green" }
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="rounded-xl border border-white/8 bg-space-900/50 px-3 py-2.5 backdrop-blur"
              >
                <p className={`font-display text-xl font-bold ${s.c}`}>{s.v}</p>
                <p className="text-[10px] uppercase tracking-wider text-white/40">{s.l}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Section title */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-white/90">Elige tu asistente de IA</h2>
        <span className="rounded-full border border-white/8 bg-space-800/50 px-3 py-1 text-xs text-white/35">
          {IAS.length} especialistas
        </span>
      </div>

      {/* IA grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {IAS.map((ia, i) => (
          <motion.div
            key={ia.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.07 }}
            whileHover={{ y: -6 }}
            className={ia.wide ? "sm:col-span-2 lg:col-span-1" : ""}
          >
            <Link href={ia.href} className="group block h-full">
              <div
                className={`space-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-space-800/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-white/15 ${ia.neonShadow}`}
              >
                {/* Inner neon hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 20% 20%, ${ia.neon.replace("0.6","0.07").replace("0.7","0.07").replace("0.5","0.07")} 0%, transparent 60%)` }}
                />

                {ia.badge && (
                  <motion.span
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ boxShadow: `0 0 10px ${ia.neon}` }}
                  >
                    {ia.badge}
                  </motion.span>
                )}

                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                  className={`relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${ia.accent} shadow-lg`}
                  style={{ boxShadow: `0 0 20px ${ia.neon.replace("0.6","0.35").replace("0.7","0.35").replace("0.5","0.25")}` }}
                >
                  <ia.icon className="h-6 w-6 text-white" />
                </motion.div>

                <p className="relative z-10 font-display text-base font-bold text-white">{ia.label}</p>
                <p className="relative z-10 mt-1 text-sm text-white/50">{ia.desc}</p>

                <div className="relative z-10 mt-4 flex items-center gap-1 text-sm font-semibold text-neon-cyan opacity-0 transition-all group-hover:opacity-100">
                  Usar IA <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                </div>
                <p className="relative z-10 mt-3 text-sm font-medium text-white/30 transition group-hover:opacity-0">
                  Usar IA →
                </p>

                {/* Bottom neon accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${ia.neon}, transparent)` }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent projects */}
      {RECENT.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-white/90">Proyectos recientes</h2>
            <Link href="/dashboard/proyectos" className="text-sm text-neon-cyan/70 hover:text-neon-cyan transition-colors">
              Ver todos →
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/8 bg-space-800/50 backdrop-blur-md">
            {RECENT.map((r, i) => (
              <div
                key={i}
                className={`group flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/3 ${
                  i < RECENT.length - 1 ? "border-b border-white/6" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-white/85">{r.name}</p>
                  <p className="text-xs text-white/35">{r.module} · {r.date}</p>
                </div>
                <span className="rounded-full border border-neon-cyan/20 bg-neon-cyan/10 px-3 py-1 text-xs font-semibold text-neon-cyan">
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
