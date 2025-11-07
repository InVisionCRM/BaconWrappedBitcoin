"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Liquid Rise",
    description: "Content rises like liquid mercury, flowing upward with fluid motion and dissolving blur effects that mesmerize.",
    gradient: "from-cyan-600/20 to-blue-600/20",
    image: "/liquidity.png"
  },
  {
    title: "Ocean Wave",
    description: "Cards emerge from below like waves cresting on the shore, with smooth vertical scaling that feels natural.",
    gradient: "from-blue-600/20 to-indigo-600/20",
    image: "/volume.png"
  },
  {
    title: "Molten Metal",
    description: "Experience the viscosity of molten metal as cards rise and solidify into sharp, readable content.",
    gradient: "from-indigo-600/20 to-purple-600/20",
    image: "/holders.png"
  },
  {
    title: "Bubble Surface",
    description: "Content bubbles to the surface with fluid dynamics, breaking through from below with natural motion.",
    gradient: "from-purple-600/20 to-pink-600/20",
    image: "/price.png"
  },
  {
    title: "Underwater Ascent",
    description: "Cards float upward as if rising through water, with blur effects that simulate depth and fluid resistance.",
    gradient: "from-pink-600/20 to-rose-600/20",
    image: "/artcoin6.png"
  },
  {
    title: "Bacon Grease Flow",
    description: "Like bacon grease flowing in a pan, cards rise with viscous liquid motion, smooth and appetizing.",
    gradient: "from-rose-600/20 to-red-600/20",
    image: "/bacon-pile.png"
  },
  {
    title: "Fountain Spray",
    description: "Cards shoot upward like fountain water, arcing gracefully before settling into their positions.",
    gradient: "from-red-600/20 to-orange-600/20",
    image: "/baconbg.png"
  },
  {
    title: "Lava Lamp",
    description: "Experience hypnotic lava lamp motion as cards blob and flow upward with mesmerizing fluid dynamics.",
    gradient: "from-orange-600/20 to-amber-600/20",
    image: "/wrapbtc.png"
  }
]

export function Demo04Liquid({ cardCount = 5 }: { cardCount?: number }) {
  const displayCards = cards.slice(0, cardCount)
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Liquid Rise</h1>
            <p className="text-xl text-white/60">Fluid vertical animations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {displayCards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="liquid-rise"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
