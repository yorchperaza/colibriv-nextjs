// app/api/webhook/stripe/route.ts
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.colibriv.com"
const LOGO_URL = "https://www.colibriv.com/images/logo-colibriv.png"

// Stripe webhook secret - get from Stripe Dashboard
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

/* ---------------- Email Functions ---------------- */

async function sendEmail(options: {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}) {
  const apiKey = process.env.MONKEYSMAIL_API_KEY
  const fromEmail = process.env.MONKEYSMAIL_FROM_EMAIL || "no-reply@colibriv.com"
  const fromName = process.env.MONKEYSMAIL_FROM_NAME || "ColibriV"
  const apiBase = process.env.MONKEYSMAIL_API_BASE || "https://smtp.monkeysmail.com"

  if (!apiKey) {
    console.warn("MonkeysMail API key not configured, skipping email")
    return false
  }

  const toList = Array.isArray(options.to) ? options.to : [options.to]

  try {
    const response = await fetch(`${apiBase.replace(/\/$/, "")}/messages/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        from: { email: fromEmail, name: fromName },
        to: toList,
        subject: options.subject,
        html: options.html,
        text: options.text,
        reply_to: options.replyTo,
        tags: ["payment-confirmation"],
      }),
    })

    if (!response.ok) {
      console.error("Failed to send email:", await response.text())
      return false
    }
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

function createEmailTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <img src="${LOGO_URL}" alt="ColibriV" style="height:40px;width:auto;" />
    </div>
    <div style="background:#ffffff;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      ${content}
    </div>
    <div style="text-align:center;margin-top:32px;color:#64748b;font-size:12px;">
      <p style="margin:0 0 8px 0;">ColibriV, LLC — 6312 S Fiddlers Green Circle, Greenwood Village, CO 80111</p>
      <p style="margin:0;">
        <a href="${SITE_URL}/pre-launch" style="color:#dc2626;text-decoration:none;">Pre-Launch Campaign</a> · 
        <a href="${SITE_URL}/privacy" style="color:#64748b;text-decoration:none;">Privacy</a> · 
        <a href="${SITE_URL}/terms" style="color:#64748b;text-decoration:none;">Terms</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

async function sendAdminNotification(paymentData: {
  name: string
  email: string
  amount: number
  tierName: string
  isRefundable: boolean
  paymentIntentId: string
}) {
  const adminEmail = process.env.MONKEYSMAIL_TO || "jorge@colibriv.com"
  const paymentType = paymentData.isRefundable ? "Refundable Reservation" : "Campaign Support"
  
  const content = `
    <h2 style="margin:0 0 16px 0;color:#0f172a;font-size:24px;">✅ Payment Confirmed: ${paymentType}</h2>
    
    <div style="background:#f1f5f9;border-radius:8px;padding:16px;margin-bottom:24px;">
      <p style="margin:0 0 8px 0;font-size:32px;font-weight:bold;color:#dc2626;">
        $${(paymentData.amount / 100).toFixed(2)} USD
      </p>
      <p style="margin:0;color:#64748b;font-size:14px;">
        ${paymentData.tierName} ${paymentData.isRefundable ? '(Refundable)' : '(Non-refundable)'}
      </p>
    </div>
    
    <h3 style="margin:0 0 12px 0;color:#0f172a;font-size:16px;">Supporter Details</h3>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr>
        <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;width:120px;">Name</td>
        <td style="padding:8px 12px;border:1px solid #e2e8f0;">${paymentData.name}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;">Email</td>
        <td style="padding:8px 12px;border:1px solid #e2e8f0;">
          <a href="mailto:${paymentData.email}" style="color:#dc2626;">${paymentData.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;">Payment ID</td>
        <td style="padding:8px 12px;border:1px solid #e2e8f0;font-family:monospace;font-size:12px;">${paymentData.paymentIntentId}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;">Date</td>
        <td style="padding:8px 12px;border:1px solid #e2e8f0;">${new Date().toLocaleString("en-US", { timeZone: "America/Denver" })}</td>
      </tr>
    </table>
  `

  return sendEmail({
    to: adminEmail,
    subject: `✅ [ColibriV] Payment Confirmed: ${paymentType} - $${(paymentData.amount / 100).toFixed(2)} from ${paymentData.name}`,
    html: createEmailTemplate(content),
    replyTo: paymentData.email,
  })
}

async function sendUserConfirmation(paymentData: {
  name: string
  email: string
  amount: number
  tierName: string
  isRefundable: boolean
  paymentIntentId: string
}) {
  const isRefundable = paymentData.isRefundable
  const paymentType = isRefundable ? "Refundable Reservation" : "Campaign Support Contribution"
  
  const refundableMessage = isRefundable ? `
    <div style="background:#fef3c7;border:1px solid #fcd34d;border-radius:8px;padding:16px;margin:24px 0;">
      <p style="margin:0;color:#92400e;font-size:14px;">
        <strong>Refund Policy:</strong> Your reservation is fully refundable before our official campaign launch. 
        To request a refund, email <a href="mailto:refunds@colibriv.com" style="color:#dc2626;">refunds@colibriv.com</a>. 
        Refunds are processed within 7–10 business days.
      </p>
    </div>
  ` : `
    <div style="background:#f1f5f9;border-radius:8px;padding:16px;margin:24px 0;">
      <p style="margin:0;color:#475569;font-size:14px;">
        <strong>Note:</strong> Campaign support contributions are non-refundable and do not represent equity, ownership, or securities.
      </p>
    </div>
  `
  
  const content = `
    <h2 style="margin:0 0 8px 0;color:#0f172a;font-size:24px;">Thank you, ${paymentData.name}!</h2>
    <p style="margin:0 0 24px 0;color:#475569;font-size:16px;">
      Your ${paymentType.toLowerCase()} has been confirmed.
    </p>
    
    <div style="background:#f1f5f9;border-radius:8px;padding:20px;margin-bottom:24px;text-align:center;">
      <p style="margin:0 0 4px 0;color:#64748b;font-size:14px;">Amount</p>
      <p style="margin:0;font-size:36px;font-weight:bold;color:#0f172a;">
        $${(paymentData.amount / 100).toFixed(2)} USD
      </p>
      <p style="margin:8px 0 0 0;color:#64748b;font-size:14px;">${paymentData.tierName}</p>
    </div>
    
    ${refundableMessage}
    
    <h3 style="margin:24px 0 12px 0;color:#0f172a;font-size:16px;">What's Next?</h3>
    <ul style="margin:0 0 24px 0;padding-left:20px;color:#475569;">
      <li style="margin-bottom:8px;">You'll receive exclusive updates about our campaign progress</li>
      <li style="margin-bottom:8px;">Be the first to know when our official crowdfunding campaign launches</li>
      <li style="margin-bottom:8px;">Get early access to investor materials and documentation</li>
    </ul>
    
    <div style="text-align:center;margin-top:32px;">
      <a href="${SITE_URL}/pre-launch" style="display:inline-block;background:#dc2626;color:#ffffff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;">
        View Pre-Launch Campaign
      </a>
    </div>
    
    <p style="margin:32px 0 0 0;color:#64748b;font-size:14px;text-align:center;">
      Questions? Reply to this email or contact us at <a href="mailto:invest@colibriv.com" style="color:#dc2626;">invest@colibriv.com</a>
    </p>
  `

  return sendEmail({
    to: paymentData.email,
    subject: `✅ Payment Confirmed: Thank you for your ${isRefundable ? 'reservation' : 'support'} — ColibriV Pre-Launch`,
    html: createEmailTemplate(content),
  })
}

/* ---------------- Webhook Handler ---------------- */

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    console.error("[Stripe Webhook] No signature header")
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error("[Stripe Webhook] Signature verification failed:", err?.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    
    console.log(`[Stripe Webhook] Payment succeeded: ${paymentIntent.id}`)

    // Extract data from metadata
    const { tierName, customerName, customerEmail, isRefundable } = paymentIntent.metadata

    if (customerName && customerEmail) {
      const paymentData = {
        name: customerName,
        email: customerEmail,
        amount: paymentIntent.amount,
        tierName: tierName || "Pre-Launch",
        isRefundable: isRefundable === "true",
        paymentIntentId: paymentIntent.id,
      }

      // Send both emails
      const [adminResult, userResult] = await Promise.all([
        sendAdminNotification(paymentData),
        sendUserConfirmation(paymentData),
      ])

      console.log(`[Stripe Webhook] Emails sent - Admin: ${adminResult}, User: ${userResult}`)
    } else {
      console.warn("[Stripe Webhook] Missing customer data in metadata")
    }
  }

  return NextResponse.json({ received: true })
}
