import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovaAds — Crea tu negocio online con un solo prompt",
  description:
    "NovaAds genera en minutos tu landing, funnel completo, campaña publicitaria, imágenes, video y presentación con IA. Un prompt, todo tu stack de marketing.",
  metadataBase: new URL("https://novaads.ai"),
  openGraph: {
    title: "NovaAds — Un prompt, todo tu marketing",
    description:
      "Landing + funnel + ads + imágenes + video + pitch deck generados por IA.",
    type: "website"
  },
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-space-900 font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
