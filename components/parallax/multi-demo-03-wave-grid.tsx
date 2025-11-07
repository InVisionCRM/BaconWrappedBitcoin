"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const cards = [
  { title: "Wave 1", description: "Rippling motion begins", gradient: "from-cyan-600/20 to-blue-600/20", image: "/artcoin1.png" },
  { title: "Wave 2", description: "Flowing together", gradient: "from-blue-600/20 to-indigo-600/20", image: "/artcoin2.png" },
  { title: "Wave 3", description: "Synchronized waves", gradient: "from-indigo-600/20 to-violet-600/20", image: "/artcoin3.png" },
  { title: "Wave 4", description: "Harmonic resonance", gradient: "from-violet-600/20 to-purple-600/20", image: "/artcoin4.png" },
  { title: "Wave 5", description: "Ocean-like flow", gradient: "from-teal-600/20 to-cyan-600/20", image: "/artcoin5.png" },
  { title: "Wave 6", description: "Cascading rhythm", gradient: "from-sky-600/20 to-blue-600/20", image: "/artcoin6.png" },
  { title: "Wave 7", description: "Liquid motion", gradient: "from-blue-600/20 to-cyan-600/20", image: "/pigbtc.png" },
  { title: "Wave 8", description: "Perfect stillness", gradient: "from-cyan-600/20 to-teal-600/20", image: "/bitcoincoin.png" }
]

export function MultiDemo03WaveGrid({ cardCount = 8 }: { cardCount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const getGridCols = () => cardCount <= 4 ? 2 : 4
  const displayCards = cards.slice(0, cardCount)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Wave Grid</h1>
            <p className="text-xl text-white/60">Wave-like motion settles into grid</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animation ↓</p>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[300vh] flex items-center justify-center px-4">
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-7xl">
            <div className={`grid gap-4 ${getGridCols() === 2 ? 'grid-cols-2' : 'grid-cols-4'} min-w-0`}>
              {displayCards.map((card, index) => {
                const row = Math.floor(index / getGridCols())
                const col = index % getGridCols()
                const delay = (row + col) * 0.05

                const y = useTransform(scrollYProgress,
                  [0 + delay, 0.2 + delay, 0.35 + delay, 0.5 + delay, 0.7, 1],
                  ["-150%", "20%", "-10%", "0%", "0%", "150%"]
                )
                const x = useTransform(scrollYProgress,
                  [0 + delay, 0.35 + delay, 0.5 + delay, 0.7, 1],
                  [`${(index % 2 === 0 ? -50 : 50)}%`, "0%", "0%", "0%", `${(index % 2 === 0 ? 50 : -50)}%`]
                )
                const scale = useTransform(scrollYProgress, [0, 0.15 + delay, 0.5 + delay, 0.7, 0.85, 1], [0, 0.8, 1, 1, 0.8, 0])
                const opacity = useTransform(scrollYProgress, [0, 0.1 + delay, 0.5 + delay, 0.7, 0.9, 1], [0, 1, 1, 1, 1, 0])

                return (
                  <motion.div
                    key={index}
                    className={`relative rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden`}
                    style={{ x, y, scale, opacity }}
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
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-mono">wave-grid</div>
                        <div className="px-3 py-1 bg-cyan-500/30 backdrop-blur-sm rounded-full text-white text-xs font-bold">#{index + 1}</div>
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
