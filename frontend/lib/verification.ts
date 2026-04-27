import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * Pending-verification state kept in an httpOnly cookie, signed with HMAC.
 * 10-minute TTL.
 *
 * A second, separate cookie ("novaads_pending_hint") optionally stores the
 * plain code when the email send failed or we're in dev mode, so the UI can
 * show it to the user as a fallback. In production with a working email
 * provider this cookie is never set.
 */

const COOKIE = "novaads_pending";
const HINT_COOKIE = "novaads_pending_hint";
const TTL_SECONDS = 60 * 10;
const SECRET = process.env.VERIFICATION_SECRET ?? "dev-only-change-me-please";

export type Pending = {
  email: string;
  name?: string;
  plan?: string;
  interval?: "month" | "year";
  intent: "signup" | "login";
  codeHash: string;
  expiresAt: number;
  emailSent: boolean;
  emailError?: string;
};

export function generateCode(): string {
  return String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
}

function hashCode(code: string): string {
  return crypto.createHmac("sha256", SECRET).update(code).digest("hex");
}

function sign(data: string): string {
  return crypto.createHmac("sha256", SECRET).update(data).digest("hex").slice(0, 32);
}

function pack(p: Pending): string {
  const body = Buffer.from(JSON.stringify(p)).toString("base64url");
  const sig = sign(body);
  return `${body}.${sig}`;
}

function unpack(raw: string): Pending | null {
  const [body, sig] = raw.split(".");
  if (!body || !sig) return null;
  if (sign(body) !== sig) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Pending;
  } catch {
    return null;
  }
}

export function setPending(
  p: Omit<Pending, "codeHash" | "expiresAt" | "emailSent" | "emailError">,
  code: string,
  emailSent: boolean,
  emailError?: string
) {
  const full: Pending = {
    ...p,
    codeHash: hashCode(code),
    expiresAt: Date.now() + TTL_SECONDS * 1000,
    emailSent,
    emailError
  };
  cookies().set(COOKIE, pack(full), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: TTL_SECONDS
  });

  // Dev hint: store plain code if email didn't go out OR we're not in production.
  // This lets the user complete the flow even without a working email provider.
  const shouldRevealCode = !emailSent || process.env.NODE_ENV !== "production";
  if (shouldRevealCode) {
    cookies().set(HINT_COOKIE, code, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: TTL_SECONDS
    });
  } else {
    cookies().delete(HINT_COOKIE);
  }
}

export function getPending(): Pending | null {
  const raw = cookies().get(COOKIE)?.value;
  if (!raw) return null;
  const p = unpack(raw);
  if (!p) return null;
  if (p.expiresAt < Date.now()) return null;
  return p;
}

export function getDevHintCode(): string | null {
  return cookies().get(HINT_COOKIE)?.value ?? null;
}

export function clearPending() {
  cookies().delete(COOKIE);
  cookies().delete(HINT_COOKIE);
}

export function verifyCode(code: string): boolean {
  const p = getPending();
  if (!p) return false;
  return hashCode(code) === p.codeHash;
}
