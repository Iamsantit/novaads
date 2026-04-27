"use client";

import { motion } from "framer-motion";
import { Pencil, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Pencil,
    title: "Escribe tu idea en una frase",
    desc: "‘Quiero vender ropa deportiva para mujeres con ticket de 80 USD.’ Nada más, nada menos.",
    tone: "from-cyan-300 to-cyan-500"
  },
  {
    n: "02",
    icon: Cpu,
    title: "La IA orquesta 6 módulos en paralelo",
    desc: "Nuestro orquestador descompone tu prompt y coordina modelos especializados para cada entregable.",
    tone: "from-navy-400 to-navy-700"
  },
  {
    n: "03",
    icon: Rocket,
    title: "Publica en un clic",
    desc: "Descarga, exporta o publica directo a Shopify, WordPress o tu dominio. Stripe conectado al checkout.",
    tone: "from-cyan-400 to-navy-600"
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative bg-gradient-to-b from-white via-cyan-50/40 to-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Cómo funciona</span>
          <h2 className="heading-display mt-4">
            De la idea al negocio online en <span className="text-gradient">3 pasos</span>
          </h2>
          <p className="mt-4 text-lg text-navy-700/80">
            Sin plantillas frías. Sin configurar 12 herramientas. Sin contratar freelancers.
          </p>
        </div>

        <div className="relative mt-20 grid gap-8 lg:grid-cols-3">
          {/* Connector line */}
          <svg
            className="pointer-events-none absolute left-1/2 top-20 hidden -translate-x-1/2 lg:block"
            width="700"
            height="40"
            viewBox="0 0 700 40"
            fill="none"
            aria-hidden
          >
            <motion.path
              d="M10 20 Q 175 -10, 350 20 T 690 20"
              stroke="url(#stepGrad)"
              strokeWidth="2"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6 }}
            />
            <defs>
              <linearGradient id="stepGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4edcff" />
                <stop offset="100%" stopColor="#1f5398" />
              </linearGradient>
            </defs>
          </svg>

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="card relative h-full overflow-hidden">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.tone} text-white shadow-glow`}
                  >
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-4xl font-bold text-navy-900/10">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-navy-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-navy-700/80">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
