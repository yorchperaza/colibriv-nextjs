"use client"

import { useEffect, useRef, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  tier: {
    name: string
    amount: number
    description: string
    isRefundable?: boolean
  } | null
}

interface CheckoutFormProps {
  tier: {
    name: string
    amount: number
    description: string
    isRefundable?: boolean
  }
  onSuccess: () => void
  onClose: () => void
}

function CheckoutForm({ tier, onSuccess, onClose }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setError("Payment system not loaded. Please refresh and try again.")
      return
    }

    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!name) {
      setError("Please enter your name")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Submit the payment element to validate
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message || "An error occurred")
        setIsProcessing(false)
        return
      }

      // Create PaymentIntent on the server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: tier.amount * 100, // Convert to cents
          tierName: tier.name,
          email,
          name,
          isRefundable: tier.isRefundable,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create payment')
      }

      const { clientSecret } = await response.json()

      // Confirm the payment
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/pre-launch?success=true`,
          receipt_email: email,
          payment_method_data: {
            billing_details: {
              name,
              email,
            },
          },
        },
        redirect: 'if_required',
      })

      if (paymentError) {
        setError(paymentError.message || "Payment failed. Please try again.")
      } else {
        onSuccess()
      }
    } catch (err) {
      console.error('Payment error:', err)
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Tier Summary */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-500">{tier.name}</span>
              {tier.isRefundable && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                  REFUNDABLE
                </span>
              )}
            </div>
            <div className="text-2xl font-extrabold text-slate-900">${tier.amount} USD</div>
          </div>
          <div className={`rounded-lg p-3 ${tier.isRefundable ? 'bg-green-100' : 'bg-red-600/10'}`}>
            {tier.isRefundable ? (
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-600">{tier.description}</p>
        {tier.isRefundable && (
          <p className="mt-2 text-xs text-green-700 font-medium">
            ✓ Refundable before campaign launch. Refunds processed within 7–10 business days.
          </p>
        )}
      </div>

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          required
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
        />
      </div>

      {/* Stripe Payment Element */}
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Important Notice */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <p className="text-xs text-amber-800">
          <strong>Important:</strong> {tier.isRefundable 
            ? "This is a refundable reservation, not an investment. No securities are being offered." 
            : "This contribution supports campaign preparation only and does not represent equity, ownership, or securities."}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border-2 border-slate-300 px-5 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            `Pay $${tier.amount}`
          )}
        </button>
      </div>

      <p className="text-center text-xs text-slate-500">
        Payments processed securely by{" "}
        <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline">
          Stripe
        </a>
      </p>
    </form>
  )
}

function SuccessView({ tier, onClose }: { tier: { name: string; isRefundable?: boolean }; onClose: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-extrabold text-slate-900">Thank You!</h3>
      <p className="mt-2 text-slate-600">
        {tier.isRefundable 
          ? "Your reservation has been confirmed. You'll receive priority access to campaign materials when we launch."
          : "Your support means the world to us. We'll be in touch with updates about our campaign preparation."}
      </p>
      {tier.isRefundable && (
        <p className="mt-3 text-sm text-slate-500">
          Remember: Your reservation is fully refundable before campaign launch. Contact refunds@colibriv.com if needed.
        </p>
      )}
      <button
        onClick={onClose}
        className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
      >
        Close
      </button>
    </div>
  )
}

export default function PaymentModal({ isOpen, onClose, tier }: PaymentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
      setShowSuccess(false)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  if (!isOpen || !tier) return null

  const options = {
    mode: "payment" as const,
    amount: tier.amount * 100,
    currency: "usd",
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#dc2626",
        borderRadius: "12px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      },
    },
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-xl font-extrabold text-slate-900">
            {showSuccess ? "Confirmed!" : tier.isRefundable ? "Reserve Your Spot" : "Complete Your Support"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
          {showSuccess ? (
            <SuccessView tier={tier} onClose={onClose} />
          ) : (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                tier={tier}
                onSuccess={() => setShowSuccess(true)}
                onClose={onClose}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  )
}
