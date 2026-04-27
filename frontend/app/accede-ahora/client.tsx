"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  Sparkles, ArrowRight, PlayCircle, ShieldCheck, Star,
  Check, Clock, Zap, Gift, Layers, BadgeCheck, X
} from "lucide-react";
import Logo from "@/components/Logo";
import Particles from "@/components/Particles";
import Countdown from "@/components/accede/Countdown";

const valueStack = [
  { icon: Layers, title: "Landing de alta conversión", value: "USD 497" },
  { icon: Zap,    title: "Funnel de 4 pasos + secuencia de emails", value: "USD 697" },
  { icon: Sparkles, title: "Campaña publicitaria lista para Meta/Google", value: "USD 597" },
  { icon: Gift, title: "3 creatividades generadas con IA", value: "USD 297" },
  { icon: PlayCircle, title: "Guion + storyboard para video ad", value: "USD 397" },
  { icon: BadgeCheck, title: "Pitch deck editable en Gamma", value: "USD 397" }
];
const totalValue = 2882;

const rawTestimonials = [
  { name: "Camila R.", result: "+140 ventas en 7 días", quote: "Lancé mi tienda de ropa deportiva una tarde y al día siguiente ya tenía ventas." },
  { name: "Diego M.",  result: "Ahorré 6 herramientas",  quote: "Pagaba suscripciones por todos lados. Ahora todo sale de un solo prompt y es mejor." },
  { name: "Ana P.",    result: "2.3× CTR en Meta Ads",   quote: "Las creatividades que genera son las que mejor rendimiento tienen en mis campañas." },
  { name: "Sebastián K.", result: "+40% propuestas cerradas", quote: "Uso NovaAds para prototipar funnels con clientes y cerrar propuestas mucho más rápido." }
];

const faqs = [
  { q: "¿Qué pasa después de los 14 días?", a: "Si no cancelas, se cobra tu plan. Cancelas en un clic desde el portal de facturación antes de que termine y no se cobra nada." },
  { q: "¿Los precios están en mi moneda?", a: "Detectamos tu país y mostramos el precio en tu moneda local. El cobro real lo procesa Stripe en USD al tipo de cambio del día." },
  { q: "¿Cómo funciona la garantía?", a: "Si en los primeros 7 días de cobro no recibes valor, te devolvemos el 100% sin preguntas. Escribes a soporte y listo." },
  { q: "¿Es técnico? ¿Necesito saber código?", a: "Cero código. Escribes una frase con lo que quieres vender y te devuelve todo. Lo publicas en Wix, WordPress o Shopify con un clic." },
  { q: "¿Puedo exportar lo que genere?", a: "Sí. Todo se descarga como HTML, PDF o se conecta directo a tu CMS. También hay API para automatizar." }
];

