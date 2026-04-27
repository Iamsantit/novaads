# NovaAds — Un prompt, todo tu marketing

SaaS que toma **un solo prompt** ("Quiero vender ropa deportiva para mujeres") y genera en minutos:

- 🧱 Landing page optimizada para conversión
- 🔁 Funnel completo (captura → ventas → checkout → gracias → emails)
- 📣 Campañas publicitarias con segmentación
- 🖼️ Creatividades e imágenes
- 🎬 Guion y storyboard de video
- 📊 Pitch deck para inversores

## Stack

| Capa        | Tecnología |
|-------------|-----------|
| Frontend    | Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion, Lucide |
| Backend     | Node.js + Express (TypeScript), JWT, Zod |
| Pagos       | Stripe (Checkout + Customer Portal + Webhooks) con trial de 14 días |
| IA          | OpenAI (gpt-4o-mini / gpt-4o), DALL·E 3; hooks listos para Runway |
| Datos       | PostgreSQL (schema incluido en `backend/src/db/schema.sql`) |
| Moneda      | Detección por IP + conversión en vivo; cobro en USD |
| Streaming   | Server-Sent Events para ver los 6 módulos generarse en paralelo |

## Estructura

```
pagina web AI/
├── frontend/              Next.js 14 — landing + dashboard
│   ├── app/               Rutas (App Router) + API checkout
│   ├── components/        Hero, Features, Pricing, FAQ, etc. (animados)
│   ├── lib/currency.ts    Detección país + formateo moneda local
│   └── public/            Logo + favicon SVG
├── backend/               Express + TypeScript
│   └── src/
│       ├── index.ts       Bootstrap (helmet, cors, rate-limit)
│       ├── routes/        stripe, auth, generate (SSE)
│       ├── services/      orchestrator, openai, currency
│       ├── middleware/    requireAuth, requireSubscription
│       └── db/schema.sql  Postgres: users, subscriptions, generations
└── docs/
    ├── ARCHITECTURE.md    Arquitectura, flujo de datos, seguridad, escalado
    ├── MVP-7-DIAS.md      Plan día-por-día para lanzar en 7 días
    └── PITCH.md           Pitch de inversores (problema → ask)
```

## Arrancar en local

### 1. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local       # apunta NEXT_PUBLIC_BACKEND_URL a tu API
npm run dev                      # http://localhost:3000
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env             # llena Stripe, OpenAI, Postgres
psql $DATABASE_URL -f src/db/schema.sql
npm run dev                      # http://localhost:4000
```

### 3. Stripe webhooks (dev)

```bash
stripe login
stripe listen --forward-to localhost:4000/api/stripe/webhook
# Copia el whsec_... que te imprime → STRIPE_WEBHOOK_SECRET en .env
```

Luego crea **3 productos × 2 intervalos** en Stripe (`basic/pro/premium` × `month/year`) y pega los `price_...` en las variables de entorno.

## Modelos y precios

| Plan      | Mensual | Anual | Precio anual/mes |
|-----------|--------:|------:|-----------------:|
| Básico    | $19     | $190  | $15.83           |
| Pro       | $49     | $490  | $40.83           |
| Premium   | $99     | $990  | $82.50           |

- **Trial 14 días** en todos los planes. Tarjeta obligatoria → conversión silenciosa.
- **Precios localizados**: detectamos el país (ipapi) y convertimos USD → moneda local para display. El cobro real es en USD vía Stripe al tipo de cambio del día.

## Flujo del prompt único

```
Usuario: "Curso online de yoga para madres primerizas, 120 USD, LatAm"
            │
            ▼
   [ Orchestrator ]
            │ 1. BRIEF agent extrae: niche, audience, tone, offer, cta, visual_style
            │ 2. Fan-out a 6 agentes en paralelo (Promise.allSettled)
            ▼
   ┌────────┬────────┬────────┬────────┬────────┬────────┐
   │ Landing│ Funnel │  Ads   │ Images │ Video  │ Pitch  │
   │ (LLM)  │ (LLM)  │ (LLM)  │(DALL·E)│ (LLM)  │ (LLM)  │
   └────────┴────────┴────────┴────────┴────────┴────────┘
            │
            ▼
     SSE stream → UI muestra progreso por módulo
```

## Seguridad / producción

- `helmet` para headers, `cors` restringido al frontend, rate-limit 60 rpm.
- JWT 7 días; reemplaza con Auth.js/Clerk en producción.
- Webhooks de Stripe con verificación de firma — **nunca usar raw JSON sin verificar**.
- No se commitea ningún secreto: `.env.example` es el único contrato.

## Branding

- **Nombre**: NovaAds (según logo provisto)
- **Paleta**: Navy `#0B1E3F`, Cyan `#1CC5E7`
- **Tipografía**: Sora (display) + Inter (body)
- **Tagline**: "Un prompt. Todo tu marketing. En minutos."

## Próximos pasos

Ver [`docs/MVP-7-DIAS.md`](docs/MVP-7-DIAS.md) para el plan día-a-día.

---

© NovaAds · Hecho para lanzar rápido.
