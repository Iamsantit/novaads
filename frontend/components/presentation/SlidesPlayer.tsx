"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft, ChevronRight, Maximize, Minimize,
  Download, ArrowLeft, Share2, Grid3x3
} from "lucide-react";
import type { PresentationPayload } from "@/lib/presentation-store";

type Props = { payload: PresentationPayload };

export default function SlidesPlayer({ payload }: Props) {
  const { slides, brand } = payload;
  const [idx, setIdx] = useState(0);
  const [fs, setFs] = useState(false);
  const [overview, setOverview] = useState(false);
  const [copied, setCopied] = useState(false);
  const accent = brand?.accent ?? "#1cc5e7";
  const name = brand?.name ?? "NovaAds";

  const total = slides.length;

  const go = useCallback((delta: number) => {
    setIdx((i) => Math.max(0, Math.min(total - 1, i + delta)));
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Home") setIdx(0);
      if (e.key === "End") setIdx(total - 1);
      if (e.key === "Escape") setOverview(false);
      if (e.key.toLowerCase() === "f") toggleFs();
      if (e.key.toLowerCase() === "o") setOverview((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total]);

  async function toggleFs() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setFs(true);
      } else {
        await document.exitFullscreen();
        setFs(false);
      }
    } catch {}
  }

  function printPdf() {
    // Browser's native "Save as PDF" uses the print stylesheet below so each
    // slide becomes a single page cleanly.
    window.print();
  }

  function share() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const current = slides[idx];

  return (
    <main className="relative min-h-screen bg-navy-950 text-white" style={{ ["--accent" as any]: accent }}>
      {/* Toolbar — hidden when printing */}
      <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-navy-900/80 px-3 py-2 shadow-xl backdrop-blur print:hidden">
        <a
          href="/dashboard/ia"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Editor
        </a>
        <span className="h-5 w-px bg-white/10" />
        <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
          Slide {idx + 1} / {total}
        </span>
        <span className="h-5 w-px bg-white/10" />
        <button
          onClick={() => setOverview((v) => !v)}
          className={`flex h-7 w-7 items-center justify-center rounded-full ${overview ? "bg-white text-navy-900" : "text-white/70 hover:bg-white/10"}`}
          title="Vista general (O)"
        >
          <Grid3x3 className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={toggleFs}
          className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 hover:bg-white/10"
          title="Pantalla completa (F)"
        >
          {fs ? <Minimize className="h-3.5 w-3.5" /> : <Maximize className="h-3.5 w-3.5" />}
        </button>
        <button
          onClick={share}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
        >
          <Share2 className="h-3.5 w-3.5" /> {copied ? "¡Copiado!" : "Compartir"}
        </button>
        <button
          onClick={printPdf}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-navy-500 px-4 py-1.5 text-xs font-semibold text-white shadow hover:scale-[1.03]"
        >
          <Download className="h-3.5 w-3.5" /> Exportar PDF
        </button>
      </div>

      {/* Overview (grid) */}
      <AnimatePresence>
        {overview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-navy-950/95 p-8 backdrop-blur print:hidden"
            onClick={() => setOverview(false)}
          >
            <div className="mx-auto mt-16 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdx(i);
                    setOverview(false);
                  }}
                  className={`aspect-video rounded-xl border-2 bg-white p-4 text-left text-navy-900 transition hover:scale-[1.02] ${
                    i === idx ? "border-cyan-400 shadow-[0_0_30px_-5px_rgba(28,197,231,0.6)]" : "border-transparent"
                  }`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Slide {i + 1}
                  </p>
                  <p className="mt-2 font-display text-sm font-bold line-clamp-2">{s.title}</p>
                  <ul className="mt-2 space-y-0.5 text-[10px] text-gray-600 line-clamp-4">
                    {(s.bullets ?? []).slice(0, 3).map((b, k) => (
                      <li key={k}>• {b}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active slide */}
      <AnimatePresence mode="wait">
        <motion.section
          key={idx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
          className="slide relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-8"
        >
          <div className="w-full">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
              <span className="h-px w-8 bg-cyan-300" />
              {name} · Slide {idx + 1}
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl">
              {current?.title}
            </h1>

            {current?.body && (
              <p className="mt-6 max-w-3xl text-xl text-white/80 sm:text-2xl">
                {current.body}
              </p>
            )}

            {current?.bullets && current.bullets.length > 0 && (
              <ul className="mt-10 space-y-5 text-xl text-white/90 sm:text-2xl">
                {current.bullets.map((b, i) => (
                  <motion.li
                    key={b + i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <span
                      className="mt-3 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            {current?.image && (
              <img
                src={current.image}
                alt=""
                className="mt-10 max-h-[40vh] rounded-2xl shadow-2xl"
              />
            )}
          </div>

          {/* Slide accent bar at the bottom */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1"
            style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
          />
        </motion.section>
      </AnimatePresence>

      {/* Nav arrows — hidden when printing */}
      <button
        onClick={() => go(-1)}
        disabled={idx === 0}
        className="fixed left-4 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur transition hover:bg-white/15 disabled:opacity-30 print:hidden"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => go(1)}
        disabled={idx === total - 1}
        className="fixed right-4 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur transition hover:bg-white/15 disabled:opacity-30 print:hidden"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-navy-900/60 px-3 py-2 backdrop-blur print:hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all ${
              i === idx ? "w-6 bg-cyan-400" : "w-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Print-only: render ALL slides, one per page */}
      <div className="hidden print:block">
        {slides.map((s, i) => (
          <div key={i} className="print-slide">
            <div className="print-ornament" style={{ background: accent }} />
            <p className="print-meta">{name} · Slide {i + 1} / {total}</p>
            <h1 className="print-title">{s.title}</h1>
            {s.body && <p className="print-body">{s.body}</p>}
            {s.bullets && s.bullets.length > 0 && (
              <ul className="print-bullets">
                {s.bullets.map((b, k) => (
                  <li key={k}>
                    <span className="print-dot" style={{ background: accent }} /> {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @media print {
          @page { size: 297mm 167mm; margin: 0; }
          html, body { background: #0b1e3f !important; }
          .slide, button, nav { display: none !important; }
          .print-slide {
            page-break-after: always;
            height: 167mm;
            width: 297mm;
            padding: 28mm 32mm;
            background: #0b1e3f;
            color: #fff;
            position: relative;
            box-sizing: border-box;
            font-family: Inter, system-ui, sans-serif;
          }
          .print-slide:last-child { page-break-after: auto; }
          .print-ornament {
            position: absolute; left: 0; top: 0; bottom: 0; width: 6mm;
          }
          .print-meta {
            font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase;
            color: #4edcff; margin: 0 0 8mm 0;
          }
          .print-title {
            font-family: Sora, Inter, sans-serif;
            font-size: 34pt; font-weight: 800; line-height: 1.1;
            margin: 0 0 10mm 0; max-width: 230mm;
          }
          .print-body {
            font-size: 16pt; color: rgba(255,255,255,0.8);
            max-width: 220mm; margin: 0 0 10mm 0;
          }
          .print-bullets { list-style: none; padding: 0; margin: 0; }
          .print-bullets li {
            font-size: 14pt; line-height: 1.5; margin-bottom: 5mm;
            display: flex; gap: 6mm; align-items: flex-start;
          }
          .print-dot {
            display: inline-block; width: 3mm; height: 3mm;
            border-radius: 50%; margin-top: 5mm; flex-shrink: 0;
          }
        }
      `}</style>
    </main>
  );
}
