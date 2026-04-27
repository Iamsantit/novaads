"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, Upload, Sparkles, Wand2,
  Globe, ShoppingCart, FileText, Briefcase, Layout, Code2,
  Check, ExternalLink, Copy, Rocket, Zap, Edit3,
  Eye, Monitor, Smartphone, Image as ImageIcon, Star, Type,
} from "lucide-react";

const PAGE_TYPES = [
  { id: "landing", label: "Landing Page", icon: Globe, desc: "Convierte visitantes en clientes", color: "from-cyan-500 to-blue-600" },
  { id: "ecommerce", label: "Tienda Online", icon: ShoppingCart, desc: "Vende productos y servicios", color: "from-emerald-500 to-green-600" },
  { id: "portfolio", label: "Portfolio", icon: Layout, desc: "Muestra tu trabajo y proyectos", color: "from-violet-500 to-purple-600" },
  { id: "blog", label: "Blog", icon: FileText, desc: "Publica contenido y artículos", color: "from-amber-500 to-orange-600" },
  { id: "corporativa", label: "Corporativa", icon: Briefcase, desc: "Presencia profesional empresarial", color: "from-slate-500 to-gray-700" },
  { id: "app", label: "App Web", icon: Code2, desc: "Aplicación web interactiva", color: "from-pink-500 to-rose-600" },
];

const PALETTES = [
  { id: "space", label: "Space Dark", colors: ["#010208", "#00f5ff", "#a855f7"] },
  { id: "ocean", label: "Ocean Blue", colors: ["#0c1a2e", "#0ea5e9", "#38bdf8"] },
  { id: "forest", label: "Forest Green", colors: ["#0d1f0f", "#4ade80", "#86efac"] },
  { id: "sunset", label: "Sunset", colors: ["#1a0a00", "#f97316", "#fbbf24"] },
  { id: "rose", label: "Rose Gold", colors: ["#1a0814", "#f472b6", "#fb7185"] },
  { id: "gold", label: "Luxury Gold", colors: ["#0f0c00", "#facc15", "#fde68a"] },
];

const STYLES = [
  { id: "minimalista", label: "Minimalista", desc: "Limpio, elegante, mucho espacio blanco" },
  { id: "moderno", label: "Moderno", desc: "Gradientes, glassmorphism, tipografía bold" },
  { id: "creativo", label: "Creativo", desc: "Asimétrico, experimental, artístico" },
  { id: "corporativo", label: "Corporativo", desc: "Profesional, confiable, estructurado" },
  { id: "oscuro", label: "Dark Premium", desc: "Dark mode, neón, futurista" },
  { id: "vibrante", label: "Vibrante", desc: "Colores vivos, energético, juvenil" },
];

const FEATURES = [
  "Formulario de contacto",
  "Carrito de compras",
  "Blog / Noticias",
  "Testimonios / Reseñas",
  "Chat en vivo",
  "Galería de imágenes",
  "Mapa / Ubicación",
  "Video hero",
  "Precios / Planes",
  "FAQ",
  "Newsletter",
  "Redes sociales",
  "Búsqueda interna",
  "Cuenta de usuario",
  "Pagos online",
  "Multiidioma",
];

const AI_TOOLS = [
  { name: "Claude 3.5", task: "Generando estructura HTML/CSS/JS y contenido", color: "text-orange-400", icon: "🤖" },
  { name: "DALL·E 3", task: "Creando imágenes hero y banners principales", color: "text-emerald-400", icon: "🎨" },
  { name: "Flux.1", task: "Generando creatividades y fondos premium", color: "text-pink-400", icon: "✨" },
  { name: "Ideogram", task: "Diseñando logo y elementos tipográficos", color: "text-cyan-400", icon: "🖼️" },
  { name: "Gamma AI", task: "Optimizando layout, animaciones y UX", color: "text-violet-400", icon: "⚡" },
];

