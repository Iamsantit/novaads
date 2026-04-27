"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  X, Download, ExternalLink, CreditCard, ShoppingCart, Check, Globe
} from "lucide-react";
import { exportAsHtml } from "@/lib/html-export";
import type { PreviewPayload } from "@/lib/preview-store";

type Tab = "publish" | "payments";

const PLATFORMS = [
  { id: "wix",       name: "Wix",       authPath: "/api/oauth/wix/start",       desc: "Publica como página de tu sitio Wix Studio." },
  { id: "wordpress", name: "WordPress", authPath: "/api/oauth/wordpress/start", desc: "Sube como página o post a tu instalación de WordPress." },
  { id: "shopify",   name: "Shopify",   authPath: "/api/oauth/shopify/start",   desc: "Crea una página personalizada dentro de tu tienda Shopify." }
];

const PAYMENT_PROVIDERS = [
  {
    id: "stripe",
    name: "Stripe",
    desc: "Procesa tarjetas, Apple Pay y suscripciones. Integración 1-click.",
    icon: CreditCard,
    setupHint: "Conecta tu cuenta Stripe y se inserta el botón de pago en el CTA principal.",
    docsUrl: "https://dashboard.stripe.com/register"
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    desc: "Para WordPress: convierte la landing en producto WooCommerce real.",
    icon: ShoppingCart,
    setupHint: "Necesita WordPress conectado primero. Sube la landing como custom post-type 'product'.",
    docsUrl: "https://woocommerce.com"
  },
  {
    id: "paypal",
    name: "PayPal",
    desc: "Botón Smart Payment Buttons. Buena conversión en LatAm.",
    icon: CreditCard,
    setupHint: "Pega tu Client ID de PayPal Developer y se renderiza el botón en el checkout.",
    docsUrl: "https://developer.paypal.com"
  },
  {
    id: "mercadopago",
    name: "Mercado Pago",
    desc: "Pagos en pesos para LatAm. Tarjeta, OXXO y débito.",
    icon: CreditCard,
    setupHint: "Pega tu Public Key y Access Token de Mercado Pago.",
    docsUrl: "https://www.mercadopago.com.mx/developers"
  }
];

export default function PublishModal({
  payload,
  onClose
}: {
  payload: PreviewPayload;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("publish");
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  function downloadHtml() {
    const html = exportAsHtml(payload);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${payload.type}-${payload.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-space-900 text-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="font-display text-lg font-bold">Publicar tu página</h2>
            <p className="text-xs text-white/50">
              {payload.data.brand?.name ?? "Mi proyecto"} · tipo {payload.type}
            </p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/5 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/10 px-6 pt-3">
          <TabBtn active={tab === "publish"} onClick={() => setTab("publish")}>
            <Globe className="h-3.5 w-3.5" /> Publicar / Exportar
          </TabBtn>
          <TabBtn active={tab === "payments"} onClick={() => setTab("payments")}>
            <CreditCard className="h-3.5 w-3.5" /> Conectar pagos
          </TabBtn>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          {tab === "publish" && (
            <div className="space-y-5">
              {/* Quick export */}
              <div className="rounded-2xl border border-white/8 bg-space-800/50 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-bold">Descargar HTML autocontenido</p>
                    <p className="mt-1 text-xs text-white/55">
                      Un solo archivo .html con todo el contenido + estilos. Lo subes a cualquier hosting (Netlify, Vercel, Hostinger, S3, tu propio servidor) y la web vive online en minutos.
                    </p>
                    <button
                      onClick={downloadHtml}
                      className="mt-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-1.5 text-xs font-bold text-navy-950 hover:scale-[1.02]"
                    >
                      <Download className="h-3.5 w-3.5" /> Descargar .html
                    </button>
                  </div>
                </div>
              </div>

              {/* Platform connectors */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/40">
                  Publicar en una plataforma
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {PLATFORMS.map((p) => (
                    <div key={p.id} className="rounded-xl border border-white/8 bg-space-800/50 p-4">
                      <p className="font-display font-bold">{p.name}</p>
                      <p className="mt-1 min-h-[36px] text-xs text-white/55">{p.desc}</p>
                      <a
                        href={p.authPath}
                        className="mt-3 flex items-center justify-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20"
                      >
                        Conectar <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hosted URL */}
              <div className="rounded-2xl border border-white/8 bg-space-800/50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">URL pública (próximamente)</p>
                <div className="mt-2 flex gap-2">
                  <input
                    readOnly
                    value={`https://novaads.app/p/${payload.id}`}
                    className="flex-1 rounded-md border border-white/10 bg-space-900 px-3 py-2 font-mono text-xs text-white/70"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(`https://novaads.app/p/${payload.id}`)}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold hover:bg-white/10"
                  >
                    Copiar
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-white/40">
                  Cuando publiques, esta URL servirá tu landing desde nuestro CDN. Por ahora usa la descarga HTML.
                </p>
              </div>
            </div>
          )}

          {tab === "payments" && (
            <div className="space-y-3">
              <p className="text-xs text-white/55">
                Conecta el procesador de pagos que prefieras y NovaAds inserta el botón en tu CTA principal automáticamente.
              </p>
              {PAYMENT_PROVIDERS.map((p) => {
                const isOn = connected[p.id];
                return (
                  <div key={p.id} className="rounded-2xl border border-white/8 bg-space-800/50 p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                        <p.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-display font-bold">{p.name}</p>
                          {isOn ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase text-emerald-300">
                              <Check className="h-3 w-3" /> Conectado
                            </span>
                          ) : (
                            <button
                              onClick={() => setConnected((c) => ({ ...c, [p.id]: true }))}
                              className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-500/20"
                            >
                              Conectar
                            </button>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-white/55">{p.desc}</p>
                        <p className="mt-2 text-[11px] text-white/40">
                          {p.setupHint} ·{" "}
                          <a href={p.docsUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                            Crear cuenta
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-t-lg px-4 py-2 text-xs font-semibold transition ${
        active ? "border-b-2 border-cyan-400 text-white" : "text-white/50 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
