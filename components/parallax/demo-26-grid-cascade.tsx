"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

interface GridCard {
  title: string
  description: string
  gradient: string
  image: string
}

const cards: GridCard[] = [
  {
    title: "Grid Formation 1",
    description: "Watch multiple cards animate into perfect grid positions",
    gradient: "from-blue-600/20 to-cyan-600/20",
    image: "/artcoin1.png"
  },
  {
    title: "Grid Formation 2",
    description: "Synchronized motion creates harmonious layouts",
    gradient: "from-cyan-600/20 to-teal-600/20",
    image: "/artcoin2.png"
  },
  {
    title: "Grid Formation 3",
    description: "Multiple elements dancing together in unison",
    gradient: "from-teal-600/20 to-green-600/20",
    image: "/artcoin3.png"
  },
  {
    title: "Grid Formation 4",
    description: "From chaos to organized grid perfection",
    gradient: "from-green-600/20 to-lime-600/20",
    image: "/artcoin4.png"
  },
  {
    title: "Grid Formation 5",
    description: "Simultaneous animations settle into place",
    gradient: "from-purple-600/20 to-pink-600/20",
    image: "/artcoin5.png"
  },
  {
    title: "Grid Formation 6",
    description: "Coordinated movement creates visual symphony",
    gradient: "from-pink-600/20 to-rose-600/20",
    image: "/artcoin6.png"
  },
  {
    title: "Grid Formation 7",
    description: "Multi-card parallax in perfect harmony",
    gradient: "from-orange-600/20 to-amber-600/20",
    image: "/pigbtc.png"
  },
  {
    title: "Grid Formation 8",
    description: "Grid-based animations at their finest",
    gradient: "from-indigo-600/20 to-violet-600/20",
    image: "/bitcoincoin.png"
  }
]

interface MultiCardProps {
  cardCount?: number
}

export function Demo26GridCascade({ cardCount = 8 }: MultiCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Determine grid layout based on card count
  const getGridCols = () => {
    if (cardCount <= 2) return 2
    if (cardCount <= 4) return 2
    return 4
  }

  const gridCols = getGridCols()
  const displayCards = cards.slice(0, cardCount)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Multi-Card Grid Cascade</h1>
            <p className="text-xl text-white/60">Grid-based parallel animations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>

        {/* Multi-card grid animation section */}
        <div ref={containerRef} className="relative h-[300vh] flex items-center justify-center px-4">
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-7xl">
            <div
              className={`grid gap-4 ${
                gridCols === 2 ? 'grid-cols-2' : 'grid-cols-4'
              } min-w-0`}
            >
              {displayCards.map((card, index) => (
                <GridCardComponent
                  key={index}
                  card={card}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  totalCards={cardCount}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="h-screen" />
      </div>
    </div>
  )
}

interface GridCardComponentProps {
  card: GridCard
  index: number
  scrollYProgress: any
  totalCards: number
}

function GridCardComponent({ card, index, scrollYProgress, totalCards }: GridCardComponentProps) {
  // Create staggered animations based on index
  const delay = index * 0.05

  // Different starting positions for variety
  const getStartPosition = () => {
    const patterns = [
      { x: "-200%", y: "-100%", rotate: -180 },
      { x: "200%", y: "-100%", rotate: 180 },
      { x: "-200%", y: "100%", rotate: 180 },
      { x: "200%", y: "100%", rotate: -180 },
      { x: "0%", y: "-200%", rotate: 360 },
      { x: "0%", y: "200%", rotate: -360 },
      { x: "-300%", y: "0%", rotate: 270 },
      { x: "300%", y: "0%", rotate: -270 }
    ]
    return patterns[index % patterns.length]
  }

  const startPos = getStartPosition()

  // Animate from scattered positions to grid
  const x = useTransform(
    scrollYProgress,
    [0 + delay, 0.3 + delay, 0.7, 1],
    [startPos.x, "0%", "0%", startPos.x]
  )
  const y = useTransform(
    scrollYProgress,
    [0 + delay, 0.3 + delay, 0.7, 1],
    [startPos.y, "0%", "0%", startPos.y]
  )
  const rotate = useTransform(
    scrollYProgress,
    [0 + delay, 0.3 + delay, 0.7, 1],
    [startPos.rotate, 0, 0, -startPos.rotate]
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15 + delay, 0.3 + delay, 0.7, 0.85, 1],
    [0, 0.5, 1, 1, 0.5, 0]
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1 + delay, 0.3 + delay, 0.7, 0.9, 1],
    [0, 1, 1, 1, 1, 0]
  )

  return (
    <motion.div
      className={`relative rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden`}
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background Image */}
      {card.image && (
        <div className="absolute inset-0 opacity-30">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

      <div className="relative z-10 p-6 min-h-[250px] flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
        <p className="text-sm text-white/80 leading-relaxed mb-4">{card.description}</p>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-mono">
            grid-cascade
          </div>
          <div className="px-3 py-1 bg-orange-500/30 backdrop-blur-sm rounded-full text-white text-xs font-bold">
            #{index + 1}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl" />
    </motion.div>
  )
}
