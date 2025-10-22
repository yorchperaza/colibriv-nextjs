// components/blocks/TitleDescriptionLinkCardWithBlock.tsx
import { drupal } from "@/lib/drupal";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Drupal block bundle: block_content--title_description_link_card_with
 *
 * Fields:
 *  - field_title (formatted)
 *  - body (formatted, long) -> { processed }
 *  - field_description_image (plain text)  // small paragraph under the media
 *  - field_media (media--image | media--remote_video)
 *  - field_links (multiple Link)
 *  - field_path (plain text)               // used to target a route
 */

const BLOCK_TYPE = "block_content--title_description_link_card_with";

const FIELD_TITLE = "field_title";
const FIELD_BODY = "body";
const FIELD_DESC_IMG = "field_description_image";
const FIELD_MEDIA = "field_media";
const FIELD_LINKS = "field_links";
const FIELD_PATH = "field_path";

// Media internals
const MEDIA_IMAGE_TYPE = "media--image";
const MEDIA_REMOTE_TYPE = "media--remote_video";
const FIELD_MEDIA_IMAGE = "field_media_image";
const FIELD_MEDIA_OEMBED = "field_media_oembed_video";

type JsonApiResource = any;

type Props = {
  /** Route to match, e.g. "/technology/engines" */
  path: string;
  /** Optionally render a specific block UUID */
  uuid?: string;
  /** ISR revalidate seconds */
  revalidate?: number;
  /** Optional section className overrides */
  className?: string;
};

/* ---------------- helpers ---------------- */

const DRUPAL_BASE =
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL?.replace(/\/$/, "") || "";

function absUrl(url?: string | null) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  const p = url.startsWith("/") ? url : `/${url}`;
  return `${DRUPAL_BASE}${p}`;
}

function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    // YouTube
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    // Vimeo
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  } catch {
    return url;
  }
}

function linkFromDrupal(link: any): { href: string; label: string; isExternal: boolean } | null {
  if (!link) return null;
  const uri: string | undefined =
    link?.uri?.value ?? link?.uri ?? link?.url ?? link?.value;
  const label: string = link?.title || link?.options?.title || "Learn more";
  if (!uri) return null;

  let href = uri;
  if (href.startsWith("internal:")) href = href.replace(/^internal:/, "") || "/";
  const isExternal = /^https?:\/\//i.test(href);
  return { href, label, isExternal };
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
      FIELD_DESC_IMG,
      FIELD_MEDIA,
      FIELD_LINKS,
      FIELD_PATH,
      "changed",
    ].join(","),
    "fields[media--image]": `name,${FIELD_MEDIA_IMAGE}`,
    "fields[media--remote_video]": `name,${FIELD_MEDIA_OEMBED}`,
    "fields[file--file]": "uri,url",
    sort: "-changed",
  };

  try {
    const rows = await drupal.getResourceCollection<JsonApiResource>(BLOCK_TYPE, {
      params,
      next: { revalidate, tags: [BLOCK_TYPE] },
    });

    if (!path) return rows || [];

    // Tolerant client-side check too:
    const norm = (v: any) => String(v ?? "").trim().toLowerCase();
    const want = norm(path);
    const filtered = (rows || []).filter((b: any) => {
      const p = b?.[FIELD_PATH] ?? b?.attributes?.[FIELD_PATH];
      const bp = norm(p);
      return bp === want || (bp && bp.startsWith(want));
    });
    return filtered.length ? filtered : (rows || []);
  } catch (e) {
    console.warn(`[TitleDescriptionLinkCardWith] load failed:`, e);
    return [];
  }
}

/* ---------------- render pieces ---------------- */

function getImageFromMedia(media: any) {
  const img =
    media?.[FIELD_MEDIA_IMAGE] ??
    media?.attributes?.[FIELD_MEDIA_IMAGE] ??
    media?.relationships?.[FIELD_MEDIA_IMAGE]?.data;

  const raw =
    img?.url ||
    img?.uri?.url ||
    img?.uri?.value ||
    media?.attributes?.[FIELD_MEDIA_IMAGE]?.url;

  const alt = media?.attributes?.name || media?.name || "Media image";
  return { raw, alt };
}

function RenderMedia({ media }: { media: JsonApiResource }) {
  if (!media) {
    // fallback placeholder (matches your example)
    return (
      <div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500">
        Diagram placeholder (Core ↔ Combustor ↔ Delivery ↔ Controls)
      </div>
    );
  }

  const type = media?.type;

  if (type === MEDIA_IMAGE_TYPE) {
    const { raw, alt } = getImageFromMedia(media);
    const src = absUrl(raw);
    if (!src) return null;

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
    );
  }

  if (type === MEDIA_REMOTE_TYPE) {
    const oembed =
      media?.[FIELD_MEDIA_OEMBED] ?? media?.attributes?.[FIELD_MEDIA_OEMBED];
    if (!oembed) return null;

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
    );
  }

  return null;
}

/* ---------------- component ---------------- */

export default async function TitleDescriptionLinkCardWithBlock(props: Props) {
  const { path = "/", uuid, revalidate, className = "" } = props;
  const blocks = await fetchBlocks({ path, uuid, revalidate });
  if (!blocks?.length) return null;

  return (
    <section className={`bg-slate-50 py-14 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
          {blocks.map((block: any) => {
            const title =
              block?.[FIELD_TITLE]?.processed ??
              block?.[FIELD_TITLE]?.value ??
              block?.attributes?.[FIELD_TITLE]?.processed ??
              block?.attributes?.[FIELD_TITLE]?.value ??
              "";

            const bodyProcessed =
              block?.[FIELD_BODY]?.processed ??
              block?.attributes?.[FIELD_BODY]?.processed ??
              "";

            const descImage =
              block?.[FIELD_DESC_IMG] ??
              block?.attributes?.[FIELD_DESC_IMG] ??
              "";

            const media =
              block?.[FIELD_MEDIA] ??
              block?.attributes?.[FIELD_MEDIA] ??
              null;

            const links: any[] =
              block?.[FIELD_LINKS] ??
              block?.attributes?.[FIELD_LINKS] ??
              [];

            return (
              <React.Fragment key={block?.id || block?.drupal_internal__id}>
                {/* Left column: Title + Body (HTML list) + CTAs */}
                <div>
                  {title ? (
                    <h2
                      className="text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900"
                      dangerouslySetInnerHTML={{ __html: title }}
                    />
                  ) : null}

                  {bodyProcessed ? (
                    <div
                      className="mt-6 space-y-4 text-slate-700"
                      // Body is expected to contain <ol> / <li> etc.
                      dangerouslySetInnerHTML={{ __html: bodyProcessed }}
                    />
                  ) : null}

                  {/* CTA buttons */}
                  {Array.isArray(links) && links.length > 0 ? (
                    <div className="mt-8 flex flex-wrap gap-3">
                      {links.map((lk: any, idx: number) => {
                        const parsed = linkFromDrupal(lk);
                        if (!parsed) return null;
                        const { href, label, isExternal } = parsed;

                        // style: first outline/dark, second solid red, rest outline
                        const solid = idx === 1;
                        const cls = solid
                          ? "inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95"
                          : "inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white";

                        return (
                          <Link
                            key={`${href}-${idx}`}
                            href={href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className={cls}
                          >
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                {/* Right column: media card + small description text */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8">
                  <RenderMedia media={media} />
                  {descImage ? (
                    <p className="mt-4 text-sm text-slate-600">{descImage}</p>
                  ) : null}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
