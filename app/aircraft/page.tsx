// app/aircraft/page.tsx
import type { Metadata } from "next"
import HeroStackBlock from "@/components/blocks/HeroStackBlock"
import ListCardsWithDescriptionBlock from "@/components/blocks/ListCardsWithDescriptionBlock"
import FaqsBlock from "@/components/blocks/FaqsBlock"
import TitleDescriptionLinkCardWithBlock from "@/components/blocks/TitleDescriptionLinkCardWithBlock"
import TitleDescriptionLinkCardBlock from "@/components/blocks/TitleDescriptionLinkCardBlock"
import TitleDescriptionCardsColumnsBlock from "@/components/blocks/TitleDescriptionCardsColumnsBlock"
import TitleDescriptionLinkCardsColBlock from "@/components/blocks/TitleDescriptionLinkCardsColBlock"
import TitleCardsWithBulletsBlock from "@/components/blocks/TitleCardsWithBulletsBlock"
import RouteMediaBlock from "@/components/blocks/RouteMediaBlock"
import TitleDescriptionCardsTextBlock from "@/components/blocks/TitleDescriptionCardsTextBlock"
import BodyMediaBlock from "@/components/blocks/BodyMediaBlock"

export const metadata: Metadata = {
  title: "Aircraft — Mid–Long Range Hydrogen-Combustion | ColibriV",
  description:
    "Passenger aircraft for mid–long range built around hydrogen-combustion turbofans using high-pressure gaseous H₂ (350–700 bar), with exportable certification artifacts and airport-ready operations.",
  openGraph: {
    title: "Aircraft — Mid–Long Range Hydrogen-Combustion | ColibriV",
    description:
      "Engines first; aircraft next. Modular high-pressure H₂ tanks, cert-aligned systems, and multi-country operations.",
  },
}

export default function AircraftPage() {
  return (
    <>
      {/* Hero from Drupal block filtered by field_path = "/aircraft" */}
      <HeroStackBlock path="/aircraft" />
      <TitleCardsWithBulletsBlock path="/aircraft" />
      {/* ===== FULL-BLEED FEATURED IMAGE (MIDDLE) ===== */}
      <RouteMediaBlock path="/aircraft" />
      <TitleDescriptionLinkCardWithBlock path="/aircraft" />
      <TitleDescriptionCardsTextBlock path="/aircraft" />
      <ListCardsWithDescriptionBlock path="/aircraft" />
      <TitleDescriptionCardsColumnsBlock path="/aircraft" />
      <TitleDescriptionLinkCardBlock path="/technology/engines" />
      <BodyMediaBlock path="/aircraft" />
      <TitleDescriptionLinkCardsColBlock path="/technology/engines" />
      <FaqsBlock path="/aircraft" />
    </>
  )
}
