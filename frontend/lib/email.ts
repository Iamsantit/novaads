/**
 * Multi-provider email sender.
 * Provider is selected via EMAIL_PROVIDER env var. Supported:
 *   - resend  (default if RESEND_API_KEY is set)
 *   - gmail   (Gmail SMTP with App Password)
 *   - smtp    (generic SMTP — any provider)
 *   - console (dev mode, logs to stdout only)
 *
 * Always returns { ok, error? } so callers can decide what to show.
 */

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

type SendResult = {
  ok: boolean;
  error?: string;
};

type ProviderId = "resend" | "gmail" | "smtp" | "console";

function pickProvider(): ProviderId {
  const forced = (process.env.EMAIL_PROVIDER ?? "").toLowerCase() as ProviderId;
  if (forced === "resend" || forced === "gmail" || forced === "smtp" || forced === "console") {
    return forced;
  }
  // Auto-detect
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) return "gmail";
  if (process.env.SMTP_HOST) return "smtp";
  if (process.env.RESEND_API_KEY) return "resend";
  return "console";
}

const FROM = process.env.EMAIL_FROM ?? "NovaAds <onboarding@resend.dev>";

export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const provider = pickProvider();
  try {
    switch (provider) {
      case "resend":
        return await sendResend(args);
      case "gmail":
        return await sendSmtp({ ...args, gmail: true });
      case "smtp":
        return await sendSmtp(args);
      case "console":
      default:
        console.log("\n================== 📧 EMAIL (console dev) ==================");
        console.log("From:   ", FROM);
        console.log("To:     ", args.to);
        console.log("Subject:", args.subject);
        console.log("=============================================================\n");
        return { ok: true };
    }
  } catch (err) {
    const msg = (err as Error).message;
    console.error(`[email:${provider}] send crashed:`, msg);
    return { ok: false, error: `${provider}: ${msg}` };
  }
}

/* ---------- Resend ---------- */
async function sendResend({ to, subject, html, text }: SendArgs): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY!;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({ from: FROM, to, subject, html, text })
  });
  if (!res.ok) {
    const detail = await res.text();
    console.error(`[email:resend] ${res.status}:`, detail);
    return { ok: false, error: `Resend ${res.status}: ${detail.slice(0, 300)}` };
  }
  console.log(`[email:resend] ✉️  sent to ${to}`);
  return { ok: true };
}

/* ---------- SMTP / Gmail (Nodemailer) ---------- */
type SmtpArgs = SendArgs & { gmail?: boolean };

async function sendSmtp({ to, subject, html, text, gmail }: SmtpArgs): Promise<SendResult> {
  // Lazy import so builds don't require nodemailer when not used.
  const nodemailer = (await import("nodemailer")).default;

  const transporter = gmail
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER!,
          pass: process.env.GMAIL_APP_PASSWORD!
        }
      })
    : nodemailer.createTransport({
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT ?? 587) === 465,
        auth: {
          user: process.env.SMTP_USER!,
          pass: process.env.SMTP_PASSWORD!
        }
      });

  const from = gmail
    ? process.env.EMAIL_FROM ?? `NovaAds <${process.env.GMAIL_USER}>`
    : FROM;

  try {
    const info = await transporter.sendMail({ from, to, subject, html, text });
    console.log(`[email:${gmail ? "gmail" : "smtp"}] ✉️  sent to ${to} (id: ${info.messageId})`);
    return { ok: true };
  } catch (err) {
    const msg = (err as Error).message;
    console.error(`[email:${gmail ? "gmail" : "smtp"}] failed:`, msg);
    return { ok: false, error: msg };
  }
}

/* ---------- Template ---------- */
export function verificationEmailTemplate(code: string, name?: string) {
  const greeting = name ? `Hola ${name},` : "Hola,";
  const html = `
  <div style="font-family:Inter,Arial,sans-serif;background:#f6f8fb;padding:32px">
    <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:40px;box-shadow:0 10px 40px -12px rgba(11,30,63,0.15)">
      <div style="background:linear-gradient(135deg,#1f5398,#1cc5e7);color:white;font-weight:700;font-size:20px;border-radius:12px;padding:12px 18px;display:inline-block">NovaAds</div>
      <h1 style="font-size:24px;color:#0b1e3f;margin-top:28px">Tu código de verificación</h1>
      <p style="color:#475569;line-height:1.5">${greeting} usa este código para continuar. Expira en 10 minutos.</p>
      <div style="font-size:34px;font-weight:800;letter-spacing:10px;color:#0b1e3f;background:#eef6fa;border:2px solid #1cc5e7;border-radius:14px;padding:20px;text-align:center;margin:24px 0">${code}</div>
      <p style="color:#94a3b8;font-size:12px">Si no solicitaste este código, ignora este email.</p>
    </div>
    <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:16px">© NovaAds</p>
  </div>`;
  const text = `${greeting}\n\nTu código de verificación NovaAds: ${code}\nExpira en 10 minutos.`;
  return { html, text, subject: `Tu código NovaAds: ${code}` };
}
