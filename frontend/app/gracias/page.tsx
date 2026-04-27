import Link from "next/link";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function GraciasPage({
  searchParams
}: {
  searchParams: { session_id?: string };
}) {
  let email: string | null = null;
  let plan: string | null = null;

  if (stripe && searchParams.session_id) {
    try {
      const s = await stripe.checkout.sessions.retrieve(searchParams.session_id);
      email = s.customer_details?.email ?? null;
      plan = (s.metadata?.plan as string) ?? null;
    } catch {
      /* ignore */
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-700 text-white">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/20 ring-4 ring-cyan-300/50">
          <svg className="h-10 w-10 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display text-4xl font-bold sm:text-5xl">¡Bienvenido a NovaAds!</h1>
        <p className="mt-4 max-w-md text-lg text-white/80">
          Tu prueba gratuita de 14 días ya está activa
          {plan && <> · Plan <span className="font-semibold text-cyan-300 capitalize">{plan}</span></>}.
          {email && (
            <>
              {" "}Te enviamos un correo a <span className="text-cyan-300">{email}</span> con los siguientes pasos.
            </>
          )}
        </p>

        <div className="mt-10 grid w-full gap-3 sm:grid-cols-2">
          <Link
            href="/"
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur hover:bg-white/20"
          >
            Volver a la home
          </Link>
          <Link
            href="/#features"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-navy-300 px-6 py-3 font-semibold text-navy-900 hover:scale-[1.02]"
          >
            Crear mi primera campaña →
          </Link>
        </div>

        <p className="mt-12 text-xs text-white/50">
          Puedes cancelar en un clic desde el portal de facturación antes de que termine la prueba.
        </p>
      </div>
    </main>
  );
}
