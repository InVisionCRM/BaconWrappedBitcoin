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
  { title: "Zoom 1", description: "Explosive scale", gradient: "from-blue-600/20 to-cyan-600/20", image: "/artcoin1.png" },
  { title: "Zoom 2", description: "Dynamic expansion", gradient: "from-cyan-600/20 to-teal-600/20", image: "/artcoin2.png" },
  { title: "Zoom 3", description: "Burst effect", gradient: "from-teal-600/20 to-green-600/20", image: "/artcoin3.png" },
  { title: "Zoom 4", description: "Radial growth", gradient: "from-green-600/20 to-lime-600/20", image: "/artcoin4.png" },
  { title: "Zoom 5", description: "Scale transition", gradient: "from-purple-600/20 to-pink-600/20", image: "/artcoin5.png" },
  { title: "Zoom 6", description: "Explosive reveal", gradient: "from-pink-600/20 to-rose-600/20", image: "/artcoin6.png" },
  { title: "Zoom 7", description: "Magnitude shift", gradient: "from-orange-600/20 to-amber-600/20", image: "/pigbtc.png" },
  { title: "Zoom 8", description: "Final burst", gradient: "from-indigo-600/20 to-violet-600/20", image: "/bitcoincoin.png" }
]

interface MultiCardProps {
  cardCount?: number
}

export function MultiDemo14ZoomBurst({ cardCount = 8 }: MultiCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const displayCards = cards.slice(0, cardCount)
  const getGridCols = () => cardCount <= 4 ? 2 : 4

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 to-black py-20">
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center text-white mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Zoom Burst
        </motion.h2>

        <div className={`grid grid-cols-${getGridCols()} gap-6`}>
          {displayCards.map((card, index) => {
            const scale = useTransform(
              scrollYProgress,
              [0, 0.3, 0.5, 0.7],
              [0, 2, 1, 1]
            )
            const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 1])
            const rotate = useTransform(
              scrollYProgress,
              [0, 0.3, 0.5],
              [index % 2 === 0 ? -180 : 180, index % 2 === 0 ? -45 : 45, 0]
            )

            return (
              <motion.div
                key={index}
                style={{ scale, opacity, rotate }}
                transition={{ delay: index * 0.05 }}
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
