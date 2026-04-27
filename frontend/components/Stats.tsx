"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type Stat = { value: number; suffix?: string; prefix?: string; label: string };

const stats: Stat[] = [
  { value: 12400, suffix: "+", label: "Emprendedores lanzando" },
  { value: 340, suffix: "%", label: "Aumento medio de conversión" },
  { value: 2.4, suffix: " min", label: "Tiempo promedio de generación" },
  { value: 98, suffix: "%", label: "Satisfacción del cliente" }
];

function Counter({ to, format }: { to: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 2000, bounce: 0 });
  const rounded = useTransform(spring, (v) => format(v));

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-700" />
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 h-96 w-96 animate-float-slow rounded-full bg-cyan-400/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-40 -z-10 h-96 w-96 animate-float rounded-full bg-cyan-300/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-200 backdrop-blur">
            Los números hablan
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Resultados que <span className="text-cyan-300">se miden</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:scale-[1.03] hover:border-cyan-300/50 hover:bg-white/10"
            >
              <div className="font-display text-5xl font-bold text-white sm:text-6xl">
                {s.prefix}
                <Counter
                  to={s.value}
                  format={(n) =>
                    Number.isInteger(s.value)
                      ? Math.floor(n).toLocaleString()
                      : n.toFixed(1)
                  }
                />
                <span className="text-cyan-300">{s.suffix ?? ""}</span>
              </div>
              <p className="mt-2 text-sm text-white/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
