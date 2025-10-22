// app/api/contact/route.ts
import type { NextRequest } from "next/server";

export const runtime = "nodejs"; // ensure Node runtime for outbound fetch

const SITE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const isProd = process.env.NODE_ENV === "production";

/* ---------------- utils ---------------- */

function badRequest(msg: string) {
  return new Response(msg, { status: 400 });
}
function internal(msg: string) {
  // Return less detail in prod, more in dev
  return new Response(isProd ? "server_error" : msg, { status: 500 });
}

/* ---------------- reCAPTCHA v3 ---------------- */

async function verifyRecaptcha(token: string, expectedAction: string) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return { ok: false as const, reason: "recaptcha_misconfigured" as const };

  const body = new URLSearchParams({ secret, response: token });

  const res = await fetch(SITE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    // recaptcha should never be cached
    cache: "no-store",
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    return { ok: false as const, reason: "recaptcha_parse_error" as const };
  }

  if (!data?.success) return { ok: false as const, reason: "recaptcha_failed" as const };
  if (data.action && data.action !== expectedAction) {
    return { ok: false as const, reason: "recaptcha_action_mismatch" as const };
  }
  if (typeof data.score === "number" && data.score < 0.5) {
    return { ok: false as const, reason: "recaptcha_low_score" as const };
  }
  return { ok: true as const };
}

/* ---------------- Monkeysmail ---------------- */

async function sendViaMonkeysmail(form: Record<string, string>) {
  const apiKey = process.env.MONKEYSMAIL_API_KEY;
  const fromEmail = process.env.MONKEYSMAIL_FROM_EMAIL;
  const fromName = process.env.MONKEYSMAIL_FROM_NAME || "ColibriV";
  const toCsv = process.env.MONKEYSMAIL_TO;
  const apiBase = process.env.MONKEYSMAIL_API_BASE || "https://smtp.monkeysmail.com";

  if (!apiKey) throw new Error("MONKEYSMAIL_API_KEY missing");
  if (!fromEmail) throw new Error("MONKEYSMAIL_FROM_EMAIL missing");
  if (!toCsv) throw new Error("MONKEYSMAIL_TO missing");

  const to = toCsv.split(",").map((s) => s.trim()).filter(Boolean);
  if (to.length === 0) throw new Error("MONKEYSMAIL_TO empty");

  const subject = `[Contact] ${form.reason || "General"} — ${form.name || "Unknown"}`;
  const text = [
    `Name: ${form.name || ""}`,
    `Email: ${form.email || ""}`,
    `Company: ${form.company || ""}`,
    `Reason: ${form.reason || ""}`,
    "",
    (form.message || "").trim(),
  ].join("\n");

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

  // Minimal payload per Monkeysmail docs
  const payload: any = {
    from: { email: fromEmail, name: fromName },
    to,
    subject,
    text,
    html,
    tags: ["contact-form"],
  };

  // Most providers accept this key; if Monkeysmail expects `replyTo`, try that instead:
  if (form.email) {
    payload.reply_to = form.email;
  }

  const url = `${apiBase.replace(/\/$/, "")}/messages/send`;

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const bodyText = await resp.text(); // always read the body so we can debug
  if (!resp.ok) {
    // try to parse json; otherwise keep text
    let details: unknown = bodyText;
    try {
      details = JSON.parse(bodyText);
    } catch {}

    // log full in server logs
    console.error("[Monkeysmail] non-OK", resp.status, details);

    // surface in dev to client, redact in prod
    const message = !isProd
      ? `monkeysmail_failed (${resp.status}): ${typeof details === "string" ? details : JSON.stringify(details)}`
      : "monkeysmail_failed";
    throw new Error(message);
  }
}

/* ---------------- Drupal Webform (optional) ---------------- */

async function sendViaDrupalWebform(form: Record<string, string>) {
  const base = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL?.replace(/\/$/, "");
  const webformId = process.env.DRUPAL_WEBFORM_ID || "contact";
  if (!base) throw new Error("DRUPAL BASE URL missing");

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

  const result = await submitResp.text();
  if (!submitResp.ok) {
    console.error("[Drupal webform] non-OK", submitResp.status, result);
    throw new Error(!isProd ? `drupal_failed (${submitResp.status}): ${result}` : "drupal_failed");
  }
}

/* ---------------- Route handler ---------------- */

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Honeypot
    if (data._hp_) return new Response("OK", { status: 200 });

    // basic field sanity
    if (!data.name || !data.email || !data.message) {
      return badRequest("missing_fields");
    }

    // reCAPTCHA v3
    const token = data.grecaptchaToken as string | undefined;
    if (!token) return badRequest("missing_recaptcha");
    const check = await verifyRecaptcha(token, "contact");
    if (!check.ok) return badRequest(check.reason);

    // where to send
    const destination = (process.env.CONTACT_DESTINATION || "monkeysmail").toLowerCase();

    if (destination === "drupal") {
      await sendViaDrupalWebform(data);
    } else if (destination === "monkeysmail") {
      await sendViaMonkeysmail(data);
    } else {
      return badRequest("invalid_destination");
    }

    return Response.json({ ok: true });
  } catch (e: any) {
    console.error("[/api/contact] error", e?.message || e, e?.stack);
    return internal(e?.message || "server_error");
  }
}
