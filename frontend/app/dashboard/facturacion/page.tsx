"use client";

import { motion } from "framer-motion";
import { CreditCard, Download, ExternalLink, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

const INVOICES = [
  { id: "INV-2026-04-001", date: "15 abr 2026", amount: "$49.00", status: "Pagada" },
  { id: "INV-2026-03-001", date: "15 mar 2026", amount: "$49.00", status: "Pagada" },
  { id: "INV-2026-02-001", date: "15 feb 2026", amount: "$49.00", status: "Pagada" }
];

export default function FacturacionPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        icon={CreditCard}
        chip="Facturación"
        title="Tu plan y métodos de pago"
        subtitle="Gestiona tu suscripción, descarga facturas y cambia tu tarjeta cuando quieras."
        tone="from-emerald-400 to-green-700"
      />

      {/* Trial banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 to-white p-6 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-navy-700 text-white shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-cyan-700">
              Trial activo
            </p>
            <h2 className="mt-2 font-display text-xl font-bold text-gray-900">
              Plan Pro · Prueba de 14 días
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Termina el <strong>9 mayo 2026</strong>. Después se cobra <strong>$49 USD/mes</strong> automáticamente. Cancela en un clic antes para que no se cobre nada.
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "21%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-navy-600"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">3 de 14 días usados</p>
          </div>
        </div>
      </motion.div>

      {/* Current plan */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900">Tu plan</h2>
            <p className="mt-1 text-sm text-gray-500">Pro · Mensual</p>
          </div>
          <p className="font-display text-3xl font-bold text-gray-900">
            $49<span className="text-base font-medium text-gray-500">/mes</span>
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            "Generaciones ilimitadas",
            "Imágenes con DALL·E 3",
            "Dominio personalizado"
          ].map((b) => (
            <div key={b} className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {b}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href="/#pricing"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-navy-700 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:scale-[1.02]"
          >
            Cambiar de plan
          </a>
          <a
            href="https://billing.stripe.com/p/login/test_xxx"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
          >
            Portal de Stripe <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button className="rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-semibold text-red-700 hover:bg-red-100">
            Cancelar suscripción
          </button>
        </div>
      </motion.section>

      {/* Payment method */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-gray-900">Método de pago</h2>
          <button className="text-sm font-semibold text-cyan-600 hover:underline">Actualizar</button>
        </div>
        <div className="mt-4 flex items-center gap-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4">
          <div className="flex h-10 w-14 items-center justify-center rounded-md bg-gradient-to-br from-navy-700 to-navy-900 text-xs font-bold text-white">
            VISA
          </div>
          <div className="flex-1">
            <p className="font-mono text-sm text-gray-900">•••• •••• •••• 4242</p>
            <p className="text-xs text-gray-500">Vence 12/29 · Santiago Trujillo</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-3 w-3" /> Activa
          </span>
        </div>
      </motion.section>

      {/* Invoices */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-gray-900">Historial de facturas</h2>
        </div>
        <div>
          {INVOICES.map((inv, i) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="grid grid-cols-[1fr_140px_120px_120px] items-center gap-4 border-b border-gray-100 px-6 py-3 last:border-0 hover:bg-gray-50"
            >
              <span className="font-mono text-sm text-gray-700">{inv.id}</span>
              <span className="text-sm text-gray-500">{inv.date}</span>
              <span className="text-sm font-semibold text-gray-900">{inv.amount}</span>
              <button className="flex w-fit items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-gray-300">
                <Download className="h-3.5 w-3.5" /> PDF
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <p className="text-center text-xs text-gray-400">
        Pagos procesados de forma segura por Stripe · SSL · 3-D Secure
      </p>
    </div>
  );
}