const VERCEL_STEPS = [
  {
    step: 1,
    title: "Crea tu cuenta en Vercel",
    desc: "Ve a vercel.com y regístrate gratis con tu cuenta de GitHub, GitLab o email.",
    link: "https://vercel.com/signup",
    linkLabel: "Abrir Vercel →",
    code: null,
  },
  {
    step: 2,
    title: "Instala Vercel CLI en tu computadora",
    desc: "Abre tu terminal (CMD, PowerShell o Terminal) y ejecuta:",
    link: null,
    linkLabel: null,
    code: "npm install -g vercel",
  },
  {
    step: 3,
    title: "Inicia sesión desde la terminal",
    desc: "Se abrirá el navegador para confirmar tu cuenta:",
    link: null,
    linkLabel: null,
    code: "vercel login",
  },
  {
    step: 4,
    title: "Descarga y descomprime tu proyecto",
    desc: "Haz clic en 'Descargar ZIP' arriba. Descomprime el archivo en tu escritorio o en una carpeta de proyectos.",
    link: null,
    linkLabel: null,
    code: null,
  },
  {
    step: 5,
    title: "Despliega con un solo comando",
    desc: "Entra a la carpeta del proyecto en tu terminal y ejecuta:",
    link: null,
    linkLabel: null,
    code: "cd mi-proyecto\nvercel --prod",
  },
  {
    step: 6,
    title: "¡Tu sitio está en vivo! 🎉",
    desc: "Vercel te dará una URL pública como tu-marca.vercel.app. Desde el dashboard de Vercel también puedes conectar tu dominio propio (.com, .mx, etc.) de forma gratuita.",
    link: "https://vercel.com/dashboard",
    linkLabel: "Ver mi dashboard de Vercel →",
    code: null,
  },
];

type FormState = {
  pageType: string | null;
  businessName: string;
  businessDesc: string;
  targetAudience: string;
  mainGoal: string;
  price: string;
  palette: string | null;
  style: string | null;
  logoOption: string;
  logoPrompt: string;
  imageOption: string;
  imagePrompt: string;
  features: string[];
};

const stepVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

