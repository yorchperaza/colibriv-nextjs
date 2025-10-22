// app/technology/page.tsx
import type { Metadata } from "next"
import HeroStackBlock from "@/components/blocks/HeroStackBlock"
import ListCardsWithDescriptionBlock from "@/components/blocks/ListCardsWithDescriptionBlock"
import StackOverviewCardsBlock from "@/components/blocks/StackOverviewCardsBlock"
import TitleTextTextBlock from "@/components/blocks/TitleTextTextBlock"
import FaqsBlock from "@/components/blocks/FaqsBlock"
import TitleDescriptionLinkCardWithBlock from "@/components/blocks/TitleDescriptionLinkCardWithBlock"
import GreyListOfCardsBlock from "@/components/blocks/GreyListOfCardsBlock";
import TitleDescriptionLinkCardBlock from "@/components/blocks/TitleDescriptionLinkCardBlock"
import TitleDescriptionCardsColumnsBlock from "@/components/blocks/TitleDescriptionCardsColumnsBlock"
import TitleDescriptionCardsBlock from "@/components/blocks/TitleDescriptionCardsBlock"
import TitleDescriptionLinkCardsColBlock from "@/components/blocks/TitleDescriptionLinkCardsColBlock"

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

export default function TechnologyPage() {
  return (
    <>
      {/* Hero from Drupal block filtered by field_path = "/technology/engines" */}
      <HeroStackBlock path="/technology/engines" />
      <ListCardsWithDescriptionBlock path="/technology/engines" />
      <TitleDescriptionLinkCardWithBlock path="/technology/engines" />

      <StackOverviewCardsBlock path="/technology/engines" />
      <TitleTextTextBlock path="/technology/engines" />
      <GreyListOfCardsBlock path="/technology/engines" />
      <TitleDescriptionLinkCardBlock path="/technology/engines" />
      <TitleDescriptionCardsColumnsBlock path="/technology/engines" />
      <TitleDescriptionCardsBlock path="/technology/engines" />
      <TitleDescriptionLinkCardsColBlock path="/technology/engines" />

      <FaqsBlock path="/technology/engines" />
    </>
  )
}
