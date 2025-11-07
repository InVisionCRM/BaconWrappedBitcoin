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
  { title: "Spring 1", description: "Elastic bounce", gradient: "from-blue-600/20 to-cyan-600/20", image: "/artcoin1.png" },
  { title: "Spring 2", description: "Springy motion", gradient: "from-cyan-600/20 to-teal-600/20", image: "/artcoin2.png" },
  { title: "Spring 3", description: "Wobble settle", gradient: "from-teal-600/20 to-green-600/20", image: "/artcoin3.png" },
  { title: "Spring 4", description: "Elastic rebound", gradient: "from-green-600/20 to-lime-600/20", image: "/artcoin4.png" },
  { title: "Spring 5", description: "Spring dynamics", gradient: "from-purple-600/20 to-pink-600/20", image: "/artcoin5.png" },
  { title: "Spring 6", description: "Tension release", gradient: "from-pink-600/20 to-rose-600/20", image: "/artcoin6.png" },
  { title: "Spring 7", description: "Rubber snap", gradient: "from-orange-600/20 to-amber-600/20", image: "/pigbtc.png" },
  { title: "Spring 8", description: "Final damping", gradient: "from-indigo-600/20 to-violet-600/20", image: "/bitcoincoin.png" }
]

interface MultiCardProps {
  cardCount?: number
}

export function MultiDemo20ElasticSpring({ cardCount = 8 }: MultiCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const displayCards = cards.slice(0, cardCount)
  const getGridCols = () => cardCount <= 4 ? 2 : 4

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 to-black py-20">
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center text-white mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Elastic Spring
        </motion.h2>

        <div className={`grid grid-cols-${getGridCols()} gap-6`}>
          {displayCards.map((card, index) => {
            const y = useTransform(
              scrollYProgress,
              [
                0,
                0.2 + index * 0.02,
                0.25 + index * 0.02,
                0.3 + index * 0.02,
                0.35 + index * 0.02,
                0.4 + index * 0.02,
                0.45 + index * 0.02
              ],
              [-500, 0, -30, 0, -10, 0, 0]
            )
            const scale = useTransform(
              scrollYProgress,
              [
                0,
                0.2 + index * 0.02,
                0.25 + index * 0.02,
                0.3 + index * 0.02,
                0.35 + index * 0.02,
                0.4 + index * 0.02
              ],
              [0.5, 1, 0.95, 1.02, 0.98, 1]
            )
            const opacity = useTransform(scrollYProgress, [0, 0.15 + index * 0.02], [0, 1])

            return (
              <motion.div
                key={index}
                style={{ y, scale, opacity }}
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
