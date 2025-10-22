// app/ai/page.tsx
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
  title: "AI & Software — Analytics, Controls & Tooling | ColibriV",
  description:
    "Advisory AI for design space search, test analytics and anomaly detection; cert-aligned software for controls, data integrity, and automated evidence generation.",
  openGraph: {
    title: "AI & Software — Analytics, Controls & Tooling | ColibriV",
    description:
      "Evidence-first software: DO-178C-aligned controls, automated artifacts, and advisory AI that accelerates iteration without entering the safety-critical path.",
  },
}

export default function AiPage() {
  return (
    <>
      {/* Hero from Drupal block filtered by field_path = "/technology/ai" */}
      <HeroStackBlock path="/technology/ai" />
      <ListCardsWithDescriptionBlock path="/technology/ai" />
      <StackOverviewCardsBlock path="/technology/ai" />
      <GreyListOfCardsBlock path="/technology/ai" />
      <TitleDescriptionLinkCardWithBlock path="/technology/ai" />
      <BodyMediaBlock path="/technology/ai" />
      <TitleDescriptionCardsColumnsBlock path="/technology/ai" />
      <TitleDescriptionLinkCardsColBlock path="/technology/engines" />
      <FaqsBlock path="/technology/ai" />
    </>
  )
}
