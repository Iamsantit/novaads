export type Locale = {
  country: string;
  currency: string;
  symbol: string;
  rate: number; // USD → local, approximate; replace with real-time API
  locale: string;
};

const LOCALES: Record<string, Locale> = {
  US: { country: "US", currency: "USD", symbol: "$", rate: 1, locale: "en-US" },
  MX: { country: "MX", currency: "MXN", symbol: "$", rate: 17.2, locale: "es-MX" },
  CO: { country: "CO", currency: "COP", symbol: "$", rate: 3950, locale: "es-CO" },
  AR: { country: "AR", currency: "ARS", symbol: "$", rate: 970, locale: "es-AR" },
  CL: { country: "CL", currency: "CLP", symbol: "$", rate: 960, locale: "es-CL" },
  PE: { country: "PE", currency: "PEN", symbol: "S/", rate: 3.75, locale: "es-PE" },
  ES: { country: "ES", currency: "EUR", symbol: "€", rate: 0.92, locale: "es-ES" },
  BR: { country: "BR", currency: "BRL", symbol: "R$", rate: 5.1, locale: "pt-BR" },
  GB: { country: "GB", currency: "GBP", symbol: "£", rate: 0.79, locale: "en-GB" }
};

export const DEFAULT_LOCALE: Locale = LOCALES.US;

export function getLocale(country?: string): Locale {
  if (!country) return DEFAULT_LOCALE;
  return LOCALES[country.toUpperCase()] ?? DEFAULT_LOCALE;
}

export function formatPrice(usd: number, locale: Locale): string {
  const amount = usd * locale.rate;
  const rounded =
    locale.rate >= 100 ? Math.round(amount / 100) * 100 : Math.round(amount);
  return new Intl.NumberFormat(locale.locale, {
    style: "currency",
    currency: locale.currency,
    maximumFractionDigits: 0
  }).format(rounded);
}

// Client-side country detection via public API.
// On production use your own IP geolocation (Cloudflare, Vercel Edge, ipapi).
export async function detectCountry(): Promise<string> {
  try {
    const r = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!r.ok) return "US";
    const j = (await r.json()) as { country?: string };
    return j.country ?? "US";
  } catch {
    return "US";
  }
}
