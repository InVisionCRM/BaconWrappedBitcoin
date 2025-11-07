"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Ribbon Unfurl",
    description: "Cards unfurl from the left edge like ribbons, combining horizontal scaling with 3D rotation for elegant reveals.",
    gradient: "from-pink-600/20 to-rose-600/20",
    image: "/accordian1.png"
  },
  {
    title: "Gift Unwrap",
    description: "Experience the joy of unwrapping as cards reveal themselves with ribbon-like horizontal motion.",
    gradient: "from-rose-600/20 to-red-600/20",
    image: "/accordian2.png"
  },
  {
    title: "Scroll Unroll",
    description: "Cards unroll from the left like ancient scrolls, revealing content progressively.",
    gradient: "from-red-600/20 to-orange-600/20",
    image: "/bacon-black-logo.png"
  },
  {
    title: "Banner Deploy",
    description: "Watch banners deploy from left to right, unfurling with smooth 3D perspective effects.",
    gradient: "from-orange-600/20 to-amber-600/20",
    image: "/logo-cartoon.png"
  },
  {
    title: "Tape Measure",
    description: "Cards extend like measuring tape, snapping out from the left with spring-loaded energy.",
    gradient: "from-amber-600/20 to-yellow-600/20",
    image: "/placeholder-logo.png"
  }
]

export function Demo17Ribbon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-pink-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Ribbon Unfurl</h1>
            <p className="text-xl text-white/60">Horizontal 3D unfurling</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="ribbon-unfurl"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
