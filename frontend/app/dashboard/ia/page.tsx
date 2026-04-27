"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Wand2, Layout, GitBranch, Megaphone,
  ImageIcon, Film, Presentation, CheckCircle2,
  Loader2, AlertCircle, ArrowLeft, Copy, Download,
  Eye, ShoppingBag, BookOpen, Rocket
} from "lucide-react";
import Link from "next/link";
import { savePreview, newPreviewId, type PageType } from "@/lib/preview-store";
import { exportAsHtml } from "@/lib/html-export";
import { savePresentation, normalizeSlides, newPresentationId } from "@/lib/presentation-store";

type Module = "landing" | "funnel" | "ads" | "images" | "video" | "pitch";

const PAGE_TYPES: { id: PageType; label: string; icon: any; desc: string }[] = [
  { id: "landing",   label: "Landing",   icon: Layout,       desc: "Página de venta enfocada en conversión" },
  { id: "ecommerce", label: "Ecommerce", icon: ShoppingBag,  desc: "Tienda online con productos y carrito" },
  { id: "blog",      label: "Blog",      icon: BookOpen,     desc: "Publicaciones, newsletter y SEO" },
  { id: "saas",      label: "SaaS",      icon: Rocket,       desc: "App con features, pricing y docs" }
];

const MODULE_META: Record<string, { icon: any; label: string; color: string }> = {
  landing: { icon: Layout, label: "Página web", color: "from-violet-400 to-violet-600" },
  funnel:  { icon: GitBranch, label: "Embudo de venta", color: "from-pink-400 to-rose-500" },
  ads:     { icon: Megaphone, label: "Anuncios", color: "from-orange-400 to-amber-500" },
  images:  { icon: ImageIcon, label: "Imágenes", color: "from-cyan-400 to-teal-500" },
  video:   { icon: Film, label: "Video", color: "from-rose-400 to-pink-600" },
  pitch:   { icon: Presentation, label: "Presentación", color: "from-emerald-400 to-green-600" }
};

type ModuleState = "idle" | "loading" | "done" | "error";

type Results = Partial<Record<string, { state: ModuleState; data?: unknown; error?: string }>>;

