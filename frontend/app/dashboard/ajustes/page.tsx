"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Settings, User, Bell, Globe, Shield, Save, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

type Section = "perfil" | "notificaciones" | "idioma" | "seguridad";

const SECTIONS: { id: Section; label: string; icon: any }[] = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
  { id: "idioma", label: "Idioma y región", icon: Globe },
  { id: "seguridad", label: "Seguridad", icon: Shield }
];

export default function AjustesPage() {
  const [section, setSection] = useState<Section>("perfil");

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        icon={Settings}
        chip="Ajustes"
        title="Tus preferencias"
        subtitle="Configura cuenta, notificaciones, idioma y seguridad."
        tone="from-gray-500 to-gray-800"
      />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Side nav */}
        <nav className="space-y-1">
          {SECTIONS.map((s) => {
            const active = section === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-cyan-50 to-navy-50 text-navy-700 ring-1 ring-cyan-200/60"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <s.icon className={`h-4 w-4 ${active ? "text-cyan-600" : "text-gray-400"}`} />
                {s.label}
              </button>
            );
          })}
        </nav>

        {/* Section content */}
        <motion.section
          key={section}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          {section === "perfil" && <PerfilSection />}
          {section === "notificaciones" && <NotifSection />}
          {section === "idioma" && <LangSection />}
          {section === "seguridad" && <SecuritySection />}
        </motion.section>
      </div>
    </div>
  );
}

function PerfilSection() {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-gray-900">Tu perfil</h2>
      <p className="mt-1 text-sm text-gray-500">Esta info aparece en tus exportaciones y en el equipo.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Nombre completo" defaultValue="Santiago Trujillo" />
        <Field label="Email" defaultValue="santi@example.com" type="email" />
        <Field label="Empresa" defaultValue="Mi Marca" />
        <Field label="Sitio web" defaultValue="https://mimarca.com" type="url" />
      </div>
      <SaveBar />
    </div>
  );
}

function NotifSection() {
  const items = [
    { id: "n1", label: "Avisos cuando termina una generación", desc: "Email + push", on: true },
    { id: "n2", label: "Resumen semanal de métricas", desc: "Cada lunes", on: true },
    { id: "n3", label: "Novedades de NovaAds", desc: "Nuevos modelos, features", on: false },
    { id: "n4", label: "Recordatorio antes de cobro", desc: "3 días antes del fin del trial", on: true }
  ];
  const [state, setState] = useState(items);
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-gray-900">Notificaciones</h2>
      <p className="mt-1 text-sm text-gray-500">Elige qué quieres recibir y cuándo.</p>
      <ul className="mt-6 space-y-3">
        {state.map((it, i) => (
          <li
            key={it.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
          >
            <div>
              <p className="font-semibold text-gray-900">{it.label}</p>
              <p className="text-xs text-gray-500">{it.desc}</p>
            </div>
            <button
              onClick={() => setState(state.map((x, k) => (k === i ? { ...x, on: !x.on } : x)))}
              className={`relative h-6 w-11 rounded-full transition ${it.on ? "bg-cyan-500" : "bg-gray-300"}`}
            >
              <motion.span
                animate={{ x: it.on ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
              />
            </button>
          </li>
        ))}
      </ul>
      <SaveBar />
    </div>
  );
}

function LangSection() {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-gray-900">Idioma y región</h2>
      <p className="mt-1 text-sm text-gray-500">Define el idioma por defecto de tus generaciones.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <SelectField label="Idioma" options={["Español (LatAm)", "Español (España)", "English (US)", "English (UK)", "Português (BR)", "Français"]} />
        <SelectField label="Zona horaria" options={["America/Bogotá", "America/México", "America/Santiago", "Europe/Madrid"]} />
        <SelectField label="Moneda" options={["USD", "MXN", "COP", "ARS", "EUR", "BRL"]} />
        <SelectField label="Formato de fecha" options={["DD/MM/AAAA", "MM/DD/AAAA", "AAAA-MM-DD"]} />
      </div>
      <SaveBar />
    </div>
  );
}

function SecuritySection() {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-gray-900">Seguridad</h2>
      <p className="mt-1 text-sm text-gray-500">Mantén tu cuenta protegida.</p>

      <div className="mt-6 space-y-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="font-semibold text-gray-900">Cambiar contraseña</p>
          <p className="text-xs text-gray-500">Mínimo 8 caracteres con un número y un símbolo.</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Field label="Contraseña actual" type="password" defaultValue="" />
            <Field label="Nueva contraseña" type="password" defaultValue="" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5">
          <div>
            <p className="font-semibold text-gray-900">Verificación en 2 pasos</p>
            <p className="text-xs text-gray-500">Añade una capa extra al iniciar sesión.</p>
          </div>
          <button className="rounded-full bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-white">
            Activar
          </button>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
            <div className="flex-1">
              <p className="font-semibold text-red-900">Eliminar cuenta</p>
              <p className="text-xs text-red-700">
                Esto borra tus proyectos y cancela tu suscripción. No se puede deshacer.
              </p>
            </div>
            <button className="rounded-full border border-red-300 bg-white px-4 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-100">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-100"
      />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
      <select className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-100">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function SaveBar() {
  return (
    <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
      <button className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
        Cancelar
      </button>
      <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-navy-700 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:scale-[1.02]">
        <Save className="h-4 w-4" /> Guardar cambios
      </button>
    </div>
  );
}