export default function AccedeAhoraClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  return (
    <main className="relative overflow-hidden bg-white">
      {/* Top urgency bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-gradient-to-r from-navy-900 via-navy-800 to-cyan-700 px-4 py-2.5 text-white">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <Clock className="h-3.5 w-3.5 text-cyan-300" />
          Oferta de lanzamiento termina en
          <span className="ml-2"><Countdown /></span>
        </div>
        <Link
          href="/registro"
          className="hidden rounded-full bg-white px-4 py-1.5 text-xs font-bold text-navy-900 transition hover:scale-[1.03] sm:block"
        >
          Activar mi prueba →
        </Link>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden pt-10 pb-24">
        <div className="absolute inset-0 -z-10 bg-mesh" />
        <div className="absolute inset-0 -z-10 bg-grid-light [background-size:48px_48px] opacity-40" />
        <motion.div
          style={{ y: parallax, opacity: fade }}
          className="absolute inset-x-0 top-0 -z-10 h-[700px] bg-radial-glow"
        />
        <Particles count={24} />

        <div className="mx-auto max-w-5xl px-6 text-center">
          <Link href="/" className="mx-auto mb-10 inline-block">
            <Logo />
          </Link>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700"
          >
            <Sparkles className="h-3 w-3" /> Acceso inmediato · 14 días gratis
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-navy-900 sm:text-6xl lg:text-7xl"
          >
            Lanza tu negocio online <br className="hidden sm:block" />
            con <span className="text-gradient">un solo prompt</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-navy-700/80"
          >
            Landing + funnel + ads + imágenes + video + pitch deck. Todo coherente, todo en minutos, todo publicable en un clic en Wix, WordPress, Shopify o el CMS que ya usas.
          </motion.p>

          {/* Video / demo placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-10 max-w-3xl"
          >
            <div className="gradient-border p-2 shadow-[0_30px_100px_-20px_rgba(11,30,63,0.35)]">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-800">
                <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 animate-float-slow rounded-full bg-cyan-400/30 blur-3xl" />
                <div aria-hidden className="absolute -bottom-20 -left-20 h-64 w-64 animate-float rounded-full bg-navy-400/30 blur-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="group flex flex-col items-center gap-2">
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-navy-900 shadow-2xl transition group-hover:scale-110">
                      <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                      <PlayCircle className="relative h-10 w-10" />
                    </span>
                    <span className="text-sm font-semibold text-white/90">Ver demo · 2:47</span>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900 to-transparent p-4 text-left text-xs text-white/70">
                  Demo: de un prompt a los 6 activos de marketing en tiempo real
                </div>
              </div>
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/registro" className="btn-primary group text-base">
              <Sparkles className="h-5 w-5" />
              Activar mi prueba gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/iniciar-sesion" className="btn-ghost">
              Ya tengo cuenta
            </Link>
          </motion.div>
          <p className="mt-3 text-xs text-navy-600">
            Sin permanencia · Cancela en un clic · Precio en tu moneda
          </p>

          {/* Trust row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-navy-700/70">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-cyan-500 text-cyan-500" />
                ))}
              </div>
              <span className="font-semibold text-navy-900">4.9</span>
              <span>·</span>
              <span>+12.400 usuarios</span>
            </div>
            <span className="hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-600" />
              Pago seguro con Stripe
            </div>
            <span className="hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-cyan-600" />
              Garantía 7 días
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution contrast */}
      <section className="border-y border-navy-900/5 bg-gradient-to-b from-cyan-50/40 to-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="chip">El problema</span>
            <h2 className="heading-display mt-3">
              Tienes la idea. <br />
              <span className="text-gradient">Pero llevas meses sin lanzar.</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-red-200 bg-red-50/60 p-6"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-red-600">El camino lento</p>
              <ul className="space-y-3">
                {[
                  "Cotizar un copywriter: USD 500 por landing",
                  "Cotizar un diseñador: USD 300 por creativos",
                  "Armar el funnel en ClickFunnels: 2 semanas",
                  "Grabar y editar el video-ad: otra semana",
                  "Coordinar freelancers en 4 zonas horarias",
                  "3 meses después… sigues sin lanzar"
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-red-900/80">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" /> {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-cyan-200 bg-cyan-50/60 p-6"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-700">Con NovaAds</p>
              <ul className="space-y-3">
                {[
                  "Escribes una frase con tu idea",
                  "6 agentes de IA trabajan en paralelo",
                  "Landing + funnel + ads + imágenes + video + pitch",
                  "Publicas en Wix, WordPress, Shopify o Meta Ads",
                  "Recibes la primera venta antes de dormir",
                  "Costo: una fracción de contratar freelancers"
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-navy-900">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" /> {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value stack */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="chip">Todo lo que incluye</span>
            <h2 className="heading-display mt-3">
              Esto es lo que obtienes hoy
            </h2>
          </motion.div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-navy-900/5 bg-white shadow-card">
            {valueStack.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between gap-4 border-b border-navy-900/5 p-5 last:border-0 hover:bg-cyan-50/40"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-navy-600 text-white shadow-sm">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-navy-900">{v.title}</span>
                </div>
                <span className="font-display text-sm font-bold text-navy-900/60 line-through">
                  {v.value}
                </span>
              </motion.div>
            ))}
            <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-cyan-50 to-navy-50 p-5">
              <span className="font-display text-lg font-bold text-navy-900">Valor total</span>
              <span className="font-display text-2xl font-bold text-navy-900/70 line-through">
                USD {totalValue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-t-2 border-cyan-400 bg-white p-6">
              <div>
                <p className="font-display text-lg font-bold text-navy-900">Hoy activas todo por</p>
                <p className="text-xs text-navy-600">14 días gratis · desde USD 19/mes</p>
              </div>
              <span className="font-display text-4xl font-bold text-gradient">USD 0</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/registro" className="btn-primary text-base">
              <Sparkles className="h-5 w-5" /> Activar mi prueba gratis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-700 py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/10 ring-4 ring-cyan-300/40 backdrop-blur"
          >
            <ShieldCheck className="h-12 w-12 text-cyan-300" />
          </motion.div>
          <h2 className="font-display text-4xl font-bold">Garantía de 7 días</h2>
          <p className="mt-4 text-lg text-white/85">
            Activa tu cuenta, genera todas las landings, funnels y campañas que quieras. Si en los primeros 7 días después del primer cobro no recibes valor real, te devolvemos el 100%. Sin preguntas, sin formularios.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="chip">Resultados reales</span>
            <h2 className="heading-display mt-3">Esto están consiguiendo</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {rawTestimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-cyan-500 text-cyan-500" />
                  ))}
                </div>
                <p className="mt-3 font-display text-lg font-bold text-gradient">{t.result}</p>
                <p className="mt-2 text-sm text-navy-800/90">“{t.quote}”</p>
                <div className="mt-4 flex items-center gap-3 border-t border-navy-900/5 pt-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-navy-600 text-sm font-bold text-white">
                    {t.name[0]}
                  </div>
                  <span className="text-sm font-semibold text-navy-900">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing recap */}
      <section className="bg-gradient-to-b from-white via-cyan-50/40 to-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <span className="chip">Elige tu plan</span>
            <h2 className="heading-display mt-3">Todos incluyen 14 días gratis</h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { id: "basic", name: "Básico", price: 19, bullets: ["10 generaciones / mes", "Landing + funnel + ads", "Exportar HTML / PDF"] },
              { id: "pro", name: "Pro", price: 49, popular: true, bullets: ["Generaciones ilimitadas", "Imágenes + video", "Dominio personalizado"] },
              { id: "premium", name: "Premium", price: 99, bullets: ["Todo Pro +", "Pitch decks ilimitados", "API + 5 workspaces"] }
            ].map((p) => (
              <div
                key={p.id}
                className={`relative rounded-3xl bg-white p-6 shadow-card ring-1 ${
                  p.popular ? "ring-2 ring-cyan-400" : "ring-navy-900/5"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-navy-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
                    Más popular
                  </span>
                )}
                <p className="font-display text-xl font-bold text-navy-900">{p.name}</p>
                <p className="mt-2">
                  <span className="font-display text-4xl font-bold text-navy-900">USD {p.price}</span>
                  <span className="text-sm text-navy-600">/mes</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm text-navy-800">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" /> {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/registro?plan=${p.id}&interval=month`}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition ${
                    p.popular
                      ? "bg-gradient-to-r from-cyan-400 to-navy-600 text-white shadow-glow hover:scale-[1.02]"
                      : "border border-navy-900/10 bg-white text-navy-900 hover:border-cyan-400 hover:text-cyan-600"
                  }`}
                >
                  Empezar con {p.name} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <span className="chip">Preguntas frecuentes</span>
            <h2 className="heading-display mt-3">Lo que probablemente te estás preguntando</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <motion.details
                key={f.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display font-semibold text-navy-900">
                  {f.q}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="px-6 pb-5 text-navy-700/85">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-700 p-10 text-center text-white shadow-[0_30px_100px_-20px_rgba(11,30,63,0.5)] md:p-16">
          <div aria-hidden className="absolute -right-20 -top-20 h-80 w-80 animate-float-slow rounded-full bg-cyan-400/30 blur-3xl" />
          <div aria-hidden className="absolute -bottom-20 -left-20 h-80 w-80 animate-float rounded-full bg-navy-400/30 blur-3xl" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative font-display text-3xl font-bold leading-tight sm:text-5xl"
          >
            ¿Listo para lanzar hoy <br className="hidden sm:block" />
            en lugar de dentro de 3 meses?
          </motion.h2>
          <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/registro" className="btn-primary !px-8 !py-3.5 text-base">
              <Sparkles className="h-5 w-5" /> Activar mi prueba gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-white/70">La oferta cierra en <Countdown /></p>
          </div>
        </div>
      </section>
    </main>
  );
}
