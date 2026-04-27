"use client";

import { Bell, Sliders, Plus, Search, LogOut } from "lucide-react";
import Link from "next/link";

type Props = { userEmail?: string; userName?: string };

export default function TopBar({ userEmail, userName }: Props = {}) {
  const initial = (userName ?? userEmail ?? "U")[0]?.toUpperCase();
  const display = userName ?? userEmail?.split("@")[0] ?? "Usuario";

  return (
    <header className="flex items-center gap-3 border-b border-white/8 bg-space-900/80 px-6 py-3 backdrop-blur-md">
      {/* Search */}
      <div className="group flex flex-1 items-center gap-2 rounded-xl border border-white/8 bg-space-800/60 px-3 py-2 text-sm text-white/35 transition-all hover:border-neon-cyan/25 hover:bg-space-800 focus-within:border-neon-cyan/35 focus-within:shadow-[0_0_0_3px_rgba(0,245,255,0.08)]">
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1 select-none">Buscar proyectos, plantillas, activos...</span>
        <kbd className="hidden rounded-md border border-white/10 bg-space-700 px-1.5 py-0.5 text-[10px] font-mono text-white/30 sm:block">
          ⌘K
        </kbd>
      </div>

      {/* Trial badge */}
      <div className="hidden items-center gap-1.5 rounded-full border border-neon-cyan/25 bg-neon-cyan/8 px-3 py-1.5 text-xs font-semibold text-neon-cyan sm:flex">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-cyan" />
        </span>
        Prueba · 11 días restantes
      </div>

      {/* Icon buttons */}
      <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-space-800/60 text-white/40 transition hover:border-white/15 hover:text-white/70 backdrop-blur">
        <Sliders className="h-4 w-4" />
      </button>
      <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-space-800/60 text-white/40 transition hover:border-white/15 hover:text-white/70 backdrop-blur">
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_4px_rgba(0,245,255,0.8)]" />
      </button>

      {/* New project */}
      <Link
        href="/dashboard/ia"
        className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-navy-600 px-4 py-2 text-sm font-semibold text-white shadow-neon-cyan transition hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(0,245,255,0.5)]"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <Plus className="h-4 w-4" />
        <span className="hidden sm:block">Nuevo proyecto</span>
      </Link>

      {/* User */}
      <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-space-800/60 px-2.5 py-1.5 backdrop-blur">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 text-xs font-bold text-white shadow-[0_0_8px_rgba(0,245,255,0.4)]">
          {initial}
        </div>
        <span className="hidden text-sm font-semibold text-white/80 sm:block">{display}</span>
        <form action="/api/logout" method="post">
          <button
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition hover:bg-red-500/10 hover:text-red-400"
            title="Cerrar sesión"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </header>
  );
}
