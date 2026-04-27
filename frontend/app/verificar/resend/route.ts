import { NextResponse } from "next/server";
import { clearPending, generateCode, getPending, setPending } from "@/lib/verification";
import { sendEmail, verificationEmailTemplate } from "@/lib/email";

export async function POST(req: Request) {
  const pending = getPending();
  if (!pending) {
    clearPending();
    return NextResponse.redirect(new URL("/registro?err=expired", req.url), 303);
  }

  const code = generateCode();
  const tpl = verificationEmailTemplate(code, pending.name);
  const result = await sendEmail({
    to: pending.email,
    subject: tpl.subject,
    html: tpl.html,
    text: tpl.text
  });

  setPending(
    {
      email: pending.email,
      name: pending.name,
      intent: pending.intent,
      plan: pending.plan,
      interval: pending.interval
    },
    code,
    result.ok,
    result.error
  );

  return NextResponse.redirect(new URL("/verificar?resent=1", req.url), 303);
}
