// app/partners/page.tsx
import type { Metadata } from "next"
import HeroStackBlock from "@/components/blocks/HeroStackBlock"
import FaqsBlock from "@/components/blocks/FaqsBlock"
import GreyListOfCardsBlock from "@/components/blocks/GreyListOfCardsBlock";
import TitleDescriptionLinkCardBlock from "@/components/blocks/TitleDescriptionLinkCardBlock"
import TitleDescriptionCardsColumnsBlock from "@/components/blocks/TitleDescriptionCardsColumnsBlock"
import TitleDescriptionLinkCardsColBlock from "@/components/blocks/TitleDescriptionLinkCardsColBlock"
import RouteMediaBlock from "@/components/blocks/RouteMediaBlock"
import ListCardsBlock from "@/components/blocks/ListCardsBlock"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Partners — Collaborate with ColibriV",
  description:
    "Co-develop hydrogen-combustion technology with ColibriV: combustor modules, high-pressure H₂ storage & delivery, controls/analytics, airport pilots, and certification evidence—engines first, mid–long range passenger next.",
  openGraph: {
    title: "Partners — Collaborate with ColibriV",
    description:
      "Join as an industry, airport, research, or investor partner to accelerate cert-ready hydrogen-combustion for mid–long range passenger flight.",
  },
};

export default function PartnersPage() {
  return (
    <>
      {/* Hero from Drupal block filtered by field_path = "/partners" */}
      <HeroStackBlock path="/partners" />
      <TitleDescriptionCardsColumnsBlock path="/partners" />
      <RouteMediaBlock path="/partners" />

      <TitleDescriptionLinkCardsColBlock path="/partners" />
      <GreyListOfCardsBlock path="/partners" />
      <TitleDescriptionLinkCardBlock path="/partners" />
      <ListCardsBlock path="/partners" />
      <FaqsBlock path="/partners" />
      {/* ===== CLOSING CTA ===== */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 lg:p-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-[-0.01em] text-slate-900">
                Build the fastest certifiable path to hydrogen aviation.
              </h3>
              <p className="mt-1 text-slate-700">
                Engines first. Evidence-driven. Exportable across authorities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95"
              >
                Partner with us
              </Link>
              <Link
                href="/technology/engines"
                className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Explore technology →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
