import type { AIProvider, ChatInput, ChatOutput } from "./types";
import { ProviderError, safeJson } from "./types";

/**
 * Google Gemini provider.
 * Uses the REST endpoint so we don't need the SDK (keeps deps slim).
 * Docs: https://ai.google.dev/gemini-api/docs/rest
 *
 * Default model: gemini-1.5-flash (fast, very cheap, 1M token context).
 * Bump to gemini-1.5-pro for harder reasoning tasks.
 */

const API_KEY = process.env.GEMINI_API_KEY;

export const geminiProvider: AIProvider = {
  id: "gemini",
  supports: { chat: true, image: false, slides: false },

  async chat(input: ChatInput): Promise<ChatOutput> {
    if (!API_KEY) throw new ProviderError("gemini", "GEMINI_API_KEY not set");

    const model = "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

    const body = {
      contents: [
        { role: "user", parts: [{ text: `${input.system}\n\n${input.user}` }] }
      ],
      generationConfig: {
        temperature: input.temperature ?? 0.7,
        maxOutputTokens: input.maxTokens ?? 1400,
        ...(input.json ? { responseMimeType: "application/json" } : {})
      }
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(`HTTP ${res.status}: ${detail.slice(0, 200)}`);
      }
      const j = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
        usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number };
      };
      const text = j.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      return {
        provider: "gemini",
        model,
        content: input.json ? safeJson(text) ?? { raw: text } : text,
        raw: text,
        tokens: {
          input: j.usageMetadata?.promptTokenCount ?? 0,
          output: j.usageMetadata?.candidatesTokenCount ?? 0
        }
      };
    } catch (err) {
      throw new ProviderError("gemini", (err as Error).message);
    }
  }
};
