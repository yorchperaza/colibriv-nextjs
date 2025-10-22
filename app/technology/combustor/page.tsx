// app/combustor/page.tsx
import type { Metadata } from "next"
import HeroStackBlock from "@/components/blocks/HeroStackBlock"
import ListCardsWithDescriptionBlock from "@/components/blocks/ListCardsWithDescriptionBlock"
import FaqsBlock from "@/components/blocks/FaqsBlock"
import TitleDescriptionLinkCardWithBlock from "@/components/blocks/TitleDescriptionLinkCardWithBlock"
import TitleDescriptionCardsBlock from "@/components/blocks/TitleDescriptionCardsBlock"
import TitleDescriptionLinkCardsColBlock from "@/components/blocks/TitleDescriptionLinkCardsColBlock"
import ListCardsBlock from "@/components/blocks/ListCardsBlock"
import CardWithLabelBlock from "@/components/blocks/CardWithLabelBlock"
import BodyMediaBlock from "@/components/blocks/BodyMediaBlock"

export const metadata: Metadata = {
  title: "Engines — Hydrogen-Combustion Turbofans | ColibriV",
  description:
    "ColibriV’s hydrogen-combustion turbofans: ultra-low NOx combustor, high-pressure H₂ storage & delivery (350–700 bar), cert-aligned controls, and airport-ready operations.",
  openGraph: {
    title: "Engines — Hydrogen-Combustion Turbofans | ColibriV",
    description:
      "Jet-class thrust with compressed gaseous hydrogen, engineered for certification, safety, and rapid iteration.",
  },
};

export default function CombustorPage() {
  return (
    <>
      {/* Hero from Drupal block filtered by field_path = "/technology/combustor" */}
      <HeroStackBlock path="/technology/combustor" />
      <ListCardsWithDescriptionBlock path="/technology/combustor" />
      <ListCardsBlock path="/technology/combustor" />
      <TitleDescriptionLinkCardWithBlock path="/technology/combustor" />
      <CardWithLabelBlock path="/technology/combustor" />
      <BodyMediaBlock path="/technology/combustor" />
      <TitleDescriptionCardsBlock path="/technology/engines" />
      <TitleDescriptionLinkCardsColBlock path="/technology/engines" />
      <FaqsBlock path="/technology/combustor" />
    </>
  )
}
