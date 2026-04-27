import Stripe from "stripe";

/**
 * Server-only Stripe client. Never import this from a "use client" file.
 * If STRIPE_SECRET_KEY is missing we fall back to null so dev works without keys.
 */
const key = process.env.STRIPE_SECRET_KEY;
export const stripe: Stripe | null = key
  ? new Stripe(key, { apiVersion: "2024-06-20" })
  : null;

export type PlanId = "basic" | "pro" | "premium";
export type Interval = "month" | "year";

export const PRICE_MAP: Record<PlanId, Record<Interval, string | undefined>> = {
  basic: {
    month: process.env.STRIPE_PRICE_BASIC_MONTH,
    year: process.env.STRIPE_PRICE_BASIC_YEAR
  },
  pro: {
    month: process.env.STRIPE_PRICE_PRO_MONTH,
    year: process.env.STRIPE_PRICE_PRO_YEAR
  },
  premium: {
    month: process.env.STRIPE_PRICE_PREMIUM_MONTH,
    year: process.env.STRIPE_PRICE_PREMIUM_YEAR
  }
};

/**
 * Fallback: if you haven't created Stripe Products yet, we build the prices
 * inline from unit amounts in USD. Delete this block once you have real price IDs.
 */
export const FALLBACK_PRICES: Record<PlanId, Record<Interval, { amount: number; name: string }>> = {
  basic: {
    month: { amount: 1900, name: "NovaAds Básico (mensual)" },
    year: { amount: 19000, name: "NovaAds Básico (anual)" }
  },
  pro: {
    month: { amount: 4900, name: "NovaAds Pro (mensual)" },
    year: { amount: 49000, name: "NovaAds Pro (anual)" }
  },
  premium: {
    month: { amount: 9900, name: "NovaAds Premium (mensual)" },
    year: { amount: 99000, name: "NovaAds Premium (anual)" }
  }
};
