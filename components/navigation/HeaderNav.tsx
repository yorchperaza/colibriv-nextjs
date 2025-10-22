// components/navigation/HeaderNav.tsx (server)
import Image from "next/image"
import { drupal } from "@/lib/drupal"
import NavClient from "./NavClient"
import { Link } from "@/components/navigation/Link"

type MenuItem = {
  title: string
  url: string
  attributes?: Record<string, any>
  items?: MenuItem[]
}

// ---- helpers to build a tree from a flat array ----
function slugifyTitle(t: string) {
  return t
    .normalize("NFD") // split accents
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function normalizeMenu(flat: MenuItem[]): MenuItem[] {
  if (!Array.isArray(flat)) return []

  // If any item already has children, assume hierarchical is correct.
  const alreadyNested = flat.some((i) => Array.isArray(i.items) && i.items.length)
  if (alreadyNested) return flat

  // Build nodes map (clone so we can attach children)
  const nodeByKey = new Map<string, MenuItem>()
  const keyOf = (i: MenuItem) => (i.url || `title:${i.title}`)
  flat.forEach((i) => nodeByKey.set(keyOf(i), { ...i, items: [] }))

  // Index by possible parent references that Drupal might expose
  // Common shapes seen: attributes.parent, attributes.drupal_parent, attributes?.meta?.parent
  const parentKey = (i: any): string | null =>
    i?.attributes?.parent ?? i?.attributes?.drupal_parent ?? i?.attributes?.meta?.parent ?? null

  // 1) Try explicit parent relationships first
  const assigned = new Set<string>()
  flat.forEach((raw) => {
    const p = parentKey(raw)
    if (p && nodeByKey.has(p)) {
      const parent = nodeByKey.get(p)!
      const child = nodeByKey.get(keyOf(raw))!
      parent.items!.push(child)
      assigned.add(keyOf(raw))
    }
  })

  // 2) URL prefix heuristic (e.g., /technology/* under /technology)
  // Works when there is a real parent URL.
  const byUrl = flat.filter((i) => i.url).map((i) => i.url)
  flat.forEach((raw) => {
    if (assigned.has(keyOf(raw)) || !raw.url) return
    // Find the *longest* prefix parent (excluding itself)
    let candidate: MenuItem | null = null
    for (const url of byUrl) {
      if (url !== raw.url && raw.url.startsWith(url + "/")) {
        const maybe = nodeByKey.get(url)
        if (maybe) {
          if (!candidate || (maybe.url!.length > (candidate.url?.length ?? 0))) {
            candidate = maybe
          }
        }
      }
    }
    if (candidate) {
      const child = nodeByKey.get(keyOf(raw))!
      candidate.items!.push(child)
      assigned.add(keyOf(raw))
    }
  })

  // 3) Title-slug heuristic: when parent has empty URL (“Technology” → children /technology/*)
  const parentsWithEmptyUrl = flat.filter((i) => !i.url && i.title)
  if (parentsWithEmptyUrl.length) {
    parentsWithEmptyUrl.forEach((p) => {
      const slug = "/" + slugifyTitle(p.title)
      // Match children whose url starts with /{slug}/
      flat.forEach((raw) => {
        if (assigned.has(keyOf(raw)) || !raw.url) return
        if (raw.url.startsWith(slug + "/")) {
          const parentNode = nodeByKey.get(keyOf(p))!
          const childNode = nodeByKey.get(keyOf(raw))!
          parentNode.items!.push(childNode)
          assigned.add(keyOf(raw))
        }
      })
    })
  }

  // Roots: items not assigned as child
  const roots: MenuItem[] = []
  flat.forEach((raw) => {
    const node = nodeByKey.get(keyOf(raw))!
    if (!assigned.has(keyOf(raw))) {
      roots.push(node)
    }
  })

  // Optional: keep original order for roots and each children group
  const orderIndex = new Map<string, number>()
  flat.forEach((i, idx) => orderIndex.set(keyOf(i), idx))
  const sorter = (a: MenuItem, b: MenuItem) =>
    (orderIndex.get(keyOf(a)) ?? 0) - (orderIndex.get(keyOf(b)) ?? 0)
  roots.sort(sorter)
  roots.forEach((r) => r.items?.sort(sorter))
  roots.forEach(function sortDeep(r) {
    r.items?.forEach((c) => c.items?.sort(sorter))
  })

  return roots
}

// ---- fetch + normalize ----
async function getMenuTree(menuName: string): Promise<MenuItem[]> {
  const raw = await drupal.getMenu(menuName).catch(() => null as any)
  const flat: MenuItem[] = Array.isArray(raw?.items)
    ? raw.items
    : Array.isArray(raw?.tree)
      ? raw.tree
      : Array.isArray(raw)
        ? raw
        : []
  return normalizeMenu(flat)
}

export async function HeaderNav() {
  const [primary, secondary] = await Promise.all([
    getMenuTree("main"),
    getMenuTree("header-navigation"),
  ])

  return (
    <header className="w-full">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-6 flex items-center justify-between py-4 lg:py-6">
        <Link href="/" className="inline-flex items-center gap-3 no-underline">
          <Image
            src="/logo.svg"
            alt="Site logo"
            width={160}
            height={40}
            priority
            className="h-8 w-auto lg:h-10"
          />
          <span className="sr-only">Home</span>
        </Link>
        {/* After normalization, your existing NavClient will render flyouts correctly */}
        <NavClient primary={primary} secondary={secondary} />
      </div>
    </header>
  )
}

export default HeaderNav