function IAStudio() {
  const params = useSearchParams();
  const rawModule = params.get("module") ?? "all";
  const isAll = rawModule === "all";
  const activeModules: string[] = isAll
    ? ["landing", "funnel", "ads", "images", "video", "pitch"]
    : [rawModule];

  const [prompt, setPrompt] = useState("");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Results>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [locale] = useState("es-ES");
  const [pageType, setPageType] = useState<PageType>("landing");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function openPreview(module: string) {
    const data = results[module]?.data as any;
    if (!data) return;
    const id = newPreviewId();
    savePreview({
      id,
      type: pageType,
      prompt,
      createdAt: Date.now(),
      data
    });
    window.open(`/preview/${id}`, "_blank");
  }

  function openEditor(module: string) {
    const data = results[module]?.data as any;
    if (!data) return;
    const id = newPreviewId();
    savePreview({
      id,
      type: pageType,
      prompt,
      createdAt: Date.now(),
      data
    });
    window.open(`/dashboard/editor/${id}`, "_blank");
  }

  function openPresentation(module: string) {
    const data = results[module]?.data;
    if (!data) return;
    const slides = normalizeSlides(data);
    if (!slides.length) {
      alert("La presentación generada no tiene slides válidas. Vuelve a generar.");
      return;
    }
    const id = newPresentationId();
    savePresentation({
      id,
      prompt,
      createdAt: Date.now(),
      slides,
      brand: { name: "NovaAds", accent: "#1cc5e7" }
    });
    window.open(`/presentacion/${id}`, "_blank");
  }

  function exportHtml(module: string) {
    const data = results[module]?.data as any;
    if (!data) return;
    const html = exportAsHtml({
      id: newPreviewId(),
      type: pageType,
      prompt,
      createdAt: Date.now(),
      data
    });
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `novaads-${pageType}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const currentMeta = isAll
    ? { icon: Sparkles, label: "Todo-en-uno", color: "from-cyan-400 to-navy-700" }
    : MODULE_META[rawModule] ?? MODULE_META.landing;

  async function generate() {
    if (!prompt.trim() || running) return;
    setRunning(true);

    const init: Results = {};
    activeModules.forEach((m) => (init[m] = { state: "loading" }));
    setResults(init);
    setSelected(null);

    try {
      const res = await fetch("/api/generate-mock", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt, modules: activeModules, locale })
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";

        for (const line of lines) {
          if (line.startsWith("event: ")) {
            const evName = line.slice(7).trim();
            const dataLine = lines[lines.indexOf(line) + 1] ?? "";
            const json = dataLine.startsWith("data: ") ? dataLine.slice(6) : "";
            try {
              const payload = JSON.parse(json);
              if (evName === "module_done") {
                setResults((prev) => ({
                  ...prev,
                  [payload.module]: { state: "done", data: payload.payload }
                }));
              }
              if (evName === "module_error") {
                setResults((prev) => ({
                  ...prev,
                  [payload.module]: { state: "error", error: payload.error }
                }));
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      // Demo/offline mode: simulate results after delay
      await simulateOffline(activeModules, setResults);
    } finally {
      setRunning(false);
    }
  }

  const anyDone = Object.values(results).some((r) => r?.state === "done");

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Back + title */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-gray-300">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${currentMeta.color}`}>
          <currentMeta.icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold text-gray-900">{currentMeta.label}</h1>
          <p className="text-xs text-gray-400">
            {isAll ? "6 módulos en paralelo" : "1 módulo especializado"} · gpt-4o-mini / Gemini / Grok
          </p>
        </div>
      </div>

      {/* Page-type selector (only relevant when generating landing/all) */}
      {(isAll || rawModule === "landing") && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-gray-700">¿Qué tipo de página quieres?</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PAGE_TYPES.map((t) => {
              const active = pageType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setPageType(t.id)}
                  className={`flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition ${
                    active
                      ? "border-cyan-400 bg-cyan-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${active ? "bg-cyan-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                    <t.icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{t.label}</p>
                  <p className="text-[11px] leading-tight text-gray-500">{t.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Prompt box */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          ¿Qué quieres vender o lanzar?
        </label>
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && e.metaKey && generate()}
          rows={3}
          placeholder={`Ejemplo: "Quiero vender ropa deportiva premium para mujeres. Ticket promedio $80 USD."`}
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-gray-400">⌘ + Enter para generar · {prompt.length}/2000</p>
          <button
            onClick={generate}
            disabled={!prompt.trim() || running}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-navy-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {running ? "Generando…" : "Generar"}
          </button>
        </div>
      </div>

      {/* Module status grid */}
      {Object.keys(results).length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activeModules.map((m) => {
            const meta = MODULE_META[m];
            const r = results[m];
            const state = r?.state ?? "idle";
            return (
              <motion.button
                key={m}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => state === "done" && setSelected(m === selected ? null : m)}
                className={`group relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  selected === m
                    ? "border-cyan-400 bg-cyan-50 shadow-md"
                    : state === "done"
                    ? "cursor-pointer border-gray-200 bg-white hover:border-cyan-300 hover:shadow-sm"
                    : "cursor-default border-gray-100 bg-gray-50"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta?.color ?? "from-gray-300 to-gray-400"}`}>
                  {meta && <meta.icon className="h-5 w-5 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{meta?.label ?? m}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {state === "loading" && "Generando…"}
                    {state === "done" && "Listo · clic para ver"}
                    {state === "error" && r?.error}
                    {state === "idle" && "En espera"}
                  </p>
                </div>
                <div className="shrink-0">
                  {state === "loading" && <Loader2 className="h-5 w-5 animate-spin text-cyan-500" />}
                  {state === "done" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                  {state === "error" && <AlertCircle className="h-5 w-5 text-red-400" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Result viewer */}
      <AnimatePresence>
        {selected && results[selected]?.state === "done" && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <p className="font-display font-bold text-gray-900">{MODULE_META[selected]?.label}</p>
              <div className="flex flex-wrap gap-2">
                {selected === "landing" && (
                  <>
                    <button
                      onClick={() => openEditor(selected)}
                      className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-3 py-1.5 text-xs font-bold text-navy-950 shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:scale-[1.03]"
                    >
                      <Wand2 className="h-3.5 w-3.5" /> Editar como Wix
                    </button>
                    <button
                      onClick={() => openPreview(selected)}
                      className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-navy-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:scale-[1.02]"
                    >
                      <Eye className="h-3.5 w-3.5" /> Vista previa
                    </button>
                    <button
                      onClick={() => exportHtml(selected)}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-300"
                    >
                      <Download className="h-3.5 w-3.5" /> Exportar HTML
                    </button>
                  </>
                )}
                {selected === "pitch" && (
                  <button
                    onClick={() => openPresentation(selected)}
                    className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-navy-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:scale-[1.02]"
                  >
                    <Eye className="h-3.5 w-3.5" /> Ver presentación
                  </button>
                )}
                <button
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(results[selected]?.data, null, 2))}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-300"
                >
                  <Copy className="h-3.5 w-3.5" /> Copiar JSON
                </button>
              </div>
            </div>
            <ResultViewer module={selected} data={results[selected]?.data} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Result display ---------- */
function ResultViewer({ module, data }: { module: string; data: unknown }) {
  if (!data) return null;
  const d = data as any;

  if (module === "landing") return (
    <div className="space-y-4 p-5">
      {d.hero && <Section title="Hero" items={[d.hero.headline, d.hero.subheadline, `CTA: ${d.hero.cta}`]} />}
      {d.benefits?.length && <Section title="Beneficios" items={d.benefits.map((b: any) => `${b.title}: ${b.body}`)} />}
      {d.faq?.length && <Section title="FAQ" items={d.faq.map((f: any) => `Q: ${f.q}`)} />}
    </div>
  );

  if (module === "ads") return (
    <div className="space-y-4 p-5">
      {d.angles?.map((a: any, i: number) => (
        <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Ángulo {i + 1} · {a.name}</p>
          <p className="mt-2 font-semibold text-gray-900">"{a.hook}"</p>
          <p className="mt-1 text-sm text-gray-600">{a.body}</p>
          <p className="mt-2 text-xs font-semibold text-cyan-600">CTA: {a.cta}</p>
        </div>
      ))}
    </div>
  );

  if (module === "images") return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {(d.images ?? []).map((url: string, i: number) => (
        <img key={i} src={url} alt={`Creative ${i + 1}`} className="w-full rounded-xl object-cover shadow-sm" />
      ))}
    </div>
  );

  if (module === "pitch" && d.url) return (
    <div className="p-5">
      <iframe src={d.url} className="h-[480px] w-full rounded-xl border border-gray-200" title="Pitch deck" />
    </div>
  );

  // Generic JSON fallback
  return (
    <pre className="overflow-auto p-5 text-xs text-gray-700">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">{title}</p>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className="text-sm text-gray-700">{it}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Offline simulation for demo without backend ---------- */
async function simulateOffline(
  modules: string[],
  setResults: React.Dispatch<React.SetStateAction<Results>>
) {
  for (const m of modules) {
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));
    setResults((prev) => ({
      ...prev,
      [m]: {
        state: "done",
        data: DEMO_DATA[m] ?? { message: "Módulo generado correctamente" }
      }
    }));
  }
}

const DEMO_DATA: Record<string, unknown> = {
  landing: {
    hero: {
      headline: "Ropa deportiva que te hace sentir invencible",
      subheadline: "Diseñada para mujeres que van a por todo. Calidad premium desde $80 USD.",
      cta: "Ver colección"
    },
    benefits: [
      { title: "Tejido técnico 4D-Stretch", body: "Se adapta a tu cuerpo sin restricciones." },
      { title: "Secado ultra-rápido", body: "Absorbe el sudor y se seca en minutos." },
      { title: "Estilo que trasciende el gym", body: "De la clase de yoga a la calle sin cambiarte." }
    ],
    faq: [
      { q: "¿Cuánto tarda el envío?", a: "3-5 días hábiles a toda Latinoamérica." },
      { q: "¿Tienen devoluciones gratuitas?", a: "Sí, 30 días sin preguntas." }
    ]
  },
  ads: {
    angles: [
      { name: "Dolor", hook: "¿Harta de ropa que no aguanta ni 3 lavadas?", body: "Diseñamos para durar. Probado en más de 200 entrenamientos.", cta: "Ver la diferencia" },
      { name: "Aspiración", hook: "Entrena como profesional aunque estés empezando", body: "La ropa correcta cambia tu mindset. Y tus resultados.", cta: "Quiero ese cambio" },
      { name: "Social proof", hook: "12,000 mujeres ya cambiaron su ropa de gym", body: "Únete al movimiento. Calidad que se nota desde la primera puesta.", cta: "Unirme ahora" }
    ]
  },
  video: {
    script_45s: {
      hook: "¿Y si te dijera que la ropa que llevas al gym está frenando tus resultados?",
      body: "La ropa técnica de calidad mejora tu rango de movimiento, regula tu temperatura y te hace sentir que puedes con todo. Luna Activewear lo entendió desde el primer día.",
      cta: "Pruébala 30 días. Te garantizamos que no querrás volver a tu ropa anterior."
    },
    storyboard: [
      { scene: 1, visual: "Mujer entrenando con ropa genérica, cara de incomodidad", voiceover: "¿Y si te dijera que la ropa que llevas al gym…", seconds: 5 },
      { scene: 2, visual: "Close-up de tela estirándose y sudor evaporándose", voiceover: "La ropa técnica de calidad mejora tu rango…", seconds: 15 },
      { scene: 3, visual: "Mujer sonriendo, confiada, saliendo del gym a la calle", voiceover: "Pruébala 30 días.", seconds: 5 }
    ]
  }
};

export default function IAPage() {
  return (
    <Suspense fallback={<div className="flex items-center gap-2 text-gray-400"><Loader2 className="animate-spin h-5 w-5" /> Cargando…</div>}>
      <IAStudio />
    </Suspense>
  );
}
