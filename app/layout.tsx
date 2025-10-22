import { DraftAlert } from "@/components/misc/DraftAlert"
import { HeaderNav } from "@/components/navigation/HeaderNav"
import Footer from "@/components/layout/Footer"
import type { Metadata } from "next"
import type { ReactNode } from "react"

import "@/styles/globals.css"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://colibriv.com";
const ogImage = `${siteUrl}/og/colibriv-home.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ColibriV — Hydrogen-Combustion Aviation, Engines First",
  description:
    "Mid–long range passenger aviation built around hydrogen-combustion turbofans. Engines first, aircraft next. Gaseous H₂ (350–700 bar), ultra-low NOx combustor, airport-ready storage & delivery, and certification from day one.",
  keywords: [
    "hydrogen aviation",
    "hydrogen combustion",
    "turbofan",
    "ultra-low NOx",
    "gaseous hydrogen",
    "700 bar",
    "Type-IV tanks",
    "aviation safety",
    "ARP4754A",
    "DO-160",
    "DO-178C",
    "ColibriV",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "ColibriV — Hydrogen-Combustion Aviation, Engines First",
    description:
      "Engines first; aircraft next. Hydrogen-combustion turbofans without cryogenics, engineered for certification and scale.",
    siteName: "ColibriV",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "ColibriV — Hydrogen-Combustion Aviation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ColibriV — Hydrogen-Combustion Aviation, Engines First",
    description:
      "Mid–long range passenger aircraft built around hydrogen-combustion turbofans. Certification from day one.",
    images: [ogImage],
    creator: "@colibriv", // update or remove if not applicable
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "technology",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <DraftAlert />
        <div className="mx-auto">
          <HeaderNav />
          <main className="mx-auto">{children}</main>
        </div>
        {/* Full-width footer with its own max-w */}
        <Footer />
      </body>
    </html>
  )
}
