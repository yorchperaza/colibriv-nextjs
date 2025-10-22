// components/blocks/TitleDescriptionCardsTextBlock.tsx
import { drupal } from "@/lib/drupal"
import Link from "next/link"

const BLOCK_TYPE = "block_content--title_description_cards_text"

// Field machine names
const FIELD_TITLE = "field_title"
const FIELD_PATH = "field_path"
const FIELD_BODY = "body"                    // formatted long w/ summary (LEFT intro)
const FIELD_SECOND_BODY = "field_second_body"// formatted long (RIGHT column)
const FIELD_CARDS = "field_cards_with_label" // multi-value LabelTitleDescriptionLinkItem
const FIELD_LINKS = "field_links"            // multi-value Link

type JsonApiResource = any

type CardItem = {
  label?: string | null
  title?: string | null
  description_value?: string | null
  description_format?: string | null
  link_uri?: string | null
  link_title?: string | null
}

type LinkItem = {
  uri?: string | null
  title?: string | null
}

type Props = {
  path?: string
  uuid?: string
  revalidate?: number
  /** Optional right-box heading; defaults to your example text */
  sidebarHeading?: string
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
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      "changed",
      FIELD_TITLE,
      FIELD_PATH,
      FIELD_BODY,
      FIELD_SECOND_BODY,
      FIELD_CARDS,
      FIELD_LINKS,
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
    console.warn("[TitleDescriptionCardsTextBlock] load failed:", e)
    return null
  }
}

function readCards(block: any): CardItem[] {
  const a = block?.attributes ?? block
  const raw = a?.[FIELD_CARDS] ?? block?.[FIELD_CARDS]
  if (Array.isArray(raw)) return raw
  if (raw && typeof raw === "object") return [raw]
  return []
}

function readLinks(block: any): LinkItem[] {
  const a = block?.attributes ?? block
  const raw = a?.[FIELD_LINKS] ?? block?.[FIELD_LINKS]
  if (Array.isArray(raw)) return raw
  if (raw && typeof raw === "object") return [raw]
  return []
}

export default async function TitleDescriptionCardsTextBlock(props: Props) {
  const {
    path,
    uuid,
    revalidate,
    sidebarHeading = "Representative Missions",
  } = props

  const block = await fetchBlock({ path, uuid, revalidate })
  if (!block) return null

  // Title
  const titleHtml =
    block?.[FIELD_TITLE]?.processed ??
    block?.[FIELD_TITLE]?.value ??
    block?.attributes?.[FIELD_TITLE]?.processed ??
    block?.attributes?.[FIELD_TITLE]?.value ??
    ""

  // LEFT intro comes from BODY summary (fallback to processed)
  const bodySummary =
    block?.[FIELD_BODY]?.summary ??
    block?.attributes?.[FIELD_BODY]?.summary ??
    ""
  const bodyProcessedFallback =
    block?.[FIELD_BODY]?.processed ??
    block?.attributes?.[FIELD_BODY]?.processed ??
    ""

  // RIGHT column content comes from SECOND BODY processed
  const secondBodyProcessed =
    block?.[FIELD_SECOND_BODY]?.processed ??
    block?.attributes?.[FIELD_SECOND_BODY]?.processed ??
    ""

  const cards = readCards(block)
  const links = readLinks(block)

  // First link as primary CTA in the right column (matches your sample)
  const primaryLink = links[0]
  const primaryHref = normalizeLink(primaryLink?.uri)
  const primaryText = (primaryLink?.title || "").trim() || "Learn more →"

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* ===== Left column: Title, intro (summary), cards grid ===== */}
          <div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-[-0.01em] text-slate-900"
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />

            {(bodySummary || bodyProcessedFallback) && (
              <p
                className="mt-4 max-w-3xl text-slate-700"
                dangerouslySetInnerHTML={{
                  __html: bodySummary || bodyProcessedFallback,
                }}
              />
            )}

            {cards.length > 0 ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {cards.map((c, i) => {
                  const eyebrow = (c?.label || "").trim()
                  const title = (c?.title || "").trim()
                  const descHtml = c?.description_value || ""
                  const href = normalizeLink(c?.link_uri)
                  const hasLink = !!href
                  const label = (c?.link_title || "Learn more").trim()

                  const CardInner = (
                    <>
                      {eyebrow && (
                        <div className="text-sm font-semibold text-slate-500">
                          {eyebrow}
                        </div>
                      )}
                      {title && (
                        <div className="mt-1 text-lg font-extrabold text-slate-900">
                          {title}
                        </div>
                      )}
                      {descHtml && (
                        <div
                          className="mt-2 prose prose-sm prose-slate max-w-none"
                          dangerouslySetInnerHTML={{ __html: descHtml }}
                        />
                      )}
                      {hasLink && (
                        <div className="mt-3">
                          <Link
                            href={href!}
                            className="text-slate-900 font-semibold underline underline-offset-4 decoration-red-600"
                          >
                            {label} →
                          </Link>
                        </div>
                      )}
                    </>
                  )

                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                    >
                      {CardInner}
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>

          {/* ===== Right column: second body + first link CTA ===== */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h3 className="font-extrabold text-slate-900">{sidebarHeading}</h3>

            {secondBodyProcessed && (
              <div
                className="mt-3 space-y-2 text-slate-700"
                dangerouslySetInnerHTML={{ __html: secondBodyProcessed }}
              />
            )}

            {primaryHref ? (
              <div className="mt-4">
                <Link
                  href={primaryHref}
                  className="text-slate-900 font-semibold underline underline-offset-4 decoration-red-600"
                >
                  {primaryText}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
