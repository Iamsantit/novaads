import { redirect } from "next/navigation";
import Link from "next/link";
import { getDevHintCode, getPending } from "@/lib/verification";
import VerifyForm from "./VerifyForm";

export default function VerificarPage({
  searchParams
}: {
  searchParams: { err?: string; resent?: string };
}) {
  const pending = getPending();
  if (!pending) redirect("/registro?err=expired");

  const masked = maskEmail(pending.email);
  const devCode = getDevHintCode();
  const emailFailed = !pending.emailSent;

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-mesh" />
      <div className="absolute inset-0 -z-10 bg-grid-light [background-size:48px_48px] opacity-40" />

      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6 py-8">
        <div className="gradient-border w-full p-2">
          <div className="rounded-[1.4rem] bg-white p-8 text-center shadow-card">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-navy-600 text-white shadow-glow">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold text-navy-900">
              {emailFailed ? "Usa tu código de acceso" : "Revisa tu correo"}
            </h1>
            <p className="mt-2 text-sm text-navy-600">
              {emailFailed ? (
                <>Hubo un problema enviando el email a <span className="font-semibold">{masked}</span>. Puedes usar el código de abajo para continuar.</>
              ) : (
                <>Enviamos un código de 6 dígitos a <br /><span className="font-semibold text-navy-900">{masked}</span></>
              )}
            </p>

            {/* Dev code panel — only visible if email didn't send OR we're in dev */}
            {devCode && (
              <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  {emailFailed ? "⚠️ Código de acceso directo" : "🔧 Modo desarrollo"}
                </p>
                <p className="mt-1 text-xs text-amber-900/80">
                  {emailFailed
                    ? "Copia este código y pégalo abajo:"
                    : "Tu código (sólo visible porque estás en desarrollo):"}
                </p>
                <p className="mt-2 select-all rounded-lg bg-white px-3 py-2 text-center font-mono text-2xl font-bold tracking-[0.4em] text-navy-900">
                  {devCode}
                </p>
                {pending.emailError && (
                  <details className="mt-2 text-[11px] text-amber-900/70">
                    <summary className="cursor-pointer font-semibold">Ver error del email</summary>
                    <pre className="mt-1 whitespace-pre-wrap break-all rounded bg-white/60 p-2">{pending.emailError}</pre>
                  </details>
                )}
              </div>
            )}

            {searchParams.resent && (
              <p className="mt-4 rounded-lg bg-cyan-50 px-3 py-2 text-xs text-cyan-700">
                Nuevo código generado.
              </p>
            )}
            {searchParams.err === "invalid" && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                Código incorrecto. Intenta de nuevo.
              </p>
            )}
            {searchParams.err === "format" && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                Debes escribir los 6 dígitos.
              </p>
            )}

            <div className="mt-6">
              <VerifyForm />
            </div>

            <p className="mt-6 text-xs text-navy-600">
              ¿No te llegó? <ResendLink />
            </p>
            <p className="mt-2 text-xs text-navy-500">
              ¿Email equivocado?{" "}
              <Link href="/registro" className="font-semibold text-cyan-600 hover:underline">
                Volver al registro
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function ResendLink() {
  return (
    <form action="/verificar/resend" method="post" className="inline">
      <button type="submit" className="font-semibold text-cyan-600 hover:underline">
        Reenviar código
      </button>
    </form>
  );
}

function maskEmail(email: string): string {
  const [u, d] = email.split("@");
  if (!u || !d) return email;
  const safe = u.length <= 2 ? u[0] + "*" : u[0] + "*".repeat(Math.max(1, u.length - 2)) + u.slice(-1);
  return `${safe}@${d}`;
}
