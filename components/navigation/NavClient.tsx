// components/navigation/NavClient.tsx
"use client"

import * as React from "react"
import { Link } from "@/components/navigation/Link"
import { usePathname } from "next/navigation"
import Image from "next/image" // ✅ added

// Icons for secondary menu
import {
  Mail,
  Info,
  Newspaper,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

type MenuItem = {
  title: string
  url: string
  attributes?: Record<string, any>
  items?: MenuItem[]
}

type Props = {
  primary: MenuItem[]
  secondary: MenuItem[]
}

export default function NavClient({ primary, secondary }: Props) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openSubs, setOpenSubs] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    setMobileOpen(false)
    setOpenSubs({})
  }, [pathname])

  const toggleSub = (key: string) =>
    setOpenSubs((s) => ({ ...s, [key]: !s[key] }))

  return (
    <div className="flex items-center gap-6">
      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-1">
        <DesktopMenu
          items={primary}
          ariaLabel="Main Navigation"
          variant="primary"
        />
      </nav>

      {/* Separator */}
      {secondary?.length > 0 && (
        <div className="hidden lg:block h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
      )}

      {/* Secondary menu - always buttons/icons on desktop */}
      {secondary?.length > 0 && (
        <div className="hidden lg:flex items-center gap-3">
          <DesktopSecondaryMenu items={secondary} />
        </div>
      )}

      {/* Mobile hamburger */}
      <button
        className="lg:hidden inline-flex h-10 w-10 items-center justify-center border border-gray-200 hover:bg-[#0f1f53]/5 hover:border-[#0f1f53]/20 transition-colors"
        aria-expanded={mobileOpen}
        aria-label="Toggle menu"
        onClick={() => setMobileOpen((o) => !o)}
      >
        {mobileOpen ? (
          <X className="h-5 w-5 text-gray-700" />
        ) : (
          <Menu className="h-5 w-5 text-gray-700" />
        )}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            className="lg:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out"
            aria-hidden={!mobileOpen}
          >
            {/* Drawer header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
              <Link href="/" className="inline-flex items-center gap-2">
                {/* ✅ replaced <img> with Next <Image /> */}
                <Image
                  src="/logo.svg"
                  alt="Site logo"
                  width={112}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center border border-gray-200 hover:bg-[#0f1f53]/5 hover:border-[#0f1f53]/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Drawer body */}
            <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-88px)] overflow-y-auto">
              <MobileMenu
                label="Menu"
                items={primary}
                openSubs={openSubs}
                toggleSub={toggleSub}
              />
              {secondary?.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <MobileSecondaryMenu items={secondary} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* =================== Desktop Primary Menu (hover/flyout) =================== */

function DesktopMenu({
                       items,
                       ariaLabel,
                     }: {
  items: MenuItem[]
  ariaLabel: string
  variant: "primary" | "secondary"
}) {
  return (
    <ul
      className="relative flex items-center gap-1"
      role="menubar"
      aria-label={ariaLabel}
    >
      {items?.map((item) => (
        <DesktopItem key={item.url + item.title} item={item} depth={0} />
      ))}
    </ul>
  )
}

function DesktopItem({ item }: { item: MenuItem; depth: number }) {
  const hasChildren = !!item.items?.length
  const pathname = usePathname()
  const isActive = pathname === item.url

  return (
    <li className="relative group" role="none">
      <Link
        href={item.url || "#"}
        role="menuitem"
        className={`
          inline-flex items-center gap-1.5 px-3 py-2 text-[15px] font-medium
          transition-all duration-200
          ${
          isActive
            ? "text-[#0f1f53] bg-[#0f1f53]/5"
            : "text-gray-700 hover:text-[#0f1f53] hover:bg-gray-50"
        }
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d80e0e] focus-visible:ring-offset-2
        `}
      >
        <span>{item.title}</span>
        {hasChildren && (
          <ChevronDown className="h-4 w-4 opacity-50 transition-transform group-hover:translate-y-0.5" />
        )}
      </Link>

      {/* Dropdown menu */}
      {hasChildren && (
        <div
          className={`
            absolute left-0 top-full mt-1 min-w-[240px]
            z-50 bg-white p-2 shadow-xl ring-1 ring-black/5
            opacity-0 invisible group-hover:opacity-100 group-hover:visible
            transition-all duration-200 transform translate-y-2 group-hover:translate-y-0
          `}
          role="menu"
        >
          <ul className="space-y-0.5">
            {item.items!.map((child) => (
              <li
                key={child.url + child.title}
                role="none"
                className="relative group/sub"
              >
                <Link
                  href={child.url || "#"}
                  role="menuitem"
                  className="flex items-center justify-between w-full px-3 py-2.5 text-sm text-gray-700 hover:text-[#0f1f53] hover:bg-[#0f1f53]/5 transition-colors focus:outline-none focus-visible:bg-[#0f1f53]/5"
                >
                  <span>{child.title}</span>
                  {!!child.items?.length && (
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  )}
                </Link>

                {/* Sub-dropdown */}
                {!!child.items?.length && (
                  <div
                    className={`
                      absolute top-0 left-full ml-1 min-w-[220px]
                      z-50 bg-white p-2 shadow-xl ring-1 ring-black/5
                      opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible
                      transition-all duration-200
                    `}
                    role="menu"
                  >
                    <ul className="space-y-0.5">
                      {child.items!.map((grand) => (
                        <li key={grand.url + grand.title} role="none">
                          <Link
                            href={grand.url || "#"}
                            role="menuitem"
                            className="block w-full px-3 py-2.5 text-sm text-gray-700 hover:text-[#0f1f53] hover:bg-[#0f1f53]/5 transition-colors focus:outline-none focus-visible:bg-[#0f1f53]/5"
                          >
                            {grand.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

/* =================== Desktop Secondary Menu (buttons with icons) =================== */

function DesktopSecondaryMenu({ items }: { items: MenuItem[] }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {items.map((item, index) => {
        const Icon = getIconForSecondaryItem(item.title)

        const styles = [
          {
            container:
              "group relative px-4 py-2.5 text-[#0f1f53] hover:bg-[#0f1f53]/5 hover:-translate-y-0.5 transition-all duration-300",
            icon: "h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
            focusRing: "focus-visible:ring-[#0f1f53]",
            shine: true,
          },
          {
            container:
              "group relative px-4 py-2.5 bg-gradient-to-br from-[#d80e0e] via-[#ff1f1f] to-[#d80e0e] text-white hover:shadow-xl transition-all duration-300 shadow-md hover:scale-105 overflow-hidden",
            icon: "h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6",
            focusRing: "focus-visible:ring-[#d80e0e]",
            gradient: true,
          },
          {
            container:
              "group relative px-4 py-2.5 border-2 border-[#0f1f53] bg-[#0f1f53] text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-sm overflow-hidden",
            icon: "h-4 w-4 transition-all duration-300 group-hover:scale-110",
            focusRing: "focus-visible:ring-[#0f1f53]",
            accent: true,
            pulse: true,
          },
        ]

        const style = styles[index] || styles[0]

        return (
          <Link
            key={item.url + item.title}
            href={item.url || "#"}
            className={`inline-flex items-center gap-2.5 text-sm font-semibold ${style.container} focus:outline-none focus-visible:ring-2 ${style.focusRing} focus-visible:ring-offset-2 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {style.shine && (
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                style={{ transition: "transform 0.8s, opacity 0.5s" }}
              />
            )}

            {style.gradient && (
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"
                style={{ transition: "transform 1s, opacity 0.3s" }}
              />
            )}

            {style.accent && (
              <>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#1a2d6e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 border border-[#1a2d6e] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </>
            )}

            {style.pulse && (
              <span className="absolute -inset-1 bg-[#0f1f53] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500" />
            )}

            {Icon && (
              <span className="relative z-10">
                <Icon className={style.icon} aria-hidden="true" />
              </span>
            )}
            <span className="relative z-10">{item.title}</span>
          </Link>
        )
      })}
    </>
  )
}

function getIconForSecondaryItem(title: string) {
  const lower = title.toLowerCase()
  if (lower.includes("about")) return Info
  if (lower.includes("contact")) return Mail
  if (lower.includes("press")) return Newspaper
  return null
}

/* =================== Mobile Menu (accordion) =================== */

function MobileMenu({
                      label,
                      items,
                      openSubs,
                      toggleSub,
                    }: {
  label: string
  items: MenuItem[]
  openSubs: Record<string, boolean>
  toggleSub: (k: string) => void
}) {
  return (
    <div>
      <p className="px-1 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <ul className="space-y-1">
        {items?.map((item) => (
          <MobileItem
            key={item.url + item.title}
            item={item}
            openSubs={openSubs}
            toggleSub={toggleSub}
          />
        ))}
      </ul>
    </div>
  )
}

function MobileItem({
                      item,
                      openSubs,
                      toggleSub,
                    }: {
  item: MenuItem
  openSubs: Record<string, boolean>
  toggleSub: (k: string) => void
}) {
  const hasChildren = !!item.items?.length
  const key = item.url + item.title
  const pathname = usePathname()
  const isActive = pathname === item.url

  return (
    <li>
      <div className="flex items-center gap-2">
        <Link
          href={item.url}
          className={`
            flex-1 py-2.5 px-3 text-base font-medium
            transition-colors
            ${
            isActive
              ? "text-[#0f1f53] bg-[#0f1f53]/5 font-semibold"
              : "text-gray-700 hover:bg-gray-50"
          }
          `}
        >
          {item.title}
        </Link>

        {hasChildren && (
          <button
            aria-expanded={!!openSubs[key]}
            aria-controls={key}
            onClick={() => toggleSub(key)}
            className="inline-flex h-9 w-9 items-center justify-center border border-gray-200 hover:bg-[#0f1f53]/5 hover:border-[#0f1f53]/20 transition-colors flex-shrink-0"
          >
            <span className="sr-only">Toggle {item.title}</span>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                openSubs[key] ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {hasChildren && openSubs[key] && (
        <ul
          id={key}
          className="mt-1 ml-4 pl-4 border-l-2 border-gray-100 space-y-1"
        >
          {item.items!.map((child) => (
            <MobileItem
              key={child.url + child.title}
              item={child}
              openSubs={openSubs}
              toggleSub={toggleSub}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

/* =================== Mobile Secondary Menu =================== */

function MobileSecondaryMenu({ items }: { items: MenuItem[] }) {
  return (
    <div className="space-y-3">
      <p className="px-1 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Quick Links
      </p>
      {items.map((item, index) => {
        const Icon = getIconForSecondaryItem(item.title)

        const styles = [
          {
            container:
              "bg-transparent border-2 border-gray-200 hover:border-[#0f1f53] hover:bg-[#0f1f53]/5",
            iconBg: "bg-gradient-to-br from-[#0f1f53] to-[#1a2d6e]",
            iconColor: "text-white",
            textColor: "text-[#0f1f53]",
            chevronColor: "text-[#0f1f53]",
          },
          {
            container:
              "bg-gradient-to-br from-[#d80e0e] via-[#ff1f1f] to-[#d80e0e] border-2 border-[#d80e0e] hover:shadow-xl",
            iconBg: "bg-white/20 backdrop-blur-sm ring-2 ring-white/30",
            iconColor: "text-white",
            textColor: "text-white",
            chevronColor: "text-white",
          },
          {
            container:
              "bg-[#0f1f53] border-2 border-[#0f1f53] relative overflow-hidden hover:shadow-xl",
            iconBg: "bg-gradient-to-br from-[#1a2d6e] to-[#0f1f53]",
            iconColor: "text-white",
            textColor: "text-white",
            chevronColor: "text-white",
            hasAccent: true,
            hasGlow: true,
          },
        ]

        const style = styles[index] || styles[0]

        return (
          <Link
            key={item.url + item.title}
            href={item.url || "#"}
            className={`relative flex items-center gap-4 px-5 py-4 ${style.container} active:scale-95 transition-all duration-300 hover:shadow-lg group`}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {style.hasAccent && (
              <>
                <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#0f1f53] via-[#1a2d6e] to-transparent" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#0f1f53]/10 to-transparent opacity-50" />
              </>
            )}

            {style.hasGlow && (
              <span className="absolute inset-0 bg-[#0f1f53] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
            )}

            {Icon && (
              <div
                className={`relative flex-shrink-0 h-12 w-12 ${style.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`h-5 w-5 ${style.iconColor}`} aria-hidden="true" />
              </div>
            )}
            <span className={`flex-1 text-base font-semibold ${style.textColor}`}>
              {item.title}
            </span>
            <ChevronRight
              className={`h-5 w-5 ${style.chevronColor} opacity-60 group-hover:translate-x-1 transition-transform duration-300`}
            />
          </Link>
        )
      })}
    </div>
  )
}
