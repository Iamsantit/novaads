"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FolderOpen, Plus, MoreHorizontal, Eye, Download, Trash2, Search } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";

type Project = {
  id: string;
  name: string;
  type: "Landing" | "Funnel" | "Ads" | "Imágenes" | "Video" | "Pitch";
  date: string;
  status: "Listo" | "Borrador" | "Publicado";
  prompt: string;
};

const PROJECTS: Project[] = [
  { id: "p1", name: "Luna Activewear", type: "Landing", date: "hace 2h", status: "Listo", prompt: "Ropa deportiva premium para mujeres" },
  { id: "p2", name: "Yoga para mamás", type: "Funnel", date: "ayer", status: "Publicado", prompt: "Curso online de yoga prenatal" },
  { id: "p3", name: "Verano 2026 Meta", type: "Ads", date: "hace 3 días", status: "Listo", prompt: "Campaña de verano para tienda" },
  { id: "p4", name: "Velas artesanales", type: "Imágenes", date: "hace 5 días", status: "Borrador", prompt: "Velas de soja con aromas naturales" },
  { id: "p5", name: "Pitch ronda Seed", type: "Pitch", date: "hace 1 sem", status: "Publicado", prompt: "SaaS de IA para marketing" },
  { id: "p6", name: "Reel TikTok lanzamiento", type: "Video", date: "hace 1 sem", status: "Listo", prompt: "Video viral 30s tienda online" }
];

const STATUS_TONE: Record<Project["status"], string> = {
  Listo: "bg-emerald-50 text-emerald-700",
  Borrador: "bg-amber-50 text-amber-700",
  Publicado: "bg-cyan-50 text-cyan-700"
};

export default function ProyectosPage() {
  const [q, setQ] = useState("");
  const filtered = PROJECTS.filter(
    (p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.type.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        icon={FolderOpen}
        chip="Proyectos"
        title="Todo lo que has generado"
        subtitle="Filtra por tipo, abre tus generaciones, exporta o elimina."
        tone="from-violet-400 to-violet-600"
        actions={
          <Link
            href="/dashboard/ia"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-navy-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" /> Nuevo
          </Link>
        }
      />

      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre o tipo..."
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <span className="text-xs text-gray-400">{filtered.length} de {PROJECTS.length}</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-[1.5fr_120px_120px_120px_60px] gap-4 border-b border-gray-100 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
          <span>Proyecto</span>
          <span>Tipo</span>
          <span>Fecha</span>
          <span>Estado</span>
          <span></span>
        </div>
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="grid grid-cols-[1.5fr_120px_120px_120px_60px] items-center gap-4 border-b border-gray-100 px-5 py-4 last:border-0 transition hover:bg-cyan-50/30"
          >
            <div>
              <p className="font-semibold text-gray-900">{p.name}</p>
              <p className="text-xs text-gray-500 truncate">{p.prompt}</p>
            </div>
            <span className="text-xs font-medium text-gray-700">{p.type}</span>
            <span className="text-xs text-gray-500">{p.date}</span>
            <span className={`inline-block w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_TONE[p.status]}`}>
              {p.status}
            </span>
            <div className="flex justify-end gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-cyan-600">
                <Eye className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-cyan-600">
                <Download className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-gray-500">
            Sin proyectos que coincidan con "{q}".
          </div>
        )}
      </div>
    </div>
  );
}
