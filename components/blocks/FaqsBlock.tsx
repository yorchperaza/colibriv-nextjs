// components/blocks/FaqsBlock.tsx
import { drupal } from "@/lib/drupal"
import Link from "next/link"
import React from "react"

const BLOCK_TYPE = "block_content--faqs" // your bundle machine name

const FIELD_TITLE = "field_title"
const FIELD_CARDS = "field_cards_title_description"
const FIELD_LINKS = "field_links"
const FIELD_PATH = "field_path"

type JsonApiResource = any

type Props = {
  path?: string
  uuid?: string
  revalidate?: number
  className?: string
}

function norm(v: any) {
  return String(v ?? "").trim().toLowerCase()
}

function linkFromDrupal(
  link: any
): { href: string; label: string; external: boolean } | null {
  if (!link) return null
  const uri: string | undefined =
    link?.uri?.value ?? link?.uri ?? link?.url ?? link?.value
  const label: string = link?.title || link?.options?.title || "Learn more"
  if (!uri) return null
  let href = uri
  if (href.startsWith("internal:")) href = href.replace(/^internal:/, "") || "/"
  const external = /^https?:\/\//i.test(href)
  return { href, label, external }
}

async function fetchBlock({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    ...(path ? { "filter[field_path][value]": path } : {}),
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      FIELD_TITLE,
      FIELD_CARDS,
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
    if (!Array.isArray(rows) || rows.length === 0) return null
    if (!path) return rows[0]
    const want = norm(path)
    const filtered = rows.filter((b: any) => {
      const p = norm(b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH])
      return p === want || (p && p.startsWith(want))
    })
    return filtered[0] ?? rows[0]
  } catch (e) {
    console.warn("[FaqsBlock] failed to load block:", e)
    return null
  }
}

export default async function FaqsBlock(props: Props) {
  const { path, uuid, revalidate, className = "" } = props
  const block = await fetchBlock({ path, uuid, revalidate })
  if (!block) return null

  const sectionTitle =
    block?.[FIELD_TITLE]?.processed ??
    block?.[FIELD_TITLE]?.value ??
    block?.attributes?.[FIELD_TITLE]?.processed ??
    block?.attributes?.[FIELD_TITLE]?.value ??
    "FAQs"

  const items: Array<{ title?: string; description?: string }> =
    (block?.[FIELD_CARDS] ?? block?.attributes?.[FIELD_CARDS] ?? []) as any[]

  const links: any[] =
    (block?.[FIELD_LINKS] ?? block?.attributes?.[FIELD_LINKS] ?? []) as any[]

  const ctas = links
    .map(linkFromDrupal)
    .filter(Boolean)
    .slice(0, 2) as Array<{ href: string; label: string; external: boolean }>

  return (
    <section className={`bg-white py-14 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-4">
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900"
            dangerouslySetInnerHTML={{ __html: sectionTitle }}
          />
          <div className="hidden sm:block h-[2px] w-40 bg-gradient-to-r from-red-600 via-red-600/60 to-transparent rounded-full" />
        </div>

        {Array.isArray(items) && items.length > 0 && (
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {items.map((it, idx) => {
              const q = it?.title || ""
              const a = it?.description || ""
              return (
                <details
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white p-4 open:border-red-600/30"
                >
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    {q}
                  </summary>
                  {a ? (
                    <div
                      className="mt-2 text-sm leading-6 text-slate-600"
                      dangerouslySetInnerHTML={{ __html: a }}
                    />
                  ) : null}
                </details>
              )
            })}
          </div>
        )}

        {ctas.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {ctas[0] && (
              <Link
                href={ctas[0].href}
                target={ctas[0].external ? "_blank" : undefined}
                rel={ctas[0].external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
              >
                {ctas[0].label}
              </Link>
            )}
            {ctas[1] && (
              <Link
                href={ctas[1].href}
                target={ctas[1].external ? "_blank" : undefined}
                rel={ctas[1].external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
              >
                {ctas[1].label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
