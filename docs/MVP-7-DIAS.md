# MVP en 7 días

Regla de oro: **lanza algo que cobre antes del día 7**. Todo lo demás se itera con usuarios reales.

## Día 1 — Landing + waitlist

- Deploy del frontend en Vercel (lo que está en `/frontend` ya sirve).
- Conecta dominio (`novaads.ai` o similar).
- Botón "Empezar gratis" → formulario simple de email (Supabase, Formspree o EmailOctopus).
- Meta: 100 emails en waitlist antes de escribir una línea de código de producto.

**Atajo:** si aún no tienes Stripe, haz que los CTAs disparen el formulario de waitlist.

## Día 2 — Orquestador mínimo (un solo módulo)

- Arranca el backend. Expón sólo `POST /api/generate` con el módulo `landing`.
- Sin auth. Sin suscripción. Sólo rate-limit por IP.
- Cobra **manual**: pide email, genera, envía por Gmail.
- Meta: vender 3 generaciones a $9 cada una.

## Día 3 — Stripe Checkout

- Crea 3 productos × 2 intervalos en Stripe test mode.
- Conecta `/api/stripe/checkout` y `/api/stripe/webhook`.
- Deploy backend en Fly.io o Render.
- Meta: que un extraño pueda comprar sin que tú toques nada.

## Día 4 — Multi-módulo + SSE

- Activa `funnel`, `ads`, `pitch` en el orquestador (texto puro, sin imágenes).
- Conecta SSE al dashboard: el usuario ve los 4 módulos generarse en vivo.
- Cierra imágenes/video con "próximamente" para no quemar el presupuesto de OpenAI antes de validar.

## Día 5 — Imágenes (DALL·E)

- Activa el módulo `images` sólo para plan Pro y Premium.
- Sube a Cloudflare R2 para no depender del URL efímero de OpenAI.
- Meta: primer usuario paga el plan Pro por las imágenes.

## Día 6 — Onboarding + dashboard

- Flujo post-pago: Stripe `success_url` → `/dashboard?welcome=1` → primer prompt pre-cargado.
- Historial de generaciones (`SELECT * FROM generations WHERE user_id = $1`).
- Botón "Cancelar suscripción" → Customer Portal (Stripe lo hace todo).

## Día 7 — Lanzamiento

- Post en ProductHunt, IndieHackers, X, Reddit (r/SaaS, r/Entrepreneur), LinkedIn.
- Email a la waitlist del día 1 con código de 50% OFF primer mes.
- Watchers: Sentry para errores, Stripe para conversiones, PostHog para funnel.

## Qué recortar (si no te da)

| Bajar prioridad              | Razón                                                |
|------------------------------|------------------------------------------------------|
| Video (Runway)               | Caro y lento. El texto del guion basta para el MVP. |
| Multi-idioma                 | Arranca en español, agrega inglés en semana 2.       |
| API pública                  | Se activa cuando haya >100 usuarios pagados.         |
| Workspaces multi-marca       | Sólo Premium, semana 3+.                             |
| Export a Shopify automático  | Día 1 es HTML descargable. El conector directo va después. |

## Métricas del día 7 para seguir adelante

- ≥ 20 signups trial
- ≥ 3 conversiones a plan pagado (después de trial, semana 3)
- ≥ $100 MRR proyectado

Si estos números no se cumplen, **no escales**: itera hook, precio y segmento antes de meterle más código.
