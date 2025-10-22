// app/investors/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import InvestorsAnchorNav from "@/components/InvestorsAnchorNav";
import LatestArticlesBlock from "@/components/blocks/LatestArticlesBlock";

export const metadata: Metadata = {
  title: "Investors — ColibriV",
  description:
    "Invest in ColibriV’s engines-first hydrogen-combustion program: pressurized hot-fire campaigns, ultra-low NOx, cert-aligned artifacts, and a path to mid–long range passenger aircraft.",
  openGraph: {
    title: "Investors — ColibriV",
    description:
      "Engines first, certification from day one, scalable to mid–long range passenger programs.",
  },
};

export default function InvestorsPage() {
  return (
    <main className="bg-white">
      {/* ===== HERO / ANCHOR NAV ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_0%_-10%,#fee2e2_0%,transparent_60%),radial-gradient(900px_500px_at_100%_10%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10 lg:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <span className="block h-1.5 w-1.5 rounded-full bg-red-600" />
            Engines First → Passenger Programs
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.01em] text-slate-900">
            Investors
          </h1>
          <p className="mt-5 max-w-3xl text-lg sm:text-xl text-slate-700">
            We’re developing <strong>hydrogen-combustion turbofans</strong> with{" "}
            <strong>compressed gaseous H₂ (350–700 bar)</strong>—no cryogenics—then scaling to{" "}
            <strong>mid–long range passenger</strong> aircraft. Certification and safety from day one.
          </p>

          {/* Subnav */}
          <InvestorsAnchorNav offset={88} />
        </div>
      </section>

      {/* ===== OVERVIEW ===== */}
      <section id="overview" aria-label="Overview" className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-red-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-red-700 ring-1 ring-red-600/20">
              Investor Overview
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              Engines-first hydrogen program with exportable certification evidence
            </h2>
            <div className="prose prose-slate mt-4 max-w-none">
              <p>
                Near-term value comes from <strong>pressurized hot-fire</strong> results (NOx &amp; stability maps),{" "}
                <strong>flashback-safe mixing</strong>, and <strong>certifiable high-pressure storage &amp; delivery</strong>. We
                monetize via <strong>IP licensing</strong>, <strong>retrofit &amp; integration kits</strong>, and a{" "}
                <strong>scalable mid–long range passenger program</strong>.
              </p>
              <p>
                We focus where physics scales and certification matters: ultra-low NOx combustors, flashback resilience, H₂
                storage &amp; delivery at pressure, and airport-ready procedures—all aligned to ARP/DO processes.
              </p>
            </div>

            {/* Metrics / Theses */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { k: "Focus", v: "Hydrogen-combustion turbofans", d: "Gaseous H₂, 350–700 bar" },
                { k: "Near-Term Proof", v: "Pressurized hot-fire", d: "NOx & stability maps" },
                { k: "Safety & Cert", v: "ARP / DO alignment", d: "HAZOP/FMEA, PRD & ventilation" },
                { k: "Ops Reality", v: "Airport-pragmatic", d: "Turnarounds, detection, purge" },
                { k: "Scalability", v: "Passenger programs", d: "Mid–long range missions" },
                { k: "Monetization", v: "Licensing & kits", d: "Path to aircraft family" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="text-sm font-semibold text-slate-500">{x.k}</div>
                  <div className="mt-1 text-xl font-extrabold text-slate-900">{x.v}</div>
                  <div className="mt-2 text-sm text-slate-600">{x.d}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/program/roadmap" className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white">View roadmap</Link>
              <a href="#data-room" className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:opacity-95">Request data room access</a>
            </div>
          </div>

          {/* Funding bands + image */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
            <div className="grid gap-6">
              <div className="border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5">
                <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">Pre-Seed (Now)</div>
                <div className="mt-2 text-2xl font-extrabold text-slate-900">US$1.5–3.0M</div>
                <p className="mt-2 text-sm text-slate-600">
                  Deliver <strong>pressurized single-sector hot-fire</strong>, initial <strong>NOx/stability maps</strong>, and the safety plan to unlock core-engine run.
                </p>
              </div>
              <div className="border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5">
                <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">Seed (Next)</div>
                <div className="mt-2 text-2xl font-extrabold text-slate-900">US$10–12M</div>
                <p className="mt-2 text-sm text-slate-600">
                  Execute the <strong>core-engine H₂ ground run</strong>, kick off the <strong>flight testbed</strong>, and expand multi-authority certification pathways.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Image
                alt="Hot-fire campaign equipment at the LIR test yard"
                className="w-full h-auto rounded-xl object-cover border border-slate-200"
                src="/images/turbofan-3.jpg"
                width={1600}
                height={1000}
                sizes="(min-width: 1024px) 33vw, 100vw"
                priority={false}
              />
            </div>
          </aside>
        </div>
      </section>

      {/* ===== MID-PAGE IMAGE ===== */}
      <section aria-label="Featured media" className="my-6 lg:my-10 w-full">
        <Image
          alt="Engine architecture banner"
          className="w-full h-auto object-cover"
          src="/images/turbofan.jpg"
          width={1920}
          height={1080}
          sizes="100vw"
          priority={false}
        />
      </section>

      {/* ===== WHY INVEST (Thesis) ===== */}
      <section id="why-invest" className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-red-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-red-700 ring-1 ring-red-600/20">
              Investment Thesis
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              Why ColibriV is a compelling investment
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-lg font-extrabold text-slate-900">Engines-first = near-term value</div>
                <p className="mt-2 text-slate-700">
                  Hot-fire campaigns generate licensable IP and cert-ready artifacts quickly—before full aircraft certification.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-lg font-extrabold text-slate-900">Moat in data + safety</div>
                <p className="mt-2 text-slate-700">
                  Pressurized NOx/stability maps, flashback margins, and PRD/ventilation playbooks are hard-won and defensible.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-lg font-extrabold text-slate-900">Scales to mid–long range</div>
                <p className="mt-2 text-slate-700">
                  Turbofan thrust class and airport-pragmatic storage/delivery target routes that move the decarbonization needle.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-lg font-extrabold text-slate-900">Multiple monetization lanes</div>
                <p className="mt-2 text-slate-700">
                  Licensing, retrofit/integration kits, paid pilots with operators, and future aircraft programs.
                </p>
              </div>
            </div>

            {/* Market / Unit Economics / Risks */}
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-sm font-semibold text-slate-500">Market</div>
                <div className="mt-1 text-xl font-extrabold text-slate-900">Hydrogen aviation unlocks high-utilization routes</div>
                <p className="mt-2 text-sm text-slate-700">
                  Demand concentrates in short-to-mid/long-haul passenger networks where turbofans dominate and emissions matter most.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-sm font-semibold text-slate-500">Unit Economics (directional)</div>
                <div className="mt-1 text-xl font-extrabold text-slate-900">Licensing-first path</div>
                <p className="mt-2 text-sm text-slate-700">
                  Upfront license + per-engine royalty; integration kits with service margin; later aircraft margins layered on top.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-sm font-semibold text-slate-500">Risk / Mitigation</div>
                <div className="mt-1 text-xl font-extrabold text-slate-900">Flashback, NOx, ops</div>
                <p className="mt-2 text-sm text-slate-700">
                  Staged mixing, stability maps at pressure, PRD & ventilation drills; early DOA/ODA engagement and audit-ready artifacts.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#overview" className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white">
                Get the overview deck
              </Link>
              <Link href="/contact" className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:opacity-95">
                Book an investor call
              </Link>
            </div>
          </div>

          {/* Social proof / Logos placeholder */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
            <h3 className="font-extrabold text-slate-900">What partners look for</h3>
            <ul className="mt-3 space-y-2 text-slate-700 text-sm">
              <li>• Clear emissions map vs. kerosene baselines</li>
              <li>• Stability & flashback margins across φ / load</li>
              <li>• Ops playbooks: fueling bays, PRD, ventilation, detection</li>
              <li>• Traceable artifacts aligned to ARP/DO processes</li>
            </ul>
            <div className="mt-6 aspect-[16/10] rounded-xl bg-gradient-to-br overflow-hidden from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 relative border border-slate-200">
              <Image
                alt="Liberia, Guanacaste testbed"
                src="/images/lir-aeropuerto.jpg"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
                priority={false}
              />
            </div>
          </aside>
        </div>
      </section>

      {/* ===== WHY COSTA RICA / LIBERIA ===== */}
      <section id="why-costa-rica" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-red-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-red-700 ring-1 ring-red-600/20">
                Location Advantage
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
                Why Costa Rica — and why Liberia (LIR)
              </h2>
              <p className="mt-4 text-slate-700">
                Liberia, Guanacaste (LIR) is optimized for fast iteration: cooperative authorities, reliable weather, and
                proximity to H₂ logistics. The testbed turns design cycles into evidence quickly—reducing program risk.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { t: "Regulatory access", d: "Direct engagement with civil aviation & airport stakeholders; responsive approvals." },
                  { t: "Climate & cadence", d: "Stable weather windows and low ground-ops friction enable dense test schedules." },
                  { t: "Hydrogen logistics", d: "Local partners and ground infrastructure roadmaps shorten setup time." },
                  { t: "Talent & ecosystem", d: "STEM pipeline, sustainability brand, and supplier traction in the region." },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <div className="text-sm font-semibold text-slate-500">{x.t}</div>
                    <div className="mt-1 text-lg font-extrabold text-slate-900">{x.d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/program/testbed" className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:opacity-95">
                  Visit the Liberia testbed
                </Link>
                <Link href="/program" className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white">
                  See the program plan
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl relative border border-slate-200">
                <Image
                  alt="Liberia, Guanacaste testbed"
                  src="/images/lir-aeropuerto.jpg"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <p className="mt-3 text-sm text-slate-600">
                LIR test footprint supports single-sector rigs, emissions analyzers, and safety interlocks with room to expand toward
                core-engine run readiness.
              </p>
              <ul className="mt-4 space-y-2 text-slate-700 text-sm">
                <li>• Airport-compatible safety drills (PRD, ventilation, detection)</li>
                <li>• Partner MoUs for storage/valves/gas supply</li>
                <li>• Authority-ready artifact packaging</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== DATA ROOM ===== */}
      <section id="data-room" aria-label="Data Room" className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-red-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-red-700 ring-1 ring-red-600/20">
              Investor Data Room
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              Evidence, artifacts, and supplier traction under NDA
            </h2>
            <ol className="mt-6 space-y-4 text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">1</span>
                <span><strong>Test Evidence:</strong> NOx &amp; stability plots, run sheets, configuration notes.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">2</span>
                <span><strong>Safety &amp; Cert:</strong> HAZOP/FMEA snapshots, PRD &amp; ventilation strategy, MoC outline (ARP/DO).</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">3</span>
                <span><strong>Commercial:</strong> Supplier MoUs, airport pilot plans, licensing &amp; kit pathways.</span>
              </li>
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:opacity-95">
                Request NDA & access
              </Link>
              <Link href="#overview" className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white">
                Get the overview deck
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
            <h3 className="font-extrabold text-slate-900">What we share</h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>• Campaign timelines &amp; test plans (single-sector → core)</li>
              <li>• Data pack v1: plots + logs + context</li>
              <li>• Risk register &amp; mitigations (flashback, NOx, ops)</li>
              <li>• Cert mapping for multi-authority pathways</li>
            </ul>
            <div className="mt-6">
              <Image
                alt="Data room preview"
                className="w-full h-auto rounded-xl object-cover border border-slate-200"
                src="/images/turbofan-2.jpg"
                width={1600}
                height={1000}
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* ===== UPDATES ===== */}
      <section id="updates" aria-label="Updates">
        <LatestArticlesBlock />
      </section>

      {/* ===== INVESTOR FAQ (closed) ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">Investor FAQs</h2>
            <div className="hidden sm:block h-[2px] w-40 bg-gradient-to-r from-red-600 via-red-600/60 to-transparent rounded-full" />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              { q: "Are you focused on regional turboprops?", a: "No. Engines-first program aimed at mid–long range passenger missions with turbofans and gaseous H₂ (350–700 bar)." },
              { q: "Why non-cryogenic hydrogen now?", a: "Removes cryogenic complexity; accelerates hot-fire cadence, emissions mapping, and airport rehearsals." },
              { q: "How do you monetize near-term?", a: "Licensing of combustor/controls IP, retrofit & integration kits, and paid pilots—while the aircraft family matures." },
              { q: "Key technical risks?", a: "Flashback/stability and NOx. We mitigate with staged mixing, pressurized mapping, and controls; evidence feeds ARP/DO artifacts." },
              { q: "Certification plan?", a: "ARP4754A/ARP4761, DO-160, DO-178C alignment with early MoC drafting and DOA/ODA partners; evidence packs exportable to multiple authorities." },
              { q: "Where is the testbed?", a: "Liberia, Guanacaste, Costa Rica (LIR) for fast iteration and reliable ops windows." },
            ].map((item) => (
              <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer font-semibold text-slate-900">{item.q}</summary>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#data-room" className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95">
              Request NDA & data room
            </a>
            <Link href="/program/testbed" className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white">
              Visit our testbed
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 lg:p-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-[-0.01em] text-slate-900">
                Engines first. Certification from day one.
              </h3>
              <p className="mt-1 text-slate-700">
                Join the investors backing the fastest certifiable path to hydrogen aviation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95">
                Book an investor call
              </Link>
              <a href="#overview" className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white">
                Jump to overview →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
