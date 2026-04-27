"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { loadPreview, type PreviewPayload, type PageType } from "@/lib/preview-store";
import LandingTemplate from "@/components/preview/LandingTemplate";
import EcommerceTemplate from "@/components/preview/EcommerceTemplate";
import BlogTemplate from "@/components/preview/BlogTemplate";
import SaasTemplate from "@/components/preview/SaasTemplate";
import PreviewToolbar from "@/components/preview/PreviewToolbar";
import { Loader2 } from "lucide-react";

export default function PreviewPage() {
  const params = useParams<{ id: string }>();
  const [payload, setPayload] = useState<PreviewPayload | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const p = loadPreview(params.id);
    if (p) setPayload(p);
    else setNotFound(true);
  }, [params.id]);

  if (notFound) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 text-center">
        <div>
          <p className="font-display text-2xl font-bold text-navy-900">Preview no encontrado</p>
          <p className="mt-2 text-gray-600">Este enlace expiró o fue limpiado del navegador.</p>
          <a href="/dashboard/ia" className="mt-6 inline-block rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-white">
            Generar una nueva
          </a>
        </div>
      </main>
    );
  }

  if (!payload) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" /> Cargando preview…
        </div>
      </main>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
      <PreviewToolbar payload={payload} />
      {renderTemplate(payload.type, payload)}
    </motion.div>
  );
}

function renderTemplate(type: PageType, p: PreviewPayload) {
  switch (type) {
    case "ecommerce":
      return <EcommerceTemplate data={p.data} />;
    case "blog":
      return <BlogTemplate data={p.data} />;
    case "saas":
      return <SaasTemplate data={p.data} />;
    case "landing":
    default:
      return <LandingTemplate data={p.data} />;
  }
}
