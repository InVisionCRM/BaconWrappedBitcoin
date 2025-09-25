"use client"

import { FloatingNav } from "@/components/ui/floating-navbar"

export function Navigation() {
  const navItems = [
    { name: "How it works", link: "#how-it-works" },
    { name: "Community", link: "#community" },
    { name: "FAQ", link: "#faq" },
  ]

  return <FloatingNav navItems={navItems} className="backdrop-blur-xl bg-white/10 border-white/25" />
}
