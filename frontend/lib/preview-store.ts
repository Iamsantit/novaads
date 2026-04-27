/**
 * Client-side store for generated previews. Lives in localStorage so /preview
 * can read it from a new tab without a round-trip to the backend.
 */

export type PageType = "landing" | "ecommerce" | "blog" | "saas";

export type PreviewPayload = {
  id: string;
  type: PageType;
  prompt: string;
  createdAt: number;
  // landing-like payload coming from the orchestrator
  data: {
    hero?: { headline: string; subheadline?: string; cta?: string };
    offer?: { title: string; body: string };
    benefits?: { title: string; body: string }[];
    features?: { title: string; body: string }[];
    products?: { name: string; price: string; desc: string; img?: string }[];
    posts?: { title: string; excerpt: string; date?: string }[];
    social_proof?: { name: string; quote: string }[];
    faq?: { q: string; a: string }[];
    final_cta?: { headline: string; button: string };
    brand?: { name?: string; accent?: string };
  };
};

const KEY = (id: string) => `novaads_preview_${id}`;

export function savePreview(p: PreviewPayload) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY(p.id), JSON.stringify(p));
}

export function loadPreview(id: string): PreviewPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY(id));
    return raw ? (JSON.parse(raw) as PreviewPayload) : null;
  } catch {
    return null;
  }
}

export function newPreviewId(): string {
  return Math.random().toString(36).slice(2, 10);
}
