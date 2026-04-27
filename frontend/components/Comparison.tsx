"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "Landing page generada por IA", novaads: true, chatgpt: "parcial", canva: true, jasper: "parcial", agencia: true },
  { feature: "Funnel completo (4 pasos + emails)", novaads: true, chatgpt: false, canva: false, jasper: false, agencia: true },
  { feature: "Copies de anuncios", novaads: true, chatgpt: true, canva: false, jasper: true, agencia: true },
  { feature: "Creatividades e imágenes", novaads: true, chatgpt: false, canva: true, jasper: false, agencia: true },
  { feature: "Guion de video", novaads: true, chatgpt: true, canva: false, jasper: "parcial", agencia: true },
  { feature: "Pitch deck", novaads: true, chatgpt: "parcial", canva: "parcial", jasper: false, agencia: true },
  { feature: "Coherencia entre módulos", novaads: true, chatgpt: false, canva: false, jasper: false, agencia: "parcial" },
  { feature: "Precio en tu moneda local", novaads: true, chatgpt: false, canva: false, jasper: false, agencia: false },
  { feature: "En menos de 3 minutos", novaads: true, chatgpt: false, canva: false, jasper: false, agencia: false },
  { feature: "Costo mensual", novaads: "$19-99", chatgpt: "$20", canva: "$15", jasper: "$49+", agencia: "$2,000+" }
];

const cols = [
  { id: "novaads", label: "NovaAds", highlight: true },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "canva", label: "Canva" },
  { id: "jasper", label: "Jasper" },
  { id: "agencia", label: "Agencia" }
] as const;

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-400">
        <X className="h-4 w-4" />
      </span>
    );
  if (value === "parcial")
    return (
      <span className="inline-flex rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-semibold text-yellow-700">
        parcial
      </span>
    );
  return <span className="text-sm font-semibold text-navy-900">{value}</span>;
}

export default function Comparison() {
  return (
    <section className="relative bg-gradient-to-b from-white via-cyan-50/30 to-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Comparativa</span>
          <h2 className="heading-display mt-4">
            NovaAds vs. <span className="text-gradient">todo lo demás</span>
          </h2>
          <p className="mt-4 text-lg text-navy-700/80">
            Ya no necesitas 6 herramientas distintas. Ni pagar una agencia. Ni armar el stack tú solo.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 overflow-hidden rounded-3xl border border-navy-900/5 bg-white shadow-card"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-navy-900/5">
                  <th className="p-5 text-left text-sm font-semibold uppercase tracking-wider text-navy-600">
                    Capacidad
                  </th>
                  {cols.map((c) => (
                    <th
                      key={c.id}
                      className={`p-5 text-center text-sm font-display font-bold ${
                        c.highlight
                          ? "bg-gradient-to-b from-cyan-50 to-transparent text-cyan-700"
                          : "text-navy-700"
                      }`}
                    >
                      {c.label}
                      {c.highlight && (
                        <span className="ml-1 rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-bold text-white">
                          TÚ
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <motion.tr
                    key={r.feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="border-b border-navy-900/5 last:border-0 hover:bg-cyan-50/40"
                  >
                    <td className="p-5 text-sm font-medium text-navy-900">{r.feature}</td>
                    {cols.map((c) => (
                      <td
                        key={c.id}
                        className={`p-5 text-center ${c.highlight ? "bg-cyan-50/30" : ""}`}
                      >
                        <Cell value={(r as any)[c.id]} />
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
