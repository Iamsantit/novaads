"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Download, Link as LinkIcon, ArrowLeft, Code2, Eye, Monitor, Smartphone, Tablet, Wand2 } from "lucide-react";
import { exportAsHtml } from "@/lib/html-export";
import type { PreviewPayload } from "@/lib/preview-store";

type Device = "desktop" | "tablet" | "mobile";

export default function PreviewToolbar({ payload }: { payload: PreviewPayload }) {
  const [copied, setCopied] = useState(false);
  const [device, setDevice] = useState<Device>("desktop");

  function download() {
    const html = exportAsHtml(payload);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${payload.type}-${payload.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function share() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-navy-900/10 bg-white/90 px-3 py-2 shadow-[0_10px_40px_-12px_rgba(11,30,63,0.35)] backdrop-blur"
      >
        <a
          href="/dashboard/ia"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-navy-700 hover:bg-gray-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Editor
        </a>
        <span className="h-5 w-px bg-gray-200" />
        <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-700">
          {payload.type}
        </span>
        <span className="h-5 w-px bg-gray-200" />

        {/* Device preview (decorative) */}
        <div className="flex items-center gap-0.5 rounded-full bg-gray-100 p-0.5">
          {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
            const Icon = d === "desktop" ? Monitor : d === "tablet" ? Tablet : Smartphone;
            return (
              <button
                key={d}
                onClick={() => setDevice(d)}
                className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
                  device === d ? "bg-white shadow-sm text-navy-900" : "text-gray-500 hover:text-navy-700"
                }`}
                aria-label={d}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            );
          })}
        </div>

        <span className="h-5 w-px bg-gray-200" />

        <button
          onClick={share}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-navy-700 hover:bg-gray-100"
        >
          <LinkIcon className="h-3.5 w-3.5" />
          {copied ? "¡Copiado!" : "Compartir"}
        </button>
        <a
          href={`/dashboard/editor/${payload.id}`}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-1.5 text-xs font-bold text-navy-950 shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:scale-[1.03]"
        >
          <Wand2 className="h-3.5 w-3.5" /> Editar
        </a>
        <button
          onClick={download}
          className="flex items-center gap-1.5 rounded-full bg-white text-navy-900 px-4 py-1.5 text-xs font-semibold shadow-sm hover:scale-[1.03]"
        >
          <Download className="h-3.5 w-3.5" /> Exportar HTML
        </button>
      </motion.div>

      {/* Device frame */}
      <AnimatePresence>
        {device !== "desktop" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-30 bg-gray-100"
          />
        )}
      </AnimatePresence>
      {device !== "desktop" && (
        <style jsx global>{`
          main {
            position: relative;
            z-index: 31;
            max-width: ${device === "tablet" ? "820px" : "400px"};
            margin: 96px auto 40px;
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 40px 80px -20px rgba(11, 30, 63, 0.3);
          }
        `}</style>
      )}
    </>
  );
}
