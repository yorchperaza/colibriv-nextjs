import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { promises as fs } from "fs"
import path from "path"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.colibriv.com"
const LOGO_URL = `${SITE_URL}/logo.svg`

// Shared email sending function via MonkeysMail
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
        tags: ["payment-notification"],
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

// Create branded email template
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
    <!-- Header with Logo -->
    <div style="text-align:center;margin-bottom:32px;">
      <img src="${LOGO_URL}" alt="ColibriV" style="height:40px;width:auto;" />
    </div>
    
    <!-- Main Content -->
    <div style="background:#ffffff;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      ${content}
    </div>
    
    <!-- Footer -->
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

// Send notification email to admin (jorge@colibriv.com)
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
    <h2 style="margin:0 0 16px 0;color:#0f172a;font-size:24px;">New ${paymentType}</h2>
    
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
    subject: `[ColibriV] New ${paymentType} - $${(paymentData.amount / 100).toFixed(2)} from ${paymentData.name}`,
    html: createEmailTemplate(content),
    replyTo: paymentData.email,
  })
}

// Send confirmation email to user
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
      Your ${paymentType.toLowerCase()} has been received.
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
    subject: `Thank you for your ${isRefundable ? 'reservation' : 'support'} — ColibriV Pre-Launch`,
    html: createEmailTemplate(content),
  })
}

// Combined function to send both emails
async function sendPaymentEmails(paymentData: {
  name: string
  email: string
  amount: number
  tierName: string
  isRefundable: boolean
  paymentIntentId: string
}) {
  // Send both emails in parallel
  const [adminResult, userResult] = await Promise.all([
    sendAdminNotification(paymentData),
    sendUserConfirmation(paymentData),
  ])
  
  console.log(`[Payment Emails] Admin: ${adminResult ? 'sent' : 'failed'}, User: ${userResult ? 'sent' : 'failed'}`)
  return { adminResult, userResult }
}

// Function to save payment record to JSON file, grouped by type
async function savePaymentRecord(paymentData: {
  name: string
  email: string
  amount: number
  tierName: string
  isRefundable: boolean
  paymentIntentId: string
  timestamp: string
}) {
  const dataDir = path.join(process.cwd(), "data")
  const filePath = path.join(dataDir, "payments.json")

  try {
    // Ensure data directory exists
    await fs.mkdir(dataDir, { recursive: true })

    // Define the grouped structure
    interface PaymentRecord {
      name: string
      email: string
      amount: number
      tierName: string
      paymentIntentId: string
      timestamp: string
    }
    
    interface PaymentsData {
      refundable_reservations: PaymentRecord[]
      campaign_support: PaymentRecord[]
    }

    // Read existing payments or create empty structure
    let payments: PaymentsData = {
      refundable_reservations: [],
      campaign_support: []
    }
    
    try {
      const existingData = await fs.readFile(filePath, "utf-8")
      const parsed = JSON.parse(existingData)
      
      // Handle migration from old array format to new grouped format
      if (Array.isArray(parsed)) {
        // Migrate old data
        for (const record of parsed) {
          const newRecord: PaymentRecord = {
            name: record.name,
            email: record.email,
            amount: record.amount,
            tierName: record.tierName,
            paymentIntentId: record.paymentIntentId,
            timestamp: record.timestamp,
          }
          if (record.isRefundable) {
            payments.refundable_reservations.push(newRecord)
          } else {
            payments.campaign_support.push(newRecord)
          }
        }
      } else {
        payments = parsed
      }
    } catch {
      // File doesn't exist yet, start with empty structure
    }

    // Create the new record (without isRefundable since it's grouped now)
    const newRecord: PaymentRecord = {
      name: paymentData.name,
      email: paymentData.email,
      amount: paymentData.amount,
      tierName: paymentData.tierName,
      paymentIntentId: paymentData.paymentIntentId,
      timestamp: paymentData.timestamp,
    }

    // Add new payment to appropriate group
    if (paymentData.isRefundable) {
      payments.refundable_reservations.push(newRecord)
    } else {
      payments.campaign_support.push(newRecord)
    }

    // Save updated payments
    await fs.writeFile(filePath, JSON.stringify(payments, null, 2))
    console.log("Payment record saved:", paymentData.paymentIntentId, "Type:", paymentData.isRefundable ? "reservation" : "support")
  } catch (error) {
    console.error("Error saving payment record:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { amount, tierName, email, name, isRefundable } = await request.json()

    if (!amount || amount < 1000) { // Minimum $10 = 1000 cents
      return NextResponse.json(
        { error: "Invalid amount. Minimum is $10." },
        { status: 400 }
      )
    }

    if (!email || !name) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      )
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        tierName,
        campaign: "pre-launch",
        isRefundable: isRefundable ? "true" : "false",
        customerName: name,
        customerEmail: email,
      },
      receipt_email: email,
      description: `ColibriV Pre-Launch ${isRefundable ? 'Reservation' : 'Support'} - ${tierName}`,
    })

    // Save payment record and send notification
    const paymentData = {
      name,
      email,
      amount,
      tierName,
      isRefundable: !!isRefundable,
      paymentIntentId: paymentIntent.id,
      timestamp: new Date().toISOString(),
    }

    // Save to local JSON file
    await savePaymentRecord(paymentData)

    // Send email notifications (admin + user confirmation)
    sendPaymentEmails(paymentData).catch(console.error)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to create payment intent. Please try again." },
      { status: 500 }
    )
  }
}
