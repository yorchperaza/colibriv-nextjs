// app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — ColibriV",
  description:
    "Get in touch with ColibriV. Talk to the team about partnerships, investment, media, careers, and our hydrogen-combustion program in Liberia, Costa Rica (LIR).",
  openGraph: {
    title: "Contact — ColibriV",
    description:
      "Partners, investors, press, and candidates — we’d love to hear from you.",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_0%_-10%,#fee2e2_0%,transparent_60%),radial-gradient(900px_500px_at_100%_10%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 lg:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <span className="block h-1.5 w-1.5 rounded-full bg-red-600" /> Contact
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.01em] text-slate-900">
            Let’s build hydrogen aviation together
          </h1>
          <p className="mt-5 max-w-3xl text-lg sm:text-xl text-slate-700">
            Partners, investors, media, and candidates — reach out. Our team
            operates from <strong>Liberia, Guanacaste (LIR)</strong> with a
            certification-first program for <strong>mid–long range passenger</strong> missions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* ===== QUICK CONTACT CARDS ===== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Partnerships",
                desc: "Suppliers, airports, operators, research programs.",
                email: "partners@colibriv.com",
              },
              {
                label: "Investors",
                desc: "Request the deck/data room and book time with the team.",
                email: "invest@colibriv.com",
              },
              {
                label: "Press & Media",
                desc: "Background, interviews, imagery, and quotes.",
                email: "press@colibriv.com",
              },
              {
                label: "Careers",
                desc: "Tell us how you’d help us move faster and safer.",
                email: "careers@colibriv.com",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="text-sm font-semibold text-slate-500">
                  {c.label}
                </div>
                <div className="mt-1 text-lg font-extrabold text-slate-900">
                  {c.desc}
                </div>
                <div className="mt-3">
                  <a
                    className="text-slate-900 font-semibold underline underline-offset-4"
                    href={`mailto:${c.email}`}
                  >
                    {c.email}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/investors"
              className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-base font-semibold text-white hover:bg-slate-800"
            >
              Investor Overview
            </Link>
            <Link
              href="/program/testbed"
              className="inline-flex items-center rounded-xl border-2 border-slate-300 px-5 py-3 text-base font-semibold text-slate-900 hover:border-slate-900 hover:bg-slate-50"
            >
              Visit the Testbed
            </Link>
          </div>
        </div>
      </section>

      {/* ===== INLINE IMAGE (like homepage mid image) ===== */}
      <section aria-label="Featured media" className="my-6 lg:my-10 w-full">
        <Image
          alt="Hydrogen-combustion development at LIR"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          src="/images/turbofan-4.jpg" // replace with CMS image if available
        />
      </section>

      {/* ===== CONTACT FORM (static markup) ===== */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
                Send us a message
              </h2>
              <p className="mt-2 text-slate-700">
                Share a bit about your interest and we’ll route to the right
                person.
              </p>

              <ContactForm />
            </div>

            {/* Contact info & location */}
            <aside className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
              <h3 className="text-xl font-extrabold text-slate-900">
                Direct contacts
              </h3>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>
                  • Founder —{" "}
                  <a
                    className="font-semibold underline underline-offset-4"
                    href="mailto:jorge@colibriv.com"
                  >
                    jorge@colibriv.com
                  </a>
                </li>
                <li>
                  • Partnerships —{" "}
                  <a
                    className="font-semibold underline underline-offset-4"
                    href="mailto:partners@colibriv.com"
                  >
                    partners@colibriv.com
                  </a>
                </li>
                <li>
                  • Investors —{" "}
                  <a
                    className="font-semibold underline underline-offset-4"
                    href="mailto:invest@colibriv.com"
                  >
                    invest@colibriv.com
                  </a>
                </li>
                <li>
                  • Press —{" "}
                  <a
                    className="font-semibold underline underline-offset-4"
                    href="mailto:press@colibriv.com"
                  >
                    press@colibriv.com
                  </a>
                </li>
                <li>
                  • Careers —{" "}
                  <a
                    className="font-semibold underline underline-offset-4"
                    href="mailto:careers@colibriv.com"
                  >
                    careers@colibriv.com
                  </a>
                </li>
              </ul>

              <div className="mt-8">
                <div className="text-sm font-semibold text-slate-500">
                  Testbed & Operations
                </div>
                <div className="mt-1 text-slate-900 font-extrabold">
                  Liberia, Guanacaste — Costa Rica (LIR)
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  We develop in Liberia for fast evidence cycles and airport-ready
                  hydrogen operations (PRD, ventilation, detection, rapid turnarounds).
                </p>
                <div className="mt-4">
                  <Link
                    href="/program/testbed"
                    className="text-slate-900 font-semibold underline underline-offset-4"
                  >
                    Learn about our testbed →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== FAQ STRIP ===== */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                q: "Why hydrogen combustion (not fuel cells)?",
                a: "Jet-class thrust with proven turbomachinery — while we drive NOx down via lean-premix/micromix strategies.",
              },
              {
                q: "Why Costa Rica / Liberia?",
                a: "Cooperative authorities, stable climate, and airport access — faster test cadence and exportable cert artifacts.",
              },
              {
                q: "What’s next on the roadmap?",
                a: "Pressurized single-sector hot-fire → NOx/stability maps → core-engine H₂ ground run with DOA/ODA partner.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <summary className="cursor-pointer font-semibold text-slate-900">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm leading-6 text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/technology/safety"
              className="text-slate-900 font-semibold underline underline-offset-4"
            >
              Our safety & certification approach →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 lg:p-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-[-0.01em] text-slate-900">
                Engines first. Certification from day one.
              </h3>
              <p className="mt-1 text-slate-700">
                Email us or book time — we’ll route you to the right person.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:jorge@colibriv.com"
                className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95"
              >
                Email Us
              </a>
              <Link
                href="/investors"
                className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Investor Overview
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
