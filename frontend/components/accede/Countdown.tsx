"use client";

import { useEffect, useState } from "react";

type Props = { seconds?: number };

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/**
 * 24h fake-urgency countdown. Resets per-session via localStorage so it
 * doesn't "loop" while the visitor scrolls.
 */
export default function Countdown({ seconds = 24 * 60 * 60 }: Props) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const KEY = "na_cta_expires";
    const now = Date.now();
    const saved = Number(localStorage.getItem(KEY) ?? 0);
    const expires = saved && saved > now ? saved : now + seconds * 1000;
    if (!saved || saved <= now) localStorage.setItem(KEY, String(expires));

    const tick = () => setRemaining(Math.max(0, Math.floor((expires - Date.now()) / 1000)));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [seconds]);

  if (remaining === null) return null;

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <Unit label="h" value={pad(h)} />
      <span className="text-white/70">:</span>
      <Unit label="m" value={pad(m)} />
      <span className="text-white/70">:</span>
      <Unit label="s" value={pad(s)} />
    </div>
  );
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="rounded-md bg-white/15 px-2 py-0.5 font-semibold tabular-nums text-white">
        {value}
      </span>
      <span className="mt-0.5 text-[9px] uppercase tracking-wider text-white/70">{label}</span>
    </div>
  );
}
