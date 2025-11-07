"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Bounce Settle",
    description: "Cards drop and bounce with playful spring physics, overshooting before settling into their final position.",
    gradient: "from-green-600/20 to-emerald-600/20",
    image: "/bacon-wrapped-bitcoin.jpg"
  },
  {
    title: "Basketball Drop",
    description: "Watch cards bounce like basketballs, with decreasing amplitude until they come to rest.",
    gradient: "from-emerald-600/20 to-teal-600/20",
    image: "/baconbg.png"
  },
  {
    title: "Rubber Ball",
    description: "Experience rubber ball physics as cards bounce energetically before stabilizing.",
    gradient: "from-teal-600/20 to-cyan-600/20",
    image: "/bacon-pile.png"
  },
  {
    title: "Spring Loaded",
    description: "Cards compress and expand like springs, bouncing vertically with satisfying elasticity.",
    gradient: "from-cyan-600/20 to-sky-600/20",
    image: "/baconstrip.png"
  },
  {
    title: "Pogo Stick",
    description: "Multiple bounces create a pogo stick effect as cards rhythmically settle into place.",
    gradient: "from-sky-600/20 to-blue-600/20",
    image: "/baconhand-red.png"
  }
]

export function Demo14Bounce() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-green-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Bounce Settle</h1>
            <p className="text-xl text-white/60">Playful spring physics</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="bounce-settle"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
