// app/news/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { drupal } from "@/lib/drupal";

export const dynamic = "force-static";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "News & Updates — ColibriV",
  description:
    "Latest updates on ColibriV’s hydrogen-combustion program: engines, combustor R&D, storage & delivery, safety & certification, and global partners.",
  openGraph: {
    title: "News & Updates — ColibriV",
    description:
      "Milestones, test data highlights, partner announcements, and roadmap progress.",
  },
};

type DrupalImage = { uri?: { url?: string; value?: string } } & { url?: string };
type DrupalMedia = {
  id: string;
  type: "media--image" | "media--remote_video" | string;
  name?: string;
  field_media_image?: DrupalImage; // image bundle
  thumbnail?: DrupalImage; // remote_video bundle
};

type DrupalTerm = { id: string; name?: string; path?: { alias?: string } };

type DrupalArticle = {
  id: string;
  type: "node--article";
  title: string;
  created: string;
  path?: { alias?: string };
  body?: { summary?: string; processed?: string };
  field_featured?: boolean;
  field_media?: DrupalMedia | DrupalMedia[];
  field_tags?: DrupalTerm[];
};

/* ---------------- helpers ---------------- */

function absUrl(url?: string) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  const base = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL?.replace(/\/$/, "") || "";
  const p = url.startsWith("/") ? url : `/${url}`;
  return `${base}${p}`;
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

function getArticleUrl(n: DrupalArticle) {
  return n.path?.alias ?? `/blog/${n.id}`;
}

// Trim helpers
function stripHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim();
}
function getExcerpt(n: DrupalArticle, length = 160): string {
  const text = n.body?.summary?.trim() || stripHtml(n.body?.processed);
  if (!text) return "";
  return text.length > length ? text.slice(0, length).trimEnd() + "…" : text;
}

// Media helpers
function pickMedia(n: DrupalArticle): DrupalMedia | undefined {
  const m = n.field_media as DrupalMedia | DrupalMedia[] | undefined;
  if (!m) return undefined;
  return Array.isArray(m) ? m[0] : m;
}

function getMediaUrl(media?: DrupalMedia): string | undefined {
  if (!media) return;
  const file = media.field_media_image ?? media.thumbnail;
  const raw = file?.uri?.url || file?.uri?.value || (file as any)?.url;
  return absUrl(raw);
}

function getFirstImage(n: DrupalArticle): string | undefined {
  return getMediaUrl(pickMedia(n));
}

function getFirstTag(n: DrupalArticle): string | undefined {
  return n.field_tags?.[0]?.name || undefined;
}

/* ---------------- data loaders ---------------- */

async function getFeatured(): Promise<DrupalArticle | null> {
  const results = await drupal.getResourceCollection<DrupalArticle[]>("node--article", {
    params: {
      "filter[field_featured]": "1",
      sort: "-created",
      "page[limit]": 1,
      include: "field_media,field_media.field_media_image,field_media.thumbnail,field_tags",
      "fields[node--article]": "title,created,path,body,field_featured,field_media,field_tags",
      "fields[media--image]": "name,field_media_image",
      "fields[media--remote_video]": "name,thumbnail",
      "fields[file--file]": "uri",
      "fields[taxonomy_term--tags]": "name,path",
    },
    withAuth: false,
    deserialize: true,
  });

  return results?.[0] ?? null;
}

async function getArticles({
                             excludeId,
                             page,
                             perPage,
                           }: {
  excludeId?: string;
  page: number;
  perPage: number;
}): Promise<{ items: DrupalArticle[]; hasMore: boolean }> {
  const filters: Record<string, string> = { "filter[status]": "1" };
  if (excludeId) {
    filters["filter[exclude_id][condition][path]"] = "id";
    filters["filter[exclude_id][condition][operator]"] = "<>";
    filters["filter[exclude_id][condition][value]"] = excludeId;
  }

  const params: Record<string, string | number> = {
    ...filters,
    sort: "-created",
    "page[limit]": perPage,
    "page[offset]": (page - 1) * perPage,
    include: "field_media,field_media.field_media_image,field_media.thumbnail,field_tags",
    "fields[node--article]": "title,created,path,body,field_featured,field_media,field_tags",
    "fields[media--image]": "name,field_media_image",
    "fields[media--remote_video]": "name,thumbnail",
    "fields[file--file]": "uri",
    "fields[taxonomy_term--tags]": "name,path",
  };

  const items = await drupal.getResourceCollection<DrupalArticle[]>("node--article", {
    params,
    withAuth: false,
    deserialize: true,
  });

  return { items, hasMore: items.length === perPage };
}

