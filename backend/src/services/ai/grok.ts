import type { AIProvider, ChatInput, ChatOutput } from "./types";
import { ProviderError, safeJson } from "./types";

/**
 * xAI Grok provider.
 * API is OpenAI-compatible: https://docs.x.ai/docs/overview
 * Endpoint: https://api.x.ai/v1/chat/completions
 *
 * Default model: grok-2-latest. Good for copy with personality / edgier hooks.
 */

const API_KEY = process.env.XAI_API_KEY ?? process.env.GROK_API_KEY;
const BASE = "https://api.x.ai/v1";

export const grokProvider: AIProvider = {
  id: "grok",
  supports: { chat: true, image: false, slides: false },

  async chat(input: ChatInput): Promise<ChatOutput> {
    if (!API_KEY) throw new ProviderError("grok", "XAI_API_KEY not set");

    const model = "grok-2-latest";
    try {
      const res = await fetch(`${BASE}/chat/completions`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model,
          temperature: input.temperature ?? 0.8,
          max_tokens: input.maxTokens ?? 1400,
          response_format: input.json ? { type: "json_object" } : undefined,
          messages: [
            { role: "system", content: input.system },
            { role: "user", content: input.user }
          ]
        })
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(`HTTP ${res.status}: ${detail.slice(0, 200)}`);
      }
      const j = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
        usage?: { prompt_tokens?: number; completion_tokens?: number };
      };
      const text = j.choices?.[0]?.message?.content ?? "";

      return {
        provider: "grok",
        model,
        content: input.json ? safeJson(text) ?? { raw: text } : text,
        raw: text,
        tokens: {
          input: j.usage?.prompt_tokens ?? 0,
          output: j.usage?.completion_tokens ?? 0
        }
      };
    } catch (err) {
      throw new ProviderError("grok", (err as Error).message);
    }
  }
};
