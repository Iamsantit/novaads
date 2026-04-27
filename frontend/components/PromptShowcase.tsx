"use client";

import { motion } from "framer-motion";
import { Wand2, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const outputs = [
  "Generando landing page…",
  "Escribiendo copies de anuncios…",
  "Diseñando 6 creatividades publicitarias…",
  "Escribiendo guion de video 45s…",
  "Armando funnel de 4 páginas + emails…",
  "Preparando pitch deck de 10 slides…",
  "Configurando checkout con Stripe…",
  "✨ Listo. Tu negocio online está armado."
];

export default function PromptShowcase() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((v) => (v + 1) % outputs.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="chip">Prompt único</span>
            <h2 className="heading-display mt-4">
              Una frase. <br />
              <span className="text-gradient">Seis entregables profesionales.</span>
            </h2>
            <p className="mt-4 text-lg text-navy-700/80">
              Nuestro orquestador dividió tu prompt en briefings específicos para cada módulo, los ejecutó en paralelo y devolvió todo en menos de 3 minutos.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Sin aprender 10 herramientas distintas",
                "Sin pagar freelancers de $500+ por entregable",
                "Sin perder 3 semanas entre iteraciones",
                "Sin miedo a la página en blanco"
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-navy-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="gradient-border p-2"
          >
            <div className="overflow-hidden rounded-2xl bg-navy-950 p-6 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                <Wand2 className="h-4 w-4" /> Tu prompt
              </div>
              <div className="mt-3 rounded-lg bg-white/5 p-4 text-sm text-white/90 ring-1 ring-white/10">
                <span className="text-cyan-300">&gt;</span> Curso online de yoga para madres primerizas, ticket 120 USD, público latinoamericano.
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
                </span>
                Orquestador · 6 agentes trabajando
              </div>

              <div className="mt-3 space-y-2">
                {outputs.map((o, idx) => (
                  <motion.div
                    key={o}
                    animate={{
                      opacity: idx <= step ? 1 : 0.25,
                      x: idx <= step ? 0 : -6
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 rounded-md bg-white/[0.03] px-3 py-2 text-sm text-white/90 ring-1 ring-white/5"
                  >
                    {idx < step ? (
                      <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    ) : idx === step ? (
                      <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                    )}
                    <span>{o}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
