"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Eye, Save, Globe, Plus, Trash2, ChevronUp, ChevronDown,
  Loader2, Sparkles, Image as ImageIcon, Layout, Star, MessageCircleQuestion, Megaphone
} from "lucide-react";
import { loadPreview, savePreview, type PreviewPayload } from "@/lib/preview-store";
import LandingTemplate from "@/components/preview/LandingTemplate";
import EcommerceTemplate from "@/components/preview/EcommerceTemplate";
import BlogTemplate from "@/components/preview/BlogTemplate";
import SaasTemplate from "@/components/preview/SaasTemplate";
import PublishModal from "@/components/editor/PublishModal";

type SectionId = "hero" | "offer" | "benefits" | "social_proof" | "faq" | "final_cta" | "products" | "features";

const SECTION_META: Record<SectionId, { label: string; icon: any }> = {
  hero:         { label: "Hero",            icon: Layout },
  offer:        { label: "Oferta",          icon: Sparkles },
  benefits:     { label: "Beneficios",      icon: Star },
  features:     { label: "Features",        icon: Star },
  products:     { label: "Productos",       icon: ImageIcon },
  social_proof: { label: "Testimonios",     icon: Megaphone },
  faq:          { label: "FAQ",             icon: MessageCircleQuestion },
  final_cta:    { label: "CTA final",       icon: Sparkles }
};

