/**
 * Client-side store for generated presentations (slide decks).
 * Mirrors the preview-store pattern so /presentacion/[id] can read from
 * another tab without a round-trip to the backend.
 */

export type Slide = {
  title: string;
  bullets?: string[];
  body?: string;
  image?: string; // optional image URL
};

export type PresentationPayload = {
  id: string;
  prompt: string;
  createdAt: number;
  brand?: { name?: string; accent?: string };
  slides: Slide[];
};

const KEY = (id: string) => `novaads_presentation_${id}`;

export function savePresentation(p: PresentationPayload) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY(p.id), JSON.stringify(p));
}

export function loadPresentation(id: string): PresentationPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY(id));
    return raw ? (JSON.parse(raw) as PresentationPayload) : null;
  } catch {
    return null;
  }
}

export function newPresentationId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Normalises different JSON shapes (from Gemini, OpenAI, Grok, legacy Gamma
 * fallback, etc.) into a flat array of Slide objects.
 */
export function normalizeSlides(raw: unknown): Slide[] {
  if (!raw || typeof raw !== "object") return [];
  const r = raw as any;

  // Shape A: { slides: [{ title, body: string[] }] }  (our orchestrator)
  if (Array.isArray(r.slides)) {
    return r.slides.map((s: any) => ({
      title: String(s.title ?? ""),
      bullets: Array.isArray(s.body) ? s.body.map(String) :
               Array.isArray(s.bullets) ? s.bullets.map(String) : [],
      body: typeof s.body === "string" ? s.body : undefined,
      image: s.image
    }));
  }

  // Shape B: { slides: { n, title, bullets } }
  if (r.slides && typeof r.slides === "object") {
    return Object.values(r.slides).map((s: any) => ({
      title: String(s.title ?? ""),
      bullets: Array.isArray(s.bullets) ? s.bullets.map(String) : []
    }));
  }

  return [];
}
