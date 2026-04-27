"use client";

import { motion } from "framer-motion";
import { BookOpen, Image as ImageIcon, Film, FileText, Download, Heart } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";

type AssetType = "todos" | "imagenes" | "videos" | "copies";

const ASSETS = [
  { id: "1", type: "imagenes", title: "Banner Luna Activewear", url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=70" },
  { id: "2", type: "imagenes", title: "Carrusel verano", url: "https://images.unsplash.com/photo-1517941875821-fa3a64bcaeb9?w=600&q=70" },
  { id: "3", type: "imagenes", title: "Hero ecommerce", url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=70" },
  { id: "4", type: "imagenes", title: "Lifestyle producto", url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=70" },
  { id: "5", type: "imagenes", title: "Pack premium", url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=70" },
  { id: "6", type: "imagenes", title: "Mockup app", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70" },
  { id: "7", type: "videos", title: "Reel lanzamiento", url: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?w=600&q=70" },
  { id: "8", type: "videos", title: "Demo SaaS 30s", url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=70" },
  { id: "9", type: "copies", title: "Copy Meta Ads — yoga", desc: "5 variantes, hooks A/B testeados" },
  { id: "10", type: "copies", title: "Email secuencia welcome", desc: "7 emails, día 0 a 14" },
  { id: "11", type: "copies", title: "Landing copy ecommerce", desc: "Hero + benefits + FAQ + CTA" }
];

const TABS: { id: AssetType; label: string; icon: any }[] = [
  { id: "todos", label: "Todos", icon: BookOpen },
  { id: "imagenes", label: "Imágenes", icon: ImageIcon },
  { id: "videos", label: "Videos", icon: Film },
  { id: "copies", label: "Copies", icon: FileText }
];

export default function BibliotecaPage() {
  const [tab, setTab] = useState<AssetType>("todos");
  const filtered = tab === "todos" ? ASSETS : ASSETS.filter((a) => a.type === tab);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        icon={BookOpen}
        chip="Biblioteca"
        title="Tu librería de activos"
        subtitle="Imágenes generadas, videos, copies y plantillas. Reutiliza lo que ya generaste."
        tone="from-cyan-400 to-teal-600"
      />

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "border-cyan-400 bg-cyan-50 text-cyan-700 shadow-sm"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
              <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px]">
                {t.id === "todos" ? ASSETS.length : ASSETS.filter((a) => a.type === t.id).length}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((a, i) => (
          <motion.div
            key={a.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-[0_14px_30px_-12px_rgba(28,197,231,0.35)]"
          >
            {(a.type === "imagenes" || a.type === "videos") && (
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src={(a as any).url}
                  alt={a.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {a.type === "videos" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-900">
                      <Film className="h-5 w-5" />
                    </div>
                  </div>
                )}
              </div>
            )}
            {a.type === "copies" && (
              <div className="aspect-video bg-gradient-to-br from-cyan-100 via-white to-navy-100 p-5">
                <FileText className="h-6 w-6 text-cyan-600" />
                <p className="mt-3 line-clamp-3 text-sm text-gray-600">{(a as any).desc}</p>
              </div>
            )}
            <div className="flex items-center justify-between p-3">
              <p className="truncate text-sm font-semibold text-gray-900">{a.title}</p>
              <div className="flex gap-1">
                <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-rose-500">
                  <Heart className="h-3.5 w-3.5" />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-cyan-600">
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