/* ---------------- page ---------------- */

export default async function NewsPage({
                                         searchParams,
                                       }: {
  // Next 15: searchParams is a Promise
  searchParams?: Promise<{ page?: string; perPage?: string; tag?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const page = Math.max(1, Number(sp.page ?? 1));
  const perPage = Math.min(24, Math.max(6, Number(sp.perPage ?? 9)));

  const featured = await getFeatured();
  const { items } = await getArticles({ excludeId: featured?.id, page, perPage });

  if (!featured && items.length === 0) {
    notFound();
  }

  return (
    <main className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_520px_at_0%_-10%,#fee2e2_0%,transparent_60%),radial-gradient(900px_500px_at_100%_10%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10 lg:pt-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
                <span className="block h-1.5 w-1.5 rounded-full bg-red-600" />
                Updates
              </div>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.01em] text-slate-900">
                News &amp; Updates
              </h1>
              <p className="mt-4 max-w-3xl text-lg sm:text-xl text-slate-700">
                Milestones, partner announcements, and engineering notes from
                Liberia, Guanacaste (LIR) as we build a cert-ready
                hydrogen-combustion program for mid–long range passenger flight.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Contact Press
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED POST ===== */}
      {featured && (
        <section className="bg-white py-10 lg:py-12">
          <div className="mx-auto max-w-7xl px-6">
            <article className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:p-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-700 ring-1 ring-slate-200">
                  Featured
                </div>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-slate-900">
                  {featured.title}
                </h2>

                {/* summary OR trimmed processed body */}
                {(() => {
                  const excerpt = getExcerpt(featured, 220);
                  return excerpt ? <p className="mt-3 text-slate-700">{excerpt}</p> : null;
                })()}

                <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
                  {getFirstTag(featured) && (
                    <span className="inline-flex items-center rounded-md bg-slate-900 px-2 py-0.5 text-white">
                      {getFirstTag(featured)}
                    </span>
                  )}
                  <time dateTime={featured.created}>{formatDate(featured.created)}</time>
                </div>
                <div className="mt-5">
                  <Link
                    href={getArticleUrl(featured)}
                    className="text-slate-900 font-semibold underline underline-offset-4 decoration-red-600"
                  >
                    Read update →
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-100">
                <Image
                  alt={featured.title}
                  src={getFirstImage(featured) || "/images/placeholder.jpg"}
                  fill
                  className="object-cover"
                />
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ===== POSTS GRID ===== */}
      <section className="bg-white pb-8 lg:pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => {
              const excerpt = getExcerpt(post, 160);
              return (
                <Link
                  key={post.id}
                  href={getArticleUrl(post)}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:bg-slate-50"
                >
                  <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
                    <Image
                      alt={post.title}
                      src={getFirstImage(post) || "/images/placeholder.jpg"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {getFirstTag(post) && (
                      <span className="inline-flex items-center rounded-md bg-slate-900 px-2 py-0.5 font-bold tracking-wide text-white">
                        {getFirstTag(post)}
                      </span>
                    )}
                    <time className="text-slate-500" dateTime={post.created}>
                      {formatDate(post.created)}
                    </time>
                  </div>
                  <h3 className="mt-2 text-lg font-extrabold text-slate-900 group-hover:underline">
                    {post.title}
                  </h3>

                  {/* summary OR trimmed processed body */}
                  {excerpt && (
                    <p className="mt-1 text-slate-700 text-sm leading-relaxed">{excerpt}</p>
                  )}
                </Link>
              );
            })}
          </div>

          {/* ===== PAGINATION ===== */}
          <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
            <Link
              aria-disabled={page <= 1}
              href={page <= 1 ? "#" : `/news?page=${page - 1}&perPage=${perPage}`}
              className={`inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold ${
                page <= 1
                  ? "border-slate-300 text-slate-400 pointer-events-none"
                  : "border-slate-300 text-slate-900 hover:border-slate-900 hover:bg-slate-50"
              }`}
            >
              ← Newer
            </Link>
            <div className="text-sm text-slate-500">Page {page}</div>
            <Link
              href={`/news?page=${page + 1}&perPage=${perPage}`}
              className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:border-slate-900 hover:bg-slate-50"
            >
              Older →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 lg:p-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-[-0.01em] text-slate-900">
                Engines first. Certification from day one.
              </h3>
              <p className="mt-1 text-slate-700">
                See the technical plan and how partners can engage.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/technology/engines"
                className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-base font-semibold text-white hover:bg-slate-800"
              >
                Explore the Technology
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center rounded-xl border-2 border-slate-900 px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Partner With Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
