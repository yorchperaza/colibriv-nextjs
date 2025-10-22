import { drupal } from "@/lib/drupal"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const NODE_TYPE = "node--article"
const FIELD_MEDIA = "field_media"
const FIELD_MEDIA_IMAGE = "field_media_image"
const MEDIA_IMAGE_TYPE = "media--image"
const FIELD_BODY = "body"

type JsonApiResource = any

/* ---------------- helpers ---------------- */

function absUrl(url?: string | null) {
  const base = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL?.replace(/\/$/, "") || ""
  if (!url) return ""
  if (/^https?:\/\//i.test(url)) return url
  const p = url.startsWith("/") ? url : `/${url}`
  return `${base}${p}`
}

function trimText(html: string, length = 140): string {
  // Strip HTML tags
  const text = html.replace(/<[^>]*>?/gm, "").trim()
  return text.length > length ? text.slice(0, length).trim() + "…" : text
}

async function fetchArticles(): Promise<JsonApiResource[]> {
  const params = {
    "filter[status]": 1,
    sort: "-created",
    page: { limit: 3 },
    include: `${FIELD_MEDIA},${FIELD_MEDIA}.${FIELD_MEDIA_IMAGE}`,
    [`fields[${NODE_TYPE}]`]: [
      "title",
      "path",
      FIELD_BODY,
      FIELD_MEDIA,
      "created",
    ].join(","),
    "fields[media--image]": `name,${FIELD_MEDIA_IMAGE}`,
    "fields[file--file]": "uri,url",
  }

  try {
    const nodes = await drupal.getResourceCollection<JsonApiResource>(NODE_TYPE, {
      params,
      next: { revalidate: 60, tags: [NODE_TYPE] },
    })
    return nodes || []
  } catch (e) {
    console.warn(`[LatestArticlesBlock] Failed to load articles:`, e)
    return []
  }
}

function getMediaUrl(media: any): string | null {
  if (!media || media.type !== MEDIA_IMAGE_TYPE) return null
  const img =
    media?.field_media_image ??
    media?.attributes?.field_media_image ??
    media?.relationships?.field_media_image?.data
  const raw =
    img?.uri?.url ||
    img?.uri?.value ||
    img?.url ||
    media?.attributes?.field_media_image?.url
  return absUrl(raw)
}

/* ---------------- component ---------------- */

export default async function LatestArticlesBlock() {
  const articles = await fetchArticles()
  if (!articles?.length) return null

  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-[-0.01em]">
            News &amp; Updates
          </h3>
          <Link
            href="/news"
            className="text-slate-900 font-semibold underline underline-offset-4"
          >
            Read all →
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {articles.map((node: any) => {
            const title = node?.title || "(Untitled)"
            const href = node?.path?.alias || `/node/${node.id}`
            const media = node?.[FIELD_MEDIA] || node?.relationships?.[FIELD_MEDIA]?.data
            const imgUrl = getMediaUrl(media)
            const bodyProcessed =
              node?.[FIELD_BODY]?.processed ?? node?.attributes?.[FIELD_BODY]?.processed ?? ""
            const excerpt = bodyProcessed ? trimText(bodyProcessed, 150) : ""

            return (
              <Link
                key={node.id}
                href={href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 hover:bg-slate-50 transition-all"
              >
                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-slate-100 to-slate-200">
                  {imgUrl && (
                    <Image
                      src={imgUrl}
                      alt={title}
                      width={640}
                      height={360}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 group-hover:underline">
                  {title}
                </h4>
                {excerpt && (
                  <p className="mt-2 text-slate-700 text-sm leading-relaxed">{excerpt}</p>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
