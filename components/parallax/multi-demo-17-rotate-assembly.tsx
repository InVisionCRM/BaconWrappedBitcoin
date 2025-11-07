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
  { title: "Rotate 1", description: "Spinning entry", gradient: "from-blue-600/20 to-cyan-600/20", image: "/artcoin1.png" },
  { title: "Rotate 2", description: "Angular motion", gradient: "from-cyan-600/20 to-teal-600/20", image: "/artcoin2.png" },
  { title: "Rotate 3", description: "Circular twist", gradient: "from-teal-600/20 to-green-600/20", image: "/artcoin3.png" },
  { title: "Rotate 4", description: "Spin alignment", gradient: "from-green-600/20 to-lime-600/20", image: "/artcoin4.png" },
  { title: "Rotate 5", description: "Rotational sync", gradient: "from-purple-600/20 to-pink-600/20", image: "/artcoin5.png" },
  { title: "Rotate 6", description: "Turn and settle", gradient: "from-pink-600/20 to-rose-600/20", image: "/artcoin6.png" },
  { title: "Rotate 7", description: "Spiral approach", gradient: "from-orange-600/20 to-amber-600/20", image: "/pigbtc.png" },
  { title: "Rotate 8", description: "Final rotation", gradient: "from-indigo-600/20 to-violet-600/20", image: "/bitcoincoin.png" }
]

interface MultiCardProps {
  cardCount?: number
}

export function MultiDemo17RotateAssembly({ cardCount = 8 }: MultiCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const displayCards = cards.slice(0, cardCount)
  const getGridCols = () => cardCount <= 4 ? 2 : 4

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-950 to-black py-20">
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center text-white mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Rotate Assembly
        </motion.h2>

        <div className={`grid grid-cols-${getGridCols()} gap-6`}>
          {displayCards.map((card, index) => {
            const rotate = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [index % 2 === 0 ? 720 : -720, index % 2 === 0 ? 180 : -180, 0]
            )
            const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 1])
            const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

            return (
              <motion.div
                key={index}
                style={{ rotate, scale, opacity }}
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
