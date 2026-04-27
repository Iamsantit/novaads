import type { AIProvider, ChatInput, ChatOutput, ImageInput, ImageOutput, ProviderId, SlidesInput, SlidesOutput } from "./types";
import { ProviderError } from "./types";
import { openaiProvider } from "./openai";
import { geminiProvider } from "./gemini";
import { grokProvider } from "./grok";

/**
 * AI router. Each module (landing, funnel, ads, images, video, pitch) picks a
 * preferred provider based on strengths:
 *
 *   OpenAI → solid general writing, JSON mode, DALL·E 3 for images
 *   Gemini → cheapest for long-context briefs and structured extraction
 *   Grok   → edgier copy, better hooks for ads and viral video scripts
 *   Gamma  → real hosted presentations (pitch decks)
 *
 * If the preferred provider is unavailable (no API key or error), we fall
 * through the chain so the pipeline never breaks for the user.
 */

export const providers: Partial<Record<ProviderId, AIProvider>> = {
  openai: openaiProvider,
  gemini: geminiProvider,
  grok: grokProvider
};

export type ModuleId = "brief" | "landing" | "funnel" | "ads" | "video" | "pitch" | "images";

// Preference chains per module. First available provider wins.
export const ROUTING: Record<ModuleId, ProviderId[]> = {
  brief:   ["gemini", "openai", "grok"],
  landing: ["openai", "gemini", "grok"],
  funnel:  ["openai", "gemini", "grok"],
  ads:     ["grok", "openai", "gemini"],
  video:   ["grok", "openai", "gemini"],
  pitch:   ["gemini", "openai", "grok"],  // Slides JSON, rendered by /presentacion/[id]
  images:  ["openai"]
};

function hasKey(id: ProviderId): boolean {
  switch (id) {
    case "openai": return !!process.env.OPENAI_API_KEY;
    case "gemini": return !!process.env.GEMINI_API_KEY;
    case "grok":   return !!(process.env.XAI_API_KEY ?? process.env.GROK_API_KEY);
    default:       return false;
  }
}

async function tryChain<T>(
  chain: ProviderId[],
  capability: "chat" | "image" | "slides",
  call: (p: AIProvider) => Promise<T>
): Promise<T> {
  const errors: string[] = [];
  for (const id of chain) {
    const p = providers[id];
    if (!p || !p.supports[capability]) continue;
    if (!hasKey(id)) {
      errors.push(`${id}: no api key`);
      continue;
    }
    try {
      return await call(p);
    } catch (err) {
      errors.push((err as Error).message);
      continue;
    }
  }
  throw new Error(`all_providers_failed: ${errors.join(" | ")}`);
}

/* ---------- Public router API ---------- */

export async function chatForModule(module: ModuleId, input: ChatInput): Promise<ChatOutput> {
  return tryChain(ROUTING[module], "chat", (p) => p.chat!(input));
}

export async function imageForModule(input: ImageInput): Promise<ImageOutput> {
  return tryChain(ROUTING.images, "image", (p) => p.image!(input));
}

export async function slidesForModule(input: SlidesInput): Promise<SlidesOutput> {
  return tryChain(ROUTING.pitch, "slides", (p) => p.slides!(input)).catch(async () => {
    // If no slides-capable provider worked (e.g. no Gamma key), fall back to
    // chat-based slide JSON via the next-best chat provider.
    const chat = await chatForModule("pitch", {
      system: "Return a JSON object {slides: [{title, body: string[]}]} with 10 slides.",
      user: `Topic: ${input.topic}. Audience: ${input.audience ?? "general"}. Tone: ${input.tone ?? "professional"}. Language: ${input.language ?? "es"}.`,
      json: true,
      maxTokens: 1600
    });
    const parsed = chat.content as { slides?: { title: string; body: string[] }[] };
    return { provider: chat.provider, slides: parsed?.slides ?? [] };
  });
}

export { ProviderError };
export type { AIProvider, ChatInput, ChatOutput, ImageInput, ImageOutput, SlidesInput, SlidesOutput, ProviderId };
