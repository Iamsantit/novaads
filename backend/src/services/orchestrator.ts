import { chatForModule, imageForModule, slidesForModule } from "./ai";
import type { ProviderId } from "./ai";

/**
 * Orchestrator: one prompt → six deliverables, each routed to the provider
 * that performs best for the module (see ai/index.ts ROUTING table).
 *
 * Pipeline:
 *   1. BRIEF   — structured JSON extraction (Gemini → OpenAI → Grok)
 *   2. FAN-OUT — six modules in parallel via Promise.allSettled
 *   3. STREAM  — each module emits progress via callbacks (SSE on the route)
 */

export const MODULES = [
  "landing",
  "funnel",
  "ads",
  "images",
  "video",
  "pitch"
] as const;
export type Module = (typeof MODULES)[number];

type OrchestrateArgs = {
  prompt: string;
  modules: Module[];
  locale: string;
  user?: { email: string; plan?: string };
  onModuleStart: (m: Module) => void;
  onModuleDone: (m: Module, payload: unknown, provider: ProviderId) => void;
  onError: (m: Module, err: string) => void;
};

export type Brief = {
  niche: string;
  audience: string;
  tone: string;
  offer: string;
  price_usd: number;
  unique_value: string[];
  cta: string;
  brand_voice: string;
  visual_style: string;
};

export async function orchestrate(args: OrchestrateArgs) {
  const { prompt, modules, locale, onModuleStart, onModuleDone, onError } = args;

  // 1. BRIEF
  const briefRes = await chatForModule("brief", {
    system: briefSystem(locale),
    user: prompt,
    json: true,
    maxTokens: 700
  });
  const brief = briefRes.content as Brief;

  // 2. Fan out
  const jobs: Promise<void>[] = modules.map(async (m) => {
    onModuleStart(m);
    try {
      const { payload, provider } = await runModule(m, brief, locale);
      onModuleDone(m, payload, provider);
    } catch (err) {
      onError(m, (err as Error).message);
    }
  });

  await Promise.allSettled(jobs);
}

async function runModule(
  m: Module,
  brief: Brief,
  locale: string
): Promise<{ payload: unknown; provider: ProviderId }> {
  switch (m) {
    case "landing": {
      const r = await chatForModule("landing", {
        system: landingSystem(locale),
        user: JSON.stringify(brief),
        json: true,
        maxTokens: 1800
      });
      return { payload: r.content, provider: r.provider };
    }
    case "funnel": {
      const r = await chatForModule("funnel", {
        system: funnelSystem(locale),
        user: JSON.stringify(brief),
        json: true,
        maxTokens: 1800
      });
      return { payload: r.content, provider: r.provider };
    }
    case "ads": {
      const r = await chatForModule("ads", {
        system: adsSystem(locale),
        user: JSON.stringify(brief),
        json: true,
        maxTokens: 1400
      });
      return { payload: r.content, provider: r.provider };
    }
    case "video": {
      const r = await chatForModule("video", {
        system: videoSystem(locale),
        user: JSON.stringify(brief),
        json: true,
        maxTokens: 1200
      });
      return { payload: r.content, provider: r.provider };
    }
    case "pitch": {
      // Gamma preferred (real hosted deck); falls back to chat JSON otherwise.
      const r = await slidesForModule({
        topic: `${brief.niche} — ${brief.offer}`,
        audience: brief.audience,
        tone: brief.tone,
        language: locale.slice(0, 2),
        slides: 10
      });
      return { payload: { url: r.url, slides: r.slides }, provider: r.provider };
    }
    case "images": {
      const base =
        `High-quality marketing creative, ${brief.visual_style}, for ${brief.niche} ` +
        `targeting ${brief.audience}. Clean, modern, professional.`;
      const [hero, square, product] = await Promise.all([
        imageForModule({ prompt: `${base} Hero banner composition.`, size: "1792x1024" }),
        imageForModule({ prompt: `${base} Social ad square composition.` }),
        imageForModule({ prompt: `${base} Product lifestyle close-up.` })
      ]);
      return {
        payload: { images: [hero.url, square.url, product.url] },
        provider: hero.provider
      };
    }
  }
}

/* ---------- System prompts (same as before) ---------- */

const briefSystem = (locale: string) => `
You are a senior marketing strategist. Read the user's raw idea and return a strict JSON brief.
Respond in language ${locale}. Output keys exactly:
{
  "niche": string,
  "audience": string,
  "tone": string,
  "offer": string,
  "price_usd": number,
  "unique_value": string[],
  "cta": string,
  "brand_voice": string,
  "visual_style": string
}
Be concrete. No fluff. If the user gave a price in another currency, convert to USD.
`;

const landingSystem = (locale: string) => `
You are a world-class conversion copywriter. Output JSON with a full landing page structure in ${locale}:
{
  "hero": { "headline": string, "subheadline": string, "cta": string },
  "offer": { "title": string, "body": string },
  "benefits": [{ "title": string, "body": string }],
  "social_proof": [{ "name": string, "quote": string }],
  "faq": [{ "q": string, "a": string }],
  "final_cta": { "headline": string, "button": string }
}
Follow CRO best practices: specific benefits, concrete outcomes, no generic marketing speak.
`;

const funnelSystem = (locale: string) => `
You are a funnel expert. Build a 4-step funnel + email sequence in ${locale}. JSON:
{
  "lead_magnet": { "title": string, "hook": string, "cta": string, "deliverable": string },
  "sales_page": { "headline": string, "story": string, "offer": string, "guarantee": string, "cta": string },
  "checkout": { "headline": string, "upsell": string, "trust_badges": string[] },
  "thank_you": { "headline": string, "next_step": string },
  "emails": [{ "day": number, "subject": string, "body": string }]
}
Include at least 5 emails, one per day.
`;

const adsSystem = (locale: string) => `
You are a performance marketer. Create ad content in ${locale}. JSON:
{
  "angles": [{ "name": string, "hook": string, "body": string, "cta": string }],
  "targeting": {
    "age_min": number, "age_max": number,
    "genders": string[], "interests": string[],
    "locations": string[], "placements": string[]
  },
  "strategy": { "budget_usd_per_day": number, "kpi": string, "optimization": string }
}
Provide 5 ad angles. Keep hooks under 12 words.
`;

const videoSystem = (locale: string) => `
You are a short-form video director. Return in ${locale}. JSON:
{
  "script_45s": { "hook": string, "body": string, "cta": string },
  "storyboard": [{ "scene": number, "visual": string, "voiceover": string, "seconds": number }],
  "b_roll_ideas": string[],
  "music_mood": string
}
`;
