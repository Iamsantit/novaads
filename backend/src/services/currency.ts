/**
 * Live FX service.
 * Pulls daily rates (USD base), caches in memory for 1 hour.
 * Swap the endpoint in .env (FX_API_URL) for a paid provider if you need tax-grade precision.
 */

type RateCache = { ts: number; rates: Record<string, number> };
let cache: RateCache | null = null;
const TTL = 60 * 60 * 1000; // 1h

export async function getRates(): Promise<Record<string, number>> {
  if (cache && Date.now() - cache.ts < TTL) return cache.rates;

  const url = process.env.FX_API_URL ?? "https://open.er-api.com/v6/latest/USD";
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`fx ${r.status}`);
    const j = (await r.json()) as { rates?: Record<string, number> };
    cache = { ts: Date.now(), rates: j.rates ?? {} };
    return cache.rates;
  } catch (err) {
    console.error("[fx] fallback to static rates:", err);
    return STATIC;
  }
}

export async function convert(usd: number, currency: string): Promise<number> {
  const rates = await getRates();
  const rate = rates[currency.toUpperCase()] ?? 1;
  return usd * rate;
}

const STATIC: Record<string, number> = {
  USD: 1, MXN: 17.2, COP: 3950, ARS: 970, CLP: 960, PEN: 3.75,
  EUR: 0.92, BRL: 5.1, GBP: 0.79
};
