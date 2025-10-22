// components/blocks/TitleDescriptionLinkCardBlock.tsx
import { drupal } from "@/lib/drupal"
import Link from "next/link"
import React from "react"

const BLOCK_TYPE = "block_content--title_description_link_card"
const FIELD_TITLE = "field_title"
const FIELD_BODY = "body"
const FIELD_SECOND = "field_second_text"
const FIELD_LINKS = "field_links"
const FIELD_PATH = "field_path"

type JsonApiResource = any

type Props = {
  path: string
  uuid?: string
  revalidate?: number
  className?: string
}

/* ---------------- helpers ---------------- */

function linkFromDrupal(link: any): { href: string; label: string; isExternal: boolean } | null {
  if (!link) return null
  const uri: string | undefined =
    link?.uri?.value ?? link?.uri ?? link?.url ?? link?.value
  let href = uri || ""
  if (!href) return null
  if (href.startsWith("internal:")) href = href.replace(/^internal:/, "") || "/"
  const label: string = link?.title || link?.options?.title || "Learn more"
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

    if (!path) return rows || []

    const norm = (v: any) => String(v ?? "").trim().toLowerCase()
    const want = norm(path)
    const filtered = (rows || []).filter((b: any) => {
      const p = b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH]
      const bp = norm(p)
      return bp === want || (bp && bp.startsWith(want))
    })
    return filtered.length ? filtered : (rows || [])
  } catch (e) {
    console.warn("[TitleDescriptionLinkCardBlock] load failed:", e)
    return []
  }
}

/* ---------------- component ---------------- */

export default async function TitleDescriptionLinkCardBlock(props: Props) {
  const { path = "/", uuid, revalidate, className = "" } = props
  const blocks = await fetchBlocks({ path, uuid, revalidate })
  if (!blocks?.length) return null

  return (
    <section className={`bg-slate-50 py-14 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
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

            const secondHtml =
              block?.[FIELD_SECOND]?.processed ??
              block?.attributes?.[FIELD_SECOND]?.processed ??
              ""

            const rawLinks =
              block?.[FIELD_LINKS] ??
              block?.attributes?.[FIELD_LINKS] ??
              []

            // Normalize all links
            const linkItems = (Array.isArray(rawLinks) ? rawLinks : [rawLinks])
              .map(linkFromDrupal)
              .filter(Boolean) as Array<{ href: string; label: string; isExternal: boolean }>

            return (
              <React.Fragment key={block?.id || block?.drupal_internal__id}>
                {/* Left column: Title + Body + ALL links */}
                <div>
                  {titleHtml ? (
                    <h2
                      className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900"
                      dangerouslySetInnerHTML={{ __html: titleHtml }}
                    />
                  ) : null}

                  {bodyHtml ? (
                    <div
                      className="mt-4 space-y-3 text-slate-700"
                      dangerouslySetInnerHTML={{ __html: bodyHtml }}
                    />
                  ) : null}

                  {linkItems.length ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {linkItems.map((l, idx) => {
                        const isPrimary = idx === 0
                        const className = isPrimary
                          ? "inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
                          : "inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
                        return (
                          <Link
                            key={`${l.href}-${idx}`}
                            href={l.href}
                            target={l.isExternal ? "_blank" : undefined}
                            rel={l.isExternal ? "noopener noreferrer" : undefined}
                            className={className}
                          >
                            {l.label}
                          </Link>
                        )
                      })}
                    </div>
                  ) : null}
                </div>

                {/* Right column: white card with "second text" content */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8">
                  {secondHtml ? (
                    <div
                      className="prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ __html: secondHtml }}
                    />
                  ) : (
                    <>
                      <h3 className="font-extrabold text-slate-900">Details</h3>
                      <p className="mt-3 text-slate-700 text-sm">
                        Add content to <code>field_second_text</code> to populate this card.
                      </p>
                    </>
                  )}
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
