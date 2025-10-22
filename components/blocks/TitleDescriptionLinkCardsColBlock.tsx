// components/blocks/TitleDescriptionLinkCardsColBlock.tsx
import { drupal } from "@/lib/drupal"
import Link from "next/link"
import React from "react"

/**
 * Drupal block: block_content--title_description_link_cards_col
 *
 * Fields:
 *  - field_title       (formatted)                 -> { processed | value }
 *  - body              (formatted, long)           -> { processed }
 *  - field_grey_cards  (multiple, Label/Title/Text)-> [{ label, title?, text? }]
 *  - field_links       (multiple Link)             -> [{ uri, title, ... }]
 *  - field_path        (plain string)              -> route filter (e.g. "/technology/engines")
 */

const BLOCK_TYPE = "block_content--title_description_link_cards_col"
const FIELD_TITLE = "field_title"
const FIELD_BODY = "body"
const FIELD_GREY = "field_grey_cards"
const FIELD_LINKS = "field_links"
const FIELD_PATH = "field_path"

type JsonApiResource = any

type Props = {
  /** Route to match, e.g. "/technology/engines" */
  path: string
  /** Optionally render a specific block UUID */
  uuid?: string
  /** ISR revalidate seconds */
  revalidate?: number
  /** Extra classes for <section> */
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
    ...(path ? { "filter[field_path][value]": path } : {}),
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      FIELD_TITLE,
      FIELD_BODY,
      FIELD_GREY,
      FIELD_LINKS,
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

    // Tolerant client-side match for safety
    const norm = (v: any) => String(v ?? "").trim().toLowerCase()
    const want = norm(path)
    const filtered = (rows || []).filter((b: any) => {
      const p = b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH]
      const bp = norm(p)
      return bp === want || (bp && bp.startsWith(want))
    })
    return filtered.length ? filtered : (rows || [])
  } catch (e) {
    console.warn("[TitleDescriptionLinkCardsColBlock] load failed:", e)
    return []
  }
}

export default async function TitleDescriptionLinkCardsColBlock(props: Props) {
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

        const links =
          block?.[FIELD_LINKS] ?? block?.attributes?.[FIELD_LINKS] ?? []

        const [primary, secondary] = (links as any[]).map(linkFromDrupal)

        return (
          <section
            key={block?.id || block?.drupal_internal__id}
            className={`bg-white py-14 ${className}`}
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 lg:p-10">
                <div className="grid gap-8 lg:grid-cols-3">
                  {/* Left: title + intro */}
                  <div>
                    {titleHtml ? (
                      <h3
                        className="text-2xl font-extrabold tracking-[-0.01em] text-slate-900"
                        dangerouslySetInnerHTML={{ __html: titleHtml }}
                      />
                    ) : null}

                    {bodyHtml ? (
                      <div
                        className="mt-2 text-slate-700"
                        dangerouslySetInnerHTML={{ __html: bodyHtml }}
                      />
                    ) : null}
                  </div>

                  {/* Right: white cards inside grey container */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
                    {Array.isArray(cards) &&
                      cards.map((c, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-slate-200 bg-white p-6"
                        >
                          {c?.label ? (
                            <div className="text-sm font-semibold text-slate-500">
                              {c.label}
                            </div>
                          ) : null}
                          {c?.title ? (
                            <div className="mt-1 text-slate-900 font-semibold">
                              {c.title}
                            </div>
                          ) : null}
                          {c?.text ? (
                            <div className="mt-1 text-slate-700">{c.text}</div>
                          ) : null}
                        </div>
                      ))}
                  </div>
                </div>

                {/* CTAs */}
                {(primary || secondary) && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {primary ? (
                      <Link
                        href={primary.href}
                        target={primary.isExternal ? "_blank" : undefined}
                        rel={primary.isExternal ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95"
                      >
                        {primary.label}
                      </Link>
                    ) : null}
                    {secondary ? (
                      <Link
                        href={secondary.href}
                        target={secondary.isExternal ? "_blank" : undefined}
                        rel={secondary.isExternal ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
                      >
                        {secondary.label}
                      </Link>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
