"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { loadPresentation, type PresentationPayload } from "@/lib/presentation-store";
import SlidesPlayer from "@/components/presentation/SlidesPlayer";

export default function PresentacionPage() {
  const params = useParams<{ id: string }>();
  const [payload, setPayload] = useState<PresentationPayload | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const p = loadPresentation(params.id);
    if (p && p.slides.length > 0) setPayload(p);
    else setNotFound(true);
  }, [params.id]);

  if (notFound) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-navy-950 text-center text-white">
        <div>
          <p className="font-display text-2xl font-bold">Presentación no encontrada</p>
          <p className="mt-2 text-white/60">El enlace expiró o no se generó correctamente.</p>
          <a href="/dashboard/ia?module=pitch" className="mt-6 inline-block rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold">
            Generar una nueva
          </a>
        </div>
      </main>
    );
  }

  if (!payload) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-navy-950 text-white/60">
        <Loader2 className="h-5 w-5 animate-spin" />
      </main>
    );
  }

  return <SlidesPlayer payload={payload} />;
}
