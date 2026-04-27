import Logo from "./Logo";
import { Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const cols = [
  {
    title: "Producto",
    links: [
      ["Funciones", "#features"],
      ["Cómo funciona", "#how"],
      ["Precios", "#pricing"],
      ["Roadmap", "#"]
    ]
  },
  {
    title: "Empresa",
    links: [
      ["Sobre nosotros", "#"],
      ["Blog", "#"],
      ["Clientes", "#"],
      ["Contacto", "#"]
    ]
  },
  {
    title: "Legal",
    links: [
      ["Términos", "#"],
      ["Privacidad", "#"],
      ["Cookies", "#"],
      ["Soporte", "#"]
    ]
  }
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/6 bg-space-950">
      {/* Space grid subtle */}
      <div className="absolute inset-0 -z-10 bg-space-grid [background-size:60px_60px] opacity-15" />
      {/* Top neon line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-white/45">
              NovaAds genera tu landing, funnel, campaña, imágenes, video y pitch con IA.
              Un prompt, todo tu stack de marketing.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Instagram, Youtube, Linkedin].map((Ic, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-neon-cyan/40 hover:text-neon-cyan hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]"
                >
                  <Ic className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <p className="font-display text-sm font-semibold text-white/80">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([l, h]) => (
                  <li key={l}>
                    <a
                      href={h}
                      className="text-sm text-white/40 transition-colors hover:text-neon-cyan"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-6 text-sm text-white/30 md:flex-row">
          <p>© {new Date().getFullYear()} NovaAds. Hecho con IA y mucho café.</p>
          <p>Pagos seguros con Stripe · SSL · Cumplimiento GDPR</p>
        </div>
      </div>
    </footer>
  );
}
