import type { PreviewPayload } from "./preview-store";

/**
 * Exports the generated preview as a single self-contained HTML file
 * (vanilla HTML + Tailwind via CDN + minimal inline styles). It's a real
 * web page you can upload to any hosting (Netlify drop, Vercel static,
 * Wix, WordPress, S3, etc.) or open by double-click.
 */

export function exportAsHtml(p: PreviewPayload): string {
  const brand = p.data.brand?.name ?? "Tu Marca";
  const accent = p.data.brand?.accent ?? "#1cc5e7";

  switch (p.type) {
    case "ecommerce":
      return ecommerceHtml(p, brand, accent);
    case "blog":
      return blogHtml(p, brand, accent);
    case "saas":
      return saasHtml(p, brand, accent);
    case "landing":
    default:
      return landingHtml(p, brand, accent);
  }
}

/* ---------- Shared helpers ---------- */

function head(title: string, accent: string): string {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --accent: ${accent}; }
    body { font-family: Inter, system-ui, sans-serif; }
    .font-display { font-family: Sora, Inter, sans-serif; }
    .bg-accent { background-color: var(--accent); }
    .text-accent { color: var(--accent); }
    .border-accent { border-color: var(--accent); }
    details summary { list-style: none; cursor: pointer; }
    details summary::-webkit-details-marker { display: none; }
    .fade-in { animation: fade 0.6s ease-out both; }
    @keyframes fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body class="bg-white text-slate-900">`;
}

function esc(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function close(): string {
  return "</body></html>";
}

/* ---------- Landing ---------- */

function landingHtml(p: PreviewPayload, brand: string, accent: string): string {
  const d = p.data;
  const benefits = (d.benefits ?? []).map((b, i) => `
    <div class="fade-in rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:${i * 80}ms">
      <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">✓</div>
      <h3 class="font-display text-lg font-bold">${esc(b.title)}</h3>
      <p class="mt-2 text-slate-600">${esc(b.body)}</p>
    </div>`).join("");

  const reviews = (d.social_proof ?? []).map((s) => `
    <div class="rounded-2xl bg-white p-6 shadow-sm">
      <div class="text-amber-400">★★★★★</div>
      <p class="mt-3 text-slate-700">“${esc(s.quote)}”</p>
      <p class="mt-3 text-sm font-semibold">— ${esc(s.name)}</p>
    </div>`).join("");

  const faq = (d.faq ?? []).map((f) => `
    <details class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <summary class="font-display font-semibold">${esc(f.q)}</summary>
      <p class="mt-3 text-slate-600">${esc(f.a)}</p>
    </details>`).join("");

  return `${head(brand, accent)}
  <header class="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <span class="font-display text-xl font-bold">${esc(brand)}</span>
      <nav class="hidden md:flex gap-6 text-sm text-slate-600">
        <a href="#beneficios">Beneficios</a><a href="#testimonios">Testimonios</a><a href="#faq">FAQ</a>
      </nav>
      <a href="#cta" class="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">${esc(d.hero?.cta ?? "Empezar")}</a>
    </div>
  </header>

  <section class="px-6 py-24 text-center">
    <div class="mx-auto max-w-5xl fade-in">
      <span class="inline-block rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider">Nuevo</span>
      <h1 class="mt-5 font-display text-5xl font-bold leading-[1.05] sm:text-6xl">${esc(d.hero?.headline ?? "Tu titular aquí")}</h1>
      <p class="mx-auto mt-5 max-w-2xl text-lg text-slate-600">${esc(d.hero?.subheadline ?? "")}</p>
      <a href="#cta" class="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-lg">${esc(d.hero?.cta ?? "Empezar")}  →</a>
    </div>
  </section>

  ${d.offer ? `<section class="border-y border-slate-100 bg-slate-50 px-6 py-20 text-center">
    <div class="mx-auto max-w-3xl">
      <h2 class="font-display text-3xl font-bold sm:text-4xl">${esc(d.offer.title)}</h2>
      <p class="mt-4 text-lg text-slate-600">${esc(d.offer.body)}</p>
    </div>
  </section>` : ""}

  ${benefits ? `<section id="beneficios" class="px-6 py-24">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-center font-display text-3xl font-bold sm:text-4xl">¿Por qué elegirnos?</h2>
      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">${benefits}</div>
    </div>
  </section>` : ""}

  ${reviews ? `<section id="testimonios" class="bg-slate-50 px-6 py-24">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-center font-display text-3xl font-bold sm:text-4xl">Lo que dicen nuestros clientes</h2>
      <div class="mt-12 grid gap-6 md:grid-cols-3">${reviews}</div>
    </div>
  </section>` : ""}

  ${faq ? `<section id="faq" class="px-6 py-24">
    <div class="mx-auto max-w-3xl">
      <h2 class="text-center font-display text-3xl font-bold sm:text-4xl">Preguntas frecuentes</h2>
      <div class="mt-10 space-y-3">${faq}</div>
    </div>
  </section>` : ""}

  <section id="cta" class="px-6 py-24 text-center text-white" style="background:linear-gradient(135deg,#0b1e3f 0%,${accent} 100%)">
    <h2 class="font-display text-3xl font-bold sm:text-5xl">${esc(d.final_cta?.headline ?? "Empieza hoy mismo")}</h2>
    <a href="#" class="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 shadow-xl">${esc(d.final_cta?.button ?? "Empezar")} →</a>
  </section>

  <footer class="bg-slate-950 px-6 py-10 text-center text-sm text-white/60">
    © ${new Date().getFullYear()} ${esc(brand)} · Generado con NovaAds
  </footer>
  ${close()}`;
}

/* ---------- Ecommerce / Blog / SaaS (versiones compactas) ---------- */

function ecommerceHtml(p: PreviewPayload, brand: string, accent: string): string {
  const d = p.data;
  const products = (d.products?.length ? d.products : [
    { name: "Producto A", price: "$49", desc: "Descripción corta" },
    { name: "Producto B", price: "$79", desc: "Descripción corta" },
    { name: "Producto C", price: "$99", desc: "Descripción corta" },
    { name: "Producto D", price: "$129", desc: "Descripción corta" }
  ]).map((pr, i) => `
    <div class="fade-in group" style="animation-delay:${i * 70}ms">
      <div class="aspect-square rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200"></div>
      <div class="mt-3 flex items-start justify-between">
        <div><p class="font-semibold">${esc(pr.name)}</p><p class="text-sm text-slate-500">${esc(pr.desc)}</p></div>
        <span class="font-display font-bold">${esc(pr.price)}</span>
      </div>
      <button class="mt-3 w-full rounded-full border border-slate-900 py-2 text-sm font-semibold">Añadir al carrito</button>
    </div>`).join("");

  return `${head(brand, accent)}
  <header class="border-b border-slate-200 bg-white">
    <div class="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
      <span class="font-display text-xl font-bold">${esc(brand)}</span>
      <nav class="hidden md:flex flex-1 justify-center gap-6 text-sm text-slate-600">
        <a href="#">Shop</a><a href="#">Colecciones</a><a href="#">Novedades</a><a href="#">Outlet</a>
      </nav>
      <div class="flex items-center gap-3 text-slate-600"><span>🔍</span><span>♥</span><span>🛒</span></div>
    </div>
  </header>

  <section class="bg-slate-50 px-6 py-20">
    <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
      <div class="fade-in">
        <h1 class="font-display text-5xl font-bold leading-[1.05] sm:text-6xl">${esc(d.hero?.headline ?? "Nuestra colección")}</h1>
        <p class="mt-5 max-w-md text-lg text-slate-600">${esc(d.hero?.subheadline ?? "")}</p>
        <a href="#productos" class="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white shadow-lg">${esc(d.hero?.cta ?? "Ver colección")} →</a>
      </div>
      <div class="aspect-square rounded-3xl" style="background:linear-gradient(135deg,#e0e7ff,#cffafe)"></div>
    </div>
  </section>

  <section id="productos" class="px-6 py-20">
    <div class="mx-auto max-w-7xl">
      <h2 class="font-display text-3xl font-bold">Productos destacados</h2>
      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${products}</div>
    </div>
  </section>

  <section class="px-6 py-16 text-center text-white bg-accent">
    <h2 class="font-display text-3xl font-bold">Suscríbete y obtén 10% de descuento</h2>
    <form class="mx-auto mt-6 flex max-w-md gap-2">
      <input type="email" placeholder="tu@email.com" class="flex-1 rounded-full bg-white px-5 py-3 text-sm text-slate-900 outline-none">
      <button type="button" class="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold">Suscribirme</button>
    </form>
  </section>

  <footer class="bg-slate-950 px-6 py-10 text-center text-sm text-white/60">© ${new Date().getFullYear()} ${esc(brand)}</footer>
  ${close()}`;
}

function blogHtml(p: PreviewPayload, brand: string, accent: string): string {
  const d = p.data;
  const posts = (d.posts?.length ? d.posts : [
    { title: "Artículo 1", excerpt: "Un resumen breve del artículo.", date: "3 min" },
    { title: "Artículo 2", excerpt: "Otro resumen.", date: "5 min" },
    { title: "Artículo 3", excerpt: "Más contenido.", date: "2 min" }
  ]);
  const featured = posts[0];
  const list = posts.slice(1).map((po) => `
    <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-xs text-slate-500">Lectura · ${esc(po.date ?? "3 min")}</p>
      <h3 class="mt-3 font-display text-xl font-bold">${esc(po.title)}</h3>
      <p class="mt-2 text-slate-600">${esc(po.excerpt)}</p>
    </article>`).join("");

  return `${head(brand, accent)}
  <header class="border-b border-slate-100 bg-white">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
      <span class="font-display text-xl font-bold">${esc(brand)}</span>
      <nav class="hidden md:flex gap-6 text-sm text-slate-600"><a href="#">Artículos</a><a href="#">Newsletter</a></nav>
    </div>
  </header>

  <section class="px-6 py-20 text-center">
    <p class="text-sm font-semibold uppercase tracking-wider text-accent">Blog</p>
    <h1 class="mx-auto mt-3 max-w-3xl font-display text-5xl font-bold sm:text-6xl">${esc(d.hero?.headline ?? "Ideas y aprendizajes")}</h1>
    <p class="mx-auto mt-5 max-w-xl text-lg text-slate-600">${esc(d.hero?.subheadline ?? "")}</p>
  </section>

  <section class="px-6 pb-20">
    <div class="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
      <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Destacado</p>
      <h2 class="mt-3 font-display text-3xl font-bold sm:text-4xl">${esc(featured.title)}</h2>
      <p class="mt-4 text-lg text-slate-600">${esc(featured.excerpt)}</p>
    </div>
  </section>

  <section class="px-6 pb-20">
    <div class="mx-auto max-w-5xl">
      <h2 class="font-display text-3xl font-bold">Últimos artículos</h2>
      <div class="mt-10 grid gap-6 md:grid-cols-2">${list}</div>
    </div>
  </section>

  <footer class="bg-white px-6 py-10 text-center text-sm text-slate-500 border-t">© ${new Date().getFullYear()} ${esc(brand)}</footer>
  ${close()}`;
}

function saasHtml(p: PreviewPayload, brand: string, accent: string): string {
  const d = p.data;
  const features = (d.features?.length ? d.features : [
    { title: "Rápido", body: "Setup en 5 minutos." },
    { title: "Seguro", body: "AES-256 + SOC2." },
    { title: "API-first", body: "REST + SDK." }
  ]).map((f) => `
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="mb-4 h-10 w-10 rounded-xl bg-accent"></div>
      <h3 class="font-display text-lg font-bold">${esc(f.title)}</h3>
      <p class="mt-2 text-slate-600">${esc(f.body)}</p>
    </div>`).join("");

  return `${head(brand, accent)}
  <header class="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <span class="font-display text-xl font-bold">${esc(brand)}</span>
      <nav class="hidden md:flex gap-6 text-sm text-slate-600"><a href="#features">Features</a><a href="#pricing">Pricing</a></nav>
      <a href="#cta" class="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">Get started</a>
    </div>
  </header>

  <section class="px-6 py-24 text-center">
    <h1 class="mx-auto max-w-4xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl">${esc(d.hero?.headline ?? "Tu SaaS aquí")}</h1>
    <p class="mx-auto mt-5 max-w-xl text-lg text-slate-600">${esc(d.hero?.subheadline ?? "")}</p>
    <a href="#cta" class="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-lg">Probar gratis →</a>
  </section>

  <section id="features" class="bg-slate-50 px-6 py-24">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-center font-display text-3xl font-bold sm:text-4xl">Todo lo que necesitas</h2>
      <div class="mt-12 grid gap-6 md:grid-cols-3">${features}</div>
    </div>
  </section>

  <section id="cta" class="px-6 py-20 text-center text-white" style="background:linear-gradient(135deg,#0b1e3f 0%,${accent} 100%)">
    <h2 class="font-display text-3xl font-bold sm:text-5xl">${esc(d.final_cta?.headline ?? "¿Listo para empezar?")}</h2>
    <a href="#" class="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 shadow-xl">${esc(d.final_cta?.button ?? "Probar gratis")} →</a>
  </section>

  <footer class="bg-slate-950 px-6 py-10 text-center text-sm text-white/60">© ${new Date().getFullYear()} ${esc(brand)}</footer>
  ${close()}`;
}
