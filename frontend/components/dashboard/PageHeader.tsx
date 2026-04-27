"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  chip: string;
  title: string;
  subtitle: string;
  tone?: string; // tailwind gradient classes
  actions?: React.ReactNode;
};

export default function PageHeader({
  icon: Icon,
  chip,
  title,
  subtitle,
  tone = "from-cyan-400 to-navy-700",
  actions
}: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap items-end justify-between gap-4"
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 0.5 }}
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-lg`}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/60 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700">
            {chip}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-1 max-w-2xl text-gray-600">{subtitle}</p>
        </div>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </motion.header>
  );
}
