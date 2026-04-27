"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Sparkles, Layout, ShoppingBag, BookOpen } from "lucide-react";

/**
 * Public royalty-free images from Unsplash. Swap for your own marketing
 * renders when they're ready.
 */
const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=70",
    title: "Dashboard analytics",
    tag: "SaaS",
    icon: Sparkles
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&auto=format&fit=crop&q=70",
    title: "Tienda de ropa premium",
    tag: "Ecommerce",
    icon: ShoppingBag
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=70",
    title: "Landing de lanzamiento",
    tag: "Landing",
    icon: Layout
  },
  {
    src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&auto=format&fit=crop&q=70",
    title: "Blog de creator",
    tag: "Blog",
    icon: BookOpen
  }
];

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.98]);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10 bg-mesh" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Demo en vivo</span>
          <h2 className="heading-display mt-4">
            Mira cómo <span className="text-gradient">nace tu negocio</span> en 3 minutos
          </h2>
          <p className="mt-4 text-lg text-navy-700/80">
            Escribes una frase. NovaAds orquesta 6 IAs en paralelo. Publicas la misma tarde.
          </p>
        </div>

        {/* Video player */}
        <motion.div
          style={{ y, scale }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          <div className="gradient-border p-2 shadow-[0_30px_100px_-20px_rgba(11,30,63,0.35)]">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-950">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=70"
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source
                  src="https://cdn.pixabay.com/video/2021/08/04/83966-585866002_large.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Overlay + play button */}
              <button
                onClick={toggle}
                aria-label={playing ? "Pausar" : "Reproducir"}
                className={`absolute inset-0 flex items-center justify-center transition-all ${
                  playing ? "bg-black/0" : "bg-black/40"
                }`}
              >
                <motion.span
                  initial={false}
                  animate={{ scale: playing ? 0.85 : 1 }}
                  className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white text-navy-900 shadow-2xl"
                >
                  <span className={`absolute inset-0 rounded-full bg-white/60 ${playing ? "" : "animate-ping"}`} />
                  {playing ? (
                    <Pause className="relative h-10 w-10" />
                  ) : (
                    <Play className="relative h-10 w-10 translate-x-0.5" />
                  )}
                </motion.span>
              </button>

              {/* Bottom overlay info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 to-transparent p-6 pt-12 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Caso real
                </p>
                <p className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                  Luna Activewear: del prompt a la primera venta en 4 horas
                </p>
              </div>
            </div>
          </div>

          {/* Floating stat cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-10 hidden rounded-2xl border border-navy-900/5 bg-white/95 p-3 shadow-card backdrop-blur md:block"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-500">Generación</p>
            <p className="font-display text-xl font-bold text-navy-900">2:47</p>
            <p className="text-[10px] text-cyan-600">⚡ 120× más rápido</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-6 bottom-20 hidden rounded-2xl border border-navy-900/5 bg-white/95 p-3 shadow-card backdrop-blur md:block"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-500">Conversión</p>
            <p className="font-display text-xl font-bold text-navy-900">+340%</p>
            <p className="text-[10px] text-cyan-600">↑ vs. templates</p>
          </motion.div>
        </motion.div>

        {/* Gallery */}
        <div className="mt-20">
          <div className="mb-8 text-center">
            <span className="chip">Galería de casos</span>
            <h3 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Ejemplos reales generados con NovaAds
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((g, i) => (
              <motion.a
                key={g.title}
                href="#pricing"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative block overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-navy-100 to-cyan-100">
                  <img
                    src={g.src}
                    alt={g.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-800 backdrop-blur">
                    <g.icon className="h-3 w-3" /> {g.tag}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-sm font-bold text-white">{g.title}</p>
                  <p className="mt-1 text-xs text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                    Clic para replicarlo →
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
