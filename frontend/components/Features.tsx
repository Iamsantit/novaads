"use client";

import { motion } from "framer-motion";
import {
  Layout, GitBranch, Megaphone, ImageIcon,
  Film, Presentation, ShieldCheck, Gauge
} from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Landing pages que convierten",
    desc: "Hero + oferta + beneficios + prueba social + CTA. Estructura validada en +10.000 lanzamientos.",
    neon: "rgba(0,245,255,0.7)",
    glow: "shadow-neon-cyan",
    accent: "from-cyan-400 to-cyan-600",
    ring: "group-hover:shadow-[0_0_30px_rgba(0,245,255,0.25)]"
  },
  {
    icon: GitBranch,
    title: "Funnels de ventas completos",
    desc: "Captura → ventas → checkout → gracias. Más secuencia de emails automatizados lista para enviar.",
    neon: "rgba(168,85,247,0.7)",
    glow: "shadow-neon-violet",
    accent: "from-violet-500 to-purple-700",
    ring: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
  },
  {
    icon: Megaphone,
    title: "Campañas con segmentación",
    desc: "Copies, hooks, ángulos creativos y segmentación detallada para Facebook, Instagram y TikTok Ads.",
    neon: "rgba(244,114,182,0.7)",
    glow: "shadow-neon-pink",
    accent: "from-pink-500 to-rose-600",
    ring: "group-hover:shadow-[0_0_30px_rgba(244,114,182,0.25)]"
  },
  {
    icon: ImageIcon,
    title: "Creatividades e imágenes",
    desc: "Banners, creativos para anuncios, mockups y piezas para redes con tu identidad visual.",
    neon: "rgba(0,245,255,0.7)",
    glow: "shadow-neon-cyan",
    accent: "from-cyan-400 to-teal-600",
    ring: "group-hover:shadow-[0_0_30px_rgba(0,245,255,0.25)]"
  },
  {
    icon: Film,
    title: "Videos y guiones",
    desc: "Guion, storyboard e ideas visuales para reels, anuncios cortos y VSLs de 30–60 segundos.",
    neon: "rgba(251,191,36,0.7)",
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.4)]",
    accent: "from-yellow-400 to-orange-500",
    ring: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.25)]"
  },
  {
    icon: Presentation,
    title: "Pitch decks y presentaciones",
    desc: "Problema, solución, mercado, modelo de negocio. Listas para inversores o ventas B2B.",
    neon: "rgba(74,222,128,0.7)",
    glow: "shadow-neon-green",
    accent: "from-emerald-400 to-green-600",
    ring: "group-hover:shadow-[0_0_30px_rgba(74,222,128,0.25)]"
  },
  {
    icon: Gauge,
    title: "Optimizado para conversión",
    desc: "Cada sección se genera siguiendo principios de CRO. Copywriting orientado a acción, no a relleno.",
    neon: "rgba(168,85,247,0.7)",
    glow: "shadow-neon-violet",
    accent: "from-violet-400 to-indigo-600",
    ring: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
  },
  {
    icon: ShieldCheck,
    title: "Tuyo para siempre",
    desc: "Exporta a HTML, Shopify, WordPress, Notion o PDF. Sin lock-in, sin dependencias raras.",
    neon: "rgba(0,245,255,0.7)",
    glow: "shadow-neon-cyan",
    accent: "from-cyan-400 to-navy-600",
    ring: "group-hover:shadow-[0_0_30px_rgba(0,245,255,0.25)]"
  }
];

export default function Features() {
  return (
    <section id="features" className="relative py-28">
      {/* Space grid overlay */}
      <div className="absolute inset-0 -z-10 bg-space-grid [background-size:60px_60px] opacity-20" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Todo en uno</span>
          <h2 className="heading-display mt-4">
            Seis herramientas en{" "}
            <span className="text-gradient">una sola plataforma</span>
          </h2>
          <p className="mt-4 text-lg text-white/55">
            Olvídate de pagar ChatGPT, Midjourney, Runway, Canva, Mailchimp y un copywriter.
            NovaAds los reemplaza con un prompt.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group"
            >
              <div
                className={`space-hover relative h-full overflow-hidden rounded-2xl border border-white/8 bg-space-800/50 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${f.ring} hover:border-white/15`}
              >
                {/* Hover neon glow bg */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 30% 20%, ${f.neon.replace("0.7", "0.06")} 0%, transparent 60%)` }}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.accent} ${f.glow} shadow-lg`}
                >
                  <f.icon className="h-5 w-5 text-white" />
                </motion.div>

                <h3 className="relative mt-5 font-display text-base font-bold text-white">
                  {f.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                  {f.desc}
                </p>

                {/* Bottom neon line on hover */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${f.neon}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
