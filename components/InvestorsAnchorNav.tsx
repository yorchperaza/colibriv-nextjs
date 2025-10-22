// components/InvestorsAnchorNav.tsx
"use client"

import Link from "next/link"
import React from "react"

type Props = {
  /** Adjust for your fixed header height */
  offset?: number
}

const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "why-invest", label: "Why Invest" },
  { id: "why-costa-rica", label: "Why Costa Rica / LIR" },
  { id: "data-room", label: "Data Room" },
  { id: "updates", label: "Updates" },
]

export default function InvestorsAnchorNav({ offset = 88 }: Props) {
  const [active, setActive] = React.useState<string>("")

  // Track which section is in view
  React.useEffect(() => {
    const sections = LINKS.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return

    const io = new IntersectionObserver(
      entries => {
        const best = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0]
        if (best?.target?.id) setActive(best.target.id)
      },
      { rootMargin: `-${offset + 10}px 0px -60% 0px`, threshold: [0, 0.1, 0.6] }
    )

    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [offset])

  // Smooth-scroll handler
  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.history.replaceState(null, "", `#${id}`)
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <nav
      className="
        mt-8 flex flex-wrap gap-3 text-sm
        sticky top-0 z-30
        bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/55
        px-1 py-2 -mx-1
      "
    >
      <a
        href="#overview"
        aria-current={active === "overview" ? "true" : undefined}
        onClick={(e) => go(e, "overview")}
        className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 hover:border-slate-900 hover:bg-slate-50"
      >
        Overview
      </a>
      <a
        href="#why-invest"
        aria-current={active === "why-invest" ? "true" : undefined}
        onClick={(e) => go(e, "why-invest")}
        className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 hover:border-slate-900 hover:bg-slate-50"
      >
        Why Invest
      </a>
      <a
        href="#why-costa-rica"
        aria-current={active === "why-costa-rica" ? "true" : undefined}
        onClick={(e) => go(e, "why-costa-rica")}
        className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 hover:border-slate-900 hover:bg-slate-50"
      >
        Why Costa Rica / LIR
      </a>
      <a
        href="#data-room"
        aria-current={active === "data-room" ? "true" : undefined}
        onClick={(e) => go(e, "data-room")}
        className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 hover:border-slate-900 hover:bg-slate-50"
      >
        Data Room
      </a>
      <a
        href="#updates"
        aria-current={active === "updates" ? "true" : undefined}
        onClick={(e) => go(e, "updates")}
        className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 hover:border-slate-900 hover:bg-slate-50"
      >
        Updates
      </a>
      <Link
        href="/contact"
        className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 font-semibold text-white hover:opacity-95"
      >
        Contact the team
      </Link>
    </nav>
  )
}
