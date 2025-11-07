"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Carousel Rotate",
    description: "Cards spin into view like a 3D carousel, rotating around the Y-axis while sliding from the side.",
    gradient: "from-cyan-600/20 to-teal-600/20",
    image: "/bitcoincoin.png"
  },
  {
    title: "Spinning Entrance",
    description: "Experience spinning entrances as cards rotate 180 degrees while gliding into position.",
    gradient: "from-teal-600/20 to-emerald-600/20",
    image: "/Bitcoin-Logo.png"
  },
  {
    title: "3D Flip Slide",
    description: "Cards perform 3D flips while sliding, creating a carousel-like reveal effect.",
    gradient: "from-emerald-600/20 to-green-600/20",
    image: "/sclean-btc.png"
  },
  {
    title: "Revolving Door",
    description: "Watch cards enter through revolving doors, rotating on their vertical axis.",
    gradient: "from-green-600/20 to-lime-600/20",
    image: "/artcoin-bitcoin.png"
  },
  {
    title: "Lazy Susan",
    description: "Cards spin into view like a lazy susan rotating to present content.",
    gradient: "from-lime-600/20 to-yellow-600/20",
    image: "/wrapbtc.png"
  }
]

export function Demo24Carousel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Carousel Rotate</h1>
            <p className="text-xl text-white/60">3D Y-axis rotations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="carousel-rotate"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
