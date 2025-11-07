"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const cards = [
  { title: "Scope 1", description: "Symmetric rotation begins", gradient: "from-red-500/30 to-pink-500/30", image: "/artcoin1.png" },
  { title: "Scope 2", description: "Mirrored motion", gradient: "from-pink-500/30 to-fuchsia-500/30", image: "/artcoin2.png" },
  { title: "Scope 3", description: "Radial symmetry", gradient: "from-fuchsia-500/30 to-purple-500/30", image: "/artcoin3.png" },
  { title: "Scope 4", description: "Circular patterns", gradient: "from-purple-500/30 to-violet-500/30", image: "/artcoin4.png" },
  { title: "Scope 5", description: "Kaleidoscope dance", gradient: "from-violet-500/30 to-indigo-500/30", image: "/artcoin5.png" },
  { title: "Scope 6", description: "Prismatic motion", gradient: "from-indigo-500/30 to-blue-500/30", image: "/artcoin6.png" },
  { title: "Scope 7", description: "Rotating fractals", gradient: "from-blue-500/30 to-cyan-500/30", image: "/pigbtc.png" },
  { title: "Scope 8", description: "Perfect symmetry", gradient: "from-cyan-500/30 to-teal-500/30", image: "/bitcoincoin.png" }
]

export function MultiDemo10Kaleidoscope({ cardCount = 8 }: { cardCount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const getGridCols = () => cardCount <= 4 ? 2 : 4
  const displayCards = cards.slice(0, cardCount)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Kaleidoscope</h1>
            <p className="text-xl text-white/60">Symmetric rotation and reflection</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animation ↓</p>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[300vh] flex items-center justify-center px-4">
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-7xl">
            <div className={`grid gap-4 ${getGridCols() === 2 ? 'grid-cols-2' : 'grid-cols-4'} min-w-0`}>
              {displayCards.map((card, index) => {
                const row = Math.floor(index / getGridCols())
                const col = index % getGridCols()

                // Create circular/radial positions
                const angle = (index * 360) / cardCount
                const radius = 250

                // Kaleidoscope pattern: cards rotate around center, then snap to grid
                const startX = Math.cos((angle * Math.PI) / 180) * radius
                const startY = Math.sin((angle * Math.PI) / 180) * radius

                const x = useTransform(scrollYProgress,
                  [0, 0.2, 0.35, 0.5, 0.7, 1],
                  [`${startX}%`, `${startX * 0.5}%`, "0%", "0%", "0%", `${-startX}%`]
                )

                const y = useTransform(scrollYProgress,
                  [0, 0.2, 0.35, 0.5, 0.7, 1],
                  [`${startY}%`, `${startY * 0.5}%`, "0%", "0%", "0%", `${-startY}%`]
                )

                // Each card rotates differently based on position
                const rotate = useTransform(scrollYProgress,
                  [0, 0.2, 0.35, 0.5, 0.7, 1],
                  [angle + 360, angle + 180, angle, 0, 0, -angle - 360]
                )

                const scale = useTransform(scrollYProgress,
                  [0, 0.15, 0.35, 0.5, 0.7, 0.85, 1],
                  [0, 0.8, 1, 1, 1, 0.8, 0]
                )

                const opacity = useTransform(scrollYProgress,
                  [0, 0.1, 0.5, 0.7, 0.9, 1],
                  [0, 1, 1, 1, 1, 0]
                )

                // Mirrored/reflected glow based on opposite cards
                const glowPhase = useTransform(scrollYProgress,
                  [0, 0.2, 0.35, 0.5],
                  [0, 1, 0.5, 0]
                )

                // Create rainbow effect that shifts
                const hueRotate = useTransform(scrollYProgress,
                  [0, 0.5, 1],
                  [0, 180, 360]
                )

                return (
                  <motion.div
                    key={index}
                    className="relative rounded-2xl backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden"
                    style={{
                      x,
                      y,
                      rotate,
                      scale,
                      opacity,
                      filter: `hue-rotate(${hueRotate.get()}deg) drop-shadow(0 0 ${glowPhase.get() * 30}px rgba(167, 139, 250, 0.6))`
                    }}
                  >
                    {card.image && (
                      <div className="absolute inset-0 opacity-25">
                        <Image src={card.image} alt={card.title} fill className="object-cover" />
                      </div>
                    )}

                    {/* Kaleidoscope gradient layer */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}
                      style={{
                        rotate: useTransform(rotate, (val) => -val),
                        scale: 1.5
                      }}
                    />

                    {/* Radial gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent opacity-40" />

                    {/* Reflection effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"
                      style={{
                        opacity: glowPhase,
                        rotate: useTransform(rotate, (val) => val / 2)
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

                    <div className="relative z-10 p-6 min-h-[250px] flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">{card.title}</h3>
                      <p className="text-sm text-white/90 leading-relaxed mb-4 drop-shadow">{card.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-white text-xs font-mono">kaleidoscope</div>
                        <div className="px-3 py-1 bg-indigo-500/40 backdrop-blur-sm rounded-full text-white text-xs font-bold">#{index + 1}</div>
                      </div>
                    </div>

                    {/* Symmetric accent marks */}
                    <div className="absolute top-2 right-2 w-3 h-3 bg-white/40 rounded-full" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/40 rounded-full" />
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
