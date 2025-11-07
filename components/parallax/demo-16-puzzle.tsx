"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Puzzle Assemble",
    description: "Cards fly in from different directions like puzzle pieces, each taking a unique path before clicking into place.",
    gradient: "from-blue-600/20 to-indigo-600/20",
    image: "/artcoin1.png"
  },
  {
    title: "Jigsaw Formation",
    description: "Watch as jigsaw pieces converge from chaos into organized content, each rotating uniquely.",
    gradient: "from-indigo-600/20 to-purple-600/20",
    image: "/artcoin3.png"
  },
  {
    title: "Scattered Assembly",
    description: "Cards start scattered across the void, flying together to form coherent information.",
    gradient: "from-purple-600/20 to-violet-600/20",
    image: "/artcoin5.png"
  },
  {
    title: "Piece by Piece",
    description: "Experience piece-by-piece assembly as cards arrive from alternating directions with varied rotations.",
    gradient: "from-violet-600/20 to-fuchsia-600/20",
    image: "/pigbtc.png"
  },
  {
    title: "Chaos to Order",
    description: "From chaotic motion to perfect order, cards find their place through unique trajectories.",
    gradient: "from-fuchsia-600/20 to-pink-600/20",
    image: "/bitcoincoin.png"
  }
]

export function Demo16Puzzle() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Puzzle Assemble</h1>
            <p className="text-xl text-white/60">Multi-directional convergence</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="puzzle-assemble"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
