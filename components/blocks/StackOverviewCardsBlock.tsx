// components/blocks/StackOverviewCardsBlock.tsx
import { drupal } from "@/lib/drupal"
import Link from "next/link"
import React from "react"

const BLOCK_TYPE = "block_content--title_cards_with_link"

// Fields
const FIELD_TITLE = "field_title"
const FIELD_CARDS = "field_cards"
const FIELD_PATH = "field_path"
const FIELD_HEADER_HINT = "field_header_hint"

type JsonApiResource = any

type Props = {
  /** Match block by field_path (e.g., "/technology"). If omitted, newest block is used. */
  path?: string
  /** Optionally target a specific block UUID */
  uuid?: string
  /** ISR revalidate seconds */
  revalidate?: number
}

function normalizeLink(uri?: string | null) {
  if (!uri) return null
  let href = uri.trim()
  if (!href) return null
  if (href.startsWith("internal:")) href = href.replace(/^internal:/, "") || "/"
  return href
}

async function fetchBlock({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    ...(path ? { "filter[field_path][value]": path } : {}),
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      FIELD_TITLE,
      FIELD_CARDS,
      FIELD_PATH,
      FIELD_HEADER_HINT,
      "changed",
    ].join(","),
    sort: "-changed",
  }

  try {
    const rows = await drupal.getResourceCollection<JsonApiResource>(BLOCK_TYPE, {
      params,
      next: { revalidate, tags: [BLOCK_TYPE] },
    })

    if (!Array.isArray(rows) || rows.length === 0) return null

    // If path was provided but the API-level filter didn’t match due to nulls/whitespace,
    // do a tolerant client-side match; otherwise return the newest row.
    if (path) {
      const norm = (v: any) => String(v ?? "").trim().toLowerCase()
      const want = norm(path)
      const filtered = rows.filter((b: any) => {
        const bp = norm(b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH])
        return bp === want || (bp && bp.startsWith(want))
      })
      return filtered[0] ?? rows[0]
    }

    return rows[0]
  } catch (e) {
    console.warn("[StackOverviewCardsBlock] load failed:", e)
    return null
  }
}

export default async function StackOverviewCardsBlock(props: Props) {
  const { path, uuid, revalidate } = props
  const block = await fetchBlock({ path, uuid, revalidate })
  if (!block) return null

  const titleHtml =
    block?.[FIELD_TITLE]?.processed ??
    block?.[FIELD_TITLE]?.value ??
    block?.attributes?.[FIELD_TITLE]?.processed ??
    block?.attributes?.[FIELD_TITLE]?.value ??
    ""

  const headerHint: string =
    block?.[FIELD_HEADER_HINT] ??
    block?.attributes?.[FIELD_HEADER_HINT] ??
    ""

  const cards:
    | Array<{ title?: string; description?: string; link_uri?: string; link_title?: string }>
    | undefined =
    block?.[FIELD_CARDS] ?? block?.attributes?.[FIELD_CARDS]

  return (
    <section className="bg-slate-50 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header row */}
        <div className="flex items-end justify-between gap-4">
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900"
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
          {headerHint ? (
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-red-700">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              {headerHint}
            </div>
          ) : null}
        </div>

        {/* Cards grid */}
        {Array.isArray(cards) && cards.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => {
              const title = (c?.title || "").trim()
              const desc = (c?.description || "").trim()
              const href = normalizeLink(c?.link_uri)
              const hasLink = !!href
              const label = (c?.link_title || "Learn more").trim()

              // Common card content
              const CardInner = (
                <>
                  {/* Accent ribbon */}
                  <span className="pointer-events-none absolute right-0 top-0 h-2 w-12 bg-red-600/80" />
                  {/* Title */}
                  {title && (
                    <div className="text-lg font-extrabold text-slate-900">
                      {title}
                    </div>
                  )}
                  {/* Description */}
                  {desc && <p className="mt-2 text-slate-700">{desc}</p>}
                  {/* CTA only if there's a link */}
                  {hasLink && (
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:underline">
                      {label} <span aria-hidden="true">→</span>
                    </div>
                  )}
                </>
              )

              return hasLink ? (
                <Link
                  key={i}
                  href={href!}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:bg-slate-50"
                >
                  {CardInner}
                </Link>
              ) : (
                <div
                  key={i}
                  className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  {CardInner}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
