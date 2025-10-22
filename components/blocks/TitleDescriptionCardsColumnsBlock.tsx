// components/blocks/TitleDescriptionCardsColumnsBlock.tsx
import { drupal } from "@/lib/drupal"
import React from "react"

/**
 * Drupal block: block_content--title_description_cards_columns
 *
 * Fields:
 *  - field_title         (Text formatted)                  -> { processed | value }
 *  - body                (Text formatted, long)            -> { processed }
 *  - field_grey_cards    (multiple, Label, Title & Text)   -> [{ label, title, text }]
 *  - field_path          (Text plain)                      -> route to match (e.g. "/technology/engines")
 */

const BLOCK_TYPE = "block_content--title_description_cards_columns"
const FIELD_TITLE = "field_title"
const FIELD_BODY = "body"
const FIELD_GREY = "field_grey_cards"
const FIELD_PATH = "field_path"

type JsonApiResource = any

type Props = {
  /** Route to match, e.g. "/technology/engines" */
  path: string
  /** Optionally render a specific block UUID */
  uuid?: string
  /** ISR revalidate seconds */
  revalidate?: number
  /** Extra classes for the <section> */
  className?: string
}

async function fetchBlocks({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    ...(path ? { "filter[field_path][value]": path } : {}),
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      FIELD_TITLE,
      FIELD_BODY,
      FIELD_GREY,
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

    // Tolerant client-side match
    const norm = (v: any) => String(v ?? "").trim().toLowerCase()
    const want = norm(path)
    const filtered = (rows || []).filter((b: any) => {
      const p = b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH]
      const bp = norm(p)
      return bp === want || (bp && bp.startsWith(want))
    })
    return filtered.length ? filtered : (rows || [])
  } catch (e) {
    console.warn("[TitleDescriptionCardsColumnsBlock] load failed:", e)
    return []
  }
}

export default async function TitleDescriptionCardsColumnsBlock(props: Props) {
  const { path = "/", uuid, revalidate, className = "" } = props
  const blocks = await fetchBlocks({ path, uuid, revalidate })
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block: any) => {
        const titleHtml =
          block?.[FIELD_TITLE]?.processed ??
          block?.[FIELD_TITLE]?.value ??
          block?.attributes?.[FIELD_TITLE]?.processed ??
          block?.attributes?.[FIELD_TITLE]?.value ??
          ""

        const bodyHtml =
          block?.[FIELD_BODY]?.processed ??
          block?.attributes?.[FIELD_BODY]?.processed ??
          ""

        const cards:
          | Array<{ label?: string; title?: string; text?: string }>
          | undefined =
          block?.[FIELD_GREY] ?? block?.attributes?.[FIELD_GREY]

        return (
          <section
            key={block?.id || block?.drupal_internal__id}
            className={`bg-white py-14 lg:py-20 ${className}`}
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Left column: title + intro body */}
                <div className="lg:col-span-1">
                  {titleHtml ? (
                    <h2
                      className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900"
                      dangerouslySetInnerHTML={{ __html: titleHtml }}
                    />
                  ) : null}

                  {bodyHtml ? (
                    <div
                      className="mt-3 text-slate-700"
                      dangerouslySetInnerHTML={{ __html: bodyHtml }}
                    />
                  ) : null}
                </div>

                {/* Right columns: grey cards */}
                <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
                  {Array.isArray(cards) &&
                    cards.map((c, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                      >
                        {c?.label ? (
                          <div className="text-sm font-semibold text-slate-500">
                            {c.label}
                          </div>
                        ) : null}
                        {c?.title ? (
                          <div className="mt-1 text-lg font-extrabold text-slate-900">
                            {c.title}
                          </div>
                        ) : null}
                        {c?.text ? (
                          <div className="mt-2 text-sm text-slate-600">{c.text}</div>
                        ) : null}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
