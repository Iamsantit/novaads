import { cookies } from "next/headers";

/**
 * Lightweight demo session.
 * Swap for Auth.js / Clerk / Supabase Auth in production.
 * The cookie is httpOnly, 7 days, not signed — fine for demo, NOT for prod.
 */

const COOKIE = "novaads_session";
const MAX_AGE = 60 * 60 * 24 * 7;

export type Session = {
  email: string;
  name?: string;
  plan?: "basic" | "pro" | "premium" | "trial";
};

export function setSession(session: Session) {
  cookies().set(COOKIE, encodeURIComponent(JSON.stringify(session)), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE
  });
}

export function clearSession() {
  cookies().delete(COOKIE);
}

export function getSession(): Session | null {
  const raw = cookies().get(COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as Session;
  } catch {
    return null;
  }
}
