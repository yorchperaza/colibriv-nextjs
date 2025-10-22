// components/blocks/HeroStackBlock.tsx
import { drupal } from "@/lib/drupal"
import Link from "next/link"
import React from "react"

/**
 * Drupal block bundle (adjust if you used a different machine name)
 * Fields:
 *  - field_label (Text plain)                -> pill
 *  - field_title (Text formatted)            -> H1
 *  - body (Text formatted, long)             -> first paragraph
 *  - field_second_text (Text formatted long) -> second paragraph
 *  - field_links (Link, multiple)            -> CTA buttons / links
 *  - field_path (Text plain)                 -> route filter (e.g., "/technology")
 */

const BLOCK_TYPE = "block_content--header_internal" // ⬅️ change to your bundle if needed

// Field machine names
const FIELD_LABEL = "field_label"
const FIELD_TITLE = "field_title"
const FIELD_BODY = "body"
const FIELD_SECOND = "field_second_text"
const FIELD_LINKS = "field_links"
const FIELD_PATH = "field_path"

type JsonApiResource = any

type Props = {
  /** Route to match (e.g., "/technology" or "/") */
  path: string
  /** Optional: render a specific block by UUID */
  uuid?: string
  /** ISR revalidation seconds */
  revalidate?: number
}

/* ------------- helpers ------------- */

function linkFromDrupal(
  link: any
): { href: string; label: string; isExternal: boolean } | null {
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

async function fetchBlock({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    ...(path ? { "filter[field_path][value]": path } : {}),
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      FIELD_LABEL,
      FIELD_TITLE,
      FIELD_BODY,
      FIELD_SECOND,
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
    // Fallback tolerant match in case path filter is empty/null in Drupal
    const list = Array.isArray(rows) ? rows : []
    if (!path) return list[0] ?? null

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
    console.warn("[HeroStackBlock] load failed:", e)
    return null
  }
}

/* ------------- component ------------- */

export default async function HeroStackBlock(props: Props) {
  const { path = "/", uuid, revalidate } = props
  const block = await fetchBlock({ path, uuid, revalidate })
  if (!block) return null

  const label =
    block?.[FIELD_LABEL] ??
    block?.attributes?.[FIELD_LABEL] ??
    ""

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

  const secondProcessed =
    block?.[FIELD_SECOND]?.processed ??
    block?.attributes?.[FIELD_SECOND]?.processed ??
    ""

  const links: any[] =
    block?.[FIELD_LINKS] ??
    block?.attributes?.[FIELD_LINKS] ??
    []

  const primary = links[0] ? linkFromDrupal(links[0]) : null
  const secondary = links[1] ? linkFromDrupal(links[1]) : null
  const rest = links.slice(2).map(linkFromDrupal).filter(Boolean) as {
    href: string
    label: string
    isExternal: boolean
  }[]

  return (
    <section className="relative overflow-hidden">
      {/* soft background radial accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_0%_-20%,#fee2e2_0%,transparent_60%),radial-gradient(900px_500px_at_100%_10%,#eef2ff_0%,transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
        {/* pill/label */}
        {label ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <span className="block h-1.5 w-1.5 rounded-full bg-red-600" />
            {label}
          </div>
        ) : null}

        {/* title */}
        {title ? (
          <h1
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.01em] text-slate-900"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        ) : null}

        {/* first paragraph (body) */}
        {bodyProcessed ? (
          <div
            className="mt-5 max-w-3xl text-lg sm:text-xl text-slate-700"
            dangerouslySetInnerHTML={{ __html: bodyProcessed }}
          />
        ) : null}

        {/* second paragraph */}
        {secondProcessed ? (
          <div
            className="mt-3 max-w-3xl text-slate-700"
            dangerouslySetInnerHTML={{ __html: secondProcessed }}
          />
        ) : null}

        {/* CTAs */}
        {(primary || secondary || rest.length > 0) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {primary && (
              <Link
                href={primary.href}
                target={primary.isExternal ? "_blank" : undefined}
                rel={primary.isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
              >
                {primary.label}
              </Link>
            )}
            {secondary && (
              <Link
                href={secondary.href}
                target={secondary.isExternal ? "_blank" : undefined}
                rel={secondary.isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
              >
                {secondary.label}
              </Link>
            )}

            {/* any additional links as subtle text links */}
            {rest.map((lk) => (
              <Link
                key={lk.href + lk.label}
                href={lk.href}
                target={lk.isExternal ? "_blank" : undefined}
                rel={lk.isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center font-semibold text-slate-900 underline underline-offset-4"
              >
                {lk.label} →
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
