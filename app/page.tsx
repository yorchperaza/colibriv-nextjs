import type { Metadata } from "next"
import HeroRotator from "@/components/homepage/HeroRotator"
import RouteMediaBlock from "@/components/blocks/RouteMediaBlock"
import Link from "next/link"
import TitleTextCardBlock from "@/components/blocks/TitleTextCardBlock"
import ListCardsBlock from "@/components/blocks/ListCardsBlock"
import BodyMediaBlock from "@/components/blocks/BodyMediaBlock"
import LatestArticlesBlock from "@/components/blocks/LatestArticlesBlock"

export default async function Home() {

  /** ---------- SAFETY STRIP ---------- */
  function SafetyStrip() {
    return (
      <section className="bg-slate-900 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-white/90 text-sm">Safety & Certification</div>
            <div className="flex flex-wrap gap-2">
              {['ARP4754A / ARP4761','DO-160','DO-178C','HAZOP / FMEA','PRD • Ventilation • Leak detection'].map(x => (
                <span key={x} className="inline-flex items-center bg-white/10 px-3 py-1 text-white text-xs font-semibold">{x}</span>
              ))}
            </div>
            <Link href="/technology/safety" className="text-white underline underline-offset-4 text-sm">
              Our safety approach →
            </Link>
          </div>
        </div>
      </section>
    );
  }
  /** ---------- INVESTOR STRIP (server-safe, no hooks) ---------- */
  function InvestorStrip() {
    return (
      <section className="relative overflow-hidden bg-white py-16">
        {/* soft gradient wash */}
        <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(900px_500px_at_0%_0%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur lg:p-10 overflow-hidden">
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
                For Investors
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Hydrogen Combustion",
                  "Engines First",
                  "Scalable Aircraft Family",
                  "Multi-Country Ops",
                ].map((x) => (
                  <span
                    key={x}
                    className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                  {x}
                </span>
                ))}
              </div>
            </div>

            {/* Main grid */}
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
              {/* Left: thesis, terms, monetization, CTAs */}
              <div className="space-y-8">
                {/* Thesis */}
                <div>
                  <p className="text-slate-700">
                    We are developing <strong>hydrogen-combustion turbofans</strong> using
                    compressed gaseous H₂ (no cryogenics) and building toward a{" "}
                    <strong>scalable passenger aircraft family</strong> for{" "}
                    <strong>multi-country operations</strong>. Near-term value lies in
                    emissions control, flashback safety, and certifiable high-pressure
                    storage—<em>engine-level data and IP</em> that enable licensing and
                    retrofit while we progress aircraft sizes and international
                    certification pathways.
                  </p>
                </div>

                {/* Term blocks */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5">
                    <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
                      Pre-Seed (Now)
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-slate-900">
                      US$1.5–3.0M
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      Deliver <strong>pressurized single-sector hot-fire</strong>, initial
                      <strong> NOx/stability maps</strong>, and a complete safety/cert plan
                      (ARP/DO) to unlock the core-engine run.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      <li>• Supplier MoUs (tanks, valves, gas partner)</li>
                      <li>• HAZOP/FMEA v1, PRD & ventilation strategy</li>
                      <li>• Data Pack v1 (plots + test logs) under NDA</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5">
                    <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
                      Seed (Next)
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-slate-900">
                      US$10–12M
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      Execute the <strong>core-engine hydrogen ground run</strong>, kick off
                      the <strong>flight testbed</strong>, and launch the{" "}
                      <strong>global certification workstream</strong> (EASA/FAA and partner
                      authorities) to support multi-country operations.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      <li>• Core hardware + emissions campaign</li>
                      <li>• Testbed approvals with DOA/ODA partner</li>
                      <li>• International cert path mapping (EASA/FAA/DGAC-CR + partners)</li>
                      <li>• Long-lead orders & aircraft trade studies</li>
                    </ul>
                  </div>
                </div>

                {/* Monetization */}
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
                    Monetization Path
                  </div>
                  <p className="mt-2 text-slate-700">
                    <strong>IP licensing</strong> (combustor, mixing, controls),{" "}
                    <strong>retrofit/integration kits</strong> for existing platforms, and a{" "}
                    <strong>scalable aircraft program</strong> (multiple sizes) with
                    after-market services for multi-country operators.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/investors/overview"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-base font-semibold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 focus-visible:ring-offset-2"
                  >
                    Get the Investor Pack
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2"
                  >
                    Book a Call
                  </Link>
                </div>
              </div>

              {/* Right: KPI cards + FAQ */}
              <div className="space-y-6">
                {/* KPI cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { k: "Pre-Seed", v: "US$1.5–3.0M", sub: "Now" },
                    { k: "Seed", v: "US$10–12M", sub: "Next" },
                    { k: "HQ", v: "Liberia, CR", sub: "Guanacaste" },
                  ].map((x) => (
                    <div
                      key={x.k}
                      className="rounded-xl border border-slate-200 bg-white p-5"
                    >
                      <div className="text-xs font-semibold text-slate-500">{x.k}</div>
                      <div className="mt-1 text-2xl font-extrabold text-slate-900">
                        {x.v}
                      </div>
                      {x.sub && (
                        <div className="mt-1 text-xs text-slate-500">{x.sub}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Near-term milestones */}
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
                    Near-Term Milestones
                  </div>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700">
                    <li>Single-sector hot-fire at pressure; initial NOx & stability maps</li>
                    <li>Means-of-Compliance draft & safety artifacts (ARP/DO)</li>
                    <li>Core-engine test plan with DOA/ODA; supplier MoUs finalized</li>
                    <li>Multi-authority certification mapping (EASA/FAA/DGAC-CR)</li>
                  </ol>
                </div>

                {/* FAQ */}
                <div className="grid gap-3">
                  <details className="rounded-xl border border-slate-200 bg-white p-4">
                    <summary className="cursor-pointer font-semibold text-slate-900">
                      What differentiates you from incumbents?
                    </summary>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      We execute at engine level now—owning mixing, staging, controls, and
                      validated emissions data. That creates licensing/retrofit revenue while
                      we mature an aircraft <em>family</em>. Incumbents move on long timelines;
                      our edge is speed-to-evidence with certification front-loaded.
                    </p>
                  </details>
                  <details className="rounded-xl border border-slate-200 bg-white p-4">
                    <summary className="cursor-pointer font-semibold text-slate-900">
                      Why gaseous hydrogen (non-cryogenic)?
                    </summary>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Faster test cadence and fewer operational complexities for near-term
                      demos. It’s ideal for proving combustion, safety, and emissions while
                      building partner and market traction across multiple countries.
                    </p>
                  </details>
                  <details className="rounded-xl border border-slate-200 bg-white p-4">
                    <summary className="cursor-pointer font-semibold text-slate-900">
                      How do you manage safety & certification risk?
                    </summary>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Alignment with ARP4754A/ARP4761, DO-160, and DO-178C; HAZOP/FMEA with
                      defined PRD and ventilation strategies; and early DOA/ODA engagement to
                      lock means-of-compliance for multi-authority pathways.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  function GlobalOps() {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-8 lg:p-10 overflow-hidden">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-[-0.01em]">
                Built for Multi-Country Operations
              </h3>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                {[
                  "Exportable Cert Artifacts",
                  "Multi-Airport Ground Ops",
                  "Modular Tank Architecture",
                  "Route Flexibility",
                ].map((x) => (
                  <span
                    key={x}
                    className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1"
                  >
                  {x}
                </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="text-sm font-extrabold text-slate-900">Certification Pathways</div>
                <p className="mt-2 text-slate-700 text-sm">
                  Evidence and artifacts aligned to <strong>EASA</strong>, <strong>FAA</strong>, and partner authorities—scoped for efficient adoption
                  beyond Costa Rica.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="text-sm font-extrabold text-slate-900">Airport Compatibility</div>
                <p className="mt-2 text-slate-700 text-sm">
                  Ground-ops playbooks for fueling, PRD/ventilation, and rapid turnaround across diverse airport infrastructures.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="text-sm font-extrabold text-slate-900">Scalable Aircraft Family</div>
                <p className="mt-2 text-slate-700 text-sm">
                  Sizing studies from short-haul to trans-national missions, sharing engine core, controls, and H₂ architecture.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/program/global"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2"
              >
                See our global rollout plan →
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  /** ---------- CONTACT CTA ---------- */
  function ContactCTA() {
    return (
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(900px_500px_at_80%_-10%,#5b8cff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20 text-white">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.01em]">Let’s build the fastest certifiable path to hydrogen aviation.</h3>
          <p className="mt-3 text-white/80">
            invest@colibriv.com • press@colibriv.com • careers@colibriv.com — Liberia, Guanacaste, Costa Rica
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/contact" className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-base font-semibold text-slate-900 hover:opacity-90">
              Contact Us
            </Link>
            <Link href="/investors/overview" className="inline-flex items-center rounded-xl border border-white/40 px-5 py-3 text-base font-semibold text-white hover:bg-white/10">
              Investor Overview
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <HeroRotator
        sideLabel="Open Round"
        sideText="We’re raising to achieve pressurized single-sector hot-fire and publish our NOx/stability maps. Engines first. Aircraft next."
        sideButtonText="Contact the Team"
        sideButtonHref="/contact"
      />
      {/* Render media block whose field_path === "/" */}
      <RouteMediaBlock path="/" />
      <TitleTextCardBlock path="/" />
      <SafetyStrip />
      <ListCardsBlock path="/" />
      <BodyMediaBlock path="/" />

      <InvestorStrip />
      <GlobalOps />

      <LatestArticlesBlock />

      <ContactCTA />
    </>
  )
}
