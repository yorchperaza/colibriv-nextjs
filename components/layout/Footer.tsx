import Image from "next/image"
import { drupal } from "@/lib/drupal"
import { Link } from "@/components/navigation/Link"
import React from "react"

type MenuItem = {
  title: string
  url: string
  attributes?: Record<string, any>
  items?: MenuItem[]
}

type MenuColumn = {
  title: string
  items: MenuItem[]
}

/* -------- fetch helpers -------- */

async function fetchMenu(name: string): Promise<MenuItem[]> {
  try {
    const raw = await drupal.getMenu(name).catch(() => null as any)
    // Support both { items } and { tree } shapes (Next-Drupal / JSON:API Menu)
    const items: MenuItem[] = Array.isArray(raw?.items)
      ? raw.items
      : Array.isArray(raw?.tree)
        ? raw.tree
        : Array.isArray(raw)
          ? raw
          : []
    return items
  } catch {
    return []
  }
}

function ext(link: MenuItem) {
  const href = link?.url || ""
  return /^https?:\/\//i.test(href)
}

/* -------- component -------- */

export default async function Footer() {
  // Fetch three footer menus in parallel
  const [m1, m2, m3] = await Promise.all([
    fetchMenu("footer"),
    fetchMenu("footer1"),
    fetchMenu("footer2"),
  ])

  // Titles shown above each column (feel free to rename)
  const columns: MenuColumn[] = [
    { title: "Company", items: m1 || [] },
    { title: "Resources", items: m2 || [] },
    { title: "More", items: m3 || [] },
  ]

  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* Brand + addresses */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 no-underline">
              <Image
                src="/logo.svg"
                alt="Site logo"
                width={160}
                height={40}
                className="h-8 w-auto"
                priority
              />
              <span className="sr-only">Home</span>
            </Link>

            <div className="mt-6 grid gap-4 text-sm text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">Costa Rica</p>
                <p>Guanacaste, Liberia (LIR)</p>
                <p>Test & Operations</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Denver, USA</p>
                <p>Colorado Front Range</p>
                <p>Engineering & Partnerships</p>
              </div>
            </div>
          </div>

          {/* Menus */}
          {columns.map((col, idx) => (
            <nav key={idx} aria-label={col.title}>
              <h4 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {col.items?.map((item) => {
                  const href = item.url || "#"
                  const isExternal = ext(item)
                  return (
                    <li key={href + item.title}>
                      <Link
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-slate-700 hover:text-slate-900"
                      >
                        {item.title}
                      </Link>
                      {/* If your footer menus might have one-level children, show them lightly indented */}
                      {Array.isArray(item.items) && item.items.length > 0 && (
                        <ul className="mt-2 ml-3 space-y-1">
                          {item.items.map((child) => {
                            const chref = child.url || "#"
                            const cext = ext(child)
                            return (
                              <li key={chref + child.title}>
                                <Link
                                  href={chref}
                                  target={cext ? "_blank" : undefined}
                                  rel={cext ? "noopener noreferrer" : undefined}
                                  className="text-slate-600 hover:text-slate-900 text-sm"
                                >
                                  {child.title}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600">
          <p>© {year} All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms</Link>
            <Link href="/contact" className="hover:text-slate-900">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
