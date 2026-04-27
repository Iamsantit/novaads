"use server";

import { redirect } from "next/navigation";
import { clearPending, generateCode, getPending, setPending, verifyCode } from "@/lib/verification";
import { setSession } from "@/lib/session";
import { sendEmail, verificationEmailTemplate } from "@/lib/email";

export async function verifyAction(formData: FormData) {
  const code = String(formData.get("code") ?? "").replace(/\s/g, "");
  if (code.length !== 6) redirect("/verificar?err=format");

  const pending = getPending();
  if (!pending) redirect("/registro?err=expired");

  if (!verifyCode(code)) {
    redirect("/verificar?err=invalid");
  }

  setSession({
    email: pending.email,
    name: pending.name,
    plan: "trial"
  });
  clearPending();

  redirect("/dashboard?welcome=1");
}

export async function resendCodeAction() {
  const pending = getPending();
  if (!pending) redirect("/registro?err=expired");

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

  redirect("/verificar?resent=1");
}
