import { NextRequest, NextResponse } from "next/server";
import { PROVIDERS } from "@/lib/oauth-providers";

export const runtime = "nodejs";

/**
 * OAuth callback: verifies the state, exchanges the code for an access token,
 * stores a "connected" flag so the dashboard can reflect it.
 *
 * NOTE: for production you would persist the access_token encrypted in your DB,
 * keyed by user_id. Here we store a simple "connected" cookie for the demo.
 */
export async function GET(req: NextRequest, { params }: { params: { provider: string } }) {
  const id = params.provider;
  const provider = PROVIDERS[id];
  const origin = new URL(req.url).origin;
  const { searchParams } = new URL(req.url);

  if (!provider) {
    return NextResponse.redirect(`${origin}/dashboard/paginas?err=unknown_provider`, 303);
  }

  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const savedState = req.cookies.get(`oauth_state_${id}`)?.value;

  if (!code || !state || state !== savedState) {
    return NextResponse.redirect(`${origin}/dashboard/paginas?err=state_mismatch`, 303);
  }

  const clientId = process.env[provider.clientIdEnv];
  const clientSecret = process.env[provider.clientSecretEnv];
  if (!clientId || !clientSecret || !provider.tokenUrl) {
    return NextResponse.redirect(`${origin}/dashboard/paginas?err=missing_config`, 303);
  }

  // Exchange code for token (provider-specific body)
  try {
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: `${origin}/api/oauth/${id}/callback`
    });

    const tokenRes = await fetch(provider.tokenUrl, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", accept: "application/json" },
      body
    });

    if (!tokenRes.ok) {
      const detail = await tokenRes.text();
      console.error(`[oauth:${id}] token exchange failed:`, tokenRes.status, detail);
      return NextResponse.redirect(`${origin}/dashboard/paginas?err=token_failed`, 303);
    }

    // TODO: persist token server-side (DB, encrypted). For demo we only flag connected.
    const res = NextResponse.redirect(`${origin}/dashboard/paginas?connected=${id}`, 303);
    res.cookies.set(`oauth_connected_${id}`, "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    });
    res.cookies.delete(`oauth_state_${id}`);
    return res;
  } catch (err) {
    console.error(`[oauth:${id}] callback crashed:`, err);
    return NextResponse.redirect(`${origin}/dashboard/paginas?err=callback_crash`, 303);
  }
}
