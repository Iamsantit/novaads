"use server";

import { redirect } from "next/navigation";
import { generateCode, setPending } from "@/lib/verification";
import { sendEmail, verificationEmailTemplate } from "@/lib/email";

export async function signupAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const plan = (String(formData.get("plan") ?? "") || undefined) as string | undefined;
  const interval = (String(formData.get("interval") ?? "") || undefined) as "month" | "year" | undefined;

  if (!email.includes("@") || password.length < 6) {
    redirect("/registro?err=validation");
  }

  const code = generateCode();
  const tpl = verificationEmailTemplate(code, name);
  const result = await sendEmail({ to: email, subject: tpl.subject, html: tpl.html, text: tpl.text });

  setPending(
    { email, name, intent: "signup", plan, interval },
    code,
    result.ok,
    result.error
  );

  redirect("/verificar");
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email.includes("@") || password.length < 6) {
    redirect("/iniciar-sesion?err=validation");
  }

  const code = generateCode();
  const tpl = verificationEmailTemplate(code);
  const result = await sendEmail({ to: email, subject: tpl.subject, html: tpl.html, text: tpl.text });

  setPending(
    { email, intent: "login" },
    code,
    result.ok,
    result.error
  );

  redirect("/verificar");
}
