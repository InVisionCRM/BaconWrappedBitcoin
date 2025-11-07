"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Spiral Inception",
    description: "Watch as cards spiral into existence from the void, rotating and scaling simultaneously to create a mesmerizing entrance that draws the eye inward.",
    gradient: "from-purple-600/20 to-blue-600/20",
    image: "/artcoin1.png"
  },
  {
    title: "Quantum Spiral",
    description: "Experience the quantum nature of digital matter as elements materialize through spiral motion, defying conventional linear animations.",
    gradient: "from-blue-600/20 to-cyan-600/20",
    image: "/artcoin2.png"
  },
  {
    title: "Galaxy Formation",
    description: "Like cosmic dust forming galaxies, these cards emerge through spiral dynamics, creating a stellar visual experience.",
    gradient: "from-cyan-600/20 to-teal-600/20",
    image: "/artcoin3.png"
  },
  {
    title: "DNA Helix Motion",
    description: "Inspired by the double helix, cards rotate and translate in harmonious spiral patterns that feel organic and natural.",
    gradient: "from-teal-600/20 to-green-600/20",
    image: "/artcoin4.png"
  },
  {
    title: "Vortex Portal",
    description: "Cards emerge from a dimensional vortex, spinning and growing as they settle into their final position on your screen.",
    gradient: "from-green-600/20 to-lime-600/20",
    image: "/artcoin5.png"
  },
  {
    title: "Cosmic Whirlpool",
    description: "Dive into a cosmic whirlpool where cards spiral inward with increasing velocity, creating hypnotic motion patterns.",
    gradient: "from-lime-600/20 to-yellow-600/20",
    image: "/artcoin6.png"
  },
  {
    title: "Bacon-Wrapped Entry",
    description: "Cards wrap into view with spiral motion, mimicking the perfect spiral of bacon-wrapped Bitcoin deliciousness.",
    gradient: "from-yellow-600/20 to-orange-600/20",
    image: "/bacon-wrapped-bitcoin.jpg"
  },
  {
    title: "Swirl Dimensions",
    description: "Experience multidimensional spiral effects as cards rotate through space-time into their final positions.",
    gradient: "from-orange-600/20 to-red-600/20",
    image: "/baconbg.png"
  }
]

export function Demo01Spiral({ cardCount = 5 }: { cardCount?: number }) {
  const displayCards = cards.slice(0, cardCount)
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Spiral In</h1>
            <p className="text-xl text-white/60">Cards that spiral into existence</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {displayCards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="spiral-in"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
