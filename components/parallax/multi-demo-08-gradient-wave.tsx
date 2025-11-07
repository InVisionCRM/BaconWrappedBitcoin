"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const cards = [
  { title: "Wave 1", description: "Gradient flows begin", gradient: "from-red-500/30 to-orange-500/30", image: "/artcoin1.png" },
  { title: "Wave 2", description: "Color transitions", gradient: "from-orange-500/30 to-yellow-500/30", image: "/artcoin2.png" },
  { title: "Wave 3", description: "Spectrum shift", gradient: "from-yellow-500/30 to-lime-500/30", image: "/artcoin3.png" },
  { title: "Wave 4", description: "Rainbow cascade", gradient: "from-lime-500/30 to-green-500/30", image: "/artcoin4.png" },
  { title: "Wave 5", description: "Chromatic harmony", gradient: "from-green-500/30 to-cyan-500/30", image: "/artcoin5.png" },
  { title: "Wave 6", description: "Color symphony", gradient: "from-cyan-500/30 to-blue-500/30", image: "/artcoin6.png" },
  { title: "Wave 7", description: "Hue transition", gradient: "from-blue-500/30 to-violet-500/30", image: "/pigbtc.png" },
  { title: "Wave 8", description: "Final gradient", gradient: "from-violet-500/30 to-purple-500/30", image: "/bitcoincoin.png" }
]

export function MultiDemo08GradientWave({ cardCount = 8 }: { cardCount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const getGridCols = () => cardCount <= 4 ? 2 : 4
  const displayCards = cards.slice(0, cardCount)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-pink-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Gradient Wave</h1>
            <p className="text-xl text-white/60">Flowing color transitions across the grid</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animation ↓</p>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[300vh] flex items-center justify-center px-4">
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-7xl">
            <div className={`grid gap-4 ${getGridCols() === 2 ? 'grid-cols-2' : 'grid-cols-4'} min-w-0`}>
              {displayCards.map((card, index) => {
                const row = Math.floor(index / getGridCols())
                const col = index % getGridCols()
                const waveDelay = (row + col) * 0.06

                // Wave motion - up and down
                const y = useTransform(scrollYProgress,
                  [0, 0.1 + waveDelay, 0.25 + waveDelay, 0.35 + waveDelay, 0.45 + waveDelay, 0.5, 0.7, 1],
                  ["-150%", "15%", "-5%", "5%", "0%", "0%", "0%", "150%"]
                )

                const scale = useTransform(scrollYProgress,
                  [0, 0.15 + waveDelay, 0.45 + waveDelay, 0.5, 0.7, 0.85, 1],
                  [0, 0.9, 1, 1, 1, 0.9, 0]
                )

                const opacity = useTransform(scrollYProgress,
                  [0, 0.1 + waveDelay, 0.5, 0.7, 0.9, 1],
                  [0, 1, 1, 1, 1, 0]
                )

                // Animated gradient rotation
                const gradientRotation = useTransform(scrollYProgress,
                  [0, 0.25 + waveDelay, 0.5, 0.7],
                  [0, 180, 360, 360]
                )

                // Color intensity pulsing
                const colorIntensity = useTransform(scrollYProgress,
                  [0, 0.15 + waveDelay, 0.3 + waveDelay, 0.45 + waveDelay, 0.5],
                  [0.3, 0.8, 0.5, 0.8, 0.6]
                )

                return (
                  <motion.div
                    key={index}
                    className="relative rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden"
                    style={{
                      y,
                      scale,
                      opacity,
                    }}
                  >
                    {card.image && (
                      <div className="absolute inset-0 opacity-20">
                        <Image src={card.image} alt={card.title} fill className="object-cover" />
                      </div>
                    )}

                    {/* Animated gradient background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}
                      style={{
                        rotate: gradientRotation,
                        opacity: colorIntensity,
                        scale: 1.5
                      }}
                    />

                    {/* Secondary gradient layer for depth */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-white/5"
                      style={{
                        rotate: useTransform(gradientRotation, (val) => -val / 2),
                      }}
                    />

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      style={{
                        x: useTransform(scrollYProgress,
                          [0 + waveDelay, 0.3 + waveDelay, 0.5],
                          ["-100%", "100%", "100%"]
                        ),
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

                    <div className="relative z-10 p-6 min-h-[250px] flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">{card.title}</h3>
                      <p className="text-sm text-white/90 leading-relaxed mb-4 drop-shadow">{card.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-white text-xs font-mono">gradient-wave</div>
                        <div className="px-3 py-1 bg-pink-500/40 backdrop-blur-sm rounded-full text-white text-xs font-bold">#{index + 1}</div>
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
