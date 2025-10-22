// components/blocks/TitleTextCardBlock.tsx
import { drupal } from "@/lib/drupal"
import Link from "next/link"
import React from "react"
import { ArrowRight } from "lucide-react"

const BLOCK_TYPE = "block_content--title_text_card"

// Field machine names
const FIELD_TITLE = "field_title"
const FIELD_BODY = "body"
const FIELD_PATH = "field_path"
const FIELD_CARDS = "field_cards_title_description"
const FIELD_CARD_LINKS = "field_card_links"
const FIELD_LINKS = "field_links"

type JsonApiResource = any

type Props = {
  path: string
  uuid?: string
  revalidate?: number
}

function linkFromDrupal(link: any): { href: string; label: string; isExternal: boolean } | null {
  if (!link) return null
  const uri: string | undefined = link?.uri?.value ?? link?.uri ?? link?.url ?? link?.value
  const label: string = link?.title || link?.options?.title || "Learn more"
  if (!uri) return null

  let href = uri
  if (href.startsWith("internal:")) href = href.replace(/^internal:/, "") || "/"
  const isExternal = /^https?:\/\//i.test(href)
  return { href, label, isExternal }
}

async function fetchBlocks({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      FIELD_TITLE,
      FIELD_BODY,
      FIELD_PATH,
      FIELD_CARDS,
      FIELD_CARD_LINKS,
      FIELD_LINKS,
      "changed",
    ].join(","),
    sort: "-changed",
  }

  const rows = await drupal.getResourceCollection<JsonApiResource>(BLOCK_TYPE, {
    params,
    next: { revalidate, tags: [BLOCK_TYPE] },
  })

  return (rows || []).filter((b: any) => {
    const p = b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH]
    return p === path
  })
}

export default async function TitleTextCardBlock(props: Props) {
  const { path = "/", uuid, revalidate } = props
  const blocks = await fetchBlocks({ path, uuid, revalidate })
  if (!blocks?.length) return null

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[2fr_1fr]">
          {blocks.map((block: any) => {
            const title =
              block?.[FIELD_TITLE]?.processed ??
              block?.[FIELD_TITLE]?.value ??
              block?.attributes?.[FIELD_TITLE]?.processed ??
              block?.attributes?.[FIELD_TITLE]?.value ??
              ""

            const bodyProcessed =
              block?.[FIELD_BODY]?.processed ??
              block?.attributes?.[FIELD_BODY]?.processed ??
              ""

            const cards:
              | Array<{ title?: string; description?: string }>
              | undefined =
              block?.[FIELD_CARDS] ?? block?.attributes?.[FIELD_CARDS]

            const cardLinks =
              block?.[FIELD_CARD_LINKS] ??
              block?.attributes?.[FIELD_CARD_LINKS] ??
              []

            const extraLinks =
              block?.[FIELD_LINKS] ??
              block?.attributes?.[FIELD_LINKS] ??
              []

            const primaryLeft = extraLinks?.[0] ? linkFromDrupal(extraLinks[0]) : null
            const secondaryLeft = extraLinks?.[1] ? linkFromDrupal(extraLinks[1]) : null
            const rightCta = cardLinks?.[0] ? linkFromDrupal(cardLinks[0]) : null

            return (
              <React.Fragment key={block?.id || block?.drupal_internal__id}>
                {/* LEFT COLUMN */}
                <div>
                  {/* Headline + accent */}
                  {title ? (
                    <div className="relative">
                      <h2
                        className="font-extrabold leading-[0.95] tracking-[-0.015em] text-slate-900 text-3xl sm:text-4xl lg:text-5xl xl:text-[5.5rem]"
                        dangerouslySetInnerHTML={{ __html: title }}
                      />
                      <span className="pointer-events-none absolute -bottom-2 left-0 h-1 w-24 origin-left bg-red-600"></span>
                    </div>
                  ) : null}

                  {/* Subcopy */}
                  {bodyProcessed ? (
                    <div
                      className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600"
                      dangerouslySetInnerHTML={{ __html: bodyProcessed }}
                    />
                  ) : null}

                  {/* Actions (left) */}
                  {(primaryLeft || secondaryLeft) && (
                    <div className="mt-8 flex flex-wrap gap-3">
                      {primaryLeft && (
                        <Link
                          href={primaryLeft.href}
                          target={primaryLeft.isExternal ? "_blank" : undefined}
                          rel={primaryLeft.isExternal ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 focus-visible:ring-offset-2"
                        >
                          {primaryLeft.label}
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                        </Link>
                      )}
                      {secondaryLeft && (
                        <Link
                          href={secondaryLeft.href}
                          target={secondaryLeft.isExternal ? "_blank" : undefined}
                          rel={secondaryLeft.isExternal ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition-all hover:border-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2"
                        >
                          {secondaryLeft.label}
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN */}
                <div>
                  <div className="grid h-full gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7 lg:p-8 transition-all hover:border-slate-300 hover:shadow-lg overflow-hidden">
                    {/* Cards grid */}
                    {Array.isArray(cards) && cards.length > 0 ? (
                      <div className="grid gap-6 sm:grid-cols-2">
                        {cards.map((c, i) => {
                          const cardTitle = c?.title || ""
                          const cardDesc = c?.description || ""
                          const lines = cardDesc
                            .split(/\r?\n/)
                            .map((s) => s.trim())
                            .filter(Boolean)

                          return (
                            <div key={i}>
                              {cardTitle ? (
                                <h3 className="text-xl font-bold text-slate-900">
                                  {cardTitle}
                                </h3>
                              ) : null}
                              {lines.length > 0 ? (
                                <ul className="mt-2 space-y-2 text-slate-800 font-medium">
                                  {lines.map((line, idx) => (
                                    <li key={idx}>• {line}</li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                          )
                        })}
                      </div>
                    ) : null}

                    {/* Right-side CTA */}
                    {rightCta ? (
                      <div className="mt-2">
                        <Link
                          href={rightCta.href}
                          target={rightCta.isExternal ? "_blank" : undefined}
                          rel={rightCta.isExternal ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-base font-semibold text-white transition-all hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 focus-visible:ring-offset-2"
                        >
                          {rightCta.label}
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
