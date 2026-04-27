import ConnectorGrid, { type Connector } from "@/components/dashboard/ConnectorGrid";

const connectors: Connector[] = [
  // ── Recomendados ────────────────────────────────────────────
  {
    id: "gamma",
    name: "Gamma",
    logo: "Ga",
    desc: "Genera una presentación editable hospedada lista para compartir con inversores.",
    badge: "RECOMENDADO",
    tone: "from-violet-500 to-purple-700",
    authType: "api_key",
    externalLoginUrl: "https://gamma.app/signup",
    apiKeyUrl: "https://gamma.app/account/api"
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    logo: "Nb",
    desc: "IA de Google que convierte tus documentos en presentaciones y podcasts explicativos.",
    badge: "NUEVO",
    tone: "from-blue-500 to-indigo-700",
    authType: "oauth",
    externalLoginUrl: "https://notebooklm.google.com"
  },

  // ── Diseño visual ───────────────────────────────────────────
  {
    id: "canva",
    name: "Canva Presentations",
    logo: "Cv",
    desc: "Abre el pitch deck como proyecto Canva con tu marca y plantillas.",
    tone: "from-sky-400 to-blue-600",
    authType: "oauth",
    externalLoginUrl: "https://www.canva.com/login"
  },
  {
    id: "beautiful",
    name: "Beautiful.ai",
    logo: "Bf",
    desc: "Decks corporativos elegantes con autolayout inteligente que se ajusta solo.",
    tone: "from-rose-500 to-red-700",
    authType: "api_key",
    externalLoginUrl: "https://www.beautiful.ai",
    apiKeyUrl: "https://www.beautiful.ai/settings/api"
  },
  {
    id: "tome",
    name: "Tome",
    logo: "Tm",
    desc: "Presentaciones interactivas tipo storytelling, ideales para ventas B2B.",
    tone: "from-amber-500 to-orange-700",
    authType: "api_key",
    externalLoginUrl: "https://tome.app/login"
  },
  {
    id: "decktopus",
    name: "Decktopus AI",
    logo: "Dk",
    desc: "Crea presentaciones completas con IA: slides, notas y Q&A en segundos.",
    badge: "NUEVO",
    tone: "from-teal-400 to-cyan-600",
    authType: "api_key",
    externalLoginUrl: "https://app.decktopus.com/login",
    apiKeyUrl: "https://app.decktopus.com/settings"
  },
  {
    id: "slidesai",
    name: "SlidesAI",
    logo: "Sl",
    desc: "Plugin para Google Slides que genera diapositivas desde texto o documentos.",
    tone: "from-green-400 to-emerald-600",
    authType: "oauth",
    externalLoginUrl: "https://slidesai.io/login"
  },
  {
    id: "presentations-ai",
    name: "Presentations.ai",
    logo: "Pa",
    desc: "Genera decks con plantillas empresariales, gráficos y datos en tiempo real.",
    tone: "from-purple-400 to-violet-600",
    authType: "api_key",
    externalLoginUrl: "https://www.presentations.ai",
    apiKeyUrl: "https://www.presentations.ai/settings/api"
  },

  // ── Colaboración ────────────────────────────────────────────
  {
    id: "pitch",
    name: "Pitch.com",
    logo: "Pi",
    desc: "Colaboración en tiempo real, ideal para equipos y pitch de startups.",
    tone: "from-emerald-500 to-green-700",
    authType: "oauth",
    externalLoginUrl: "https://app.pitch.com"
  },
  {
    id: "miro",
    name: "Miro",
    logo: "Mr",
    desc: "Exporta el pitch como pizarra colaborativa de Miro. Ideal para workshops.",
    tone: "from-yellow-400 to-amber-600",
    authType: "oauth",
    externalLoginUrl: "https://miro.com/login"
  },

  // ── Exportación ─────────────────────────────────────────────
  {
    id: "google",
    name: "Google Slides",
    logo: "GS",
    desc: "Exporta directamente a Google Slides en tu Drive. Listo para editar.",
    tone: "from-yellow-400 to-orange-500",
    authType: "oauth",
    externalLoginUrl: "https://accounts.google.com"
  },
  {
    id: "powerpoint",
    name: "PowerPoint",
    logo: "PP",
    desc: "Descarga como .pptx compatible con Office 365 y escritorio.",
    tone: "from-red-500 to-orange-600",
    authType: "ai"
  },
  {
    id: "keynote",
    name: "Keynote",
    logo: "Kn",
    desc: "Exporta como .key para macOS con animaciones nativas de Apple.",
    tone: "from-slate-700 to-black",
    authType: "ai"
  }
];

export default function PresentacionesPage() {
  return (
    <ConnectorGrid
      chip="Presentaciones"
      title="Crea tu pitch deck con la plataforma que prefieras"
      subtitle="Gamma, NotebookLM, Beautiful.ai y más. NovaAds genera el contenido y lo formatea para la herramienta que elijas."
      connectors={connectors}
      footerNote="Para inversores: recomendamos Gamma o Beautiful.ai. Para investigación: NotebookLM. Para ventas B2B: Google Slides o PowerPoint."
    />
  );
}
