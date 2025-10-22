// app/storage/page.tsx
import type { Metadata } from "next"
import HeroStackBlock from "@/components/blocks/HeroStackBlock"
import ListCardsWithDescriptionBlock from "@/components/blocks/ListCardsWithDescriptionBlock"
import FaqsBlock from "@/components/blocks/FaqsBlock"
import TitleDescriptionLinkCardWithBlock from "@/components/blocks/TitleDescriptionLinkCardWithBlock"
import TitleDescriptionLinkCardsColBlock from "@/components/blocks/TitleDescriptionLinkCardsColBlock"
import BodyMediaBlock from "@/components/blocks/BodyMediaBlock"
import StackOverviewCardsBlock from "@/components/blocks/StackOverviewCardsBlock"
import GreyListOfCardsBlock from "@/components/blocks/GreyListOfCardsBlock"
import TitleDescriptionCardsColumnsBlock from "@/components/blocks/TitleDescriptionCardsColumnsBlock"

export const metadata: Metadata = {
  title: "Storage & Delivery — High-Pressure Gaseous H₂ | ColibriV",
  description:
    "Type-IV high-pressure hydrogen storage (350–700 bar), PRD strategies, regulation, ventilation, detection, and rapid turnarounds for airport-ready operations.",
  openGraph: {
    title: "Storage & Delivery — High-Pressure Gaseous H₂ | ColibriV",
    description:
      "Gaseous hydrogen at 350–700 bar to remove cryogenic complexity and accelerate certification-ready operations.",
  },
}

export default function StoragePage() {
  return (
    <>
      {/* Hero from Drupal block filtered by field_path = "/technology/storage" */}
      <HeroStackBlock path="/technology/storage" />
      <ListCardsWithDescriptionBlock path="/technology/storage" />
      <StackOverviewCardsBlock path="/technology/storage" />
      <GreyListOfCardsBlock path="/technology/storage" />
      <TitleDescriptionLinkCardWithBlock path="/technology/storage" />
      <BodyMediaBlock path="/technology/storage" />
      <TitleDescriptionCardsColumnsBlock path="/technology/storage" />
      <TitleDescriptionLinkCardsColBlock path="/technology/engines" />
      <FaqsBlock path="/technology/storage" />
    </>
  )
}
