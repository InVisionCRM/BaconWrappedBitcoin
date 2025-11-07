"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Bubble Float",
    description: "Cards float upward like bubbles rising through liquid, with gentle rotation and soft spring physics.",
    gradient: "from-sky-600/20 to-blue-600/20",
    image: "/liquidity.png"
  },
  {
    title: "Champagne Rise",
    description: "Experience the effervescence of champagne as cards bubble up from below with playful motion.",
    gradient: "from-blue-600/20 to-indigo-600/20",
    image: "/price.png"
  },
  {
    title: "Helium Balloon",
    description: "Cards rise like helium balloons, floating gently upward with soft damping and rotation.",
    gradient: "from-indigo-600/20 to-purple-600/20",
    image: "/volume.png"
  },
  {
    title: "Underwater Ascent",
    description: "Watch cards ascend through water like air bubbles, wobbling and rotating as they rise.",
    gradient: "from-purple-600/20 to-violet-600/20",
    image: "/holders.png"
  },
  {
    title: "Soap Bubble",
    description: "Delicate as soap bubbles, cards float into view with gentle, organic motion.",
    gradient: "from-violet-600/20 to-fuchsia-600/20",
    image: "/artcoin6.png"
  }
]

export function Demo22Bubble() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Bubble Float</h1>
            <p className="text-xl text-white/60">Gentle upward floating</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="bubble-float"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
