// components/blocks/CardWithLabelHtmlBlock.tsx
import { drupal } from "@/lib/drupal"
import Link from "next/link"
import React from "react"

const BLOCK_TYPE = "block_content--card_with_label" // keep your bundle name
const FIELD_TITLE = "field_title"
const FIELD_CARDS = "field_cards_with_label"
const FIELD_PATH = "field_path"

type JsonApiResource = any

type Props = {
  /** Filter by block field_path (e.g. "/technology"). If omitted, renders the newest block. */
  path?: string
  /** Fetch a specific block by UUID. */
  uuid?: string
  /** ISR revalidate seconds. */
  revalidate?: number
  /** Extra Tailwind on <section>. */
  className?: string
}

/* ---------------- helpers ---------------- */

function toLink(href?: string | null) {
  if (!href) return { href: "", external: false }
  let url = href
  if (url.startsWith("internal:")) url = url.replace(/^internal:/, "") || "/"
  return { href: url, external: /^https?:\/\//i.test(url) }
}

function norm(v: any) {
  return String(v ?? "").trim().toLowerCase()
}

/* ---------------- data ---------------- */

async function fetchBlock({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    ...(path ? { "filter[field_path][value]": path } : {}),
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      FIELD_TITLE,
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

    if (!Array.isArray(rows) || rows.length === 0) return null
    if (!path) return rows[0]

    const want = norm(path)
    const filtered = rows.filter((b: any) => {
      const bp = norm(b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH])
      return bp === want || (bp && bp.startsWith(want))
    })

    return filtered[0] ?? rows[0]
  } catch (e) {
    console.warn("[CardWithLabelHtmlBlock] failed to load block:", e)
    return null
  }
}

/* ---------------- component ---------------- */

export default async function CardWithLabelHtmlBlock(props: Props) {
  const { path, uuid, revalidate, className = "" } = props
  const block = await fetchBlock({ path, uuid, revalidate })
  if (!block) return null

  const sectionTitle =
    block?.[FIELD_TITLE]?.processed ??
    block?.[FIELD_TITLE]?.value ??
    block?.attributes?.[FIELD_TITLE]?.processed ??
    block?.attributes?.[FIELD_TITLE]?.value ??
    ""

  const cards: Array<{
    label?: string
    title?: string
    description_value?: string // HTML
    description_format?: string
    link_uri?: string
    link_title?: string
  }> = (block?.[FIELD_CARDS] ?? block?.attributes?.[FIELD_CARDS] ?? []) as any[]

  if (!Array.isArray(cards) || cards.length === 0) return null

  return (
    <section className={`bg-white py-6 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Optional section title (if you want to show it) */}
        {sectionTitle ? (
          <h2
            className="mb-6 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900"
            dangerouslySetInnerHTML={{ __html: sectionTitle }}
          />
        ) : null}

        <div className="grid gap-8 lg:grid-cols-3">
          {cards.map((card, idx) => {
            const { href, external } = toLink(card?.link_uri)
            const showLink = href && (card?.link_title || "Learn more")

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                {/* Label (eyebrow) */}
                {card?.label ? (
                  <div className="inline-flex items-center gap-2 rounded-md bg-red-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-red-700 ring-1 ring-red-600/20">
                    {card.label}
                  </div>
                ) : null}

                {/* Title */}
                {card?.title ? (
                  <h3 className="mt-3 text-lg font-extrabold text-slate-900">
                    {card.title}
                  </h3>
                ) : null}

                {/* Description (HTML) */}
                {card?.description_value ? (
                  <div
                    className="mt-3 text-slate-700"
                    dangerouslySetInnerHTML={{ __html: card.description_value }}
                  />
                ) : null}

                {/* Link */}
                {showLink ? (
                  <div className="mt-4">
                    <Link
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:underline"
                    >
                      {card?.link_title || "Learn more"} <span aria-hidden>→</span>
                    </Link>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
