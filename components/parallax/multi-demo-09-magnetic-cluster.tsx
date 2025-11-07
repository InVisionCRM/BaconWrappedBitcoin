"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const cards = [
  { title: "Attract 1", description: "Magnetic pull begins", gradient: "from-slate-600/20 to-gray-600/20", image: "/artcoin1.png" },
  { title: "Attract 2", description: "Forces converge", gradient: "from-gray-600/20 to-zinc-600/20", image: "/artcoin2.png" },
  { title: "Attract 3", description: "Clustering together", gradient: "from-zinc-600/20 to-neutral-600/20", image: "/artcoin3.png" },
  { title: "Attract 4", description: "Gravitational dance", gradient: "from-neutral-600/20 to-stone-600/20", image: "/artcoin4.png" },
  { title: "Attract 5", description: "Orbital mechanics", gradient: "from-blue-600/20 to-indigo-600/20", image: "/artcoin5.png" },
  { title: "Attract 6", description: "Magnetic field", gradient: "from-indigo-600/20 to-violet-600/20", image: "/artcoin6.png" },
  { title: "Attract 7", description: "Force equilibrium", gradient: "from-violet-600/20 to-purple-600/20", image: "/pigbtc.png" },
  { title: "Attract 8", description: "Perfect balance", gradient: "from-purple-600/20 to-fuchsia-600/20", image: "/bitcoincoin.png" }
]

export function MultiDemo09MagneticCluster({ cardCount = 8 }: { cardCount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const getGridCols = () => cardCount <= 4 ? 2 : 4
  const displayCards = cards.slice(0, cardCount)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Magnetic Cluster</h1>
            <p className="text-xl text-white/60">Cards pulled together by invisible forces</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animation ↓</p>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[300vh] flex items-center justify-center px-4">
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-7xl">
            <div className={`grid gap-4 ${getGridCols() === 2 ? 'grid-cols-2' : 'grid-cols-4'} min-w-0`}>
              {displayCards.map((card, index) => {
                const row = Math.floor(index / getGridCols())
                const col = index % getGridCols()

                // Calculate center of grid
                const centerRow = (cardCount <= 4 ? 1 : 2) / 2
                const centerCol = getGridCols() / 2

                // Distance from center affects animation
                const distanceFromCenter = Math.sqrt(
                  Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
                )
                const delay = distanceFromCenter * 0.05

                // Start scattered, cluster to center, then snap to grid
                const x = useTransform(scrollYProgress,
                  [0, 0.15 + delay, 0.3 + delay, 0.4 + delay, 0.5, 0.7, 1],
                  [`${(col - centerCol) * 400}%`, `${(col - centerCol) * 50}%`, `${(col - centerCol) * 20}%`, "0%", "0%", "0%", `${(centerCol - col) * 400}%`]
                )

                const y = useTransform(scrollYProgress,
                  [0, 0.15 + delay, 0.3 + delay, 0.4 + delay, 0.5, 0.7, 1],
                  [`${(row - centerRow) * 400}%`, `${(row - centerRow) * 50}%`, `${(row - centerRow) * 20}%`, "0%", "0%", "0%", `${(centerRow - row) * 400}%`]
                )

                // Elastic snap effect
                const scale = useTransform(scrollYProgress,
                  [0, 0.15 + delay, 0.3 + delay, 0.38 + delay, 0.42 + delay, 0.5, 0.7, 0.85, 1],
                  [0, 0.7, 0.9, 1.1, 0.95, 1, 1, 0.7, 0]
                )

                const rotate = useTransform(scrollYProgress,
                  [0, 0.3 + delay, 0.4 + delay, 0.5, 0.7],
                  [index * 45, (index % 2 === 0 ? 15 : -15), 0, 0, 0]
                )

                const opacity = useTransform(scrollYProgress,
                  [0, 0.1 + delay, 0.5, 0.7, 0.9, 1],
                  [0, 1, 1, 1, 1, 0]
                )

                // Magnetic field glow
                const magneticGlow = useTransform(scrollYProgress,
                  [0, 0.15 + delay, 0.3 + delay, 0.4 + delay, 0.5],
                  [0, 30, 50, 20, 0]
                )

                return (
                  <motion.div
                    key={index}
                    className={`relative rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden`}
                    style={{
                      x,
                      y,
                      scale,
                      rotate,
                      opacity,
                      filter: `drop-shadow(0 0 ${magneticGlow.get()}px rgba(147, 197, 253, 0.6))`
                    }}
                  >
                    {card.image && (
                      <div className="absolute inset-0 opacity-30">
                        <Image src={card.image} alt={card.title} fill className="object-cover" />
                      </div>
                    )}

                    {/* Magnetic field effect */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(147, 197, 253, ${magneticGlow.get() / 100}), transparent 70%)`,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

                    {/* Connection lines effect (simulated) */}
                    <motion.div
                      className="absolute inset-0 border-2 border-blue-400/0"
                      style={{
                        borderColor: `rgba(96, 165, 250, ${magneticGlow.get() / 200})`
                      }}
                    />

                    <div className="relative z-10 p-6 min-h-[250px] flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed mb-4">{card.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-mono">magnetic-cluster</div>
                        <div className="px-3 py-1 bg-blue-500/30 backdrop-blur-sm rounded-full text-white text-xs font-bold">#{index + 1}</div>
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
