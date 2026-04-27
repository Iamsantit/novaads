import ConnectorGrid, { type Connector } from "@/components/dashboard/ConnectorGrid";

const connectors: Connector[] = [
  // ── Incluidos en el plan ────────────────────────────────────
  {
    id: "dalle",
    name: "DALL·E 3",
    logo: "DE",
    desc: "Creatividades fotorrealistas con máxima coherencia al prompt. Incluido en tu plan.",
    badge: "INCLUIDO",
    tone: "from-emerald-400 to-teal-600",
    authType: "ai"
  },
  {
    id: "grok-aurora",
    name: "Grok Aurora (xAI)",
    logo: "Gk",
    desc: "Generador de imágenes de xAI. Estilo fotorrealista e ilustración. Usa tu clave xAI.",
    badge: "NUEVO",
    tone: "from-gray-600 to-gray-900",
    authType: "api_key",
    externalLoginUrl: "https://console.x.ai",
    apiKeyUrl: "https://console.x.ai/team/default/api-keys"
  },

  // ── Modelos premium ─────────────────────────────────────────
  {
    id: "midjourney",
    name: "Midjourney",
    logo: "MJ",
    desc: "Calidad artística superior para moodboards, branding y creatividades premium.",
    tone: "from-indigo-500 to-purple-700",
    authType: "api_key",
    externalLoginUrl: "https://www.midjourney.com",
    apiKeyUrl: "https://docs.midjourney.com/docs/api"
  },
  {
    id: "flux",
    name: "Flux.1",
    logo: "Fx",
    desc: "Modelo open-weights estado del arte. Resultados de gama alta a coste bajo.",
    badge: "TOP",
    tone: "from-rose-500 to-pink-700",
    authType: "api_key",
    externalLoginUrl: "https://fal.ai/login",
    apiKeyUrl: "https://fal.ai/dashboard/keys"
  },
  {
    id: "stable",
    name: "Stable Diffusion XL",
    logo: "SD",
    desc: "Open source y económico. Ideal para generar variaciones a gran escala.",
    tone: "from-violet-500 to-fuchsia-700",
    authType: "api_key",
    externalLoginUrl: "https://platform.stability.ai/account/keys",
    apiKeyUrl: "https://platform.stability.ai/account/keys"
  },
  {
    id: "firefly",
    name: "Adobe Firefly",
    logo: "Af",
    desc: "IA de Adobe, entrenada con contenido licenciado. Ideal para uso comercial sin riesgos.",
    tone: "from-red-500 to-orange-600",
    authType: "api_key",
    externalLoginUrl: "https://developer.adobe.com/firefly-api/",
    apiKeyUrl: "https://developer.adobe.com/console"
  },

  // ── Especializados ──────────────────────────────────────────
  {
    id: "leonardo",
    name: "Leonardo AI",
    logo: "Le",
    desc: "Modelos especializados por industria: ecommerce, gaming, moda, arquitectura.",
    tone: "from-orange-400 to-red-600",
    authType: "api_key",
    externalLoginUrl: "https://app.leonardo.ai/auth/signup",
    apiKeyUrl: "https://app.leonardo.ai/settings/api-keys"
  },
  {
    id: "ideogram",
    name: "Ideogram",
    logo: "Id",
    desc: "La mejor IA para imágenes con texto legible: carteles, banners y thumbnails.",
    tone: "from-cyan-400 to-blue-700",
    authType: "api_key",
    externalLoginUrl: "https://ideogram.ai/login",
    apiKeyUrl: "https://developer.ideogram.ai/api-keys"
  },
  {
    id: "recraft",
    name: "Recraft",
    logo: "Rc",
    desc: "Diseño vectorial y raster con IA. Perfecto para íconos, logos e ilustraciones de marca.",
    badge: "NUEVO",
    tone: "from-blue-400 to-blue-700",
    authType: "api_key",
    externalLoginUrl: "https://www.recraft.ai",
    apiKeyUrl: "https://www.recraft.ai/profile"
  },
  {
    id: "kling-img",
    name: "Kling AI (img)",
    logo: "Kl",
    desc: "Modelo chino de generación de imagen con alta fidelidad de detalle y estilo.",
    tone: "from-purple-600 to-violet-800",
    authType: "api_key",
    externalLoginUrl: "https://klingai.com",
    apiKeyUrl: "https://klingai.com/dev/document"
  },
  {
    id: "gemini-img",
    name: "Gemini Imagen",
    logo: "Gm",
    desc: "Modelo de imagen de Google. Alta calidad con coherencia semántica. Usa tu clave Gemini.",
    tone: "from-blue-400 to-purple-600",
    authType: "api_key",
    externalLoginUrl: "https://aistudio.google.com",
    apiKeyUrl: "https://aistudio.google.com/app/apikey"
  },

  // ── Exportación ─────────────────────────────────────────────
  {
    id: "runway-img",
    name: "Runway Gen-3 (img)",
    logo: "Rw",
    desc: "Motor de imagen Runway. Coherencia perfecta con los clips de video generados.",
    tone: "from-black to-gray-700",
    authType: "api_key",
    externalLoginUrl: "https://runwayml.com/login",
    apiKeyUrl: "https://app.runwayml.com/account"
  },
  {
    id: "canva",
    name: "Canva (export)",
    logo: "Cv",
    desc: "Abre las imágenes en Canva para editar con tus plantillas y marca.",
    tone: "from-sky-400 to-blue-600",
    authType: "oauth",
    externalLoginUrl: "https://www.canva.com/login"
  }
];

export default function ImagenesPage() {
  return (
    <ConnectorGrid
      chip="Creación de imágenes"
      title="Elige con qué IA generar tus creatividades"
      subtitle="Combina modelos. NovaAds orquesta la mejor IA para cada tipo de imagen: hero, banner, carrusel, ficha de producto o publicidad."
      connectors={connectors}
      footerNote="Las marcadas como INCLUIDO no requieren configuración. Para el resto, crea cuenta y pega tu API key."
    />
  );
}
