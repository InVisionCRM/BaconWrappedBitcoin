"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Vortex Spin",
    description: "Cards spiral from the corners in a hypnotic vortex, rotating multiple times before settling perfectly in place.",
    gradient: "from-purple-600/20 to-pink-600/20",
    image: "/pigbtc.png"
  },
  {
    title: "Tornado Effect",
    description: "Experience tornado-like motion as cards spin wildly inward from the periphery.",
    gradient: "from-pink-600/20 to-rose-600/20",
    image: "/pig.png"
  },
  {
    title: "Whirlpool Draw",
    description: "Cards are drawn into position like objects caught in a whirlpool, spinning and converging.",
    gradient: "from-rose-600/20 to-red-600/20",
    image: "/singlepig.png"
  },
  {
    title: "Cyclone Entry",
    description: "Watch cyclonic forces pull cards into view with extreme rotation and scaling.",
    gradient: "from-red-600/20 to-orange-600/20",
    image: "/ourpig.png"
  },
  {
    title: "Spiral Galaxy",
    description: "Cards arrive on spiral galaxy arms, rotating hundreds of degrees before stabilizing.",
    gradient: "from-orange-600/20 to-amber-600/20",
    image: "/Baco.jpg"
  }
]

export function Demo13Vortex() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Vortex Spin</h1>
            <p className="text-xl text-white/60">Extreme rotation effects</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="vortex-spin"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
