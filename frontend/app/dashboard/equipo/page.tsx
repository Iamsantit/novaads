"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Users, Mail, MoreHorizontal, Crown, Shield, Eye, X, Send } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

type Role = "Owner" | "Admin" | "Editor" | "Viewer";

const MEMBERS: { name: string; email: string; role: Role; avatar: string; status: "Activo" | "Pendiente" }[] = [
  { name: "Santiago Trujillo", email: "santi@example.com", role: "Owner", avatar: "S", status: "Activo" },
  { name: "Carla Méndez", email: "carla@example.com", role: "Admin", avatar: "C", status: "Activo" },
  { name: "Diego Ruiz", email: "diego@example.com", role: "Editor", avatar: "D", status: "Activo" },
  { name: "Ana López", email: "ana@example.com", role: "Viewer", avatar: "A", status: "Pendiente" }
];

const ROLE_TONE: Record<Role, string> = {
  Owner: "bg-amber-50 text-amber-700",
  Admin: "bg-violet-50 text-violet-700",
  Editor: "bg-cyan-50 text-cyan-700",
  Viewer: "bg-gray-100 text-gray-700"
};

const ROLE_ICON: Record<Role, any> = {
  Owner: Crown,
  Admin: Shield,
  Editor: Users,
  Viewer: Eye
};

export default function EquipoPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Editor");

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        icon={Users}
        chip="Equipo"
        title="Tu equipo de trabajo"
        subtitle="Invita colaboradores, asigna roles y gestiona quién puede generar y publicar."
        tone="from-violet-400 to-pink-600"
        actions={
          <button
            onClick={() => setInviteOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-navy-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:scale-[1.02]"
          >
            <Mail className="h-4 w-4" /> Invitar
          </button>
        }
      />

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-[1.5fr_120px_120px_60px] gap-4 border-b border-gray-100 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
          <span>Miembro</span>
          <span>Rol</span>
          <span>Estado</span>
          <span></span>
        </div>
        {MEMBERS.map((m, i) => {
          const Icon = ROLE_ICON[m.role];
          return (
            <motion.div
              key={m.email}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="grid grid-cols-[1.5fr_120px_120px_60px] items-center gap-4 border-b border-gray-100 px-5 py-4 last:border-0 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-navy-600 font-bold text-white">
                  {m.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.email}</p>
                </div>
              </div>
              <span className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${ROLE_TONE[m.role]}`}>
                <Icon className="h-3 w-3" /> {m.role}
              </span>
              <span className={`text-xs font-semibold ${m.status === "Activo" ? "text-emerald-600" : "text-amber-600"}`}>
                {m.status === "Pendiente" ? "● Pendiente" : "● Activo"}
              </span>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Plan limit */}
      <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-5 text-center">
        <p className="text-sm text-gray-700">
          Plan <strong>Pro</strong> · {MEMBERS.length} de 5 miembros
        </p>
        <a href="/#pricing" className="mt-2 inline-block text-xs font-semibold text-cyan-600 hover:underline">
          Sube a Premium para hasta 50 miembros →
        </a>
      </div>

      {/* Invite modal */}
      {inviteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/50 p-4 backdrop-blur-sm"
          onClick={() => setInviteOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-gray-900">Invitar al equipo</h3>
              <button onClick={() => setInviteOpen(false)} className="rounded-full p-1 text-gray-400 hover:bg-gray-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Email</span>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="amigo@empresa.com"
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Rol</span>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {(["Admin", "Editor", "Viewer"] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setInviteRole(r)}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                      inviteRole === r ? "border-cyan-400 bg-cyan-50 text-cyan-700" : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </label>

            <button
              onClick={() => {
                alert(`Invitación enviada a ${inviteEmail} (rol: ${inviteRole}) — demo`);
                setInviteOpen(false);
                setInviteEmail("");
              }}
              disabled={!inviteEmail.includes("@")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-navy-700 py-3 text-sm font-semibold text-white shadow-sm hover:scale-[1.02] disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> Enviar invitación
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
