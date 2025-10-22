// app/technology/page.tsx
import type { Metadata } from "next"
import HeroStackBlock from "@/components/blocks/HeroStackBlock"
import ListCardsWithDescriptionBlock from "@/components/blocks/ListCardsWithDescriptionBlock"
import StackOverviewCardsBlock from "@/components/blocks/StackOverviewCardsBlock"
import TitleTextTextBlock from "@/components/blocks/TitleTextTextBlock"
import ListCardsBlock from "@/components/blocks/ListCardsBlock"
import CardWithLabelBlock from "@/components/blocks/CardWithLabelBlock"
import FaqsBlock from "@/components/blocks/FaqsBlock"

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Hydrogen-combustion without cryogenics, engineered for certification and scale — turbofans burning compressed gaseous H₂ with supporting combustor, storage & delivery, AI-assisted software, and safety.",
  openGraph: {
    title: "Technology",
    description:
      "Hydrogen-combustion without cryogenics, engineered for certification and scale.",
    url: "/technology",
    type: "website",
  },
  alternates: {
    canonical: "/technology",
  },
}

export default function TechnologyPage() {
  return (
    <>
      {/* Hero from Drupal block filtered by field_path = "/technology" */}
      <HeroStackBlock path="/technology" />
      <ListCardsWithDescriptionBlock path="/technology" />

      <StackOverviewCardsBlock path="/technology" />
      <TitleTextTextBlock path="/technology" />
      <CardWithLabelBlock path="/technology" />
      <ListCardsBlock path="/technology" />
      <FaqsBlock path="/technology" />
    </>
  )
}
