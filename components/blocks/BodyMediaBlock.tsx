// components/blocks/BodyMediaBlock.tsx
import { drupal } from "@/lib/drupal"
import Image from "next/image"
import Link from "next/link"
import React from "react"

/**
 * Block type: block_content--title_description_card_with_imag
 */
const BLOCK_TYPE = "block_content--title_description_card_with_imag"

const FIELD_TITLE = "field_title"
const FIELD_BODY = "body"
const FIELD_MEDIA = "field_media"
const FIELD_LINKS = "field_links"
const FIELD_PATH = "field_path"

const MEDIA_IMAGE_TYPE = "media--image"
const MEDIA_REMOTE_TYPE = "media--remote_video"
const FIELD_MEDIA_IMAGE = "field_media_image"
const FIELD_MEDIA_OEMBED = "field_media_oembed_video"

type JsonApiResource = any

type Props = {
  path?: string
  uuid?: string
  revalidate?: number
  className?: string
}

/* ---------------- helpers ---------------- */

const DRUPAL_BASE =
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL?.replace(/\/$/, "") || ""

function absUrl(url?: string | null) {
  if (!url) return ""
  if (/^https?:\/\//i.test(url)) return url
  const p = url.startsWith("/") ? url : `/${url}`
  return `${DRUPAL_BASE}${p}`
}

function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v")
      if (v) return `https://www.youtube.com/embed/${v}`
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "")
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop()
      if (id) return `https://player.vimeo.com/video/${id}`
    }
    return url
  } catch {
    return url
  }
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

/* ---------------- data ---------------- */

async function fetchBlocks({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    ...(path ? { "filter[field_path][value]": path } : {}),
    include: [FIELD_MEDIA, `${FIELD_MEDIA}.${FIELD_MEDIA_IMAGE}`].join(","),
    [`fields[${BLOCK_TYPE}]`]: [
      "drupal_internal__id",
      FIELD_TITLE,
      FIELD_BODY,
      FIELD_MEDIA,
      FIELD_LINKS,
      FIELD_PATH,
      "changed",
    ].join(","),
    "fields[media--image]": `name,${FIELD_MEDIA_IMAGE}`,
    "fields[media--remote_video]": `name,${FIELD_MEDIA_OEMBED}`,
    "fields[file--file]": "uri,url",
    sort: "-changed",
  }

  try {
    const rows = await drupal.getResourceCollection<JsonApiResource>(BLOCK_TYPE, {
      params,
      next: { revalidate, tags: [BLOCK_TYPE] },
    })

    if (path) {
      const norm = (v: any) => String(v ?? "").trim().toLowerCase()
      const want = norm(path)
      const filtered = (rows || []).filter((b: any) => {
        const p = b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH]
        const bp = norm(p)
        return bp === want || (bp && bp.startsWith(want))
      })
      return filtered.length ? filtered : (rows || [])
    }

    return rows || []
  } catch (e: any) {
    console.warn(
      `[BodyMediaBlock] Failed to load ${BLOCK_TYPE}. Check JSON:API + permissions.`,
      e?.message || e
    )
    return []
  }
}

/* ---------------- render pieces ---------------- */

function getImageFromMedia(media: any) {
  const img =
    media?.[FIELD_MEDIA_IMAGE] ??
    media?.attributes?.[FIELD_MEDIA_IMAGE] ??
    media?.relationships?.[FIELD_MEDIA_IMAGE]?.data

  const raw =
    img?.url || img?.uri?.url || img?.uri?.value || media?.attributes?.[FIELD_MEDIA_IMAGE]?.url

  const alt = media?.attributes?.name || media?.name || "Media image"
  return { raw, alt }
}

function RenderMedia({ media }: { media: JsonApiResource }) {
  if (!media) return null
  const type = media?.type

  if (type === MEDIA_IMAGE_TYPE) {
    const { raw, alt } = getImageFromMedia(media)
    const src = absUrl(raw)
    if (!src) return null

    return (
      <div className="aspect-[16/10] w-full overflow-hidden rounded-xl relative">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover"
          priority
        />
      </div>
    )
  }

  if (type === MEDIA_REMOTE_TYPE) {
    const oembed =
      media?.[FIELD_MEDIA_OEMBED] ?? media?.attributes?.[FIELD_MEDIA_OEMBED]
    if (!oembed) return null

    return (
      <div className="aspect-[16/10] w-full overflow-hidden rounded-xl">
        <iframe
          src={toEmbedUrl(oembed)}
          title={media?.attributes?.name || "Embedded media"}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }

  return null
}

/* ---------------- component ---------------- */

export default async function BodyMediaBlock(props: Props) {
  const { path = "/", uuid, revalidate, className = "" } = props
  const blocks = await fetchBlocks({ path, uuid, revalidate })
  if (!blocks?.length) {
    console.warn(
      `[BodyMediaBlock] No blocks found. Note: your block's field_path may be null. ` +
      `Either set field_path to "/" in Drupal, or omit the 'path' prop to render all.`
    )
    return null
  }

  return (
    <section className={`bg-slate-50 py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          {blocks.map((block: any) => {
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

            const media =
              block?.[FIELD_MEDIA] ??
              block?.attributes?.[FIELD_MEDIA] ??
              null

            const links =
              block?.[FIELD_LINKS] ??
              block?.attributes?.[FIELD_LINKS] ??
              []

            return (
              <React.Fragment key={block?.id || block?.drupal_internal__id}>
                {/* Left column */}
                <div>
                  {title ? (
                    <h3
                      className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-[-0.01em]"
                      dangerouslySetInnerHTML={{ __html: title }}
                    />
                  ) : null}

                  {bodyProcessed && (
                    <div
                      className="prose prose-slate mt-4 max-w-none"
                      dangerouslySetInnerHTML={{ __html: bodyProcessed }}
                    />
                  )}
                </div>

                {/* Right column: media in rounded card + rounded buttons */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-lg overflow-hidden">
                  <RenderMedia media={media} />

                  {Array.isArray(links) && links.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {links.map((lk: any, idx: number) => {
                        const parsed = linkFromDrupal(lk)
                        if (!parsed) return null
                        const { href, label, isExternal } = parsed
                        return (
                          <Link
                            key={idx}
                            href={href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-3 text-base font-semibold text-white transition-all hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40 focus-visible:ring-offset-2"
                          >
                            {label} →
                          </Link>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
