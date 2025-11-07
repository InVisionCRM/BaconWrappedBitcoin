"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Eclipse Reveal",
    description: "Content reveals from darkness like a solar eclipse, expanding from center outward in perfect circular motion.",
    gradient: "from-slate-600/20 to-zinc-600/20",
    image: "/artcoin-bitcoin.png"
  },
  {
    title: "Lunar Emergence",
    description: "Watch as cards emerge from shadow like the moon appearing from eclipse, growing and clearing.",
    gradient: "from-zinc-600/20 to-gray-600/20",
    image: "/Bitcoin-Logo.png"
  },
  {
    title: "Corona Expansion",
    description: "Like the sun's corona during eclipse, cards expand outward from a brilliant center point.",
    gradient: "from-gray-600/20 to-stone-600/20",
    image: "/bitcoincoin.png"
  },
  {
    title: "Totality Break",
    description: "Experience the moment of totality breaking as cards burst into view with circular reveals.",
    gradient: "from-stone-600/20 to-neutral-600/20",
    image: "/sclean-btc.png"
  },
  {
    title: "Shadow Dance",
    description: "Cards dance out from shadow coverage, revealing content through expanding circular masks.",
    gradient: "from-neutral-600/20 to-slate-600/20",
    image: "/wrapbtc.png"
  }
]

export function Demo12Eclipse() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Eclipse Reveal</h1>
            <p className="text-xl text-white/60">Circular reveal animations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="eclipse-reveal"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
