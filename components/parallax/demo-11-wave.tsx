"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Wave Crash",
    description: "Cards surge forward like ocean waves, combining lateral and vertical motion with rotation for dynamic impact.",
    gradient: "from-cyan-600/20 to-blue-600/20",
    image: "/liquidity.png"
  },
  {
    title: "Tsunami Force",
    description: "Experience the power of a tsunami as cards rush onto screen with unstoppable momentum.",
    gradient: "from-blue-600/20 to-indigo-600/20",
    image: "/volume.png"
  },
  {
    title: "Ripple Effect",
    description: "Cards ride ripples across the screen, bouncing and rotating as they settle into position.",
    gradient: "from-indigo-600/20 to-violet-600/20",
    image: "/holders.png"
  },
  {
    title: "Tidal Motion",
    description: "Watch tidal forces pull cards into view with sweeping, curved trajectories.",
    gradient: "from-violet-600/20 to-purple-600/20",
    image: "/price.png"
  },
  {
    title: "Surf Break",
    description: "Cards break onto screen like waves on a beach, with natural deceleration and rotation.",
    gradient: "from-purple-600/20 to-fuchsia-600/20",
    image: "/bacon-pile.png"
  }
]

export function Demo11Wave() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Wave Crash</h1>
            <p className="text-xl text-white/60">Ocean-inspired motion</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="wave-crash"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
