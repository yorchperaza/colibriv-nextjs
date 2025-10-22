// components/blocks/ListCardsWithDescriptionBlock.tsx
import { drupal } from "@/lib/drupal"
import React from "react"

/**
 * Drupal block bundle:
 *   block_content--list_cards_with_description
 *
 * Fields:
 *  - field_title (Text formatted)
 *  - body (Text formatted, long)
 *  - field_cards_title_description (multiple, custom "title_description" items)
 *      each item: { title: string, description: string }
 *  - field_path (Text plain)
 */

const BLOCK_TYPE = "block_content--list_cards_with_description"

// field machine names
const FIELD_TITLE = "field_title"
const FIELD_BODY = "body"
const FIELD_CARDS = "field_cards_title_description"
const FIELD_PATH = "field_path"

type JsonApiResource = any

type Props = {
  /** Route to match (e.g., "/technology" or "/") */
  path: string
  /** Optionally render a specific block UUID */
  uuid?: string
  /** ISR revalidate seconds */
  revalidate?: number
}

async function fetchBlock({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    ...(path ? { "filter[field_path][value]": path } : {}),
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

    const list = Array.isArray(rows) ? rows : []
    if (!path) return list[0] ?? null

    // Tolerant fallback if field_path was empty/null in Drupal.
    const norm = (v: any) => String(v ?? "").trim().toLowerCase()
    const want = norm(path)

    const match =
      list.find((b: any) => {
        const p = b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH]
        const bp = norm(p)
        return bp === want || (bp && bp.startsWith(want))
      }) ?? list[0]

    return match ?? null
  } catch (e) {
    console.warn("[ListCardsWithDescriptionBlock] load failed:", e)
    return null
  }
}

export default async function ListCardsWithDescriptionBlock(props: Props) {
  const { path = "/", uuid, revalidate } = props
  const block = await fetchBlock({ path, uuid, revalidate })
  if (!block) return null

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

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 grid gap-8 lg:grid-cols-3">
        {/* Left column: title + body */}
        <div className="lg:col-span-1">
          {title ? (
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          ) : null}

          {bodyProcessed ? (
            <div
              className="mt-4 text-slate-700 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: bodyProcessed }}
            />
          ) : null}
        </div>

        {/* Right column: 3-up cards */}
        <div className="lg:col-span-2">
          {Array.isArray(cards) && cards.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {cards.map((c, i) => {
                const badge = (c?.title || "").trim()
                const desc = (c?.description || "").trim()

                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    {badge && (
                      <div className="inline-flex items-center gap-2 rounded-md bg-red-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-red-700 ring-1 ring-red-600/20">
                        {badge}
                      </div>
                    )}
                    {desc && (
                      <p className="mt-3 text-slate-700">{desc}</p>
                    )}
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
