"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="px-6 py-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy-900 via-navy-800 to-cyan-700 p-12 text-center shadow-[0_30px_100px_-20px_rgba(11,30,63,0.5)] md:p-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(78,220,255,0.35),transparent_60%)]"
        />
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-80 w-80 animate-float-slow rounded-full bg-cyan-400/30 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -left-20 h-80 w-80 animate-float rounded-full bg-navy-400/30 blur-3xl"
        />

        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl"
          >
            Tu próximo lanzamiento empieza con{" "}
            <span className="underline decoration-cyan-300 decoration-4 underline-offset-4">
              un solo prompt
            </span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            14 días gratis. Sin permanencia. Cancela en un clic antes de que termine la prueba.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/registro" className="btn-primary">
              <Sparkles className="h-5 w-5" /> Empezar gratis
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/iniciar-sesion"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              Iniciar sesión
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
