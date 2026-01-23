// app/program/denver/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Denver, Colorado — Engineering &amp; Partnerships Center | ColibriV",
  description:
    "ColibriV&apos;s Denver facility serves as the company&apos;s primary engineering, program management, and strategic operations center for hydrogen-powered aviation.",
  openGraph: {
    title:
      "Denver, Colorado — Engineering &amp; Partnerships Center | ColibriV",
    description:
      "ColibriV&apos;s primary engineering, certification coordination, and investor governance center in Denver, Colorado.",
  },
};

export default function DenverPage() {
  return (
    <main className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_0%_-20%,#fee2e2_0%,transparent_60%),radial-gradient(900px_500px_at_100%_10%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <span className="block h-1.5 w-1.5 rounded-full bg-red-600" />
            Denver, Colorado, USA
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.01em] text-slate-900">
            Engineering &amp; Partnerships Center
          </h1>

          <p className="mt-5 max-w-3xl text-lg sm:text-xl text-slate-700">
            ColibriV&apos;s Denver facility serves as the company&apos;s{" "}
            <strong>primary engineering, program management, and strategic operations center</strong>.
            All core technical leadership, certification coordination, supplier integration, and
            investor governance functions are anchored in Denver.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              Contact Denver Team
            </Link>
            <Link
              href="/program/testbed"
              className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              View Test Facilities
            </Link>
          </div>
        </div>
      </section>

      {/* ===== U.S. OPERATIONAL CONTROL ===== */}
      <section className="bg-slate-900 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-red-500/30 bg-red-900/20 p-6 lg:p-8">
            <p className="text-lg sm:text-xl text-white font-medium">
              While ColibriV conducts specialized testing activities in international locations,{" "}
              <strong className="text-red-400">
                all program authority, intellectual property ownership, and certification strategy
                remain under U.S. operational control.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* ===== ROLE OF DENVER CENTER ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              Role of the Denver Center
            </h2>
            <div className="hidden sm:block h-[2px] w-40 bg-gradient-to-r from-red-600 via-red-600/60 to-transparent rounded-full" />
          </div>

          <p className="mt-4 text-slate-700 max-w-3xl">
            The Denver Engineering &amp; Partnerships Center is responsible for:
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Turbofan and hydrogen combustion system architecture",
              "Safety and compliance engineering oversight",
              "FAA and EASA certification coordination strategy",
              "Supplier qualification and contracting",
              "Systems integration governance",
              "Intellectual property management",
              "Investor reporting and financial controls",
              "Strategic partnerships with U.S. aerospace entities",
              "University and research collaborations",
              "Workforce development and talent acquisition",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <span className="mt-0.5 text-red-600 font-bold">•</span>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="text-red-800 font-semibold">
              Denver acts as the <strong>single source of program authority</strong> for ColibriV&apos;s
              propulsion and aircraft development roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY DENVER ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
              Why Denver?
            </h2>
            <p className="mt-4 text-slate-700">
              Denver was selected as ColibriV&apos;s headquarters due to its strategic advantages for
              aerospace innovation and certification pathways.
            </p>
          </div>
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {[
              {
                h: "Aerospace Ecosystem",
                b: "Proximity to major U.S. aerospace suppliers and engineering talent.",
              },
              {
                h: "Research Access",
                b: "Access to advanced research universities and aerospace programs.",
              },
              {
                h: "Business Environment",
                b: "Favorable business environment for aerospace innovation.",
              },
              {
                h: "Federal Alignment",
                b: "Strong federal, state, and commercial aerospace ecosystem.",
              },
              {
                h: "FAA Oversight",
                b: "Strategic alignment with FAA oversight pathways.",
              },
              {
                h: "Connectivity",
                b: "Logistical connectivity for national and international partners.",
              },
            ].map((x) => (
              <div
                key={x.h}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="text-sm font-semibold text-slate-500">{x.h}</div>
                <div className="mt-1 text-slate-700">{x.b}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 mt-8">
          <p className="text-slate-700 font-medium">
            ColibriV operates under U.S. corporate governance standards and maintains Denver as its
            primary decision-making headquarters.
          </p>
        </div>
      </section>

      {/* ===== CERTIFICATION & REGULATORY ALIGNMENT ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            Certification &amp; Regulatory Alignment
          </h2>
          <p className="mt-4 text-slate-700 max-w-3xl">
            All certification strategy, compliance documentation, and regulatory communications are
            directed from the Denver center.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "FAA Part 33",
                d: "Propulsion certification planning",
              },
              {
                t: "FAA Part 25",
                d: "Aircraft integration roadmap",
              },
              {
                t: "SMS Governance",
                d: "Safety Management System governance",
              },
              {
                t: "Configuration Management",
                d: "Configuration management and traceability",
              },
              {
                t: "Quality Systems",
                d: "Quality system alignment with aerospace standards",
              },
              {
                t: "Export Compliance",
                d: "Export compliance and technology control",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="text-lg font-extrabold text-slate-900">{c.t}</div>
                <p className="mt-2 text-slate-700">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-blue-800">
              International testing activities are executed under Denver-approved engineering authority
              and quality governance frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ENGINEERING LEADERSHIP ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
            Engineering Leadership
          </h2>
          <p className="mt-4 text-slate-700 max-w-3xl">
            ColibriV&apos;s core engineering leadership, safety governance, and program decision authority
            are based in Denver. This structure ensures that all development activities—regardless of
            location—remain fully aligned with U.S. aerospace certification and investor compliance
            expectations.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-slate-900 font-semibold">
              Denver functions as the <strong>technical and legal center of gravity</strong> for ColibriV.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PARTNERSHIPS & COLLABORATION ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
                Partnerships &amp; Collaboration
              </h2>
              <p className="mt-4 text-slate-700">
                From Denver, ColibriV coordinates partnerships with:
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "U.S. aerospace suppliers",
                  "Academic research institutions",
                  "Materials and hydrogen technology providers",
                  "Simulation and testing service providers",
                  "Certification advisory partners",
                  "Investment and financial compliance partners",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-0.5 text-red-600 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-slate-700 font-medium">
                All partnership agreements are governed under U.S. law and corporate oversight.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="font-extrabold text-slate-900">Distributed Development Model</h3>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="text-sm font-semibold text-red-700">Denver, Colorado</div>
                  <p className="mt-1 text-red-800">
                    Engineering authority, governance, certification, and corporate control
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold text-slate-500">Liberia, Guanacaste, Costa Rica</div>
                  <p className="mt-1 text-slate-700">
                    Specialized component testing and validation under Denver supervision
                  </p>
                </div>
              </div>
              <p className="mt-6 text-sm text-slate-600">
                This structure enables faster iteration while preserving U.S. regulatory alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== U.S. AEROSPACE LEADERSHIP COMMITMENT ===== */}
      <section className="bg-slate-900 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-white">
            Commitment to U.S. Aerospace Leadership
          </h2>
          <p className="mt-4 text-white/70 max-w-3xl mx-auto">
            ColibriV is committed to building its core propulsion and aircraft development programs under
            U.S. aerospace leadership standards, with Denver as the operational foundation.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Safety culture",
              "Certification discipline",
              "Investor transparency",
              "IP protection",
              "Program scalability",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/20 bg-white/5 p-4 text-white font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INVESTOR & REGULATORY DISCLOSURE ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border-2 border-slate-900 p-8 lg:p-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.01em] text-slate-900">
              Investor &amp; Regulatory Disclosure Statement
            </h2>
            <div className="mt-4 space-y-4 text-slate-700">
              <p>
                ColibriV, LLC is a U.S.-registered company. Denver, Colorado serves as the company&apos;s
                principal operational and engineering headquarters. International testing activities are
                conducted strictly as support functions under Denver-based engineering and governance control.
              </p>
              <p className="text-slate-500 text-sm">
                No forward-looking technical performance claims are made on this page. All development
                activities remain subject to regulatory approval, certification outcomes, and funding availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-[-0.01em] text-slate-900">
                Connect with the Denver Engineering Center
              </h3>
              <p className="mt-1 text-slate-700">
                Engineering partners, suppliers, universities, and investors are invited to collaborate.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
              >
                Contact the Denver Team
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
