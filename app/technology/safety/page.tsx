// app/safety/page.tsx
import type { Metadata } from "next"
import HeroStackBlock from "@/components/blocks/HeroStackBlock"
import ListCardsWithDescriptionBlock from "@/components/blocks/ListCardsWithDescriptionBlock"
import FaqsBlock from "@/components/blocks/FaqsBlock"
import TitleDescriptionLinkCardWithBlock from "@/components/blocks/TitleDescriptionLinkCardWithBlock"
import TitleDescriptionLinkCardsColBlock from "@/components/blocks/TitleDescriptionLinkCardsColBlock"
import GreyListOfCardsBlock from "@/components/blocks/GreyListOfCardsBlock"
import TitleDescriptionCardsColumnsBlock from "@/components/blocks/TitleDescriptionCardsColumnsBlock"
import TitleDescriptionCardsBlock from "@/components/blocks/TitleDescriptionCardsBlock"

export const metadata: Metadata = {
  title: "Safety & Certification — Hydrogen Operations | ColibriV",
  description:
    "Certification-aligned safety from day one: ARP4754A/4761, DO-160/DO-178C pathways, HAZOP/FMEA, PRD/ventilation, leak detection, and airport-ready procedures.",
  openGraph: {
    title: "Safety & Certification — Hydrogen Operations | ColibriV",
    description:
      "Evidence-first safety program: requirements → analysis → test → traceable artifacts across authorities and airports.",
  },
}

export default function SafetyPage() {
  return (
    <>
      {/* Hero from Drupal block filtered by field_path = "/technology/safety" */}
      <HeroStackBlock path="/technology/safety" />
      <ListCardsWithDescriptionBlock path="/technology/safety" />
      <TitleDescriptionCardsBlock path="/technology/safety" />
      <GreyListOfCardsBlock path="/technology/safety" />
      <TitleDescriptionCardsColumnsBlock path="/technology/safety" />
      <TitleDescriptionLinkCardWithBlock path="/technology/safety" />
      <GreyListOfCardsBlock path="/technology/engines" />
      <TitleDescriptionLinkCardsColBlock path="/technology/engines" />
      <FaqsBlock path="/technology/safety" />
    </>
  )
}
