// components/blocks/GreyListOfCardsBlock.tsx
import { drupal } from "@/lib/drupal"
import React from "react"

/**
 * Drupal block: block_content--grey_list_of_cards
 *
 * Fields:
 *  - field_title (formatted)            -> { processed | value }
 *  - body (formatted, long)             -> { processed }
 *  - field_grey_cards (multiple items)  -> { label, title, text/description }
 *  - field_path (plain)                 -> string route match
 */

const BLOCK_TYPE = "block_content--grey_list_of_cards"

// Field machine names
const FIELD_TITLE = "field_title"
const FIELD_BODY = "body"
const FIELD_CARDS = "field_grey_cards"
const FIELD_PATH = "field_path"

type JsonApiResource = any

type Props = {
  /** Route to match, e.g. "/technology/engines" or "/" */
  path: string
  /** Optionally render a specific block UUID */
  uuid?: string
  /** ISR revalidate seconds */
  revalidate?: number
  /** Optional section className overrides */
  className?: string
}

async function fetchBlocks({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    ...(path ? { "filter[field_path][value]": path } : {}),
    // only request the fields we need
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      FIELD_TITLE,
      FIELD_BODY,
      FIELD_CARDS,
      FIELD_PATH,
      "changed",
    ].join(","),
    sort: "-changed",
  }

  try {
    const rows = await drupal.getResourceCollection<JsonApiResource>(BLOCK_TYPE, {
      params,
      next: { revalidate, tags: [BLOCK_TYPE] },
    })

    if (!path) return rows || []

    // Tolerant client-side fallback (helps if API filter misses nulls/whitespace)
    const norm = (v: any) => String(v ?? "").trim().toLowerCase()
    const want = norm(path)
    const filtered = (rows || []).filter((b: any) => {
      const p = b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH]
      const bp = norm(p)
      return bp === want || (bp && bp.startsWith(want))
    })
    return filtered.length ? filtered : (rows || [])
  } catch (e) {
    console.warn("[GreyListOfCardsBlock] load failed:", e)
    return []
  }
}

export default async function GreyListOfCardsBlock(props: Props) {
  const { path = "/", uuid, revalidate, className = "" } = props
  const blocks = await fetchBlocks({ path, uuid, revalidate })
  if (!blocks?.length) return null

  return (
    <section className={`bg-white py-14 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        {blocks.map((block: any) => {
          const titleHtml =
            block?.[FIELD_TITLE]?.processed ??
            block?.[FIELD_TITLE]?.value ??
            block?.attributes?.[FIELD_TITLE]?.processed ??
            block?.attributes?.[FIELD_TITLE]?.value ??
            ""

          const bodyProcessed =
            block?.[FIELD_BODY]?.processed ??
            block?.attributes?.[FIELD_BODY]?.processed ??
            ""

          // Cards array: each item expected to have label, title, and text/description
          const cards: Array<any> =
            block?.[FIELD_CARDS] ?? block?.attributes?.[FIELD_CARDS] ?? []

          return (
            <div key={block?.id || block?.drupal_internal__id}>
              {/* Heading */}
              {titleHtml ? (
                <h2
                  className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900"
                  dangerouslySetInnerHTML={{ __html: titleHtml }}
                />
              ) : null}

              {/* Short intro */}
              {bodyProcessed ? (
                <div
                  className="mt-3 text-slate-700"
                  dangerouslySetInnerHTML={{ __html: bodyProcessed }}
                />
              ) : null}

              {/* Cards grid */}
              {Array.isArray(cards) && cards.length > 0 ? (
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {cards.map((c: any, i: number) => {
                    const label = c?.label ?? c?.Label ?? ""
                    const cardTitle = c?.title ?? c?.Title ?? ""
                    const text =
                      // support either "text" or "description" property naming
                      c?.text ?? c?.description ?? c?.Description ?? ""

                    return (
                      <div
                        key={i}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                      >
                        {label ? (
                          <div className="text-sm font-semibold text-slate-500">
                            {label}
                          </div>
                        ) : null}

                        {cardTitle ? (
                          <div className="mt-1 text-xl font-extrabold text-slate-900">
                            {cardTitle}
                          </div>
                        ) : null}

                        {text ? (
                          <div className="mt-2 text-sm text-slate-600">
                            {text}
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