export default function EditorClient({ id }: { id: string }) {
  const router = useRouter();
  const [payload, setPayload] = useState<PreviewPayload | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [selected, setSelected] = useState<SectionId>("hero");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [publishOpen, setPublishOpen] = useState(false);
  const [savedHint, setSavedHint] = useState(false);

  // Load
  useEffect(() => {
    const p = loadPreview(id);
    if (p) setPayload(p);
    else setNotFound(true);
  }, [id]);

  // Auto-save on every change (debounced via savedHint flash)
  useEffect(() => {
    if (!payload) return;
    savePreview(payload);
    setSavedHint(true);
    const t = setTimeout(() => setSavedHint(false), 1200);
    return () => clearTimeout(t);
  }, [payload]);

  if (notFound) {
    return (
      <div className="flex h-screen items-center justify-center bg-space-900 text-white">
        <div className="text-center">
          <p className="font-display text-2xl font-bold">No se encontró el proyecto</p>
          <p className="mt-2 text-white/60">Genera una nueva página y abre el editor desde ahí.</p>
          <a href="/dashboard/ia" className="mt-6 inline-block rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-navy-950">
            Crear nueva
          </a>
        </div>
      </div>
    );
  }

  if (!payload) {
    return (
      <div className="flex h-screen items-center justify-center bg-space-900 text-white/60">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Abriendo editor…
      </div>
    );
  }

  /* ---------- Mutators ---------- */

  function patch<K extends keyof PreviewPayload["data"]>(key: K, value: PreviewPayload["data"][K]) {
    setPayload((p) => (p ? { ...p, data: { ...p.data, [key]: value } } : p));
  }

  function patchHero(field: "headline" | "subheadline" | "cta", value: string) {
    setPayload((p) => p ? { ...p, data: { ...p.data, hero: { ...(p.data.hero ?? { headline: "" }), [field]: value } } } : p);
  }

  function patchBrand(field: "name" | "accent", value: string) {
    setPayload((p) => p ? { ...p, data: { ...p.data, brand: { ...(p.data.brand ?? {}), [field]: value } } } : p);
  }

  function addBenefit() {
    if (!payload) return;
    const cur = payload.data.benefits ?? [];
    patch("benefits", [...cur, { title: "Nuevo beneficio", body: "Descripción corta." }]);
  }
  function updateBenefit(i: number, field: "title" | "body", value: string) {
    if (!payload) return;
    const cur = [...(payload.data.benefits ?? [])];
    cur[i] = { ...cur[i], [field]: value };
    patch("benefits", cur);
  }
  function removeBenefit(i: number) {
    if (!payload) return;
    const cur = [...(payload.data.benefits ?? [])];
    cur.splice(i, 1);
    patch("benefits", cur);
  }
  function moveBenefit(i: number, dir: -1 | 1) {
    if (!payload) return;
    const cur = [...(payload.data.benefits ?? [])];
    const target = i + dir;
    if (target < 0 || target >= cur.length) return;
    [cur[i], cur[target]] = [cur[target], cur[i]];
    patch("benefits", cur);
  }

  function addFaq() {
    if (!payload) return;
    const cur = payload.data.faq ?? [];
    patch("faq", [...cur, { q: "Nueva pregunta", a: "Respuesta." }]);
  }
  function updateFaq(i: number, field: "q" | "a", value: string) {
    if (!payload) return;
    const cur = [...(payload.data.faq ?? [])];
    cur[i] = { ...cur[i], [field]: value };
    patch("faq", cur);
  }
  function removeFaq(i: number) {
    if (!payload) return;
    const cur = [...(payload.data.faq ?? [])];
    cur.splice(i, 1);
    patch("faq", cur);
  }

  /* ---------- Render ---------- */

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-space-900 text-white">
      {/* Toolbar */}
      <header className="flex h-14 items-center justify-between border-b border-white/10 bg-space-950 px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/dashboard/ia")} className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/5 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Editor</span>
          <span className="text-sm font-semibold">{payload.data.brand?.name ?? "Mi proyecto"}</span>
          <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            {payload.type}
          </span>
          {savedHint && <span className="ml-2 text-[11px] text-emerald-400">✓ Guardado</span>}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 rounded-lg bg-white/5 p-0.5">
            <button onClick={() => setDevice("desktop")} className={`rounded-md px-3 py-1 text-xs ${device === "desktop" ? "bg-white text-navy-900" : "text-white/60"}`}>Desktop</button>
            <button onClick={() => setDevice("mobile")} className={`rounded-md px-3 py-1 text-xs ${device === "mobile" ? "bg-white text-navy-900" : "text-white/60"}`}>Móvil</button>
          </div>
          <a
            href={`/preview/${id}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:border-white/20"
          >
            <Eye className="h-3.5 w-3.5" /> Vista previa
          </a>
          <button
            onClick={() => setPublishOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-1.5 text-xs font-bold text-navy-950 shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:scale-[1.03]"
          >
            <Globe className="h-3.5 w-3.5" /> Publicar
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: section list */}
        <aside className="w-60 shrink-0 overflow-y-auto border-r border-white/10 bg-space-950 p-3">
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-white/40">Secciones</p>
          <div className="space-y-0.5">
            {(Object.keys(SECTION_META) as SectionId[])
              .filter((s) => sectionExists(payload.data, s))
              .map((s) => {
                const Icon = SECTION_META[s].icon;
                const active = selected === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSelected(s)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                      active
                        ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {SECTION_META[s].label}
                  </button>
                );
              })}
          </div>

          <p className="mb-2 mt-6 px-2 text-[10px] font-bold uppercase tracking-widest text-white/40">Marca</p>
          <div className="space-y-2 px-2">
            <label className="block">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Nombre</span>
              <input
                value={payload.data.brand?.name ?? ""}
                onChange={(e) => patchBrand("name", e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-space-800 px-2 py-1.5 text-xs outline-none focus:border-cyan-400/40"
              />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Color acento</span>
              <div className="mt-1 flex gap-2">
                <input
                  type="color"
                  value={payload.data.brand?.accent ?? "#1cc5e7"}
                  onChange={(e) => patchBrand("accent", e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded-md border border-white/10 bg-transparent"
                />
                <input
                  value={payload.data.brand?.accent ?? "#1cc5e7"}
                  onChange={(e) => patchBrand("accent", e.target.value)}
                  className="flex-1 rounded-md border border-white/10 bg-space-800 px-2 py-1.5 font-mono text-xs outline-none focus:border-cyan-400/40"
                />
              </div>
            </label>
          </div>
        </aside>

        {/* Center: live canvas */}
        <main className="relative flex-1 overflow-y-auto bg-space-grid [background-size:60px_60px]">
          <div className={`mx-auto my-6 origin-top overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl ${device === "mobile" ? "max-w-[420px]" : "max-w-full"}`}>
            <LiveTemplate payload={payload} />
          </div>
        </main>

        {/* Right: property panel */}
        <aside className="w-80 shrink-0 overflow-y-auto border-l border-white/10 bg-space-950 p-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
            Propiedades · {SECTION_META[selected].label}
          </p>

          {selected === "hero" && (
            <div className="space-y-3">
              <Field label="Titular">
                <textarea
                  rows={3}
                  value={payload.data.hero?.headline ?? ""}
                  onChange={(e) => patchHero("headline", e.target.value)}
                />
              </Field>
              <Field label="Subtítulo">
                <textarea
                  rows={3}
                  value={payload.data.hero?.subheadline ?? ""}
                  onChange={(e) => patchHero("subheadline", e.target.value)}
                />
              </Field>
              <Field label="Texto del botón (CTA)">
                <input
                  value={payload.data.hero?.cta ?? ""}
                  onChange={(e) => patchHero("cta", e.target.value)}
                />
              </Field>
            </div>
          )}

          {selected === "offer" && payload.data.offer && (
            <div className="space-y-3">
              <Field label="Título">
                <input
                  value={payload.data.offer.title}
                  onChange={(e) => patch("offer", { ...payload.data.offer!, title: e.target.value })}
                />
              </Field>
              <Field label="Cuerpo">
                <textarea
                  rows={4}
                  value={payload.data.offer.body}
                  onChange={(e) => patch("offer", { ...payload.data.offer!, body: e.target.value })}
                />
              </Field>
            </div>
          )}

          {selected === "benefits" && (
            <div className="space-y-3">
              {(payload.data.benefits ?? []).map((b, i) => (
                <div key={i} className="rounded-lg border border-white/8 bg-space-800/60 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">#{i + 1}</span>
                    <div className="flex gap-1">
                      <IconBtn onClick={() => moveBenefit(i, -1)}><ChevronUp className="h-3 w-3" /></IconBtn>
                      <IconBtn onClick={() => moveBenefit(i, 1)}><ChevronDown className="h-3 w-3" /></IconBtn>
                      <IconBtn onClick={() => removeBenefit(i)} danger><Trash2 className="h-3 w-3" /></IconBtn>
                    </div>
                  </div>
                  <Field label="Título">
                    <input value={b.title} onChange={(e) => updateBenefit(i, "title", e.target.value)} />
                  </Field>
                  <div className="mt-2" />
                  <Field label="Cuerpo">
                    <textarea rows={2} value={b.body} onChange={(e) => updateBenefit(i, "body", e.target.value)} />
                  </Field>
                </div>
              ))}
              <button
                onClick={addBenefit}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 py-2 text-xs font-semibold text-white/60 hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <Plus className="h-3.5 w-3.5" /> Añadir beneficio
              </button>
            </div>
          )}

          {selected === "faq" && (
            <div className="space-y-3">
              {(payload.data.faq ?? []).map((f, i) => (
                <div key={i} className="rounded-lg border border-white/8 bg-space-800/60 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">#{i + 1}</span>
                    <IconBtn onClick={() => removeFaq(i)} danger><Trash2 className="h-3 w-3" /></IconBtn>
                  </div>
                  <Field label="Pregunta">
                    <input value={f.q} onChange={(e) => updateFaq(i, "q", e.target.value)} />
                  </Field>
                  <div className="mt-2" />
                  <Field label="Respuesta">
                    <textarea rows={3} value={f.a} onChange={(e) => updateFaq(i, "a", e.target.value)} />
                  </Field>
                </div>
              ))}
              <button onClick={addFaq} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 py-2 text-xs font-semibold text-white/60 hover:border-cyan-400/40 hover:text-cyan-300">
                <Plus className="h-3.5 w-3.5" /> Añadir pregunta
              </button>
            </div>
          )}

          {selected === "final_cta" && (
            <div className="space-y-3">
              <Field label="Titular del CTA">
                <input
                  value={payload.data.final_cta?.headline ?? ""}
                  onChange={(e) => patch("final_cta", { headline: e.target.value, button: payload.data.final_cta?.button ?? "Empezar" })}
                />
              </Field>
              <Field label="Texto del botón">
                <input
                  value={payload.data.final_cta?.button ?? ""}
                  onChange={(e) => patch("final_cta", { headline: payload.data.final_cta?.headline ?? "", button: e.target.value })}
                />
              </Field>
            </div>
          )}

          {(selected === "social_proof" || selected === "products" || selected === "features") && (
            <p className="text-xs text-white/50">
              Edita esta sección directamente en el JSON exportado, o regenera desde el prompt para iterar el contenido.
            </p>
          )}
        </aside>
      </div>

      {publishOpen && <PublishModal payload={payload} onClose={() => setPublishOpen(false)} />}
    </div>
  );
}

/* ---------- Helpers ---------- */

function sectionExists(data: PreviewPayload["data"], s: SectionId): boolean {
  if (s === "hero") return true;
  if (s === "offer") return !!data.offer;
  if (s === "benefits") return Array.isArray(data.benefits);
  if (s === "features") return Array.isArray(data.features);
  if (s === "products") return Array.isArray(data.products);
  if (s === "social_proof") return Array.isArray(data.social_proof) && (data.social_proof?.length ?? 0) > 0;
  if (s === "faq") return Array.isArray(data.faq);
  if (s === "final_cta") return !!data.final_cta;
  return false;
}

function LiveTemplate({ payload }: { payload: PreviewPayload }) {
  switch (payload.type) {
    case "ecommerce": return <EcommerceTemplate data={payload.data} />;
    case "blog":      return <BlogTemplate data={payload.data} />;
    case "saas":      return <SaasTemplate data={payload.data} />;
    case "landing":
    default:          return <LandingTemplate data={payload.data} />;
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">{label}</span>
      <div className="mt-1 [&>input]:w-full [&>input]:rounded-md [&>input]:border [&>input]:border-white/10 [&>input]:bg-space-800 [&>input]:px-2.5 [&>input]:py-2 [&>input]:text-xs [&>input]:text-white [&>input]:outline-none [&>input:focus]:border-cyan-400/40 [&>textarea]:w-full [&>textarea]:rounded-md [&>textarea]:border [&>textarea]:border-white/10 [&>textarea]:bg-space-800 [&>textarea]:px-2.5 [&>textarea]:py-2 [&>textarea]:text-xs [&>textarea]:text-white [&>textarea]:outline-none [&>textarea:focus]:border-cyan-400/40 [&>textarea]:resize-y">
        {children}
      </div>
    </label>
  );
}

function IconBtn({ children, onClick, danger }: { children: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-6 w-6 items-center justify-center rounded text-white/50 hover:bg-white/5 ${danger ? "hover:bg-red-500/20 hover:text-red-300" : "hover:text-white"}`}
    >
      {children}
    </button>
  );
}
