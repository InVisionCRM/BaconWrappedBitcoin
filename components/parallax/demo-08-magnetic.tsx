"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Magnetic Snap",
    description: "Cards are pulled into position as if by powerful magnets, snapping into place with spring dynamics.",
    gradient: "from-red-600/20 to-orange-600/20",
    image: "/beforewrap.png"
  },
  {
    title: "Iron Attraction",
    description: "Experience electromagnetic force as cards accelerate toward their destination with increasing velocity.",
    gradient: "from-orange-600/20 to-amber-600/20",
    image: "/cook.png"
  },
  {
    title: "Polar Force",
    description: "Opposite poles attract as cards zip across the screen, locking into position with satisfying precision.",
    gradient: "from-amber-600/20 to-yellow-600/20",
    image: "/bacontedtalk.png"
  },
  {
    title: "Flux Field",
    description: "Cards navigate invisible magnetic flux fields, arriving at their destination through curved paths.",
    gradient: "from-yellow-600/20 to-lime-600/20",
    image: "/scienctists.png"
  },
  {
    title: "Rapid Convergence",
    description: "Watch rapid magnetic convergence as cards snap into alignment with high-energy spring motion.",
    gradient: "from-lime-600/20 to-green-600/20",
    image: "/nasaquote.png"
  },
  {
    title: "Electromagnetic Pull",
    description: "Cards zip across space like iron filings to a magnet, snapping perfectly into alignment.",
    gradient: "from-green-600/20 to-emerald-600/20",
    image: "/artcoin1.png"
  },
  {
    title: "Attraction Force",
    description: "Feel the powerful attraction as cards rush toward their destination with unstoppable momentum.",
    gradient: "from-emerald-600/20 to-teal-600/20",
    image: "/artcoin2.png"
  },
  {
    title: "Spring Loaded",
    description: "Like compressed springs releasing, cards bounce into place with energetic magnetic snapping.",
    gradient: "from-teal-600/20 to-cyan-600/20",
    image: "/artcoin3.png"
  }
]

export function Demo08Magnetic({ cardCount = 5 }: { cardCount?: number }) {
  const displayCards = cards.slice(0, cardCount)
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Magnetic Snap</h1>
            <p className="text-xl text-white/60">High-energy spring animations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {displayCards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="magnetic-snap"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
