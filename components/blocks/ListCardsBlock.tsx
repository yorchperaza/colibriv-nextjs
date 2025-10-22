// components/blocks/ListCardsBlock.tsx
import { drupal } from "@/lib/drupal"
import Link from "next/link"
import React from "react"

/**
 * Block type: block_content--list_cards
 * Fields:
 *  - field_title (formatted text)
 *  - field_cards_title_description (multiple) -> { title, description }
 *  - field_links (multiple Link)
 *  - field_path (plain string)
 */

const BLOCK_TYPE = "block_content--list_cards"

// Field machine names
const FIELD_TITLE = "field_title"
const FIELD_PATH = "field_path"
const FIELD_CARDS = "field_cards_title_description"
const FIELD_LINKS = "field_links"

type JsonApiResource = any

type Props = {
  /** Route to match, e.g. "/" */
  path: string
  /** Optionally render a specific block UUID */
  uuid?: string
  /** ISR revalidate seconds */
  revalidate?: number
  /** Optional section className overrides */
  className?: string
}

function linkFromDrupal(link: any): { href: string; label: string; isExternal: boolean } | null {
  if (!link) return null
  const uri: string | undefined =
    link?.uri?.value ?? link?.uri ?? link?.url ?? link?.value
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
      FIELD_PATH,
      FIELD_CARDS,
      FIELD_LINKS,
      "changed",
    ].join(","),
    sort: "-changed",
  }

  const rows = await drupal.getResourceCollection<JsonApiResource>(BLOCK_TYPE, {
    params,
    next: { revalidate, tags: [BLOCK_TYPE] },
  })

  // Filter by exact path
  return (rows || []).filter((b: any) => {
    const p = b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH]
    return p === path
  })
}

export default async function ListCardsBlock(props: Props) {
  const { path = "/", uuid, revalidate, className = "" } = props
  const blocks = await fetchBlocks({ path, uuid, revalidate })
  if (!blocks?.length) return null

  return (
    <section className={`bg-white py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        {blocks.map((block: any) => {
          const title =
            block?.[FIELD_TITLE]?.processed ??
            block?.[FIELD_TITLE]?.value ??
            block?.attributes?.[FIELD_TITLE]?.processed ??
            block?.attributes?.[FIELD_TITLE]?.value ??
            ""

          const cards:
            | Array<{ title?: string; description?: string }>
            | undefined =
            block?.[FIELD_CARDS] ?? block?.attributes?.[FIELD_CARDS]

          const rawLinks =
            block?.[FIELD_LINKS] ?? block?.attributes?.[FIELD_LINKS] ?? []

          const linkItems = (Array.isArray(rawLinks) ? rawLinks : [rawLinks])
            .map(linkFromDrupal)
            .filter(Boolean) as Array<{ href: string; label: string; isExternal: boolean }>

          return (
            <div key={block?.id || block?.drupal_internal__id}>
              {/* Section heading */}
              {title ? (
                <h3
                  className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-[-0.01em]"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              ) : null}

              {/* Cards grid */}
              {Array.isArray(cards) && cards.length > 0 ? (
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {cards.map((c, idx) => {
                    const badge = c?.title || "" // e.g., "M0", "M1"
                    const desc = (c?.description || "").trim()

                    return (
                      <article
                        key={idx}
                        className="relative rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-sm"
                      >
                        {badge ? (
                          <div className="absolute -top-3 left-6 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
                            {badge}
                          </div>
                        ) : null}

                        {desc ? (
                          <p className="mt-4 text-slate-700">{desc}</p>
                        ) : null}
                      </article>
                    )
                  })}
                </div>
              ) : null}

              {/* Multiple underlined links below grid */}
              {linkItems.length ? (
                <div className="mt-8 flex flex-wrap gap-4">
                  {linkItems.map((l, i) => (
                    <Link
                      key={`${l.href}-${i}`}
                      href={l.href}
                      target={l.isExternal ? "_blank" : undefined}
                      rel={l.isExternal ? "noopener noreferrer" : undefined}
                      className="text-slate-900 font-semibold underline underline-offset-4"
                    >
                      {l.label} →
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
