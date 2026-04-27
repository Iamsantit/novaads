"use client";

const rows = [
  "Más de 12,400 emprendedores lanzaron con NovaAds",
  "★★★★★ 4.9 en ProductHunt",
  "Equipo ex-Google · Meta · Shopify",
  "Stripe · OpenAI · Runway integrados",
  "Compatible con Shopify · WooCommerce · Wix"
];

export default function LogosMarquee() {
  return (
    <section className="relative border-y border-navy-900/5 bg-white/50 py-6">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="marquee">
          {[...rows, ...rows].map((r, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.2em] text-navy-700/70"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
