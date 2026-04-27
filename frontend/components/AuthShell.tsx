"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export default function AuthShell({ title, subtitle, children, footer }: Props) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-mesh" />
      <div className="absolute inset-0 -z-10 bg-grid-light [background-size:48px_48px] opacity-40" />

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left: value prop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block"
          >
            <Link href="/">
              <Logo />
            </Link>
            <h2 className="mt-10 font-display text-4xl font-bold leading-tight text-navy-900">
              Un prompt. <span className="text-gradient">Seis entregables.</span>
            </h2>
            <p className="mt-4 max-w-md text-navy-700/80">
              Accede a tu studio para crear landings, funnels, campañas, imágenes,
              videos y pitch decks en minutos.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "14 días gratis en cualquier plan",
                "Cancela en un clic desde tu dashboard",
                "Precio en tu moneda local",
                "Integra Wix, WordPress, Shopify, Meta Ads y más"
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                    ✓
                  </span>
                  <span className="text-sm text-navy-800">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="gradient-border p-2"
          >
            <div className="rounded-[1.4rem] bg-white p-8 shadow-card">
              <Link href="/" className="mb-6 inline-block lg:hidden">
                <Logo />
              </Link>
              <h1 className="font-display text-3xl font-bold text-navy-900">{title}</h1>
              <p className="mt-2 text-sm text-navy-600">{subtitle}</p>

              <div className="mt-6">{children}</div>

              <div className="mt-6 text-center text-sm text-navy-700">{footer}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export function AuthInput({
  label,
  name,
  type = "text",
  required = true,
  autoComplete
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-navy-600">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1 w-full rounded-xl border border-navy-900/10 bg-white px-4 py-3 text-navy-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
      />
    </label>
  );
}
