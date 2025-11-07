"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Quantum Shift",
    description: "Cards jump between quantum states, appearing at multiple positions before collapsing into their final form.",
    gradient: "from-emerald-600/20 to-teal-600/20",
    image: "/bitcoincoin.png"
  },
  {
    title: "Particle Physics",
    description: "Experience subatomic motion as cards oscillate through space, mimicking particle behavior before stabilizing.",
    gradient: "from-teal-600/20 to-cyan-600/20",
    image: "/sclean-btc.png"
  },
  {
    title: "Teleportation Effect",
    description: "Cards appear to teleport through multiple waypoints, creating an unpredictable yet controlled entrance.",
    gradient: "from-cyan-600/20 to-sky-600/20",
    image: "/Bitcoin-Logo.png"
  },
  {
    title: "Superposition State",
    description: "Like quantum superposition, cards exist in multiple states before settling into observable reality.",
    gradient: "from-sky-600/20 to-blue-600/20",
    image: "/artcoin-bitcoin.png"
  },
  {
    title: "Wave Function Collapse",
    description: "Watch the wave function collapse as cards materialize from probability clouds into definite positions.",
    gradient: "from-blue-600/20 to-indigo-600/20",
    image: "/wrapbtc.png"
  },
  {
    title: "Quantum Entanglement",
    description: "Cards demonstrate quantum entanglement, moving in synchronized mysterious ways across space and time.",
    gradient: "from-indigo-600/20 to-purple-600/20",
    image: "/cook.png"
  },
  {
    title: "Schrodinger's Card",
    description: "Like Schrodinger's cat, cards exist in uncertain states until observed, then suddenly appear.",
    gradient: "from-purple-600/20 to-fuchsia-600/20",
    image: "/bacontedtalk.png"
  },
  {
    title: "Quantum Tunneling",
    description: "Cards tunnel through probability barriers, appearing on the other side through quantum mechanics.",
    gradient: "from-fuchsia-600/20 to-pink-600/20",
    image: "/scienctists.png"
  }
]

export function Demo05Quantum({ cardCount = 5 }: { cardCount?: number }) {
  const displayCards = cards.slice(0, cardCount)
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-teal-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Quantum Shift</h1>
            <p className="text-xl text-white/60">Multi-state particle animations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {displayCards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="quantum-shift"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
