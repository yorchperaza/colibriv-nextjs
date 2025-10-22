// components/blocks/TitleCardsWithBulletsBlock.tsx
import { drupal } from "@/lib/drupal"
import Link from "next/link"

const BLOCK_TYPE = "block_content--title_cards_with_link_and_bullet"

// Field machine names
const FIELD_TITLE = "field_title"
const FIELD_PATH = "field_path"
const FIELD_HEADER_HINT = "field_header_hint"
const FIELD_CARDS_BULLETS = "field_cards_bullets"

type JsonApiResource = any

type Item = {
  title?: string | null
  description?: string | null
  bullets?: string | null // newline separated
  link_uri?: string | null
  link_title?: string | null
}

type Props = {
  path?: string
  uuid?: string
  revalidate?: number
}

function normalizeLink(uri?: string | null) {
  if (!uri) return null
  let href = String(uri).trim()
  if (!href) return null
  if (href.startsWith("internal:")) href = href.replace(/^internal:/, "") || "/"
  return href
}

async function fetchBlock({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    ...(path ? { "filter[field_path][value]": path } : {}),
    // Ask JSON:API for only what we need (including your custom field)
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      "changed",
      FIELD_TITLE,
      FIELD_PATH,
      FIELD_HEADER_HINT,
      FIELD_CARDS_BULLETS,
    ].join(","),
    sort: "-changed",
  }

  try {
    const rows = await drupal.getResourceCollection<JsonApiResource>(BLOCK_TYPE, {
      params,
      next: { revalidate, tags: [BLOCK_TYPE] },
    })
    if (!Array.isArray(rows) || rows.length === 0) return null

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
    console.warn("[TitleCardsWithBulletsBlock] load failed:", e)
    return null
  }
}

/** Safely read the multi-value field as an array of {title, description, bullets, link_*}. */
function readItems(block: any): Item[] {
  const a = block?.attributes ?? block
  const raw = a?.[FIELD_CARDS_BULLETS] ?? block?.[FIELD_CARDS_BULLETS]
  if (Array.isArray(raw)) return raw
  if (raw && typeof raw === "object") return [raw] // single-value fallback
  return []
}

/** Split a newline-separated bullets string into trimmed, non-empty lines. */
function splitBullets(text?: string | null): string[] {
  if (!text) return []
  return text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export default async function TitleCardsWithBulletsBlock(props: Props) {
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

  // Read and partition items:
  // - cardItems: have title/description (render in the grid)
  // - bulletLines: any items that only provide bullets (no title/desc) → join & split into a flat list
  const items = readItems(block)

  const cardItems = items.filter((it) => {
    const hasTitle = !!String(it?.title ?? "").trim()
    const hasDesc = !!String(it?.description ?? "").trim()
    return hasTitle || hasDesc
  })

  const bulletLines = items
    .map((it) => String(it?.bullets ?? ""))
    .flatMap((b) => splitBullets(b))
    .filter(Boolean)

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
        {cardItems.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cardItems.map((c, i) => {
              const title = (c?.title || "").trim()
              const desc = (c?.description || "").trim()
              const href = normalizeLink(c?.link_uri)
              const hasLink = !!href
              const label = (c?.link_title || "Learn more").trim()

              const CardInner = (
                <>
                  <span className="pointer-events-none absolute right-0 top-0 h-2 w-12 bg-red-600/80" />
                  {title && (
                    <div className="text-lg font-extrabold text-slate-900">
                      {title}
                    </div>
                  )}
                  {desc && <p className="mt-2 text-slate-700">{desc}</p>}
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
                  className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:bg-slate-50"
                >
                  {CardInner}
                </div>
              )
            })}
          </div>
        ) : null}

        {/* Bottom bullets list (from items that are bullets-only) */}
        {bulletLines.length > 0 ? (
          <ul className="mt-6 grid gap-3 text-slate-700 md:grid-cols-3">
            {bulletLines.map((line, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-600" />
                {line}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
