"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Link as LinkIcon, Sparkles, ArrowRight, Lock, ExternalLink, AlertTriangle } from "lucide-react";

export type Connector = {
  id: string;
  name: string;
  logo: string;
  desc: string;
  badge?: string;
  tone: string;
  authType: "oauth" | "api_key" | "ai";
  /** OAuth provider id (Wix, Shopify, Meta...) — starts /api/oauth/[id]/start */
  oauthProvider?: string;
  /** External login/signup URL for AI services (DALL·E, Runway, Gamma...) */
  externalLoginUrl?: string;
  /** Where the user gets their API key after creating account */
  apiKeyUrl?: string;
  url?: string;
  docsUrl?: string;
};

type SetupInfo = {
  id: string;
  name: string;
  configured: boolean;
  dashboardUrl: string;
  steps: string[];
  redirectUrl: string;
  clientIdEnv: string;
  clientSecretEnv: string;
};

type Props = {
  title: string;
  subtitle: string;
  chip?: string;
  connectors: Connector[];
  footerNote?: string;
};

export default function ConnectorGrid({ title, subtitle, chip, connectors, footerNote }: Props) {
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<Connector | null>(null);
  const [setup, setSetup] = useState<SetupInfo | null>(null);
  const params = useSearchParams();

  // Handle callback query params (?connected=shopify / ?setup=wix / ?err=...)
  useEffect(() => {
    const justConnected = params.get("connected");
    if (justConnected) {
      setConnected((p) => ({ ...p, [justConnected]: true }));
    }
    const needSetup = params.get("setup");
    if (needSetup) {
      fetch(`/api/oauth/${needSetup}/setup-info`)
        .then((r) => r.json())
        .then((info: SetupInfo) => setSetup(info))
        .catch(() => void 0);
    }
  }, [params]);

  function startConnect(c: Connector) {
    if (c.authType === "oauth" && c.oauthProvider) {
      // OAuth flow — open the service login in a new tab first, then redirect.
      if (c.externalLoginUrl) {
        window.open(c.externalLoginUrl, "_blank", "noopener,noreferrer");
      }
      window.location.href = `/api/oauth/${c.oauthProvider}/start`;
      return;
    }
    if (c.externalLoginUrl) {
      window.open(c.externalLoginUrl, "_blank", "noopener,noreferrer");
      // For api_key connectors also show the modal to paste the key.
      if (c.authType === "api_key") setOpen(c);
      return;
    }
    setOpen(c);
  }

  const total = connectors.length;
  const done = Object.values(connected).filter(Boolean).length;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {chip && (
          <span className="chip mb-3">
            <Sparkles className="h-3 w-3" /> {chip}
          </span>
        )}
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-white/55">{subtitle}</p>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <div className="h-2 w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(done / total) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-violet-400 shadow-[0_0_6px_rgba(0,245,255,0.6)]"
            />
          </div>
          <span className="font-medium text-white/50">
            {done} de {total} conectadas
          </span>
        </div>
      </motion.header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {connectors.map((c, i) => {
          const isOn = connected[c.id];
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="space-hover group relative rounded-2xl border border-white/8 bg-space-800/60 p-5 backdrop-blur-md transition-all hover:-translate-y-2 hover:border-neon-cyan/30 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]"
            >
              {c.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-neon-cyan">
                  {c.badge}
                </span>
              )}

              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.tone} font-display text-sm font-bold text-white shadow-md`}>
                {c.logo}
              </div>

              <p className="font-display text-base font-bold text-white">{c.name}</p>
              <p className="mt-1 min-h-[40px] text-sm text-white/50">{c.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                {isOn ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-green/25 bg-neon-green/10 px-3 py-1.5 text-xs font-semibold text-neon-green">
                    <Check className="h-3.5 w-3.5" /> Conectado
                  </span>
                ) : (
                  <button
                    onClick={() => startConnect(c)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-navy-700 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:scale-[1.03]"
                  >
                    <LinkIcon className="h-3.5 w-3.5" /> Conectar
                  </button>
                )}

                {isOn && (
                  <button
                    onClick={() => setConnected((p) => ({ ...p, [c.id]: false }))}
                    className="text-xs font-medium text-white/30 hover:text-red-400 transition-colors"
                  >
                    Desconectar
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {footerNote && (
        <p className="text-center text-sm text-white/40">{footerNote}</p>
      )}

      {/* Connect modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/70 p-4 backdrop-blur-md"
          onClick={() => setOpen(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-space-800/90 p-8 shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: "0 0 0 1px rgba(0,245,255,0.12), 0 30px 80px -20px rgba(0,0,0,0.8)" }}
          >
            {/* Top neon line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${open.tone} font-display text-sm font-bold text-white shadow-neon-cyan`}>
              {open.logo}
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-white">
              Conectar {open.name}
            </h3>
            <p className="mt-2 text-sm text-white/55">{open.desc}</p>

            <div className="mt-5 rounded-xl border border-white/8 bg-space-900/60 p-4 text-xs text-white/60">
              {open.authType === "oauth" && (
                <>
                  <Lock className="mb-2 h-4 w-4 text-neon-cyan" />
                  Te redirigiremos a <span className="font-semibold text-white">{open.name}</span> para
                  autorizar el acceso. No guardamos tu contraseña.
                </>
              )}
              {open.authType === "api_key" && (
                <>
                  <Lock className="mb-2 h-4 w-4 text-neon-cyan" />
                  Pega tu API key de <span className="font-semibold text-white">{open.name}</span>.
                  La almacenamos cifrada con AES-256.
                  {open.externalLoginUrl && (
                    <div className="mt-3 flex flex-col gap-2">
                      <a
                        href={open.externalLoginUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon-cyan hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Crear cuenta o iniciar sesión en {open.name}
                      </a>
                      {open.apiKeyUrl && (
                        <a
                          href={open.apiKeyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon-cyan hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Generar mi API key
                        </a>
                      )}
                    </div>
                  )}
                  <input
                    type="password"
                    placeholder="sk-... / xai-... / re_..."
                    className="mt-3 w-full rounded-xl border border-white/10 bg-space-900/60 px-3 py-2 text-sm text-white placeholder-white/25 focus:border-neon-cyan/40 focus:outline-none focus:ring-2 focus:ring-neon-cyan/10"
                  />
                </>
              )}
              {open.authType === "ai" && (
                <>
                  <Sparkles className="mb-2 h-4 w-4 text-neon-cyan" />
                  Modelo de IA incluido en tu plan. Sin API keys ni cuentas extra —
                  NovaAds lo orquesta por ti.
                </>
              )}
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setOpen(null)}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setConnected((p) => ({ ...p, [open.id]: true }));
                  setOpen(null);
                }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-navy-600 px-4 py-2.5 text-sm font-semibold text-white shadow-neon-cyan hover:scale-[1.02] transition"
              >
                {open.authType === "oauth"
                  ? "Autorizar"
                  : open.authType === "api_key"
                  ? "Guardar"
                  : "Activar"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Setup modal — shown when OAuth provider isn't configured yet */}
      {setup && !setup.configured && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/70 p-4 backdrop-blur-md"
          onClick={() => setSetup(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-space-800/90 p-8 shadow-2xl backdrop-blur-xl"
            style={{ boxShadow: "0 0 0 1px rgba(251,191,36,0.15), 0 30px 80px -20px rgba(0,0,0,0.8)" }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
              <AlertTriangle className="h-3.5 w-3.5" /> Configuración pendiente
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Conecta {setup.name} en 5 pasos
            </h3>
            <p className="mt-2 text-sm text-white/55">
              Necesitas crear una app en {setup.name} y pegar las claves en tu{" "}
              <code className="rounded border border-white/10 bg-space-900/60 px-1.5 py-0.5 text-[11px] text-neon-cyan">.env.local</code>.
              Después, vuelve aquí y pulsa Conectar.
            </p>

            <ol className="mt-5 space-y-3">
              {setup.steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/70">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neon-cyan/25 bg-neon-cyan/10 text-xs font-bold text-neon-cyan">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>

            <div className="mt-5 rounded-xl border border-white/8 bg-space-900/60 p-4 text-xs">
              <p className="font-semibold text-white/70">Redirect URL a pegar:</p>
              <code className="mt-1 block select-all break-all rounded border border-white/8 bg-space-950 p-2 text-neon-cyan">
                {setup.redirectUrl}
              </code>
              <p className="mt-3 font-semibold text-white/70">Variables a añadir:</p>
              <pre className="mt-1 rounded border border-white/8 bg-space-950 p-2 text-neon-cyan">
{setup.clientIdEnv}=...
{setup.clientSecretEnv}=...
              </pre>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setSetup(null)}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition"
              >
                Cerrar
              </button>
              <a
                href={setup.dashboardUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-navy-600 px-4 py-2.5 text-sm font-semibold text-white shadow-neon-cyan hover:scale-[1.02] transition"
              >
                Abrir {setup.name} <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
