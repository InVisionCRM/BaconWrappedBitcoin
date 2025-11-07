"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Domino Fall",
    description: "Cards fall forward like dominoes, rotating from vertical to horizontal with satisfying sequential timing.",
    gradient: "from-slate-600/20 to-gray-600/20",
    image: "/baconarm-normal.png"
  },
  {
    title: "Cascade Drop",
    description: "Experience the cascade as cards tip forward one after another, creating a rhythmic falling pattern.",
    gradient: "from-gray-600/20 to-zinc-600/20",
    image: "/baconarm-robot.png"
  },
  {
    title: "Tipping Point",
    description: "Watch cards reach their tipping point and fall into view with 3D rotation effects.",
    gradient: "from-zinc-600/20 to-neutral-600/20",
    image: "/pigright.png"
  },
  {
    title: "Chain Reaction",
    description: "A chain reaction of falling cards creates mesmerizing sequential motion.",
    gradient: "from-neutral-600/20 to-stone-600/20",
    image: "/pigleft.png"
  },
  {
    title: "Flip Forward",
    description: "Cards flip forward from above, rotating around their bottom edge to reveal content.",
    gradient: "from-stone-600/20 to-slate-600/20",
    image: "/ourpig.png"
  }
]

export function Demo19Domino() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Domino Fall</h1>
            <p className="text-xl text-white/60">Sequential tipping animations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="domino-fall"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
