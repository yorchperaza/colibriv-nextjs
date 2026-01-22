"use client"

import { useEffect, useRef, useState } from "react"

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = "legal" | "privacy" | "terms" | "refund"

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<TabType>("legal")

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
      setActiveTab("legal")
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

  if (!isOpen) return null

  const tabs = [
    { id: "legal" as const, label: "Legal Compliance" },
    { id: "privacy" as const, label: "Privacy Policy" },
    { id: "terms" as const, label: "Terms of Use" },
    { id: "refund" as const, label: "Refund Policy" },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-extrabold text-slate-900">
              Legal, Privacy & Regulations
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
          {/* Tabs */}
          <div className="flex border-t border-slate-100 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] px-4 py-3 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-red-600 text-red-600 bg-red-50/50"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-6 max-h-[calc(85vh-180px)]">
          {activeTab === "legal" && <LegalComplianceContent />}
          {activeTab === "privacy" && <PrivacyPolicyContent />}
          {activeTab === "terms" && <TermsOfUseContent />}
          {activeTab === "refund" && <RefundPolicyContent />}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              ColibriV, LLC — 6312 S Fiddlers Green Circle, Greenwood Village, CO 80111
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LegalComplianceContent() {
  return (
    <div className="space-y-8">
      {/* Legal Compliance Notice */}
      <section>
        <div className="inline-flex items-center gap-2 rounded-md bg-red-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-red-700 ring-1 ring-red-600/20">
          Legal Compliance Notice (USA)
        </div>
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-red-800 font-medium text-sm">
            ⚠️ No securities are being offered or sold through this website.
          </p>
        </div>
        <div className="mt-4 prose prose-slate prose-sm max-w-none">
          <p>
            This website is for informational and preparatory purposes only. Any future offering of securities
            will be made solely through official offering materials on a registered crowdfunding platform in
            compliance with U.S. securities laws.
          </p>
          <p>
            Refundable reservations and support contributions do not represent equity, ownership, or any security.
          </p>
        </div>
      </section>

      {/* California Privacy Rights */}
      <section>
        <div className="inline-flex items-center gap-2 rounded-md bg-blue-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-700 ring-1 ring-blue-600/20">
          California Privacy Rights (CCPA/CPRA)
        </div>
        <div className="mt-4 prose prose-slate prose-sm max-w-none">
          <p>California residents have the right to:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Know what personal information is collected</li>
            <li>Request deletion of personal information</li>
            <li>Opt out of the sale or sharing of personal data</li>
            <li>Request correction of inaccurate information</li>
          </ul>
          <p className="text-slate-600 font-medium">
            ColibriV does not sell or share personal information for commercial purposes.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h4 className="text-base font-bold text-slate-900">Questions?</h4>
        <p className="mt-2 text-sm text-slate-600">
          If you have any questions about legal compliance, please contact us:
        </p>
        <div className="mt-3 space-y-1 text-sm text-slate-700">
          <p>📧 <a href="mailto:legal@colibriv.com" className="underline underline-offset-2">legal@colibriv.com</a></p>
          <p>📍 6312 S Fiddlers Green Circle, Greenwood Village, CO 80111</p>
        </div>
      </section>
    </div>
  )
}

function PrivacyPolicyContent() {
  return (
    <div className="space-y-8">
      <section>
        <div className="inline-flex items-center gap-2 rounded-md bg-blue-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-700 ring-1 ring-blue-600/20">
          Privacy Policy — ColibriV, LLC
        </div>

        <div className="mt-6 prose prose-slate prose-sm max-w-none">
          <h4 className="text-base font-bold text-slate-900">Information Collected</h4>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number (optional)</li>
            <li>Payment confirmation (via third-party processors)</li>
            <li>Analytics data</li>
          </ul>

          <h4 className="text-base font-bold text-slate-900 mt-6">Use of Information</h4>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Campaign updates</li>
            <li>Pre-launch communications</li>
            <li>Regulatory and compliance documentation</li>
          </ul>

          <h4 className="text-base font-bold text-slate-900 mt-6">Data Sharing</h4>
          <p className="text-slate-600">
            We do not sell, rent, or trade personal information.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">California Privacy Rights</h4>
          <p className="text-slate-600">
            California residents may request access, correction, or deletion of their data.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">Data Retention</h4>
          <p className="text-slate-600">
            Data is kept only as long as necessary for the purposes outlined above.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">Cookies</h4>
          <p className="text-slate-600">
            Cookies may be used for analytics and improving user experience.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">Children&apos;s Privacy</h4>
          <p className="text-slate-600">
            This website is not intended for users under 18 years of age.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">Data Deletion</h4>
          <p className="text-slate-600">
            Users may request data deletion at any time by contacting ColibriV.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h4 className="text-base font-bold text-slate-900">Privacy Contact</h4>
        <p className="mt-2 text-sm text-slate-700">
          📧 <a href="mailto:privacy@colibriv.com" className="underline underline-offset-2">privacy@colibriv.com</a>
        </p>
      </section>
    </div>
  )
}

function TermsOfUseContent() {
  return (
    <div className="space-y-6">
      <section>
        <div className="inline-flex items-center gap-2 rounded-md bg-amber-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700 ring-1 ring-amber-600/20">
          Terms of Use — ColibriV, LLC
        </div>

        <div className="mt-6 prose prose-slate prose-sm max-w-none">
          <h4 className="text-base font-bold text-slate-900">Acceptance of Terms</h4>
          <p className="text-slate-600">
            By accessing or using colibriv.com, you agree to be bound by these Terms of Use.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">Informational Purpose Only</h4>
          <p className="text-slate-600">
            This Website is for informational and preparatory purposes only. No securities are offered or sold through this Website.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">No Investment Advice</h4>
          <p className="text-slate-600">
            Nothing on this Website constitutes financial, legal, or investment advice.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">Pre-Launch Reservations and Contributions</h4>
          <p className="text-slate-600">
            Refundable reservations and preparation contributions do not represent equity, ownership, or securities.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">Intellectual Property</h4>
          <p className="text-slate-600">
            All content is the property of ColibriV, LLC.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">Third-Party Services</h4>
          <p className="text-slate-600">
            Payments and communications may be processed by third-party providers.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">Limitation of Liability</h4>
          <p className="text-slate-600">
            ColibriV, LLC is not liable for indirect or consequential damages.
          </p>

          <h4 className="text-base font-bold text-slate-900 mt-6">Governing Law</h4>
          <p className="text-slate-600">
            These Terms are governed by the laws of the State of Colorado.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h4 className="text-base font-bold text-slate-900">Contact</h4>
        <p className="mt-2 text-sm text-slate-700">
          📧 <a href="mailto:legal@colibriv.com" className="underline underline-offset-2">legal@colibriv.com</a>
        </p>
      </section>
    </div>
  )
}

function RefundPolicyContent() {
  return (
    <div className="space-y-6">
      <section>
        <div className="inline-flex items-center gap-2 rounded-md bg-green-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-green-700 ring-1 ring-green-600/20">
          Refund Policy — Refundable Reservations
        </div>

        <div className="mt-6 prose prose-slate prose-sm max-w-none">
          <p className="text-slate-600">
            Refundable reservations may be refunded at any time prior to the official public campaign launch by submitting a request to:
          </p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 my-4">
            <p className="font-semibold text-slate-900">
              📧 <a href="mailto:refunds@colibriv.com" className="underline underline-offset-2">refunds@colibriv.com</a>
            </p>
          </div>

          <p className="text-slate-600">
            Approved refunds will be processed within <strong>7–10 business days</strong> to the original payment method.
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 my-4">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> Once the public crowdfunding campaign has officially launched, reservations will automatically convert into early access status and will no longer be refundable.
            </p>
          </div>

          <p className="text-slate-600">
            Refunds apply only to refundable reservations and <strong>do not apply</strong> to campaign preparation support contributions.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h4 className="text-base font-bold text-slate-900">Quick Summary</h4>
        <p className="mt-2 text-sm text-slate-600">
          Refundable before campaign launch. Refunds processed within 7–10 business days.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h4 className="text-base font-bold text-slate-900">Refund Request</h4>
        <p className="mt-2 text-sm text-slate-700">
          📧 <a href="mailto:refunds@colibriv.com" className="underline underline-offset-2">refunds@colibriv.com</a>
        </p>
      </section>
    </div>
  )
}
