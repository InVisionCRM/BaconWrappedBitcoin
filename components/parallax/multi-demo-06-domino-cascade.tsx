"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const cards = [
  { title: "Domino 1", description: "First to fall", gradient: "from-red-600/20 to-orange-600/20", image: "/artcoin1.png" },
  { title: "Domino 2", description: "Chain reaction begins", gradient: "from-orange-600/20 to-amber-600/20", image: "/artcoin2.png" },
  { title: "Domino 3", description: "Tipping forward", gradient: "from-amber-600/20 to-yellow-600/20", image: "/artcoin3.png" },
  { title: "Domino 4", description: "Momentum builds", gradient: "from-yellow-600/20 to-lime-600/20", image: "/artcoin4.png" },
  { title: "Domino 5", description: "Cascading motion", gradient: "from-lime-600/20 to-green-600/20", image: "/artcoin5.png" },
  { title: "Domino 6", description: "Sequential fall", gradient: "from-green-600/20 to-emerald-600/20", image: "/artcoin6.png" },
  { title: "Domino 7", description: "Perfect timing", gradient: "from-emerald-600/20 to-teal-600/20", image: "/pigbtc.png" },
  { title: "Domino 8", description: "Final piece", gradient: "from-teal-600/20 to-cyan-600/20", image: "/bitcoincoin.png" }
]

export function MultiDemo06DominoCascade({ cardCount = 8 }: { cardCount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const getGridCols = () => cardCount <= 4 ? 2 : 4
  const displayCards = cards.slice(0, cardCount)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Domino Cascade</h1>
            <p className="text-xl text-white/60">Sequential tipping chain reaction</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animation ↓</p>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[300vh] flex items-center justify-center px-4">
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-7xl">
            <div className={`grid gap-4 ${getGridCols() === 2 ? 'grid-cols-2' : 'grid-cols-4'} min-w-0`}>
              {displayCards.map((card, index) => {
                const delay = index * 0.08 // Sequential delay for domino effect

                const rotateX = useTransform(scrollYProgress,
                  [0 + delay, 0.15 + delay, 0.3 + delay, 0.5, 0.7, 1],
                  [-90, 0, 15, 0, 0, 90]
                )
                const y = useTransform(scrollYProgress,
                  [0 + delay, 0.15 + delay, 0.3 + delay, 0.5, 0.7, 1],
                  ["-120%", "-20%", "0%", "0%", "0%", "120%"]
                )
                const scale = useTransform(scrollYProgress,
                  [0, 0.1 + delay, 0.3 + delay, 0.5, 0.7, 0.85, 1],
                  [0, 0.7, 1, 1, 1, 0.7, 0]
                )
                const opacity = useTransform(scrollYProgress,
                  [0, 0.05 + delay, 0.3 + delay, 0.7, 0.9, 1],
                  [0, 1, 1, 1, 1, 0]
                )

                // Shadow effect that grows during the "tip"
                const shadowBlur = useTransform(scrollYProgress,
                  [0 + delay, 0.15 + delay, 0.3 + delay, 0.5],
                  [0, 40, 0, 0]
                )

                return (
                  <motion.div
                    key={index}
                    className={`relative rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden`}
                    style={{
                      rotateX,
                      y,
                      scale,
                      opacity,
                      transformOrigin: "bottom",
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                      filter: `drop-shadow(0 0 ${shadowBlur}px rgba(255, 100, 0, 0.5))`
                    }}
                  >
                    {card.image && (
                      <div className="absolute inset-0 opacity-30">
                        <Image src={card.image} alt={card.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

                    {/* Animated glow that pulses during tip */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent"
                      style={{
                        opacity: useTransform(scrollYProgress,
                          [0 + delay, 0.15 + delay, 0.3 + delay],
                          [0, 0.8, 0]
                        )
                      }}
                    />

                    <div className="relative z-10 p-6 min-h-[250px] flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed mb-4">{card.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-mono">domino-cascade</div>
                        <div className="px-3 py-1 bg-orange-500/30 backdrop-blur-sm rounded-full text-white text-xs font-bold">#{index + 1}</div>
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
