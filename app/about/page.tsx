// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — ColibriV & Jorge Peraza",
  description:
    "Learn about ColibriV’s mission and the background of founder Jorge Peraza — building an engines-first, cert-ready path to hydrogen-combustion aviation.",
  openGraph: {
    title: "About — ColibriV & Jorge Peraza",
    description:
      "Engines first. Certification from day one. Meet the team and our founder’s story.",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_0%_-10%,#fee2e2_0%,transparent_60%),radial-gradient(900px_500px_at_100%_10%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 lg:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <span className="block h-1.5 w-1.5 rounded-full bg-red-600" /> About ColibriV
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.01em] text-slate-900">
            Building the fastest certifiable path to hydrogen aviation
          </h1>
          <p className="mt-5 max-w-3xl text-lg sm:text-xl text-slate-700">
            Engines first. Certification from day one. We’re turning pressurized hot-fire evidence into products
            operators can adopt—then scaling to <strong>mid–long range passenger</strong> programs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/technology/engines"
              className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95"
            >
              Explore the Technology
            </Link>
            <Link
              href="/program/roadmap"
              className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              See the Roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOUNDER BIO ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-[1fr_1.6fr] items-start">
          {/* Portrait / quick facts */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <Image
                alt="Jorge Peraza portrait"
                src="/images/jorge-peraza.jpg"
                width={800}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-5">
              <div className="text-sm font-semibold text-slate-500">Founder</div>
              <h2 className="text-2xl font-extrabold text-slate-900">Jorge Peraza</h2>
              <p className="mt-2 text-slate-700 text-sm">
                Program leadership, certification-first thinking, and partner development across technology and operations.
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              {/* mailto stays as <a> */}
              <a
                href="mailto:jorge@colibriv.com"
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                Contact Us
              </a>

              {/* ✅ internal routes use <Link> */}
              <div className="flex flex-wrap gap-2 text-sm">
                <Link className="underline underline-offset-4 text-slate-900" href="/investors">
                  Investor Overview
                </Link>
                <Link className="underline underline-offset-4 text-slate-900" href="/partners">
                  Partner With Us
                </Link>
                <Link className="underline underline-offset-4 text-slate-900" href="/program/testbed">
                  Visit Testbed
                </Link>
              </div>
            </div>
          </aside>

          {/* Narrative */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-red-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-red-700 ring-1 ring-red-600/20">
              Bio
            </div>
            <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              From first principles to certifiable products
            </h3>
            <div className="prose prose-slate mt-4 max-w-none">
              <p>
                Jorge Peraza leads ColibriV’s <strong>engines-first hydrogen-combustion program</strong>, aligning
                <em> R&amp;D</em>, safety artifacts, and partner operations into a single evidence pipeline.
                His focus is turning <strong>pressurized hot-fire data</strong>—NOx/stability maps and flashback margins—
                into certifiable designs and airport-pragmatic procedures.
              </p>
              <p>
                Before ColibriV, Jorge built <strong>high-scale software &amp; data platforms</strong> in safety-adjacent
                domains: manufacturing systems, telemetry streams, and reliability analytics that convert billions of
                events into <strong>operator-visible actions</strong>. That playbook powers ColibriV’s automation:
                every test point flows into <strong>HAZOP/FMEA updates</strong>, NOx/stability maps, and
                <strong> means-of-compliance</strong> bundles aligned to ARP/DO frameworks.
              </p>
              <p>
                With ColibriV headquartered in <strong>Liberia, Guanacaste (LIR)</strong>, Jorge emphasizes fast iteration
                with cooperative authorities and real-world ground ops: PRD strategy, ventilation, purge, detection, and
                rapid turnarounds—scaling to <strong>mid–long range passenger</strong> missions.
              </p>
            </div>

            {/* Quick highlights */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { k: "Software", v: "Data platforms & telemetry", d: "Streaming analytics • reliability" },
                { k: "Scale", v: "Large, multi-team programs", d: "Manufacturing • field ops • suppliers" },
                { k: "Safety", v: "Evidence pipelines", d: "Test → artifacts → authority packs" },
                { k: "Combustion", v: "Pressurized single-sector", d: "NOx & stability mapping" },
                { k: "Range Focus", v: "Mid–long range passenger", d: "Shared core • multi-country ops" },
                { k: "Base", v: "Liberia (LIR), Costa Rica", d: "Cooperative authorities • velocity" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="text-sm font-semibold text-slate-500">{x.k}</div>
                  <div className="mt-1 text-lg font-extrabold text-slate-900">{x.v}</div>
                  <div className="mt-2 text-sm text-slate-600">{x.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MID PAGE IMAGE ===== */}
      <section aria-label="Featured media" className="my-6 lg:my-10 w-full">
        <Image
          alt="ColibriV test operations in Liberia, Guanacaste"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          src="/images/about-background-image.jpg"
        />
      </section>

      {/* ===== VALUES / PRINCIPLES ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              What we stand for
            </h3>
            <p className="mt-3 text-slate-700">
              Evidence over claims. Operator reality over demos. Certification as a product.
            </p>
          </div>
          <ul className="space-y-3 text-slate-700">
            <li>• <strong>Certification-ready:</strong> every activity ties to an artifact or analysis.</li>
            <li>• <strong>Operator-first:</strong> fueling, PRD, ventilation, detection, and turnarounds that fit airports.</li>
            <li>• <strong>Data-driven:</strong> pressurized maps for NOx, stability, and flashback margins.</li>
            <li>• <strong>Scalable:</strong> mid–long range passenger missions with shared core and controls.</li>
            <li>• <strong>Transparency:</strong> clear risks, mitigations, and timelines.</li>
          </ul>
        </div>
      </section>

      {/* ===== SELECTED PROJECTS ===== */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-[-0.01em] text-slate-900">Selected Projects</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-500">High-Scale Telemetry</div>
              <div className="mt-1 text-lg font-extrabold text-slate-900">Streaming Reliability Analytics</div>
              <p className="mt-2 text-sm text-slate-600">Unified pipeline from device to dashboard; anomaly detection and triage workflows.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-500">Manufacturing Systems</div>
              <div className="mt-1 text-lg font-extrabold text-slate-900">Traceability & Quality</div>
              <p className="mt-2 text-sm text-slate-600">Full-stack apps tying MES events to field outcomes for faster containment.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-500">Safety-Adjacent</div>
              <div className="mt-1 text-lg font-extrabold text-slate-900">Evidence Automation</div>
              <p className="mt-2 text-sm text-slate-600">Test logs → plots → artifact bundles aligned to ARP/DO frameworks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">Milestones</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "M0", v: "Architecture down-select & supplier MoUs" },
              { k: "M1", v: "Single-sector cold-flow + ignition; flashback margins" },
              { k: "M2", v: "Pressurized hot-fire; early NOx & stability maps" },
              { k: "M3", v: "Core-engine H₂ ground-run plan with DOA/ODA partner" },
            ].map((m) => (
              <div key={m.k} className="relative rounded-2xl border border-slate-200 bg-white p-6">
                <div className="absolute -top-3 left-6 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold text-white">
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
              Full program timeline →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PRESS / MEDIA KIT ===== */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-start">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-[-0.01em] text-slate-900">Press &amp; Media</h3>
            <p className="mt-2 text-slate-700">
              For interviews or background on hydrogen-combustion turbofans, press can contact Jorge directly.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {/* mailto stays as <a> */}
              <a href="mailto:press@colibriv.com" className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95">
                Email Press
              </a>
              <Link href="/news" className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white">
                News & updates
              </Link>
            </div>
          </div>
          <aside className="rounded-2xl border border-slate-200 bg-white p-6">
            <h4 className="text-lg font-extrabold text-slate-900">Downloads</h4>
            <ul className="mt-3 space-y-2 text-slate-700 text-sm">
              <li>• Founder portrait (hi-res) — <span className="text-slate-500">/assets/press/jorge-peraza.jpg</span></li>
              <li>• Logo pack — <span className="text-slate-500">/assets/press/colibriv-logos.zip</span></li>
              <li>• One-pager — <span className="text-slate-500">/assets/press/colibriv-brief.pdf</span></li>
            </ul>
          </aside>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 lg:p-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-[-0.01em] text-slate-900">
                Let’s build this together.
              </h3>
              <p className="mt-1 text-slate-700">
                Operators, suppliers, regulators, and investors—reach out to Jorge anytime.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {/* mailto stays as <a> */}
              <a
                href="mailto:jorge@colibriv.com"
                className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95"
              >
                Email Us
              </a>
              <Link
                href="/partners"
                className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Partner with us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
