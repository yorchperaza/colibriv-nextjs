"use client"

import { useState } from "react"
import LegalModal from "./LegalModal"
import PaymentModal from "./PaymentModal"

export default function PreLaunchPage() {
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [customAmount, setCustomAmount] = useState("")
  const [refundableCustomAmount, setRefundableCustomAmount] = useState("")
  const [selectedTier, setSelectedTier] = useState<{
    name: string
    amount: number
    description: string
    isRefundable?: boolean
  } | null>(null)

  const openPaymentModal = (tier: { name: string; amount: number; description: string; isRefundable?: boolean }) => {
    setSelectedTier(tier)
    setIsPaymentModalOpen(true)
  }

  const openCustomPaymentModal = () => {
    const amount = parseInt(customAmount, 10)
    if (amount && amount >= 10) {
      setSelectedTier({
        name: "Custom Support",
        amount: amount,
        description: "Your custom contribution to support campaign preparation",
        isRefundable: false,
      })
      setIsPaymentModalOpen(true)
    }
  }

  const openRefundableCustomPaymentModal = () => {
    const amount = parseInt(refundableCustomAmount, 10)
    if (amount && amount >= 25) {
      setSelectedTier({
        name: "Refundable Reservation",
        amount: amount,
        description: "Fully refundable before campaign launch",
        isRefundable: true,
      })
      setIsPaymentModalOpen(true)
    }
  }

  const supportOptions = [
    { amount: 25, label: "$25" },
    { amount: 100, label: "$100" },
    { amount: 500, label: "$500" },
    { amount: 1000, label: "$1,000" },
  ]

  return (
    <main className="bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_0%_-10%,#fef3c7_0%,transparent_60%),radial-gradient(900px_500px_at_100%_10%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 lg:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-600/10 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20">
            <span className="block h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
            Pre-Launch Campaign
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.01em] text-slate-900">
            Preparing the Future of Hydrogen Aviation
          </h1>
          <p className="mt-5 max-w-3xl text-lg sm:text-xl font-semibold text-slate-800">
            Pre-Launch Campaign Preparation
          </p>
          <p className="mt-4 max-w-3xl text-slate-600">
            ColibriV is developing hydrogen-powered turbofan propulsion systems and future aircraft
            platforms designed to accelerate sustainable commercial aviation through realistic
            engineering and strict regulatory discipline.
          </p>
          <p className="mt-4 max-w-3xl text-slate-600">
            We are currently preparing our official public fundraising campaign on a registered
            crowdfunding platform. This page allows early supporters to join our community and help
            us responsibly prepare for that launch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => openPaymentModal({
                name: "Refundable Reservation",
                amount: 0, // Amount will be selected in modal
                description: "Fully refundable before campaign launch. Priority early access to campaign materials.",
                isRefundable: true,
              })}
              className="inline-flex items-center rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white hover:opacity-95 transition-opacity"
            >
              Join the Pre-Launch Waitlist
            </button>
            <button
              onClick={() => setIsLegalModalOpen(true)}
              className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
            >
              Legal & Privacy
            </button>
          </div>
        </div>
      </section>

      {/* ===== OUR MISSION ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-red-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-red-700 ring-1 ring-red-600/20">
            Our Mission
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            ColibriV exists to make hydrogen aviation certifiable, scalable, and commercially viable.
          </h2>
          <p className="mt-4 max-w-4xl text-slate-700">
            Our approach eliminates the need for fuel-cell propulsion and cryogenic liquid hydrogen
            infrastructure while maintaining turbofan-class performance and certification pathways
            aligned with global aviation authorities.
          </p>
        </div>
      </section>

      {/* ===== OUR STRATEGY: ENGINES FIRST ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-amber-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700 ring-1 ring-amber-600/20">
            Our Strategy
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            Engines First
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                Phase 1
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-slate-900">
                Hydrogen Turbofan Propulsion
              </h3>
              <p className="mt-3 text-slate-600">
                We design and validate hydrogen combustion turbofan engines to generate early certification data,
                regulatory credibility, and licensable propulsion intellectual property.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                Phase 2
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-slate-900">
                Aircraft Platforms
              </h3>
              <p className="mt-3 text-slate-600">
                After propulsion validation, we integrate certified propulsion systems into aircraft platforms
                for commercial deployment.
              </p>
            </div>
          </div>

          <p className="mt-8 text-slate-700 font-medium">
            This sequence allows ColibriV to build long-term value with disciplined capital efficiency.
          </p>
        </div>
      </section>

      {/* ===== GEOGRAPHIC STRATEGY ===== */}
      <section className="bg-slate-900 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
            Geographic Strategy
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-white">
            Multi-Location Operations
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Primary Operations */}
            <div className="rounded-2xl border border-red-500/50 bg-gradient-to-br from-red-600/20 to-red-900/20 p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                Primary Operations
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-white">
                Greenwood Village, Colorado (USA)
              </h3>
              <p className="mt-2 text-sm text-white/50">
                6312 S Fiddlers Green Circle, Greenwood Village, CO 80111
              </p>
              <p className="mt-3 text-white/70">
                Colorado serves as ColibriV&apos;s strategic and regulatory center, including:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Corporate governance and leadership",
                  "Engineering and systems architecture",
                  "FAA regulatory alignment",
                  "Investor relations and commercial partnerships",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-white/60 font-medium">
                The United States is ColibriV&apos;s first commercial and certification market.
              </p>
            </div>

            {/* Secondary Operations */}
            <div className="rounded-2xl border border-white/20 bg-white/5 p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
                Secondary Operations
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-white">
                Liberia, Guanacaste (Costa Rica)
              </h3>
              <p className="mt-3 text-white/70">
                Liberia, Guanacaste supports:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Component testing and early experimentation",
                  "Environmental and operational testing",
                  "Cost-efficient iteration and development",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-white/50 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-white/60">
                Costa Rica provides year-round testing conditions and cooperative aviation authorities
                while maintaining alignment with FAA and EASA certification standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REGULATORY & CERTIFICATION ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-blue-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-700 ring-1 ring-blue-600/20">
            Regulatory Commitment
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            ColibriV is built around strict regulatory discipline from day one.
          </h2>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:p-8">
            <h3 className="text-lg font-extrabold text-slate-900">Our certification path targets:</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { code: "FAA Part 33", label: "Engines" },
                { code: "FAA Part 25", label: "Aircraft" },
                { code: "EASA", label: "Harmonization" },
              ].map((cert) => (
                <div key={cert.code} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                  <div className="text-xl font-extrabold text-slate-900">{cert.code}</div>
                  <div className="mt-1 text-sm text-slate-500">{cert.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-slate-700">
              All development is structured to produce <strong>auditable</strong>, <strong>traceable</strong>,
              and <strong>certifiable</strong> evidence.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY THIS PRE-LAUNCH PHASE MATTERS ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-amber-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700 ring-1 ring-amber-600/20">
            Why It Matters
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            Why This Pre-Launch Phase Matters
          </h2>
          <p className="mt-4 max-w-3xl text-slate-700">
            Before any public fundraising campaign can legally launch, a company must complete:
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Legal structuring and compliance",
              "CPA financial preparation and review",
              "Disclosure documentation",
              "Campaign production materials",
              "Platform onboarding requirements",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700">✓</span>
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-slate-700 font-medium">
            This preparation protects both the company and future investors.
          </p>
        </div>
      </section>

      {/* ===== CAMPAIGN PREPARATION GOAL ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-red-50 to-amber-50 p-8 lg:p-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-md bg-red-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-red-700 ring-1 ring-red-600/20">
                Campaign Goal
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
                Our objective for this pre-launch phase is to raise{" "}
                <span className="text-red-600">$100,000</span>
              </h2>
              <p className="mt-2 text-slate-600">
                to responsibly prepare our public crowdfunding campaign.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-extrabold text-slate-900 text-center">
                Funds are used exclusively for:
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Legal structuring and regulatory compliance",
                  "CPA financial review and preparation",
                  "Disclosure and campaign documentation",
                  "Platform onboarding fees",
                  "Campaign video and production materials",
                  "Investor communication assets",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-red-600 mt-0.5">•</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW YOU CAN PARTICIPATE ===== */}
      <section className="bg-slate-900 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
              Participate
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-[-0.01em] text-white">
              How You Can Participate
            </h2>
            <div className="mt-4 rounded-xl border border-amber-500/50 bg-amber-500/10 p-4 max-w-xl mx-auto">
              <p className="text-amber-200 text-sm font-medium">
                ⚠️ This website does not offer securities.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Option 1 - Refundable Reservation */}
            <div className="rounded-2xl border border-red-500/50 bg-gradient-to-br from-red-600/20 to-red-900/20 p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                Option 1
              </div>
              <h3 className="mt-4 text-2xl font-extrabold text-white">
                Refundable Reservation
              </h3>
              <p className="mt-3 text-white/70">
                Fully refundable before campaign launch. Priority early access to campaign materials.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[50, 100, 250, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => openPaymentModal({
                      name: "Refundable Reservation",
                      amount,
                      description: "Fully refundable before campaign launch",
                      isRefundable: true,
                    })}
                    className="rounded-xl bg-white/10 px-4 py-3 text-lg font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-semibold">$</span>
                  <input
                    type="number"
                    min="25"
                    placeholder="Custom"
                    value={refundableCustomAmount}
                    onChange={(e) => setRefundableCustomAmount(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-8 pr-4 text-lg font-semibold text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <button
                  onClick={openRefundableCustomPaymentModal}
                  disabled={!refundableCustomAmount || parseInt(refundableCustomAmount, 10) < 25}
                  className="rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Reserve
                </button>
              </div>
              <p className="mt-4 text-xs text-white/50">
                Minimum $25. Refundable before campaign launch. Refunds processed within 7–10 business days.
              </p>
            </div>

            {/* Option 2 - Support Campaign Preparation */}
            <div className="rounded-2xl border border-white/20 bg-white/5 p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
                Option 2
              </div>
              <h3 className="mt-4 text-2xl font-extrabold text-white">
                Support Campaign Preparation
              </h3>
              <p className="mt-3 text-white/70">
                Contributions support campaign preparation only and do not represent ownership, equity, or securities.
              </p>
              <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-4">
                {supportOptions.map((opt) => (
                  <button
                    key={opt.amount}
                    onClick={() => openPaymentModal({
                      name: "Campaign Support",
                      amount: opt.amount,
                      description: "Support campaign preparation",
                      isRefundable: false,
                    })}
                    className="rounded-xl bg-white/10 px-4 py-3 text-lg font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-semibold">$</span>
                  <input
                    type="number"
                    min="10"
                    placeholder="Custom"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-8 pr-4 text-lg font-semibold text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <button
                  onClick={openCustomPaymentModal}
                  disabled={!customAmount || parseInt(customAmount, 10) < 10}
                  className="rounded-xl bg-white/10 px-6 py-3 text-base font-semibold text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Contribute
                </button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-white/50">
            By participating, you agree to our{" "}
            <button
              onClick={() => setIsLegalModalOpen(true)}
              className="underline underline-offset-4 hover:text-white/70 transition-colors"
            >
              Terms, Privacy Policy & Regulations
            </button>
          </p>
        </div>
      </section>

      {/* ===== WHAT THIS IS — AND WHAT IT IS NOT ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border-2 border-slate-900 p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              What This Is — And What It Is Not
            </h2>
            <div className="mt-6 space-y-4">
              <p className="text-slate-700 font-medium">
                <span className="text-red-600 font-bold">This page is not an investment offering.</span>
              </p>
              <p className="text-slate-700">
                No securities are offered or sold through this website.
              </p>
              <p className="text-slate-700">
                Any future investment opportunity will be presented exclusively through official offering
                materials on a registered crowdfunding platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT THE FOUNDER ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-slate-900/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-700 ring-1 ring-slate-900/20">
            Leadership
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            About the Founder
          </h2>
          <p className="mt-4 max-w-3xl text-slate-700">
            ColibriV is led by <strong>Jorge Peraza</strong>, former Tesla Software Architect with experience
            in safety-critical systems and regulated engineering environments.
          </p>
        </div>
      </section>

      {/* ===== WHAT HAPPENS AFTER YOU JOIN ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-green-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-green-700 ring-1 ring-green-600/20">
            Next Steps
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            What Happens After You Join
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "Join the pre-launch list", icon: "📝" },
              { step: "2", title: "Receive exclusive updates", icon: "📧" },
              { step: "3", title: "Get notified before campaign opens", icon: "🔔" },
              { step: "4", title: "Decide independently whether to participate", icon: "✅" },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="absolute -top-3 left-6 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {item.step}
                </div>
                <div className="text-3xl mt-2">{item.icon}</div>
                <p className="mt-4 font-semibold text-slate-900">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-slate-900 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.01em] text-white">
            Ready to join the future of aviation?
          </h3>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Join our pre-launch community and be among the first to know when our official campaign launches.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openPaymentModal({
                name: "Refundable Reservation",
                amount: 0, // Amount will be selected in modal
                description: "Fully refundable before campaign launch",
                isRefundable: true,
              })}
              className="inline-flex items-center rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-700 transition-colors"
            >
              Reserve Your Spot
            </button>
            <a
              href="mailto:invest@colibriv.com"
              className="inline-flex items-center rounded-xl border-2 border-white/40 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER DISCLAIMER ===== */}
      <section className="bg-slate-950 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm text-slate-400">
            No securities are being offered or sold through this website. Any future offering will be made
            only through official offering documents on a registered crowdfunding platform in accordance
            with applicable regulations.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Refundable reservations and support contributions do not represent equity, ownership, or any form of security.
          </p>
          <button
            onClick={() => setIsLegalModalOpen(true)}
            className="mt-4 text-sm text-slate-400 underline underline-offset-4 hover:text-white transition-colors"
          >
            View Full Legal Terms
          </button>
        </div>
      </section>

      {/* Modals */}
      <LegalModal isOpen={isLegalModalOpen} onClose={() => setIsLegalModalOpen(false)} />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        tier={selectedTier}
      />
    </main>
  )
}
