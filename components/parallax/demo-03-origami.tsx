"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Origami Unfold",
    description: "Cards unfold like paper art, transforming from flat planes into dimensional content with precise geometric motion.",
    gradient: "from-amber-600/20 to-orange-600/20",
    image: "/accordian1.png"
  },
  {
    title: "Paper Craft",
    description: "Experience the delicate art of paper folding as each card opens to reveal its content with graceful precision.",
    gradient: "from-orange-600/20 to-red-600/20",
    image: "/accordian2.png"
  },
  {
    title: "Geometric Transform",
    description: "Watch geometric transformations unfold as cards expand from compressed states into full view.",
    gradient: "from-red-600/20 to-rose-600/20",
    image: "/pig.png"
  },
  {
    title: "Dimensional Bloom",
    description: "Cards bloom into existence like origami flowers, scaling and rotating to create depth and interest.",
    gradient: "from-rose-600/20 to-pink-600/20",
    image: "/pigbtc.png"
  },
  {
    title: "Folded Reality",
    description: "Reality unfolds before your eyes as compressed cards expand into readable, interactive content.",
    gradient: "from-pink-600/20 to-purple-600/20",
    image: "/bitcoincoin.png"
  },
  {
    title: "Paper Crane Flight",
    description: "Like origami cranes taking flight, cards unfold and soar into their designated positions with grace.",
    gradient: "from-purple-600/20 to-violet-600/20",
    image: "/Bitcoin-Logo.png"
  },
  {
    title: "Accordion Expansion",
    description: "Cards expand like an accordion, unfolding section by section to reveal their full content.",
    gradient: "from-violet-600/20 to-indigo-600/20",
    image: "/sclean-btc.png"
  },
  {
    title: "Origami Butterfly",
    description: "Watch cards transform like origami butterflies, opening their wings to display beautiful content.",
    gradient: "from-indigo-600/20 to-blue-600/20",
    image: "/artcoin-bitcoin.png"
  }
]

export function Demo03Origami({ cardCount = 5 }: { cardCount?: number }) {
  const displayCards = cards.slice(0, cardCount)
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-orange-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Origami Unfold</h1>
            <p className="text-xl text-white/60">Geometric paper-like animations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {displayCards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="origami-unfold"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
