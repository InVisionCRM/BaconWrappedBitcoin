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
  { title: "Sweep 1", description: "Diagonal entry", gradient: "from-blue-600/20 to-cyan-600/20", image: "/artcoin1.png" },
  { title: "Sweep 2", description: "Angled approach", gradient: "from-cyan-600/20 to-teal-600/20", image: "/artcoin2.png" },
  { title: "Sweep 3", description: "Slanted motion", gradient: "from-teal-600/20 to-green-600/20", image: "/artcoin3.png" },
  { title: "Sweep 4", description: "Cascading flow", gradient: "from-green-600/20 to-lime-600/20", image: "/artcoin4.png" },
  { title: "Sweep 5", description: "Sequential slide", gradient: "from-purple-600/20 to-pink-600/20", image: "/artcoin5.png" },
  { title: "Sweep 6", description: "Oblique transition", gradient: "from-pink-600/20 to-rose-600/20", image: "/artcoin6.png" },
  { title: "Sweep 7", description: "Wave pattern", gradient: "from-orange-600/20 to-amber-600/20", image: "/pigbtc.png" },
  { title: "Sweep 8", description: "Complete sweep", gradient: "from-indigo-600/20 to-violet-600/20", image: "/bitcoincoin.png" }
]

interface MultiCardProps {
  cardCount?: number
}

export function MultiDemo15DiagonalSweep({ cardCount = 8 }: MultiCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const displayCards = cards.slice(0, cardCount)
  const getGridCols = () => cardCount <= 4 ? 2 : 4

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-950 to-black py-20">
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center text-white mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Diagonal Sweep
        </motion.h2>

        <div className={`grid grid-cols-${getGridCols()} gap-6`}>
          {displayCards.map((card, index) => {
            const row = Math.floor(index / getGridCols())
            const col = index % getGridCols()
            const diagonalIndex = row + col

            const x = useTransform(scrollYProgress, [0, 0.5, 1], [-500, 0, 0])
            const y = useTransform(scrollYProgress, [0, 0.5, 1], [-500, 0, 0])
            const opacity = useTransform(
              scrollYProgress,
              [0, 0.2 + diagonalIndex * 0.05, 0.4 + diagonalIndex * 0.05],
              [0, 0, 1]
            )

            return (
              <motion.div
                key={index}
                style={{ x, y, opacity }}
                transition={{ delay: diagonalIndex * 0.1 }}
              >
                <div className={`w-full h-80 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-sm border border-white/20 overflow-hidden shadow-2xl`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image src={card.image} alt={card.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-300">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
