"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Gravity Pull",
    description: "Cards drop from above as if affected by gravity, bouncing and settling into place with realistic physics.",
    gradient: "from-slate-600/20 to-gray-600/20",
    image: "/bacon-pile.png"
  },
  {
    title: "Meteor Impact",
    description: "Watch cards crash into position like meteors entering atmosphere, with rotation and deceleration.",
    gradient: "from-gray-600/20 to-zinc-600/20",
    image: "/pigbtc.png"
  },
  {
    title: "Apple's Fall",
    description: "Inspired by Newton's apple, cards fall with natural gravity and bounce characteristics.",
    gradient: "from-zinc-600/20 to-neutral-600/20",
    image: "/pig.png"
  },
  {
    title: "Rain Drop",
    description: "Cards descend like raindrops, accelerating and bouncing with fluid motion physics.",
    gradient: "from-neutral-600/20 to-stone-600/20",
    image: "/bitcoincoin.png"
  },
  {
    title: "Orbital Descent",
    description: "Cards enter from orbit, rotating and slowing as they settle into their final position.",
    gradient: "from-stone-600/20 to-red-600/20",
    image: "/Bitcoin-Logo.png"
  },
  {
    title: "Bacon Drop",
    description: "Like bacon sizzling into a hot pan, cards drop with gravity and bounce to a perfect landing.",
    gradient: "from-red-600/20 to-orange-600/20",
    image: "/sclean-btc.png"
  },
  {
    title: "Sky Diver",
    description: "Cards freefall from the sky, tumbling and rotating before settling with satisfying bounce physics.",
    gradient: "from-orange-600/20 to-amber-600/20",
    image: "/artcoin-bitcoin.png"
  },
  {
    title: "Weighted Fall",
    description: "Experience the weight of Bitcoin as cards plummet down with heavy, deliberate gravitational force.",
    gradient: "from-amber-600/20 to-yellow-600/20",
    image: "/wrapbtc.png"
  }
]

export function Demo07Gravity({ cardCount = 5 }: { cardCount?: number }) {
  const displayCards = cards.slice(0, cardCount)
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Gravity Pull</h1>
            <p className="text-xl text-white/60">Physics-based falling animations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {displayCards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="gravity-pull"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
