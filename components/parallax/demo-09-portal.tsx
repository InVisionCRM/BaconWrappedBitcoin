"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Portal Emerge",
    description: "Cards materialize from interdimensional portals, rotating and clearing from blur as they enter our reality.",
    gradient: "from-indigo-600/20 to-purple-600/20",
    image: "/artcoin4.png"
  },
  {
    title: "Wormhole Transit",
    description: "Experience wormhole travel as cards emerge from rotating spacetime distortions.",
    gradient: "from-purple-600/20 to-fuchsia-600/20",
    image: "/artcoin5.png"
  },
  {
    title: "Dimensional Rift",
    description: "Cards tear through dimensional rifts, spinning and solidifying as they cross into our plane.",
    gradient: "from-fuchsia-600/20 to-pink-600/20",
    image: "/artcoin6.png"
  },
  {
    title: "Stargate Arrival",
    description: "Like stepping through a stargate, cards arrive with rotation and blur clearing effects.",
    gradient: "from-pink-600/20 to-rose-600/20",
    image: "/bacon-wrapped-bitcoin.jpg"
  },
  {
    title: "Vortex Gateway",
    description: "Cards exit spinning vortex gateways, stabilizing as they enter normal space.",
    gradient: "from-rose-600/20 to-red-600/20",
    image: "/baconbg.png"
  },
  {
    title: "Bacon Portal",
    description: "Watch as cards emerge from a bacon-wrapped portal, sizzling into reality with delicious rotation.",
    gradient: "from-red-600/20 to-orange-600/20",
    image: "/bacon-pile.png"
  },
  {
    title: "Temporal Gateway",
    description: "Cards slip through temporal gateways, arriving from the past or future with mysterious blur effects.",
    gradient: "from-orange-600/20 to-amber-600/20",
    image: "/pigbtc.png"
  },
  {
    title: "Reality Breach",
    description: "Experience reality breaches as cards tear through the fabric of space to materialize before you.",
    gradient: "from-amber-600/20 to-yellow-600/20",
    image: "/pig.png"
  }
]

export function Demo09Portal({ cardCount = 5 }: { cardCount?: number }) {
  const displayCards = cards.slice(0, cardCount)
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Portal Emerge</h1>
            <p className="text-xl text-white/60">Interdimensional entrance effects</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {displayCards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="portal-emerge"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
