"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LayoutTemplate, ShoppingBag, Layout, BookOpen, Rocket, ArrowRight, Star } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

const TEMPLATES = [
  {
    id: "landing-saas",
    type: "Landing",
    name: "SaaS minimalista",
    desc: "Hero + feature grid + pricing + CTA. Optimizado para conversión.",
    icon: Rocket,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=70",
    used: 2841
  },
  {
    id: "ecom-fashion",
    type: "Ecommerce",
    name: "Fashion premium",
    desc: "Tienda de moda con producto destacado, lookbook y newsletter.",
    icon: ShoppingBag,
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=70",
    used: 1923
  },
  {
    id: "blog-creator",
    type: "Blog",
    name: "Creator newsletter",
    desc: "Blog editorial + newsletter integrada + about del autor.",
    icon: BookOpen,
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=70",
    used: 854
  },
  {
    id: "landing-coach",
    type: "Landing",
    name: "Coach / curso online",
    desc: "Sales page largo formato con módulos, testimonios y garantía.",
    icon: Layout,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=70",
    used: 1502
  },
  {
    id: "ecom-food",
    type: "Ecommerce",
    name: "Food & gourmet",
    desc: "Catálogo de productos artesanales con storytelling y origen.",
    icon: ShoppingBag,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=70",
    used: 612
  },
  {
    id: "saas-fintech",
    type: "SaaS",
    name: "Fintech app",
    desc: "Hero con datos en tiempo real, comparativa de planes, seguridad.",
    icon: Rocket,
    img: "https://images.unsplash.com/photo-1554260570-e9689a3418b8?w=800&q=70",
    used: 1107
  }
];

const TYPE_TONE: Record<string, string> = {
  Landing: "from-violet-400 to-violet-600",
  Ecommerce: "from-emerald-400 to-teal-600",
  Blog: "from-amber-400 to-orange-600",
  SaaS: "from-cyan-400 to-blue-700"
};

export default function PlantillasPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        icon={LayoutTemplate}
        chip="Plantillas"
        title="Empieza más rápido con una plantilla"
        subtitle="Cada plantilla pre-rellena tu prompt con un brief optimizado. Tú sólo personalizas."
        tone="from-cyan-400 to-navy-700"
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-cyan-300 hover:shadow-[0_18px_40px_-12px_rgba(28,197,231,0.35)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={t.img}
                alt={t.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-80" />
              <span
                className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-br ${TYPE_TONE[t.type]} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow`}
              >
                <t.icon className="h-3 w-3" /> {t.type}
              </span>
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-navy-800 backdrop-blur">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {(t.used / 1000).toFixed(1)}k usos
              </span>
            </div>
            <div className="p-5">
              <p className="font-display text-lg font-bold text-gray-900">{t.name}</p>
              <p className="mt-1 line-clamp-2 text-sm text-gray-500">{t.desc}</p>
              <Link
                href={`/dashboard/ia?module=landing&template=${t.id}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 hover:underline"
              >
                Usar plantilla <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
