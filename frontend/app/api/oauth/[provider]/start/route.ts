import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PROVIDERS, isProviderConfigured } from "@/lib/oauth-providers";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: { provider: string } }) {
  const id = params.provider;
  const provider = PROVIDERS[id];
  const origin = new URL(req.url).origin;

  if (!provider) {
    return NextResponse.redirect(`${origin}/dashboard/paginas?err=unknown_provider`, 303);
  }

  if (!isProviderConfigured(id)) {
    // Send user back to the connector list with ?setup=<id>, so the UI can
    // open the setup modal with step-by-step instructions.
    return NextResponse.redirect(`${origin}/dashboard/paginas?setup=${id}`, 303);
  }

  const clientId = process.env[provider.clientIdEnv]!;
  const redirectUri = `${origin}/api/oauth/${id}/callback`;
  const state = crypto.randomBytes(16).toString("hex");

  const res = NextResponse.redirect(
    provider.authUrl({ clientId, redirectUri, state }),
    303
  );
  // CSRF protection — we verify this on callback
  res.cookies.set(`oauth_state_${id}`, state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600
  });
  return res;
}
