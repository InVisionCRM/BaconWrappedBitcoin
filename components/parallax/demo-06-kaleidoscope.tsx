"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Kaleidoscope Vision",
    description: "Cards spiral from the corners of your vision, rotating and scaling like a kaleidoscope pattern coming into focus.",
    gradient: "from-violet-600/20 to-purple-600/20",
    image: "/artcoin1.png"
  },
  {
    title: "Mandala Formation",
    description: "Watch as cards form like mandala patterns, emerging from multiple angles to create a symmetrical entrance.",
    gradient: "from-purple-600/20 to-fuchsia-600/20",
    image: "/artcoin2.png"
  },
  {
    title: "Prism Effect",
    description: "Light through a prism inspired this multi-directional animation where cards converge from all angles.",
    gradient: "from-fuchsia-600/20 to-pink-600/20",
    image: "/artcoin3.png"
  },
  {
    title: "Radial Convergence",
    description: "Experience radial symmetry as cards rotate and converge from the periphery to the center.",
    gradient: "from-pink-600/20 to-rose-600/20",
    image: "/artcoin4.png"
  },
  {
    title: "Fractal Bloom",
    description: "Cards bloom from fractal patterns, rotating and scaling in harmonious mathematical precision.",
    gradient: "from-rose-600/20 to-red-600/20",
    image: "/artcoin5.png"
  },
  {
    title: "Symmetry Dance",
    description: "Cards perform a symmetrical dance, spinning in from all directions to create perfect kaleidoscopic harmony.",
    gradient: "from-red-600/20 to-orange-600/20",
    image: "/artcoin6.png"
  },
  {
    title: "Mirror Multiply",
    description: "Like reflections in a hall of mirrors, cards multiply and spiral inward with perfect radial symmetry.",
    gradient: "from-orange-600/20 to-amber-600/20",
    image: "/bacon-wrapped-bitcoin.jpg"
  },
  {
    title: "Psychedelic Spin",
    description: "Experience a psychedelic spin as cards rotate from multiple origins, creating mesmerizing patterns.",
    gradient: "from-amber-600/20 to-yellow-600/20",
    image: "/baconbg.png"
  }
]

export function Demo06Kaleidoscope({ cardCount = 5 }: { cardCount?: number }) {
  const displayCards = cards.slice(0, cardCount)
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Kaleidoscope</h1>
            <p className="text-xl text-white/60">Multi-directional spiral motion</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {displayCards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="kaleidoscope"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
