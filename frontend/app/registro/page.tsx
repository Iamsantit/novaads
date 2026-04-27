import Link from "next/link";
import AuthShell, { AuthInput } from "@/components/AuthShell";
import { signupAction } from "./actions";

export default function RegistroPage({
  searchParams
}: {
  searchParams: { err?: string; plan?: string };
}) {
  return (
    <AuthShell
      title="Crea tu cuenta"
      subtitle="14 días gratis. Sin permanencia. Cancela en un clic."
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/iniciar-sesion" className="font-semibold text-cyan-600 hover:underline">
            Iniciar sesión
          </Link>
        </>
      }
    >
      <form action={signupAction} className="space-y-4">
        {searchParams.err && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Revisa tus datos: email válido y contraseña de al menos 6 caracteres.
          </p>
        )}
        <AuthInput label="Nombre" name="name" autoComplete="name" />
        <AuthInput label="Email" name="email" type="email" autoComplete="email" />
        <AuthInput label="Contraseña" name="password" type="password" autoComplete="new-password" />
        {searchParams.plan && <input type="hidden" name="plan" value={searchParams.plan} />}
        <button type="submit" className="btn-primary w-full justify-center">
          Empezar gratis 14 días →
        </button>
        <p className="text-center text-xs text-navy-500">
          Al registrarte aceptas los Términos y la Política de Privacidad.
        </p>
      </form>
    </AuthShell>
  );
}