export default function CrearPaginaPage() {
  const [step, setStep] = useState(0);
  const [generatingIdx, setGeneratingIdx] = useState(-1);
  const [generatingDone, setGeneratingDone] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    pageType: null,
    businessName: "",
    businessDesc: "",
    targetAudience: "",
    mainGoal: "",
    price: "",
    palette: "space",
    style: null,
    logoOption: "generate",
    logoPrompt: "",
    imageOption: "generate",
    imagePrompt: "",
    features: [],
  });

  function next() {
    if (step === 6) startGeneration();
    else setStep((s) => s + 1);
  }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  function toggleFeature(f: string) {
    setForm((p) => ({
      ...p,
      features: p.features.includes(f) ? p.features.filter((x) => x !== f) : [...p.features, f],
    }));
  }

  function startGeneration() {
    setStep(7);
    setGeneratingIdx(0);
    setGeneratingDone(false);
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setGeneratingIdx(idx);
      if (idx >= AI_TOOLS.length) {
        clearInterval(interval);
        setTimeout(() => setGeneratingDone(true), 900);
      }
    }, 1500);
  }

  function copyCode(code: string, id: string) {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  }

  const selectedPalette = PALETTES.find((p) => p.id === form.palette);
  const heroBg =
    form.palette === "ocean" ? "linear-gradient(135deg,#0c1a2e 0%,#0a2540 100%)" :
    form.palette === "forest" ? "linear-gradient(135deg,#0d1f0f 0%,#1a3320 100%)" :
    form.palette === "sunset" ? "linear-gradient(135deg,#1a0a00 0%,#2d1500 100%)" :
    form.palette === "rose" ? "linear-gradient(135deg,#1a0814 0%,#2d0f22 100%)" :
    form.palette === "gold" ? "linear-gradient(135deg,#0f0c00 0%,#1a1500 100%)" :
    "linear-gradient(135deg,#010208 0%,#0a0f1e 50%,#0d0522 100%)";

  const accentColor = selectedPalette?.colors[1] ?? "#00f5ff";

  // Progress: steps 0-6 shown in progress bar (step 7 = generating, 8 = preview, 9 = deploy)
  const progressPct = step <= 6 ? (step / 6) * 100 : 100;

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-20">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          href="/dashboard/paginas"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-neon-cyan"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a conectores
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 shadow-neon-cyan">
            <Wand2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Crear página web con IA</h1>
            {step < 7 && <p className="text-sm text-white/45">Paso {step + 1} de 7</p>}
            {step === 7 && <p className="text-sm text-white/45">Generando tu sitio...</p>}
            {step === 8 && <p className="text-sm text-white/45">Vista previa · Listo para publicar</p>}
            {step === 9 && <p className="text-sm text-white/45">Guía de publicación</p>}
          </div>
        </div>

        {step < 8 && (
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
            <motion.div
              animate={{ width: `${progressPct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-violet-400"
              style={{ boxShadow: "0 0 8px rgba(0,245,255,0.5)" }}
            />
          </div>
        )}
      </motion.div>

      {/* ─── Steps ──────────────────────────────────────────── */}
      <AnimatePresence mode="wait">

        {/* STEP 0: Tipo de página */}
        {step === 0 && (
          <motion.div key="s0" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white">¿Qué tipo de página necesitas?</h2>
              <p className="mt-1 text-sm text-white/50">Selecciona la categoría que mejor describe tu proyecto</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PAGE_TYPES.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setForm((p) => ({ ...p, pageType: pt.id }))}
                  className={`group relative rounded-2xl border p-5 text-left transition-all hover:-translate-y-1 ${
                    form.pageType === pt.id
                      ? "border-neon-cyan/50 bg-neon-cyan/10 shadow-[0_0_20px_rgba(0,245,255,0.12)]"
                      : "border-white/8 bg-space-800/60 hover:border-white/20"
                  }`}
                >
                  <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${pt.color}`}>
                    <pt.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="font-semibold text-white">{pt.label}</p>
                  <p className="mt-0.5 text-xs text-white/45">{pt.desc}</p>
                  {form.pageType === pt.id && (
                    <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-neon-cyan">
                      <Check className="h-3 w-3 text-space-950" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={next}
              disabled={!form.pageType}
              className="ml-auto flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-neon-cyan transition hover:scale-[1.03] disabled:opacity-40"
            >
              Siguiente <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* STEP 1: Tu negocio */}
        {step === 1 && (
          <motion.div key="s1" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Cuéntanos sobre tu negocio</h2>
              <p className="mt-1 text-sm text-white/50">Mientras más detalle, más personalizada será tu página</p>
            </div>
            <div className="space-y-4">
              {[
                { label: "Nombre de tu marca o negocio *", key: "businessName", placeholder: "Ej: FitStyle, Cafetería Luna, TechFlow..." },
                { label: "¿Qué vendes o qué ofreces? *", key: "businessDesc", placeholder: "Ej: Ropa deportiva premium para mujeres activas. Prendas de alta calidad con diseño moderno.", textarea: true },
                { label: "¿Cuál es tu público objetivo?", key: "targetAudience", placeholder: "Ej: Mujeres de 25-40 años, profesionales, nivel socioeconómico medio-alto..." },
                { label: "¿Cuál es el objetivo principal de la página?", key: "mainGoal", placeholder: "Ej: Generar ventas directas, capturar leads, mostrar portafolio...", textarea: true },
                { label: "Precio / Ticket promedio", key: "price", placeholder: "Ej: $80 USD, $1,200 MXN, desde $50..." },
              ].map(({ label, key, placeholder, textarea }) => (
                <div key={key}>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">{label}</label>
                  {textarea ? (
                    <textarea
                      rows={2}
                      value={(form as any)[key]}
                      onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full resize-none rounded-xl border border-white/10 bg-space-900/60 px-4 py-3 text-sm text-white placeholder-white/25 focus:border-neon-cyan/40 focus:outline-none focus:ring-2 focus:ring-neon-cyan/10"
                    />
                  ) : (
                    <input
                      value={(form as any)[key]}
                      onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full rounded-xl border border-white/10 bg-space-900/60 px-4 py-3 text-sm text-white placeholder-white/25 focus:border-neon-cyan/40 focus:outline-none focus:ring-2 focus:ring-neon-cyan/10"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={back} className="flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Atrás
              </button>
              <button
                onClick={next}
                disabled={!form.businessName || !form.businessDesc}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-neon-cyan transition hover:scale-[1.03] disabled:opacity-40"
              >
                Siguiente <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Estilo visual */}
        {step === 2 && (
          <motion.div key="s2" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Estilo visual</h2>
              <p className="mt-1 text-sm text-white/50">Define la identidad visual de tu página</p>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-white/70">Paleta de colores</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {PALETTES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setForm((f) => ({ ...f, palette: p.id }))}
                    className={`rounded-2xl border p-3 text-center transition-all ${
                      form.palette === p.id ? "border-neon-cyan/50 bg-neon-cyan/10" : "border-white/8 bg-space-800/60 hover:border-white/20"
                    }`}
                  >
                    <div className="mx-auto mb-2 flex justify-center gap-0.5">
                      {p.colors.map((c, i) => (
                        <div key={i} className="h-5 w-5 rounded-full" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <p className="text-[10px] font-medium text-white/60">{p.label}</p>
                    {form.palette === p.id && <Check className="mx-auto mt-1 h-3 w-3 text-neon-cyan" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-white/70">Estilo de diseño</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setForm((f) => ({ ...f, style: s.id }))}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      form.style === s.id ? "border-neon-cyan/50 bg-neon-cyan/10" : "border-white/8 bg-space-800/60 hover:border-white/20"
                    }`}
                  >
                    <p className="font-semibold text-white">{s.label}</p>
                    <p className="mt-0.5 text-xs text-white/45">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={back} className="flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Atrás
              </button>
              <button
                onClick={next}
                disabled={!form.style}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-neon-cyan transition hover:scale-[1.03] disabled:opacity-40"
              >
                Siguiente <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Logo */}
        {step === 3 && (
          <motion.div key="s3" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Logo de tu marca</h2>
              <p className="mt-1 text-sm text-white/50">Sube tu logo existente o deja que la IA cree uno para ti</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { id: "generate", label: "Crear con IA", desc: "Ideogram + Flux generan tu logo", icon: Sparkles },
                { id: "upload", label: "Subir mi logo", desc: "PNG, SVG, JPG o WebP", icon: Upload },
                { id: "none", label: "Solo texto", desc: "Tipografía premium sin ícono", icon: Type },
              ].map(({ id, label, desc, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setForm((p) => ({ ...p, logoOption: id }))}
                  className={`rounded-2xl border p-5 text-left transition-all ${
                    form.logoOption === id ? "border-neon-cyan/50 bg-neon-cyan/10" : "border-white/8 bg-space-800/60 hover:border-white/20"
                  }`}
                >
                  <Icon className={`mb-3 h-6 w-6 ${form.logoOption === id ? "text-neon-cyan" : "text-white/40"}`} />
                  <p className="font-semibold text-white">{label}</p>
                  <p className="mt-0.5 text-xs text-white/45">{desc}</p>
                </button>
              ))}
            </div>

            {form.logoOption === "upload" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <input ref={fileRef} type="file" accept="image/*,.svg" className="hidden" />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-space-900/40 p-8 text-center transition hover:border-neon-cyan/30"
                >
                  <Upload className="h-8 w-8 text-white/30" />
                  <p className="text-sm text-white/50">Haz clic o arrastra tu logo aquí</p>
                  <p className="text-xs text-white/30">PNG, SVG, JPG, WebP — máx. 5 MB</p>
                </button>
              </motion.div>
            )}

            {form.logoOption === "generate" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <label className="text-sm font-medium text-white/70">Describe cómo quieres tu logo</label>
                <textarea
                  rows={3}
                  value={form.logoPrompt}
                  onChange={(e) => setForm((p) => ({ ...p, logoPrompt: e.target.value }))}
                  placeholder={`Ej: Logo minimalista con una ola estilizada en azul y dorado. Tipografía moderna sans-serif. Para una marca de ropa deportiva premium llamada "${form.businessName || "mi marca"}".`}
                  className="w-full resize-none rounded-xl border border-white/10 bg-space-900/60 px-4 py-3 text-sm text-white placeholder-white/25 focus:border-neon-cyan/40 focus:outline-none focus:ring-2 focus:ring-neon-cyan/10"
                />
                <div className="flex flex-wrap gap-2">
                  {["Minimalista", "Abstracto", "Con ícono", "Vintage", "Futurista", "Geométrico", "Caligráfico"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setForm((p) => ({ ...p, logoPrompt: (p.logoPrompt + " " + tag).trim() }))}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50 transition hover:border-neon-cyan/30 hover:text-neon-cyan"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
                <div className="rounded-xl border border-violet-400/15 bg-violet-400/5 px-4 py-3 text-xs text-violet-300/80">
                  <span className="font-semibold">IAs que generarán tu logo:</span> Ideogram (texto/tipografía), Flux.1 (íconos y formas), Recraft (vectores)
                </div>
              </motion.div>
            )}

            <div className="flex gap-3">
              <button onClick={back} className="flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Atrás
              </button>
              <button
                onClick={next}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-neon-cyan transition hover:scale-[1.03]"
              >
                Siguiente <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Imágenes */}
        {step === 4 && (
          <motion.div key="s4" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Imágenes y visuales</h2>
              <p className="mt-1 text-sm text-white/50">Las IAs crearán hero shots, banners, fondos y fotos de producto</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { id: "generate", label: "Generar con IA", desc: "DALL·E 3 + Flux.1 crean todo", icon: Sparkles },
                { id: "upload", label: "Subir mis fotos", desc: "Usa tus imágenes propias", icon: Upload },
                { id: "mix", label: "Mezclar ambas", desc: "Mis fotos + imágenes generadas", icon: ImageIcon },
              ].map(({ id, label, desc, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setForm((p) => ({ ...p, imageOption: id }))}
                  className={`rounded-2xl border p-5 text-left transition-all ${
                    form.imageOption === id ? "border-neon-cyan/50 bg-neon-cyan/10" : "border-white/8 bg-space-800/60 hover:border-white/20"
                  }`}
                >
                  <Icon className={`mb-3 h-6 w-6 ${form.imageOption === id ? "text-neon-cyan" : "text-white/40"}`} />
                  <p className="font-semibold text-white">{label}</p>
                  <p className="mt-0.5 text-xs text-white/45">{desc}</p>
                </button>
              ))}
            </div>

            {(form.imageOption === "generate" || form.imageOption === "mix") && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <label className="text-sm font-medium text-white/70">¿Qué tipo de imágenes necesitas?</label>
                <textarea
                  rows={2}
                  value={form.imagePrompt}
                  onChange={(e) => setForm((p) => ({ ...p, imagePrompt: e.target.value }))}
                  placeholder={`Ej: Mujer atlética en escenario urbano al amanecer. Estilo lifestyle premium, colores vibrantes. Para ${form.businessName || "mi marca"}.`}
                  className="w-full resize-none rounded-xl border border-white/10 bg-space-900/60 px-4 py-3 text-sm text-white placeholder-white/25 focus:border-neon-cyan/40 focus:outline-none"
                />
                <div className="rounded-xl border border-neon-cyan/15 bg-neon-cyan/5 p-4">
                  <p className="mb-2 text-xs font-semibold text-neon-cyan">IAs que generarán tus imágenes:</p>
                  <div className="flex flex-wrap gap-2">
                    {["DALL·E 3", "Flux.1", "Ideogram", "Leonardo AI", "Midjourney", "Adobe Firefly"].map((ai) => (
                      <span key={ai} className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-white/60">{ai}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {form.imageOption === "upload" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <button className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-space-900/40 p-8 text-center transition hover:border-neon-cyan/30">
                  <Upload className="h-8 w-8 text-white/30" />
                  <p className="text-sm text-white/50">Arrastra tus imágenes aquí</p>
                  <p className="text-xs text-white/30">PNG, JPG, WebP — múltiples archivos permitidos</p>
                </button>
              </motion.div>
            )}

            <div className="flex gap-3">
              <button onClick={back} className="flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Atrás
              </button>
              <button
                onClick={next}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-neon-cyan transition hover:scale-[1.03]"
              >
                Siguiente <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Funcionalidades */}
        {step === 5 && (
          <motion.div key="s5" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white">¿Qué funcionalidades necesitas?</h2>
              <p className="mt-1 text-sm text-white/50">Selecciona todo lo que quieras incluir en tu página</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFeature(f)}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-all ${
                    form.features.includes(f)
                      ? "border-neon-cyan/40 bg-neon-cyan/8 text-white"
                      : "border-white/8 bg-space-800/60 text-white/60 hover:border-white/20"
                  }`}
                >
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                    form.features.includes(f) ? "border-neon-cyan bg-neon-cyan" : "border-white/20"
                  }`}>
                    {form.features.includes(f) && <Check className="h-3 w-3 text-space-950" />}
                  </div>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={back} className="flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Atrás
              </button>
              <button
                onClick={next}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-neon-cyan transition hover:scale-[1.03]"
              >
                Siguiente <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 6: Resumen */}
        {step === 6 && (
          <motion.div key="s6" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Resumen de tu proyecto</h2>
              <p className="mt-1 text-sm text-white/50">Revisa los detalles antes de generar con IA</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-space-800/60 divide-y divide-white/8">
              {[
                { label: "Tipo", value: PAGE_TYPES.find((p) => p.id === form.pageType)?.label ?? "—" },
                { label: "Marca", value: form.businessName || "—" },
                { label: "Descripción", value: form.businessDesc || "—" },
                { label: "Público", value: form.targetAudience || "—" },
                { label: "Precio", value: form.price || "—" },
                { label: "Paleta", value: PALETTES.find((p) => p.id === form.palette)?.label ?? "—" },
                { label: "Estilo", value: STYLES.find((s) => s.id === form.style)?.label ?? "—" },
                { label: "Logo", value: form.logoOption === "generate" ? "Generar con IA" : form.logoOption === "upload" ? "Subido" : "Solo texto" },
                { label: "Imágenes", value: form.imageOption === "generate" ? "Generar con IA" : form.imageOption === "upload" ? "Subidas" : "Mixtas" },
                { label: "Funcionalidades", value: form.features.length > 0 ? form.features.join(", ") : "Solo lo básico" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 px-5 py-3">
                  <span className="w-28 shrink-0 text-xs font-medium text-white/40">{label}</span>
                  <span className="text-xs text-white/80 line-clamp-2">{value}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-4">
              <p className="mb-2 text-xs font-semibold text-neon-cyan">IAs que crearán tu página en conjunto:</p>
              <div className="flex flex-wrap gap-2">
                {AI_TOOLS.map((ai) => (
                  <span key={ai.name} className={`rounded-full bg-white/8 px-2.5 py-1 text-xs font-medium ${ai.color}`}>
                    {ai.icon} {ai.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={back} className="flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Atrás
              </button>
              <button
                onClick={next}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-bold text-white shadow-neon-cyan transition hover:scale-[1.02]"
              >
                <Wand2 className="h-4 w-4" /> Generar mi página con IA
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 7: Generando */}
        {step === 7 && (
          <motion.div key="s7" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="text-center">
              <motion.div
                animate={generatingDone ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-3xl shadow-neon-cyan"
              >
                {generatingDone ? "🎉" : "✨"}
              </motion.div>
              <h2 className="font-display text-2xl font-bold text-white">
                {generatingDone ? "¡Tu página está lista!" : "Las IAs están trabajando..."}
              </h2>
              <p className="mt-2 text-sm text-white/50">
                {generatingDone
                  ? `${form.businessName || "Tu sitio"} ha sido creado por 5 IAs en simultáneo`
                  : "Combinamos múltiples modelos de IA para el mejor resultado posible"}
              </p>
            </div>

            <div className="space-y-3">
              {AI_TOOLS.map((ai, i) => {
                const isDone = i < generatingIdx;
                const isActive = i === generatingIdx;
                return (
                  <motion.div
                    key={ai.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isDone || isActive ? 1 : 0.3, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                      isDone
                        ? "border-neon-green/25 bg-neon-green/5"
                        : isActive
                        ? "border-neon-cyan/30 bg-neon-cyan/8"
                        : "border-white/8 bg-space-800/40"
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${
                      isDone ? "bg-neon-green/15" : isActive ? "bg-neon-cyan/15" : "bg-white/5"
                    }`}>
                      {isDone ? (
                        <Check className="h-5 w-5 text-neon-green" />
                      ) : isActive ? (
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
                          ⚙️
                        </motion.span>
                      ) : (
                        <span className="opacity-30">{ai.icon}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${isDone ? "text-neon-green" : isActive ? "text-neon-cyan" : "text-white/30"}`}>
                        {ai.name}
                      </p>
                      <p className={`text-xs truncate ${isDone || isActive ? "text-white/50" : "text-white/20"}`}>{ai.task}</p>
                    </div>
                    {isDone && (
                      <span className="shrink-0 text-xs font-semibold text-neon-green">Listo ✓</span>
                    )}
                    {isActive && !generatingDone && (
                      <div className="flex shrink-0 gap-0.5">
                        {[0, 1, 2].map((dot) => (
                          <motion.div
                            key={dot}
                            className="h-1.5 w-1.5 rounded-full bg-neon-cyan"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: dot * 0.25 }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {generatingDone && (
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setStep(8)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3.5 text-sm font-bold text-white shadow-neon-cyan transition hover:scale-[1.02]"
              >
                <Eye className="h-4 w-4" /> Ver mi página
              </motion.button>
            )}
          </motion.div>
        )}

        {/* STEP 8: Preview + Editor */}
        {step === 8 && (
          <motion.div key="s8" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-white">{form.businessName || "Tu página web"}</h2>
                <p className="text-sm text-white/45">Generada con 5 IAs · Lista para publicar</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    editMode ? "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan" : "border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  <Edit3 className="h-3.5 w-3.5" /> {editMode ? "Edición activa" : "Editar"}
                </button>
                <button
                  onClick={() => setViewMode("desktop")}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    viewMode === "desktop" ? "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan" : "border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("mobile")}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    viewMode === "mobile" ? "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan" : "border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Browser mockup */}
            <div className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 ${
              viewMode === "mobile" ? "mx-auto w-64" : "w-full"
            }`}>
              {/* Browser bar */}
              <div className="flex items-center gap-2 border-b border-white/8 bg-space-950/90 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 rounded-md border border-white/8 bg-white/5 px-3 py-1 text-xs text-white/30">
                  🔒 {(form.businessName || "tu-marca").toLowerCase().replace(/\s+/g, "-")}.vercel.app
                </div>
              </div>

              {/* Page preview */}
              <div className="relative overflow-hidden" style={{ background: heroBg, minHeight: 320 }}>
                {/* Animated background stars */}
                <div className="absolute inset-0 overflow-hidden opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-0.5 w-0.5 rounded-full bg-white"
                      style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%` }}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </div>

                <div className="relative p-5">
                  {/* Nav */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="font-bold text-white text-sm" style={{ color: accentColor }}>
                      {form.businessName || "MiMarca"}
                    </div>
                    {viewMode === "desktop" && (
                      <div className="flex gap-3 text-[10px] text-white/50">
                        <span>Inicio</span><span>Productos</span><span>Nosotros</span>
                        <span className="rounded-full px-2 py-0.5 text-white" style={{ background: accentColor + "30", border: `1px solid ${accentColor}40` }}>
                          Contacto
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hero section */}
                  <div className="py-6 text-center">
                    <div className="mx-auto mb-3 inline-block rounded-full border px-3 py-1 text-[10px] text-white/50"
                      style={{ borderColor: accentColor + "30", background: accentColor + "10" }}>
                      ✨ {PAGE_TYPES.find((p) => p.id === form.pageType)?.label || "Landing Page"} · {STYLES.find(s => s.id === form.style)?.label || "Moderno"}
                    </div>
                    <h3 className="mb-2 font-bold text-white" style={{ fontSize: viewMode === "mobile" ? 14 : 18 }}>
                      {form.businessDesc ? form.businessDesc.split(".")[0] : "Tu propuesta de valor aquí"}
                    </h3>
                    <p className="mx-auto mb-5 max-w-xs text-[11px] text-white/50">
                      {form.targetAudience ? `Para ${form.targetAudience.split(",")[0]}` : "Descripción de tu producto o servicio"}
                      {form.price && ` · Desde ${form.price}`}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <div className="rounded-full px-4 py-1.5 text-[11px] font-semibold text-white"
                        style={{ background: `linear-gradient(135deg, ${accentColor}, #a855f7)` }}>
                        {form.mainGoal?.toLowerCase().includes("lead") ? "Obtener acceso" : "Empezar ahora"}
                      </div>
                      <div className="rounded-full border border-white/15 px-4 py-1.5 text-[11px] text-white/60">
                        Ver más →
                      </div>
                    </div>
                  </div>

                  {/* Features strip */}
                  {viewMode === "desktop" && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {(form.features.length > 0 ? form.features.slice(0, 3) : ["✦ Premium", "⚡ Rápido", "🔒 Seguro"]).map((f, i) => (
                        <div key={i} className="rounded-xl border border-white/8 bg-white/5 p-2 text-center text-[10px] text-white/50">
                          {f}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Edit overlay */}
                {editMode && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-space-950/70"
                  >
                    <div className="rounded-2xl border border-neon-cyan/25 bg-space-800/95 p-5 text-center shadow-neon-cyan">
                      <Edit3 className="mx-auto mb-2 h-7 w-7 text-neon-cyan" />
                      <p className="font-semibold text-white text-sm">Editor en línea</p>
                      <p className="mt-1 text-xs text-white/50 max-w-[200px]">
                        Haz clic en cualquier sección para editarla directamente
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid gap-3 sm:grid-cols-3">
              <button className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white">
                <Copy className="h-4 w-4" /> Descargar ZIP
              </button>
              <button
                onClick={() => { setGeneratingIdx(-1); setGeneratingDone(false); setStep(7); startGeneration(); }}
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <Star className="h-4 w-4" /> Regenerar
              </button>
              <button
                onClick={() => setStep(9)}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2.5 text-sm font-bold text-white shadow-neon-cyan transition hover:scale-[1.02]"
              >
                <Rocket className="h-4 w-4" /> Publicar →
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 9: Deploy con Vercel */}
        {step === 9 && (
          <motion.div key="s9" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon-cyan/25 bg-neon-cyan/8 px-3 py-1 text-xs font-semibold text-neon-cyan">
                <Rocket className="h-3.5 w-3.5" /> Hosting gratuito · Sin tarjeta de crédito
              </div>
              <h2 className="font-display text-2xl font-bold text-white">Publica en Vercel</h2>
              <p className="mt-1 text-sm text-white/50">
                Vercel es la plataforma más rápida del mundo para publicar sitios web. Gratis para proyectos personales.
              </p>
            </div>

            <div className="space-y-3">
              {VERCEL_STEPS.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/8 bg-space-800/60 p-5"
                >
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 text-xs font-bold text-white shadow-neon-cyan">
                      {s.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white">{s.title}</p>
                      <p className="mt-1 text-sm text-white/55">{s.desc}</p>
                      {s.code && (
                        <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/8 bg-space-950 px-4 py-3">
                          <code className="flex-1 whitespace-pre font-mono text-sm text-neon-cyan">{s.code}</code>
                          <button
                            onClick={() => copyCode(s.code!, `step${s.step}`)}
                            className="shrink-0 text-white/30 transition hover:text-neon-cyan"
                          >
                            {copied === `step${s.step}` ? (
                              <Check className="h-4 w-4 text-neon-green" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      )}
                      {s.link && (
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-neon-cyan hover:underline"
                        >
                          {s.linkLabel} <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Domain tip */}
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
              <p className="font-semibold text-amber-300 text-sm mb-1">💡 Tip: Conecta tu dominio propio</p>
              <p className="text-xs text-white/55">
                Desde el dashboard de Vercel puedes conectar un dominio .com, .mx, .io, etc. que ya tengas comprado en GoDaddy, Namecheap u otro. Solo agregas 2 registros DNS y Vercel lo configura automáticamente con HTTPS gratis.
              </p>
            </div>

            {/* Final CTA */}
            <div className="rounded-2xl border border-neon-green/20 bg-neon-green/5 p-6 text-center">
              <p className="mb-1 text-3xl">🚀</p>
              <p className="font-bold text-white text-lg">¡Felicidades, tu web está en vivo!</p>
              <p className="mt-1 text-sm text-white/50 max-w-sm mx-auto">
                Comparte tu URL con el mundo. Puedes volver a NovaAds cuando quieras crear otra página o actualizar el contenido.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href="https://vercel.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-bold text-white shadow-neon-cyan transition hover:scale-[1.02]"
                >
                  <ExternalLink className="h-4 w-4" /> Ir a mi Vercel
                </a>
                <Link
                  href="/dashboard/paginas/crear"
                  onClick={() => { setStep(0); setGeneratingIdx(-1); setGeneratingDone(false); setForm({ pageType: null, businessName: "", businessDesc: "", targetAudience: "", mainGoal: "", price: "", palette: "space", style: null, logoOption: "generate", logoPrompt: "", imageOption: "generate", imagePrompt: "", features: [] }); }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white"
                >
                  Crear otra página
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
