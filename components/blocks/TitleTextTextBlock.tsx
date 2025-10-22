// components/blocks/TitleTextTextBlock.tsx
import { drupal } from "@/lib/drupal"
import React from "react"

const BLOCK_TYPE = "block_content--title_text_text"
const FIELD_TITLE = "field_title"
const FIELD_BODY = "body"
const FIELD_SECOND_BODY = "field_second_body"
const FIELD_PATH = "field_path"

type JsonApiResource = any

type Props = {
  /** Match by field_path (e.g. "/technology") */
  path?: string
  /** Optionally fetch specific UUID */
  uuid?: string
  /** ISR revalidate time */
  revalidate?: number
}

/* ---------------- data ---------------- */

async function fetchBlock({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    ...(path ? { "filter[field_path][value]": path } : {}),
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      FIELD_TITLE,
      FIELD_BODY,
      FIELD_SECOND_BODY,
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

    // Client-side fallback match for null/empty field_path
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
    console.warn("[TitleTextTextBlock] load failed:", e)
    return null
  }
}

/* ---------------- component ---------------- */

export default async function TitleTextTextBlock(props: Props) {
  const { path, uuid, revalidate } = props
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

  const secondBodyProcessed =
    block?.[FIELD_SECOND_BODY]?.processed ??
    block?.attributes?.[FIELD_SECOND_BODY]?.processed ??
    ""

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 grid gap-8 lg:grid-cols-2">
        {/* Left column */}
        <div>
          {title && (
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          {bodyProcessed && (
            <div
              className="mt-4 text-slate-700 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: bodyProcessed }}
            />
          )}
        </div>

        {/* Right column */}
        {secondBodyProcessed && (
          <div
            className="space-y-3 text-slate-700"
            dangerouslySetInnerHTML={{ __html: secondBodyProcessed }}
          />
        )}
      </div>
    </section>
  )
}
