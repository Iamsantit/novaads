"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { BarChart2, TrendingUp, Eye, MousePointerClick, ShoppingCart, Sparkles } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

const KPIS = [
  { label: "Visitas", value: 24850, change: "+12.4%", icon: Eye, tone: "from-cyan-400 to-cyan-600" },
  { label: "Clics CTA", value: 3120, change: "+8.7%", icon: MousePointerClick, tone: "from-violet-400 to-violet-600" },
  { label: "Conversiones", value: 412, change: "+34.2%", icon: ShoppingCart, tone: "from-emerald-400 to-emerald-600" },
  { label: "Generaciones IA", value: 87, change: "+5", icon: Sparkles, tone: "from-amber-400 to-orange-500" }
];

// 30-day visit data (mocked)
const TIMELINE = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  visits: 200 + Math.round(Math.sin(i / 3) * 120 + Math.random() * 200 + i * 18)
}));

const CHANNELS = [
  { name: "Meta Ads", value: 42, color: "#1cc5e7" },
  { name: "Google Ads", value: 28, color: "#1f5398" },
  { name: "Orgánico", value: 18, color: "#10b981" },
  { name: "Email", value: 8, color: "#f59e0b" },
  { name: "Direct", value: 4, color: "#94a3b8" }
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1500, bounce: 0 });
  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function AnaliticaPage() {
  const max = Math.max(...TIMELINE.map((p) => p.visits));

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        icon={BarChart2}
        chip="Analítica"
        title="Tus métricas en tiempo real"
        subtitle="Visitas, clics, conversiones y rendimiento de cada activo generado."
        tone="from-emerald-400 to-cyan-600"
      />

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${k.tone} text-white`}>
                <k.icon className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                <TrendingUp className="h-3 w-3" /> {k.change}
              </span>
            </div>
            <p className="mt-4 font-display text-3xl font-bold text-gray-900">
              <Counter to={k.value} />
            </p>
            <p className="text-xs text-gray-500">{k.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Line/area chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-bold text-gray-900">Visitas — últimos 30 días</h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              ↑ 12.4% vs mes anterior
            </span>
          </div>
          <svg viewBox="0 0 300 100" className="h-48 w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1cc5e7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1cc5e7" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const path = TIMELINE
                .map((p, i) => {
                  const x = (i / (TIMELINE.length - 1)) * 300;
                  const y = 100 - (p.visits / max) * 90;
                  return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
                })
                .join(" ");
              const fill = `${path} L300,100 L0,100 Z`;
              return (
                <>
                  <motion.path
                    d={fill}
                    fill="url(#grad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <motion.path
                    d={path}
                    fill="none"
                    stroke="#1cc5e7"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                  />
                </>
              );
            })()}
          </svg>
          <div className="mt-2 flex justify-between text-[10px] text-gray-400">
            <span>Día 1</span>
            <span>Día 15</span>
            <span>Hoy</span>
          </div>
        </motion.div>

        {/* Donut */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h2 className="font-display font-bold text-gray-900">Tráfico por canal</h2>
          <div className="mt-6 flex flex-col items-center">
            <Donut data={CHANNELS} />
            <div className="mt-6 w-full space-y-2">
              {CHANNELS.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                  <span className="flex-1 text-gray-700">{c.name}</span>
                  <span className="font-semibold text-gray-900">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Donut({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let acc = 0;
  const segments = data.map((d) => {
    const start = acc / total;
    acc += d.value;
    const end = acc / total;
    return { ...d, start, end };
  });

  return (
    <svg viewBox="-1 -1 2 2" className="h-32 w-32 -rotate-90">
      {segments.map((s, i) => {
        const x1 = Math.cos(2 * Math.PI * s.start);
        const y1 = Math.sin(2 * Math.PI * s.start);
        const x2 = Math.cos(2 * Math.PI * s.end);
        const y2 = Math.sin(2 * Math.PI * s.end);
        const large = s.end - s.start > 0.5 ? 1 : 0;
        const d = `M0 0 L${x1} ${y1} A1 1 0 ${large} 1 ${x2} ${y2} Z`;
        return (
          <motion.path
            key={s.name}
            d={d}
            fill={s.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          />
        );
      })}
      <circle cx="0" cy="0" r="0.55" fill="white" />
    </svg>
  );
}
