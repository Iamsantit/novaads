"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-following radial glow. Mount inside any relatively-positioned
 * section to give it a subtle interactive spotlight.
 */
export default function Spotlight({ color = "rgba(28,197,231,0.35)" }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${color}, transparent 40%)`;
    };
    const parent = el.parentElement;
    parent?.addEventListener("mousemove", onMove);
    return () => parent?.removeEventListener("mousemove", onMove);
  }, [color]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 [:hover>&]:opacity-100"
      style={{ transition: "background 80ms linear, opacity 300ms" }}
    />
  );
}
