// components/blocks/RouteMediaBlock.tsx
import Image from "next/image"
import { drupal } from "@/lib/drupal"
import React from "react"

const BLOCK_TYPE = "block_content--media"
const FIELD_MEDIA = "field_media"
const FIELD_PATH = "field_path"

const MEDIA_IMAGE_TYPE = "media--image"
const MEDIA_REMOTE_TYPE = "media--remote_video"
const FIELD_MEDIA_IMAGE = "field_media_image"
const FIELD_MEDIA_OEMBED = "field_media_oembed_video"

type JsonApiResource = any

type Props = {
  path: string
  uuid?: string
  revalidate?: number
}

async function fetchRouteMediaBlocks({ path, uuid, revalidate = 60 }: Props) {
  const params: Record<string, any> = {
    ...(uuid ? { "filter[id]": uuid } : {}),
    include: [`${FIELD_MEDIA}`, `${FIELD_MEDIA}.${FIELD_MEDIA_IMAGE}`].join(","),
    "fields[block_content--media]": `drupal_internal__id,${FIELD_MEDIA},${FIELD_PATH}`,
    "fields[media--image]": `name,${FIELD_MEDIA_IMAGE}`,
    "fields[media--remote_video]": `name,${FIELD_MEDIA_OEMBED}`,
    "fields[file--file]": "uri,url",
    sort: "-changed",
  }

  const blocks = await drupal.getResourceCollection<JsonApiResource>(BLOCK_TYPE, {
    params,
    next: { revalidate, tags: [BLOCK_TYPE] },
  })

  return (blocks || []).filter((b: any) => {
    const p = b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH]
    return p === path
  })
}

const DRUPAL_BASE =
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL?.replace(/\/$/, "") || ""

function absUrl(url?: string | null) {
  if (!url) return ""
  if (/^https?:\/\//i.test(url)) return url
  const p = url.startsWith("/") ? url : `/${url}`
  return `${DRUPAL_BASE}${p}`
}

function MediaImage({ media }: { media: JsonApiResource }) {
  const img =
    media?.[FIELD_MEDIA_IMAGE] ??
    media?.attributes?.[FIELD_MEDIA_IMAGE] ??
    media?.relationships?.[FIELD_MEDIA_IMAGE]?.data

  const raw =
    img?.url || img?.uri?.url || img?.uri?.value || media?.attributes?.[FIELD_MEDIA_IMAGE]?.url

  const src = absUrl(raw)
  const alt = media?.attributes?.name || media?.name || "Media image"
  if (!src) return null

  // ✅ 100% of parent width, maintain aspect
  return (
    <Image
      src={src}
      alt={alt}
      width={1920}         // intrinsic; any safe large baseline
      height={1080}
      sizes="100vw"        // let Next serve proper sizes; constrained by parent width
      className="w-full h-auto object-cover"
      priority
    />
  )
}

function MediaRemoteVideo({ media }: { media: JsonApiResource }) {
  const oembed = media?.[FIELD_MEDIA_OEMBED] ?? media?.attributes?.[FIELD_MEDIA_OEMBED]
  if (!oembed) return null

  return (
    // ✅ 100% width of parent, responsive 16:9
    <div className="w-full aspect-video overflow-hidden">
      <iframe
        src={toEmbedUrl(oembed)}
        title={media?.attributes?.name || "Embedded video"}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}

function RenderMedia({ media }: { media: JsonApiResource }) {
  if (media?.type === MEDIA_IMAGE_TYPE) return <MediaImage media={media} />
  if (media?.type === MEDIA_REMOTE_TYPE) return <MediaRemoteVideo media={media} />
  return null
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

export default async function RouteMediaBlock(props: Props) {
  const { path = "/", uuid, revalidate } = props
  const blocks = await fetchRouteMediaBlocks({ path, uuid, revalidate })
  if (!blocks?.length) return null

  const block = blocks[0]
  const media =
    block?.[FIELD_MEDIA] ?? block?.attributes?.[FIELD_MEDIA] ?? null
  if (!media) return null

  return (
    // ⬇️ No bleed. This fills exactly the width of its parent container.
    <section aria-label="Featured media" className="my-6 lg:my-10 w-full">
      <RenderMedia media={media} />
    </section>
  )
}
