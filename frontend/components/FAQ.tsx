"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const items = [
  {
    q: "¿Qué pasa después de los 14 días gratis?",
    a: "Si no cancelas antes de que termine la prueba, se cobra automáticamente el plan que elegiste. Puedes cancelar desde tu dashboard en un clic, sin llamadas ni fricción."
  },
  {
    q: "¿Los precios están en mi moneda?",
    a: "Sí. Detectamos tu país automáticamente y mostramos los precios en tu moneda local. El cobro real lo procesa Stripe en USD al tipo de cambio del día, para cumplir con impuestos internacionales."
  },
  {
    q: "¿Puedo exportar lo que genero?",
    a: "Claro. Todo se exporta en HTML, PDF o formatos editables. También integramos directamente con Shopify, WordPress, Wix y Notion para publicar en un clic."
  },
  {
    q: "¿Es mejor que ChatGPT + Canva + Mailchimp?",
    a: "No es una herramienta genérica, es un orquestador. Un prompt genera los 6 entregables conectados entre sí: el funnel usa los mismos copies que los ads, las imágenes respetan la paleta de la landing, etc. Ahorras horas y los resultados son coherentes."
  },
  {
    q: "¿Funciona para cualquier idioma?",
    a: "Está optimizado para español e inglés. También genera en portugués, francés, alemán e italiano con calidad profesional."
  },
  {
    q: "¿Qué modelos de IA usan por detrás?",
    a: "Combinamos OpenAI (texto), DALL·E y Stable Diffusion (imágenes) y motores propios (video). Todo con prompts optimizados por nosotros tras 10.000+ generaciones A/B testeadas."
  },
  {
    q: "¿Puedo cambiar de plan cuando quiera?",
    a: "Sí. Upgrade o downgrade desde tu dashboard. El prorrateo se calcula automáticamente."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="chip">Preguntas frecuentes</span>
          <h2 className="heading-display mt-4">Respondemos lo que más te preguntas</h2>
        </div>

        <div className="mt-12 space-y-3">
          {items.map((it, idx) => (
            <motion.div
              key={it.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-sm"
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display font-semibold text-navy-900">{it.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-cyan-500 transition-transform ${
                    open === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-5 text-navy-700/85">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
