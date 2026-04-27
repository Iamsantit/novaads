import { NextRequest, NextResponse } from "next/server";
import { PROVIDERS, isProviderConfigured } from "@/lib/oauth-providers";

export async function GET(req: NextRequest, { params }: { params: { provider: string } }) {
  const provider = PROVIDERS[params.provider];
  if (!provider) return NextResponse.json({ error: "unknown_provider" }, { status: 404 });

  const origin = new URL(req.url).origin;
  return NextResponse.json({
    id: provider.id,
    name: provider.name,
    configured: isProviderConfigured(provider.id),
    dashboardUrl: provider.setup.dashboardUrl,
    steps: provider.setup.steps,
    redirectUrl: `${origin}${provider.setup.redirectUriHint}`,
    clientIdEnv: provider.clientIdEnv,
    clientSecretEnv: provider.clientSecretEnv
  });
}
