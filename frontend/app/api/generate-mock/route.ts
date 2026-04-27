import { NextRequest } from "next/server";

export const runtime = "nodejs";

const DEMO: Record<string, unknown> = {
  landing: {
    hero: {
      headline: "Ropa deportiva que te hace sentir invencible",
      subheadline: "Diseñada para mujeres que van a por todo. Calidad premium desde $80 USD.",
      cta: "Ver colección ahora"
    },
    offer: { title: "La colección más vendida del año", body: "Cada prenda está diseñada para rendir al 100% en el gym y verse perfecta en la calle." },
    benefits: [
      { title: "Tejido técnico 4D-Stretch", body: "Se adapta a tu cuerpo sin restricciones en cualquier movimiento." },
      { title: "Secado ultra-rápido", body: "Absorbe el sudor y se seca en minutos para máxima comodidad." },
      { title: "Estilo que trasciende el gym", body: "De la clase de yoga a la calle sin necesidad de cambiarte." }
    ],
    social_proof: [
      { name: "Camila R.", quote: "La mejor ropa que he comprado. Aguanta todo sin perder la forma." },
      { name: "Ana P.", quote: "Me pongo la misma ropa para entrenar y salir. Es increíble." }
    ],
    faq: [
      { q: "¿Cuánto tarda el envío?", a: "3-5 días hábiles a toda Latinoamérica." },
      { q: "¿Tienen devoluciones gratuitas?", a: "Sí, 30 días sin preguntas." }
    ],
    final_cta: { headline: "Empieza hoy. Tu cuerpo te lo va a agradecer.", button: "Comprar ahora" }
  },
  funnel: {
    lead_magnet: { title: "Guía: 7 Outfits para entrenar con estilo", hook: "Descarga gratis y descubre cómo verse impecable en el gym", cta: "Quiero la guía", deliverable: "PDF de 15 páginas con lookbook" },
    sales_page: { headline: "La ropa que te hace rendir y lucir al mismo tiempo", story: "Antes de Luna Activewear, tenía que elegir entre comodidad y estilo…", offer: "Colección completa con 30% de descuento esta semana", guarantee: "30 días de garantía total o te devolvemos tu dinero", cta: "Sí, quiero mi conjunto ahora" },
    checkout: { headline: "Completa tu pedido y recibe en 3-5 días", upsell: "Añade leggings combinables con 40% OFF solo hoy", trust_badges: ["Pago 100% seguro", "Envío express disponible", "30 días de garantía"] },
    thank_you: { headline: "¡Bienvenida al movimiento Luna! 🎉", next_step: "Revisa tu email para el confirmación de envío y tu guía de estilo gratis" },
    emails: [
      { day: 0, subject: "Tu pedido está confirmado ✅", body: "Hola, tu pedido de Luna Activewear está en camino…" },
      { day: 1, subject: "¿Ya elegiste tu outfit de mañana?", body: "Con tu nuevo conjunto de Luna, cada entreno es una razón para brillar…" },
      { day: 3, subject: "Tu pedido sale hoy 📦", body: "En 3-5 días lo tienes en casa. Mientras tanto, te compartimos nuestros mejores looks…" },
      { day: 7, subject: "¿Cómo te quedó tu conjunto?", body: "Nos encantaría verte. Etiquétanos en Instagram con #LunaActivewear…" },
      { day: 14, subject: "Acceso anticipado a la nueva colección 🔥", body: "Por ser clienta VIP, tienes 24h de acceso anticipado a la temporada primavera…" }
    ]
  },
  ads: {
    angles: [
      { name: "Dolor", hook: "¿Harta de ropa que no aguanta ni 3 lavadas?", body: "Diseñamos para durar. Probado en más de 200 entrenamientos sin perder la forma.", cta: "Ver la diferencia" },
      { name: "Aspiración", hook: "Entrena como profesional aunque estés empezando", body: "La ropa correcta cambia tu mindset. Y tus resultados. Lo dicen 12.000 mujeres.", cta: "Quiero ese cambio" },
      { name: "Social proof", hook: "12,000 mujeres ya cambiaron su ropa de gym", body: "Únete al movimiento. Calidad premium que se nota desde la primera puesta.", cta: "Unirme ahora" },
      { name: "Urgencia", hook: "Solo 48h: 30% en toda la colección de verano", body: "Precios que no vamos a repetir. Elige tu conjunto favorito antes de que se agote.", cta: "Aprovechar ahora" },
      { name: "Beneficio", hook: "Ropa que seca en 8 minutos y se estira sin límites", body: "Tecnología 4D-Stretch y tejido Dry-Cool. El estándar de las atletas profesionales al alcance de todas.", cta: "Probarlo gratis" }
    ],
    targeting: { age_min: 22, age_max: 40, genders: ["female"], interests: ["fitness", "yoga", "running", "healthy lifestyle", "fashion"], locations: ["México", "Colombia", "Argentina", "España"], placements: ["Facebook Feed", "Instagram Feed", "Instagram Stories", "Instagram Reels"] },
    strategy: { budget_usd_per_day: 25, kpi: "Costo por compra < $15 USD", optimization: "Conversiones - Compras" }
  },
  images: { images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1518310383802-640c2de311b6?w=800", "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800"] },
  video: {
    script_45s: { hook: "¿Y si te dijera que la ropa que llevas al gym está frenando tus resultados?", body: "La ropa técnica de calidad mejora tu rango de movimiento, regula tu temperatura y te hace sentir que puedes con todo. Luna Activewear lo entendió desde el primer día. 12.000 mujeres ya lo comprobaron.", cta: "Pruébala 30 días. Te garantizamos que no querrás volver a tu ropa anterior." },
    storyboard: [
      { scene: 1, visual: "Mujer entrenando con ropa genérica, cara de incomodidad", voiceover: "¿Y si te dijera que la ropa que llevas al gym está frenando tus resultados?", seconds: 5 },
      { scene: 2, visual: "Transición: la misma mujer ahora con Luna Activewear, movimiento fluido", voiceover: "La ropa técnica de calidad mejora tu rango de movimiento…", seconds: 15 },
      { scene: 3, visual: "Testimonios rápidos de 3 clientas reales (broll)", voiceover: "12.000 mujeres ya lo comprobaron.", seconds: 10 },
      { scene: 4, visual: "CTA con logo y URL, fondo degradado cyan-navy", voiceover: "Pruébala 30 días. Garantía total o devolución.", seconds: 5 }
    ],
    b_roll_ideas: ["Toma macro del tejido estirándose", "Cámara lenta de sudor evaporándose", "Mujer pasando del gym a una cafetería sin cambiarse"],
    music_mood: "Energética, pop-electrónica, BPM 120-128, sin letra"
  },
  pitch: {
    slides: [
      { title: "Problema", body: ["El 68% de las mujeres activas considera que no hay ropa deportiva de calidad a precio justo en LATAM", "Las marcas premium cuestan 3-5× más sin justificación de performance", "La ropa genérica falla en <6 meses de uso intenso"] },
      { title: "Solución", body: ["Luna Activewear: ropa deportiva técnica premium a precio accesible", "Tecnología 4D-Stretch + Dry-Cool a $40-80 USD vs $150+ de la competencia", "DTC (Direct-to-Consumer) elimina el margen del retail"] },
      { title: "Mercado", body: ["TAM: $28B mercado ropa deportiva femenina LATAM 2026", "SAM: $4.2B segmento premium-accessible", "SOM año 1: $2.4M (penetración <0.1%)"] },
      { title: "Tracción", body: ["$380K en ventas en los primeros 8 meses", "12.000 clientas activas, NPS 72", "CAC $14 USD, LTV $280 USD (LTV/CAC = 20×)"] },
      { title: "Modelo de negocio", body: ["Venta DTC en ecommerce propio (70% margen bruto)", "Suscripción 'Box mensual' con nuevas prendas (30% de clientes)", "B2B: equipamiento para estudios de yoga y crossfit"] },
      { title: "Ask", body: ["Buscamos $1.2M Seed a valoración $8M post-money", "40% inventario y logística · 45% marketing · 15% equipo", "Meta: $3M ARR en 18 meses y abrir Serie A"] }
    ]
  }
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST(req: NextRequest) {
  const { modules } = (await req.json()) as { modules?: string[] };
  const mods = modules ?? ["landing", "funnel", "ads", "images", "video", "pitch"];

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      // Fan-out all modules with staggered delays (simulates real AI latency)
      const jobs = mods.map(async (m) => {
        send("module_start", { module: m });
        await sleep(800 + Math.random() * 1800);
        send("module_done", { module: m, payload: DEMO[m] ?? { ok: true }, provider: "openai" });
      });

      await Promise.allSettled(jobs);
      send("complete", { ok: true });
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}
