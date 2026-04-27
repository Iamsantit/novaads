import type { Metadata } from "next";
import AccedeAhoraClient from "./client";

export const metadata: Metadata = {
  title: "Accede ahora — NovaAds",
  description:
    "Activa tu prueba de 14 días y empieza a generar landings, funnels, ads e imágenes con un solo prompt. Cancela cuando quieras.",
  robots: { index: false, follow: true }
};

export default function AccedeAhoraPage() {
  return <AccedeAhoraClient />;
}
