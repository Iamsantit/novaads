import ConnectorGrid, { type Connector } from "@/components/dashboard/ConnectorGrid";

const connectors: Connector[] = [
  {
    id: "meta",
    name: "Meta Ads",
    logo: "Me",
    desc: "Publica campañas en Facebook e Instagram. NovaAds sube creatividades, copies y públicos automáticamente.",
    badge: "RECOMENDADO",
    tone: "from-blue-600 to-blue-900",
    authType: "oauth",
    oauthProvider: "meta",
    externalLoginUrl: "https://www.facebook.com/adsmanager"
  },
  {
    id: "google",
    name: "Google Ads",
    logo: "GA",
    desc: "Búsqueda, Display, YouTube y Shopping. Keywords + ad copies generados por NovaAds.",
    tone: "from-yellow-400 to-red-500",
    authType: "oauth",
    oauthProvider: "google",
    externalLoginUrl: "https://ads.google.com"
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    logo: "TT",
    desc: "Reels publicitarios, Spark Ads y segmentación por tendencias virales.",
    tone: "from-black to-rose-500",
    authType: "oauth",
    oauthProvider: "tiktok",
    externalLoginUrl: "https://ads.tiktok.com/i18n/login"
  },
  {
    id: "linkedin",
    name: "LinkedIn Ads",
    logo: "Li",
    desc: "B2B puro: Sponsored Content, Message Ads y segmentación por cargo/sector.",
    tone: "from-blue-700 to-sky-900",
    authType: "oauth",
    externalLoginUrl: "https://www.linkedin.com/campaignmanager/login"
  },
  {
    id: "x",
    name: "X Ads",
    logo: "X",
    desc: "Ads en la plataforma X (ex-Twitter). Ideal para tech y audiencias tempranas.",
    tone: "from-gray-900 to-black",
    authType: "oauth",
    externalLoginUrl: "https://ads.twitter.com"
  },
  {
    id: "pinterest",
    name: "Pinterest Ads",
    logo: "Pi",
    desc: "Tráfico cualificado para ecommerce, decoración, moda y bodas.",
    tone: "from-red-500 to-rose-700",
    authType: "oauth",
    externalLoginUrl: "https://ads.pinterest.com"
  },
  {
    id: "snap",
    name: "Snapchat Ads",
    logo: "Sn",
    desc: "Audiencias jóvenes (Gen Z). AR lens y Story Ads incluidas.",
    tone: "from-yellow-300 to-yellow-500",
    authType: "oauth",
    externalLoginUrl: "https://ads.snapchat.com"
  },
  {
    id: "reddit",
    name: "Reddit Ads",
    logo: "Rd",
    desc: "Segmenta por subreddit. Funciona especialmente bien para SaaS y tech.",
    tone: "from-orange-500 to-red-600",
    authType: "oauth",
    externalLoginUrl: "https://ads.reddit.com"
  }
];

export default function CampanasPage() {
  return (
    <ConnectorGrid
      chip="Campañas publicitarias"
      title="¿Dónde quieres lanzar tus ads?"
      subtitle="Conecta tus cuentas de anuncios y NovaAds prepara creatividades, copies, segmentación y presupuesto diario para cada plataforma."
      connectors={connectors}
      footerNote="Puedes conectar varias: orquestamos la campaña omnicanal con el mismo brief."
    />
  );
}
