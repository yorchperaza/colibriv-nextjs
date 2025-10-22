// app/program/roadmap/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Program Roadmap — Engine Evidence → Passenger Aircraft | ColibriV",
  description:
    "Milestones from pressurized single-sector hot-fire and NOx/stability maps to core-engine H₂ runs, flight testbed, and multi-authority certification for mid–long range passenger aircraft.",
  openGraph: {
    title: "Program Roadmap — Engine Evidence → Passenger Aircraft | ColibriV",
    description:
      "A cert-aligned sequence: emissions maps, core run, flight testbed, airport pilots, and global certification mapping.",
  },
};

export default function RoadmapPage() {
  return (
    <main className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_550px_at_0%_-10%,#fee2e2_0%,transparent_60%),radial-gradient(900px_500px_at_100%_10%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <span className="block h-1.5 w-1.5 rounded-full bg-red-600" />
            Roadmap &amp; Milestones
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.01em] text-slate-900">
            Engine Evidence → Passenger Aircraft
          </h1>
          <p className="mt-5 max-w-3xl text-lg sm:text-xl text-slate-700">
            A paced sequence that prioritizes data, safety, and certification. Each milestone unlocks the next—culminating
            in mid–long range passenger operations across multiple authorities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/program"
              className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
            >
              Back to Program
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              Partner with us
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE GRID ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            Milestones &amp; Deliverables
          </h2>
          <p className="mt-3 text-slate-700">
            Dependencies and artifacts are explicit to keep the pace across engineering, certification, and operations.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                code: "M0",
                title: "Architecture & Safety Plan",
                body:
                  "Down-select, supplier MoUs, HAZOP/FMEA v1, PRD & ventilation strategy, test rig approvals.",
                deps: "—",
                out: "Test authorization, baseline safety artifacts.",
              },
              {
                code: "M1",
                title: "Single-Sector: Cold-Flow + Ignition",
                body:
                  "Ignition mapping and flashback margins (unpressurized/low-pressure); DAQ and interlocks validated.",
                deps: "M0",
                out: "Ignition map v1, safety interlocks validated.",
              },
              {
                code: "M2",
                title: "Pressurized Hot-Fire",
                body:
                  "Single-sector hot-fire at pressure; NOx and stability maps across φ / load; initial geometry tuning.",
                deps: "M1",
                out: "NOx/stability map v1; geometry shortlist.",
              },
              {
                code: "M3",
                title: "Core-Engine H₂ Ground Run",
                body:
                  "Fuel metering, transients, surge margins; controls/health monitoring; engine-airframe trades.",
                deps: "M2",
                out: "Core run data pack; controls tuning notes.",
              },
              {
                code: "M4",
                title: "Flight Testbed Kick-off",
                body:
                  "DOA/ODA engagement, approvals, airframe integration plan; airport ops rehearsal.",
                deps: "M3",
                out: "Testbed plan & approvals; ops playbooks v1.",
              },
              {
                code: "M5",
                title: "Global Cert Mapping",
                body:
                  "Means-of-compliance drafts for EASA/FAA + partner authorities; artifact packaging and deltas.",
                deps: "M2–M4",
                out: "Authority-specific packs; audit trail v1.",
              },
              {
                code: "M6",
                title: "Airport Pilots",
                body:
                  "Refuel/turnaround rehearsals; PRD/ventilation validation; procedures, training & maintenance flows.",
                deps: "M4–M5",
                out: "Ops playbooks v2; partner sign-offs.",
              },
              {
                code: "M7",
                title: "Passenger Program Gate",
                body:
                  "Sizing for mid–long range aircraft; supply plan; international deployment sequencing.",
                deps: "M5–M6",
                out: "Go/No-Go; aircraft program launch.",
              },
            ].map((m) => (
              <article key={m.code} className="relative rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-sm">
                <div className="absolute -top-3 left-6 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold text-white">
                  {m.code}
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-slate-900">{m.title}</h3>
                <p className="mt-2 text-slate-700">{m.body}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="text-[11px] font-semibold uppercase text-slate-500">Depends</div>
                    <div className="mt-1 text-slate-800">{m.deps}</div>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="text-[11px] font-semibold uppercase text-slate-500">Outputs</div>
                    <div className="mt-1 text-slate-800">{m.out}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/contact"
              className="text-slate-900 font-semibold underline decoration-red-600 decoration-2 underline-offset-4"
            >
              Join a milestone as a partner →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== IMAGE BREAK (like homepage) ===== */}
      <section aria-label="Featured media" className="my-6 lg:my-10 w-full">
        <Image
          alt="Testbed and hydrogen systems"
          className="w-full h-auto object-cover"
          src="/images/turbofan.jpg"
          width={1920}
          height={1080}
          sizes="100vw"
          priority={false}
        />
      </section>

      {/* ===== RISK TABLE (GREY CARDS) ===== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
                Risks &amp; Mitigations
              </h2>
              <p className="mt-3 text-slate-700">
                We continuously reduce technical and certification risk—with traceable artifacts.
              </p>
            </div>
            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              {[
                { k: "Flashback / Stability", v: "Pressurized maps; staged mixing; ignition control" },
                { k: "Emissions", v: "Lean-premix/micromix geometry tuning; NOx maps" },
                { k: "Ground Ops", v: "PRD, purge, ventilation, detection; playbooks" },
                { k: "Evidence", v: "Automated data capture; MoC drafts; audit trail" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="text-sm font-semibold text-slate-500">{x.k}</div>
                  <div className="mt-1 text-lg font-extrabold text-slate-900">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-[-0.01em] text-slate-900">
                Engines first. Certification from day one.
              </h3>
              <p className="mt-1 text-slate-700">
                Co-develop modules or host airport pilots to accelerate the path to mid–long range passenger service.
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
                href="/technology/engines"
                className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
              >
                See engine tech →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
