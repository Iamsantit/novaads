"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  {
    name: "Camila R.",
    role: "Fundadora, Luna Activewear",
    quote:
      "Lancé mi tienda de ropa deportiva en una tarde. El funnel que generó NovaAds me dio 140 ventas en la primera semana con solo $80 USD de ads.",
    stars: 5
  },
  {
    name: "Diego M.",
    role: "Coach online",
    quote:
      "Usaba 6 herramientas distintas. Ahora pago solo NovaAds y mis lanzamientos tardan horas, no semanas. Los copies son mejores que los que me hacía mi agencia.",
    stars: 5
  },
  {
    name: "Ana P.",
    role: "Dropshipper",
    quote:
      "Las creatividades que genera son las que mejor CTR me dan en Meta Ads. Recuperé la suscripción anual en el primer mes.",
    stars: 5
  },
  {
    name: "Sebastián K.",
    role: "Agencia digital",
    quote:
      "Lo uso para prototipar funnels con mis clientes. En 10 minutos les muestro 3 ángulos distintos. Cerramos 40% más propuestas.",
    stars: 5
  },
  {
    name: "María F.",
    role: "Infoproductora",
    quote:
      "El pitch deck que generó NovaAds me ayudó a cerrar una ronda ángel de 50k USD. Suena exagerado, pero pasó.",
    stars: 5
  },
  {
    name: "Javier T.",
    role: "Ecommerce B2C",
    quote:
      "El checkout con Stripe funcionó de primera. El guion de video me dio un reel viral con 1.2M de reproducciones.",
    stars: 5
  }
];

export default function Testimonials() {
  return (
    <section className="relative bg-gradient-to-b from-white via-navy-50/50 to-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Testimonios</span>
          <h2 className="heading-display mt-4">
            +12.400 emprendedores ya lanzaron con NovaAds
          </h2>
        </div>

        <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="card mb-6 break-inside-avoid"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-cyan-500 text-cyan-500" />
                ))}
              </div>
              <p className="mt-3 text-navy-800/90">“{t.quote}”</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-navy-600 font-display text-sm font-bold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                  <p className="text-xs text-navy-600">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
