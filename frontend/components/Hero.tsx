"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Wand2, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const rotatingWords = [
  "una landing page",
  "un funnel completo",
  "tus campañas",
  "tus creativos",
  "tu guion de video",
  "tu pitch deck"
];

const NEBULAE = [
  { x: "18%", y: "30%", w: 500, color: "rgba(0,245,255,0.12)", dur: 14 },
  { x: "75%", y: "20%", w: 420, color: "rgba(168,85,247,0.13)", dur: 18 },
  { x: "50%", y: "80%", w: 380, color: "rgba(244,114,182,0.09)", dur: 22 },
  { x: "88%", y: "65%", w: 280, color: "rgba(0,245,255,0.07)", dur: 16 },
];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((v) => (v + 1) % rotatingWords.length), 2400);
    return () => clearInterval(t);
  }, []);

  // Cursor-follow glow
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const spot = el.querySelector<HTMLDivElement>("[data-cursor-glow]");
    if (!spot) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spot.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,245,255,0.08), transparent 50%)`;
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden pt-36 pb-28 sm:pt-44"
    >
      {/* Space grid */}
      <div className="absolute inset-0 -z-10 bg-space-grid [background-size:48px_48px] opacity-30" />

      {/* Animated nebula blobs */}
      {NEBULAE.map((n, i) => (
        <motion.div
          key={i}
          aria-hidden
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: n.dur, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -z-10 rounded-full blur-[80px]"
          style={{
            left: n.x,
            top: n.y,
            width: n.w,
            height: n.w,
            background: n.color,
          }}
        />
      ))}

      {/* Cursor glow */}
      <div
        data-cursor-glow
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-75"
      />

      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1.5 text-sm font-medium text-cyan-300 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
          </span>
          <Zap className="h-3.5 w-3.5" />
          Nuevo · Generador todo-en-uno con IA
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Un prompt. Todo tu{" "}
          <br className="hidden sm:block" />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-neon-cyan via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              marketing
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 10"
              fill="none"
              aria-hidden
            >
              <motion.path
                d="M2 8 C 80 0, 220 0, 298 8"
                stroke="url(#underline-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.9 }}
              />
              <defs>
                <linearGradient id="underline-grad" x1="0" y1="0" x2="300" y2="0">
                  <stop stopColor="#00f5ff" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="block">en minutos.</span>
        </motion.h1>

        {/* Subtitle with rotating word */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-7 max-w-2xl text-lg text-white/60"
        >
          Escribe lo que quieres vender y NovaAds genera automáticamente{" "}
          <span className="inline-block min-w-[220px] text-left font-semibold text-neon-cyan">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIdx]}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="block"
              >
                {rotatingWords[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
          Lanza tu producto hoy, no dentro de 3 meses.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="/registro" className="btn-primary group text-base">
            <Sparkles className="h-5 w-5" />
            Empezar gratis 14 días
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="/iniciar-sesion" className="btn-ghost text-base">
            Iniciar sesión
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-sm text-white/35"
        >
          Sin permanencia · Cancela cuando quieras · Precio en tu moneda local
        </motion.p>

        {/* Dashboard preview — floating space UI */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-px rounded-[1.6rem] bg-gradient-to-r from-neon-cyan/40 via-violet-500/30 to-neon-cyan/40 blur-sm" />

          <div className="gradient-border p-[3px]">
            <div className="overflow-hidden rounded-[1.4rem] bg-space-900">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-white/6 bg-space-800 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
                <span className="ml-4 rounded-md border border-white/8 bg-space-700 px-4 py-1 text-xs text-white/40">
                  app.novaads.ai / studio
                </span>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-[260px_1fr] lg:p-8">
                {/* Prompt panel */}
                <div className="rounded-2xl border border-neon-cyan/15 bg-space-800/80 p-4 text-left backdrop-blur">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neon-cyan">
                    <Wand2 className="h-4 w-4" /> Prompt maestro
                  </div>
                  <div className="mt-3 rounded-xl border border-white/6 bg-space-900/60 p-3 text-sm text-white/85">
                    Quiero vender ropa deportiva para mujeres, marca premium, ticket 80 USD.
                    <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-neon-cyan align-middle" />
                  </div>
                  <button className="group relative mt-3 w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-navy-600 py-2 text-sm font-semibold text-white shadow-neon-cyan transition hover:scale-[1.02]">
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    Generar todo →
                  </button>

                  {/* Mini stats */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[{ v: "2:47", l: "Tiempo" }, { v: "+340%", l: "CVR" }].map((s) => (
                      <div key={s.l} className="rounded-lg border border-white/6 bg-space-900/50 p-2 text-center">
                        <p className="font-display text-sm font-bold text-neon-cyan">{s.v}</p>
                        <p className="text-[10px] text-white/45">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Output grid */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {[
                    { t: "Landing", c: "from-cyan-400/60 to-cyan-600/60", neon: "rgba(0,245,255,0.4)", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=60" },
                    { t: "Funnel", c: "from-violet-500/60 to-purple-700/60", neon: "rgba(168,85,247,0.4)", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60" },
                    { t: "Ads copy", c: "from-pink-500/60 to-rose-600/60", neon: "rgba(244,114,182,0.4)", img: "https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7?w=400&auto=format&fit=crop&q=60" },
                    { t: "Imágenes", c: "from-cyan-500/60 to-teal-600/60", neon: "rgba(0,245,255,0.35)", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop&q=60" },
                    { t: "Video", c: "from-rose-500/60 to-pink-600/60", neon: "rgba(244,114,182,0.35)", img: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?w=400&auto=format&fit=crop&q=60" },
                    { t: "Pitch", c: "from-emerald-500/60 to-green-600/60", neon: "rgba(74,222,128,0.35)", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop&q=60" }
                  ].map((x, idx) => (
                    <motion.div
                      key={x.t}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + idx * 0.09 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className={`group relative h-28 overflow-hidden rounded-2xl bg-gradient-to-br ${x.c} p-3 text-left cursor-pointer`}
                      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.08)` }}
                    >
                      <img
                        src={x.img}
                        alt={x.t}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-space-900/80 to-transparent" />
                      {/* Neon hover border */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ boxShadow: `inset 0 0 0 1px ${x.neon}` }}
                      />
                      {/* Shimmer */}
                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <div className="relative">
                        <span className="text-xs font-semibold text-white">{x.t}</span>
                        <div className="mt-2 space-y-1.5">
                          <div className="h-1.5 w-3/4 rounded bg-white/40" />
                          <div className="h-1.5 w-2/3 rounded bg-white/30" />
                          <div className="h-1.5 w-1/2 rounded bg-white/20" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating stat badges */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-16 hidden rounded-2xl border border-neon-cyan/20 bg-space-800/90 p-4 shadow-neon-cyan backdrop-blur-md md:block"
          >
            <p className="text-[10px] uppercase tracking-wider text-white/50">Tiempo promedio</p>
            <p className="font-display text-2xl font-bold text-white">2 min 47s</p>
            <p className="text-xs font-semibold text-neon-cyan">⚡ 120× más rápido</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-6 top-28 hidden rounded-2xl border border-violet-500/20 bg-space-800/90 p-4 shadow-neon-violet backdrop-blur-md md:block"
          >
            <p className="text-[10px] uppercase tracking-wider text-white/50">Conversión media</p>
            <p className="font-display text-2xl font-bold text-white">+340%</p>
            <p className="text-xs font-semibold text-violet-400">↑ vs. templates</p>
          </motion.div>

          {/* Bottom glow reflection */}
          <div className="pointer-events-none absolute -bottom-16 left-1/2 h-32 w-2/3 -translate-x-1/2 rounded-full bg-neon-cyan/10 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
