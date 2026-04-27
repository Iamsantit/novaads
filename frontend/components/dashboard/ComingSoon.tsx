"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  features?: string[];
};

export default function ComingSoon({ title, desc, icon: Icon, features = [] }: Props) {
  return (
    <div className="mx-auto max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/8 bg-space-800/50 p-10 text-center shadow-xl backdrop-blur-md"
      >
        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(0,245,255,0.15) 0%, transparent 60%)"
          }}
        />

        <motion.div
          initial={{ scale: 0.6, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 shadow-[0_0_40px_rgba(0,245,255,0.4)]"
        >
          <Icon className="h-8 w-8 text-white" />
        </motion.div>

        <h1 className="mt-6 font-display text-3xl font-bold text-white">{title}</h1>
        <p className="mx-auto mt-3 max-w-md text-white/60">{desc}</p>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
          <Sparkles className="h-3.5 w-3.5" /> Próximamente
        </span>

        {features.length > 0 && (
          <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-start gap-2 rounded-xl border border-white/6 bg-space-900/50 p-3 text-sm text-white/70"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300">
                  ✓
                </span>
                {f}
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/80 backdrop-blur transition hover:border-cyan-400/40 hover:text-white"
          >
            ← Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
