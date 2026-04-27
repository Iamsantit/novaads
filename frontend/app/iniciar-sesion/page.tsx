import Link from "next/link";
import AuthShell, { AuthInput } from "@/components/AuthShell";
import { loginAction } from "../registro/actions";

export default function LoginPage({ searchParams }: { searchParams: { err?: string } }) {
  return (
    <AuthShell
      title="Bienvenido de vuelta"
      subtitle="Entra a tu studio y sigue creando."
      footer={
        <>
          ¿Primera vez aquí?{" "}
          <Link href="/registro" className="font-semibold text-cyan-600 hover:underline">
            Crear cuenta gratis
          </Link>
        </>
      }
    >
      <form action={loginAction} className="space-y-4">
        {searchParams.err && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Email o contraseña no válidos.
          </p>
        )}
        <AuthInput label="Email" name="email" type="email" autoComplete="email" />
        <AuthInput
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <div className="text-right text-sm">
          <a href="#" className="text-cyan-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button type="submit" className="btn-primary w-full justify-center">
          Iniciar sesión →
        </button>
      </form>
    </AuthShell>
  );
}
