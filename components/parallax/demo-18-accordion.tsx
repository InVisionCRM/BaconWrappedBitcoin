"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Accordion Expand",
    description: "Cards expand vertically like accordion panels, growing smoothly from compressed to full height.",
    gradient: "from-teal-600/20 to-cyan-600/20",
    image: "/accordian1.png"
  },
  {
    title: "Vertical Unfold",
    description: "Watch vertical unfolding as cards stretch from thin lines into readable content blocks.",
    gradient: "from-cyan-600/20 to-sky-600/20",
    image: "/accordian2.png"
  },
  {
    title: "Panel Deployment",
    description: "Panels deploy downward with smooth scaling, like dropdown menus coming into view.",
    gradient: "from-sky-600/20 to-blue-600/20",
    image: "/liquidity.png"
  },
  {
    title: "Compress Release",
    description: "Cards release from compressed states, expanding to full size with elegant easing.",
    gradient: "from-blue-600/20 to-indigo-600/20",
    image: "/volume.png"
  },
  {
    title: "Stretch Effect",
    description: "Experience the stretch effect as cards grow vertically while maintaining width.",
    gradient: "from-indigo-600/20 to-violet-600/20",
    image: "/holders.png"
  }
]

export function Demo18Accordion() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-teal-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Accordion Expand</h1>
            <p className="text-xl text-white/60">Vertical scaling animations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="accordion-expand"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
