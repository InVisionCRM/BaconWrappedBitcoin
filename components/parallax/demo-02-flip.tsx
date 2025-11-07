"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Flip Cascade",
    description: "Experience the elegant cascade of cards flipping into view, each revealing content with perfect timing and smooth 3D rotation.",
    gradient: "from-rose-600/20 to-pink-600/20",
    image: "/bacon-pile.png"
  },
  {
    title: "Card Deck Reveal",
    description: "Like dealing cards from a deck, each element flips and slides into position with professional precision.",
    gradient: "from-pink-600/20 to-fuchsia-600/20",
    image: "/bacon-wrapped-bitcoin.jpg"
  },
  {
    title: "Domino Effect",
    description: "Watch the domino effect in action as cards flip sequentially, creating a rhythmic visual cascade.",
    gradient: "from-fuchsia-600/20 to-purple-600/20",
    image: "/baconbg.png"
  },
  {
    title: "Mirror Reflection",
    description: "Cards emerge as if flipping through a mirror dimension, bringing depth and dimension to your content.",
    gradient: "from-purple-600/20 to-violet-600/20",
    image: "/artcoin1.png"
  },
  {
    title: "Page Turner",
    description: "Experience the satisfaction of turning pages as cards flip into view with smooth, natural motion.",
    gradient: "from-violet-600/20 to-indigo-600/20",
    image: "/artcoin2.png"
  },
  {
    title: "Bitcoin Flip",
    description: "Cards flip like Bitcoin coins spinning through the air, revealing their value as they land perfectly in view.",
    gradient: "from-indigo-600/20 to-blue-600/20",
    image: "/artcoin3.png"
  },
  {
    title: "Pancake Flipper",
    description: "Just like flipping bacon pancakes, cards rotate with culinary precision to reveal their delicious content.",
    gradient: "from-blue-600/20 to-cyan-600/20",
    image: "/artcoin4.png"
  },
  {
    title: "Revolving Door",
    description: "Cards rotate into view like a revolving door, smoothly transitioning from hidden to revealed state.",
    gradient: "from-cyan-600/20 to-teal-600/20",
    image: "/artcoin5.png"
  }
]

export function Demo02Flip({ cardCount = 5 }: { cardCount?: number }) {
  const displayCards = cards.slice(0, cardCount)
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Flip Cascade</h1>
            <p className="text-xl text-white/60">3D card flips in sequence</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {displayCards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="flip-cascade"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
