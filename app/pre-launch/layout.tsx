import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pre-Launch — ColibriV",
  description:
    "Join the ColibriV pre-launch waitlist. Support the future of hydrogen-powered aviation and be part of our journey to certifiable, scalable, and commercially viable hydrogen combustion technology.",
  openGraph: {
    title: "Pre-Launch — ColibriV",
    description:
      "Join the pre-launch campaign for hydrogen aviation. Early supporters help us prepare for our official crowdfunding launch.",
  },
}

export default function PreLaunchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
