import ConnectorGrid, { type Connector } from "@/components/dashboard/ConnectorGrid";
import Link from "next/link";
import { Wand2, ArrowRight } from "lucide-react";

const connectors: Connector[] = [
  // ── Publicadores tradicionales ─────────────────────────────
  {
    id: "wix",
    name: "Wix",
    logo: "Wix",
    desc: "Publica tu landing directamente en tu sitio Wix Studio en un clic.",
    badge: "POPULAR",
    tone: "from-black to-gray-700",
    authType: "oauth",
    oauthProvider: "wix",
    externalLoginUrl: "https://users.wix.com/signin"
  },
  {
    id: "wordpress",
    name: "WordPress",
    logo: "WP",
    desc: "Sube la landing como página o post a tu WordPress (.com o self-hosted).",
    tone: "from-blue-700 to-blue-900",
    authType: "oauth",
    oauthProvider: "wordpress",
    externalLoginUrl: "https://wordpress.com/log-in"
  },
  {
    id: "shopify",
    name: "Shopify",
    logo: "Sh",
    desc: "Crea páginas y secciones personalizadas dentro de tu tienda Shopify.",
    tone: "from-emerald-500 to-green-700",
    authType: "oauth",
    oauthProvider: "shopify",
    externalLoginUrl: "https://accounts.shopify.com/lookup"
  },
  {
    id: "webflow",
    name: "Webflow",
    logo: "Wf",
    desc: "Exporta la landing a Webflow con sus componentes y CMS listos.",
    tone: "from-indigo-500 to-purple-700",
    authType: "oauth",
    externalLoginUrl: "https://webflow.com/dashboard"
  },
  {
    id: "framer",
    name: "Framer",
    logo: "Fr",
    desc: "Importa la landing como proyecto Framer totalmente editable con animaciones.",
    tone: "from-sky-500 to-blue-700",
    authType: "oauth",
    externalLoginUrl: "https://framer.com/login"
  },
  {
    id: "squarespace",
    name: "Squarespace",
    logo: "Sq",
    desc: "Publica en Squarespace manteniendo tu plantilla y marca actuales.",
    tone: "from-gray-800 to-black",
    authType: "oauth",
    externalLoginUrl: "https://account.squarespace.com"
  },
  {
    id: "ghost",
    name: "Ghost",
    logo: "Gh",
    desc: "Ideal para creators y newsletters. Publica landings y artículos.",
    tone: "from-gray-600 to-gray-900",
    authType: "api_key",
    externalLoginUrl: "https://ghost.org/signin",
    apiKeyUrl: "https://ghost.org/docs/admin-api/"
  },

  // ── Constructores IA ───────────────────────────────────────
  {
    id: "lovable",
    name: "Lovable",
    logo: "Lv",
    desc: "Genera apps y landings full-stack con IA desde un prompt. React + Supabase automático.",
    badge: "NUEVO",
    tone: "from-pink-500 to-rose-700",
    authType: "oauth",
    externalLoginUrl: "https://lovable.dev/login"
  },
  {
    id: "bolt",
    name: "Bolt AI",
    logo: "⚡",
    desc: "IDE en el navegador con IA. Genera, edita y despliega tu web sin salir del chat.",
    badge: "NUEVO",
    tone: "from-yellow-400 to-amber-600",
    authType: "oauth",
    externalLoginUrl: "https://bolt.new"
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    logo: "v0",
    desc: "Genera componentes UI con shadcn/ui y Next.js desde texto o imágenes.",
    tone: "from-slate-700 to-black",
    authType: "oauth",
    externalLoginUrl: "https://v0.dev"
  },
  {
    id: "claude-web",
    name: "Claude (Anthropic)",
    logo: "Cl",
    desc: "Usa Claude para generar código HTML/CSS/JS personalizado y estructuras de landing.",
    tone: "from-orange-500 to-red-700",
    authType: "api_key",
    externalLoginUrl: "https://console.anthropic.com",
    apiKeyUrl: "https://console.anthropic.com/settings/keys"
  },
  {
    id: "10web",
    name: "10Web",
    logo: "10",
    desc: "Constructor WordPress con IA. Crea y aloja páginas optimizadas en segundos.",
    tone: "from-blue-500 to-indigo-700",
    authType: "api_key",
    externalLoginUrl: "https://my.10web.io/login",
    apiKeyUrl: "https://my.10web.io/settings/api"
  },
  {
    id: "figma",
    name: "Figma",
    logo: "Fg",
    desc: "Exporta el diseño de tu landing a Figma para edición colaborativa y handoff.",
    tone: "from-purple-500 to-pink-600",
    authType: "api_key",
    externalLoginUrl: "https://www.figma.com/login",
    apiKeyUrl: "https://www.figma.com/settings"
  },
  {
    id: "bubble",
    name: "Bubble",
    logo: "Bu",
    desc: "Publica tu landing como app no-code en Bubble con lógica y base de datos.",
    tone: "from-blue-400 to-cyan-600",
    authType: "oauth",
    externalLoginUrl: "https://bubble.io/login"
  },

  // ── Exportación directa ─────────────────────────────────────
  {
    id: "custom",
    name: "HTML personalizado",
    logo: "{}",
    desc: "Descarga el bundle HTML/CSS/JS listo para subir a cualquier hosting.",
    tone: "from-cyan-500 to-navy-700",
    authType: "ai"
  }
];

export default function PaginasPage() {
  return (
    <div className="space-y-8">
      {/* Hero CTA — Crear página con IA */}
      <div className="relative overflow-hidden rounded-3xl border border-neon-cyan/20 bg-space-800/60 p-8 backdrop-blur-md"
        style={{ boxShadow: "0 0 60px -20px rgba(0,245,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
        {/* Nebula blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-cyan-400/8 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-xs font-semibold text-neon-cyan">
              <Wand2 className="h-3.5 w-3.5" /> Nuevo · Creador con IA
            </div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Crea tu página web desde cero con IA
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white/55">
              Responde unas preguntas sobre tu negocio y 5 IAs — Claude, DALL·E 3, Flux.1, Ideogram y Gamma — crearán tu landing page, e-commerce o portfolio completo con logo, imágenes premium y animaciones. Después te guiamos para publicarla gratis en Vercel.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Landing Page", "E-commerce", "Portfolio", "Blog", "Corporativa", "App Web"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50">{t}</span>
              ))}
            </div>
          </div>
          <Link
            href="/dashboard/paginas/crear"
            className="group flex shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-4 text-sm font-bold text-white shadow-neon-cyan transition hover:scale-105"
            style={{ boxShadow: "0 0 30px rgba(0,245,255,0.3)" }}
          >
            <Wand2 className="h-5 w-5" />
            Crear mi página
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Connector grid — plataformas de publicación */}
      <ConnectorGrid
        chip="Páginas web"
        title="¿Dónde quieres publicar tu landing?"
        subtitle="Desde Wix hasta Lovable o Bolt AI — NovaAds genera el contenido y lo publica donde tú elijas con un clic."
        connectors={connectors}
        footerNote="¿No ves tu plataforma? Escríbenos y la agregamos en 48h."
      />
    </div>
  );
}
