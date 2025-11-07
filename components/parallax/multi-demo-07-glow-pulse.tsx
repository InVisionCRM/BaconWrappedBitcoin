"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const cards = [
  { title: "Pulse 1", description: "Radiating energy waves", gradient: "from-violet-600/20 to-purple-600/20", image: "/artcoin1.png", glowColor: "147, 51, 234" },
  { title: "Pulse 2", description: "Synchronized heartbeat", gradient: "from-purple-600/20 to-fuchsia-600/20", image: "/artcoin2.png", glowColor: "168, 85, 247" },
  { title: "Pulse 3", description: "Harmonic resonance", gradient: "from-fuchsia-600/20 to-pink-600/20", image: "/artcoin3.png", glowColor: "217, 70, 239" },
  { title: "Pulse 4", description: "Luminous rhythm", gradient: "from-pink-600/20 to-rose-600/20", image: "/artcoin4.png", glowColor: "236, 72, 153" },
  { title: "Pulse 5", description: "Glowing crescendo", gradient: "from-blue-600/20 to-violet-600/20", image: "/artcoin5.png", glowColor: "59, 130, 246" },
  { title: "Pulse 6", description: "Radiant waves", gradient: "from-indigo-600/20 to-purple-600/20", image: "/artcoin6.png", glowColor: "99, 102, 241" },
  { title: "Pulse 7", description: "Energy cascade", gradient: "from-cyan-600/20 to-blue-600/20", image: "/pigbtc.png", glowColor: "8, 145, 178" },
  { title: "Pulse 8", description: "Final shimmer", gradient: "from-sky-600/20 to-indigo-600/20", image: "/bitcoincoin.png", glowColor: "14, 165, 233" }
]

export function MultiDemo07GlowPulse({ cardCount = 8 }: { cardCount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const getGridCols = () => cardCount <= 4 ? 2 : 4
  const displayCards = cards.slice(0, cardCount)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Glow Pulse</h1>
            <p className="text-xl text-white/60">Synchronized glowing animations</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animation ↓</p>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[300vh] flex items-center justify-center px-4">
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-7xl">
            <div className={`grid gap-4 ${getGridCols() === 2 ? 'grid-cols-2' : 'grid-cols-4'} min-w-0`}>
              {displayCards.map((card, index) => {
                // Create wave effect - each card pulses slightly after the previous
                const delay = index * 0.03

                const scale = useTransform(scrollYProgress,
                  [0, 0.15 + delay, 0.25 + delay, 0.35 + delay, 0.45 + delay, 0.5, 0.7, 0.85, 1],
                  [0, 0.85, 1.05, 0.95, 1, 1, 1, 0.85, 0]
                )

                const opacity = useTransform(scrollYProgress,
                  [0, 0.1 + delay, 0.5, 0.7, 0.9, 1],
                  [0, 1, 1, 1, 1, 0]
                )

                // Pulsing glow effect
                const glowIntensity = useTransform(scrollYProgress,
                  [0, 0.15 + delay, 0.25 + delay, 0.35 + delay, 0.45 + delay, 0.5, 0.7],
                  [0, 60, 80, 60, 80, 40, 40]
                )

                // Inner glow
                const innerGlow = useTransform(scrollYProgress,
                  [0, 0.15 + delay, 0.25 + delay, 0.35 + delay, 0.45 + delay, 0.5],
                  [0, 0.3, 0.6, 0.3, 0.6, 0.2]
                )

                return (
                  <motion.div
                    key={index}
                    className={`relative rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden`}
                    style={{
                      scale,
                      opacity,
                      boxShadow: glowIntensity.get()
                        ? `0 0 ${glowIntensity.get()}px rgba(${card.glowColor}, 0.6),
                           0 0 ${glowIntensity.get() * 2}px rgba(${card.glowColor}, 0.3),
                           inset 0 0 ${glowIntensity.get() / 2}px rgba(${card.glowColor}, 0.4)`
                        : undefined
                    }}
                  >
                    {card.image && (
                      <div className="absolute inset-0 opacity-30">
                        <Image src={card.image} alt={card.title} fill className="object-cover" />
                      </div>
                    )}

                    {/* Animated gradient overlay for glow effect */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(${card.glowColor}, ${innerGlow.get()}), transparent 70%)`,
                        opacity: innerGlow
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

                    <div className="relative z-10 p-6 min-h-[250px] flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed mb-4">{card.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-mono">glow-pulse</div>
                        <div className="px-3 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full text-white text-xs font-bold">#{index + 1}</div>
                      </div>
                    </div>

                    {/* Outer glow rings */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        border: `2px solid rgba(${card.glowColor}, ${innerGlow.get()})`,
                        opacity: innerGlow
                      }}
                    />
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
