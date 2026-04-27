/**
 * OAuth provider registry. Each entry describes how to start an OAuth flow
 * for a third-party platform. The Next API route at /api/oauth/[provider]/start
 * reads this registry and redirects the user.
 *
 * When env vars for a provider are missing, the dashboard modal shows the
 * `setup` steps so the user knows exactly how to create an app on that
 * platform and which keys to paste.
 */

export type OAuthProvider = {
  id: string;
  name: string;
  authUrl: (ctx: { clientId: string; redirectUri: string; state: string }) => string;
  tokenUrl?: string;
  scopes: string[];
  clientIdEnv: string;
  clientSecretEnv: string;
  setup: {
    dashboardUrl: string;
    steps: string[];
    redirectUriHint: string;
  };
};

export const PROVIDERS: Record<string, OAuthProvider> = {
  shopify: {
    id: "shopify",
    name: "Shopify",
    authUrl: ({ clientId, redirectUri, state }) =>
      `https://{shop}.myshopify.com/admin/oauth/authorize?client_id=${clientId}&scope=write_products,write_content&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`,
    tokenUrl: "https://{shop}.myshopify.com/admin/oauth/access_token",
    scopes: ["write_products", "write_content", "read_themes", "write_themes"],
    clientIdEnv: "SHOPIFY_CLIENT_ID",
    clientSecretEnv: "SHOPIFY_CLIENT_SECRET",
    setup: {
      dashboardUrl: "https://partners.shopify.com",
      redirectUriHint: "/api/oauth/shopify/callback",
      steps: [
        "Crea cuenta en Shopify Partners (gratis)",
        "Apps → Create app → Public app",
        "Copia el API key y API secret a tu .env.local como SHOPIFY_CLIENT_ID y SHOPIFY_CLIENT_SECRET",
        "Añade la Redirect URL de NovaAds: TU_URL + /api/oauth/shopify/callback",
        "Guarda y vuelve aquí para conectar"
      ]
    }
  },
  wix: {
    id: "wix",
    name: "Wix",
    authUrl: ({ clientId, redirectUri, state }) =>
      `https://www.wix.com/installer/install?appId=${clientId}&redirectUrl=${encodeURIComponent(redirectUri)}&state=${state}`,
    tokenUrl: "https://www.wixapis.com/oauth/access",
    scopes: ["offline_access"],
    clientIdEnv: "WIX_APP_ID",
    clientSecretEnv: "WIX_APP_SECRET",
    setup: {
      dashboardUrl: "https://dev.wix.com/dc3/my-apps",
      redirectUriHint: "/api/oauth/wix/callback",
      steps: [
        "Entra a Wix Dev Center → Create App",
        "En Permissions activa Sites, Content, Media",
        "Copia App ID y App Secret Key a WIX_APP_ID / WIX_APP_SECRET",
        "Añade Redirect URL: TU_URL + /api/oauth/wix/callback",
        "Publica en modo Draft para probar"
      ]
    }
  },
  wordpress: {
    id: "wordpress",
    name: "WordPress",
    authUrl: ({ clientId, redirectUri, state }) =>
      `https://public-api.wordpress.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=global&state=${state}`,
    tokenUrl: "https://public-api.wordpress.com/oauth2/token",
    scopes: ["global"],
    clientIdEnv: "WORDPRESS_CLIENT_ID",
    clientSecretEnv: "WORDPRESS_CLIENT_SECRET",
    setup: {
      dashboardUrl: "https://developer.wordpress.com/apps/",
      redirectUriHint: "/api/oauth/wordpress/callback",
      steps: [
        "Ve a developer.wordpress.com/apps y crea una nueva app",
        "Redirect URL: TU_URL + /api/oauth/wordpress/callback",
        "Type: Web",
        "Copia Client ID y Client Secret a tu .env.local"
      ]
    }
  },
  meta: {
    id: "meta",
    name: "Meta Ads",
    authUrl: ({ clientId, redirectUri, state }) =>
      `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=ads_management,business_management,pages_show_list`,
    tokenUrl: "https://graph.facebook.com/v19.0/oauth/access_token",
    scopes: ["ads_management", "business_management", "pages_show_list"],
    clientIdEnv: "META_APP_ID",
    clientSecretEnv: "META_APP_SECRET",
    setup: {
      dashboardUrl: "https://developers.facebook.com/apps",
      redirectUriHint: "/api/oauth/meta/callback",
      steps: [
        "developers.facebook.com → My Apps → Create App → Business",
        "Añade producto: Marketing API + Facebook Login",
        "Redirect URI: TU_URL + /api/oauth/meta/callback",
        "Copia App ID y App Secret a META_APP_ID / META_APP_SECRET"
      ]
    }
  },
  google: {
    id: "google",
    name: "Google Ads",
    authUrl: ({ clientId, redirectUri, state }) =>
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent("https://www.googleapis.com/auth/adwords")}&access_type=offline&state=${state}`,
    tokenUrl: "https://oauth2.googleapis.com/token",
    scopes: ["https://www.googleapis.com/auth/adwords"],
    clientIdEnv: "GOOGLE_CLIENT_ID",
    clientSecretEnv: "GOOGLE_CLIENT_SECRET",
    setup: {
      dashboardUrl: "https://console.cloud.google.com/apis/credentials",
      redirectUriHint: "/api/oauth/google/callback",
      steps: [
        "Crea proyecto en Google Cloud Console",
        "APIs & Services → Credentials → OAuth client ID → Web app",
        "Authorized redirect URI: TU_URL + /api/oauth/google/callback",
        "Habilita Google Ads API",
        "Copia client_id y client_secret a GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET",
        "Pide Developer Token en ads.google.com (aprobación de Google)"
      ]
    }
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok Ads",
    authUrl: ({ clientId, redirectUri, state }) =>
      `https://ads.tiktok.com/marketing_api/auth?app_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`,
    scopes: ["ads_management"],
    clientIdEnv: "TIKTOK_APP_ID",
    clientSecretEnv: "TIKTOK_APP_SECRET",
    setup: {
      dashboardUrl: "https://business-api.tiktok.com",
      redirectUriHint: "/api/oauth/tiktok/callback",
      steps: [
        "business-api.tiktok.com → Register My App",
        "Redirect URL: TU_URL + /api/oauth/tiktok/callback",
        "Copia App ID y Secret a TIKTOK_APP_ID / TIKTOK_APP_SECRET",
        "Solicita aprobación (TikTok revisa en 1-3 días)"
      ]
    }
  }
};

export function isProviderConfigured(id: string): boolean {
  const p = PROVIDERS[id];
  if (!p) return false;
  return !!(process.env[p.clientIdEnv] && process.env[p.clientSecretEnv]);
}
