# 🚀 Deploy a Vercel — La forma más rápida

Tu repo ya está en GitHub: **`Iamsantit/novaads`** y tienes `deploy.bat` que automatiza todo.

---

## ⚡ Vía rápida (recomendado): doble clic en `deploy.bat`

1. Abre el Explorador de Windows (`Win + E`)
2. Ve a `C:\Users\truji\Documents\Documents\pagina web AI`
3. **Doble clic en `deploy.bat`**
4. Se abre una ventana negra y hace 4 cosas en orden:

| Paso | Qué hace | ¿Necesita tu acción? |
|---|---|---|
| 1. Login Vercel | Te abre el navegador la primera vez | **SÍ — solo la primera vez**: clic "Continue with GitHub" en Vercel |
| 2. Link proyecto | Crea/vincula el proyecto en Vercel | No (auto) |
| 3. Sube env vars | Lee tu `.env.local` y sube todas las variables a Vercel | No (auto) |
| 4. Deploy producción | Construye y publica | No (auto) |

5. Al final imprime tu URL pública: `https://novaads-xxx.vercel.app`

A partir de ahí, **cada vez que ejecutes `deploy.bat` se redepliega**.

---

## Alternativa: vía dashboard (sin terminal)

Si prefieres clics en el navegador en lugar de batch:

1. Sube cambios a GitHub:
   ```bash
   git add .
   git commit -m "Listo para deploy"
   git push
   ```

2. Entra a **https://vercel.com/new** → "Import Git Repository" → busca `novaads` → **Import**

3. Configuración del proyecto (la única parte importante):
   - **Framework Preset**: Next.js (auto)
   - **Root Directory**: clic **"Edit"** y selecciona **`frontend`** ⚠️ ESTE ES EL ÚNICO PASO QUE NO PUEDES SALTAR
   - Build/Output: déjalo en blanco (lee `vercel.json`)

4. **Environment Variables** — copia y pega del archivo `frontend/.env.local`:

   | Nombre | Valor |
   |---|---|
   | `OPENAI_API_KEY` | sk-proj-... |
   | `GEMINI_API_KEY` | AIzaSy... |
   | `XAI_API_KEY` | xai-... |
   | `RESEND_API_KEY` | re_... |
   | `EMAIL_PROVIDER` | resend |
   | `EMAIL_FROM` | NovaAds <onboarding@resend.dev> |
   | `VERIFICATION_SECRET` | (tu valor) |
   | `STRIPE_SECRET_KEY` | sk_test_... (cuando lo saques) |

5. **Deploy** → 3-5 min y listo.

---

## ⚠️ Después del primer deploy, ACTUALIZAR estos lugares con tu URL pública

Cuando tengas tu URL (ej. `https://novaads.vercel.app`), actualiza:

### 1. Stripe webhooks
- Dashboard Stripe → Developers → Webhooks → Add endpoint
- URL: `https://novaads.vercel.app/api/stripe/webhook`
- Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_failed`
- Copia el `Signing secret` (`whsec_...`) → ponlo en Vercel env como `STRIPE_WEBHOOK_SECRET` y haz redeploy.

### 2. OAuth providers (Wix, Shopify, Meta, etc.)
- En cada plataforma donde creaste app, añade la nueva redirect URL:
  ```
  https://novaads.vercel.app/api/oauth/[provider]/callback
  ```

### 3. Resend (email)
- Si verificas un dominio propio en Resend → cambia `EMAIL_FROM` en Vercel a `noreply@tudominio.com`.

---

## 🌐 Conectar dominio propio (opcional)

1. Vercel → tu proyecto → **Settings → Domains → Add**
2. Pega tu dominio
3. Pega los 2 DNS records que te da Vercel en tu proveedor (Cloudflare, GoDaddy, Namecheap…)
4. Espera 5-15 min → tu app vive en `https://tudominio.com`

---

## El backend Express NO se despliega aquí

Tu carpeta `backend/` es un servidor Express tradicional. Si quieres usarlo, despliega aparte en Render, Fly.io o Railway, y pon la URL en Vercel como `NEXT_PUBLIC_BACKEND_URL`.

**Pero no es urgente:** Stripe, OAuth y la IA ya están integrados directo en Next.js.

---

## Si algo falla en el build

- Vercel te lleva al log → mira las últimas líneas, ahí está el error
- Errores típicos:
  - `Module not found` → falta dependencia
  - `Type error` → un tipo TS estricto
  - `Out of memory` → ya mitigado con `NODE_OPTIONS=--max-old-space-size=8192`
- Mándame el error exacto y lo resuelvo

---

## Checklist antes de pushear

- [x] `.env.local` NO está en git (verificado)
- [x] `node_modules/` excluido por `.gitignore`
- [x] `frontend/vercel.json` creado
- [x] `frontend/next.config.js` con `remotePatterns`
- [ ] Build local pasa sin errores (en proceso)

Ejecuta `deploy.bat` y en 5 minutos tu SaaS está online.
