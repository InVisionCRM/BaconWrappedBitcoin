"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Shatter Reform",
    description: "Cards appear to shatter into view, flying in from scattered positions while spinning and clearing from blur.",
    gradient: "from-orange-600/20 to-red-600/20",
    image: "/artcoin1.png"
  },
  {
    title: "Glass Assembly",
    description: "Like shattered glass reforming, cards piece themselves together from fragmented states.",
    gradient: "from-red-600/20 to-rose-600/20",
    image: "/artcoin2.png"
  },
  {
    title: "Crystal Formation",
    description: "Watch crystals form as scattered pieces converge, rotating and clearing into solid structures.",
    gradient: "from-rose-600/20 to-pink-600/20",
    image: "/artcoin3.png"
  },
  {
    title: "Fragment Reunion",
    description: "Fragments reunite from chaos, each spinning and sliding into perfect alignment.",
    gradient: "from-pink-600/20 to-fuchsia-600/20",
    image: "/artcoin4.png"
  },
  {
    title: "Broken to Whole",
    description: "Experience transformation from broken fragments to whole cards through rotation and convergence.",
    gradient: "from-fuchsia-600/20 to-purple-600/20",
    image: "/artcoin5.png"
  }
]

export function Demo21Shatter() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-orange-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Shatter Reform</h1>
            <p className="text-xl text-white/60">Fragment to whole transitions</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="shatter-reform"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
