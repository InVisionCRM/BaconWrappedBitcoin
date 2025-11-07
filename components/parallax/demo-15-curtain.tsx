"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Curtain Raise",
    description: "Cards rise like theater curtains, scaling vertically from bottom to top with elegant motion.",
    gradient: "from-red-600/20 to-rose-600/20",
    image: "/curtain.jpg"
  },
  {
    title: "Stage Reveal",
    description: "Experience the drama of a stage reveal as cards unveil content from the bottom up.",
    gradient: "from-rose-600/20 to-pink-600/20",
    image: "/slaughterhouse.png"
  },
  {
    title: "Venetian Blind",
    description: "Cards expand upward like venetian blinds opening to let in light.",
    gradient: "from-pink-600/20 to-fuchsia-600/20",
    image: "/nasaquote.png"
  },
  {
    title: "Rollup Banner",
    description: "Watch cards unfurl upward like rollup banners being deployed at events.",
    gradient: "from-fuchsia-600/20 to-purple-600/20",
    image: "/scienctists.png"
  },
  {
    title: "Garage Door",
    description: "Cards open upward with the mechanical precision of an automated garage door.",
    gradient: "from-purple-600/20 to-violet-600/20",
    image: "/beforewrap.png"
  }
]

export function Demo15Curtain() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Curtain Raise</h1>
            <p className="text-xl text-white/60">Bottom-up reveal animations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="curtain-raise"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
