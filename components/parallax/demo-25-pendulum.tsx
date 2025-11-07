"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Pendulum Swing",
    description: "Cards swing into position like pendulums, rotating from top anchor points with natural damping physics.",
    gradient: "from-violet-600/20 to-purple-600/20",
    image: "/pigbtc.png"
  },
  {
    title: "Clock Hand",
    description: "Watch cards rotate into place like clock hands sweeping to the correct time.",
    gradient: "from-purple-600/20 to-fuchsia-600/20",
    image: "/pig.png"
  },
  {
    title: "Swing Set",
    description: "Cards swing down from above like children on swing sets, decelerating naturally.",
    gradient: "from-fuchsia-600/20 to-pink-600/20",
    image: "/bacon-wrapped-bitcoin.jpg"
  },
  {
    title: "Hanging Sign",
    description: "Experience cards swinging into view like hanging signs settling after the wind.",
    gradient: "from-pink-600/20 to-rose-600/20",
    image: "/baconbg.png"
  },
  {
    title: "Wrecking Ball",
    description: "Cards swing with wrecking ball momentum, gradually settling from oscillation.",
    gradient: "from-rose-600/20 to-red-600/20",
    image: "/bacon-pile.png"
  }
]

export function Demo25Pendulum() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-violet-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Pendulum Swing</h1>
            <p className="text-xl text-white/60">Rotational swing physics</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="pendulum-swing"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
