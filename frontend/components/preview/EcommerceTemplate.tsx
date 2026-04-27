"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Search, Heart, Star, ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import type { PreviewPayload } from "@/lib/preview-store";

type Props = { data: PreviewPayload["data"] };

const FALLBACK_PRODUCTS = [
  { name: "Producto A", price: "$49", desc: "Lorem ipsum dolor sit amet." },
  { name: "Producto B", price: "$79", desc: "Consectetur adipiscing elit." },
  { name: "Producto C", price: "$99", desc: "Sed do eiusmod tempor incididunt." },
  { name: "Producto D", price: "$129", desc: "Ut labore et dolore magna aliqua." }
];

export default function EcommerceTemplate({ data }: Props) {
  const brand = data.brand?.name ?? "Tu Tienda";
  const accent = data.brand?.accent ?? "#0b1e3f";
  const products = data.products?.length ? data.products : FALLBACK_PRODUCTS;

  return (
    <main className="bg-white" style={{ ["--accent" as any]: accent }}>
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <span className="font-display text-xl font-bold text-navy-900">{brand}</span>
          <nav className="hidden flex-1 justify-center gap-6 text-sm text-gray-600 md:flex">
            <a href="#">Shop</a>
            <a href="#">Colecciones</a>
            <a href="#">Novedades</a>
            <a href="#">Outlet</a>
          </nav>
          <div className="flex items-center gap-3 text-gray-600">
            <Search className="h-5 w-5" />
            <Heart className="h-5 w-5" />
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-50 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-navy-900 sm:text-6xl"
            >
              {data.hero?.headline ?? "Nuestra colección más reciente"}
            </motion.h1>
            <p className="mt-5 max-w-md text-lg text-gray-600">
              {data.hero?.subheadline ?? "Descubre prendas pensadas para tu estilo de vida."}
            </p>
            <a
              href="#productos"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white shadow-lg"
              style={{ background: "var(--accent)" }}
            >
              {data.hero?.cta ?? "Ver colección"} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-navy-200 to-cyan-200" />
        </div>
      </section>

      {/* Trust bar */}
      <div className="border-y border-gray-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-3">
          <div className="flex items-center gap-3"><Truck className="h-5 w-5 text-navy-700" /><span className="text-sm text-gray-700">Envío gratis desde $50</span></div>
          <div className="flex items-center gap-3"><RotateCcw className="h-5 w-5 text-navy-700" /><span className="text-sm text-gray-700">Devoluciones 30 días</span></div>
          <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-navy-700" /><span className="text-sm text-gray-700">Pago seguro SSL</span></div>
        </div>
      </div>

      {/* Product grid */}
      <section id="productos" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-bold text-navy-900">Productos destacados</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 transition group-hover:scale-[1.02]">
                  {p.img && <img src={p.img} alt={p.name} className="h-full w-full object-cover" />}
                </div>
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-navy-900">{p.name}</p>
                    <p className="text-sm text-gray-500">{p.desc}</p>
                  </div>
                  <span className="font-display font-bold text-navy-900">{p.price}</span>
                </div>
                <button
                  className="mt-3 w-full rounded-full border border-navy-900 py-2 text-sm font-semibold text-navy-900 transition hover:text-white"
                  onMouseOver={(e) => (e.currentTarget.style.background = accent)}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Añadir al carrito
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {data.social_proof && data.social_proof.length > 0 && (
        <section className="bg-gray-50 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-3xl font-bold text-navy-900">Opiniones de clientes</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {data.social_proof.slice(0, 3).map((s, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-3 text-gray-700">“{s.quote}”</p>
                  <p className="mt-3 text-sm font-semibold text-navy-900">— {s.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="px-6 py-16 text-center text-white" style={{ background: accent }}>
        <h2 className="font-display text-3xl font-bold">Suscríbete y obtén 10% de descuento</h2>
        <form className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            type="email"
            placeholder="tu@email.com"
            className="flex-1 rounded-full bg-white px-5 py-3 text-sm text-navy-900 outline-none"
          />
          <button type="button" className="rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold">
            Suscribirme
          </button>
        </form>
      </section>

      <footer className="bg-navy-950 px-6 py-12 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {brand} · Powered by NovaAds
      </footer>
    </main>
  );
}
