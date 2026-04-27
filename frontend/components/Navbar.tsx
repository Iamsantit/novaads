"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Zap } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "#features", label: "Funciones" },
  { href: "#how", label: "Cómo funciona" },
  { href: "#pricing", label: "Precios" },
  { href: "#faq", label: "FAQ" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-neon-cyan/15 bg-space-900/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,245,255,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 group">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-white/70 transition-colors hover:text-white group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-neon-cyan to-violet-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/iniciar-sesion"
            className="text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            Iniciar sesión
          </a>
          <a
            href="/registro"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-navy-600 px-5 py-2 text-sm font-semibold text-white shadow-neon-cyan transition-all hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(0,245,255,0.6)]"
          >
            {/* Shimmer sweep */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <Sparkles className="h-4 w-4" />
            Prueba gratis 14 días
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Abrir menú"
          className="rounded-xl border border-white/10 p-2 text-white/70 backdrop-blur transition hover:border-neon-cyan/40 hover:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/8 bg-space-900/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-3 py-2.5 text-white/70 transition hover:bg-white/5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <div className="my-2 h-px bg-white/8" />
              <a
                href="/iniciar-sesion"
                className="rounded-xl px-3 py-2.5 text-white/60 hover:text-white"
                onClick={() => setOpen(false)}
              >
                Iniciar sesión
              </a>
              <a
                href="/registro"
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-navy-600 px-4 py-3 font-semibold text-white shadow-neon-cyan"
                onClick={() => setOpen(false)}
              >
                <Zap className="h-4 w-4" /> Prueba gratis 14 días
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
