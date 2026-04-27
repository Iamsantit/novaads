import type { AIProvider, SlidesInput, SlidesOutput, ChatInput, ChatOutput } from "./types";
import { ProviderError } from "./types";

/**
 * Gamma provider — generates presentations (pitch decks, slide decks) as a
 * fully-hosted, editable deck. Docs: https://developers.gamma.app/
 *
 * Gamma offers the `generate` endpoint that returns a deck URL you can embed
 * or share with investors. For chat fallback we don't implement it (use another
 * provider). Falls back gracefully to a local slide JSON when the API key is
 * missing, so the orchestrator never breaks.
 */

const API_KEY = process.env.GAMMA_API_KEY;
const BASE = "https://public-api.gamma.app/v0.2";

export const gammaProvider: AIProvider = {
  id: "gamma",
  supports: { chat: false, image: false, slides: true },

  async slides(input: SlidesInput): Promise<SlidesOutput> {
    const desiredSlides = input.slides ?? 10;

    if (!API_KEY) {
      // Offline-friendly fallback so dev works without a Gamma key
      return {
        provider: "gamma",
        slides: placeholderSlides(input.topic, desiredSlides)
      };
    }

    try {
      const res = await fetch(`${BASE}/generations`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": API_KEY
        },
        body: JSON.stringify({
          inputText: input.topic,
          textMode: "generate",
          format: "presentation",
          themeName: "Default",
          numCards: desiredSlides,
          textOptions: {
            amount: "medium",
            tone: input.tone ?? "professional",
            audience: input.audience ?? "general business audience",
            language: input.language ?? "es"
          },
          cardSplit: "auto"
        })
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(`HTTP ${res.status}: ${detail.slice(0, 200)}`);
      }
      const j = (await res.json()) as { generationId?: string; gammaUrl?: string };

      return {
        provider: "gamma",
        url: j.gammaUrl,
        slides: [] // Gamma hosts the actual deck; URL is the primary output
      };
    } catch (err) {
      throw new ProviderError("gamma", (err as Error).message);
    }
  },

  // Gamma doesn't do generic chat — expose a stub that throws so the router
  // falls through to the next provider.
  async chat(_input: ChatInput): Promise<ChatOutput> {
    throw new ProviderError("gamma", "chat not supported by Gamma");
  }
};

function placeholderSlides(topic: string, n: number) {
  const titles = [
    "Problema", "Solución", "Mercado", "Producto", "Tracción",
    "Modelo de negocio", "Go-to-Market", "Competencia", "Equipo", "Ask"
  ];
  return Array.from({ length: n }).map((_, i) => ({
    title: titles[i] ?? `Slide ${i + 1}`,
    body: [
      `Contexto clave sobre ${topic}`,
      "Datos, cifras o insights relevantes",
      "Conclusión accionable"
    ]
  }));
}
