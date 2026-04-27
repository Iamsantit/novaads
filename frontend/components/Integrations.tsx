"use client";

import { motion } from "framer-motion";

const logos = [
  "Shopify", "WordPress", "Wix", "Notion",
  "Stripe", "Meta Ads", "Google Ads", "TikTok Ads",
  "Mailchimp", "ActiveCampaign", "ConvertKit", "Klaviyo",
  "Zapier", "Make", "HubSpot", "Salesforce"
];

export default function Integrations() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Integraciones</span>
          <h2 className="heading-display mt-4">
            Se conecta con <span className="text-gradient">todo lo que ya usas</span>
          </h2>
          <p className="mt-4 text-lg text-navy-700/80">
            Exporta, publica y sincroniza con tus herramientas favoritas. Un clic y listo.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {logos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              whileHover={{ y: -4, rotate: -2 }}
              className="group flex aspect-square items-center justify-center rounded-2xl border border-navy-900/5 bg-white p-4 shadow-sm transition-all hover:border-cyan-300 hover:shadow-[0_10px_30px_-10px_rgba(28,197,231,0.4)]"
            >
              <span className="text-center text-sm font-display font-bold text-navy-800 transition-colors group-hover:text-cyan-600">
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-navy-600">
          ¿No ves tu herramienta? Tenemos API y webhooks para conectar cualquier stack.
        </p>
      </div>
    </section>
  );
}
