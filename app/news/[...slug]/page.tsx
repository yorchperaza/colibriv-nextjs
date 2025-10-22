// app/news/[...slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { drupal } from "@/lib/drupal";
import type { JsonApiResource } from "next-drupal";

export const dynamic = "force-static";
export const revalidate = 300;

/* ========= types ========= */

type DrupalImage = { uri?: { url?: string; value?: string } } & { url?: string };

type DrupalMedia = {
  id: string;
  type: "media--image" | "media--remote_video" | string;
  name?: string;
  field_media_image?: DrupalImage; // media--image
  thumbnail?: DrupalImage; // media--remote_video
};

type DrupalTerm = { id: string; name?: string; path?: { alias?: string } };

// Extend next-drupal's resource to satisfy generics
type DrupalArticle = JsonApiResource & {
  type: "node--article";
  title: string;
  created: string;
  path?: { alias?: string };
  body?: { summary?: string; processed?: string };
  field_featured?: boolean;
  field_media?: DrupalMedia | DrupalMedia[];
  field_tags?: DrupalTerm[];
};

/* ========= helpers ========= */

function absUrl(url?: string) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  const base = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL?.replace(/\/$/, "") || "";
  const p = url.startsWith("/") ? url : `/${url}`;
  return `${base}${p}`;
}

function getMediaUrl(media?: DrupalMedia): string | undefined {
  if (!media) return;
  const file = media.field_media_image ?? media.thumbnail;
  const raw = file?.uri?.url || file?.uri?.value || (file as any)?.url;
  return absUrl(raw);
}

function pickFirstMedia(n: DrupalArticle): DrupalMedia | undefined {
  const m = n.field_media as DrupalMedia | DrupalMedia[] | undefined;
  if (!m) return;
  return Array.isArray(m) ? m[0] : m;
}

function firstImage(n: DrupalArticle): string | undefined {
  return getMediaUrl(pickFirstMedia(n));
}

function firstTag(n: DrupalArticle): string | undefined {
  return n.field_tags?.[0]?.name || undefined;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

function stripHtml(html?: string, max = 180) {
  if (!html) return "";
  const text = html.replace(/<[^>]*>?/gm, "").trim();
  return text.length > max ? text.slice(0, max).trim() + "…" : text;
}

/* ========= data ========= */

/** Resolve an alias (/news/2025-10-20/slug) to a node UUID via Drupal router. */
async function routerTranslate(alias: string) {
  const base = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL?.replace(/\/$/, "");
  if (!base) return null;

  const norm = alias.startsWith("/") ? alias : `/${alias}`;
  const urls = [
    `${base}/router/translate-path?path=${encodeURIComponent(norm)}`,
    `${base}/router/translate-path?_format=json&path=${encodeURIComponent(norm)}`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) continue;
      const data = await res.json().catch(() => null);
      if (data?.entity?.uuid && data?.entity?.type === "node") return data;
    } catch {
      // keep trying
    }
  }
  return null;
}

/** Fetch a node--article by UUID with all needed includes/fields. */
async function fetchArticleByUUID(uuid: string): Promise<DrupalArticle | null> {
  try {
    const node = await drupal.getResource<DrupalArticle>("node--article", uuid, {
      params: {
        include:
          "field_media,field_media.field_media_image,field_media.thumbnail,field_tags",
        "fields[node--article]":
          "title,created,path,body,field_featured,field_media,field_tags",
        "fields[media--image]": "name,field_media_image",
        "fields[media--remote_video]": "name,thumbnail",
        "fields[file--file]": "uri",
        "fields[taxonomy_term--tags]": "name,path",
      },
      withAuth: false,
      deserialize: true,
    });
    return node ?? null;
  } catch {
    return null;
  }
}

/** Load article from route params like /news/2025-10-20/article-featured */
async function loadArticleFromParams(params: { slug: string[] }) {
  const primary = `/news/${params.slug.join("/")}`;
  let trans = await routerTranslate(primary);
  if (!trans) {
    const alt = `/blog/${params.slug.join("/")}`;
    trans = await routerTranslate(alt);
  }
  if (!trans?.entity?.uuid) return null;
  return fetchArticleByUUID(trans.entity.uuid);
}

/* ========= metadata ========= */

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params; // 👈 Next 15: params is a Promise
  const node = await loadArticleFromParams({ slug });
  if (!node) {
    return {
      title: "Article not found — ColibriV",
      description: "This article could not be found.",
    };
  }

  const title = node.title;
  const description =
    node.body?.summary ||
    stripHtml(node.body?.processed, 180) ||
    "News & updates from ColibriV.";
  const image = firstImage(node);

  return {
    title: `${title} — ColibriV`,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
      type: "article",
      publishedTime: node.created,
    },
  };
}

/* ========= page ========= */

export default async function ArticlePage({
                                            params,
                                          }: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params; // 👈 Next 15: params is a Promise
  const node = await loadArticleFromParams({ slug });
  if (!node) notFound();

  const img = firstImage(node);
  const tag = firstTag(node);

  return (
    <main className="bg-white">
      {/* ===== HERO / TITLE ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_0%_-10%,#fee2e2_0%,transparent_60%),radial-gradient(900px_500px_at_100%_10%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-10 lg:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <span className="block h-1.5 w-1.5 rounded-full bg-red-600" />
            {node.field_featured ? "Featured" : "Update"}
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-[-0.01em] text-slate-900">
            {node.title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
            {tag && (
              <span className="inline-flex items-center rounded-md bg-slate-900 px-2 py-0.5 text-white">
                {tag}
              </span>
            )}
            <time dateTime={node.created}>{formatDate(node.created)}</time>
          </div>
        </div>
      </section>

      {/* ===== FEATURED IMAGE ===== */}
      {img && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-100">
              <Image src={img} alt={node.title} fill className="object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* ===== BODY ===== */}
      <section className="bg-white py-10 lg:py-12">
        <article className="prose prose-slate mx-auto max-w-4xl px-6">
          {node.body?.processed ? (
            <div dangerouslySetInnerHTML={{ __html: node.body.processed }} />
          ) : (
            <p className="text-slate-600">No content.</p>
          )}
        </article>
      </section>

      {/* ===== FOOTER NAV ===== */}
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-4xl px-6 border-t border-slate-200 pt-6 flex items-center justify-between">
          <Link
            href="/news"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:border-slate-900 hover:bg-slate-50"
          >
            ← All News
          </Link>
          <div className="text-sm text-slate-500">
            Tagged:{" "}
            {tag ? (
              <span className="font-semibold text-slate-700">{tag}</span>
            ) : (
              "—"
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
