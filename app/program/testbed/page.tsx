// app/program/testbed/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title:
    "Testbed — Liberia, Guanacaste, Costa Rica (LIR) | ColibriV Hydrogen-Combustion",
  description:
    "ColibriV’s engine and systems testbed in Liberia (LIR): pressurized single-sector rigs, NOx & stability mapping, PRD/ventilation validation, and airport-ops rehearsal for mid–long range passenger programs.",
  openGraph: {
    title:
      "Testbed — Liberia, Guanacaste, Costa Rica (LIR) | ColibriV Hydrogen-Combustion",
    description:
      "Pressurized hot-fire, emissions maps, and airport-ready ground ops—all at Liberia (LIR) to accelerate certification evidence.",
  },
};

export default function TestbedPage() {
  return (
    <main className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_0%_-20%,#fee2e2_0%,transparent_60%),radial-gradient(900px_500px_at_100%_10%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <span className="block h-1.5 w-1.5 rounded-full bg-red-600" />
            Liberia, Guanacaste, Costa Rica (LIR)
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.01em] text-slate-900">
            Engine &amp; Systems Testbed
          </h1>

          <p className="mt-5 max-w-3xl text-lg sm:text-xl text-slate-700">
            Built to convert <strong>pressurized hot-fire data</strong> into certification artifacts—fast. Engines
            first, then <strong>mid–long range passenger</strong> programs. We run{" "}
            <strong>compressed gaseous H₂ (350–700 bar)</strong>—no cryogenics—to accelerate iteration.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/program/roadmap"
              className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              See Roadmap
            </Link>
            <Link
              href="/technology/engines"
              className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              Explore Engine Tech
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY LIBERIA (LIR) ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              Why Liberia (LIR)?
            </h2>
            <p className="mt-4 text-slate-700">
              Cooperative authorities, stable climate, logistics access, and airport-adjacent sites enable
              <strong> faster cycles</strong> from design to data—and earlier certification engagement.
            </p>
          </div>
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {[
              {
                h: "Velocity",
                b: "Weather windows & streamlined site access keep rigs hot and schedules tight.",
              },
              {
                h: "Authority Access",
                b: "Proactive engagement for approvals, safety reviews, and test permits.",
              },
              {
                h: "Ops Realism",
                b: "Refuel, PRD/ventilation, and turnaround rehearsals under airport constraints.",
              },
              {
                h: "Talent & Outreach",
                b: "Attractive location for hiring; sustainability profile aids partnerships.",
              },
            ].map((x) => (
              <div
                key={x.h}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="text-sm font-semibold text-slate-500">{x.h}</div>
                <div className="mt-1 text-slate-700">{x.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FACILITIES & CAPABILITIES ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              Facilities &amp; Capabilities
            </h2>
            <div className="hidden sm:block h-[2px] w-40 bg-gradient-to-r from-red-600 via-red-600/60 to-transparent rounded-full" />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Single-Sector Rigs",
                d: "Pressurized hot-fire with optical access, staged mixing, ignition/ blowout mapping.",
              },
              {
                t: "Emissions Lab",
                d: "NOx analyzers, sampling lines, calibration gases; temperature/pressure grids for maps.",
              },
              {
                t: "DAQ & Controls",
                d: "High-speed acquisition, purge & interlock logic, health monitoring and transient capture.",
              },
              {
                t: "H₂ Storage & Delivery",
                d: "Type-IV bundles, regulation to setpoints, PRD validation, ventilation paths, detection.",
              },
              {
                t: "Safety Envelope",
                d: "Blast/deflection design, alarm logic, e-stops, muster zones, procedures & drills.",
              },
              {
                t: "Reporting Pipeline",
                d: "Automated plots, run sheets, and versioned artifacts → certification packs.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-lg font-extrabold text-slate-900">{c.t}</div>
                <p className="mt-2 text-slate-700">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SITE DIAGRAM + LINKS ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
                Test Flow at LIR
              </h2>
              <ol className="mt-6 space-y-4 text-slate-700">
                {[
                  {
                    n: 1,
                    b: (
                      <>
                        <strong>Fuel Receipt:</strong> Gaseous H₂ arrives to storage yard; quality &amp; pressure checks.
                      </>
                    ),
                  },
                  {
                    n: 2,
                    b: (
                      <>
                        <strong>Regulation &amp; Purge:</strong> Manifolds, check valves, and regulators align to setpoints;
                        line purge &amp; leak checks.
                      </>
                    ),
                  },
                  {
                    n: 3,
                    b: (
                      <>
                        <strong>Hot-Fire:</strong> Ignition, stability sweeps, and φ/load grids for emissions maps.
                      </>
                    ),
                  },
                  {
                    n: 4,
                    b: (
                      <>
                        <strong>Data &amp; Artifacts:</strong> Automated plots, run summaries, and MoC-ready attachments.
                      </>
                    ),
                  },
                ].map((s) => (
                  <li key={s.n} className="flex gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
                      {s.n}
                    </span>
                    <span>{s.b}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/technology/storage"
                  className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  Storage &amp; Delivery
                </Link>
                <Link
                  href="/technology/ai"
                  className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95"
                >
                  Controls &amp; Software
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 relative overflow-hidden">
                {/* Replaced <img> with Next <Image /> (fill) */}
                <Image
                  alt="Liberia testbed and surroundings"
                  src="/images/lir-aeropuerto.jpg"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  priority={false}
                />
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Layout emphasizes safe flow paths, ventilation, and fast reconfiguration between test articles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMAGE BREAK (like homepage mid-image) ===== */}
      <section aria-label="Featured media" className="my-6 lg:my-10 w-full">
        {/* Replaced <img> with Next <Image /> */}
        <Image
          alt="Liberia testbed and surroundings"
          src="/images/airplane-buildings.jpg"
          className="w-full h-auto object-cover"
          width={1920}
          height={1080}
          sizes="100vw"
          priority={false}
        />
      </section>

      {/* ===== SAFETY SYSTEMS ===== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
                Safety &amp; Compliance
              </h2>
              <p className="mt-3 text-slate-700">
                We align to <strong>ARP4754A/4761</strong>, <strong>DO-160</strong>, and airport norms; advisory AI is
                kept <em>out</em> of safety-critical paths.
              </p>
            </div>
            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              {[
                "PRD strategy validated under representative scenarios",
                "Ventilation, purge, and leak detection with alarm logic",
                "Interlocks, e-stops, muster plans and drills",
                "HAZOP/FMEA with traceable mitigations & evidence",
              ].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="text-slate-700">{i}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOGISTICS & SUPPLY ===== */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
                Logistics &amp; Supply Interfaces
              </h2>
              <div className="prose prose-slate mt-4 max-w-none">
                <ul>
                  <li>
                    <strong>Inbound H₂:</strong> Supplier MoUs; receipt QA, pressure checks, and buffer strategies.
                  </li>
                  <li>
                    <strong>Trucking &amp; Yard:</strong> Secure access, turn radius, staging &amp; marshalling zones.
                  </li>
                  <li>
                    <strong>Power &amp; Utilities:</strong> Stable site power with backup, compressed air, cooling water.
                  </li>
                  <li>
                    <strong>Waste &amp; Environmental:</strong> Handling procedures and local compliance alignment.
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h3 className="font-extrabold text-slate-900">Partner &amp; Approval Lanes</h3>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>• Test permits and site safety reviews with local authorities</li>
                <li>• Airport coordination for fueling bay rehearsals &amp; turnarounds</li>
                <li>• DOA/ODA engagement for flight testbed readiness</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95"
                >
                  Become a partner
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
        </div>
      </section>

      {/* ===== KPIs ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            Testbed KPIs
          </h2>
          <p className="mt-3 text-slate-700">Operational metrics guiding cadence and quality.</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Hot-Fire Cadence", v: "≥ 3 runs/week", d: "Target during campaign windows." },
              { k: "Test Uptime", v: "≥ 98%", d: "Spare modules and hot-swap approach." },
              { k: "Emission Map Coverage", v: "φ grid ≥ 70%", d: "Expanding to high-load regime." },
              { k: "Artifact Latency", v: "< 48 hours", d: "Data → plots → traceable exports." },
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

      {/* ===== TESTBED MILESTONES ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            Testbed Milestones
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "T0", v: "Site prep, utilities, permits, safety plans" },
              { k: "T1", v: "Cold-flow + ignition at rig; interlocks validated" },
              { k: "T2", v: "Pressurized hot-fire; NOx & stability map v1" },
              { k: "T3", v: "Ops rehearsals: PRD, ventilation, turnaround" },
            ].map((m) => (
              <div key={m.k} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="absolute -top-3 left-6 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold text-white shadow-sm">
                  {m.k}
                </div>
                <p className="mt-4 text-slate-700">{m.v}</p>
                <div className="mt-4 h-1 w-16 rounded-full bg-red-600/80" />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/program/roadmap"
              className="text-slate-900 font-semibold underline decoration-red-600 decoration-2 underline-offset-4"
            >
              Full program roadmap →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQs (closed by default) ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              FAQs
            </h2>
            <div className="hidden sm:block h-[2px] w-40 bg-gradient-to-r from-red-600 via-red-600/60 to-transparent rounded-full" />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              {
                q: "Do you use liquid hydrogen?",
                a: "No—our near-term program uses compressed gaseous H₂ (350–700 bar) to avoid cryogenic complexity and move faster on emissions, safety, and certification.",
              },
              {
                q: "How are tests authorized?",
                a: "Through site safety plans, authority reviews, and airport coordination. Evidence and procedures are versioned for audits.",
              },
              {
                q: "What about noise and environmental controls?",
                a: "Deflection, muffling strategies, and monitoring plans are part of the testbed design; environmental compliance is tracked with artifacts.",
              },
              {
                q: "How does this lead to passenger aircraft?",
                a: "Engine evidence (NOx, stability, safety) and airport-ops rehearsal feed into core runs, flight testbeds, and global certification mapping for mid–long range missions.",
              },
            ].map((item) => (
              <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
            >
              Talk to the team
            </Link>
            <Link
              href="/technology/safety"
              className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              Safety &amp; certification approach
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
                Join partners advancing combustor, storage &amp; delivery, and airport operations at LIR.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
              >
                Contact the team
              </Link>
              <Link
                href="/program"
                className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Program overview →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
