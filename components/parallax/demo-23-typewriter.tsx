"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Typewriter Build",
    description: "Cards build from left to right like text being typed, expanding horizontally with mechanical precision.",
    gradient: "from-amber-600/20 to-yellow-600/20",
    image: "/cook.png"
  },
  {
    title: "Text Reveal",
    description: "Watch content reveal character by character as cards expand from zero width to full size.",
    gradient: "from-yellow-600/20 to-lime-600/20",
    image: "/bacontedtalk.png"
  },
  {
    title: "Printing Press",
    description: "Cards appear as if stamped by a printing press, building from left edge outward.",
    gradient: "from-lime-600/20 to-green-600/20",
    image: "/scienctists.png"
  },
  {
    title: "Line by Line",
    description: "Experience line-by-line construction as cards extend horizontally with typing rhythm.",
    gradient: "from-green-600/20 to-emerald-600/20",
    image: "/nasaquote.png"
  },
  {
    title: "Terminal Output",
    description: "Cards appear like terminal output, building progressively from left to right.",
    gradient: "from-emerald-600/20 to-teal-600/20",
    image: "/beforewrap.png"
  }
]

export function Demo23Typewriter() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-amber-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Typewriter Build</h1>
            <p className="text-xl text-white/60">Horizontal text-like reveals</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="typewriter-build"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
