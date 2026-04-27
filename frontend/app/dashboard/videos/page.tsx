import ConnectorGrid, { type Connector } from "@/components/dashboard/ConnectorGrid";

const connectors: Connector[] = [
  // ── Generación de video ─────────────────────────────────────
  {
    id: "runway",
    name: "Runway Gen-4",
    logo: "Rw",
    desc: "Clips de ultra calidad desde texto o imagen. El estándar de la industria para ads.",
    badge: "TOP",
    tone: "from-black to-gray-700",
    authType: "api_key",
    externalLoginUrl: "https://runwayml.com/login",
    apiKeyUrl: "https://app.runwayml.com/account"
  },
  {
    id: "kling",
    name: "Kling AI",
    logo: "Kl",
    desc: "Videos de hasta 3 min con física realista. Rival directo de Sora con acceso API.",
    badge: "NUEVO",
    tone: "from-purple-600 to-violet-800",
    authType: "api_key",
    externalLoginUrl: "https://klingai.com",
    apiKeyUrl: "https://klingai.com/dev/document"
  },
  {
    id: "luma",
    name: "Luma Dream Machine",
    logo: "Lu",
    desc: "Videos cinematográficos con movimiento de cámara realista. Calidad de nivel película.",
    badge: "NUEVO",
    tone: "from-teal-400 to-cyan-600",
    authType: "api_key",
    externalLoginUrl: "https://lumalabs.ai/dream-machine",
    apiKeyUrl: "https://lumalabs.ai/dream-machine/api"
  },
  {
    id: "sora",
    name: "Sora (OpenAI)",
    logo: "So",
    desc: "Hasta 60 segundos con coherencia física impresionante. Requiere OpenAI Pro.",
    tone: "from-emerald-500 to-teal-700",
    authType: "api_key",
    externalLoginUrl: "https://platform.openai.com/login",
    apiKeyUrl: "https://platform.openai.com/api-keys"
  },
  {
    id: "pika",
    name: "Pika Labs",
    logo: "Pk",
    desc: "Videos cortos con movimiento fluido. Perfecto para reels virales en redes.",
    tone: "from-pink-500 to-rose-700",
    authType: "api_key",
    externalLoginUrl: "https://pika.art",
    apiKeyUrl: "https://pika.art/dashboard"
  },
  {
    id: "vidu",
    name: "Vidu",
    logo: "Vd",
    desc: "Video HD con alta coherencia temporal. Personajes consistentes entre escenas.",
    tone: "from-rose-500 to-red-700",
    authType: "api_key",
    externalLoginUrl: "https://www.vidu.io",
    apiKeyUrl: "https://www.vidu.io/api"
  },
  {
    id: "minimax",
    name: "Minimax Video",
    logo: "Mx",
    desc: "Video generativo de alta calidad. Personajes y estilos consistentes entre clips.",
    tone: "from-slate-600 to-slate-900",
    authType: "api_key",
    externalLoginUrl: "https://www.minimaxi.com",
    apiKeyUrl: "https://www.minimaxi.com/user-center/basic-information/interface-key"
  },

  // ── Avatares y voz ──────────────────────────────────────────
  {
    id: "synthesia",
    name: "Synthesia",
    logo: "Sy",
    desc: "Videos con avatares humanos que hablan tu guion en 140+ idiomas.",
    tone: "from-indigo-500 to-blue-700",
    authType: "api_key",
    externalLoginUrl: "https://app.synthesia.io",
    apiKeyUrl: "https://app.synthesia.io/account/integrations/api"
  },
  {
    id: "heygen",
    name: "HeyGen",
    logo: "Hg",
    desc: "Clona tu voz y cara para video-ads personalizados a escala.",
    tone: "from-purple-500 to-pink-700",
    authType: "api_key",
    externalLoginUrl: "https://app.heygen.com/login",
    apiKeyUrl: "https://app.heygen.com/settings/api"
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs (voz)",
    logo: "El",
    desc: "Voice-over ultra realista en 30+ idiomas. Clona cualquier voz con 1 min de audio.",
    tone: "from-gray-700 to-black",
    authType: "api_key",
    externalLoginUrl: "https://elevenlabs.io/sign-up",
    apiKeyUrl: "https://elevenlabs.io/app/settings/api-keys"
  },
  {
    id: "invideo",
    name: "Invideo AI",
    logo: "Iv",
    desc: "De texto a video completo con narración, música y subtítulos en minutos.",
    badge: "NUEVO",
    tone: "from-blue-500 to-indigo-700",
    authType: "api_key",
    externalLoginUrl: "https://ai.invideo.io",
    apiKeyUrl: "https://ai.invideo.io/settings"
  },

  // ── Edición ─────────────────────────────────────────────────
  {
    id: "descript",
    name: "Descript",
    logo: "Dc",
    desc: "Edita el video generado como si fuera un documento de texto. Elimina silencios en 1 clic.",
    tone: "from-cyan-500 to-blue-700",
    authType: "oauth",
    externalLoginUrl: "https://web.descript.com"
  },
  {
    id: "capcut",
    name: "CapCut",
    logo: "Cc",
    desc: "Envía el clip a CapCut con transiciones, música y subtítulos sugeridos.",
    tone: "from-neutral-800 to-neutral-950",
    authType: "oauth",
    externalLoginUrl: "https://www.capcut.com/login"
  }
];

export default function VideosPage() {
  return (
    <ConnectorGrid
      chip="Videos IA"
      title="Genera videos con la IA que mejor se adapte"
      subtitle="Guion + storyboard + voice-over + clips. Combinamos varios modelos para que cada escena tenga el motor óptimo."
      connectors={connectors}
      footerNote="Crea tu cuenta en cada IA y pega su API key. Te abrimos la página de registro al hacer clic en Conectar."
    />
  );
}
