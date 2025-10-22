// app/program/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Program — Engines First, Passenger Mid–Long Range | ColibriV",
  description:
    "ColibriV’s program from engine evidence to mid–long range passenger aircraft: pressurized single-sector hot-fire, core-engine run, flight testbed, and multi-authority certification. Engines first—aircraft next.",
  openGraph: {
    title: "Program — Engines First, Passenger Mid–Long Range | ColibriV",
    description:
      "From emissions maps to flight testbed: a cert-aligned program that scales to mid–long range passenger aviation.",
  },
};

export default function ProgramPage() {
  return (
    <main className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_0%_-20%,#fee2e2_0%,transparent_60%),radial-gradient(900px_500px_at_100%_10%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <span className="block h-1.5 w-1.5 rounded-full bg-red-600" />
            Engines First → Passenger Aircraft
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.01em] text-slate-900">
            Program Overview
          </h1>

          <p className="mt-5 max-w-3xl text-lg sm:text-xl text-slate-700">
            A stepwise, cert-aligned program: generate <strong>engine evidence</strong> (emissions, stability, safety),
            prove <strong>airport-ready storage &amp; delivery</strong> at 350–700 bar, and build toward{" "}
            <strong>mid–long range passenger aircraft</strong>. Engines first—aircraft next.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/program/roadmap"
              className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              View Roadmap
            </Link>
            <Link
              href="/technology/engines"
              className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              Engine Technology
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PHASES ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            Program Phases
          </h2>
          <p className="mt-3 text-slate-700">
            Evidence flows from lab to certification to flight. Modules are reusable across engine families and aircraft sizes.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                k: "P1 — Engine Evidence",
                d: "Pressurized single-sector hot-fire, NOx & stability maps, flashback margins.",
              },
              {
                k: "P2 — Core Run",
                d: "Core-engine hydrogen ground run; controls, transients, and health monitoring.",
              },
              {
                k: "P3 — Flight Testbed",
                d: "Testbed approvals with DOA/ODA; emissions & ops procedures under real constraints.",
              },
              {
                k: "P4 — Passenger Scale",
                d: "Mid–long range sizing, cert pathways across authorities, airport pilot programs.",
              },
            ].map((x) => (
              <div key={x.k} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="absolute -top-3 left-6 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold text-white shadow-sm">
                  {x.k.split("—")[0]}
                </div>
                <div className="mt-2 text-lg font-extrabold text-slate-900">{x.k}</div>
                <p className="mt-2 text-slate-700">{x.d}</p>
                <div className="mt-4 h-1 w-16 rounded-full bg-red-600/80" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GOVERNANCE & SAFETY ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              Program Governance &amp; Safety
            </h2>
            <p className="mt-3 text-slate-700">
              Certification is baked into planning: hazards traced to design mitigations and test evidence.
            </p>
          </div>
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {[
              {
                h: "ARP4754A / ARP4761",
                b: "FHA/PSSA/SSA; requirements → architecture → analysis → test → evidence.",
              },
              {
                h: "DO-160 / DO-178C",
                b: "Environmental qual + SW lifecycle; advisory AI kept out of safety-critical path.",
              },
              {
                h: "Airport Operations",
                b: "PRD strategy, ventilation, purge, detection; turnaround playbooks.",
              },
              {
                h: "Traceability",
                b: "Automated data capture, audit-ready artifacts, multi-authority mapping.",
              },
            ].map((x) => (
              <div key={x.h} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold text-slate-500">{x.h}</div>
                <div className="mt-1 text-slate-700">{x.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FUNDING LANES ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              Funding Plan
            </h2>
            <div className="hidden sm:block h-[2px] w-40 bg-gradient-to-r from-red-600 via-red-600/60 to-transparent rounded-full" />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Pre-Seed",
                v: "US$1.5–3.0M",
                d: "Pressurized single-sector hot-fire; initial NOx & stability maps; safety/means-of-compliance v1.",
              },
              {
                t: "Seed",
                v: "US$10–12M",
                d: "Core-engine H₂ ground run, flight testbed kick-off, global cert mapping (EASA/FAA + partners).",
              },
              {
                t: "Series A",
                v: "TBD",
                d: "Testbed campaign, airport pilots, supply chain scale-up for passenger program.",
              },
              {
                t: "Non-Dilutive",
                v: "Ongoing",
                d: "R&D grants, industry MoUs, airport partnerships for ops validation.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">{x.t}</div>
                <div className="mt-1 text-2xl font-extrabold text-slate-900">{x.v}</div>
                <p className="mt-2 text-slate-700">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/investors/overview"
              className="text-slate-900 font-semibold underline decoration-red-600 decoration-2 underline-offset-4"
            >
              Investor overview →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <h3 className="text-2xl font-extrabold tracking-[-0.01em] text-slate-900">
                  Work With Us
                </h3>
                <p className="mt-2 text-slate-700">
                  Co-develop modules, share test data, and accelerate certification-ready products for mid–long range missions.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
                {[
                  { t: "Combustor Modules", d: "Micromix variants, injectors, liners, optical rigs." },
                  { t: "Storage & Delivery", d: "Type-IV tanks, PRD, manifolds, ventilation & detection." },
                  { t: "Controls & SW", d: "Transients, analytics, advisory AI pipelines." },
                  { t: "Airport Pilots", d: "Turnaround playbooks, fueling bays, maintenance flows." },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-slate-200 bg-white p-6">
                    <div className="text-sm font-semibold text-slate-500">{x.t}</div>
                    <div className="mt-1 text-slate-700">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95"
              >
                Contact the team
              </Link>
              <Link
                href="/news"
                className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Latest updates →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KPI SNAPSHOT ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            KPI Snapshot
          </h2>
          <p className="mt-3 text-slate-700">Program health metrics driving decisions and pacing.</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Hot-Fire Readiness", v: "Rig hardware 90%", d: "Instrumentation & interlocks in progress." },
              { k: "Emissions Map Coverage", v: "φ grid 0→70%", d: "Extending to high-load regime." },
              { k: "Airport Ops Playbook", v: "v0.7", d: "PRD, purge, detection, turnaround targets." },
              { k: "Cert Artifact Set", v: "v0.5", d: "FHA/PSSA baseline; MoC draft in review." },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold text-slate-500">{x.k}</div>
                <div className="mt-1 text-xl font-extrabold text-slate-900">{x.v}</div>
                <div className="mt-2 text-sm text-slate-600">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQs (closed) ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">FAQs</h2>
            <div className="hidden sm:block h-[2px] w-40 bg-gradient-to-r from-red-600 via-red-600/60 to-transparent rounded-full" />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              {
                q: "What’s unique about your program?",
                a: "Engine-level evidence now, with certification front-loaded and airport operations baked in—then scale to mid–long range passenger aircraft.",
              },
              {
                q: "Why non-cryogenic gaseous H₂ early?",
                a: "Fewer operational constraints and faster iteration to de-risk combustion, emissions, and safety while building partner traction.",
              },
              {
                q: "How do you handle multi-authority certification?",
                a: "Traceable artifacts aligned to ARP4754A/4761 and DO-160/DO-178C; early DOA/ODA engagement and authority-specific pack assembly.",
              },
              {
                q: "How do partners engage?",
                a: "Module co-development, data-sharing MoUs, airport pilots; focus on combustor, storage/delivery, controls, and test operations.",
              },
            ].map((item) => (
              <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer font-semibold text-slate-900">{item.q}</summary>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/program/roadmap"
              className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
            >
              See Roadmap
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              Contact the team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
