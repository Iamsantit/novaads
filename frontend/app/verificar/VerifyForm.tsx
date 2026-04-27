"use client";

import { useRef, useState, useTransition } from "react";
import { verifyAction } from "./actions";

export default function VerifyForm() {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, start] = useTransition();

  function updateDigit(i: number, raw: string) {
    // Accept paste of full code in any single box
    if (raw.length > 1) {
      const cleaned = raw.replace(/\D/g, "").slice(0, 6 - i);
      const next = [...digits];
      for (let k = 0; k < cleaned.length; k++) next[i + k] = cleaned[k];
      setDigits(next);
      const focusIdx = Math.min(i + cleaned.length, 5);
      refs.current[focusIdx]?.focus();
      maybeSubmit(next);
      return;
    }
    const v = raw.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
    maybeSubmit(next);
  }

  function maybeSubmit(next: string[]) {
    if (next.every((d) => d.length === 1)) {
      start(() => {
        formRef.current?.requestSubmit();
      });
    }
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
  }

  const code = digits.join("");

  return (
    <form ref={formRef} action={verifyAction} className="space-y-4">
      <input type="hidden" name="code" value={code} />

      <div className="flex justify-center gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={d}
            onChange={(e) => updateDigit(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
            className={`h-14 w-11 rounded-xl border-2 bg-white text-center font-display text-2xl font-bold text-navy-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 ${
              d ? "border-cyan-400" : "border-navy-900/10"
            }`}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={pending || code.length !== 6}
        className="btn-primary w-full justify-center disabled:opacity-50"
      >
        {pending ? "Verificando..." : "Verificar y entrar →"}
      </button>
    </form>
  );
}
