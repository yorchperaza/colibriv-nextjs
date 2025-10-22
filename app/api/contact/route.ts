// app/api/contact/route.ts
import type { NextRequest } from "next/server";

const SITE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

async function verifyRecaptcha(token: string, expectedAction: string) {
  const secret = process.env.RECAPTCHA_SECRET!;
  const body = new URLSearchParams({ secret, response: token });

  const res = await fetch(SITE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await res.json();
  // data: { success, score, action, ... }
  if (!data?.success) return { ok: false, reason: "recaptcha_failed" };
  if (data.action && data.action !== expectedAction) {
    return { ok: false, reason: "recaptcha_action_mismatch" };
  }
  if (typeof data.score === "number" && data.score < 0.5) {
    return { ok: false, reason: "recaptcha_low_score" };
  }
  return { ok: true };
}

async function sendViaMailgun(form: Record<string, string>) {
  const domain = process.env.MAILGUN_DOMAIN!;
  const apiKey = process.env.MAILGUN_API_KEY!;
  const from = process.env.MAILGUN_FROM!;
  const to = process.env.MAILGUN_TO!;

  const subject = `[Contact] ${form.reason || "General"} — ${form.name || "Unknown"}`;
  const text = [
    `Name: ${form.name || ""}`,
    `Email: ${form.email || ""}`,
    `Company: ${form.company || ""}`,
    `Reason: ${form.reason || ""}`,
    "",
    form.message || "",
  ].join("\n");

  const body = new URLSearchParams({
    from,
    to,
    subject,
    text,
    "h:Reply-To": form.email || "",
  });

  const auth = Buffer.from(`api:${apiKey}`).toString("base64");
  const resp = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!resp.ok) {
    const errTxt = await resp.text();
    throw new Error(`Mailgun error: ${resp.status} ${errTxt}`);
  }
}

async function sendViaDrupalWebform(form: Record<string, string>) {
  // OPTIONAL alternative: forward to Drupal Webform REST.
  // Requires Webform + Webform REST + (optionally) reCAPTCHA module on Drupal.
  const base = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL?.replace(/\/$/, "")!;
  const webformId = "contact"; // change to your webform machine name

  // CSRF token (for cookie-less requests)
  const tokenResp = await fetch(`${base}/session/token`, { cache: "no-store" });
  if (!tokenResp.ok) throw new Error("Failed to get CSRF token");
  const csrf = await tokenResp.text();

  // Map fields to your webform element keys
  const payload = {
    webform_id: webformId,
    name: form.name || "",
    email: form.email || "",
    company: form.company || "",
    reason: form.reason || "",
    message: form.message || "",
  };

  const submitResp = await fetch(`${base}/webform_rest/submit/${webformId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf,
    },
    body: JSON.stringify(payload),
  });

  if (!submitResp.ok) {
    const err = await submitResp.text();
    throw new Error(`Drupal webform error: ${submitResp.status} ${err}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Basic honeypot
    if (data._hp_) return new Response("OK", { status: 200 });

    // Verify reCAPTCHA v3
    const token = data.grecaptchaToken as string | undefined;
    if (!token) return new Response("missing recaptcha", { status: 400 });
    const check = await verifyRecaptcha(token, "contact");
    if (!check.ok) return new Response(check.reason, { status: 400 });

    // Dispatch
    const destination = process.env.CONTACT_DESTINATION || "mailgun";
    if (destination === "drupal") {
      await sendViaDrupalWebform(data);
    } else {
      await sendViaMailgun(data);
    }

    return Response.json({ ok: true });
  } catch (e: any) {
    console.error("[/api/contact] error", e);
    return new Response("server_error", { status: 500 });
  }
}
