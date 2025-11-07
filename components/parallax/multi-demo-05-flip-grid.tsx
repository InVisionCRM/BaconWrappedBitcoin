"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const cards = [
  { title: "Flip 1", description: "3D rotation magic", gradient: "from-emerald-600/20 to-green-600/20", image: "/artcoin1.png" },
  { title: "Flip 2", description: "Synchronized flipping", gradient: "from-green-600/20 to-lime-600/20", image: "/artcoin2.png" },
  { title: "Flip 3", description: "Perfect choreography", gradient: "from-lime-600/20 to-yellow-600/20", image: "/artcoin3.png" },
  { title: "Flip 4", description: "Card acrobatics", gradient: "from-yellow-600/20 to-amber-600/20", image: "/artcoin4.png" },
  { title: "Flip 5", description: "Coordinated motion", gradient: "from-teal-600/20 to-emerald-600/20", image: "/artcoin5.png" },
  { title: "Flip 6", description: "Tumbling together", gradient: "from-green-600/20 to-teal-600/20", image: "/artcoin6.png" },
  { title: "Flip 7", description: "Aerial dance", gradient: "from-emerald-600/20 to-cyan-600/20", image: "/pigbtc.png" },
  { title: "Flip 8", description: "Landing in place", gradient: "from-cyan-600/20 to-emerald-600/20", image: "/bitcoincoin.png" }
]

export function MultiDemo05FlipGrid({ cardCount = 8 }: { cardCount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const getGridCols = () => cardCount <= 4 ? 2 : 4
  const displayCards = cards.slice(0, cardCount)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Flip Grid</h1>
            <p className="text-xl text-white/60">Synchronized 3D card flips</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animation ↓</p>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[300vh] flex items-center justify-center px-4">
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-7xl">
            <div className={`grid gap-4 ${getGridCols() === 2 ? 'grid-cols-2' : 'grid-cols-4'} min-w-0`}>
              {displayCards.map((card, index) => {
                const row = Math.floor(index / getGridCols())
                const col = index % getGridCols()
                const delay = (row + col) * 0.04

                const rotateY = useTransform(scrollYProgress,
                  [0 + delay, 0.3 + delay, 0.5 + delay, 0.7, 1],
                  [180, 360, 0, 0, -180]
                )
                const rotateX = useTransform(scrollYProgress,
                  [0 + delay, 0.3 + delay, 0.5 + delay, 0.7, 1],
                  [-90, 0, 0, 0, 90]
                )
                const y = useTransform(scrollYProgress,
                  [0 + delay, 0.3 + delay, 0.5 + delay, 0.7, 1],
                  ["-100%", "0%", "0%", "0%", "100%"]
                )
                const scale = useTransform(scrollYProgress, [0, 0.15 + delay, 0.5 + delay, 0.7, 0.85, 1], [0, 0.8, 1, 1, 0.8, 0])
                const opacity = useTransform(scrollYProgress, [0, 0.1 + delay, 0.5 + delay, 0.7, 0.9, 1], [0, 1, 1, 1, 1, 0])

                return (
                  <motion.div
                    key={index}
                    className={`relative rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden`}
                    style={{
                      rotateY,
                      rotateX,
                      y,
                      scale,
                      opacity,
                      perspective: "1000px",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {card.image && (
                      <div className="absolute inset-0 opacity-30">
                        <Image src={card.image} alt={card.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    <div className="relative z-10 p-6 min-h-[250px] flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed mb-4">{card.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-mono">flip-grid</div>
                        <div className="px-3 py-1 bg-emerald-500/30 backdrop-blur-sm rounded-full text-white text-xs font-bold">#{index + 1}</div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="h-screen" />
      </div>
    </div>
  )
}
