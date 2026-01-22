import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { promises as fs } from "fs"
import path from "path"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
})

// Function to send email notification via MonkeysMail
async function sendEmailNotification(paymentData: {
  name: string
  email: string
  amount: number
  tierName: string
  isRefundable: boolean
  paymentIntentId: string
}) {
  const apiKey = process.env.MONKEYSMAIL_API_KEY
  const fromEmail = process.env.MONKEYSMAIL_FROM_EMAIL || "no-reply@colibriv.com"
  const fromName = process.env.MONKEYSMAIL_FROM_NAME || "ColibriV"
  const toEmail = process.env.MONKEYSMAIL_TO || "jorge@colibriv.com"

  if (!apiKey) {
    console.warn("MonkeysMail API key not configured, skipping email notification")
    return
  }

  const subject = `[ColibriV Pre-Launch] New ${paymentData.isRefundable ? 'Reservation' : 'Support'} - $${paymentData.amount / 100}`
  
  const htmlContent = `
    <h2>New Pre-Launch ${paymentData.isRefundable ? 'Reservation' : 'Support Payment'}</h2>
    <p><strong>Amount:</strong> $${paymentData.amount / 100} USD</p>
    <p><strong>Type:</strong> ${paymentData.tierName} ${paymentData.isRefundable ? '(Refundable)' : '(Non-refundable)'}</p>
    <hr>
    <h3>Supporter Details</h3>
    <p><strong>Name:</strong> ${paymentData.name}</p>
    <p><strong>Email:</strong> ${paymentData.email}</p>
    <hr>
    <p><strong>Stripe Payment ID:</strong> ${paymentData.paymentIntentId}</p>
    <p><strong>Date:</strong> ${new Date().toISOString()}</p>
  `

  try {
    const response = await fetch("https://monkeysmail.com/api/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: { email: fromEmail, name: fromName },
        to: [{ email: toEmail }],
        subject,
        html: htmlContent,
      }),
    })

    if (!response.ok) {
      console.error("Failed to send email notification:", await response.text())
    }
  } catch (error) {
    console.error("Error sending email notification:", error)
  }
}

// Function to save payment record to JSON file
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

    // Read existing payments or create empty array
    let payments: typeof paymentData[] = []
    try {
      const existingData = await fs.readFile(filePath, "utf-8")
      payments = JSON.parse(existingData)
    } catch {
      // File doesn't exist yet, start with empty array
    }

    // Add new payment
    payments.push(paymentData)

    // Save updated payments
    await fs.writeFile(filePath, JSON.stringify(payments, null, 2))
    console.log("Payment record saved:", paymentData.paymentIntentId)
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

    // Send email notification (async, don't wait)
    sendEmailNotification(paymentData).catch(console.error)

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
