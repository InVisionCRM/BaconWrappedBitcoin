"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Fractal Expand",
    description: "Cards grow from infinitesimal points like fractals, rotating and morphing from circles to rectangles.",
    gradient: "from-emerald-600/20 to-green-600/20",
    image: "/bitcoincoin.png"
  },
  {
    title: "Mandelbrot Bloom",
    description: "Experience the beauty of the Mandelbrot set as cards expand from recursive patterns.",
    gradient: "from-green-600/20 to-lime-600/20",
    image: "/Bitcoin-Logo.png"
  },
  {
    title: "Recursive Growth",
    description: "Watch recursive mathematical patterns unfold as cards scale and rotate into existence.",
    gradient: "from-lime-600/20 to-yellow-600/20",
    image: "/sclean-btc.png"
  },
  {
    title: "Infinite Zoom",
    description: "Cards emerge from an infinite zoom effect, growing and stabilizing with mathematical precision.",
    gradient: "from-yellow-600/20 to-amber-600/20",
    image: "/artcoin-bitcoin.png"
  },
  {
    title: "Self-Similar Scaling",
    description: "Self-similar patterns expand outward as cards transform from circular to rectangular forms.",
    gradient: "from-amber-600/20 to-orange-600/20",
    image: "/wrapbtc.png"
  },
  {
    title: "Koch Snowflake",
    description: "Like the Koch snowflake, cards expand with recursive detail, growing from tiny points to full size.",
    gradient: "from-orange-600/20 to-red-600/20",
    image: "/cook.png"
  },
  {
    title: "Sierpinski Growth",
    description: "Inspired by Sierpinski triangles, cards recursively expand with mathematical beauty and precision.",
    gradient: "from-red-600/20 to-rose-600/20",
    image: "/bacontedtalk.png"
  },
  {
    title: "Julia Set Bloom",
    description: "Cards bloom from Julia set patterns, spiraling outward with complex mathematical elegance.",
    gradient: "from-rose-600/20 to-pink-600/20",
    image: "/scienctists.png"
  }
]

export function Demo10Fractal({ cardCount = 5 }: { cardCount?: number }) {
  const displayCards = cards.slice(0, cardCount)
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Fractal Expand</h1>
            <p className="text-xl text-white/60">Mathematical growth patterns</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {displayCards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="fractal-expand"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
