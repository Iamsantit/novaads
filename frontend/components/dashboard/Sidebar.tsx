"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles, FolderOpen, BookOpen, LayoutTemplate,
  Star, BarChart2, Users, CreditCard, Settings,
  ChevronRight
} from "lucide-react";
import Logo from "@/components/Logo";

const NAV = [
  {
    group: "IA'S",
    items: [
      { href: "/dashboard", icon: Sparkles, label: "IA's", badge: "NEW", exact: true, neon: "neon-cyan" }
    ]
  },
  {
    group: null,
    items: [
      { href: "/dashboard/proyectos", icon: FolderOpen, label: "Proyectos", neon: "violet" },
      { href: "/dashboard/biblioteca", icon: BookOpen, label: "Biblioteca", neon: "pink" },
      { href: "/dashboard/plantillas", icon: LayoutTemplate, label: "Plantillas", neon: "cyan" }
    ]
  },
  {
    group: "CUENTA",
    items: [
      { href: "/dashboard/marca", icon: Star, label: "Marca", neon: "yellow" },
      { href: "/dashboard/analitica", icon: BarChart2, label: "Analítica", neon: "green" },
      { href: "/dashboard/equipo", icon: Users, label: "Equipo", neon: "violet" },
      { href: "/dashboard/facturacion", icon: CreditCard, label: "Facturación", neon: "pink" },
      { href: "/dashboard/ajustes", icon: Settings, label: "Ajustes", neon: "cyan" }
    ]
  }
];

const CREDITS_USED = 342;
const CREDITS_TOTAL = 500;
const TRIAL_DAYS = 11;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative flex h-full w-64 shrink-0 flex-col border-r border-white/8 bg-space-950 overflow-hidden">
      {/* Animated nebula blob */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full blur-[60px]"
        style={{ background: "rgba(0,245,255,0.07)" }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -15, 10, 0], y: [0, 20, -10, 0], scale: [1, 0.9, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 rounded-full blur-[70px]"
        style={{ background: "rgba(168,85,247,0.07)" }}
      />

      {/* Logo */}
      <div className="relative flex items-center gap-3 border-b border-white/8 px-5 py-4">
        <Logo className="h-8 w-auto" />
      </div>

      {/* Nav */}
      <nav className="relative flex-1 overflow-y-auto px-3 py-4">
        {NAV.map((section, si) => (
          <div key={si} className="mb-5">
            {section.group && (
              <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[0.15em] text-white/25">
                {section.group}
              </p>
            )}
            {section.items.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href) && item.href !== "/dashboard";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative mb-0.5 flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-neon-cyan/10 text-neon-cyan shadow-[inset_0_0_0_1px_rgba(0,245,255,0.2)]"
                      : "text-white/50 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  {/* Active indicator bar */}
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute left-0 top-0 h-full w-0.5 rounded-r bg-neon-cyan shadow-[0_0_8px_rgba(0,245,255,0.8)]"
                    />
                  )}

                  <item.icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      active ? "text-neon-cyan" : "text-white/30 group-hover:text-white/60"
                    }`}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-neon-cyan/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-neon-cyan">
                      {item.badge}
                    </span>
                  )}
                  {active && (
                    <ChevronRight className="h-3.5 w-3.5 text-neon-cyan/60" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Trial / credit bar */}
      <div className="relative m-3 overflow-hidden rounded-2xl border border-neon-cyan/15 bg-space-800/80 p-4 backdrop-blur">
        {/* Top neon line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Prueba Pro
          </p>
          <span className="rounded-full bg-neon-cyan/15 px-2 py-0.5 text-[9px] font-bold text-neon-cyan">
            {TRIAL_DAYS}d
          </span>
        </div>

        <p className="mt-1.5 font-display text-sm font-bold text-white">
          {CREDITS_USED.toLocaleString()}
          <span className="font-normal text-white/40"> / {CREDITS_TOTAL.toLocaleString()} créditos</span>
        </p>

        {/* Credit bar */}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(CREDITS_USED / CREDITS_TOTAL) * 100}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-violet-400 shadow-[0_0_6px_rgba(0,245,255,0.6)]"
          />
        </div>

        <Link
          href="/dashboard/facturacion"
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-neon-cyan/20 bg-neon-cyan/8 py-2 text-xs font-semibold text-neon-cyan transition hover:bg-neon-cyan/15 hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]"
        >
          Mejorar plan →
        </Link>
      </div>
    </aside>
  );
}
