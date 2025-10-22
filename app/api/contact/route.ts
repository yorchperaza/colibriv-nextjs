// app/api/contact/route.ts
import type { NextRequest } from "next/server";

const SITE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

/* ---------------- reCAPTCHA v3 ---------------- */

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
  if (!data?.success) return { ok: false, reason: "recaptcha_failed" as const };
  if (data.action && data.action !== expectedAction) {
    return { ok: false, reason: "recaptcha_action_mismatch" as const };
  }
  if (typeof data.score === "number" && data.score < 0.5) {
    return { ok: false, reason: "recaptcha_low_score" as const };
  }
  return { ok: true as const };
}

/* ---------------- Monkeysmail ---------------- */

async function sendViaMonkeysmail(form: Record<string, string>) {
  const apiKey = process.env.MONKEYSMAIL_API_KEY!;
  const fromEmail = process.env.MONKEYSMAIL_FROM_EMAIL!; // e.g. no-reply@colibriv.com
  const fromName = process.env.MONKEYSMAIL_FROM_NAME || "ColibriV";
  const toCsv = process.env.MONKEYSMAIL_TO!; // can be a single email or CSV
  const apiBase = process.env.MONKEYSMAIL_API_BASE || "https://smtp.monkeysmail.com";

  const to = toCsv.split(",").map((s) => s.trim()).filter(Boolean);

  const subject = `[Contact] ${form.reason || "General"} — ${form.name || "Unknown"}`;

  const lines = [
    `Name: ${form.name || ""}`,
    `Email: ${form.email || ""}`,
    `Company: ${form.company || ""}`,
    `Reason: ${form.reason || ""}`,
    "",
    (form.message || "").trim(),
  ];
  const text = lines.join("\n");

  // Simple HTML body (kept lightweight and readable)
  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.45;color:#0f172a">
      <h2 style="margin:0 0 8px 0">New contact submission</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px;margin:8px 0">
        <tbody>
          ${[
    ["Name", form.name || ""],
    ["Email", form.email || ""],
    ["Company", form.company || ""],
    ["Reason", form.reason || ""],
  ]
    .map(
      ([k, v]) => `
            <tr>
              <td style="padding:6px 8px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600">${k}</td>
              <td style="padding:6px 8px;border:1px solid #e2e8f0">${(v || "").toString()}</td>
            </tr>`
    )
    .join("")}
        </tbody>
      </table>
      <div style="margin-top:12px;padding:10px;border:1px solid #e2e8f0;background:#f1f5f9;white-space:pre-wrap">${(form.message || "").trim()}</div>
    </div>
  `.trim();

  const payload = {
    from: { email: fromEmail, name: fromName },
    to,
    subject,
    text, // always include a text fallback
    html,
    // optional metadata:
    tags: ["contact-form"],
    // Many providers support reply-to like this; keeping the key as common name:
    reply_to: form.email || undefined,
  };

  const resp = await fetch(`${apiBase}/messages/send?mode=sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  // Monkeysmail returns JSON; treat non-2xx as failure
  if (!resp.ok) {
    let err: unknown;
    try {
      err = await resp.text();
    } catch {
      err = `HTTP ${resp.status}`;
    }
    throw new Error(`Monkeysmail error: ${resp.status} ${String(err)}`);
  }
}

/* ---------------- Drupal Webform (optional) ---------------- */

async function sendViaDrupalWebform(form: Record<string, string>) {
  const base = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL?.replace(/\/$/, "")!;
  const webformId = process.env.DRUPAL_WEBFORM_ID || "contact"; // change if needed

  // CSRF token for cookie-less POST
  const tokenResp = await fetch(`${base}/session/token`, { cache: "no-store" });
  if (!tokenResp.ok) throw new Error("Failed to get CSRF token");
  const csrf = await tokenResp.text();

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

/* ---------------- Route handler ---------------- */

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Honeypot
    if (data._hp_) return new Response("OK", { status: 200 });

    // reCAPTCHA v3
    const token = data.grecaptchaToken as string | undefined;
    if (!token) return new Response("missing recaptcha", { status: 400 });
    const check = await verifyRecaptcha(token, "contact");
    if (!check.ok) return new Response(check.reason, { status: 400 });

    // Dispatch destination
    const destination = process.env.CONTACT_DESTINATION || "monkeysmail";
    if (destination === "drupal") {
      await sendViaDrupalWebform(data);
    } else {
      await sendViaMonkeysmail(data);
    }

    return Response.json({ ok: true });
  } catch (e: any) {
    console.error("[/api/contact] error", e);
    return new Response("server_error", { status: 500 });
  }
}
