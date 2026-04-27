"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Star, Upload, Save, Palette, Type, Image as ImageIcon } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

const COLOR_PRESETS = [
  { name: "Cyan / Navy", primary: "#1cc5e7", secondary: "#0b1e3f" },
  { name: "Sunset", primary: "#fb923c", secondary: "#831843" },
  { name: "Forest", primary: "#10b981", secondary: "#064e3b" },
  { name: "Royal", primary: "#8b5cf6", secondary: "#1e1b4b" },
  { name: "Mono", primary: "#0a0a0a", secondary: "#737373" },
  { name: "Coral", primary: "#f43f5e", secondary: "#0f172a" }
];

const FONTS = [
  { name: "Sora + Inter", display: "Sora", body: "Inter", style: "font-display" },
  { name: "Playfair + Lora", display: "Playfair Display", body: "Lora", style: "" },
  { name: "Space Grotesk + IBM Plex", display: "Space Grotesk", body: "IBM Plex Sans", style: "" },
  { name: "Montserrat + Open Sans", display: "Montserrat", body: "Open Sans", style: "" }
];

export default function MarcaPage() {
  const [brand, setBrand] = useState({ name: "Mi Marca", tagline: "Construye lo imposible" });
  const [primary, setPrimary] = useState("#1cc5e7");
  const [secondary, setSecondary] = useState("#0b1e3f");
  const [fontIdx, setFontIdx] = useState(0);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        icon={Star}
        chip="Marca"
        title="Tu identidad visual"
        subtitle="Define logo, paleta y tipografía. NovaAds las aplica automáticamente a todo lo que generes."
        tone="from-amber-400 to-rose-500"
        actions={
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-navy-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:scale-[1.02]">
            <Save className="h-4 w-4" /> Guardar
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Left: editor */}
        <div className="space-y-6">
          {/* Brand identity */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-cyan-600" />
              <h2 className="font-display font-bold text-gray-900">Identidad</h2>
            </div>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Nombre</span>
              <input
                value={brand.name}
                onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              />
            </label>
            <label className="mt-4 block">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tagline</span>
              <input
                value={brand.tagline}
                onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              />
            </label>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">Logo</p>
                <p className="text-xs text-gray-500">PNG, SVG. Hasta 2 MB.</p>
              </div>
              <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-cyan-300">
                <Upload className="h-3.5 w-3.5" /> Subir
              </button>
            </div>
          </motion.section>

          {/* Colors */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <Palette className="h-4 w-4 text-cyan-600" />
              <h2 className="font-display font-bold text-gray-900">Paleta</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Primario</span>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                  <input
                    type="color"
                    value={primary}
                    onChange={(e) => setPrimary(e.target.value)}
                    className="h-7 w-7 cursor-pointer rounded border-0"
                  />
                  <span className="font-mono text-sm">{primary}</span>
                </div>
              </label>
              <label>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Secundario</span>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                  <input
                    type="color"
                    value={secondary}
                    onChange={(e) => setSecondary(e.target.value)}
                    className="h-7 w-7 cursor-pointer rounded border-0"
                  />
                  <span className="font-mono text-sm">{secondary}</span>
                </div>
              </label>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-gray-500">Presets</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {COLOR_PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    setPrimary(p.primary);
                    setSecondary(p.secondary);
                  }}
                  className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold transition hover:border-gray-300"
                >
                  <span className="flex h-4 w-4 overflow-hidden rounded-full">
                    <span className="h-full w-1/2" style={{ background: p.primary }} />
                    <span className="h-full w-1/2" style={{ background: p.secondary }} />
                  </span>
                  {p.name}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Fonts */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <Type className="h-4 w-4 text-cyan-600" />
              <h2 className="font-display font-bold text-gray-900">Tipografía</h2>
            </div>
            <div className="space-y-2">
              {FONTS.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setFontIdx(i)}
                  className={`w-full rounded-xl border p-3 text-left transition ${
                    fontIdx === i ? "border-cyan-400 bg-cyan-50" : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{f.name}</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Aa Bb Cc 123</p>
                </button>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right: preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="sticky top-6 h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card"
        >
          <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3 text-xs text-gray-500">
            Vista previa en vivo
          </div>
          <div className="p-8" style={{ background: `linear-gradient(135deg, ${secondary} 0%, ${primary} 100%)` }}>
            <div className="rounded-2xl bg-white/95 p-8 backdrop-blur">
              <div
                className="inline-block rounded-lg px-3 py-1.5 text-sm font-bold text-white"
                style={{ background: primary }}
              >
                Logo
              </div>
              <h2 className="mt-5 text-3xl font-bold" style={{ color: secondary }}>
                {brand.name}
              </h2>
              <p className="mt-2 text-gray-600">{brand.tagline}</p>
              <button
                className="mt-6 rounded-full px-6 py-2.5 text-sm font-semibold text-white"
                style={{ background: primary }}
              >
                Botón principal
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4">
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Primario</p>
              <p className="font-mono text-sm font-bold" style={{ color: primary }}>{primary}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Secundario</p>
              <p className="font-mono text-sm font-bold" style={{ color: secondary }}>{secondary}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
