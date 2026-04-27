"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Mail, Calendar } from "lucide-react";
import type { PreviewPayload } from "@/lib/preview-store";

type Props = { data: PreviewPayload["data"] };

const FALLBACK_POSTS = [
  { title: "Cómo lanzar un producto en 7 días", excerpt: "Un marco práctico que he validado con +20 startups…", date: "2 min" },
  { title: "5 errores que matan tu funnel de ventas", excerpt: "Los vi repetidos en cientos de cuentas de clientes…", date: "4 min" },
  { title: "IA para marketing: qué sirve y qué no", excerpt: "Un resumen honesto tras usar 15 herramientas…", date: "6 min" },
  { title: "Escribir copys que venden sin parecer cursi", excerpt: "El equilibrio entre persuasión y autenticidad…", date: "3 min" }
];

export default function BlogTemplate({ data }: Props) {
  const brand = data.brand?.name ?? "Tu Blog";
  const accent = data.brand?.accent ?? "#1cc5e7";
  const posts = data.posts?.length ? data.posts : FALLBACK_POSTS;

  return (
    <main className="bg-white text-navy-900" style={{ ["--accent" as any]: accent }}>
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span className="font-display text-xl font-bold">{brand}</span>
          <nav className="hidden gap-6 text-sm text-gray-600 md:flex">
            <a href="#">Artículos</a>
            <a href="#">Categorías</a>
            <a href="#">Newsletter</a>
            <a href="#">Sobre mí</a>
          </nav>
          <Search className="h-5 w-5 text-gray-500" />
        </div>
      </header>

      <section className="px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: accent }}>
          Blog
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
        >
          {data.hero?.headline ?? "Ideas, aprendizajes y experimentos"}
        </motion.h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">
          {data.hero?.subheadline ?? "Escribo cada semana sobre producto, marketing y creatividad aplicada."}
        </p>
      </section>

      {/* Featured post */}
      {posts[0] && (
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Destacado</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{posts[0].title}</h2>
            <p className="mt-4 text-lg text-gray-600">{posts[0].excerpt}</p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 font-semibold"
              style={{ color: accent }}
            >
              Leer artículo completo <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      )}

      {/* Post list */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold">Últimos artículos</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.slice(1).map((p, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-sm"
              >
                <p className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5" /> Lectura · {p.date ?? "3 min"}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold group-hover:underline">{p.title}</h3>
                <p className="mt-2 text-gray-600">{p.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-y border-gray-200 bg-gray-50 px-6 py-20 text-center">
        <Mail className="mx-auto h-8 w-8 text-navy-700" />
        <h2 className="mt-4 font-display text-3xl font-bold">Recíbelo en tu email</h2>
        <p className="mx-auto mt-3 max-w-md text-gray-600">
          Un artículo por semana, cero spam, cancela cuando quieras.
        </p>
        <form className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            type="email"
            placeholder="tu@email.com"
            className="flex-1 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm outline-none focus:border-gray-500"
          />
          <button type="button" className="rounded-full px-5 py-3 text-sm font-semibold text-white" style={{ background: accent }}>
            Suscribirme
          </button>
        </form>
      </section>

      <footer className="bg-white px-6 py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {brand} · Generado con NovaAds
      </footer>
    </main>
  );
}
