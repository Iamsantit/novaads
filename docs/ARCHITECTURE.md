# Arquitectura

## Diagrama alto nivel

```
 ┌──────────────┐     HTTPS      ┌──────────────┐
 │  Next.js 14  │ ─────────────▶ │  Express API │
 │  (Vercel)    │ ◀───── SSE ─── │  (Fly/Render)│
 └──────┬───────┘                └──────┬───────┘
        │                               │
        │ redirect (303)                ├──▶ PostgreSQL (Neon / Supabase)
        ▼                               │
 ┌──────────────┐                       ├──▶ Stripe (Checkout, Billing Portal, Webhooks)
 │    Stripe    │◀──────────────────────┤
 │   Checkout   │                       ├──▶ OpenAI (gpt-4o-mini, DALL·E 3)
 └──────────────┘                       │
                                        └──▶ Redis (cache de briefs + rate limit global)
```

## Flujo de suscripción

1. Usuario hace clic en "Empezar gratis 14 días" → `/api/checkout?plan=pro&interval=year`
2. Next API handler llama al backend → `POST /api/stripe/checkout` → crea `checkout.session` con `trial_period_days: 14` y `payment_method_collection: "always"`.
3. Stripe devuelve `session.url`. El cliente hace redirect 303.
4. Al completar, Stripe dispara 3 webhooks clave:
   - `checkout.session.completed` → crear/actualizar `users` y `subscriptions`.
   - `customer.subscription.updated` → mantener `status` sincronizado.
   - `invoice.payment_failed` → flag + email al usuario.
5. El middleware `requireSubscription` acepta sólo `trialing` o `active`.

## Flujo del prompt único (orquestador)

```
POST /api/generate { prompt }
  │
  ├─ requireAuth  (JWT)
  ├─ requireSubscription (status ∈ {trialing, active})
  │
  ▼
orchestrate()
  1. briefAgent(prompt) → JSON estructurado {niche, audience, tone, offer, ...}
  2. Promise.allSettled([
       landingAgent(brief),
       funnelAgent(brief),
       adsAgent(brief),
       imagesAgent(brief),   // DALL·E 3 × 3 en paralelo
       videoAgent(brief),
       pitchAgent(brief)
     ])
  3. Cada módulo emite module_start / module_done / module_error por SSE
  4. Evento "complete" al finalizar
```

El `brief` centraliza decisiones (tono, paleta, arquetipo de cliente) para que los 6 outputs sean **coherentes entre sí**. Esto es lo que separa NovaAds de un wrapper genérico de ChatGPT.

## Seguridad

| Vector | Mitigación |
|--------|-----------|
| Inyección de prompt | El `briefAgent` aísla input del usuario; outputs forzados a JSON schema |
| Abuso de API | Rate limit por IP (60 rpm) + quota mensual por `user_id` en `usage_monthly` |
| Pagos fraudulentos | Tarjeta obligatoria antes de trial + 3D Secure automático en Stripe |
| Fuga de secretos | `.env` fuera de git, rotación de `JWT_SECRET` y `STRIPE_WEBHOOK_SECRET` |
| Webhook spoofing | `stripe.webhooks.constructEvent` con firma verificada + raw body |
| CSRF | Cookies `SameSite=Lax`; JWT en `Authorization` header |
| XSS | Content rendered via React + `helmet`'s CSP en producción |

## Escalabilidad

- **Stateless API**: Express corre tras un load balancer. Sesiones en JWT, no en memoria.
- **Base de datos**: Postgres con índice `(user_id, created_at DESC)` en `generations` para el dashboard.
- **Colas para imágenes/video**: mover DALL·E y Runway a un worker (BullMQ sobre Redis) cuando > 50 req/min.
- **CDN**: Vercel ya sirve el frontend por edge. Imágenes generadas se suben a R2/S3 y se sirven desde Cloudflare.
- **Costo OpenAI**: cachear el `brief` por hash(prompt) en Redis para re-generaciones.

## Optimización de costos IA

| Módulo | Modelo | Tokens típicos | Costo estimado |
|--------|--------|---------------:|---------------:|
| brief  | gpt-4o-mini | ~400 in / 300 out | $0.0003 |
| landing| gpt-4o-mini | ~700 in / 1500 out | $0.0012 |
| funnel | gpt-4o-mini | ~700 in / 1800 out | $0.0014 |
| ads    | gpt-4o-mini | ~700 in / 1400 out | $0.0011 |
| video  | gpt-4o-mini | ~700 in / 1200 out | $0.0010 |
| pitch  | gpt-4o-mini | ~700 in / 1600 out | $0.0013 |
| images | DALL·E 3 × 3 | — | $0.12 |
| **Total por generación** | | | **≈ $0.13** |

→ Plan Pro ($49/mes) soporta 300 generaciones completas/mes con margen bruto ~80%.

## Stack de despliegue recomendado

- Frontend → **Vercel** (edge, ISR, analytics gratis)
- Backend → **Fly.io** o **Render** (healthchecks, SSL, fácil scaling)
- Postgres → **Neon** (branching por PR) o **Supabase**
- Redis → **Upstash** (serverless, paga por request)
- Storage (imágenes generadas) → **Cloudflare R2** (sin egreso)
- Observabilidad → **Sentry** (errores) + **Axiom** o **Better Stack** (logs)
- DNS / WAF → **Cloudflare**
