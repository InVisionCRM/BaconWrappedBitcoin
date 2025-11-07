"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const cards = [
  { title: "Explode 1", description: "Bursting outward", gradient: "from-red-600/20 to-orange-600/20", image: "/artcoin1.png" },
  { title: "Explode 2", description: "Expanding force", gradient: "from-orange-600/20 to-amber-600/20", image: "/artcoin2.png" },
  { title: "Explode 3", description: "Radiating energy", gradient: "from-amber-600/20 to-yellow-600/20", image: "/artcoin3.png" },
  { title: "Explode 4", description: "Controlled chaos", gradient: "from-yellow-600/20 to-lime-600/20", image: "/artcoin4.png" },
  { title: "Explode 5", description: "Reforming center", gradient: "from-pink-600/20 to-rose-600/20", image: "/artcoin5.png" },
  { title: "Explode 6", description: "Gravitational pull", gradient: "from-rose-600/20 to-red-600/20", image: "/artcoin6.png" },
  { title: "Explode 7", description: "Return to order", gradient: "from-orange-600/20 to-red-600/20", image: "/pigbtc.png" },
  { title: "Explode 8", description: "Final stability", gradient: "from-amber-600/20 to-orange-600/20", image: "/bitcoincoin.png" }
]

export function MultiDemo04ExplodeGrid({ cardCount = 8 }: { cardCount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const getGridCols = () => cardCount <= 4 ? 2 : 4
  const displayCards = cards.slice(0, cardCount)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-orange-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Explode Grid</h1>
            <p className="text-xl text-white/60">Cards explode outward then reform</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animation ↓</p>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[300vh] flex items-center justify-center px-4">
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-7xl">
            <div className={`grid gap-4 ${getGridCols() === 2 ? 'grid-cols-2' : 'grid-cols-4'} min-w-0`}>
              {displayCards.map((card, index) => {
                const row = Math.floor(index / getGridCols())
                const col = index % getGridCols()
                const centerRow = (cardCount <= 4 ? 1 : 2) / 2
                const centerCol = getGridCols() / 2
                const deltaX = (col - centerCol + 0.5) * 200
                const deltaY = (row - centerRow + 0.5) * 200

                const x = useTransform(scrollYProgress,
                  [0, 0.25, 0.35, 0.5, 0.7, 1],
                  ["0%", `${deltaX}%`, `${deltaX * 0.3}%`, "0%", "0%", `${-deltaX}%`]
                )
                const y = useTransform(scrollYProgress,
                  [0, 0.25, 0.35, 0.5, 0.7, 1],
                  ["0%", `${deltaY}%`, `${deltaY * 0.3}%`, "0%", "0%", `${-deltaY}%`]
                )
                const scale = useTransform(scrollYProgress,
                  [0, 0.15, 0.25, 0.35, 0.5, 0.7, 0.85, 1],
                  [0, 0.8, 1.2, 0.9, 1, 1, 0.8, 0]
                )
                const rotate = useTransform(scrollYProgress,
                  [0, 0.25, 0.5, 0.7, 1],
                  [0, 180, -90, 0, 180]
                )
                const opacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.7, 0.9, 1], [0, 1, 1, 1, 1, 0])

                return (
                  <motion.div
                    key={index}
                    className={`relative rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden`}
                    style={{ x, y, scale, rotate, opacity }}
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
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-mono">explode-grid</div>
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
