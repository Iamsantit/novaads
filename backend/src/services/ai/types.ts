/**
 * Unified contract every AI provider must implement.
 * Keeps the orchestrator provider-agnostic so we can swap models per-module
 * based on cost, speed, quality, or API quota.
 */

export type ProviderId = "openai" | "gemini" | "grok" | "gamma";

export type ChatInput = {
  system: string;
  user: string;
  json?: boolean;       // coerce response to JSON when the provider supports it
  maxTokens?: number;
  temperature?: number;
};

export type ChatOutput = {
  provider: ProviderId;
  model: string;
  content: unknown;     // parsed JSON if json:true, else string
  raw?: string;
  tokens?: { input: number; output: number };
};

export type ImageInput = {
  prompt: string;
  size?: "1024x1024" | "1792x1024" | "1024x1792";
};

export type ImageOutput = {
  provider: ProviderId;
  url: string;
};

export type SlidesInput = {
  topic: string;
  audience?: string;
  tone?: string;
  slides?: number;          // desired slide count
  language?: string;        // e.g. "es", "en"
};

export type SlidesOutput = {
  provider: ProviderId;
  url?: string;             // hosted deck URL when the provider returns one (Gamma)
  slides: { title: string; body: string[] }[];
};

export interface AIProvider {
  id: ProviderId;
  supports: {
    chat: boolean;
    image: boolean;
    slides: boolean;
  };
  chat?(input: ChatInput): Promise<ChatOutput>;
  image?(input: ImageInput): Promise<ImageOutput>;
  slides?(input: SlidesInput): Promise<SlidesOutput>;
}

export class ProviderError extends Error {
  constructor(public providerId: ProviderId, message: string) {
    super(`[${providerId}] ${message}`);
  }
}

export function safeJson<T = unknown>(s: string): T | null {
  try {
    return JSON.parse(s) as T;
  } catch {
    // strip fenced ```json blocks common in Gemini/Grok responses
    const fenced = s.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenced) {
      try {
        return JSON.parse(fenced[1]) as T;
      } catch {}
    }
    return null;
  }
}
